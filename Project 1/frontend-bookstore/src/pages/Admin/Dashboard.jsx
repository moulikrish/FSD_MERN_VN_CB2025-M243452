import React, { useEffect, useState } from "react";
import API from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/books");
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>

          <div className="mb-6">
            <Link
              to="/admin/add-book"
              className="inline-block bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
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
                    <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Author</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {books.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-700">{b.title}</td>
                      <td className="px-4 py-2 text-gray-700">{b.author}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Link
                          to={`/admin/edit-book/${b._id}`}
                          className="bg-green-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Edit
                        </Link>
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

export default Dashboard;
