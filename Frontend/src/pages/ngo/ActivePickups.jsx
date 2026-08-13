import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { Truck, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const PICKUPS = [
  { id: 'PK-01', item: 'Winter Blankets (×10)', donor: 'HomeCircle', address: '14, MG Road, Bengaluru', contact: '+91 98765 43210', eta: 'Today, 3:00 PM', status: 'en_route' },
  { id: 'PK-02', item: 'School Stationery Kit', donor: 'EduNest Shop', address: '22, Anna Salai, Chennai', contact: '+91 87654 32109', eta: 'Today, 5:30 PM', status: 'pending' },
  { id: 'PK-03', item: 'Canned Food Bundle',   donor: 'NatureFarm', address: '5, FC Road, Pune', contact: '+91 76543 21098', eta: 'Tomorrow, 10:00 AM', status: 'pending' },
];

const STATUS = {
  pending:  { label: 'Ready for Pickup', color: '227,162,60' },
  en_route: { label: 'En Route',         color: '62,207,142' },
};

export default function ActivePickups() {
  const [done, setDone] = useState([]);
  return (
    <DashboardLayout role="ngo" title="Active Pickups" subtitle="Track your ongoing collections">
      <div className={styles.pickupList}>
        {PICKUPS.map(p => {
          const isDone = done.includes(p.id);
          const cfg = STATUS[p.status];
          return (
            <div key={p.id} className={`${styles.pickupCard} ${isDone ? styles.pickupDone : ''}`}>
              <div className={styles.pickupHeader}>
                <div>
                  <p className={styles.pickupId}>{p.id}</p>
                  <h3 className={styles.pickupItem}>{p.item}</h3>
                  <p className={styles.pickupDonor}>From: <strong>{p.donor}</strong></p>
                </div>
                <span className={styles.pickupBadge} style={{color:`rgb(${cfg.color})`,background:`rgba(${cfg.color},0.1)`}}>
                  <Truck size={12}/> {cfg.label}
                </span>
              </div>
              <div className={styles.pickupMeta}>
                <div className={styles.metaItem}><MapPin size={13}/> {p.address}</div>
                <div className={styles.metaItem}><Phone size={13}/> {p.contact}</div>
                <div className={styles.metaItem}><Truck size={13}/> ETA: {p.eta}</div>
              </div>
              {isDone ? (
                <div className={styles.doneMsg}><CheckCircle size={15}/> Marked as Collected</div>
              ) : (
                <button className={styles.collectBtn} onClick={() => setDone(d => [...d, p.id])}>
                  <CheckCircle size={14}/> Mark as Collected
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
