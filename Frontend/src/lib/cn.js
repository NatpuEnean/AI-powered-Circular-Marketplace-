// Minimal classnames merge helper — no external deps.
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(' ');
}