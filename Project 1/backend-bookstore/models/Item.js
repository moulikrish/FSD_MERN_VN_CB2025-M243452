const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  itemImage: String,
});

module.exports = mongoose.model("Item", itemSchema);
