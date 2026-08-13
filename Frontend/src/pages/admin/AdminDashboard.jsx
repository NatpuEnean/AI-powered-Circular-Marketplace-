import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminPages.module.css';
import { Users, Store, Package, Heart, TrendingUp, Leaf } from 'lucide-react';

const MONTHS = ['Mar','Apr','May','Jun','Jul','Aug'];
const GMV = [42000,61000,55000,89000,74000,103000];
const MAX_G = Math.max(...GMV);

const RECENT_ACTIVITY = [
  { text: 'New seller "EcoNest Shop" registered',      time: '10 min ago',  type: 'seller' },
  { text: '3 new donations listed in Mumbai area',     time: '25 min ago',  type: 'donation' },
  { text: 'Customer complaint resolved: Order #CM-302',time: '1 hour ago',  type: 'support' },
  { text: 'Seller "CircuitSave" listed 5 products',    time: '2 hours ago', type: 'product' },
  { text: 'NGO "Food For All" completed 3 pickups',    time: '3 hours ago', type: 'ngo' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" title="Admin Dashboard" subtitle="Platform-wide overview">
      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(62,207,142,0.15)'}}><Users size={20} style={{color:'rgb(var(--c-emerald))'}}/></div><div><p className={styles.statLabel}>Total Users</p><p className={styles.statValue}>1,248</p></div></div>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(227,162,60,0.12)'}}><Store size={20} style={{color:'rgb(var(--c-harvest))'}}/></div><div><p className={styles.statLabel}>Active Sellers</p><p className={styles.statValue}>184</p></div></div>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(96,165,250,0.12)'}}><Package size={20} style={{color:'rgb(96,165,250))'}}/></div><div><p className={styles.statLabel}>Products Listed</p><p className={styles.statValue}>3,412</p></div></div>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(62,207,142,0.12)'}}><Heart size={20} style={{color:'rgb(var(--c-emerald))'}}/></div><div><p className={styles.statLabel}>Donations</p><p className={styles.statValue}>892</p></div></div>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(227,162,60,0.12)'}}><TrendingUp size={20} style={{color:'rgb(var(--c-harvest))'}}/></div><div><p className={styles.statLabel}>Platform GMV</p><p className={styles.statValue}>₹10.3L</p></div></div>
        <div className={styles.statCard}><div className={styles.icon} style={{background:'rgba(62,207,142,0.12)'}}><Leaf size={20} style={{color:'rgb(var(--c-emerald))'}}/></div><div><p className={styles.statLabel}>CO₂ Prevented</p><p className={styles.statValue}>2.4T</p></div></div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}><TrendingUp size={14}/> Monthly GMV (₹)</h3>
          <div className={styles.barChart}>
            {GMV.map((v, i) => (
              <div key={i} className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div className={styles.bar} style={{height:`${(v/MAX_G)*110}px`}}>
                    <span className={styles.barVal}>{(v/1000).toFixed(0)}k</span>
                  </div>
                </div>
                <p className={styles.barLabel}>{MONTHS[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Recent Activity</h3>
          <div className={styles.activityList}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className={styles.actRow}>
                <div className={styles.actDot} style={{background: a.type==='seller'?'rgb(var(--c-harvest))': a.type==='donation'||a.type==='ngo'?'rgb(var(--c-emerald))':'rgb(96,165,250)'}} />
                <div>
                  <p className={styles.actText}>{a.text}</p>
                  <p className={styles.actTime}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
