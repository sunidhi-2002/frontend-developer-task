// File: backend/controllers/userController.js
const User = require("../models/User");

// GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user); // req.user should be user ID from JWT
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;

    if (req.body.password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
