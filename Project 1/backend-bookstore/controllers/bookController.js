const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");


/* ============================================
   Get all books (with search & genre filter)
============================================ */
const getBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { author: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const genreFilter = req.query.genre ? { genre: req.query.genre } : {};

  const books = await Book.find({ ...keyword, ...genreFilter });
  res.json(books);
});

/* ============================================
   Get a single book by ID
============================================ */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

/* ============================================
   Create a book (Seller/Admin)
============================================ */
const createBook = asyncHandler(async (req, res) => {
  const { title, author, price, genre, description, sellerId, sellerName } = req.body;

  const book = new Book({
    title,
    author,
    price,
    genre,
    description,
    sellerId,
    sellerName,
    bookImage: req.file ? req.file.path : null, // image support
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

/* ============================================
   Update a book
============================================ */
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.genre = req.body.genre || book.genre;
  book.price = req.body.price || book.price;
  book.description = req.body.description || book.description;
  if (req.file) book.bookImage = req.file.path;

  const updatedBook = await book.save();
  res.json(updatedBook);
});

/* ============================================
   Delete a book
============================================ */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.remove();
  res.json({ message: "Book removed" });
});

/* ============================================
   Add a review to a book
============================================ */
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const book = await Book.findById(req.params.bookId);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  const alreadyReviewed = book.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Book already reviewed by this user");
  }

  const review = {
    user: req.user._id,
    book: bookId,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  book.reviews.push(review);
  book.numReviews = book.reviews.length;
  book.ratings = book.reviews.reduce((acc, item) => acc + item.rating, 0) / book.reviews.length;

  await book.save();
  res.status(201).json({ message: "Review added" });
});

// const getSellerBooks = async (req, res) => {
//   const sellerId = req.user.id; // from token
//   const books = await Book.find({ seller: sellerId });
//   res.json(books);
// };

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addReview,
};
