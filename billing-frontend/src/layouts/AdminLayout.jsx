// src/layouts/AdminLayout.jsx
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function AdminLayout({ children }) {
  const handleLogout = async () => {
    try {
      // 🔹 Panggil endpoint logout Laravel Sanctum
      await apiClient.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 🔹 Hapus token dan role dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 🔹 Arahkan kembali ke halaman login
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 text-center text-xl font-bold border-b border-blue-600">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <Link
            to="/admin/dashboard"
            className="block py-2 px-3 rounded hover:bg-blue-700"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/datakrama"
            className="block py-2 px-3 rounded hover:bg-blue-700"
          >
            👥 Data Krama
          </Link>
          <Link
            to="/admin/tagihan"
            className="block py-2 px-3 rounded hover:bg-blue-700"
          >
            💰 Tagihan
          </Link>
          <Link
            to="/admin/validasi"
            className="block py-2 px-3 rounded hover:bg-blue-700"
          >
            ✅ Validasi Pembayaran
          </Link>
        </nav>

        {/* Tombol Logout */}
        <div className="p-4 border-t border-blue-600">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Sistem Pembayaran Iuran Krama
          </h1>
          <span className="text-gray-600 text-sm">Admin</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
