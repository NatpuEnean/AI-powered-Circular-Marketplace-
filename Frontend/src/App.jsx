import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import StatCard from './components/dashboard/StatCard';
import Marketplace from './pages/customer/Marketplace';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AddProduct from './pages/seller/AddProduct';
import Inventory from './pages/seller/Inventory';
import SellerDashboard from './pages/seller/SellerDashboard';
import { Leaf, ShoppingBag, Package, Heart, Store, AlertTriangle } from 'lucide-react';
import styles from './App.module.css';

/* ─── Customer Dashboard Home ─────────────────────────────────────────────── */
function CustomerHome() {
  const { user } = useAuth();
  return (
    <DashboardLayout role="customer" title={`Good day, ${user?.name?.split(' ')[0] ?? 'there'} 👋`} subtitle="Customer overview">
      <div className={styles.statsGrid}>
        <StatCard icon={Leaf}        label="Waste Prevented (kg)" value={8.4}  decimals={1} accent="emerald" />
        <StatCard icon={ShoppingBag} label="Money Saved"          value={2450} prefix="₹"  accent="harvest" />
        <StatCard icon={Package}     label="Products Rescued"     value={24}               accent="pine"    />
        <StatCard icon={Heart}       label="Eco Points"           value={1240}             accent="emerald" />
      </div>
      <p className={styles.placeholder}>Browse the <strong>Marketplace</strong> to discover circular products near you.</p>
    </DashboardLayout>
  );
}

/* ─── Seller Dashboard Home ───────────────────────────────────────────────── */
function SellerHome() {
  return <SellerDashboard />;
}

/* ─── NGO / Admin placeholders ────────────────────────────────────────────── */
function NGOHome() {
  return (
    <DashboardLayout role="ngo" title="NGO Portal" subtitle="Manage donations & pickups">
      <p className={styles.placeholder}>NGO portal features are coming soon.</p>
    </DashboardLayout>
  );
}

function AdminHome() {
  return (
    <DashboardLayout role="admin" title="Admin Panel" subtitle="Platform management">
      <p className={styles.placeholder}>Admin portal features are coming soon.</p>
    </DashboardLayout>
  );
}

/* ─── Smart root redirect ─────────────────────────────────────────────────── */
function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  const roleMap = { CUSTOMER: '/customer', SELLER: '/seller', NGO: '/ngo', ADMIN: '/admin' };
  return <Navigate to={roleMap[user.role] || '/customer'} replace />;
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Root smart redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Customer */}
        <Route path="/customer" element={
          <ProtectedRoute roles={['CUSTOMER', 'ADMIN']}>
            <CustomerHome />
          </ProtectedRoute>
        } />
        <Route path="/customer/marketplace" element={
          <ProtectedRoute roles={['CUSTOMER', 'SELLER', 'ADMIN']}>
            <Marketplace />
          </ProtectedRoute>
        } />
        <Route path="/customer/*" element={
          <ProtectedRoute roles={['CUSTOMER', 'ADMIN']}>
            <CustomerHome />
          </ProtectedRoute>
        } />

        {/* Seller */}
        <Route path="/seller" element={
          <ProtectedRoute roles={['SELLER', 'ADMIN']}>
            <SellerHome />
          </ProtectedRoute>
        } />
        <Route path="/seller/add-product" element={
          <ProtectedRoute roles={['SELLER', 'ADMIN']}>
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="/seller/inventory" element={
          <ProtectedRoute roles={['SELLER', 'ADMIN']}>
            <Inventory />
          </ProtectedRoute>
        } />
        <Route path="/seller/*" element={
          <ProtectedRoute roles={['SELLER', 'ADMIN']}>
            <SellerHome />
          </ProtectedRoute>
        } />

        {/* NGO */}
        <Route path="/ngo/*" element={
          <ProtectedRoute roles={['NGO', 'ADMIN']}>
            <NGOHome />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin/*" element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminHome />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}