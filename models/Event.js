const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
