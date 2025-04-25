const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// StayFit Dashboard
router.get("/", verifyToken, (req, res) => {
    res.render("stayfit", { user: req.user });
});

// Profile Page
router.get("/profile", verifyToken, (req, res) => {
    res.render("profile", { user: req.user });
});

router.get("/homeuser", verifyToken, (req, res) => {
    const user = res.locals.user; // The decoded user from the JWT
    res.render("homeuser", { user }); // Render homeuser.ejs with user data
});
module.exports = router;
