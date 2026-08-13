import { NavLink, useNavigate } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';
import { navByRole, roleLabels } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';
import { cn } from '../../lib/cn';

export default function Sidebar({ role, open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Map auth role to nav role key
  const navRole = role || (user?.role?.toLowerCase());
  const items = navByRole[navRole] ?? [];

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={cn(styles.aside, open && styles.open)}>
        <div className={styles.brand}>
          <div className={styles.logoBox}>
            <Leaf size={18} color="rgb(62,207,142)" strokeWidth={2.5} />
          </div>
          <div>
            <p className={styles.brandName}>CircleMarket</p>
            <p className={styles.brandRole}>{roleLabels[navRole] ?? 'Portal'}</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === `/${navRole}`}
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

        {/* User profile + logout */}
        <div className={styles.bottomNav}>
          {user && (
            <div className={styles.userCard}>
              <div className={styles.userAvatar}>{initials}</div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
          )}
          <button id="sidebar-logout" className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}