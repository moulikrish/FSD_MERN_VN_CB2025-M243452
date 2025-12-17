import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";

const EditBook = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await API.get(`/books/${id}`);
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/books/${id}`, { title, author, price });
      nav("/admin/dashboard");
    } catch (err) {
      console.error("Failed to update book:", err);
      alert("Failed to update book. Check console for details.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Edit Book</h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-green-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBook;
