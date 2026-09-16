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
    });

    const pdfFilename = `certificate-${certificateId}.pdf`;
    const pdfPath = path.join(__dirname, '..', 'uploads', 'certificates', pdfFilename);
    const writeStream = fs.createWriteStream(pdfPath);
    
    doc.pipe(writeStream);

    // simple design
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8f9fa');
    
    // Add inner border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#2c3e50');
    
    doc.fillColor('#e74c3c')
       .fontSize(45)
       .text('NRITYA SHAKTI ACADEMY', 0, 70, { align: 'center' });

    doc.fillColor('#2c3e50')
       .fontSize(25)
       .text('CERTIFICATE OF COMPLETION', 0, 130, { align: 'center' });
       
    doc.fontSize(16)
       .text('This certificate is proudly presented to', 0, 180, { align: 'center' });

    doc.fontSize(35)
       .fillColor('#e74c3c')
       .text(enrollment.student.name, 0, 220, { align: 'center' });

    doc.fontSize(16)
       .fillColor('#2c3e50')
       .text('for successfully completing the course', 0, 270, { align: 'center' });

    doc.fontSize(25)
       .fillColor('#34495e')
       .text(enrollment.class.title, 0, 310, { align: 'center' });

    doc.fontSize(14)
       .fillColor('#2c3e50')
       .text(`Dance Style: ${enrollment.class.style}`, 0, 360, { align: 'center' });

    const completionDate = new Date().toLocaleDateString();
    doc.text(`Date of Completion: ${completionDate}`, 0, 385, { align: 'center' });

    doc.fontSize(14)
       .text(`Certificate ID: ${certificateId}`, 50, 480, { align: 'left' });

    // Generate QR code and add to PDF (pointing directly to the certificate PDF hosted by the backend)
    const verificationUrl = `${req.protocol}://${req.get('host')}/uploads/certificates/${pdfFilename}`;
    let qrDataUrl = await QRCode.toDataURL(verificationUrl);
    // Convert base64 to buffer
    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');
    
    doc.image(imgBuffer, 650, 430, { fit: [100, 100], align: 'center', valign: 'center' });
    
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

module.exports = {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates
};
