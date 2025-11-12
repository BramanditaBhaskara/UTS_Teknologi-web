import { useState } from "react";
import apiClient from "../../api/apiClient";

export default function RiwayatPage() {
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [riwayat, setRiwayat] = useState(null);

  const handleCariRiwayat = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRiwayat(null);

    try {
      // === SIMULASI DUMMY ===
      if (nik === "5101010101") {
        setRiwayat({
          nama: "I Made Adi",
          status: "Sudah Bayar",
          tanggal: "2025-10-10",
          jumlah: 100000,
          denda: 0,
        });
      } else if (nik === "5101010102") {
        setRiwayat({
          nama: "Ni Ketut Ayu",
          status: "Pending",
          tanggal: "-",
          jumlah: 150000,
          denda: 0,
        });
      } else {
        alert("Data tidak ditemukan!");
      }

      // === versi backend ===
      {
      const { data } = await apiClient.get(`/datakrama/${nik}`);
      setKrama(data);
      }


    } catch (error) {
      console.error("Gagal mengambil data riwayat:", error);
      alert("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Cek Riwayat Pembayaran Iuran
      </h2>

      <form onSubmit={handleCariRiwayat} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Masukkan NIK</label>
          <input
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Contoh: 5101010101"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Mencari..." : "Cek Riwayat"}
        </button>
      </form>

      {riwayat && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <p><strong>Nama:</strong> {riwayat.nama}</p>
          <p><strong>Status:</strong> {riwayat.status}</p>
          <p><strong>Tanggal Bayar:</strong> {riwayat.tanggal}</p>
          <p><strong>Jumlah:</strong> Rp {riwayat.jumlah.toLocaleString()}</p>
          {riwayat.denda > 0 && (
            <p className="text-red-600 font-semibold">
              ⚠ Denda Dedosan: Rp {riwayat.denda.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}