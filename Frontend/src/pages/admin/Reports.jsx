import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminPages.module.css';
import { FileBarChart, Download, Leaf, Users, Store, Package } from 'lucide-react';

const REPORTS = [
  { title: 'Monthly GMV Report',        desc: 'Platform revenue for August 2026',      date: '2026-08-01', icon: FileBarChart },
  { title: 'User Growth Report',        desc: 'New registrations and retention data',   date: '2026-08-01', icon: Users       },
  { title: 'Seller Performance Report', desc: 'Top performing sellers this month',      date: '2026-08-01', icon: Store       },
  { title: 'Environmental Impact',      desc: 'CO₂ prevented and waste diverted',       date: '2026-08-01', icon: Leaf        },
  { title: 'Donation Activity',         desc: 'Donations listed, claimed, and picked',  date: '2026-08-01', icon: Package     },
];

const METRICS = [
  { label: 'Avg Session Duration', value: '4m 32s' },
  { label: 'Bounce Rate',          value: '18.4%'  },
  { label: 'Conversion Rate',      value: '6.2%'   },
  { label: 'Return Customers',     value: '68%'    },
];

export default function Reports() {
  return (
    <DashboardLayout role="admin" title="Reports" subtitle="Download and view platform reports">
      <div className={styles.metricsRow}>
        {METRICS.map(m => (
          <div key={m.label} className={styles.metricCard}>
            <p className={styles.metricVal}>{m.value}</p>
            <p className={styles.metricLabel}>{m.label}</p>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}><FileBarChart size={16}/> Available Reports</h2>
      <div className={styles.reportList}>
        {REPORTS.map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className={styles.reportRow}>
              <div className={styles.reportIcon}><Icon size={20}/></div>
              <div className={styles.reportInfo}>
                <p className={styles.reportTitle}>{r.title}</p>
                <p className={styles.reportDesc}>{r.desc} · {r.date}</p>
              </div>
              <button className={styles.downloadBtn}><Download size={14}/> Download</button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
