// src/pages/superadminpages/DataAdmin.jsx
import { useState, useEffect } from "react";

export default function DataAdmin() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Dummy data sementara
    setAdmins([
      { id: 1, nama: "I Made Adi", email: "madeadi@example.com", role: "Admin" },
      { id: 2, nama: "Ni Ketut Ayu", email: "ketutayu@example.com", role: "Admin" },
      { id: 3, nama: "I Nyoman Rai", email: "nyomanrai@example.com", role: "Admin" },
    ]);
  }, []);

  const handleHapus = (id) => {
    if (confirm("Yakin ingin menghapus admin ini?")) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      alert("Admin berhasil dihapus (dummy).");
    }
  };

  const handleTambah = () => {
    const nama = prompt("Masukkan nama admin baru:");
    const email = prompt("Masukkan email admin baru:");
    if (nama && email) {
      setAdmins((prev) => [
        ...prev,
        { id: prev.length + 1, nama, email, role: "Admin" },
      ]);
      alert("Admin baru ditambahkan (dummy).");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Data Admin</h2>
        <button
          onClick={handleTambah}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          + Tambah Admin
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{a.nama}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">{a.role}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleHapus(a.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Hapus
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