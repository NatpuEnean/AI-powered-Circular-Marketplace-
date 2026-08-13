import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { Heart, Package, Truck, Leaf, TrendingUp } from 'lucide-react';

const MONTHS = ['Mar','Apr','May','Jun','Jul','Aug'];
const RECEIVED = [12,18,14,24,20,27];
const MAX_V = Math.max(...RECEIVED);

export default function NGODashboard() {
  return (
    <DashboardLayout role="ngo" title="NGO Dashboard" subtitle="Overview of donations and impact">
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.iconBox} style={{background:'rgba(62,207,142,0.15)'}}><Package size={20} style={{color:'rgb(var(--c-emerald))'}} /></div>
          <div><p className={styles.statLabel}>Donations Received</p><p className={styles.statValue}>115</p></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.iconBox} style={{background:'rgba(96,165,250,0.12)'}}><Truck size={20} style={{color:'rgb(96,165,250)'}} /></div>
          <div><p className={styles.statLabel}>Active Pickups</p><p className={styles.statValue}>4</p></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.iconBox} style={{background:'rgba(227,162,60,0.12)'}}><Heart size={20} style={{color:'rgb(var(--c-harvest))'}} /></div>
          <div><p className={styles.statLabel}>People Helped</p><p className={styles.statValue}>342</p></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.iconBox} style={{background:'rgba(62,207,142,0.12)'}}><Leaf size={20} style={{color:'rgb(var(--c-emerald))'}} /></div>
          <div><p className={styles.statLabel}>Waste Prevented (kg)</p><p className={styles.statValue}>284</p></div>
        </div>
      </div>

      {/* Monthly chart */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}><TrendingUp size={15}/> Monthly Donations Received</h3>
        <div className={styles.barChart}>
          {RECEIVED.map((val, i) => (
            <div key={i} className={styles.barGroup}>
              <div className={styles.barWrap}>
                <div className={styles.bar} style={{height:`${(val/MAX_V)*120}px`}}>
                  <span className={styles.barVal}>{val}</span>
                </div>
              </div>
              <p className={styles.barLabel}>{MONTHS[i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <h2 className={styles.sectionTitle}>Recent Activity</h2>
      <div className={styles.activityList}>
        {[
          { action: 'Picked up food bundle from NatureFarm', time: '2 hours ago',  color: 'var(--c-emerald)' },
          { action: 'Request accepted by EcoThreads',        time: '5 hours ago',  color: 'var(--c-harvest)' },
          { action: 'Distributed 30 meals via Food For All', time: '1 day ago',    color: 'var(--c-emerald)' },
          { action: 'New donation available: Blankets ×10',  time: '2 days ago',   color: '96,165,250' },
        ].map((a, i) => (
          <div key={i} className={styles.activityRow}>
            <div className={styles.activityDot} style={{background:`rgb(${a.color})`}} />
            <p className={styles.activityText}>{a.action}</p>
            <span className={styles.activityTime}>{a.time}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
