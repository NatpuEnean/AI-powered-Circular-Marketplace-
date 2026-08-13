import styles from './Button.module.css';
import { cn } from '../../lib/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={cn(styles.btn, styles[variant], styles[size], className)}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}