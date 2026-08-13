import { useState, useEffect } from 'react';
import { Trash2, Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { marketplaceService } from '../../services/marketplace';
import styles from './Inventory.module.css';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const data = await marketplaceService.getMyProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleDelete(id) {
    if (!confirm('Remove this product?')) return;
    setDeleting(id);
    try {
      await marketplaceService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Could not delete product.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <DashboardLayout role="seller" title="Inventory" subtitle={`${products.length} product${products.length !== 1 ? 's' : ''} listed`}>
      <div className={styles.topBar}>
        <button id="inv-add-btn" className={styles.addBtn} onClick={() => navigate('/seller/add-product')}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingGrid}>
          {[1,2,3,4,5,6].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : products.length === 0 ? (
        <div className={styles.emptyState}>
          <Package size={48} style={{ color: 'rgb(var(--c-sage))' }} />
          <h3>No products yet</h3>
          <p>Start listing items from your shop to reach nearby customers.</p>
          <button className={styles.addBtn} onClick={() => navigate('/seller/add-product')}>
            <Plus size={16} /> Add your first product
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.imageWrap}>
                {p.imageBase64 ? (
                  <img src={`data:image/jpeg;base64,${p.imageBase64}`} alt={p.name} className={styles.cardImage} />
                ) : (
                  <div className={styles.noImage}><Package size={24} /></div>
                )}
                <span className={`${styles.badge} ${p.status === 'available' ? styles.badgeAvail : styles.badgeSold}`}>
                  {p.status}
                </span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.cardCategory}>{p.category}</p>
                <h3 className={styles.cardName}>{p.name}</h3>

                <div className={styles.priceRow}>
                  <span className={styles.price}>₹{p.price?.toLocaleString('en-IN')}</span>
                  {p.originalPrice && p.originalPrice > p.price && (
                    <span className={styles.origPrice}>₹{p.originalPrice?.toLocaleString('en-IN')}</span>
                  )}
                  {p.originalPrice && p.originalPrice > p.price && (
                    <span className={styles.discount}>
                      -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className={styles.meta}>
                  <span>Qty: {p.quantity ?? 1}</span>
                  {p.condition && <span>· {p.condition}</span>}
                  {p.distanceKm != null && <span>· {p.distanceKm} km</span>}
                </div>

                <div className={styles.cardActions}>
                  <button
                    id={`delete-product-${p.id}`}
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    title="Remove listing"
                  >
                    {deleting === p.id ? <span className={styles.spinner} /> : <Trash2 size={15} />}
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
