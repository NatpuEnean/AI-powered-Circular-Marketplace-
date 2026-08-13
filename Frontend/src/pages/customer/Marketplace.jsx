import { useMemo, useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Loader, RefreshCw, Store, Camera } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CategoryChips from '../../components/marketplace/CategoryChips';
import ProductGrid from '../../components/marketplace/ProductGrid';
import PhotoSearchModal from '../../components/marketplace/PhotoSearchModal';
import { marketplaceService } from '../../services/marketplace';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/navigation';
import styles from './Marketplace.module.css';

const DEFAULT_RADIUS_KM = 10;

export default function Marketplace() {
  const { user } = useAuth();

  // Location state
  const [lat, setLat]             = useState(user?.latitude  || null);
  const [lng, setLng]             = useState(user?.longitude || null);
  const [locStatus, setLocStatus] = useState(user?.latitude ? 'done' : 'idle');

  // Data state
  const [products, setProducts]   = useState([]);
  const [shops, setShops]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  // Filter state
  const [category, setCategory]   = useState('all');
  const [query, setQuery]         = useState('');
  const [wishlist, setWishlist]   = useState([]);

  // Photo search modal
  const [showPhotoSearch, setShowPhotoSearch] = useState(false);

  // ── Fetch nearby data ───────────────────────────────────────────────────────
  const fetchNearby = useCallback(async (latitude, longitude) => {
    setLoading(true);
    setError('');
    try {
      const [prods, shopList] = await Promise.all([
        marketplaceService.getNearbyProducts(latitude, longitude, DEFAULT_RADIUS_KM),
        marketplaceService.getNearbyShops(latitude, longitude, DEFAULT_RADIUS_KM),
      ]);
      setProducts(prods);
      setShops(shopList);
    } catch {
      setError('Could not load nearby products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch when location known
  useEffect(() => {
    if (lat && lng) fetchNearby(lat, lng);
  }, [lat, lng, fetchNearby]);

  // ── GPS detection ───────────────────────────────────────────────────────────
  function detectLocation() {
    setLocStatus('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLat(coords.latitude);
        setLng(coords.longitude);
        setLocStatus('done');
      },
      () => setLocStatus('denied')
    );
  }

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat   = category === 'all' || p.category === category;
      const q          = query.trim().toLowerCase();
      const matchQuery = !q ||
        (p.name     || '').toLowerCase().includes(q) ||
        (p.shopName || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, category, query]);

  const adaptedProducts = useMemo(() =>
    filtered.map((p) => ({
      id:            p.id,
      name:          p.name,
      category:      p.category,
      price:         p.price,
      originalPrice: p.originalPrice,
      seller:        p.shopName,
      distanceKm:    p.distanceKm,
      condition:     p.condition,
      image: p.imageBase64
        ? `data:image/jpeg;base64,${p.imageBase64}`
        : `https://source.unsplash.com/400x300/?${encodeURIComponent(p.category || 'product')}&sig=${p.id}`,
    })),
  [filtered]);

  function toggleWishlist(id, isWished) {
    setWishlist((list) => isWished ? [...list, id] : list.filter((i) => i !== id));
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout
      role={ROLES.customer}
      title="Marketplace"
      subtitle="Discover affordable, rescued products nearby"
    >
      {/* ── Search bar with camera button ───────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.searchWrap}>
          <Search size={16} color="rgb(143,163,152)" />
          <input
            id="marketplace-search"
            className={styles.searchInput}
            placeholder="Search products, shops, categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* ─── Camera / AI photo search button ────────────────────────── */}
          <div className={styles.searchDivider} />
          <button
            id="photo-search-btn"
            className={styles.cameraBtn}
            type="button"
            title="Search by photo"
            onClick={() => setShowPhotoSearch(true)}
          >
            <Camera size={16} />
            <span className={styles.cameraBtnLabel}>Search by photo</span>
          </button>
        </div>

        {/* Location buttons */}
        {locStatus === 'idle' && (
          <button id="detect-location-btn" className={styles.locationButton} type="button" onClick={detectLocation}>
            <MapPin size={15} /> Use my location
          </button>
        )}
        {locStatus === 'loading' && (
          <button className={styles.locationButton} type="button" disabled>
            <Loader size={15} className={styles.spin} /> Detecting…
          </button>
        )}
        {locStatus === 'done' && (
          <button className={`${styles.locationButton} ${styles.locDone}`} type="button" onClick={() => fetchNearby(lat, lng)}>
            <RefreshCw size={15} /> {lat?.toFixed(2)}°, {lng?.toFixed(2)}°
          </button>
        )}
        {locStatus === 'denied' && (
          <span className={styles.locDenied}>
            <MapPin size={14} /> Location denied — showing all
          </span>
        )}
      </div>

      {/* ── Nearby shops strip ──────────────────────────────────────────────── */}
      {shops.length > 0 && (
        <div className={styles.inlineBar}>
          <div className={styles.shopList}>
            <span className={styles.shopLabel}><Store size={13} /> Nearby shops:</span>
            {shops.map((shop) => (
              <button key={shop.id} type="button" className={styles.shopChip}>
                {shop.name} · {shop.distanceKm?.toFixed(1)} km
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── No location prompt ──────────────────────────────────────────────── */}
      {locStatus === 'idle' && (
        <div className={styles.locPrompt}>
          <MapPin size={32} style={{ opacity: 0.4 }} />
          <p>Allow location access to see products near you</p>
          <button id="prompt-location-btn" className={styles.locationButton} onClick={detectLocation}>
            <MapPin size={14} /> Enable location
          </button>
        </div>
      )}

      {/* ── Error banner ────────────────────────────────────────────────────── */}
      {error && <div className={styles.errorBanner}>⚠ {error}</div>}

      {/* ── Skeletons ───────────────────────────────────────────────────────── */}
      {loading && (
        <div className={styles.skeletonGrid}>
          {[1,2,3,4,5,6].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      )}

      {/* ── Products grid ───────────────────────────────────────────────────── */}
      {!loading && (locStatus === 'done' || locStatus === 'denied') && (
        <>
          <CategoryChips active={category} onChange={setCategory} />

          <p className={styles.resultCount}>
            <strong>{adaptedProducts.length}</strong> product{adaptedProducts.length !== 1 ? 's' : ''} found
            {locStatus === 'done' ? ' near you' : ''}
          </p>

          {adaptedProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <Search size={36} style={{ opacity: 0.3 }} />
              <p>No products found. Try a different category or expand the search area.</p>
            </div>
          ) : (
            <ProductGrid
              products={adaptedProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          )}
        </>
      )}

      {/* ── Photo Search Modal ──────────────────────────────────────────────── */}
      {showPhotoSearch && (
        <PhotoSearchModal
          userLat={lat}
          userLng={lng}
          onClose={() => setShowPhotoSearch(false)}
        />
      )}
    </DashboardLayout>
  );
}