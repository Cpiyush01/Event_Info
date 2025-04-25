const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// A generic schema for student registrations
const registrationSchema = new mongoose.Schema({
  name: String,
  regno: String,
  email: String,
  phone: String,
  section: String,
  branch: String,
  department: String,
}, { timestamps: true });

router.post("/submit-registration", async (req, res) => {
  const { event, name, regno, email, phone, section, branch, department } = req.body;

  try {
    // 1. Check if event exists
    let eventExists = await Event.findOne({ title: event });

    // 2. If not, create the event (basic version)
    if (!eventExists) {
      eventExists = new Event({
        title: event,
        description: "Auto-generated event", // or make this user input
        lastDate: new Date(), // default date
        createdBy: "system",  // or current user if login
        registrations: [],
      });

      await eventExists.save();
      console.log(`📌 Created new event: ${event}`);
    }

    // 3. Create dynamic model based on event title
    const collectionName = `${event.replace(/\s+/g, "")}_Registrations`;
    const RegistrationModel = mongoose.model(collectionName, registrationSchema, collectionName);

    // 4. Save registration in the respective event collection
    const newRegistration = new RegistrationModel({
      name,
      regno,
      email,
      phone,
      section,
      branch,
      department,
    });

    await newRegistration.save();

    res.send("✅ Registration successful!");
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
