const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // If logged in, redirect to the protected stayfit/home route.
    if (res.locals.isAuthenticated) {
        return res.redirect("/stayfit/home");
    }
    // Otherwise, show the generic home page.
    res.render("home");
});

// You can also include a public "/home" if needed.
router.get("/home", (req, res) => {
    if (res.locals.isAuthenticated) {
        return res.redirect("/stayfit/home");
    }
    res.render("home");
});

// stayfit after login with authentication check it user not login it not open and print termin not login user
router.get("/stayfit", (req, res) => {
    if (!res.locals.isAuthenticated) {
        return res.send("You must be logged in to view this page.");
    }
    res.render("stayfit", { user: res.locals.user });
});

module.exports = router;
