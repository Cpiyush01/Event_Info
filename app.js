const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection
const morgan = require("morgan"); // HTTP request logger
const path = require("path"); // For static file paths
const cookieParser = require("cookie-parser"); // Parse cookies
require("dotenv").config(); // Load environment variables
const verifyToken = require("./middleware/verifyToken");

const app = express();
const port = process.env.PORT || Math.floor(Math.random() * (65535 - 1024) + 1024);

// Connect to MongoDB
connectDB();
app.use(express.static("public"));
// Set EJS as View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const stayfitRoutes = require("./routes/stayfit");
const adminRoutes = require("./routes/admin");
const registerRoutes = require("./routes/register");
const certificateRoutes = require("./routes/certificate");  // Add this correctly

// Use the routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/", homeRoutes);
app.use("/stayfit", stayfitRoutes);
app.use("/", registerRoutes);
app.use("/admin", certificateRoutes);  // Ensure you include the certificate routes here

// Views for various routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/admin", verifyToken, (req, res) => {
  res.render("admin/adminDashboard", { admin: req.user.UserID });
});
// Generate Certificate Page
app.get("/admin/generatecertificate", verifyToken, (req, res) => {
  res.render("admin/generatecertificate", { admin: req.user.UserID });
});
app.get("/admin/eventdetails", verifyToken, (req, res) => {
  res.render("admin/eventdetails", { admin: req.user.UserID });
});
app.get("/admin/eventdetails", verifyToken, (req, res) => {
  res.render("admin/eventdetails", { admin: req.user.UserID });
});


app.get("/register", (req, res) => {
  const eventName = req.query.event || "Unknown Event";
  res.render("eventformregistration", { eventName });
});
app.get("/viewdetails", (req, res) => res.render("viewdetails"));


app.get("/login", (req, res) => {
  const message = req.query.message || null;
  res.render("login", { message });
});

app.get("/vignanvibes", verifyToken, (req, res) => {
  res.render("vignanvibes", { title: "Photo Gallery", message: "Welcome to Vignan Vibez!" });
});

// Informational Pages
app.get("/sports", (req, res) => res.render("sports"));
app.get("/cricket", (req, res) => res.render("cricket"));
app.get("/football", (req, res) => res.render("football"));
app.get("/basketball", (req, res) => res.render("basketball"));
app.get("/culturals", (req, res) => res.render("culturals"));
app.get("/dancing", (req, res) => res.render("dancing"));
app.get("/singing", (req, res) => res.render("singing"));
app.get("/art", (req, res) => res.render("art"));
app.get("/others", (req, res) => res.render("others"));
app.get("/hackathon", (req, res) => res.render("hackathon"));
app.get("/seminar", (req, res) => res.render("seminar"));
app.get("/eventregistration", (req, res) => res.render("eventregistration"));
app.get("/yourparticipation", (req, res) => res.render("yourparticipation"));
app.get("/exteriorevents", (req, res) => res.render("exteriorevents"));
app.get("/otherclg", (req, res) => res.render("otherclg"));
app.get("/profile", (req, res) => res.render("profile"));
app.get("/nss", (req, res) => res.render("nss"));
app.get("/sac", (req, res) => res.render("sac"));
app.get("/ncc", (req, res) => res.render("ncc"));

// Logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
