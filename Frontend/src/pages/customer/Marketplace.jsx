import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CategoryChips from '../../components/marketplace/CategoryChips';
import ProductGrid from '../../components/marketplace/ProductGrid';
import { products } from '../../data/products';
import { ROLES } from '../../data/navigation';
import styles from './Marketplace.module.css';

export default function Marketplace() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  function toggleWishlist(id, isWished) {
    setWishlist((list) => (isWished ? [...list, id] : list.filter((i) => i !== id)));
  }

  return (
    <DashboardLayout
      role={ROLES.customer}
      title="Marketplace"
      subtitle="Discover affordable, rescued products nearby"
    >
      <div className={styles.searchWrap}>
        <Search size={16} color="rgb(143,163,152)" />
        <input
          className={styles.searchInput}
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <CategoryChips active={category} onChange={setCategory} />

      <p className={styles.resultCount}>
        <strong>{filtered.length}</strong> products found
      </p>

      <ProductGrid products={filtered} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
    </DashboardLayout>
  );
}