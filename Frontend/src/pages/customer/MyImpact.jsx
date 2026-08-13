import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './CustomerPages.module.css';
import { Leaf, Droplets, Wind, Recycle, TrendingUp } from 'lucide-react';

const METRICS = [
  { icon: Leaf,     label: 'CO₂ Prevented',    value: '12.4 kg',  sub: 'equivalent to planting 1 tree',  color: 'var(--c-emerald)' },
  { icon: Droplets, label: 'Water Saved',       value: '480 L',    sub: 'from 8 circular purchases',     color: '96,165,250' },
  { icon: Wind,     label: 'Waste Diverted',    value: '8.4 kg',   sub: 'kept out of landfills',         color: 'var(--c-harvest)' },
  { icon: Recycle,  label: 'Products Rescued',  value: '24',       sub: 'items given a second life',     color: 'var(--c-pine)' },
];

const MONTHS = ['Mar','Apr','May','Jun','Jul','Aug'];
const CO2_DATA = [1.2, 2.1, 1.8, 3.0, 2.4, 1.9];
const MAX_VAL = Math.max(...CO2_DATA);

const BADGES = [
  { label: 'First Rescue',     earned: true,  desc: 'Bought your first circular product' },
  { label: 'Zero-Waste Week',  earned: true,  desc: '5 purchases in one week' },
  { label: 'Community Hero',   earned: false, desc: 'Donate 3 items to NGOs' },
  { label: 'Green Champion',   earned: false, desc: 'Prevent 50 kg of CO₂' },
];

export default function MyImpact() {
  return (
    <DashboardLayout role="customer" title="My Impact" subtitle="Your environmental contribution at a glance">
      {/* Metric cards */}
      <div className={styles.impactGrid}>
        {METRICS.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={styles.impactCard}>
              <div className={styles.impactIconWrap} style={{ background: `rgba(${m.color},0.12)` }}>
                <Icon size={22} style={{ color: `rgb(${m.color})` }} />
              </div>
              <p className={styles.impactValue}>{m.value}</p>
              <p className={styles.impactLabel}>{m.label}</p>
              <p className={styles.impactSub}>{m.sub}</p>
            </div>
          );
        })}
      </div>

      {/* CO₂ bar chart */}
      <div className={styles.chartSection}>
        <h2 className={styles.sectionTitle}><TrendingUp size={16} /> CO₂ Prevented (kg) — Last 6 months</h2>
        <div className={styles.barChart}>
          {CO2_DATA.map((val, i) => (
            <div key={i} className={styles.barGroup}>
              <div className={styles.barWrap}>
                <div className={styles.bar} style={{ height: `${(val / MAX_VAL) * 120}px` }}>
                  <span className={styles.barVal}>{val}</span>
                </div>
              </div>
              <p className={styles.barMonth}>{MONTHS[i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <h2 className={styles.sectionTitle}>🏅 Eco Badges</h2>
      <div className={styles.badgeGrid}>
        {BADGES.map(b => (
          <div key={b.label} className={`${styles.badgeCard} ${!b.earned ? styles.badgeLocked : ''}`}>
            <p className={styles.badgeEmoji}>{b.earned ? '✅' : '🔒'}</p>
            <p className={styles.badgeName}>{b.label}</p>
            <p className={styles.badgeDesc}>{b.desc}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
