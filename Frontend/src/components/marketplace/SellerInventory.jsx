import { useMemo, useState } from 'react';
import { Plus, MapPin, Image as ImageIcon } from 'lucide-react';
import styles from './SellerInventory.module.css';

const initialProducts = [
  {
    id: 's1',
    name: 'Coconut Oil 500ml',
    category: 'food',
    price: 220,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1604908556852-4e5f9d47458f?w=600&q=80',
    shop: 'GreenNest Market',
    distance: '1.2 km',
  },
  {
    id: 's2',
    name: 'Reusable Water Bottle',
    category: 'household',
    price: 399,
    originalPrice: 620,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    shop: 'GreenNest Market',
    distance: '1.2 km',
  },
];

export default function SellerInventory() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    name: '',
    category: 'food',
    price: '',
    originalPrice: '',
    image: '',
    shop: 'GreenNest Market',
  });

  const totalValue = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.price || 0), 0),
    [products]
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.price) return;

    setProducts((current) => [
      {
        id: `s${Date.now()}`,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice || form.price),
        image: form.image || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
        shop: form.shop,
        distance: 'Nearby',
      },
      ...current,
    ]);

    setForm({ name: '', category: 'food', price: '', originalPrice: '', image: '', shop: 'GreenNest Market' });
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.summaryCard}>
        <div>
          <p className={styles.label}>Inventory Value</p>
          <h3 className={styles.amount}>₹{totalValue}</h3>
        </div>
        <div className={styles.badge}>12 active listings</div>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.headerRow}>
          <h3>Add Product</h3>
          <button type="submit" className={styles.submitButton}>
            <Plus size={16} /> Add
          </button>
        </div>

        <div className={styles.grid}>
          <label>
            Product name
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Organic rice" />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="food">Food</option>
              <option value="personal-care">Personal Care</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="household">Household</option>
            </select>
          </label>
          <label>
            Price
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="299" />
          </label>
          <label>
            Original price
            <input type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="450" />
          </label>
          <label className={styles.fullWidth}>
            Product image URL
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </label>
        </div>
      </form>

      <div className={styles.listingWrap}>
        {products.map((product) => (
          <div key={product.id} className={styles.itemCard}>
            <img src={product.image} alt={product.name} />
            <div className={styles.itemInfo}>
              <h4>{product.name}</h4>
              <p>{product.category}</p>
              <span className={styles.price}>₹{product.price}</span>
              <div className={styles.locationRow}>
                <MapPin size={12} />
                {product.distance}
              </div>
            </div>
            <div className={styles.itemTag}><ImageIcon size={12} /> Listed</div>
          </div>
        ))}
      </div>
    </div>
  );
}
