import { useRef, useState } from 'react';
import { X, Camera, Loader, Sparkles, MapPin, Package, RotateCcw } from 'lucide-react';
import { marketplaceService } from '../../services/marketplace';
import styles from './PhotoSearchModal.module.css';

export default function PhotoSearchModal({ userLat, userLng, onClose }) {
  const fileRef   = useRef(null);
  const [preview,  setPreview]  = useState(null);
  const [file,     setFile]     = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [results,  setResults]  = useState(null); // null = not searched yet
  const [error,    setError]    = useState('');

  /* ── File handling ──────────────────────────────────────────────────────── */
  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResults(null);
    setError('');
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(f);
    // Auto-search as soon as image loads
    doSearch(f);
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) {
      const synth = { target: { files: [f] } };
      onFileChange(synth);
    }
  }

  /* ── Search ─────────────────────────────────────────────────────────────── */
  async function doSearch(imageFile) {
    setLoading(true);
    setError('');
    try {
      const data = await marketplaceService.aiSearch(
        imageFile,
        userLat  || 0,
        userLng  || 0,
        25
      );
      setResults(data);
    } catch {
      setError('Search failed — make sure the backend is running.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  /* ── Overlay close on backdrop click ───────────────────────────────────── */
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.overlay} onClick={handleBackdrop}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Sparkles size={18} style={{ color: 'rgb(var(--c-harvest))' }} />
            <div>
              <p className={styles.kicker}>AI Visual Search</p>
              <h2 className={styles.title}>Find by Photo</h2>
            </div>
          </div>
          <button id="photo-search-close" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>

          {/* Upload zone */}
          {!preview ? (
            <div
              className={styles.dropzone}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className={styles.dropzoneInner}>
                <div className={styles.cameraIcon}><Camera size={36} /></div>
                <p className={styles.dropTitle}>Upload a product photo</p>
                <p className={styles.dropSub}>Drag & drop or click to browse</p>
                <p className={styles.dropHint}>JPG · PNG · WEBP — we'll find similar items near you</p>
              </div>
            </div>
          ) : (
            <div className={styles.previewArea}>
              <div className={styles.previewWrap}>
                <img src={preview} alt="Your photo" className={styles.previewImg} />
                <div className={styles.previewOverlay}>
                  {loading && (
                    <div className={styles.analyzingBadge}>
                      <Loader size={14} className={styles.spin} />
                      Analysing image…
                    </div>
                  )}
                  {!loading && results !== null && (
                    <div className={styles.analyzingBadge} style={{ background: 'rgba(62,207,142,0.9)' }}>
                      <Sparkles size={14} />
                      {results.length} similar found
                    </div>
                  )}
                </div>
              </div>
              <button className={styles.retryBtn} onClick={reset}>
                <RotateCcw size={14} /> Try a different photo
              </button>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onFileChange}
          />

          {/* Error */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Loading skeleton */}
          {loading && (
            <div className={styles.skeletonGrid}>
              {[1,2,3,4].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          )}

          {/* Results */}
          {!loading && results !== null && (
            <div className={styles.results}>
              <p className={styles.resultsLabel}>
                {results.length === 0
                  ? '😕 No similar products found nearby'
                  : `Showing ${results.length} similar product${results.length !== 1 ? 's' : ''} near you`}
              </p>

              <div className={styles.resultsGrid}>
                {results.map(p => {
                  const disc = p.originalPrice && p.originalPrice > p.price
                    ? Math.round((1 - p.price / p.originalPrice) * 100)
                    : null;
                  const imgSrc = p.imageBase64
                    ? `data:image/jpeg;base64,${p.imageBase64}`
                    : `https://source.unsplash.com/400x300/?${encodeURIComponent(p.category || 'product')}&sig=${p.id}`;

                  return (
                    <div key={p.id} className={`${styles.card} ${p.aiMatch ? styles.cardMatch : ''}`}>
                      {p.aiMatch && <div className={styles.matchBadge}><Sparkles size={11} /> Best Match</div>}

                      <div className={styles.cardImg}>
                        <img src={imgSrc} alt={p.name} />
                        {disc && <span className={styles.discBadge}>{disc}% OFF</span>}
                      </div>

                      <div className={styles.cardBody}>
                        <p className={styles.cardCat}>{p.category}</p>
                        <p className={styles.cardName}>{p.name}</p>

                        {(p.shopName || p.distanceKm != null) && (
                          <p className={styles.cardShop}>
                            <MapPin size={11} />
                            {p.shopName}
                            {p.distanceKm != null && ` · ${p.distanceKm} km`}
                          </p>
                        )}

                        <div className={styles.cardPriceRow}>
                          <span className={styles.cardPrice}>
                            ₹{Number(p.price).toLocaleString('en-IN')}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className={styles.cardOrig}>
                              ₹{Number(p.originalPrice).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button className={styles.viewBtn}>
                          <Package size={13} /> View Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Initial prompt when no photo yet */}
          {!file && !loading && (
            <div className={styles.examples}>
              <p className={styles.examplesLabel}>Try uploading a photo of:</p>
              <div className={styles.exampleTags}>
                {['📱 Electronics', '👗 Clothing', '🪑 Furniture', '📚 Books', '🍎 Food', '🧸 Toys'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
