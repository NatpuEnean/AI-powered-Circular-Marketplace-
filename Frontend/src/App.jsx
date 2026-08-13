import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Auth
import LoginPage  from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Customer
import CustomerHome       from './pages/customer/CustomerHome';
import Marketplace        from './pages/customer/Marketplace';
import MyOrders           from './pages/customer/MyOrders';
import Wishlist           from './pages/customer/Wishlist';
import CustomerDonations  from './pages/customer/CustomerDonations';
import Rewards            from './pages/customer/Rewards';
import MyImpact           from './pages/customer/MyImpact';

// Seller
import SellerDashboard  from './pages/seller/SellerDashboard';
import AddProduct       from './pages/seller/AddProduct';
import Inventory        from './pages/seller/Inventory';
import SellerOrders     from './pages/seller/SellerOrders';
import ExpiryMonitor    from './pages/seller/ExpiryMonitor';
import AIPricing        from './pages/seller/AIPricing';
import SellerDonations  from './pages/seller/SellerDonations';
import SellerAnalytics  from './pages/seller/SellerAnalytics';

// NGO
import NGODashboard       from './pages/ngo/NGODashboard';
import AvailableDonations from './pages/ngo/AvailableDonations';
import MyRequests         from './pages/ngo/MyRequests';
import ActivePickups      from './pages/ngo/ActivePickups';
import DonationHistory    from './pages/ngo/DonationHistory';
import NGOImpact          from './pages/ngo/NGOImpact';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers    from './pages/admin/ManageUsers';
import ManageSellers  from './pages/admin/ManageSellers';
import ManageProducts from './pages/admin/ManageProducts';
import Reports        from './pages/admin/Reports';

/* ─── Wrap each page in ProtectedRoute (auth bypassed in dev) ─────────────── */
const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/"       element={<Navigate to="/login" replace />} />

        {/* ── Customer ────────────────────────────────────────────────────── */}
        <Route path="/customer"              element={<P><CustomerHome /></P>} />
        <Route path="/customer/marketplace"  element={<P><Marketplace /></P>} />
        <Route path="/customer/orders"       element={<P><MyOrders /></P>} />
        <Route path="/customer/wishlist"     element={<P><Wishlist /></P>} />
        <Route path="/customer/donations"    element={<P><CustomerDonations /></P>} />
        <Route path="/customer/rewards"      element={<P><Rewards /></P>} />
        <Route path="/customer/impact"       element={<P><MyImpact /></P>} />

        {/* ── Seller ──────────────────────────────────────────────────────── */}
        <Route path="/seller"              element={<P><SellerDashboard /></P>} />
        <Route path="/seller/add-product"  element={<P><AddProduct /></P>} />
        <Route path="/seller/inventory"    element={<P><Inventory /></P>} />
        <Route path="/seller/orders"       element={<P><SellerOrders /></P>} />
        <Route path="/seller/expiry"       element={<P><ExpiryMonitor /></P>} />
        <Route path="/seller/ai-pricing"   element={<P><AIPricing /></P>} />
        <Route path="/seller/donations"    element={<P><SellerDonations /></P>} />
        <Route path="/seller/analytics"    element={<P><SellerAnalytics /></P>} />

        {/* ── NGO ─────────────────────────────────────────────────────────── */}
        <Route path="/ngo"            element={<P><NGODashboard /></P>} />
        <Route path="/ngo/available"  element={<P><AvailableDonations /></P>} />
        <Route path="/ngo/requests"   element={<P><MyRequests /></P>} />
        <Route path="/ngo/pickups"    element={<P><ActivePickups /></P>} />
        <Route path="/ngo/history"    element={<P><DonationHistory /></P>} />
        <Route path="/ngo/impact"     element={<P><NGOImpact /></P>} />

        {/* ── Admin ───────────────────────────────────────────────────────── */}
        <Route path="/admin"           element={<P><AdminDashboard /></P>} />
        <Route path="/admin/users"     element={<P><ManageUsers /></P>} />
        <Route path="/admin/sellers"   element={<P><ManageSellers /></P>} />
        <Route path="/admin/products"  element={<P><ManageProducts /></P>} />
        <Route path="/admin/reports"   element={<P><Reports /></P>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}