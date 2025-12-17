import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // remove user + token from context
    navigate("/login");
  };

  // Determine Home link dynamically based on user role
  const getHomeLink = () => {
    if (user?.isAdmin) return "/admin";
    if (user?.isSeller) return "/seller";
    return "/"; // normal users or not logged in
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-danger shadow-sm"
      style={{ paddingTop: "0.1rem", paddingBottom: "0.1rem" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-light" to={getHomeLink()}>
          📘 Bookstore
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
          aria-controls="navmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Home Link */}
            <li className="nav-item">
              <Link
                className="nav-link text-light nav-link-hover link-secondary"
                to={getHomeLink()}
              >
                Home
              </Link>
            </li>

            {/* User Info / Auth Buttons */}
            {user ? (
              <>
                <li className="nav-item nav-link text-light">
                  Hi, {user.name}
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-warning text-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light nav-link-hover link-secondary"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light nav-link-hover link-secondary"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
