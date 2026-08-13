import styles from './Badge.module.css';
import { cn } from '../../lib/cn';

const dotKey = {
  safe: 'safeDot',
  warning: 'warningDot',
  urgent: 'urgentDot',
  critical: 'criticalDot',
  info: 'infoDot',
};

export default function Badge({ status = 'info', children, className }) {
  return (
    <span className={cn(styles.badge, styles[status], className)}>
      <span className={styles[dotKey[status]]} />
      {children}
    </span>
  );
}