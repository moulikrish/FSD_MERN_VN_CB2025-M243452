const Wishlist = require("../models/Wishlist");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { itemId, userId } = req.body;

    if (!itemId || !userId) {
      return res.status(400).json({ message: "itemId and userId are required" });
    }

    // Prevent duplicate wishlist entries
    const exists = await Wishlist.findOne({ itemId, userId });
    if (exists) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const wishlistItem = await Wishlist.create({ itemId, userId });
    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get wishlist for a user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate("itemId");
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
