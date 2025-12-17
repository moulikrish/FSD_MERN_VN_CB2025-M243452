const Review = require("../models/Review");
const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

// POST /api/reviews/:bookId
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if user already reviewed
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    book: bookId
  });

  if (alreadyReviewed) {
    return res.status(400).json({ message: "You already reviewed this book" });
  }

  // Create review
  const review = await Review.create({
    user: req.user._id,
    book: bookId,
    rating,
    comment
  });

  res.status(201).json({
    message: "Review added successfully",
    review
  });
});

module.exports = { addReview };
