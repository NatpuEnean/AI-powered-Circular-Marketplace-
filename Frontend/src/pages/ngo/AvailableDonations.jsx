import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { Package, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const DONATIONS = [
  { id: 1, item: 'Winter Blankets (×10)', donor: 'HomeCircle Store', dist: '0.8 km', expires: '2 days', category: 'Clothing', qty: 10 },
  { id: 2, item: 'Canned Food Bundle',   donor: 'NatureFarm',        dist: '1.4 km', expires: '1 day',  category: 'Food',     qty: 24 },
  { id: 3, item: 'School Stationery Kit',donor: 'EduNest Shop',       dist: '2.1 km', expires: '5 days', category: 'Books',    qty: 15 },
  { id: 4, item: 'Rice & Lentils (5kg)', donor: 'GreenNest Store',   dist: '3.0 km', expires: '4 days', category: 'Food',     qty: 8  },
  { id: 5, item: 'Pre-loved Jackets',    donor: 'ReWear Hub',         dist: '1.7 km', expires: '6 days', category: 'Clothing', qty: 6  },
];

export default function AvailableDonations() {
  const [claimed, setClaimed] = useState([]);

  return (
    <DashboardLayout role="ngo" title="Available Donations" subtitle="Nearby items ready for pickup">
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}><Package size={13}/> {DONATIONS.length} items available within 5 km</span>
      </div>

      <div className={styles.donationCards}>
        {DONATIONS.map(d => {
          const isClaimed = claimed.includes(d.id);
          return (
            <div key={d.id} className={`${styles.donationCard} ${isClaimed ? styles.cardClaimed : ''}`}>
              <div className={styles.cardHeader}>
                <span className={styles.catBadge}>{d.category}</span>
                <span className={styles.expiry}><Clock size={11}/> {d.expires}</span>
              </div>
              <h3 className={styles.donationItem}>{d.item}</h3>
              <p className={styles.donationDonor}>Donated by <strong>{d.donor}</strong></p>
              <div className={styles.donationMeta}>
                <span className={styles.metaChip}><MapPin size={12}/> {d.dist}</span>
                <span className={styles.metaChip}><Package size={12}/> Qty: {d.qty}</span>
              </div>
              {isClaimed ? (
                <div className={styles.claimedMsg}><CheckCircle size={14}/> Request Sent</div>
              ) : (
                <button className={styles.claimBtn} onClick={() => setClaimed(p => [...p, d.id])}>
                  Request Pickup
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
