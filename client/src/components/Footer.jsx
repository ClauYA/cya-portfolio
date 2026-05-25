import { useContext } from 'react';
import { AppCtx } from '../context/AppContext';

export default function Footer() {
  const { setPage } = useContext(AppCtx);
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)', padding: '28px 0' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>© 2026 Claudia Bittner · CYA Studio</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['home','projects','about','services','contact'].map(p => (
            <a key={p} href="#"
              onClick={e => { e.preventDefault(); setPage(p); }}
              style={{ fontSize: '0.75rem', color: 'var(--ink-3)', textTransform: 'capitalize', transition: 'color .15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--ink-3)'}>
              {p}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}