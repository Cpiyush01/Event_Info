const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourStrongSecretKey";

function verifyAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login?message=Please log in");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).send("⛔ Access denied: Admins only");
    }

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.redirect("/login?message=Invalid or expired session");
  }
}

module.exports = verifyAdmin;
