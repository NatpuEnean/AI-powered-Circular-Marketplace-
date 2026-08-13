import { useRef, useState } from 'react';
import { Heart, MapPin, Clock } from 'lucide-react';
import styles from './ProductCard.module.css';
import { cn } from '../../lib/cn';
import { discountPercent } from '../../data/products';

export default function ProductCard({ product, wishlisted, onToggleWishlist }) {
  const cardRef = useRef(null);
  const [wished, setWished] = useState(!!wishlisted);

  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${px * 8}deg`);
    el.style.setProperty('--ry', `${-py * 8}deg`);
  }

  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  function handleWishlist(e) {
    e.stopPropagation();
    setWished((w) => !w);
    onToggleWishlist?.(product.id, !wished);
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
        <span className={styles.badge}>{discountPercent(product)}% OFF</span>
        <button
          className={cn(styles.wishlistBtn, wished && styles.wishlistActive)}
          onClick={handleWishlist}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
        >
          <Heart size={15} strokeWidth={2} />
        </button>
        <span className={styles.expiryTag}>
          <Clock size={11} />
          {product.expiry}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <MapPin size={12} />
            {product.distance}
          </span>
          <span>{product.seller}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          <span className={styles.originalPrice}>₹{product.originalPrice}</span>
        </div>
        <button className={styles.viewBtn}>View Product</button>
      </div>
    </div>
  );
}