const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) {
    console.error("❌ MONGO_URI is not defined in the .env file");
    process.exit(1); // Exit the app if the connection string is missing
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL); // No need for deprecated options
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Database connection error:", err.message);
        process.exit(1); // Exit the app if DB connection fails
    }
};

module.exports = connectDB;
