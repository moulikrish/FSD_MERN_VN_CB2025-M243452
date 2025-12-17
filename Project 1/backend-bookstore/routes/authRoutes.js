const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', registerUser);

// login
router.post('/login', authUser);

module.exports = router;
