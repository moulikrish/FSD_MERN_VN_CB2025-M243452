import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Unavbar from "../../components/Unavbar";
import Footer from "../../components/Footer";

const OrderItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    flatno: "",
    city: "",
    pincode: "",
    state: "",
  });

  const deliveryFee = 99;
  const totalAmount = item ? parseInt(item.price, 10) + deliveryFee : 0;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error("Failed to fetch item:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!item) return;

    const currentDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 5);

    const orderData = {
      userId: user._id,
      userName: user.name,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
      booktitle: item.title,
      bookauthor: item.author,
      bookgenre: item.genre,
      itemImage: item.bookImage,
      flatno: formData.flatno,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      totalamount: totalAmount,
      BookingDate: currentDate.toISOString().split("T")[0],
      Delivery: deliveryDate.toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      alert("Order placed successfully!");
      navigate("/myorders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

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
        <div className="flex justify-center px-4 py-10">
          <div className="w-full max-w-lg bg-green-100 border border-green-200 rounded-xl shadow-md p-6">
            <h2 className="text-3xl text-center font-bold mb-6 text-green-800">
              Complete Your Order
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="flatno"
                value={formData.flatno}
                onChange={handleChange}
                placeholder="Flat No / Street"
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              <div className="mt-6 border-t border-green-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>₹{item.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow transition-all"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderItem;
