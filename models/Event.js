const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },         // ⬅️ Added
    location: { type: String, required: true },     // ⬅️ Added
    category: { type: String, required: true },     // ⬅️ Added
    attendees: { type: Number, default: 0 },        // ⬅️ Added
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

