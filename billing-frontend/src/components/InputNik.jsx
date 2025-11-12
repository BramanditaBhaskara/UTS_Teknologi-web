import { useState } from "react";

export default function InputNik({ onFound }) {
  const [nik, setNik] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulasi dummy krama
    if (nik === "5101010101") {
      onFound({
        krama_id: 1,
        name: "I Made Adi",
        status: "krama desa",
        gender: "L",
        iuran: 100000,
      });
    } else {
      onFound(null);
      alert("Data Krama tidak ditemukan!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <label className="block text-sm font-medium">Masukkan NIK</label>
      <input
        type="text"
        value={nik}
        onChange={(e) => setNik(e.target.value)}
        placeholder="Contoh: 5101010101"
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
      >
        Cek Data Krama
      </button>
    </form>
  );
}