// src/pages/superadminpages/SuperAdminDashboard.jsx
import { useState, useEffect } from "react";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalKrama: 0,
    totalAdmin: 0,
    totalPendapatan: 0,
    totalTagihan: 0,
  });

  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    // Dummy data simulasi
    setStats({
      totalKrama: 120,
      totalAdmin: 3,
      totalPendapatan: 35000000,
      totalTagihan: 38000000,
    });

    setTransaksi([
      { id: 1, nama: "I Made Adi", jumlah: 100000, metode: "Cash", tanggal: "2025-10-15" },
      { id: 2, nama: "Ni Ketut Ayu", jumlah: 150000, metode: "QRIS", tanggal: "2025-10-18" },
      { id: 3, nama: "I Nyoman Rai", jumlah: 150000, metode: "Cash", tanggal: "2025-10-20" },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-purple-700">
        Dashboard Super Admin
      </h2>

      {/* Statistik Global */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Total Krama</h3>
          <p className="text-2xl font-bold">{stats.totalKrama}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Total Admin</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.totalAdmin}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Total Pendapatan</h3>
          <p className="text-2xl font-bold text-green-600">
            Rp {stats.totalPendapatan.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm">Total Tagihan</h3>
          <p className="text-2xl font-bold text-red-600">
            Rp {stats.totalTagihan.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b">Transaksi Terbaru</h3>
        <table className="w-full border-collapse">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Jumlah</th>
              <th className="p-3 text-left">Metode</th>
              <th className="p-3 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{item.nama}</td>
                <td className="p-3">Rp {item.jumlah.toLocaleString()}</td>
                <td className="p-3">{item.metode}</td>
                <td className="p-3">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}