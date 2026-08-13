import styles from './Card.module.css';
import { cn } from '../../lib/cn';

export default function Card({ children, className, hover = true, veined = true, ...props }) {
  return (
    <div
      className={cn(
        styles.card,
        veined && styles.veined,
        hover && styles.hover,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}