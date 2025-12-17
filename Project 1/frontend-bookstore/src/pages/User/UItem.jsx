import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Unavbar from "../../components/Unavbar";
import Footer from "../../components/Footer";

const Uitem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error("Failed to fetch item:", err));
  }, [id]);

  if (!item)
    return (
      <div className="text-center mt-20 text-green-700 font-semibold">
        Loading...
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-green-50 text-green-900 font-serif">
        <Unavbar />
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          {/* Book Image */}
          <div className="flex justify-center">
            <img
              src={`http://localhost:5000/${item.bookImage}`}
              alt={item.title}
              className="h-[450px] object-contain rounded-lg shadow-md border border-green-200"
            />
          </div>

          {/* Description & Info */}
          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <div className="md:w-1/2 bg-green-100 p-6 rounded-lg shadow border border-green-200">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Description
              </h2>
              <hr className="border-green-300 mb-4" />
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>

            <div className="md:w-1/2 bg-green-100 p-6 rounded-lg shadow border border-green-200">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Info
              </h2>
              <hr className="border-green-300 mb-4" />
              <p>
                <strong>Title:</strong> {item.title}
              </p>
              <p>
                <strong>Author:</strong> {item.author}
              </p>
              <p>
                <strong>Genre:</strong> {item.genre}
              </p>
              <p>
                <strong>Price:</strong> ₹{item.price}
              </p>
              <p>
                <strong>Seller:</strong> {item.sellerName}
              </p>
            </div>
          </div>

          {/* Buy Now Button */}
          <div className="flex justify-center mt-6">
            <Link to={`/orderitem/${item._id}`}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-medium transition-all">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Uitem;
