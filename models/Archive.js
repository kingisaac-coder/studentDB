// const mongoose = require("mongoose");

// const archiveSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     fileUrl: { type: String, required: true }, // e.g. link to PDF, doc, image
//     description: { type: String },
//     createdBy: { type: String, default: "Admin" }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Archive", archiveSchema);
const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    type: { type: String, required: true },
    size: { type: String },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Archive", archiveSchema);
