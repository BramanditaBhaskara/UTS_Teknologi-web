import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-semibold">Billing Iuran Krama</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-yellow-300">Pembayaran</Link>
          <Link to="/riwayat" className="hover:text-yellow-300">Riwayat</Link>
        </div>
      </div>
    </nav>
  );
}