// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient"; // ✅ pastikan path-nya benar

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/login", form);
      const { token, user } = response.data;

      // ✅ Simpan token & role ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // ✅ Arahkan sesuai role
      if (user.role === "superadmin") {
        navigate("/super/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan, coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Sistem Pembayaran Iuran Krama Desa
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Gunakan akun yang sudah terdaftar di sistem.
        </p>
      </div>
    </div>
  );
}
