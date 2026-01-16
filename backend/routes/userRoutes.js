// File: backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");

// GET profile
router.get("/profile", protect, getProfile);

// UPDATE profile
router.put("/profile", protect, updateProfile);

module.exports = router;
