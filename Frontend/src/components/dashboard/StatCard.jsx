import { useEffect, useRef, useState } from 'react';
import Card from '../ui/Card';
import styles from './StatCard.module.css';

function useCountUp(target, durationMs = 900) {
  const [value, setValue] = useState(0);
  const frame = useRef();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, durationMs]);

  return value;
}

export default function StatCard({ icon: Icon, label, value, prefix = '', suffix = '', decimals = 0, accent = 'emerald' }) {
  const animated = useCountUp(value);

  return (
    <Card className="" hover veined>
      <div style={{ padding: '1.25rem' }}>
        <div className={styles.iconRow}>
          <div className={`${styles.iconBox} ${styles[accent]}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
        </div>
        <p className={styles.value}>
          {prefix}
          {animated.toFixed(decimals)}
          {suffix}
        </p>
        <p className={styles.label}>{label}</p>
      </div>
    </Card>
  );
}