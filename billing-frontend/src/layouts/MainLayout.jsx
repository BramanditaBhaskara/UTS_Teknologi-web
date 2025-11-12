// src/layouts/MainLayout.jsx
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function MainLayout({ children }) {
  const handleLogout = async () => {
    try {
      // 🔹 Kirim request logout ke backend Laravel
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
      // 🔹 Hapus semua session dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 🔹 Arahkan ke halaman login
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Sistem Pembayaran Iuran Krama Desa</h1>

        <nav className="space-x-4">
          <Link
            to="/user/dashboard"
            className="hover:underline"
          >
            Dashboard
          </Link>
          <Link
            to="/pembayaran"
            className="hover:underline"
          >
            Pembayaran
          </Link>
          <Link
            to="/riwayat"
            className="hover:underline"
          >
            Riwayat
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium"
          >
            Keluar
          </button>
        </nav>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} Sistem Pembayaran Iuran Krama Desa
      </footer>
    </div>
  );
}
