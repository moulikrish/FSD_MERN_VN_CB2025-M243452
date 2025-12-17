import React from "react";
import { Link } from "react-router-dom";

const InventoryTable = ({ books, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
        
        {/* Table Head */}
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Author</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {books.map((b) => (
            <tr
              key={b._id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="px-4 py-3">{b.title}</td>
              <td className="px-4 py-3">{b.author}</td>
              <td className="px-4 py-3">₹{b.price}</td>
              <td className="px-4 py-3">{b.stock}</td>
              <td className="px-4 py-3 flex items-center space-x-3">
                
                {/* Edit Button */}
                <Link
                  to={`/seller/edit-book/${b._id}`}
                  className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(b._id)}
                  className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default InventoryTable;
