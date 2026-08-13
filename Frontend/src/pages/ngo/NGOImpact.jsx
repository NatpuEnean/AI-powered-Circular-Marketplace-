import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { Leaf, Heart, Droplets, Users } from 'lucide-react';

const METRICS = [
  { icon: Leaf,     label: 'CO₂ Prevented',   value: '284 kg', sub: 'food & textile waste diverted',  color: '62,207,142'  },
  { icon: Droplets, label: 'Water Saved',      value: '1,840 L',sub: 'from rescued produce',           color: '96,165,250'  },
  { icon: Heart,    label: 'Meals Equivalent', value: '892',    sub: 'nutritional servings distributed',color: '227,162,60' },
  { icon: Users,    label: 'Families Helped',  value: '68',     sub: 'across 4 districts',             color: 'var(--c-emerald)' },
];

const BREAKDOWN = [
  { category: 'Food', items: 68, pct: 59 },
  { category: 'Clothing', items: 24, pct: 21 },
  { category: 'Books', items: 15, pct: 13 },
  { category: 'Other', items: 8, pct: 7 },
];

export default function NGOImpact() {
  return (
    <DashboardLayout role="ngo" title="Impact Report" subtitle="Your environmental & social contribution">
      <div className={styles.statsGrid}>
        {METRICS.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={styles.impactCard}>
              <div className={styles.impactIcon} style={{background:`rgba(${m.color},0.12)`}}>
                <Icon size={22} style={{color:`rgb(${m.color})`}} />
              </div>
              <p className={styles.impactVal}>{m.value}</p>
              <p className={styles.impactLbl}>{m.label}</p>
              <p className={styles.impactSub}>{m.sub}</p>
            </div>
          );
        })}
      </div>

      <h2 className={styles.sectionTitle}>Donations by Category</h2>
      <div className={styles.breakdownCard}>
        {BREAKDOWN.map(b => (
          <div key={b.category} className={styles.breakRow}>
            <span className={styles.breakCat}>{b.category}</span>
            <div className={styles.breakBar}>
              <div className={styles.breakFill} style={{width:`${b.pct}%`}} />
            </div>
            <span className={styles.breakInfo}>{b.items} items · {b.pct}%</span>
          </div>
        ))}
      </div>

      <div className={styles.quoteCard}>
        <p>"Every rescued item is a step toward a more circular, compassionate world."</p>
        <span>— CircleMarket Impact Report 2026</span>
      </div>
    </DashboardLayout>
  );
}
