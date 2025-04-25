require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const { generateCertificate } = require("./generateCertificate");

const sendCertificateEmail = async (userEmail, userName, regNo, eventName) => {
  const certificatePath = await generateCertificate(userName, regNo, eventName);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Your Certificate for ${eventName}`,
    text: `Dear ${userName},\n\nCongratulations on participating in ${eventName}!\n\nPlease find your certificate attached.\n\nBest regards,\nVignan Vibes Team`,
    attachments: [
      {
        filename: path.basename(certificatePath),
        path: certificatePath,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Certificate sent to ${userEmail}: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending certificate:", error);
    throw new Error("Failed to send certificate");
  }
};

module.exports = { sendCertificateEmail };
