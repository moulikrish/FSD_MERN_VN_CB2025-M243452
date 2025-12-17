import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-[#1b4332] rounded-2xl shadow-lg p-5 flex flex-col h-full hover:shadow-xl transition-shadow">
      <h5 className="text-[#f0f4ed] text-xl font-bold tracking-wide">
        {book.title}
      </h5>

      <p className="text-[#e7f5e9] text-sm mt-1 italic">{book.author}</p>

      <p className="mt-auto text-[#f0f4ed] text-lg font-extrabold">
        ₹{book.price}
      </p>

      <Link
        to={`/book/${book._id}`}
        className="mt-4 bg-[#f0f4ed] text-[#1b4332] font-bold w-full text-center py-2 rounded-lg border border-[#e7f5e9] hover:bg-[#e7f5e9] active:scale-95 transition-all"
      >
        Details
      </Link>
    </div>
  );
};

export default BookCard;
