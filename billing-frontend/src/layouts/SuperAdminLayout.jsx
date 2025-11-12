// src/layouts/SuperAdminLayout.jsx
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function SuperAdminLayout({ children }) {
  const handleLogout = async () => {
    try {
      // 🔹 Logout ke backend Laravel
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
      // 🔹 Bersihkan session localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 🔹 Kembali ke halaman login
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="p-4 text-center text-xl font-bold border-b border-purple-600">
          Super Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <Link
            to="/super/dashboard"
            className="block py-2 px-3 rounded hover:bg-purple-700"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/super/admins"
            className="block py-2 px-3 rounded hover:bg-purple-700"
          >
            👥 Data Admin
          </Link>
          <Link
            to="/super/transaksi"
            className="block py-2 px-3 rounded hover:bg-purple-700"
          >
            💰 Semua Transaksi
          </Link>
        </nav>

        {/* Tombol Logout */}
        <div className="p-4 border-t border-purple-600">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Sistem Pembayaran Iuran Desa - Super Admin
          </h1>
          <span className="text-gray-600 text-sm">Super Admin</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
