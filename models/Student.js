const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    matricNo: { type: String, required: true, unique: true, uppercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 100, max: 700 },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Student", studentSchema);
