import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, wishlist = [], onToggleWishlist }) {
  if (!products.length) {
    return <p className={styles.empty}>No nearby rescued products match your search.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          wishlisted={wishlist.includes(p.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}