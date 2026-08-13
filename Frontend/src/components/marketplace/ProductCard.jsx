import { useRef, useState } from 'react';
import { Heart, MapPin, Clock, ShoppingCart } from 'lucide-react';
import styles from './ProductCard.module.css';
import { cn } from '../../lib/cn';

function calcDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round((1 - price / originalPrice) * 100);
}

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

  const discount = calcDiscount(product.price, product.originalPrice);
  // Support both "distanceKm" (from API) and "distance" (legacy mock)
  const distLabel = product.distanceKm != null
    ? `${product.distanceKm} km`
    : product.distance ?? null;

  const imageSrc = product.image
    || `https://source.unsplash.com/400x300/?${encodeURIComponent(product.category || 'product')}&sig=${product.id}`;

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrap}>
        <img src={imageSrc} alt={product.name} className={styles.image} loading="lazy" />

        {discount != null && discount > 0 && (
          <span className={styles.badge}>{discount}% OFF</span>
        )}

        <button
          className={cn(styles.wishlistBtn, wished && styles.wishlistActive)}
          onClick={handleWishlist}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
        >
          <Heart size={15} strokeWidth={2} />
        </button>

        {product.expiry && (
          <span className={styles.expiryTag}>
            <Clock size={11} />
            {product.expiry}
          </span>
        )}

        {product.condition && (
          <span className={styles.conditionTag}>{product.condition}</span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.metaRow}>
          {distLabel && (
            <span className={styles.metaItem}>
              <MapPin size={12} />
              {distLabel}
            </span>
          )}
          {product.seller && <span className={styles.seller}>{product.seller}</span>}
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{Number(product.price).toLocaleString('en-IN')}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className={styles.originalPrice}>₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
          )}
        </div>

        <button className={styles.viewBtn}>
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}