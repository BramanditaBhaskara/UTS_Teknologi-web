import { useState } from "react";

export default function PaymentForm({ krama }) {
  const [metode, setMetode] = useState("Transfer");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Pembayaran untuk ${krama.name} berhasil (${metode}) — status: ${status}`
    );
  };

  return (
    <div className="border-t mt-4 pt-4">
      <p><strong>Nama:</strong> {krama.name}</p>
      <p><strong>Status:</strong> {krama.status}</p>
      <p><strong>Iuran:</strong> Rp {krama.iuran.toLocaleString()}</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium">Metode Pembayaran</label>
          <select
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>Transfer</option>
            <option>Tunai</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Keterangan</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="pending">Pending</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Bayar Sekarang
        </button>
      </form>
    </div>
  );
}