const express = require("express");
const router = express.Router();
const { registerUser, authUser, getProfile } = require("../controllers/userController");
const { validateRegister, validateLogin } = require("../validators/validators");
const { protect } = require("../middleware/authMiddleware");

// register
router.post("/register", validateRegister, registerUser);

// login
router.post("/login", validateLogin, authUser);

// profile (protected)
router.get("/profile", protect, getProfile);

module.exports = router;
