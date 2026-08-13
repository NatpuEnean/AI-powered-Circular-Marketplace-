import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Heart,
  Gift,
  Trophy,
  Leaf,
  Package,
  PackagePlus,
  ClipboardList,
  AlertTriangle,
  BarChart3,
  Truck,
  History,
  Users,
  Building2,
  ShieldCheck,
  FileWarning,
  PieChart,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

export const ROLES = {
  customer: 'customer',
  seller: 'seller',
  ngo: 'ngo',
  admin: 'admin',
};

export const roleLabels = {
  customer: 'Customer',
  seller: 'Seller',
  ngo: 'NGO',
  admin: 'Admin',
};

export const navByRole = {
  customer: [
    { label: 'Dashboard', to: '/customer', icon: LayoutDashboard },
    { label: 'Marketplace', to: '/customer/marketplace', icon: Store },
    { label: 'My Orders', to: '/customer/orders', icon: ShoppingBag },
    { label: 'Wishlist', to: '/customer/wishlist', icon: Heart },
    { label: 'Donations', to: '/customer/donations', icon: Gift },
    { label: 'Rewards', to: '/customer/rewards', icon: Trophy },
    { label: 'My Impact', to: '/customer/impact', icon: Leaf },
  ],
  seller: [
    { label: 'Dashboard', to: '/seller', icon: LayoutDashboard },
    { label: 'Inventory', to: '/seller/inventory', icon: Package },
    { label: 'Add Product', to: '/seller/add-product', icon: PackagePlus },
    { label: 'Orders', to: '/seller/orders', icon: ClipboardList },
    { label: 'Expiry Monitor', to: '/seller/expiry', icon: AlertTriangle },
    { label: 'AI Pricing', to: '/seller/ai-pricing', icon: BarChart3 },
    { label: 'Donations', to: '/seller/donations', icon: Gift },
    { label: 'Analytics', to: '/seller/analytics', icon: PieChart },
  ],
  ngo: [
    { label: 'Dashboard', to: '/ngo', icon: LayoutDashboard },
    { label: 'Available Donations', to: '/ngo/available', icon: Gift },
    { label: 'My Requests', to: '/ngo/requests', icon: ClipboardList },
    { label: 'Active Pickups', to: '/ngo/pickups', icon: Truck },
    { label: 'Donation History', to: '/ngo/history', icon: History },
    { label: 'Impact', to: '/ngo/impact', icon: Leaf },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: Users },
    { label: 'Sellers', to: '/admin/sellers', icon: Store },
    { label: 'NGOs', to: '/admin/ngos', icon: Building2 },
    { label: 'Products', to: '/admin/products', icon: Package },
    { label: 'Donations', to: '/admin/donations', icon: Gift },
    { label: 'Reports', to: '/admin/reports', icon: FileWarning },
    { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
    { label: 'Impact', to: '/admin/impact', icon: ShieldCheck },
  ],
};

export const bottomNav = [
  { label: 'Profile', to: 'profile', icon: User },
  { label: 'Settings', to: 'settings', icon: Settings },
  { label: 'Logout', to: 'logout', icon: LogOut },
];