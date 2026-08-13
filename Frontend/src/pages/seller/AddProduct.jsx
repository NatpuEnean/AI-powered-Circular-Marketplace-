import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, CheckCircle, AlertCircle, X, Package } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { marketplaceService } from '../../services/marketplace';
import styles from './AddProduct.module.css';

const CATEGORIES = ['electronics', 'clothing', 'furniture', 'books', 'food', 'toys', 'sports', 'tools', 'other'];
const CONDITIONS = ['new', 'like-new', 'good', 'fair', 'for-parts'];

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName]         = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice]       = useState('');
  const [origPrice, setOrigPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('good');
  const [description, setDesc]  = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [lat, setLat]           = useState(user?.latitude || null);
  const [lng, setLng]           = useState(user?.longitude || null);
  const [address, setAddress]   = useState(user?.address || '');
  const [locStatus, setLocStatus] = useState(user?.latitude ? 'done' : 'idle');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  const fileRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target.result; // data:image/...;base64,...
      setImagePreview(result);
      setImageBase64(result.split(',')[1]); // strip prefix
    };
    reader.readAsDataURL(file);
  }

  function detectLocation() {
    setLocStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocStatus('done');
      },
      () => setLocStatus('denied')
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!category) { setError('Please select a category.'); return; }
    if (!lat || !lng) { setError('Location is required to list a product.'); return; }
    setError('');
    setLoading(true);

    try {
      await marketplaceService.addProduct({
        name,
        category,
        price: parseFloat(price),
        originalPrice: origPrice ? parseFloat(origPrice) : parseFloat(price),
        quantity: parseInt(quantity),
        condition,
        description,
        imageBase64,
        shopName: user?.shopName || 'My Shop',
        address,
        latitude: lat,
        longitude: lng,
      });
      setSuccess(true);
      setTimeout(() => navigate('/seller/inventory'), 1800);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <DashboardLayout role="seller" title="Add Product" subtitle="List a new item">
        <div className={styles.successState}>
          <CheckCircle size={56} style={{ color: 'rgb(var(--c-emerald))' }} />
          <h2>Product Listed!</h2>
          <p>Redirecting to inventory…</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="seller" title="Add Product" subtitle="List a new item in your shop">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>

          {error && (
            <div className={styles.errorBanner}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Image upload */}
          <div className={styles.imageSection}>
            <div
              className={styles.imageDropzone}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleImageChange({ target: { files: [f] } }); }}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                  <button
                    type="button"
                    className={styles.removeImage}
                    onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); setImageBase64(''); }}
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Upload size={32} />
                  <p>Click or drag to upload product image</p>
                  <span>JPG, PNG, WEBP — max 10MB</span>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>

          {/* Two-column fields */}
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-name">Product Name *</label>
              <input id="p-name" type="text" className={styles.input} placeholder="e.g. Vintage Wooden Chair"
                value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-category">Category *</label>
              <select id="p-category" className={styles.input} value={category}
                onChange={e => setCategory(e.target.value)} required>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-price">Selling Price (₹) *</label>
              <input id="p-price" type="number" min="0" step="0.01" className={styles.input}
                placeholder="299" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-orig">Original Price (₹)</label>
              <input id="p-orig" type="number" min="0" step="0.01" className={styles.input}
                placeholder="599" value={origPrice} onChange={e => setOrigPrice(e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-qty">Quantity</label>
              <input id="p-qty" type="number" min="1" className={styles.input}
                value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="p-condition">Condition</label>
              <select id="p-condition" className={styles.input} value={condition} onChange={e => setCondition(e.target.value)}>
                {CONDITIONS.map(c => <option key={c} value={c}>{c.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="p-desc">Description</label>
            <textarea id="p-desc" className={`${styles.input} ${styles.textarea}`} rows={3}
              placeholder="Describe the item's condition, features, or story…"
              value={description} onChange={e => setDesc(e.target.value)} />
          </div>

          {/* Address + Location */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="p-address">Shop Address</label>
            <input id="p-address" type="text" className={styles.input}
              placeholder="123 Green Street, City" value={address} onChange={e => setAddress(e.target.value)} />
          </div>

          <div className={styles.locRow}>
            <button type="button" id="ap-detect-loc" className={styles.locBtn} onClick={detectLocation}
              disabled={locStatus === 'loading' || locStatus === 'done'}>
              {locStatus === 'loading' && <span className={styles.spinner} />}
              {locStatus === 'done'    && <CheckCircle size={15} style={{ color: 'rgb(var(--c-emerald))' }} />}
              {locStatus === 'idle'    && <MapPin size={15} />}
              {locStatus === 'denied'  && <AlertCircle size={15} style={{ color: 'rgb(226,87,76)' }} />}
              {locStatus === 'idle'    ? 'Pin my location'
               : locStatus === 'loading' ? 'Detecting…'
               : locStatus === 'done'    ? `${lat?.toFixed(4)}, ${lng?.toFixed(4)}`
               : 'Location denied'}
            </button>
            {lat && lng && <span className={styles.locHint}>✓ Products will appear on the nearby map</span>}
          </div>

          <button id="submit-product" type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <><span className={styles.spinner} /> Publishing…</> : <><Package size={16} /> Publish Product</>}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
