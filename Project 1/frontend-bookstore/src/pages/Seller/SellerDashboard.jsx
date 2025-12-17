import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../utils/axiosInstance";
import SellerNav from "../Seller/SellerNav";
import UploadBookForm from "../Seller/UploadBookForm";
import InventoryTable from "../Seller/InventoryTable";
import OrdersList from "../Seller/OrdersList";
import SellerProfile from "../Seller/SellerProfile";

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("overview");
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/books/seller");
      setBooks(data);
    } catch (err) {
      console.error("Error fetching seller books", err);
    }
    setLoading(false);
  };

  // const loadOrders = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await API.get("/orders/seller"); // adjust endpoint
  //     setOrders(data);
  //   } catch (err) {
  //     console.error("Error fetching seller orders", err);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    loadBooks();
    // loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <SellerNav active={view} onChange={(v) => setView(v)} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-2 text-green-900">
          Seller Dashboard
        </h2>
        <p className="text-green-700 mb-6">Welcome back, {user?.name}!</p>

        {/* ---------------- OVERVIEW VIEW ---------------- */}
        {view === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white p-5 shadow-lg rounded-xl hover:shadow-2xl transition text-center">
                  <h5 className="text-green-500 font-medium">Books</h5>
                  <h2 className="text-3xl font-bold text-green-900">
                    {books.length}
                  </h2>
                </div>

                <div className="bg-white p-5 shadow-lg rounded-xl hover:shadow-2xl transition text-center">
                  <h5 className="text-green-500 font-medium">Orders</h5>
                  <h2 className="text-3xl font-bold text-green-900">
                    {orders.length}
                  </h2>
                </div>
              </div>

              {/* Profile Section */}
              <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
                <SellerProfile />
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-green-800">
                Recent Orders
              </h3>
              <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition">
                <OrdersList orders={orders.slice(0, 3)} />
              </div>
            </div>
          </>
        )}

        {/* ---------------- UPLOAD VIEW ---------------- */}
        {view === "upload" && (
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">
              Upload New Book
            </h3>
            <UploadBookForm onUploaded={() => loadBooks()} />
          </div>
        )}

        {/* ---------------- INVENTORY VIEW ---------------- */}
        {view === "inventory" && (
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">
              Inventory
            </h3>
            <InventoryTable books={books} onUpdate={(next) => setBooks(next)} />
          </div>
        )}

        {/* ---------------- ORDERS VIEW ---------------- */}
        {view === "orders" && (
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">
              Orders
            </h3>
            <OrdersList orders={orders} />
          </div>
        )}

        {/* ---------------- PROFILE VIEW ---------------- */}
        {view === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">
              Profile
            </h3>
            <SellerProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
