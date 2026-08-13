import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './CustomerPages.module.css';
import { Heart, Trash2, ShoppingCart, MapPin } from 'lucide-react';
import { useState } from 'react';

const INITIAL_WISHLIST = [
  { id: 1, name: 'Refurbished MacBook Air', category: 'electronics', price: 32000, originalPrice: 75000, shop: 'TechCircle', distanceKm: 1.2, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
  { id: 2, name: 'Hand-woven Jute Rug', category: 'furniture', price: 1800, originalPrice: 4000, shop: 'EcoHome', distanceKm: 3.4, image: 'https://images.unsplash.com/photo-1575487394031-a5b28706cf4f?w=400&q=80' },
  { id: 3, name: 'Organic Spice Kit', category: 'food', price: 349, originalPrice: 599, shop: 'NatureFarm', distanceKm: 0.8, image: 'https://images.unsplash.com/photo-1596040033229-a9821eae058d?w=400&q=80' },
  { id: 4, name: 'Vintage Denim Jacket', category: 'clothing', price: 750, originalPrice: 2500, shop: 'ReWear Hub', distanceKm: 2.1, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80' },
];

export default function Wishlist() {
  const [items, setItems] = useState(INITIAL_WISHLIST);

  function remove(id) { setItems(prev => prev.filter(i => i.id !== id)); }

  return (
    <DashboardLayout role="customer" title="My Wishlist" subtitle={`${items.length} saved item${items.length !== 1 ? 's' : ''}`}>
      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <Heart size={48} style={{ opacity: 0.3 }} />
          <h3>Your wishlist is empty</h3>
          <p>Heart any product in the Marketplace to save it here.</p>
        </div>
      ) : (
        <div className={styles.wishGrid}>
          {items.map(item => {
            const disc = Math.round((1 - item.price / item.originalPrice) * 100);
            return (
              <div key={item.id} className={styles.wishCard}>
                <div className={styles.wishImage}>
                  <img src={item.image} alt={item.name} />
                  <span className={styles.discBadge}>{disc}% OFF</span>
                </div>
                <div className={styles.wishBody}>
                  <p className={styles.wishCat}>{item.category}</p>
                  <h4 className={styles.wishName}>{item.name}</h4>
                  <p className={styles.wishShop}><MapPin size={11} /> {item.shop} · {item.distanceKm} km</p>
                  <div className={styles.wishPriceRow}>
                    <span className={styles.wishPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                    <span className={styles.wishOrig}>₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.wishActions}>
                    <button className={styles.addCartBtn}><ShoppingCart size={14} /> Add to Cart</button>
                    <button className={styles.removeBtn} onClick={() => remove(item.id)} title="Remove"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
