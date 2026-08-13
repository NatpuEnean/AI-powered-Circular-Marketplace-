import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingBag, Package, Heart } from 'lucide-react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatCard from './components/dashboard/StatCard';
import Marketplace from './pages/customer/Marketplace';
import { ROLES, roleLabels } from './data/navigation';
import styles from './App.module.css';

function PortalHome({ role }) {
  return (
    <DashboardLayout role={role} title="Good Morning 👋" subtitle={`${roleLabels[role]} overview`}>
      <div className={styles.statsGrid}>
        <StatCard icon={Leaf} label="Waste Prevented (kg)" value={8.4} decimals={1} accent="emerald" />
        <StatCard icon={ShoppingBag} label="Money Saved" value={2450} prefix="₹" accent="harvest" />
        <StatCard icon={Package} label="Products Rescued" value={24} accent="pine" />
        <StatCard icon={Heart} label="Eco Points" value={1240} accent="emerald" />
      </div>
      <p className={styles.placeholder}>
        {roleLabels[role]} portal pages build out in the next phase.
      </p>
    </DashboardLayout>
  );
}

function RoleSwitcher() {
  const location = useLocation();
  const roles = Object.values(ROLES);

  return (
    <div className={styles.switcher}>
      {roles.map((r) => {
        const active = location.pathname.startsWith(`/${r}`);
        return (
          <Link
            key={r}
            to={`/${r}`}
            className={`${styles.switchLink} ${active ? styles.switchActive : ''}`}
          >
            {roleLabels[r]}
          </Link>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/customer" replace />} />
        <Route path="/customer" element={<PortalHome role={ROLES.customer} />} />
        <Route path="/customer/marketplace" element={<Marketplace />} />
        <Route path="/customer/*" element={<PortalHome role={ROLES.customer} />} />
        <Route path="/seller/*" element={<PortalHome role={ROLES.seller} />} />
        <Route path="/ngo/*" element={<PortalHome role={ROLES.ngo} />} />
        <Route path="/admin/*" element={<PortalHome role={ROLES.admin} />} />
      </Routes>
      <RoleSwitcher />
    </>
  );
}