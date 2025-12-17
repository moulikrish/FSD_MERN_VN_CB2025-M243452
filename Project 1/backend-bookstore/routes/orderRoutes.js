const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place order
router.post("/", async (req, res) => {
  try {
    if (!req.body.userId) return res.status(400).json({ message: "userId required" });
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders for a user
router.get("/getorders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
