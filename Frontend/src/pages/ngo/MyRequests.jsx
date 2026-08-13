import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './NGOPages.module.css';
import { ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';

const REQUESTS = [
  { id: '#REQ-01', item: 'Canned Food Bundle',   donor: 'NatureFarm',     sent: '2026-08-12', status: 'pending'  },
  { id: '#REQ-02', item: 'Winter Blankets (×10)',  donor: 'HomeCircle',    sent: '2026-08-10', status: 'approved' },
  { id: '#REQ-03', item: 'School Stationery Kit',  donor: 'EduNest Shop',  sent: '2026-08-08', status: 'approved' },
  { id: '#REQ-04', item: 'Used Furniture Bundle',   donor: 'FurnishLoop',  sent: '2026-08-05', status: 'rejected' },
  { id: '#REQ-05', item: 'Rice & Lentils (5kg)',   donor: 'GreenNest',     sent: '2026-08-03', status: 'pending'  },
];

const STATUS = {
  pending:  { icon: Clock,        color: '227,162,60', label: 'Pending'  },
  approved: { icon: CheckCircle,  color: '62,207,142', label: 'Approved' },
  rejected: { icon: XCircle,      color: '226,87,76',  label: 'Rejected' },
};

export default function MyRequests() {
  return (
    <DashboardLayout role="ngo" title="My Requests" subtitle="Track your pickup requests">
      <div className={styles.summaryRow}>
        <div className={styles.smStat}><p className={styles.smLabel}>Total</p><p className={styles.smValue}>{REQUESTS.length}</p></div>
        <div className={styles.smStat}><p className={styles.smLabel}>Pending</p><p className={styles.smValue} style={{color:'rgb(227,162,60)'}}>{REQUESTS.filter(r=>r.status==='pending').length}</p></div>
        <div className={styles.smStat}><p className={styles.smLabel}>Approved</p><p className={styles.smValue} style={{color:'rgb(var(--c-emerald))'}}>{REQUESTS.filter(r=>r.status==='approved').length}</p></div>
        <div className={styles.smStat}><p className={styles.smLabel}>Rejected</p><p className={styles.smValue} style={{color:'rgb(226,87,76)'}}>{REQUESTS.filter(r=>r.status==='rejected').length}</p></div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Request ID</th><th>Item</th><th>Donor</th><th>Sent</th><th>Status</th></tr></thead>
          <tbody>
            {REQUESTS.map(r => {
              const cfg = STATUS[r.status]; const Icon = cfg.icon;
              return (
                <tr key={r.id}>
                  <td className={styles.mono}>{r.id}</td>
                  <td>{r.item}</td>
                  <td className={styles.muted}>{r.donor}</td>
                  <td className={styles.muted}>{r.sent}</td>
                  <td>
                    <span className={styles.badge} style={{color:`rgb(${cfg.color})`,background:`rgba(${cfg.color},0.1)`}}>
                      <Icon size={11}/> {cfg.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
