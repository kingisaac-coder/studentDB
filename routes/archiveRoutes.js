const express = require("express");
const router = express.Router();
const Archive = require("../models/Archive");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create archive (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const archive = await Archive.create(req.body);
    res.status(201).json(archive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all archives (anyone)
router.get("/", async (req, res) => {
  const archives = await Archive.find().sort({ createdAt: -1 });
  res.json(archives);
});

// Update archive (Admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete archive (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Archive.findByIdAndDelete(req.params.id);
    res.json({ message: "Archive deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
