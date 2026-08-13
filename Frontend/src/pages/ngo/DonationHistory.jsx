import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { History, CheckCircle } from 'lucide-react';

const HISTORY = [
  { id: 'PK-A1', item: 'Rice & Lentils (5kg)',    donor: 'GreenNest', date: '2026-08-10', qty: 8,  beneficiaries: 16 },
  { id: 'PK-A2', item: 'Canned Food Bundle',       donor: 'NatureFarm',date: '2026-08-08', qty: 24, beneficiaries: 48 },
  { id: 'PK-A3', item: 'Pre-loved Jackets (×6)',   donor: 'ReWear Hub',date: '2026-08-05', qty: 6,  beneficiaries: 6  },
  { id: 'PK-A4', item: 'School Stationery Kit',    donor: 'EduNest',   date: '2026-08-02', qty: 15, beneficiaries: 15 },
  { id: 'PK-A5', item: 'Blankets (×10)',            donor: 'HomeCircle',date: '2026-07-28', qty: 10, beneficiaries: 10 },
  { id: 'PK-A6', item: 'Dry Grocery Box',           donor: 'PantryLoop',date: '2026-07-22', qty: 3,  beneficiaries: 9  },
];

export default function DonationHistory() {
  const totalBenef = HISTORY.reduce((s, h) => s + h.beneficiaries, 0);
  return (
    <DashboardLayout role="ngo" title="Donation History" subtitle="All completed collections">
      <div className={styles.summaryRow}>
        <div className={styles.smStat}><p className={styles.smLabel}>Total Collections</p><p className={styles.smValue}>{HISTORY.length}</p></div>
        <div className={styles.smStat}><p className={styles.smLabel}>Total Items</p><p className={styles.smValue}>{HISTORY.reduce((s,h)=>s+h.qty,0)}</p></div>
        <div className={styles.smStat}><p className={styles.smLabel}>Beneficiaries</p><p className={styles.smValue} style={{color:'rgb(var(--c-emerald))'}}>{totalBenef}</p></div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>ID</th><th>Item</th><th>Donor</th><th>Date</th><th>Qty</th><th>Helped</th></tr></thead>
          <tbody>
            {HISTORY.map(h => (
              <tr key={h.id}>
                <td className={styles.mono}>{h.id}</td>
                <td>{h.item}</td>
                <td className={styles.muted}>{h.donor}</td>
                <td className={styles.muted}>{h.date}</td>
                <td className={styles.muted}>{h.qty}</td>
                <td><span style={{color:'rgb(var(--c-emerald))',fontWeight:700,display:'flex',alignItems:'center',gap:5}}><CheckCircle size={12}/>{h.beneficiaries} people</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
