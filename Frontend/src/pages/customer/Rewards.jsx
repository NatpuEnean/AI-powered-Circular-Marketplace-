import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './CustomerPages.module.css';
import { Trophy, Star, Gift, Zap, Lock } from 'lucide-react';

const POINTS = 1240;
const NEXT_TIER = 2000;
const TIER = POINTS >= 2000 ? 'Gold' : POINTS >= 500 ? 'Silver' : 'Bronze';
const TIER_COLORS = { Bronze: 'var(--c-harvest)', Silver: '180,180,180', Gold: '255,200,60' };

const REWARDS = [
  { id: 1, title: '₹50 Off Coupon', points: 500, icon: Gift, unlocked: true },
  { id: 2, title: 'Free Delivery',  points: 800, icon: Zap,  unlocked: true },
  { id: 3, title: '₹200 Off Coupon', points: 1500, icon: Gift, unlocked: false },
  { id: 4, title: 'Premium Badge',  points: 2000, icon: Star, unlocked: false },
];

const HISTORY = [
  { action: 'Purchased Vintage Chair',  pts: +50,  date: '2026-08-10' },
  { action: 'Left a Review',           pts: +20,  date: '2026-08-08' },
  { action: 'Redeemed ₹50 Coupon',     pts: -500, date: '2026-08-05' },
  { action: 'First Purchase Bonus',    pts: +200, date: '2026-08-01' },
  { action: 'Referred a Friend',       pts: +150, date: '2026-07-28' },
];

export default function Rewards() {
  const pct = Math.min((POINTS / NEXT_TIER) * 100, 100);
  return (
    <DashboardLayout role="customer" title="Rewards" subtitle="Eco points & exclusive perks">
      {/* Points hero */}
      <div className={styles.rewardHero}>
        <div className={styles.rewardPoints}>
          <Trophy size={32} style={{ color: `rgb(${TIER_COLORS[TIER]})` }} />
          <div>
            <p className={styles.rewardPtsNum}>{POINTS.toLocaleString()} pts</p>
            <p className={styles.rewardTier} style={{ color: `rgb(${TIER_COLORS[TIER]})` }}>{TIER} Member</p>
          </div>
        </div>
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <p className={styles.progressLabel}>{NEXT_TIER - POINTS} pts to next tier ({POINTS}/{NEXT_TIER})</p>
        </div>
      </div>

      {/* Rewards grid */}
      <h2 className={styles.sectionTitle}><Gift size={16} /> Redeem Rewards</h2>
      <div className={styles.rewardsGrid}>
        {REWARDS.map(r => {
          const Icon = r.icon;
          return (
            <div key={r.id} className={`${styles.rewardCard} ${!r.unlocked ? styles.rewardLocked : ''}`}>
              <div className={styles.rewardCardIcon}><Icon size={24} /></div>
              <p className={styles.rewardCardTitle}>{r.title}</p>
              <p className={styles.rewardCardPts}>{r.points.toLocaleString()} pts</p>
              {r.unlocked
                ? <button className={styles.redeemBtn}>Redeem</button>
                : <div className={styles.lockRow}><Lock size={12} /> {r.points - POINTS} pts needed</div>}
            </div>
          );
        })}
      </div>

      {/* History */}
      <h2 className={styles.sectionTitle} style={{marginTop:24}}><Zap size={16} /> Points History</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Activity</th><th>Date</th><th>Points</th></tr></thead>
          <tbody>
            {HISTORY.map((h, i) => (
              <tr key={i}>
                <td>{h.action}</td>
                <td className={styles.muted}>{h.date}</td>
                <td className={h.pts > 0 ? styles.positive : styles.negative}>
                  {h.pts > 0 ? '+' : ''}{h.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
