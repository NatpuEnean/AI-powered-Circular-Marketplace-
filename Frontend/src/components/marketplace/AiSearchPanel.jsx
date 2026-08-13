import { useRef, useState } from 'react';
import { Search, Upload, Sparkles } from 'lucide-react';
import styles from './AiSearchPanel.module.css';

const similarItems = [
  {
    id: 'a1',
    name: 'Organic Cotton Tote',
    match: '92%',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80',
  },
  {
    id: 'a2',
    name: 'Reusable Bottle',
    match: '89%',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
  },
  {
    id: 'a3',
    name: 'Natural Soap Set',
    match: '84%',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
  },
];

export default function AiSearchPanel() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [query, setQuery] = useState('');

  function onFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result || ''));
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>AI discovery</p>
          <h3>Find similar products</h3>
        </div>
        <Sparkles size={18} className={styles.sparkle} />
      </div>

      <div className={styles.searchRow}>
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Describe a product or upload a photo"
        />
      </div>

      <button className={styles.uploadButton} type="button" onClick={() => fileInputRef.current?.click()}>
        <Upload size={16} />
        Upload product photo
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFileSelected} />

      {preview ? (
        <div className={styles.previewBox}>
          <img src={preview} alt="Upload preview" />
        </div>
      ) : null}

      <div className={styles.resultsLabel}>Similar products near you</div>
      <div className={styles.resultList}>
        {similarItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.name} />
            <div>
              <strong>{item.name}</strong>
              <span>{item.match} match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
