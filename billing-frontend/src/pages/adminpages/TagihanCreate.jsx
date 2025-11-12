// src/pages/adminpages/TagihanCreate.jsx
import { useState } from "react";

export default function TagihanCreate() {
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    iuran: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Tagihan Baru:", form);

    // nanti ini diganti pakai API:
    // await apiClient.post("/tagihan", form);

    alert("Tagihan baru berhasil dibuat (dummy).");
    setForm({ nik: "", nama: "", iuran: "", tanggal: "" });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Buat Tagihan Baru
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">NIK Krama</label>
          <input
            type="text"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Contoh: 5101010101"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nama Krama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Nama Lengkap"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah Iuran</label>
          <input
            type="number"
            name="iuran"
            value={form.iuran}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="100000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tanggal Terbit</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
        >
          Simpan Tagihan
        </button>
      </form>
    </div>
  );
}