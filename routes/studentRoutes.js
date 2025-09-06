const express = require("express");
const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { auth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

// read: any authenticated user
router.get("/", auth, getStudents);
router.get("/:id", auth, getStudent);

// write: admin only
router.post("/", auth, requireRole(["admin"]), addStudent);
router.put("/:id", auth, requireRole(["admin"]), updateStudent);
router.delete("/:id", auth, requireRole(["admin"]), deleteStudent);

module.exports = router;
