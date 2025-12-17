const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String },
    itemImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
