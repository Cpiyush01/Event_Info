const express = require("express");
const router = express.Router();

// Example route for generating certificate (adjust as per your requirement)
router.get("/generate-certificate", (req, res) => {
  // Logic for generating certificate
  res.send("Certificate Generated");
});

module.exports = router;
