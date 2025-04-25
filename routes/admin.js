const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const verifyAdmin = require("../middleware/verifyAdmin");
const { sendCertificateEmail } = require("../utils/certificate"); // Import your certificate logic
const mongoose = require("mongoose");

// Route for posting an event (already present)
router.post("/post-event", verifyAdmin, async (req, res) => {
  const { title, description, lastDate } = req.body;

  try {
    await Event.create({
      title,
      description,
      lastDate,
      createdBy: req.user.UserID, // Assuming userID is being passed in the token or session
    });

    res.redirect("/admin");
  } catch (err) {
    console.error("❌ Error posting event:", err);
    res.status(500).send("Failed to create event");
  }
});

// Route for generating and sending certificates
router.post("/certificate", async (req, res) => {
  const { name, email, regNo, eventName } = req.body;

  try {
    await sendCertificateEmail(email, name, regNo, eventName);
    res.status(200).send("Certificate sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send certificate");
  }
});

router.get('/get-participants/:eventName', async (req, res) => {
  const eventName = req.params.eventName;
  const collectionName = `${eventName}_Registrations`; // e.g., "Hackathon_Registrations"

  try {
    const participants = await mongoose.connection.db
      .collection(collectionName)
      .find({})
      .toArray();

    if (participants.length > 0) {
      res.json({ success: true, participants });
      console.log("Participants fetched successfully:", participants);
    } else {
      res.json({ success: false, message: "No participants found" });
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});




module.exports = router;
