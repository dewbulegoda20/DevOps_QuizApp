const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Initialize Express app
const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// ✅ Enable CORS for frontend communication
app.use(cors({
  origin: "http://localhost:3000", // Adjust if needed
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Database Configuration
const dbConfig = require("./config/dbConfig");

// Import Routes
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

// Use Routes
app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

// ✅ Add Default Route for Testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Serve React Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
