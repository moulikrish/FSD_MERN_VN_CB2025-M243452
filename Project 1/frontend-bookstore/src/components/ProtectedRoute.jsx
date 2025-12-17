import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  role,
  adminRequired = false,
  sellerRequired = false,
}) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (adminRequired && !user.isAdmin) return <Navigate to="/" replace />;

  if (sellerRequired && !user.isSeller) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <div className="container py-3">{children}</div>;
};

export default ProtectedRoute;
