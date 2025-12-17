import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import Unavbar from "../components/Unavbar";
import Footer from "../components/Footer";

const Products = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch all books
  const fetchItems = async () => {
    try {
      const { data } = await API.get("/books");
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Fetch wishlist for current user
  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const { data } = await API.get(`/wishlist/${user._id}`);
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchWishlist();
  }, [user]);

  // Add to wishlist
  const addToWishlist = async (item) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      await API.post("/wishlist", {
        userId: user._id,
        userName: user.name,
        itemId: item._id,
        title: item.title,
        itemImage: item.bookImage,
      });
      fetchWishlist(); // refresh wishlist
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (itemId) => {
    if (!user) return;
    try {
      await API.post("/wishlist/remove", {
        userId: user._id,
        itemId,
      });
      fetchWishlist(); // refresh wishlist
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (itemId) => wishlist.some((w) => w.itemId === itemId);

  return (
    <>
      <div className="min-h-screen bg-green-50 text-green-900 font-serif">
        <Unavbar />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-green-700">
            Books List
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {items.map((item) => (
              <div
                key={item._id}
                className="w-full max-w-xs bg-green-100 border border-green-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={`http://localhost:5000/${item.bookImage}`}
                  alt={item.title}
                  className="rounded-t-2xl object-cover w-full h-64 sm:h-72"
                />
                <div className="p-4 space-y-1">
                  <p className="text-lg font-bold">{item.title}</p>
                  <p className="text-sm">Author: {item.author}</p>
                  <p className="text-sm">Genre: {item.genre}</p>
                  <p className="text-green-800 font-semibold">₹{item.price}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {isInWishlist(item._id) ? (
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                        onClick={() => removeFromWishlist(item._id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg text-sm transition"
                        onClick={() => addToWishlist(item)}
                      >
                        Wishlist
                      </button>
                    )}

                    <Link
                      to={`/uitem/${item._id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
