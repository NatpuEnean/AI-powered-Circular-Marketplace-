import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminPages.module.css';
import { Store, CheckCircle, XCircle, Search } from 'lucide-react';
import { useState } from 'react';

const SELLERS = [
  { id: 1, shop: 'EcoNest Store',   owner: 'Priya Sharma', products: 12, revenue: 8400,  verified: true,  joined: '2026-07-22' },
  { id: 2, shop: 'CircuitSave',     owner: 'Dev Patel',    products: 8,  revenue: 22300, verified: true,  joined: '2026-06-28' },
  { id: 3, shop: 'ReWear Hub',      owner: 'Amit Joshi',   products: 21, revenue: 14100, verified: false, joined: '2026-08-05' },
  { id: 4, shop: 'GreenNest Foods', owner: 'Meena Rao',    products: 6,  revenue: 3200,  verified: true,  joined: '2026-08-01' },
  { id: 5, shop: 'ArtisanLoop',     owner: 'Sana Khan',    products: 15, revenue: 9800,  verified: false, joined: '2026-08-10' },
];

export default function ManageSellers() {
  const [search, setSearch] = useState('');
  const sellers = SELLERS.filter(s => s.shop.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase()));
  return (
    <DashboardLayout role="admin" title="Manage Sellers" subtitle={`${SELLERS.length} registered sellers`}>
      <div className={styles.toolBar}>
        <div className={styles.searchBox}><Search size={15} style={{color:'rgb(var(--c-sage))'}} /><input className={styles.searchInput} placeholder="Search shops or owners…" value={search} onChange={e=>setSearch(e.target.value)} /></div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Shop</th><th>Owner</th><th>Products</th><th>Revenue</th><th>Verified</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {sellers.map(s => (
              <tr key={s.id}>
                <td className={styles.bold}><Store size={13} style={{marginRight:6,color:'rgb(var(--c-sage))'}}/>{s.shop}</td>
                <td className={styles.muted}>{s.owner}</td>
                <td>{s.products}</td>
                <td className={styles.price}>₹{s.revenue.toLocaleString('en-IN')}</td>
                <td>{s.verified ? <span className={styles.yes}><CheckCircle size={14}/> Verified</span> : <span className={styles.no}><XCircle size={14}/> Pending</span>}</td>
                <td className={styles.muted}>{s.joined}</td>
                <td>
                  <div className={styles.actions}>
                    {!s.verified && <button className={styles.actionBtnSm} title="Verify">✓ Verify</button>}
                    <button className={styles.dangerBtnSm} title="Suspend">Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
