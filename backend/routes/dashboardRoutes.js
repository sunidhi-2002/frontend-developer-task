const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// use "/" here, not "/dashboard"
router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    userId: req.user,
  });
});

module.exports = router;
