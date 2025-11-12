import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ tambahkan ini

// Halaman yang sudah kamu punya
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/frontpages/PaymentPage";
import RiwayatPage from "./pages/frontpages/RiwayatPage";
import DashboardUser from "./pages/frontpages/DashboardUser";

import ValidasiPembayaran from "./pages/adminpages/ValidasiPembayaran";
import TagihanCreate from "./pages/adminpages/TagihanCreate";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import DataKrama from "./pages/adminpages/DataKrama";

import SuperAdminDashboard from "./pages/superadminpages/SuperAdminDashboard";
import DataAdmin from "./pages/superadminpages/DataAdmin";
import SemuaTransaksi from "./pages/superadminpages/SemuaTransaksi";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* ==============================
          USER SIDE
      ============================== */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MainLayout>
              <DashboardUser />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MainLayout>
              <RiwayatPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ==============================
          ADMIN SIDE
      ============================== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/datakrama"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <DataKrama />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tagihan"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <TagihanCreate />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/validasi"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <ValidasiPembayaran />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ==============================
          SUPER ADMIN SIDE
      ============================== */}
      <Route
        path="/super/dashboard"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminDashboard />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/super/admins"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <DataAdmin />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/super/transaksi"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SemuaTransaksi />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
