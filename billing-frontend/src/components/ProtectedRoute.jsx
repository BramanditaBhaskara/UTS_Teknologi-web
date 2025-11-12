import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Kalau belum login → lempar ke login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Kalau ada role spesifik yang boleh, tapi role user tidak cocok → redirect
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Kalau lolos semua, tampilkan halaman
  return children;
}
