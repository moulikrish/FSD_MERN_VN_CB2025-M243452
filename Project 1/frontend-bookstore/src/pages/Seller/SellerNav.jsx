import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Make sure to install @heroicons/react

const SellerNav = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/seller" },
    { name: "Add Book", to: "/seller/add-book" },
    { name: "Logout", to: "/login" },
    // { name: "Inventory", to: "/seller/inventory" },
    // { name: "Orders", to: "/seller/orders" },
    // { name: "Profile", to: "/seller/profile" },
  ];

  return (
    <>
    <nav className="bg-green-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/seller/dashboard"
          className="text-2xl font-bold hover:text-green-300 transition"
        >
          Seller Dashboard
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className={`hover:text-green-300 transition font-medium ${
                  active === link.name.toLowerCase() ? "text-green-400" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XIcon className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`block text-white py-2 px-3 rounded hover:bg-green-700 transition ${
                active === link.name.toLowerCase() ? "bg-green-700" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
    </>
  );
};

export default SellerNav;
