const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function run() {
    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
        margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    const pdfPath = path.join(__dirname, 'test_certificate.pdf');
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    try {
        const templatePath = path.join(__dirname, 'backend', 'assets', 'certificate-template.jpg');
        console.log("Template path:", templatePath);
        doc.image(templatePath, 0, 0, { width: doc.page.width, height: doc.page.height });
        console.log("Image loaded.");
    } catch(err) {
        console.error("Error loading image:", err.message);
    }

    doc.end();
}
run();
