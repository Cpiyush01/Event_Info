const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "yourStrongSecretKey";

// ✅ Register
router.post("/register", async (req, res) => {
  const { UserID, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ UserID });
    if (existingUser) {
      return res.redirect("/login?message=UserID already exists");
    }

    const newUser = new User({ UserID, email, password, role });
    await newUser.save();

    res.redirect("/login?message=Registration successful!");
  } catch (err) {
    console.error(err);
    res.redirect("/login?message=Registration failed");
  }
});

// ✅ Login (supports admin too)
router.post("/login", async (req, res) => {
  const { UserID, password, role } = req.body;

  try {
    // Match both UserID and role
    const user = await User.findOne({ UserID, role });
    if (!user || !(await user.comparePassword(password))) {
      return res.redirect("/login?message=Invalid credentials");
    }

    await user.updateLastLogin();

    const token = jwt.sign(
      { userId: user._id, UserID: user.UserID, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    // ✅ Role-based redirection
    switch (user.role) {
      case "admin":
        return res.redirect("/admin");
      case "sac":
        return res.redirect("/sac");
      case "ncc":
        return res.redirect("/ncc");
      case "tech":
        return res.redirect("/tech");
      case "user":
        return res.redirect("/vignanvibes");
      default:
        return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login?message=Login failed");
  }
});

// ✅ Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
