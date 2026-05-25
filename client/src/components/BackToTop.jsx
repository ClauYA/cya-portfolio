import { useState } from 'react';
import useScroll from '../hooks/useScroll';

export default function BackToTop() {
  const scrollY = useScroll();
  const [hov, setHov] = useState(false);
  const show = scrollY > 480;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 50,
        width: 44, height: 44, borderRadius: '50%',
        background: hov ? 'var(--accent)' : 'var(--ink)',
        color: 'var(--ink-inv)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.9rem',
        boxShadow: hov ? 'var(--sh-acc)' : 'var(--sh-lg)',
        cursor: 'pointer', border: 'none',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'all' : 'none',
        transform: show ? (hov ? 'translateY(-3px)' : 'none') : 'translateY(12px)',
        transition: 'all .22s cubic-bezier(0,0,0.2,1)',
      }}>
      ↑
    </button>
  );
}