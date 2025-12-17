import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import AddBook from "./components/AddBook";
import EditBook from "./pages//Admin/EditBook";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import Books from "./pages/User/Books";
import Products from "./pages/Products";
import Wishlist from "./pages/User/Wishlist";
import UItem from "./pages/User/UItem";
import OrderItem from "./pages/User/OrderItem";
import Myorders from "./pages/User/MyOrders";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          {/* Common routes register & login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/uproducts" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/uitem/:id" element={<UItem />} />
          <Route path="/orderitem/:id" element={<OrderItem />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/seller/add-book" element={<AddBook/>} />

          {/* public protected */}
          <Route
            path="/uproducts"
            element={
              <ProtectedRoute role="user">
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderitem/:id"
            element={
              <ProtectedRoute role="user">
                <OrderItem />
              </ProtectedRoute>
            }
          />

          {/* Admin protected*/}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminRequired={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-book"
            element={
              <ProtectedRoute adminRequired={true}>
                <AddBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-book/:id"
            element={
              <ProtectedRoute adminRequired={true}>
                <EditBook />
              </ProtectedRoute>
            }
          />

          {/* Seller routes*/}
          <Route path="/seller" element={<SellerDashboard />} />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute sellerRequired={true}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/add-book"
            element={
              <ProtectedRoute sellerRequired={true}>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
