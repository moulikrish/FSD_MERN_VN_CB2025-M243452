import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      login(data);

      if (data.user.isAdmin) navigate("/admin");
      else if (data.user.isSeller) navigate("/seller");
      else navigate("/Books");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 font-serif">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-xl border border-green-200">
        <h3 className="text-3xl font-bold text-center mb-4 text-green-900">
          Welcome Back
        </h3>

        <p className="text-center text-green-700 mb-6">
          Login to continue your reading journey 📚✨
        </p>

        {msg && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-medium text-green-900">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-900 transition-colors duration-200 shadow-lg disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-green-900">
          New here?{" "}
          <a
            href="/register"
            className="text-green-700 font-medium hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
