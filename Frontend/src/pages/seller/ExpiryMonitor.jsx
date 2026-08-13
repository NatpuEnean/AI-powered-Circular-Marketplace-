import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SellerPages.module.css';
import { AlertTriangle, Clock } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Organic Tomatoes (2kg)', category: 'food', daysLeft: 1, qty: 5,  urgency: 'critical' },
  { id: 2, name: 'Fresh Bread Loaves',     category: 'food', daysLeft: 2, qty: 8,  urgency: 'high'     },
  { id: 3, name: 'Herbal Tea Packs',        category: 'food', daysLeft: 4, qty: 20, urgency: 'medium'   },
  { id: 4, name: 'Homemade Jam',            category: 'food', daysLeft: 7, qty: 12, urgency: 'low'      },
  { id: 5, name: 'Mixed Fruit Box',         category: 'food', daysLeft: 3, qty: 6,  urgency: 'high'     },
];

const URGENCY = {
  critical: { label: '⚠ Expires Tomorrow', color: '226,87,76'  },
  high:     { label: '⏰ Expires Soon',     color: '227,162,60' },
  medium:   { label: '📅 This Week',        color: '96,165,250' },
  low:      { label: '✅ Normal',           color: '62,207,142' },
};

export default function ExpiryMonitor() {
  return (
    <DashboardLayout role="seller" title="Expiry Monitor" subtitle="Track time-sensitive product listings">
      <div className={styles.summaryRow}>
        {Object.entries(URGENCY).map(([key, cfg]) => (
          <div key={key} className={styles.statCard}>
            <p className={styles.statLabel}>{cfg.label}</p>
            <p className={styles.statValue} style={{color:`rgb(${cfg.color})`}}>{PRODUCTS.filter(p=>p.urgency===key).length}</p>
          </div>
        ))}
      </div>

      <div className={styles.expiryList}>
        {PRODUCTS.sort((a,b) => a.daysLeft - b.daysLeft).map(p => {
          const cfg = URGENCY[p.urgency];
          return (
            <div key={p.id} className={styles.expiryRow} style={{borderLeftColor:`rgb(${cfg.color})`}}>
              <div className={styles.expiryIcon} style={{color:`rgb(${cfg.color})`}}>
                <AlertTriangle size={18} />
              </div>
              <div className={styles.expiryInfo}>
                <p className={styles.expiryName}>{p.name}</p>
                <p className={styles.expiryMeta}>{p.category} · Qty: {p.qty}</p>
              </div>
              <div className={styles.expiryRight}>
                <div className={styles.daysLeft} style={{color:`rgb(${cfg.color})`}}>
                  <Clock size={13} />
                  {p.daysLeft === 1 ? '1 day left' : `${p.daysLeft} days left`}
                </div>
                <button className={styles.discountBtn}>Add Discount</button>
                <button className={styles.donateBtn}>Donate</button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
