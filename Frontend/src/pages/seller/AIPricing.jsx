import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SellerPages.module.css';
import { BarChart3, TrendingDown, TrendingUp, Zap } from 'lucide-react';

const SUGGESTIONS = [
  { product: 'Vintage Wooden Chair', current: 299, suggested: 349, reason: '↑ High demand in your area this week', trend: 'up' },
  { product: 'Organic Jute Basket',  current: 149, suggested: 99,  reason: '↓ 3 similar items listed nearby cheaper', trend: 'down' },
  { product: 'Table Lamp (Bamboo)', current: 199, suggested: 229, reason: '↑ Only 1 other listing within 5 km', trend: 'up' },
  { product: 'Glass Vase Set',      current: 450, suggested: 390, reason: '↓ Older listing — reduce to sell faster', trend: 'down' },
];

const MARKET = [
  { category: 'Electronics', avgPrice: 4200, yourAvg: 3800, gap: -400 },
  { category: 'Furniture',   avgPrice: 1800, yourAvg: 2100, gap: +300 },
  { category: 'Clothing',    avgPrice: 550,  yourAvg: 499,  gap: -51  },
];

export default function AIPricing() {
  return (
    <DashboardLayout role="seller" title="AI Pricing" subtitle="Smart price suggestions based on local market data">
      <div className={styles.infoCard}>
        <Zap size={18} style={{color:'rgb(var(--c-harvest))'}} />
        <p>AI analyses nearby listings, demand signals, and expiry dates to suggest optimal prices for your products.</p>
      </div>

      <h2 className={styles.sectionTitle}><BarChart3 size={16} /> Price Suggestions</h2>
      <div className={styles.pricingList}>
        {SUGGESTIONS.map((s, i) => (
          <div key={i} className={styles.pricingRow}>
            <div className={styles.pricingInfo}>
              <p className={styles.pricingName}>{s.product}</p>
              <p className={styles.pricingReason}>{s.reason}</p>
            </div>
            <div className={styles.pricingPrices}>
              <span className={styles.currentPrice}>₹{s.current}</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.suggestedPrice} style={{color: s.trend==='up' ? 'rgb(var(--c-emerald))' : 'rgb(var(--c-harvest))'}}>
                {s.trend === 'up' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                ₹{s.suggested}
              </span>
            </div>
            <button className={styles.applyBtn}>Apply</button>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle} style={{marginTop:24}}><BarChart3 size={16} /> Market Comparison</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Category</th><th>Market Avg</th><th>Your Avg</th><th>Difference</th></tr></thead>
          <tbody>
            {MARKET.map((m, i) => (
              <tr key={i}>
                <td>{m.category}</td>
                <td className={styles.price}>₹{m.avgPrice}</td>
                <td className={styles.price}>₹{m.yourAvg}</td>
                <td style={{color: m.gap > 0 ? 'rgb(var(--c-harvest))' : 'rgb(var(--c-emerald))', fontWeight:700, fontFamily:'var(--font-mono)'}}>
                  {m.gap > 0 ? `+₹${m.gap} above market` : `₹${Math.abs(m.gap)} below market`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
