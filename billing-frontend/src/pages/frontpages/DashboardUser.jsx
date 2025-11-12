import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { CreditCard, Clock, CheckCircle } from "lucide-react";

export default function DashboardUser() {
  const [krama, setKrama] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // === KONFIGURASI API & AUTENTIKASI ===
  // Ganti dengan endpoint API backend Anda yang sebenarnya
  const API_URL = "http://127.0.0.1:8000"; 
  
  // Pastikan kunci ini sama dengan kunci yang digunakan saat menyimpan token
  const TOKEN_KEY = "userToken"; 
  const token = localStorage.getItem(TOKEN_KEY);
  // =====================================

  // 🔥 SOLUSI PENCEGAHAN REDIRECT LOOP 🔥
  // Lakukan pengecekan token secara SINKRON di sini.
  if (!token) {
    // Redirect langsung ke halaman login jika token tidak ada di localStorage.
    // Mengembalikan null menghentikan rendering komponen ini.
    navigate("/login");
    return null; 
  }

  useEffect(() => {
    async function fetchDashboardData() {
      // Token dipastikan ada, lanjutkan proses fetching
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Mengirim token autentikasi
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Menangani 401 Unauthorized (token ditolak/kedaluwarsa oleh backend)
          if (response.status === 401) {
             console.warn("Token ditolak oleh backend. Mengarahkan ke login.");
             localStorage.removeItem(TOKEN_KEY); 
             navigate("/login"); 
             return; 
          }
          
          // Menangani error HTTP lainnya
          const errorData = await response.json();
          throw new Error(errorData.message || `Gagal mengambil data: Status ${response.status}`);
        }

        const data = await response.json();
        setKrama(data);

      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [token, navigate]); // Dependencies: token dan navigate

  // --- Bagian Kondisi Pemuatan dan Error ---
  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Memuat data krama...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 max-w-xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md">
        <p className="font-bold text-lg">Gagal memuat dashboard:</p>
        <p className="text-sm italic my-2">{error}</p>
        <p className="mt-4 text-xs font-semibold">Cek koneksi, backend, dan status token.</p>
      </div>
    );
  }
  
  if (!krama) {
    return <p className="text-center mt-10 text-gray-600">Tidak ada data krama yang ditemukan.</p>;
  }


  // --- Bagian Rendering Dashboard ---
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6 mt-8 border border-gray-100">
      <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-6 border-b pb-3">
        Dashboard Krama Desa
      </h1>

      {/* Identitas Krama */}
      <div className="space-y-2 mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg">
          <strong className="text-gray-600">Nama:</strong> <span className="font-semibold text-gray-800">{krama.nama}</span>
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Status:</strong> <span className="font-semibold text-green-700">{krama.status}</span>
        </p>
        <p className="text-lg">
          <strong className="text-gray-600">Tanggal Tagihan Terakhir:</strong> <span className="font-medium text-gray-800">{krama.tanggalTerakhir}</span>
        </p>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {/* Box Iuran */}
        <div className="p-5 bg-blue-50 hover:bg-blue-100 transition duration-300 rounded-xl border border-blue-200 shadow-md">
          <CreditCard className="mx-auto text-blue-600 mb-3 h-8 w-8" />
          <p className="font-semibold text-gray-700 uppercase tracking-wider text-sm">Iuran Wajib</p>
          <p className="text-2xl font-black text-blue-800 mt-1">
            Rp {krama.iuran.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Box Status Pembayaran */}
        <div className={`p-5 rounded-xl border shadow-md transition duration-300 ${
              krama.statusPembayaran === "Sudah Bayar"
                ? "bg-green-50 hover:bg-green-100 border-green-200"
                : "bg-red-50 hover:bg-red-100 border-red-200"
            }`}>
          <CheckCircle className={`mx-auto mb-3 h-8 w-8 ${krama.statusPembayaran === "Sudah Bayar" ? "text-green-600" : "text-red-600"}`} />
          <p className="font-semibold text-gray-700 uppercase tracking-wider text-sm">Status Pembayaran</p>
          <p
            className={`text-2xl font-black mt-1 ${
              krama.statusPembayaran === "Sudah Bayar"
                ? "text-green-700"
                : krama.statusPembayaran === "Pending"
                ? "text-yellow-600"
                : "text-red-700"
            }`}
          >
            {krama.statusPembayaran}
          </p>
        </div>

        {/* Box Denda */}
        <div className="p-5 bg-orange-50 hover:bg-orange-100 transition duration-300 rounded-xl border border-orange-200 shadow-md">
          <Clock className="mx-auto text-orange-600 mb-3 h-8 w-8" />
          <p className="font-semibold text-gray-700 uppercase tracking-wider text-sm">Denda Total</p>
          <p className="text-2xl font-black text-orange-800 mt-1">
            Rp {krama.denda.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <Link
          to="/pembayaran" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-center font-bold shadow-lg transition duration-300 transform hover:scale-105"
        >
          Bayar Iuran
        </Link>
        <Link
          to="/riwayat"
          className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl text-center font-bold shadow-lg transition duration-300 transform hover:scale-105"
        >
          Lihat Riwayat Pembayaran
        </Link>
      </div>
    </div>
  );
}