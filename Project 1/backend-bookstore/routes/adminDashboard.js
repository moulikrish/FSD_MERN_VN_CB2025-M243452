const express = require("express");
const Book = require("../models/Seller/BookSchema");
const router = express.Router();
const { protectAdmin } = require("../middleware/authMiddleware");

// GET all books (admin view)
router.get("/books", protectAdmin, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// DELETE a book
router.delete("/books/:id", protectAdmin, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  await book.remove();
  res.json({ message: "Book removed" });
});

module.exports = router;
