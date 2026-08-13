import { Leaf, ShoppingBag, Package, Heart } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import { useAuth } from '../../context/AuthContext';
import styles from './CustomerPages.module.css';

export default function CustomerHome() {
  const { user } = useAuth();
  return (
    <DashboardLayout
      role="customer"
      title={`Good day, ${user?.name?.split(' ')[0] ?? 'there'} 👋`}
      subtitle="Your circular economy overview"
    >
      <div className={styles.homeStats}>
        <StatCard icon={Leaf}        label="Waste Prevented (kg)" value={8.4}  decimals={1} accent="emerald" />
        <StatCard icon={ShoppingBag} label="Money Saved"          value={2450} prefix="₹"  accent="harvest" />
        <StatCard icon={Package}     label="Products Rescued"     value={24}               accent="pine"    />
        <StatCard icon={Heart}       label="Eco Points"           value={1240}             accent="emerald" />
      </div>

      <div className={styles.quickLinks}>
        <a href="/customer/marketplace" className={styles.quickCard}>
          <ShoppingBag size={24} style={{color:'rgb(var(--c-emerald))'}} />
          <p className={styles.quickTitle}>Browse Marketplace</p>
          <p className={styles.quickSub}>Find circular products near you</p>
        </a>
        <a href="/customer/orders" className={styles.quickCard}>
          <Package size={24} style={{color:'rgb(var(--c-harvest))'}} />
          <p className={styles.quickTitle}>My Orders</p>
          <p className={styles.quickSub}>Track your purchases</p>
        </a>
        <a href="/customer/rewards" className={styles.quickCard}>
          <Heart size={24} style={{color:'rgb(62,207,142)'}} />
          <p className={styles.quickTitle}>Rewards</p>
          <p className={styles.quickSub}>1,240 eco points available</p>
        </a>
        <a href="/customer/impact" className={styles.quickCard}>
          <Leaf size={24} style={{color:'rgb(var(--c-pine))'}} />
          <p className={styles.quickTitle}>My Impact</p>
          <p className={styles.quickSub}>12.4 kg CO₂ prevented</p>
        </a>
      </div>
    </DashboardLayout>
  );
}
