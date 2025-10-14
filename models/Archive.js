const mongoose = require("mongoose")

const archiveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String }, // link to PDF, image, etc.
    type: { type: String, required: true }, // PDF, DOCX, Event, Announcement, etc.
    size: { type: String }, // optional file size
    category: { type: String, required: true }, // Reports, Media, Events, Announcements
    date: { type: Date, required: true }, // date of the archive/event/announcement
    createdBy: { type: String, default: "Admin" }, // default creator
  },
  { timestamps: true }
)

module.exports = mongoose.model("Archive", archiveSchema)
