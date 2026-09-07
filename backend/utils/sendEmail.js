const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER || 'test-user',
      pass: process.env.EMAIL_PASS || 'test-pass',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'Dance Academy Support <support@danceacademy.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.htmlMessage, // Optional if we want HTML styling later
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    
    // For local development without real credentials, log the OTP directly so we can easily test
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'test-user') {
      console.log('====== MOCKED EMAIL OUTPUT ======');
      console.log(`To: ${options.email}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Body: \n${options.message}`);
      console.log('=================================');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
