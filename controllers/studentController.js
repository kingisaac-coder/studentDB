const Student = require("../models/Student");

// GET /api/students
exports.getStudents = async (req, res) => {
  try {
    // optional filters: ?q=search&dept=...&level=...
    const { q, dept, level } = req.query;
    const filter = {};
    if (dept) filter.department = new RegExp(`^${dept}$`, "i");
    if (level) filter.level = Number(level);
    if (q) {
      filter.$or = [
        { name: new RegExp(q, "i") },
        { matricNo: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
        { department: new RegExp(q, "i") },
      ];
    }
    const students = await Student.find(filter).sort({ createdAt: -1 });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/students/:id
exports.getStudent = async (req, res) => {
  try {
    const s = await Student.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Student not found" });
    return res.json(s);
  } catch (err) {
    return res.status(400).json({ message: "Invalid id" });
  }
};

// POST /api/students  (admin only)
exports.addStudent = async (req, res) => {
  try {
    const { name, matricNo, email, department, level } = req.body;
    if (!name || !matricNo || !email || !department || !level)
      return res.status(400).json({ message: "All fields are required" });

    const created = await Student.create({ name, matricNo, email, department, level });
    return res.status(201).json(created);
  } catch (err) {
    // handle duplicate key errors nicely
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    return res.status(400).json({ message: err.message });
  }
};

// PUT /api/students/:id  (admin only)
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    return res.json(updated);
  } catch (err) {
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    return res.status(400).json({ message: err.message });
  }
};

// DELETE /api/students/:id  (admin only)
exports.deleteStudent = async (req, res) => {
  try {
    const removed = await Student.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Student not found" });
    return res.json({ message: "Student deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid id" });
  }
};
