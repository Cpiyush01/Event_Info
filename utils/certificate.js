require('dotenv').config();  // Load .env variables
const nodemailer = require("nodemailer");

const sendCertificateEmail = async (userEmail, userName, eventName) => {
  // Create a Nodemailer transporter using Gmail's SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,         // Your email from .env
      pass: process.env.EMAIL_PASSWORD,  // Your App Password from .env
    },
    tls: {
      rejectUnauthorized: false, // This can help bypass certain TLS issues
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender
    to: userEmail,           // Recipient
    subject: `Certificate for ${eventName}`,
    text: `Dear ${userName},\n\nCongratulations on participating in ${eventName}!\n\nBest regards,\nVignan Vibes Team`,
    // Optionally, you can add an HTML body:
    // html: `<p>Dear <strong>${userName}</strong>,</p><p>Congratulations on participating in <strong>${eventName}</strong>!</p><p>Best regards,<br>Vignan Vibes Team</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Certificate sent: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending certificate:", error);
    throw new Error("Failed to send certificate");
  }
};

module.exports = { sendCertificateEmail };
