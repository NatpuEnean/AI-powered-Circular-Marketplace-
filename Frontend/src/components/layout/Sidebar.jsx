import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { navByRole, bottomNav, roleLabels } from '../../data/navigation';
import styles from './Sidebar.module.css';
import { cn } from '../../lib/cn';

export default function Sidebar({ role, open, onClose }) {
  const items = navByRole[role] ?? [];

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={cn(styles.aside, open && styles.open)}>
        <div className={styles.brand}>
          <div className={styles.logoBox}>
            <Leaf size={18} color="rgb(62,207,142)" strokeWidth={2.5} />
          </div>
          <div>
            <p className={styles.brandName}>Circular</p>
            <p className={styles.brandRole}>{roleLabels[role]} Portal</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === `/${role}`}
              onClick={onClose}
              className={({ isActive }) =>
                cn(styles.navItem, isActive && styles.navItemActive)
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.bottomNav}>
          {bottomNav.map(({ label, icon: Icon }) => (
            <button key={label} className={styles.bottomButton}>
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}