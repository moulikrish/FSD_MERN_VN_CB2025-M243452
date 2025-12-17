import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Unavbar from "../../components/Unavbar";
import Footer from "../../components/Footer"

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

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
    fetchWishlist();
  }, [user]);

  const removeItem = async (itemId) => {
    if (!user) return;
    try {
      await API.post("/wishlist/remove", { userId: user._id, itemId });
      fetchWishlist(); // refresh
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (!user)
    return (
      <p className="text-center mt-6 text-green-800 font-medium">
        Please log in to view your wishlist.
      </p>
    );

  return (
    <>
    <div className="min-h-screen bg-green-50 text-green-900 font-serif">
      <Unavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-green-700">
          My Wishlist
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {wishlist.length === 0 ? (
            <p className="col-span-full text-center text-green-500 font-medium">
              No items in wishlist.
            </p>
          ) : (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-green-100 border border-green-200 w-full max-w-xs rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={`http://localhost:5000/${item.itemImage}`}
                  alt={item.title}
                  className="rounded-t-2xl object-cover w-full h-64 sm:h-72"
                />
                <div className="p-4 space-y-2">
                  <p className="text-lg font-bold">{item.title}</p>
                  <p className="text-sm text-green-800">Added by: {item.userName}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => removeItem(item.itemId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/uitem/${item.itemId}`}
                      className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Wishlist;
