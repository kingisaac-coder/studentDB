const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin Only
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admins only!" });
  }
};

// Dummy middleware for testing
function protect(req, res, next) {
  // Add real authentication logic later
  console.log("Protect middleware hit");
  next();
}

function adminOnly(req, res, next) {
  // Add real admin check logic later
  console.log("AdminOnly middleware hit");
  next();
}

module.exports = { protect, adminOnly };
