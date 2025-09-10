const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Allow frontend to access API
app.use(cors({
  origin: ["http://localhost:3000", "https://studentdb-frontend.onrender.com"], 
  credentials: true
}));

app.use(express.json());

// health check
app.get("/", (req, res) => res.send("Student Database API ✅"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/archives", require("./routes/archiveRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




