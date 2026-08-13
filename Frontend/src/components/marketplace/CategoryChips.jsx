import styles from './CategoryChips.module.css';
import { cn } from '../../lib/cn';
import { categories } from '../../data/products';

export default function CategoryChips({ active, onChange }) {
  return (
    <div className={styles.row}>
      {categories.map((c) => (
        <button
          key={c.id}
          className={cn(styles.chip, active === c.id && styles.chipActive)}
          onClick={() => onChange(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}