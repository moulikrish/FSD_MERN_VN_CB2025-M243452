import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      login(data);

      if (role === "admin") nav("/admin/dashboard");
      else if (role === "seller") nav("/seller/dashboard");
      else nav("/Books");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 font-serif">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-xl border border-green-200">
        <h3 className="text-3xl font-bold text-center text-green-900 mb-4">
          Create Account
        </h3>

        <p className="text-center text-green-700 mb-6">
          Begin your literary adventure — SignUp ✨📚
        </p>

        {msg && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-green-900">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-green-900">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-green-900">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter a password"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block mb-1 font-medium text-green-900">Select Role</label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-green-700 text-white py-2.5 rounded-lg font-semibold hover:bg-green-900 active:scale-95 transition disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-green-900">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
