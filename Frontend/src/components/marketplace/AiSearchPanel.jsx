import { useRef, useState } from 'react';
import { Upload, Sparkles, X, Loader, AlertCircle, Package, MapPin } from 'lucide-react';
import { marketplaceService } from '../../services/marketplace';
import styles from './AiSearchPanel.module.css';

export default function AiSearchPanel({ userLat, userLng }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview]   = useState('');
  const [file, setFile]         = useState(null);
  const [results, setResults]   = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  function onFileSelected(event) {
    const f = event.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResults([]);
    setSearched(false);
    setError('');
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result || ''));
    reader.readAsDataURL(f);
  }

  function clearPhoto() {
    setFile(null);
    setPreview('');
    setResults([]);
    setSearched(false);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSearch() {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const data = await marketplaceService.aiSearch(
        file,
        userLat || 0,
        userLng || 0,
        25
      );
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError('AI search failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>AI Discovery</p>
          <h3 className={styles.heading}>Find by photo</h3>
        </div>
        <Sparkles size={18} className={styles.sparkle} />
      </div>

      <p className={styles.hint}>
        Upload a photo of any product — our AI will find visually similar items available near you.
      </p>

      {/* Upload area */}
      {!preview ? (
        <button
          id="ai-upload-btn"
          type="button"
          className={styles.uploadButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={16} />
          Upload product photo
        </button>
      ) : (
        <div className={styles.previewBox}>
          <img src={preview} alt="Upload preview" />
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearPhoto}
            aria-label="Remove photo"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onFileSelected}
      />

      {/* Search trigger */}
      {file && !searched && (
        <button
          id="ai-search-btn"
          type="button"
          className={styles.searchBtn}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading
            ? <><Loader size={15} className={styles.spin} /> Analysing…</>
            : <><Sparkles size={15} /> Find Similar Products</>}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className={styles.errorMsg}>
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {/* Results */}
      {searched && (
        <>
          <div className={styles.resultsLabel}>
            {results.length === 0
              ? 'No similar products found nearby'
              : `${results.length} similar product${results.length !== 1 ? 's' : ''} found near you`}
          </div>
          <div className={styles.resultList}>
            {results.slice(0, 6).map((item) => (
              <div key={item.id} className={`${styles.item} ${item.aiMatch ? styles.itemMatch : ''}`}>
                <div className={styles.itemImage}>
                  {item.imageBase64 ? (
                    <img src={`data:image/jpeg;base64,${item.imageBase64}`} alt={item.name} />
                  ) : (
                    <Package size={20} />
                  )}
                </div>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemPrice}>₹{item.price?.toLocaleString('en-IN')}</span>
                    {item.distanceKm != null && (
                      <span className={styles.itemDist}>
                        <MapPin size={11} /> {item.distanceKm} km
                      </span>
                    )}
                    {item.aiMatch && <span className={styles.matchBadge}>✦ Best match</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
