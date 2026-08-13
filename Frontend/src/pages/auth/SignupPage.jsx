import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Store, ShoppingBag, Leaf, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

export default function SignupPage() {
  const [step, setStep]         = useState(1); // 1 = details, 2 = role + location
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [role, setRole]         = useState('CUSTOMER');
  const [shopName, setShopName] = useState('');
  const [address, setAddress]   = useState('');
  const [lat, setLat]           = useState(null);
  const [lng, setLng]           = useState(null);
  const [locStatus, setLocStatus] = useState('idle'); // idle | loading | done | denied
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

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
    if (step === 1) { setStep(2); return; }
    setError('');
    setLoading(true);
    try {
      const user = await register({
        name, email, password, role,
        shopName: role === 'SELLER' ? shopName : undefined,
        address,
        latitude: lat,
        longitude: lng,
      });
      const roleMap = { CUSTOMER: '/customer', SELLER: '/seller', NGO: '/ngo', ADMIN: '/admin' };
      navigate(roleMap[user.role] || '/customer', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.card} style={{ maxWidth: 460 }}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Leaf size={22} /></div>
          <span className={styles.logoText}>CircleMarket</span>
        </div>

        {/* Step indicator */}
        <div className={styles.steps}>
          <div className={`${styles.stepDot} ${step >= 1 ? styles.stepActive : ''}`}>1</div>
          <div className={styles.stepLine} />
          <div className={`${styles.stepDot} ${step >= 2 ? styles.stepActive : ''}`}>2</div>
        </div>

        <h1 className={styles.heading}>{step === 1 ? 'Create account' : 'Your role & location'}</h1>
        <p className={styles.subheading}>
          {step === 1 ? 'Join the circular economy movement' : 'Help us show you the right content'}
        </p>

        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="signup-name">Full name</label>
                <div className={styles.inputWrap}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    id="signup-name"
                    type="text"
                    className={styles.input}
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="signup-email">Email address</label>
                <div className={styles.inputWrap}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    id="signup-email"
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="signup-password">Password</label>
                <div className={styles.inputWrap}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    id="signup-password"
                    type={showPw ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPw((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Role selector */}
              <div className={styles.field}>
                <label className={styles.label}>I want to…</label>
                <div className={styles.roleGrid}>
                  <button
                    type="button"
                    id="role-customer"
                    className={`${styles.roleCard} ${role === 'CUSTOMER' ? styles.roleSelected : ''}`}
                    onClick={() => setRole('CUSTOMER')}
                  >
                    <ShoppingBag size={28} />
                    <strong>Buy & Discover</strong>
                    <span>Browse nearby rescued products</span>
                  </button>
                  <button
                    type="button"
                    id="role-seller"
                    className={`${styles.roleCard} ${role === 'SELLER' ? styles.roleSelected : ''}`}
                    onClick={() => setRole('SELLER')}
                  >
                    <Store size={28} />
                    <strong>Sell Products</strong>
                    <span>List items from my shop</span>
                  </button>
                </div>
              </div>

              {role === 'SELLER' && (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="shop-name">Shop name</label>
                  <div className={styles.inputWrap}>
                    <Store size={16} className={styles.inputIcon} />
                    <input
                      id="shop-name"
                      type="text"
                      className={styles.input}
                      placeholder="Green Garden Store"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      required={role === 'SELLER'}
                    />
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label} htmlFor="signup-address">Address (optional)</label>
                <div className={styles.inputWrap}>
                  <MapPin size={16} className={styles.inputIcon} />
                  <input
                    id="signup-address"
                    type="text"
                    className={styles.input}
                    placeholder="123 Main Street, City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                id="detect-location"
                className={styles.locBtn}
                onClick={detectLocation}
                disabled={locStatus === 'loading' || locStatus === 'done'}
              >
                {locStatus === 'loading' && <span className={styles.spinnerSmall} />}
                {locStatus === 'done'    && <CheckCircle size={15} style={{ color: 'rgb(62,207,142)' }} />}
                {locStatus === 'denied'  && <AlertCircle size={15} style={{ color: 'rgb(226,87,76)' }} />}
                {locStatus === 'idle'    && <MapPin size={15} />}
                {locStatus === 'idle'    ? 'Use my location'  :
                 locStatus === 'loading' ? 'Detecting…'       :
                 locStatus === 'done'    ? `Location captured (${lat?.toFixed(3)}, ${lng?.toFixed(3)})` :
                                          'Location denied — enter address manually'}
              </button>
            </>
          )}

          <button
            id="signup-submit"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> :
             step === 1 ? 'Continue →' : 'Create Account'}
          </button>

          {step === 2 && (
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
          )}
        </form>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
