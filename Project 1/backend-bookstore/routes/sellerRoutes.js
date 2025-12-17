const express = require("express");
const Seller = require("../models/Seller/SellerSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, shopName } = req.body;
  const sellerExists = await Seller.findOne({ email });
  if (sellerExists) return res.status(400).json({ message: "Seller already exists" });

  const seller = await Seller.create({ name, email, password, shopName });
  const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ user: seller, token });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  if (!seller || !(await seller.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ user: seller, token });
});

module.exports = router;
