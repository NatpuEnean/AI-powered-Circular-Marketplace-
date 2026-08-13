import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SellerPages.module.css';
import { ClipboardList, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

const ORDERS = [
  { id: '#ORD-101', buyer: 'Arjun M.', product: 'Vintage Chair', amount: 299, date: '2026-08-12', status: 'pending' },
  { id: '#ORD-102', buyer: 'Priya S.', product: 'Wooden Shelf',  amount: 599, date: '2026-08-11', status: 'shipped' },
  { id: '#ORD-103', buyer: 'Ravi K.', product: 'Table Lamp',     amount: 199, date: '2026-08-10', status: 'delivered' },
  { id: '#ORD-104', buyer: 'Sneha T.', product: 'Jute Basket',   amount: 149, date: '2026-08-09', status: 'delivered' },
  { id: '#ORD-105', buyer: 'Dev P.',   product: 'Glass Vase',    amount: 250, date: '2026-08-07', status: 'cancelled' },
];

const STATUS_CFG = {
  pending:   { icon: Clock,         color: '227,162,60',  label: 'Pending'   },
  shipped:   { icon: Truck,         color: '96,165,250',  label: 'Shipped'   },
  delivered: { icon: CheckCircle,   color: '62,207,142',  label: 'Delivered' },
  cancelled: { icon: XCircle,       color: '226,87,76',   label: 'Cancelled' },
};

export default function SellerOrders() {
  const revenue = ORDERS.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  return (
    <DashboardLayout role="seller" title="Orders" subtitle="Manage customer orders">
      <div className={styles.summaryRow}>
        <div className={styles.statCard}><p className={styles.statLabel}>Total Orders</p><p className={styles.statValue}>{ORDERS.length}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>Pending</p><p className={styles.statValue} style={{color:'rgb(227,162,60)'}}>{ORDERS.filter(o=>o.status==='pending').length}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>Delivered</p><p className={styles.statValue} style={{color:'rgb(var(--c-emerald))'}}>{ORDERS.filter(o=>o.status==='delivered').length}</p></div>
        <div className={styles.statCard}><p className={styles.statLabel}>Revenue</p><p className={styles.statValue}>₹{revenue.toLocaleString('en-IN')}</p></div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Order</th><th>Buyer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {ORDERS.map(o => {
              const cfg = STATUS_CFG[o.status]; const Icon = cfg.icon;
              return (
                <tr key={o.id}>
                  <td className={styles.orderId}>{o.id}</td>
                  <td>{o.buyer}</td>
                  <td className={styles.muted}>{o.product}</td>
                  <td className={styles.muted}>{o.date}</td>
                  <td className={styles.price}>₹{o.amount.toLocaleString('en-IN')}</td>
                  <td><span className={styles.badge} style={{color:`rgb(${cfg.color})`,background:`rgba(${cfg.color},0.1)`}}><Icon size={11}/>{cfg.label}</span></td>
                  <td>{o.status==='pending'&&<button className={styles.actionBtn}>Mark Shipped</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
