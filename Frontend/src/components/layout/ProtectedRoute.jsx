import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'rgb(10,15,12)',
        color: 'rgb(62,207,142)', fontSize: '1rem', fontFamily: 'var(--font-body)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, border: '3px solid rgba(62,207,142,0.2)',
            borderTop: '3px solid rgb(62,207,142)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 12px'
          }} />
          Loading…
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to their own portal
    const roleMap = { CUSTOMER: '/customer', SELLER: '/seller', NGO: '/ngo', ADMIN: '/admin' };
    return <Navigate to={roleMap[user.role] || '/customer'} replace />;
  }

  return children;
}
