const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// Admin user info
const adminData = {
  UserID: "admin231",
  email: "admin@vignan.edu",
  password: "admin@123",
  role: "admin"
};

// Connect and insert
async function run() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("VignanVibes");
    const users = db.collection("users");

    // Check if admin already exists
    const existing = await users.findOne({ UserID: adminData.UserID, role: "admin" });
    if (existing) {
      console.log("⚠️ Admin already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // Save admin
    await users.insertOne({
      UserID: adminData.UserID,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("🎉 Admin inserted directly into MongoDB");
  } catch (err) {
    console.error("❌ Failed to insert admin:", err);
  } finally {
    await client.close();
  }
}

run();
