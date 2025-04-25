const mongoose = require("mongoose");

// Schema for each student registration
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regno: { type: String, required: true },  // Changed from rollNo to regno
  email: { type: String, required: true },
  phone: { type: String, required: true },
  section: { type: String, required: true },
  branch: { type: String, required: true },
  department: { type: String, required: true }
}, { _id: false }); // Prevent nested _id in array

// Schema for event + list of registrations
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  lastDate: { type: Date, required: true },
  createdBy: { type: String, required: true },
  registrations: [registrationSchema]
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
