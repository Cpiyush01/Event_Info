const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateCertificate = async (userName, regNo, eventName) => {
  try {
    const certificatesDir = path.join(__dirname, "..", "certificates");
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir);
    }

    const filename = `${userName.replace(/\s/g, "_")}_certificate.pdf`;
    const certificatePath = path.join(certificatesDir, filename);
    const doc = new PDFDocument({ size: "A4" });

    doc.pipe(fs.createWriteStream(certificatePath));

    doc.fontSize(26).text("Certificate of Participation", { align: "center" });
    doc.moveDown(1.5);

    doc.fontSize(16).text("This is to certify that", { align: "center" });
    doc.moveDown(0.5);

    doc.fontSize(22).font("Helvetica-Bold").text(userName, { align: "center" });
    doc.moveDown(0.5);

    doc.fontSize(16).text(`(Reg No: ${regNo})`, { align: "center" });
    doc.moveDown(1);

    doc.fontSize(16).text(`has participated in "${eventName}" organized by Vignan.`, {
      align: "center",
    });

    doc.moveDown(2);
    doc.fontSize(14).text("Date: " + new Date().toLocaleDateString(), {
      align: "center",
    });

    // Add signature / logo if needed here

    doc.end();
    return certificatePath;
  } catch (error) {
    console.error("❌ Error generating certificate:", error);
    throw new Error("Failed to generate certificate");
  }
};

module.exports = { generateCertificate };
