import { useState, useEffect } from 'react';
import { Package, TrendingUp, ShoppingBag, Store, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { marketplaceService } from '../../services/marketplace';
import styles from './SellerDashboard.module.css';

export default function SellerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getMyProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const availableCount = products.filter(p => p.status === 'available').length;

  return (
    <DashboardLayout
      role="seller"
      title={`Welcome back, ${user?.name?.split(' ')[0] ?? 'Seller'} 👋`}
      subtitle="Your shop overview"
    >
      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}><Package size={20} /></div>
          <div>
            <p className={styles.statLabel}>Total Products</p>
            <p className={styles.statValue}>{products.length}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconTeal}`}><ShoppingBag size={20} /></div>
          <div>
            <p className={styles.statLabel}>Available</p>
            <p className={styles.statValue}>{availableCount}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGold}`}><TrendingUp size={20} /></div>
          <div>
            <p className={styles.statLabel}>Total Value</p>
            <p className={styles.statValue}>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}><Store size={20} /></div>
          <div>
            <p className={styles.statLabel}>Shop</p>
            <p className={styles.statValue} style={{ fontSize: '0.95rem' }}>{user?.shopName || 'My Shop'}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.actions}>
        <button id="go-add-product" className={styles.primaryAction} onClick={() => navigate('/seller/add-product')}>
          <Plus size={18} />
          Add New Product
        </button>
        <button id="go-inventory" className={styles.secondaryAction} onClick={() => navigate('/seller/inventory')}>
          <Package size={18} />
          View Inventory
        </button>
      </div>

      {/* Recent products */}
      <div className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Recent Listings</h2>
        {loading ? (
          <div className={styles.loadingRow}>
            {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={40} style={{ color: 'rgb(var(--c-sage))' }} />
            <p>No products listed yet.</p>
            <button className={styles.primaryAction} onClick={() => navigate('/seller/add-product')}>
              <Plus size={16} /> List your first product
            </button>
          </div>
        ) : (
          <div className={styles.productList}>
            {products.slice(0, 5).map(p => (
              <div key={p.id} className={styles.productRow}>
                <div className={styles.productImage}>
                  {p.imageBase64
                    ? <img src={`data:image/jpeg;base64,${p.imageBase64}`} alt={p.name} />
                    : <Package size={20} />}
                </div>
                <div className={styles.productMeta}>
                  <p className={styles.productName}>{p.name}</p>
                  <p className={styles.productCategory}>{p.category}</p>
                </div>
                <div className={styles.productPrice}>₹{p.price?.toLocaleString('en-IN')}</div>
                <div className={`${styles.productStatus} ${p.status === 'available' ? styles.statusAvail : styles.statusSold}`}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
