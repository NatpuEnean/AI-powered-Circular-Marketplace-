import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SellerPages.module.css';
import { Gift, Heart, Plus } from 'lucide-react';
import { useState } from 'react';

const LISTED = [
  { id: 1, item: 'Winter Blankets (×5)', ngo: 'Helping Hands NGO', date: '2026-08-10', status: 'claimed' },
  { id: 2, item: 'Excess Bread Loaves',  ngo: 'Food For All',       date: '2026-08-09', status: 'pending' },
  { id: 3, item: 'Old School Books',     ngo: 'EduReach',           date: '2026-08-07', status: 'picked_up' },
];

export default function SellerDonations() {
  const [showForm, setShowForm] = useState(false);
  return (
    <DashboardLayout role="seller" title="Donations" subtitle="List surplus items for NGOs to collect">
      <div className={styles.infoCard}>
        <Heart size={18} style={{color:'rgb(var(--c-emerald))'}} />
        <p>Donating surplus products earns you <strong>Eco Points</strong> and reduces waste. NGOs in your area will be notified instantly.</p>
      </div>

      <div className={styles.topBar}>
        <button className={styles.primaryBtn} onClick={()=>setShowForm(v=>!v)}>
          <Plus size={15}/> {showForm ? 'Cancel' : 'List for Donation'}
        </button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>New Donation Listing</h3>
          <div className={styles.formGrid}>
            <div className={styles.field}><label className={styles.label}>Item Description</label><input className={styles.input} placeholder="e.g. Winter jackets ×10" /></div>
            <div className={styles.field}><label className={styles.label}>Quantity</label><input className={styles.input} type="number" placeholder="5" /></div>
            <div className={styles.field}><label className={styles.label}>Pickup By (Date)</label><input className={styles.input} type="date" /></div>
            <div className={styles.field}><label className={styles.label}>Category</label>
              <select className={styles.input}><option>Food</option><option>Clothing</option><option>Books</option><option>Other</option></select>
            </div>
          </div>
          <button className={styles.primaryBtn} style={{marginTop:12}}>Submit Donation</button>
        </div>
      )}

      <h2 className={styles.sectionTitle}><Gift size={16}/> My Donation History</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Item</th><th>NGO</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {LISTED.map(d=>(
              <tr key={d.id}>
                <td>{d.item}</td>
                <td className={styles.muted}>{d.ngo}</td>
                <td className={styles.muted}>{d.date}</td>
                <td><span className={styles.badge} style={
                  d.status==='claimed'?{color:'rgb(var(--c-emerald))',background:'rgba(62,207,142,0.1)'}:
                  d.status==='picked_up'?{color:'rgb(96,165,250)',background:'rgba(96,165,250,0.1)'}:
                  {color:'rgb(var(--c-harvest))',background:'rgba(227,162,60,0.1)'}
                }>{d.status.replace('_',' ')}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
