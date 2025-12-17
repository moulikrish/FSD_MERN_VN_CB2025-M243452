import React, { useState, useContext } from "react";
import API from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddBook = ({ onNewBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [bookImage, setBookImage] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("price", price);
      formData.append("genre", genre);
      formData.append("description", description);
      formData.append("sellerId", user._id);
      formData.append("sellerName", user.name);
      if (bookImage) formData.append("bookImage", bookImage);

      const { data } = await API.post("/books/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onNewBook) onNewBook(data);
      navigate("/seller/dashboard");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book. Check console for details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-green-50 border border-green-200 rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-6 text-green-900 text-center">
        Add New Book
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Title */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Book Title
          </label>
          <input
            className="w-full border border-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Author
          </label>
          <input
            className="w-full border border-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            className="w-full border border-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Genre
          </label>
          <input
            className="w-full border border-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-green-300 px-3 py-2 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Book Image */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Book Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-green-900"
            onChange={(e) => setBookImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold shadow-md transition-all">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
