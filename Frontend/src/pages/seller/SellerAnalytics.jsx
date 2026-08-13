import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SellerPages.module.css';
import { PieChart, TrendingUp } from 'lucide-react';

const MONTHS = ['Mar','Apr','May','Jun','Jul','Aug'];
const REVENUE = [1200, 2100, 1800, 3400, 2900, 3800];
const MAX_R = Math.max(...REVENUE);

const CATEGORIES = [
  { label: 'Furniture',    pct: 38, color: 'var(--c-emerald)' },
  { label: 'Electronics',  pct: 28, color: 'var(--c-harvest)' },
  { label: 'Clothing',     pct: 20, color: '96,165,250'       },
  { label: 'Others',       pct: 14, color: 'var(--c-sage)'    },
];

const TOP_PRODUCTS = [
  { name: 'Vintage Chair', sold: 7, revenue: 2093 },
  { name: 'Table Lamp',    sold: 5, revenue: 995  },
  { name: 'Jute Basket',   sold: 9, revenue: 1341 },
  { name: 'Glass Vase',    sold: 3, revenue: 1350 },
];

export default function SellerAnalytics() {
  const totalRev = REVENUE.reduce((a,b)=>a+b,0);
  const totalSold = TOP_PRODUCTS.reduce((a,p)=>a+p.sold,0);
  return (
    <DashboardLayout role="seller" title="Analytics" subtitle="Sales performance & insights">
      <div className={styles.summaryRow}>
        <div className={styles.statCard}><p className={styles.statLabel}>Total Revenue</p><p className={styles.statValue}>₹{totalRev.toLocaleString('en-IN')}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>Items Sold</p><p className={styles.statValue}>{totalSold}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>Avg Order Value</p><p className={styles.statValue}>₹{Math.round(totalRev/totalSold)}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>This Month</p><p className={styles.statValue} style={{color:'rgb(var(--c-emerald))'}}>₹{REVENUE[REVENUE.length-1].toLocaleString('en-IN')}</p></div>
      </div>

      <div className={styles.analyticsGrid}>
        {/* Revenue bar chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}><TrendingUp size={15}/> Monthly Revenue (₹)</h3>
          <div className={styles.barChart}>
            {REVENUE.map((val, i) => (
              <div key={i} className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div className={styles.bar} style={{height:`${(val/MAX_R)*120}px`}}>
                    <span className={styles.barVal}>{(val/1000).toFixed(1)}k</span>
                  </div>
                </div>
                <p className={styles.barLabel}>{MONTHS[i]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}><PieChart size={15}/> Sales by Category</h3>
          <div className={styles.categoryList}>
            {CATEGORIES.map(c => (
              <div key={c.label} className={styles.catRow}>
                <span className={styles.catDot} style={{background:`rgb(${c.color})`}} />
                <span className={styles.catLabel}>{c.label}</span>
                <div className={styles.catBar}>
                  <div className={styles.catFill} style={{width:`${c.pct}%`,background:`rgb(${c.color})`}}/>
                </div>
                <span className={styles.catPct}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top products */}
      <h2 className={styles.sectionTitle}>🏆 Top Products</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr></thead>
          <tbody>
            {TOP_PRODUCTS.sort((a,b)=>b.revenue-a.revenue).map((p,i)=>(
              <tr key={i}>
                <td>{p.name}</td>
                <td className={styles.muted}>{p.sold}</td>
                <td className={styles.price}>₹{p.revenue.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
