const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true }, // e.g. link to PDF, doc, image
    description: { type: String },
    createdBy: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Archive", archiveSchema);
