const express = require("express");
const Admin = require("../models/Admin/AdminSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: "Admin exists" });

  const admin = await Admin.create({ name, email, password });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ user: admin, token });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ user: admin, token });
});

module.exports = router;
