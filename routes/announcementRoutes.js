const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create announcement (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all announcements (anyone)
router.get("/", async (req, res) => {
  const data = await Announcement.find().sort({ createdAt: -1 });
  res.json(data);
});

// Update (Admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
