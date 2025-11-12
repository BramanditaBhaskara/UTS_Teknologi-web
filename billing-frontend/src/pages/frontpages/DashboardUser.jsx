import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Clock, CheckCircle } from "lucide-react";

export default function DashboardUser() {
  const [krama, setKrama] = useState(null);

  useEffect(() => {
    // === Data Dummy sementara (nanti diganti API dari backend) ===
    setKrama({
      nama: "I Made Adi",
      status: "krama desa",
      iuran: 100000,
      statusPembayaran: "Sudah Bayar",
      tanggalTerakhir: "2025-10-10",
      denda: 0,
    });
  }, []);

  if (!krama) {
    return <p className="text-center mt-10 text-gray-600">Memuat data krama...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
        Dashboard Krama Desa
      </h1>

      {/* Identitas Krama */}
      <div className="border-b pb-4 mb-4">
        <p><strong>Nama:</strong> {krama.nama}</p>
        <p><strong>Status:</strong> {krama.status}</p>
        <p><strong>Tanggal Tagihan Terakhir:</strong> {krama.tanggalTerakhir}</p>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <CreditCard className="mx-auto text-blue-600 mb-2" />
          <p className="font-semibold text-gray-700">Iuran</p>
          <p className="text-lg font-bold text-blue-700">
            Rp {krama.iuran.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="mx-auto text-green-600 mb-2" />
          <p className="font-semibold text-gray-700">Status Pembayaran</p>
          <p
            className={`text-lg font-bold ${
              krama.statusPembayaran === "Sudah Bayar"
                ? "text-green-600"
                : krama.statusPembayaran === "Pending"
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            {krama.statusPembayaran}
          </p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <Clock className="mx-auto text-orange-600 mb-2" />
          <p className="font-semibold text-gray-700">Denda</p>
          <p className="text-lg font-bold text-orange-600">
            Rp {krama.denda.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link
          to="/"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-center font-medium"
        >
          Bayar Iuran
        </Link>
        <Link
          to="/riwayat"
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-center font-medium"
        >
          Lihat Riwayat
        </Link>
      </div>
    </div>
  );
}