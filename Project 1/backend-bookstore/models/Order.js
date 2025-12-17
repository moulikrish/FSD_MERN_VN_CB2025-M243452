const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true },

    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sellerName: { type: String },

    booktitle: { type: String, required: true },
    bookauthor: { type: String },
    bookgenre: { type: String },
    itemImage: { type: String },

    flatno: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    totalamount: { type: Number, required: true },
    BookingDate: { type: String },
    Delivery: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
