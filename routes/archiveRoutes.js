const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Archive = require("../models/Archive");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ------------------
// Multer setup for file uploads
// ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = ${Date.now()}-${file.originalname};
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ------------------
// Upload file
// ------------------
router.post("/upload", protect, adminOnly, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const fileUrl = ${req.protocol}://${req.get("host")}/uploads/${req.file.filename};
  res.json({ fileUrl });
});

// ------------------
// Create archive (Admin only)
// ------------------
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const archive = await Archive.create(req.body);
    res.status(201).json(archive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ------------------
// Get all archives (anyone)
// ------------------
router.get("/", async (req, res) => {
  try {
    const archives = await Archive.find().sort({ createdAt: -1 });
    res.json(archives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------
// Update archive (Admin only)
// ------------------
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ------------------
// Delete archive (Admin only)
// ------------------
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Archive.findByIdAndDelete(req.params.id);
    res.json({ message: "Archive deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
