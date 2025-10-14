const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  level: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  lectureHall: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  fileUrl: { type: String },
});

module.exports = mongoose.model("Timetable", timetableSchema);
