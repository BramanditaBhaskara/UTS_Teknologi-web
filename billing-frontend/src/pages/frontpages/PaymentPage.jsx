import { useState } from "react";
import InputNik from "../../components/InputNik";
import PaymentForm from "../../components/PaymentForm";
import apiClient from "../../api/apiClient";

export default function PaymentPage() {
  const [krama, setKrama] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mencari data krama dari API (berdasarkan NIK)
  const handleCariKrama = async (nik) => {
    try {
      setLoading(true);

      // === SIMULASI dummy sementara ===
      if (nik === "5101010101") {
        setKrama({
          krama_id: 1,
          name: "I Made Adi",
          status: "krama desa",
          iuran: 100000,
        });
      } else if (nik === "5101010102") {
        setKrama({
          krama_id: 2,
          name: "Ni Ketut Ayu",
          status: "krama tamu",
          iuran: 150000,
        });
      } else {
        setKrama(null);
        alert("Data krama tidak ditemukan!");
      }

      // === versi backend (nanti ganti ini) ===
      {
      const { data } = await apiClient.get(`/datakrama/${nik}`);
      setKrama(data);
      }

    } catch (err) {
      console.error("Gagal mengambil data:", err);
      alert("Terjadi kesalahan saat memuat data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Pembayaran Iuran Krama Desa
      </h2>

      <InputNik onFound={(data) => handleCariKrama(data.nik)} />

      {loading && <p className="text-center text-gray-500 mt-3">Memuat data...</p>}

      {krama && !loading && (
        <div className="mt-6">
          <PaymentForm krama={krama} />
        </div>
      )}
    </div>
  );
}