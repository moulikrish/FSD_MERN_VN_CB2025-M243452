const express = require("express");
const Book = require("../models/Seller/BookSchema");
const router = express.Router();
const { protectSeller } = require("../middleware/authMiddleware");

// GET all seller's books
router.get("/books", protectSeller, async (req, res) => {
  const books = await Book.find({ seller: req.seller._id });
  res.json(books);
});

// POST a new book
router.post("/books", protectSeller, async (req, res) => {
  const { title, author, price } = req.body;
  const book = await Book.create({
    title,
    author,
    price,
    seller: req.seller._id,
  });
  res.json(book);
});

// DELETE a book
router.delete("/books/:id", protectSeller, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.seller.toString() !== req.seller._id.toString())
    return res.status(401).json({ message: "Not authorized" });
  await book.remove();
  res.json({ message: "Book removed" });
});

module.exports = router;
