import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Unavbar from "../../components/Unavbar";
import Footer from "../../components/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/orders/getorders/${user._id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [navigate]);

  const getStatus = (deliveryDate) => {
    return new Date(deliveryDate) >= new Date() ? "On the way" : "Delivered";
  };

  return (
    <>
      <div className="min-h-screen bg-green-50 text-green-900 font-serif">
        <Unavbar />
        <div className="py-8 px-4 max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-green-700">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <p className="text-center text-green-500">
              You have no orders yet.
            </p>
          ) : (
            orders.map((order) => {
              const status = getStatus(order.Delivery);
              return (
                <div
                  key={order._id}
                  className="bg-green-100 p-4 rounded-lg shadow-md border border-green-200 flex flex-col md:flex-row gap-4 items-center"
                >
                  <img
                    src={`http://localhost:5000/${order.itemImage}`}
                    alt={order.booktitle}
                    className="h-24 w-24 object-contain rounded border border-green-200"
                  />

                  <div className="flex-1 space-y-1">
                    <p>
                      <strong>Product:</strong> {order.booktitle} (
                      {order.bookgenre})
                    </p>
                    <p>
                      <strong>Seller:</strong> {order.sellerName || "Unknown"}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{order.totalamount}
                    </p>
                    <p>
                      <strong>Booking Date:</strong> {order.BookingDate}
                    </p>
                    <p>
                      <strong>Delivery By:</strong> {order.Delivery}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          status === "Delivered"
                            ? "text-green-700 font-bold"
                            : "text-green-900 font-bold"
                        }
                      >
                        {status}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-green-600">Delivery Address:</span>
                    <span>
                      {order.flatno}, {order.city}, {order.state} (
                      {order.pincode})
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
