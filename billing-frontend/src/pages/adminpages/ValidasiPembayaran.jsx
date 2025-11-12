// src/pages/adminpages/ValidasiPembayaran.jsx
import { useState, useEffect } from "react";

export default function ValidasiPembayaran() {
  const [pembayaran, setPembayaran] = useState([]);

  useEffect(() => {
    // Dummy data sementara
    setPembayaran([
      {
        id: 1,
        nik: "5101010101",
        nama: "I Made Adi",
        jumlah: 100000,
        metode: "Cash",
        status: "Pending",
      },
      {
        id: 2,
        nik: "5101010102",
        nama: "Ni Ketut Ayu",
        jumlah: 150000,
        metode: "QRIS",
        status: "Selesai",
      },
    ]);
  }, []);

  const handleValidasi = (id) => {
    setPembayaran((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Selesai" } : p
      )
    );
    alert("Pembayaran telah divalidasi!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Validasi Pembayaran
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">NIK</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Jumlah</th>
              <th className="p-3 text-left">Metode</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pembayaran.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.nik}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">Rp {item.jumlah.toLocaleString()}</td>
                <td className="p-3">{item.metode}</td>
                <td
                  className={`p-3 font-semibold ${
                    item.status === "Selesai"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status}
                </td>
                <td className="p-3 text-center">
                  {item.status === "Pending" && (
                    <button
                      onClick={() => handleValidasi(item.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Validasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}