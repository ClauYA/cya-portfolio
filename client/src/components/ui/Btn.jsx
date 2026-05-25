import { useState } from 'react';

export default function Btn({ children, variant = 'solid', size = 'md', onClick, href, style: extra, fullWidth }) {
  const [hov, setHov] = useState(false);

  const sizes = {
    sm: { fontSize: '0.78rem', padding: '8px 18px' },
    md: { fontSize: '0.875rem', padding: '12px 26px' },
    lg: { fontSize: '1rem', padding: '15px 34px' },
  };

  const base_v = {
    solid:   { background: 'var(--ink)', color: 'var(--ink-inv)', boxShadow: 'var(--sh-md)' },
    accent:  { background: 'var(--accent)', color: '#fff', boxShadow: 'var(--sh-acc)' },
    sage:    { background: 'var(--sage)', color: '#fff', boxShadow: 'var(--sh-sage)' },
    outline: { background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--border-m)' },
    ghost:   { background: 'transparent', color: 'var(--ink-2)' },
  };

  const hover_v = {
    solid:   hov ? { background: 'var(--accent)', color: '#fff', boxShadow: 'var(--sh-acc)', transform: 'translateY(-2px)' } : {},
    accent:  hov ? { background: 'var(--accent-h)', transform: 'translateY(-2px)' } : {},
    sage:    hov ? { background: 'var(--sage-h)', transform: 'translateY(-2px)' } : {},
    outline: hov ? { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-s)', transform: 'translateY(-1px)' } : {},
    ghost:   hov ? { color: 'var(--ink)', background: 'var(--bg-inset)' } : {},
  };

  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 9999, fontFamily: 'var(--font-sans)',
    fontWeight: 600, cursor: 'pointer', border: 'none',
    textDecoration: 'none', transition: 'all 0.22s cubic-bezier(0,0,0.2,1)',
    width: fullWidth ? '100%' : undefined, whiteSpace: 'nowrap',
    ...sizes[size], ...base_v[variant], ...hover_v[variant], ...extra,
  };

  const props = {
    style,
    onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
  };

  return href
    ? <a href={href} {...props}>{children}</a>
    : <button {...props}>{children}</button>;
}