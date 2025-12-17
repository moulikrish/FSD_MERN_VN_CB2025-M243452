const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Book title is required"] },
    author: { type: String, required: [true, "Author name is required"] },
    description: { type: String },
    genre: { type: String },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, default: 0 },

    // Reviews
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],

    // Image
    bookImage: { type: String },

    // Seller Info
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sellerName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
