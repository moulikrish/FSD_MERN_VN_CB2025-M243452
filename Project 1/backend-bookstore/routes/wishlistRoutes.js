const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// Get wishlist for a user
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId });
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to wishlist
router.post("/", async (req, res) => {
  try {
    const { userId, userName, itemId, title, itemImage } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ message: "User ID and Item ID are required" });
    }

    const exists = await Wishlist.findOne({ userId, itemId });
    if (exists) return res.status(400).json({ message: "Item already in wishlist" });

    const wishlistItem = await Wishlist.create({ userId, userName, itemId, title, itemImage });
    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from wishlist
router.post("/remove", async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    await Wishlist.deleteOne({ userId, itemId });
    res.json({ message: "Removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
