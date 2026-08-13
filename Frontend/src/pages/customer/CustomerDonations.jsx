import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './CustomerPages.module.css';
import { Gift, CheckCircle, Clock, Truck, Package } from 'lucide-react';

const DONATIONS = [
  { id: 1, item: 'Winter Jackets (×3)', donor: 'GreenNest Store', ngo: 'Helping Hands NGO', date: '2026-08-09', status: 'received' },
  { id: 2, item: 'School Books Set', donor: 'You', ngo: 'EduReach Foundation', date: '2026-08-03', status: 'picked_up' },
  { id: 3, item: 'Dry Grocery Box', donor: 'NatureFarm', ngo: 'Food For All', date: '2026-07-25', status: 'received' },
];

const AVAILABLE = [
  { id: 'a1', item: 'Children\'s Clothing Bundle', donor: 'ReWear Hub', location: '1.2 km away', expires: '3 days' },
  { id: 'a2', item: 'Cooking Utensil Set', donor: 'HomeCircle', location: '2.5 km away', expires: '5 days' },
  { id: 'a3', item: 'Office Supplies Box', donor: 'CircleWork', location: '0.7 km away', expires: '1 day' },
];

export default function CustomerDonations() {
  return (
    <DashboardLayout role="customer" title="Donations" subtitle="Give and track community contributions">
      <div className={styles.twoCol}>
        {/* My donation history */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Gift size={16} /> My Donations</h2>
          {DONATIONS.map(d => (
            <div key={d.id} className={styles.donationRow}>
              <div className={styles.donationIcon}>
                {d.status === 'received' ? <CheckCircle size={16} style={{color:'rgb(var(--c-emerald))'}} /> : <Truck size={16} style={{color:'rgb(var(--c-harvest))'}} />}
              </div>
              <div className={styles.donationInfo}>
                <p className={styles.donationItem}>{d.item}</p>
                <p className={styles.donationMeta}>To {d.ngo} · {d.date}</p>
              </div>
              <span className={styles.donationStatus} style={d.status==='received'?{color:'rgb(var(--c-emerald))'}:{color:'rgb(var(--c-harvest))'}}>
                {d.status === 'received' ? 'Received' : 'In Transit'}
              </span>
            </div>
          ))}
        </div>

        {/* Available to donate to */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Package size={16} /> Available Nearby</h2>
          {AVAILABLE.map(a => (
            <div key={a.id} className={styles.availCard}>
              <div>
                <p className={styles.availItem}>{a.item}</p>
                <p className={styles.availMeta}>{a.donor} · {a.location}</p>
              </div>
              <div className={styles.availRight}>
                <span className={styles.expiresTag}><Clock size={11} /> {a.expires}</span>
                <button className={styles.claimBtn}>Claim</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
