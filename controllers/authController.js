const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username and password required" });

    const exists = await User.findOne({ username: username.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Username already taken" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, role: role || "student" });
    return res.status(201).json({ message: "User registered", user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: (username || "").toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
