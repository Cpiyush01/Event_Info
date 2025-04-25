const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event"); // ✅ make sure this path is correct

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/VignanVibes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  return seedEvent(); // Insert event
})
.catch((err) => console.error("❌ MongoDB connection error:", err));

async function seedEvent() {
  const newEvent = new Event({
    title: "Hackathon 2024",
    description: "A 36-hour coding challenge for students.",
    lastDate: new Date("2024-04-30"),
    createdBy: "admin",
    registrations: [], // Empty initially
  });

  try {
    await newEvent.save();
    console.log("✅ Event inserted successfully!");
  } catch (err) {
    console.error("❌ Failed to insert event:", err);
  } finally {
    mongoose.connection.close();
  }
}
