const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addReview,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // multer upload

// ---------------------------
// PUBLIC ROUTES
// ---------------------------
router.get("/", getBooks);           // Get all books
router.get("/:id", getBookById);     // Get single book

// ---------------------------
// SELLER / ADMIN ROUTES
// ---------------------------
router.post("/add", protect, upload.single("bookImage"), createBook); // Add book with image
router.put("/:id", protect, upload.single("bookImage"), updateBook); // Update book
router.delete("/:id", protect, deleteBook);                            // Delete book

// ---------------------------
// REVIEWS
// ---------------------------
router.post("/:bookId/reviews", protect, addReview); // Add review

module.exports = router;
