import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './CustomerPages.module.css';
import { ShoppingBag, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const ORDERS = [
  { id: '#CM-001', product: 'Vintage Wooden Chair', shop: 'GreenNest Store', date: '2026-08-10', price: 299, status: 'delivered' },
  { id: '#CM-002', product: 'Organic Cotton Tote Bag', shop: 'EcoThreads', date: '2026-08-08', price: 149, status: 'shipped' },
  { id: '#CM-003', product: 'Refurbished Bluetooth Speaker', shop: 'CircuitSave', date: '2026-08-05', price: 799, status: 'delivered' },
  { id: '#CM-004', product: 'Upcycled Glass Vase Set', shop: 'Artisan Loop', date: '2026-08-01', price: 450, status: 'cancelled' },
  { id: '#CM-005', product: 'Pre-loved Denim Jacket', shop: 'ReWear Hub', date: '2026-07-28', price: 650, status: 'delivered' },
];

const STATUS_CONFIG = {
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'var(--c-emerald)' },
  shipped:   { icon: Truck,        label: 'Shipped',   color: 'var(--c-harvest)' },
  pending:   { icon: Clock,        label: 'Pending',   color: 'var(--c-sage)'    },
  cancelled: { icon: XCircle,      label: 'Cancelled', color: '226,87,76'        },
};

export default function MyOrders() {
  return (
    <DashboardLayout role="customer" title="My Orders" subtitle="Track and manage your purchases">
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <ShoppingBag size={20} style={{ color: 'rgb(var(--c-emerald))' }} />
          <div><p className={styles.summaryLabel}>Total Orders</p><p className={styles.summaryValue}>{ORDERS.length}</p></div>
        </div>
        <div className={styles.summaryCard}>
          <CheckCircle size={20} style={{ color: 'rgb(var(--c-emerald))' }} />
          <div><p className={styles.summaryLabel}>Delivered</p><p className={styles.summaryValue}>{ORDERS.filter(o => o.status === 'delivered').length}</p></div>
        </div>
        <div className={styles.summaryCard}>
          <Truck size={20} style={{ color: 'rgb(var(--c-harvest))' }} />
          <div><p className={styles.summaryLabel}>In Transit</p><p className={styles.summaryValue}>{ORDERS.filter(o => o.status === 'shipped').length}</p></div>
        </div>
        <div className={styles.summaryCard}>
          <Package size={20} style={{ color: 'rgb(var(--c-sage))' }} />
          <div><p className={styles.summaryLabel}>Total Spent</p><p className={styles.summaryValue}>₹{ORDERS.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+o.price,0).toLocaleString('en-IN')}</p></div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th><th>Product</th><th>Shop</th><th>Date</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map(order => {
              const cfg = STATUS_CONFIG[order.status];
              const Icon = cfg.icon;
              return (
                <tr key={order.id}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>{order.product}</td>
                  <td className={styles.muted}>{order.shop}</td>
                  <td className={styles.muted}>{order.date}</td>
                  <td className={styles.price}>₹{order.price.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ color: `rgb(${cfg.color})`, background: `rgba(${cfg.color},0.1)` }}>
                      <Icon size={12} /> {cfg.label}
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
