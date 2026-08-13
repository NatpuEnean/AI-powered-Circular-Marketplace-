import { Search, Bell, Menu } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ title, subtitle, onMenuClick }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className={styles.titleWrap}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.searchBox}>
        <Search size={16} color="rgb(143,163,152)" />
        <input placeholder="Search products..." className={styles.searchInput} />
      </div>

      <button className={styles.bellButton} aria-label="Notifications">
        <Bell size={20} />
        <span className={styles.bellDot} />
      </button>

      <div className={styles.avatar}>C</div>
    </header>
  );
}