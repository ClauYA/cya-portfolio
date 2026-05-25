export default function Tag({ children, variant = 'default', style: extra }) {
  const variants = {
    default: { background: 'var(--bg-inset)', color: 'var(--ink-3)', border: '1px solid var(--border)' },
    accent:  { background: 'var(--accent-s)', color: 'var(--accent)', border: '1px solid var(--accent-g)' },
    sage:    { background: 'var(--sage-s)',   color: 'var(--sage)',   border: '1px solid var(--sage-g)' },
    dark:    { background: 'var(--ink)',       color: 'var(--ink-inv)' },
    gold:    { background: 'var(--gold-s)',   color: 'var(--gold)',   border: '1px solid rgba(160,120,40,.2)' },
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 11px', borderRadius: 9999,
      fontSize: '0.72rem', fontWeight: 600,
      letterSpacing: '.04em', whiteSpace: 'nowrap',
      lineHeight: 1.5,
      ...variants[variant], ...extra,
    }}>
      {children}
    </span>
  );
}