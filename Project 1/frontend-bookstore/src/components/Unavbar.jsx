import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Unavbar = () => {
  const get = localStorage.getItem("user");
  const user = get ? JSON.parse(get) : { name: "User" };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-600 text-green-50 font-serif shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/uproducts"
          className="text-2xl font-bold tracking-wide hover:text-green-100 transition"
        >
          PosBooks
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/books" className="hover:text-green-100 transition">
            Home
          </Link>
          <Link to="/uproducts" className="hover:text-green-100 transition">
            Books
          </Link>
          <Link to="/wishlist" className="hover:text-green-100 transition">
            Wishlist
          </Link>
          <Link to="/myorders" className="hover:text-green-100 transition">
            My Orders
          </Link>
          <Link to="/" className="hover:text-green-100 transition">
            Logout
          </Link>
          <span className="text-sm font-medium italic opacity-90">
            ({user.name})
          </span>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-green-50 focus:outline-none">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700/95 shadow-lg">
          <div className="flex flex-col items-center py-4 space-y-3 text-lg">
            <Link
              to="/books"
              onClick={toggleMenu}
              className="hover:text-green-100 transition"
            >
              Home
            </Link>
            <Link
              to="/uproducts"
              onClick={toggleMenu}
              className="hover:text-green-100 transition"
            >
              Books
            </Link>
            <Link
              to="/wishlist"
              onClick={toggleMenu}
              className="hover:text-green-100 transition"
            >
              Wishlist
            </Link>
            <Link
              to="/myorders"
              onClick={toggleMenu}
              className="hover:text-green-100 transition"
            >
              My Orders
            </Link>
            <Link
              to="/"
              onClick={toggleMenu}
              className="hover:text-green-100 transition"
            >
              Logout
            </Link>
            <span className="text-sm font-medium italic opacity-90">
              ({user.name})
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Unavbar;
