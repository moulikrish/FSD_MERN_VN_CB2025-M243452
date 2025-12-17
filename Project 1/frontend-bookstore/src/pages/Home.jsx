import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const CATEGORIES = [
    { title: "Fiction", icon: "📖" },
    { title: "Science", icon: "🔬" },
    { title: "Biographies", icon: "👤" },
    { title: "Children's Books", icon: "🧒" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f0fff4] text-[#2d3748] font-sans">
        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-green-200 sticky top-0 z-20">
          {/* LOGO */}
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-wide text-[#2f855a]">
            <img
              src="/posbooks.png"
              alt="PosBooks Logo"
              className="w-14 h-14 object-contain"
            />
            PosBooks
          </h1>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-[#2f855a] text-white rounded-lg hover:bg-[#276749] transition duration-300 shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#38a169] text-white rounded-lg hover:bg-[#2f855a] transition duration-300 shadow"
            >
              Register
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl text-[#2f855a]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </header>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-green-200 shadow-lg px-6 py-4 flex flex-col gap-4 animate-fadeIn">
            <Link
              to="/login"
              className="px-4 py-2 bg-[#2f855a] text-white rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#38a169] text-white rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}

        {/* HERO SECTION */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#276749] leading-tight">
            Discover Books That Inspire Growth
          </h2>

          <p className="text-lg text-[#4a5568] max-w-2xl mb-8">
            Explore a world filled with knowledge, imagination, and endless
            possibilities — all curated for passionate readers like you.
          </p>

          <Link
            to="/login"
            className="px-8 py-3 bg-gradient-to-r from-[#38a169] to-[#2f855a] text-white font-bold rounded-full hover:scale-110 transition duration-300 shadow-lg"
          >
            Browse Books
          </Link>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="bg-[#e7f5e9] py-20 px-6">
          <h3 className="text-4xl font-extrabold text-center mb-14 text-[#1b4332] tracking-wide">
            Explore Categories
          </h3>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {CATEGORIES.map((cat, index) => (
              <Link
                to="/login"
                key={index}
                className="
                bg-white/80 
                backdrop-blur-sm 
                border border-[#ccebd4]
                rounded-2xl p-8 shadow-md 
                flex flex-col items-center 
                hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300 cursor-pointer
              "
              >
                <div className="w-20 h-20 bg-[#c6f6d5] text-[#276749] rounded-full flex items-center justify-center text-4xl shadow-inner mb-4">
                  {cat.icon}
                </div>

                <h4 className="text-xl font-bold text-[#2e7d32] mt-2">
                  {cat.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
