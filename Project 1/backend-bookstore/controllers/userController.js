const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    message: "Registration successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

// LOGIN USER
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// GET PROFILE (protected)
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

// Get all items
const getItems = async (req, res) => {
  try {
    const images = await Book.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get single item
const getSingleItem = async (req, res) => {
  const { id } = req.params;
  try {
   const item = await Book.findById(id).populate('sellerId', 'name email');
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching single item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createUserOrder = async (req, res) => {
  const { flatno, city, state, pincode, totalamount, BookingDate, description, Delivery, userId, userName, booktitle, bookauthor, bookgenre, itemImage, sellerId } = req.body;

  try {
    const order = new MyOrders({
      flatno,
      city,
      state,
      pincode,
      totalamount,
      sellerId, 
      BookingDate,
      description,
      userId,
      Delivery,
      userName,
      booktitle,
      bookauthor,
      bookgenre,
      itemImage
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: "Failed to create order" });
  }
};


// Get orders by user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await MyOrders.find({ userId }).sort("position");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get all wishlist items
const getWishlist = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getUserWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await WishlistItem.find({ userId }).populate('bookId');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// Add to wishlist
const addWishlistItem = async (req, res) => {
  const { bookId, title, itemImage, userId, userName } = req.body;
  try {
    const existingItem = await WishlistItem.findOne({ bookId, userId });
    if (existingItem) {
      return res.status(400).json({ msg: "Item already in wishlist" });
    }

    const newItem = new WishlistItem({ bookId, title, itemImage, userId, userName });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Remove from wishlist
const removeWishlistItem = async (req, res) => {
  const { itemId } = req.body;
  try {
    await WishlistItem.findOneAndDelete({ itemId });
    res.json({ msg: "Item removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { registerUser, authUser, getProfile };
