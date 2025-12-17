import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/books");
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const deleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/books/${id}`);
        loadBooks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Navbar dashboardType="admin" />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 mb-6">Welcome, {user?.name}</p>

          <div className="mb-6">
            <Link
              to="/admin/add-book"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Add New Book
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-500">No books available.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Author
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {books.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-700">{b.title}</td>
                      <td className="px-4 py-2 text-gray-700">{b.author}</td>
                      <td className="px-4 py-2 text-gray-700">₹{b.price}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Link
                          to={`/admin/edit-book/${b._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteBook(b._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
