const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET ;

function verifyToken(req, res, next) {
    const token = req.cookies.token; // Read token from cookies
    if (!token) {
        return res.redirect("/login?message=Please log in first");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("🔥 Invalid Token:", error.message);
        res.redirect("/login?message=Invalid or expired token");
    }
}

module.exports = verifyToken;
