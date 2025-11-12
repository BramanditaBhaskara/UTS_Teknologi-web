// src/pages/adminpages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalKrama: 0,
    sudahBayar: 0,
    belumBayar: 0,
  });

  const [dataKrama, setDataKrama] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Ambil semua krama
        const resKrama = await apiClient.get("/kramas");
        const kramas = resKrama.data;

        // 🔹 Ambil data pembayaran
        const resBayar = await apiClient.get("/pembayaran");
        const pembayaran = resBayar.data;

        // 🔹 Gabungkan data krama + status pembayaran
        const merged = kramas.map((krama) => {
          const bayar = pembayaran.find((p) => p.nik === krama.nik);
          let statusBayar = "Belum Bayar";
          if (bayar) {
            if (bayar.keterangan?.toLowerCase() === "selesai" || bayar.keterangan?.toLowerCase() === "lunas")
              statusBayar = "Sudah Bayar";
            else statusBayar = "Pending";
          }
          return {
            id: krama.id,
            nama: krama.name,
            nik: krama.nik,
            status: krama.status,
            pembayaran: statusBayar,
          };
        });

        // 🔹 Hitung statistik
        const sudah = merged.filter((k) => k.pembayaran === "Sudah Bayar").length;
        const pending = merged.filter((k) => k.pembayaran === "Pending").length;
        const belum = merged.length - sudah - pending;

        setStats({
          totalKrama: merged.length,
          sudahBayar: sudah,
          belumBayar: belum,
        });
        setDataKrama(merged);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat data...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Dashboard Admin</h2>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Total Krama</h3>
          <p className="text-2xl font-bold">{stats.totalKrama}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Sudah Bayar</h3>
          <p className="text-2xl font-bold text-green-600">{stats.sudahBayar}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Belum Bayar</h3>
          <p className="text-2xl font-bold text-red-600">{stats.belumBayar}</p>
        </div>
      </div>

      {/* Tabel Krama */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">NIK</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Pembayaran</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKrama.map((krama) => (
              <tr key={krama.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{krama.nik}</td>
                <td className="p-3">{krama.nama}</td>
                <td className="p-3 capitalize">{krama.status}</td>
                <td
                  className={`p-3 font-semibold ${
                    krama.pembayaran === "Sudah Bayar"
                      ? "text-green-600"
                      : krama.pembayaran === "Pending"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  {krama.pembayaran}
                </td>
                <td className="p-3 text-center">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                    Validasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
