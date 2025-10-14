const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// ✅ Allow frontend to access API
 app.use(cors({
  origin: [
    "http://localhost:3000",     // for local React testing
    "https://cyb-sm-core.netlify.app" // your live frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

// ✅ Health check route
app.get("/", (req, res) => res.send("Student Database API ✅"));

// ✅ Main API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/archives", require("./routes/archiveRoutes"));

// ✅ Add timetable route
app.use("/api/timetables", require("./routes/timetableRoutes"));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

