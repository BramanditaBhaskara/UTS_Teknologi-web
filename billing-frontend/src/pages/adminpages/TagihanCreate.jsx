// src/pages/adminpages/TagihanCreate.jsx
import { useState } from "react";
import apiClient from "../../api/apiClient";
import dayjs from "dayjs";

export default function TagihanCreate() {
  const [form, setForm] = useState({
    nik: "",
    krama_id: "",
    nama: "",
    bulan: "",
    // Input biaya dipertahankan dan nilainya akan dikirim ke backend
    iuran: "", 
    dedosan: "", 
    peturunan: "", 
  });

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCariKrama = async () => {
    if (!form.nik) {
      alert("Masukkan NIK terlebih dahulu!");
      return;
    }

    try {
      setSearching(true);
      const res = await apiClient.get(`/kramas/nik/${form.nik}`);
      const data = res.data;

      setForm({
        ...form,
        krama_id: data.id,
        nama: data.name,
        // (Opsional) Di sini kamu bisa mengisi default iuran/dedosan/peturunan jika ada
      });

      alert("✅ Krama ditemukan!");
    } catch (err) {
      console.error("❌ Krama tidak ditemukan:", err);
      alert("Krama dengan NIK tersebut tidak ditemukan.");
      setForm({
        ...form,
        krama_id: "",
        nama: "",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.krama_id) {
      alert("Cari dan pilih Krama terlebih dahulu!");
      return;
    }
    
    // Periksa apakah input biaya sudah diisi (sesuai required di Controller)
    if (!form.iuran || !form.dedosan || !form.peturunan) {
        alert("Mohon lengkapi semua input biaya (Iuran, Dedosan, Peturunan).");
        return;
    }

    try {
      setLoading(true);

      const bulanFormatted =
        form.bulan || dayjs().format("MMMM YYYY");

      // PERUBAHAN KRITIS: Mengirim SEMUA nilai input (termasuk biaya) ke backend.
      const payload = {
        krama_id: parseInt(form.krama_id),
        bulan: bulanFormatted,
        // Kirim nilai iuran, dedosan, peturunan dari form
        iuran: parseInt(form.iuran), 
        dedosan: parseInt(form.dedosan), 
        peturunan: parseInt(form.peturunan),
        // Jumlah dihitung di backend, jadi tidak perlu dikirim
      };

      const response = await apiClient.post("/tagihan", payload);

      console.log("✅ Tagihan berhasil dibuat:", response.data);
      alert("Tagihan berhasil dibuat!");

      // Reset form setelah sukses
      setForm({
        nik: "",
        krama_id: "",
        nama: "",
        bulan: "",
        iuran: "",
        dedosan: "",
        peturunan: "",
      });
    } catch (error) {
      console.error("❌ Gagal membuat tagihan:", error);
      
      // Error Handling: Ambil pesan error spesifik dari backend (untuk error 400 duplikasi)
      const errorMessage = error.response?.data?.message || error.response?.data?.errors?.bulan?.[0];
      
      alert(
        errorMessage ||
          "Gagal menyimpan tagihan. Periksa koneksi atau data masukan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Buat Tagihan Baru
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input NIK */}
        <div>
          <label className="block text-sm font-medium">Masukkan NIK</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name="nik"
              value={form.nik}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg p-2"
              placeholder="Contoh: 5101010101"
              required
            />
            <button
              type="button"
              onClick={handleCariKrama}
              disabled={searching}
              className={`px-3 py-2 rounded-lg text-white ${
                searching
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {searching ? "Mencari..." : "Cari"}
            </button>
          </div>
        </div>

        {/* Nama Krama */}
        {form.nama && (
          <div>
            <label className="block text-sm font-medium">Nama Krama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              disabled
              className="w-full mt-1 border border-gray-300 bg-gray-100 rounded-lg p-2"
            />
          </div>
        )}

        {/* Bulan Tagihan */}
        <div>
          <label className="block text-sm font-medium">Bulan Tagihan</label>
          <input
            type="text"
            name="bulan"
            value={form.bulan}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Contoh: November 2025"
            required
          />
        </div>

        {/* Iuran */}
        <div>
          <label className="block text-sm font-medium">Iuran</label>
          <input
            type="number"
            name="iuran"
            value={form.iuran}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="5000"
            required // Wajib diisi
          />
        </div>

        {/* Dedosan */}
        <div>
          <label className="block text-sm font-medium">Dedosan</label>
          <input
            type="number"
            name="dedosan"
            value={form.dedosan}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="5000"
            required // Wajib diisi
          />
        </div>

        {/* Peturunan */}
        <div>
          <label className="block text-sm font-medium">Peturunan</label>
          <input
            type="number"
            name="peturunan"
            value={form.peturunan}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="5000"
            required // Wajib diisi
          />
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {loading ? "Menyimpan..." : "Simpan Tagihan"}
        </button>
      </form>
    </div>
  );
}