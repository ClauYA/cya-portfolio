import { useState } from 'react';
/* Resume Button — distinct sage style with download icon */

export default function ResumeBtn({ size = 'md', style: extra }) {
  const [hov, setHov] = useState(false);
  const sizes = { sm: { fontSize: '0.78rem', padding: '8px 18px' }, md: { fontSize: '0.875rem', padding: '12px 26px' }, lg: { fontSize: '1rem', padding: '15px 34px' } };
  return (
    <a
      href="/Claudia-Bittner-PD.pdf"
      download="Claudia-Bittner.pdf"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        borderRadius: 9999, fontFamily: "'DM Sans', system-ui, sans-serif",
        fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
        letterSpacing: '.01em', transition: 'all 0.22s cubic-bezier(0,0,0.2,1)',
        background: hov ? 'var(--sage-h)' : 'var(--sage)',
        color: '#fff',
        boxShadow: hov ? '0 14px 42px rgba(107,138,115,.3)' : 'var(--sh-sage)',
        transform: hov ? 'translateY(-2px)' : 'none',
        ...sizes[size], ...extra,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v7M7 8l-2.5-2.5M7 8l2.5-2.5M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Download Resume
    </a>
  );
}
