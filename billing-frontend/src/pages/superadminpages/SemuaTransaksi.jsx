// src/pages/superadminpages/SemuaTransaksi.jsx
import { useState, useEffect } from "react";

export default function SemuaTransaksi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    // Dummy data sementara
    setTransaksi([
      {
        id: 1,
        nama: "I Made Adi",
        jumlah: 100000,
        metode: "Cash",
        tanggal: "2025-10-15",
        status: "Selesai",
      },
      {
        id: 2,
        nama: "Ni Ketut Ayu",
        jumlah: 150000,
        metode: "QRIS",
        tanggal: "2025-10-18",
        status: "Selesai",
      },
      {
        id: 3,
        nama: "I Nyoman Rai",
        jumlah: 150000,
        metode: "Cash",
        tanggal: "2025-10-20",
        status: "Pending",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-purple-700">
        Semua Transaksi Pembayaran
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Jumlah</th>
              <th className="p-3 text-left">Metode</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{t.nama}</td>
                <td className="p-3">Rp {t.jumlah.toLocaleString()}</td>
                <td className="p-3">{t.metode}</td>
                <td className="p-3">{t.tanggal}</td>
                <td
                  className={`p-3 font-semibold ${
                    t.status === "Selesai"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}