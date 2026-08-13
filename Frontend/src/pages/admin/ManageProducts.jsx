import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminPages.module.css';
import { Package, Trash2, Search, Eye } from 'lucide-react';
import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Vintage Chair',        seller: 'EcoNest Store',    category: 'furniture',   price: 299,   status: 'available' },
  { id: 2, name: 'Refurb Speaker',       seller: 'CircuitSave',      category: 'electronics', price: 799,   status: 'available' },
  { id: 3, name: 'Organic Spice Kit',    seller: 'GreenNest Foods',   category: 'food',       price: 349,   status: 'available' },
  { id: 4, name: 'Denim Jacket',         seller: 'ReWear Hub',       category: 'clothing',    price: 650,   status: 'sold'      },
  { id: 5, name: 'Glass Vase Set',       seller: 'ArtisanLoop',      category: 'furniture',   price: 450,   status: 'available' },
  { id: 6, name: 'Bamboo Lamp',          seller: 'EcoNest Store',    category: 'furniture',   price: 199,   status: 'available' },
];

export default function ManageProducts() {
  const [search, setSearch] = useState('');
  const list = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase()));
  return (
    <DashboardLayout role="admin" title="Manage Products" subtitle={`${PRODUCTS.length} total listings`}>
      <div className={styles.toolBar}>
        <div className={styles.searchBox}><Search size={15} style={{color:'rgb(var(--c-sage))'}}/><input className={styles.searchInput} placeholder="Search products or sellers…" value={search} onChange={e=>setSearch(e.target.value)} /></div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Product</th><th>Seller</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id}>
                <td className={styles.bold}>{p.name}</td>
                <td className={styles.muted}>{p.seller}</td>
                <td><span className={styles.catTag}>{p.category}</span></td>
                <td className={styles.price}>₹{p.price.toLocaleString('en-IN')}</td>
                <td><span className={styles.statusDot} style={p.status==='available'?{color:'rgb(var(--c-emerald))'}:{color:'rgb(var(--c-sage))'}}>{p.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtnSm}><Eye size={13}/></button>
                    <button className={styles.dangerBtnSm}><Trash2 size={13}/></button>
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
