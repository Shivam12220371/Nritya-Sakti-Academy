const Certificate = require('../models/Certificate');
const User = require('../models/User');
const Class = require('../models/Class');
const Enrollment = require('../models/Enrollment');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// @desc    Generate Certificate
// @route   POST /api/certificates/generate/:enrollmentId
// @access  Private/Admin
const generateCertificate = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    // Check if enrollment exists
    const enrollment = await Enrollment.findById(enrollmentId).populate('student').populate('class');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Check if certificate already exists for this enrollment
    // We assume 1 certificate per enrollment. We can query by student and class
    let existingCert = await Certificate.findOne({ student: enrollment.student._id, class: enrollment.class._id });
    if (existingCert) {
      return res.status(400).json({ message: 'Certificate already generated for this class', certificate: existingCert });
    }

    // Mark enrollment as completed if not already
    if (enrollment.status !== 'Completed') {
      enrollment.status = 'Completed';
      await enrollment.save();
    }

    // Generate unique ID: GDA-YYYY-XXX
    const year = new Date().getFullYear();
    const count = await Certificate.countDocuments();
    const certIdSequence = (count + 1).toString().padStart(3, '0');
    const certificateId = `GDA-${year}-${certIdSequence}`;

    // PDF generation
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    const pdfFilename = `certificate-${certificateId}.pdf`;
    const pdfPath = path.join(__dirname, '..', 'uploads', 'certificates', pdfFilename);
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    // Apply background template
    const templatePath = path.join(__dirname, '..', 'assets', 'certificate-template.jpg');
    doc.image(templatePath, 0, 0, { width: doc.page.width, height: doc.page.height });

    // Add student name on the underline 
    // Estimation for A4: 841.89 x 595.28 points
    doc.fontSize(35)
      .fillColor('#000000')
      .text(enrollment.student.name, 0, 315, { align: 'center' });

    // Add Course / Style
    doc.fontSize(16)
      .fillColor('#333333')
      .text(`Batch: ${enrollment.class.title} | Style: ${enrollment.class.style}`, 0, 375, { align: 'center' });

    const completionDate = new Date().toLocaleDateString();
    doc.fontSize(14)
      .text(`Date: ${completionDate}`, 0, 405, { align: 'center' });

    doc.fontSize(12)
      .text(`Certificate ID: ${certificateId}`, 50, 520, { align: 'left' });

    // Generate QR code and add to PDF (pointing directly to the certificate PDF hosted by the backend)
    const verificationUrl = `${req.protocol}://${req.get('host')}/uploads/certificates/${pdfFilename}`;
    let qrDataUrl = await QRCode.toDataURL(verificationUrl);
    // Convert base64 to buffer
    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');

    doc.image(imgBuffer, 660, 430, { fit: [100, 100], align: 'center', valign: 'center' });

    doc.end();

    writeStream.on('finish', async () => {
      // Save Certificate to DB
      const newCertificate = await Certificate.create({
        certificateId,
        student: enrollment.student._id,
        class: enrollment.class._id,
        pdfUrl: `/uploads/certificates/${pdfFilename}`
      });

      // Email sending (optional / fallback error handling without throwing error to client)
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail', // or configured service
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });

          await transporter.sendMail({
            from: `"Nritya Shakti Academy" <${process.env.SMTP_USER}>`,
            to: enrollment.student.email,
            subject: `Your Dance Academy Certificate - ${enrollment.class.title}`,
            text: `Congratulations ${enrollment.student.name}!\n\nYou have successfully completed the ${enrollment.class.title}.\nPlease find your certificate attached.\nCertificate ID: ${certificateId}\n\nRegards,\nDance Academy Team`,
            attachments: [
              {
                filename: pdfFilename,
                path: pdfPath
              }
            ]
          });
        } catch (emailErr) {
          console.error("Email sending failed:", emailErr);
        }
      }

      res.status(201).json(newCertificate);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating certificate' });
  }
};

// @desc    Verify Certificate
// @route   GET /api/certificates/verify/:certificateId
// @access  Public
const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const cert = await Certificate.findOne({ certificateId }).populate('student').populate('class');

    if (!cert) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    if (cert.status !== 'Valid') {
      return res.status(400).json({ message: 'Certificate is not valid (Revoked)' });
    }

    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get Student Certificates
// @route   GET /api/certificates/my-certificates
// @access  Private (Student)
const getStudentCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find({ student: req.user._id }).populate('class').sort('-dateIssued');
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete Certificate
// @route   DELETE /api/certificates/:enrollmentId
// @access  Private/Admin
const deleteCertificate = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    const cert = await Certificate.findOne({ student: enrollment.student, class: enrollment.class });
    if (!cert) {
      return res.status(404).json({ message: 'Certificate not found for this enrollment' });
    }

    // Delete the PDF file if exists
    if (cert.pdfUrl) {
      const filename = cert.pdfUrl.split('/').pop();
      const pdfPath = path.join(__dirname, '..', 'uploads', 'certificates', filename);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }

    await Certificate.findByIdAndDelete(cert._id);

    // Optionally reset enrollment status if needed, but keeping it Completed allows regenerating
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
  deleteCertificate
};
