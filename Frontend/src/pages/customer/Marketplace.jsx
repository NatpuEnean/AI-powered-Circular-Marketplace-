import { useMemo, useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CategoryChips from '../../components/marketplace/CategoryChips';
import ProductGrid from '../../components/marketplace/ProductGrid';
import AiSearchPanel from '../../components/marketplace/AiSearchPanel';
import SellerInventory from '../../components/marketplace/SellerInventory';
import { products } from '../../data/products';
import { nearbyShops, demoUserLocation, filterProductsByLocation } from '../../data/marketplace';
import { ROLES } from '../../data/navigation';
import styles from './Marketplace.module.css';

export default function Marketplace() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [showSellerView, setShowSellerView] = useState(false);

  const nearbyProducts = useMemo(
    () => filterProductsByLocation(products, demoUserLocation.latitude, demoUserLocation.longitude, 10),
    []
  );

  const filtered = useMemo(() => {
    return nearbyProducts.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery =
        p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        (p.seller || '').toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, nearbyProducts, query]);

  function toggleWishlist(id, isWished) {
    setWishlist((list) => (isWished ? [...list, id] : list.filter((item) => item !== id)));
  }

  return (
    <DashboardLayout
      role={ROLES.customer}
      title="Marketplace"
      subtitle="Discover affordable, rescued products nearby"
    >
      <div className={styles.topBar}>
        <div className={styles.searchWrap}>
          <Search size={16} color="rgb(143,163,152)" />
          <input
            className={styles.searchInput}
            placeholder="Search products or shops..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className={styles.locationButton} type="button">
          <MapPin size={15} />
          Near your location
        </button>
      </div>

      <div className={styles.inlineBar}>
        <div className={styles.shopList}>
          {nearbyShops.map((shop) => (
            <button key={shop.id} type="button" className={styles.shopChip}>
              {shop.name} · {shop.distanceKm.toFixed(1)} km
            </button>
          ))}
        </div>
        <button className={styles.toggleButton} type="button" onClick={() => setShowSellerView((value) => !value)}>
          <SlidersHorizontal size={15} />
          {showSellerView ? 'Customer view' : 'Seller view'}
        </button>
      </div>

      {!showSellerView ? (
        <>
          <CategoryChips active={category} onChange={setCategory} />

          <p className={styles.resultCount}>
            <strong>{filtered.length}</strong> products found near you
          </p>

          <ProductGrid products={filtered} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          <AiSearchPanel />
        </>
      ) : (
        <SellerInventory />
      )}
    </DashboardLayout>
  );
}