import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Lock, User, MapPin, Store, ShoppingBag, Leaf,
  Eye, EyeOff, AlertCircle, CheckCircle, HeartHandshake, FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [role, setRole] = useState('CUSTOMER');
  const [shopName, setShopName] = useState('');
  const [sellerType, setSellerType] = useState('INDIVIDUAL');

  const [organizationName, setOrganizationName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [authorizedPersonName, setAuthorizedPersonName] = useState('');
  const [verificationDocument, setVerificationDocument] = useState(null);

  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locStatus, setLocStatus] = useState('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ngoPending, setNgoPending] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocStatus('denied');
      return;
    }

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

  function selectRole(nextRole) {
    setRole(nextRole);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    setError('');

    if (role === 'NGO') {
      if (!organizationName.trim() || !registrationNumber.trim() || !authorizedPersonName.trim()) {
        setError('Please complete the NGO verification details.');
        return;
      }
    }

    setLoading(true);

    try {
      const user = await register({
        name,
        email,
        password,
        role,
        shopName: role === 'SELLER' && shopName.trim() ? shopName.trim() : undefined,
        sellerType: role === 'SELLER' ? sellerType : undefined,
        organizationName: role === 'NGO' ? organizationName.trim() : undefined,
        registrationNumber: role === 'NGO' ? registrationNumber.trim() : undefined,
        authorizedPersonName: role === 'NGO' ? authorizedPersonName.trim() : undefined,
        verificationDocumentName:
          role === 'NGO' && verificationDocument ? verificationDocument.name : undefined,
        address,
        latitude: lat,
        longitude: lng,
      });

      if (user.role === 'NGO') {
        // NGO accounts are shown as pending until the backend verification workflow is added.
        setNgoPending(true);
        return;
      }

      const roleMap = {
        CUSTOMER: '/customer',
        SELLER: '/seller',
        NGO: '/ngo',
        ADMIN: '/admin',
      };

      navigate(roleMap[user.role] || '/customer', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  if (ngoPending) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />

        <div className={styles.card} style={{ maxWidth: 560, textAlign: 'center' }}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><Leaf size={22} /></div>
            <span className={styles.logoText}>CircleMarket</span>
          </div>

          <div
            style={{
              width: 72,
              height: 72,
              margin: '28px auto 20px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(62, 207, 142, 0.12)',
              border: '1px solid rgba(62, 207, 142, 0.35)',
              color: 'rgb(62, 207, 142)',
            }}
          >
            <FileCheck size={34} />
          </div>

          <h1 className={styles.heading}>Verification pending</h1>
          <p className={styles.subheading}>
            Your NGO application has been submitted successfully.
            Our admin team will review your organization details before you can access NGO features.
          </p>

          <div
            style={{
              margin: '24px 0',
              padding: '16px 18px',
              borderRadius: 14,
              textAlign: 'left',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <strong style={{ display: 'block', marginBottom: 6 }}>What happens next?</strong>
            <span style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
              An administrator will verify your registration details. Once approved, your NGO
              account can receive and redistribute donations.
            </span>
          </div>

          <Link
            to="/login"
            className={styles.submitBtn}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            Continue to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.card} style={{ maxWidth: step === 2 ? 900 : 460 }}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Leaf size={22} /></div>
          <span className={styles.logoText}>CircleMarket</span>
        </div>

        <div className={styles.steps}>
          <div className={`${styles.stepDot} ${step >= 1 ? styles.stepActive : ''}`}>1</div>
          <div className={styles.stepLine} />
          <div className={`${styles.stepDot} ${step >= 2 ? styles.stepActive : ''}`}>2</div>
        </div>

        <h1 className={styles.heading}>
          {step === 1 ? 'Create account' : 'Choose your CircleMarket role'}
        </h1>
        <p className={styles.subheading}>
          {step === 1
            ? 'Join the circular economy movement'
            : 'Choose how you want to participate in the circular economy'}
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
              <div className={styles.field}>
                <label className={styles.label}>I want to…</label>

                <div
                  className={styles.roleGrid}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 14,
                  }}
                >
                  <button
                    type="button"
                    id="role-customer"
                    className={`${styles.roleCard} ${role === 'CUSTOMER' ? styles.roleSelected : ''}`}
                    onClick={() => selectRole('CUSTOMER')}
                  >
                    <ShoppingBag size={30} />
                    <strong>Customer</strong>
                    <span>Discover affordable rescued products.</span>
                  </button>

                  <button
                    type="button"
                    id="role-seller"
                    className={`${styles.roleCard} ${role === 'SELLER' ? styles.roleSelected : ''}`}
                    onClick={() => selectRole('SELLER')}
                  >
                    <Store size={30} />
                    <strong>Seller</strong>
                    <span>Sell products you no longer need or excess inventory.</span>
                  </button>

                  <button
                    type="button"
                    id="role-ngo"
                    className={`${styles.roleCard} ${role === 'NGO' ? styles.roleSelected : ''}`}
                    onClick={() => selectRole('NGO')}
                  >
                    <HeartHandshake size={30} />
                    <strong>NGO</strong>
                    <span>Receive and redistribute donated products.</span>
                  </button>
                </div>
              </div>

              {role === 'SELLER' && (
                <div className={styles.field}>
                  <label className={styles.label}>Seller type</label>

                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    {[
                      ['INDIVIDUAL', 'Individual Seller'],
                      ['BUSINESS', 'Business Seller'],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSellerType(value)}
                        style={{
                          flex: 1,
                          padding: '12px 14px',
                          borderRadius: 12,
                          border: sellerType === value
                            ? '1px solid rgb(62, 207, 142)'
                            : '1px solid rgba(255,255,255,0.08)',
                          background: sellerType === value
                            ? 'rgba(62, 207, 142, 0.10)'
                            : 'rgba(255,255,255,0.02)',
                          color: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <label className={styles.label} htmlFor="shop-name">
                    Shop / Business name <span style={{ opacity: 0.5 }}>(optional)</span>
                  </label>

                  <div className={styles.inputWrap}>
                    <Store size={16} className={styles.inputIcon} />
                    <input
                      id="shop-name"
                      type="text"
                      className={styles.input}
                      placeholder="Leave blank if you are an individual seller"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {role === 'NGO' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: 14,
                    padding: 18,
                    borderRadius: 16,
                    border: '1px solid rgba(62, 207, 142, 0.18)',
                    background: 'rgba(62, 207, 142, 0.035)',
                  }}
                >
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>NGO verification</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
                      These details will be reviewed by an administrator before NGO features are enabled.
                    </div>
                  </div>

                  {[
                    ['ngo-organization', 'Organization name', organizationName, setOrganizationName, 'Green Hope Foundation'],
                    ['ngo-registration', 'Registration number', registrationNumber, setRegistrationNumber, 'NGO / Trust registration number'],
                    ['ngo-authorized-person', 'Authorized person name', authorizedPersonName, setAuthorizedPersonName, 'Authorized representative'],
                  ].map(([id, label, value, setter, placeholder]) => (
                    <div className={styles.field} key={id} style={{ margin: 0 }}>
                      <label className={styles.label} htmlFor={id}>{label}</label>
                      <div className={styles.inputWrap}>
                        <User size={16} className={styles.inputIcon} />
                        <input
                          id={id}
                          type="text"
                          className={styles.input}
                          placeholder={placeholder}
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  <div className={styles.field} style={{ margin: 0 }}>
                    <label className={styles.label} htmlFor="ngo-document">
                      Registration certificate <span style={{ opacity: 0.5 }}>(PDF/Image)</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <FileCheck size={16} className={styles.inputIcon} />
                      <input
                        id="ngo-document"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className={styles.input}
                        onChange={(e) => setVerificationDocument(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label} htmlFor="signup-address">
                  {role === 'NGO' ? 'Organization address' : 'Address (optional)'}
                </label>
                <div className={styles.inputWrap}>
                  <MapPin size={16} className={styles.inputIcon} />
                  <input
                    id="signup-address"
                    type="text"
                    className={styles.input}
                    placeholder={role === 'NGO' ? 'Organization address' : '123 Main Street, City'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={role === 'NGO'}
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
                {locStatus === 'done' && <CheckCircle size={15} style={{ color: 'rgb(62,207,142)' }} />}
                {locStatus === 'denied' && <AlertCircle size={15} style={{ color: 'rgb(226,87,76)' }} />}
                {locStatus === 'idle' && <MapPin size={15} />}
                {locStatus === 'idle' ? 'Use my location' :
                  locStatus === 'loading' ? 'Detecting…' :
                    locStatus === 'done' ? `Location captured (${lat?.toFixed(3)}, ${lng?.toFixed(3)})` :
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
              step === 1 ? 'Continue →' :
                role === 'NGO' ? 'Submit for Verification' : 'Create Account'}
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