const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
