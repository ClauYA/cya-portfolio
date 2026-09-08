import { useContext, useState } from 'react';
import { AppCtx }   from '../context/AppContext';
import useScroll    from '../hooks/useScroll';
import Btn          from './ui/Btn';
import ResumeBtn    from './ui/ResumeBtn';

export default function Nav() {
  const { page, setPage, theme, lang, setLang } = useContext(AppCtx);
  const scrollY = useScroll();
  const [drawer, setDrawer] = useState(false);
  const stuck = scrollY > 20;

  const L = lang === 'es'
    ? { home: 'Inicio', projects: 'Proyectos', about: 'Sobre mí', services: 'Servicios', contact: 'Contacto', talk: 'Hablemos →' }
    : { home: 'Home', projects: 'Projects', about: 'About', services: 'Services', contact: 'Contact', talk: "Let's Talk →" };

  const links = [
    { id: 'home',     label: L.home     },
    { id: 'projects', label: L.projects },
    { id: 'about',    label: L.about    },
  //  { id: 'services', label: L.services },
    { id: 'contact',  label: L.contact  },
  ];

  const navLink = (id, label, mobile) => {
    const active = page === id;
    return (
      <a key={id} href="#"
        onClick={e => { e.preventDefault(); setPage(id); if (mobile) setDrawer(false); }}
        style={{
          display: 'block',
          padding: mobile ? '16px 0' : '7px 13px',
          borderRadius: mobile ? 0 : 6,
          fontSize: mobile ? 'clamp(1.5rem,4vw,2rem)' : '0.875rem',
          fontFamily: mobile ? 'var(--font-serif)' : undefined,
          fontWeight: mobile ? 400 : 500,
          color: active ? 'var(--accent)' : 'var(--ink-2)',
          background: !mobile && active ? 'var(--accent-s)' : 'transparent',
          borderBottom: mobile ? '1px solid var(--border)' : undefined,
          transition: 'color .15s, background .15s',
        }}
        onMouseEnter={e => { if (!active) { e.target.style.color = 'var(--ink)'; if (!mobile) e.target.style.background = 'var(--bg-inset)'; } }}
        onMouseLeave={e => { if (!active) { e.target.style.color = 'var(--ink-2)'; e.target.style.background = active ? 'var(--accent-s)' : 'transparent'; } }}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 68,
        display: 'flex', alignItems: 'center',
        background: stuck ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: stuck ? 'blur(22px) saturate(1.5)' : 'none',
        WebkitBackdropFilter: stuck ? 'blur(22px) saturate(1.5)' : 'none',
        borderBottom: stuck ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: stuck ? 'var(--sh-sm)' : 'none',
        transition: 'all .4s ease',
      }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          
          {/* Logo */}
          <div style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setPage('home')}>
            <img
              src={theme === 'dark' ? '/cya-logo-white.png' : '/cya-logo-dark.png'}
              alt="CYA Logo"
              style={{
                height: 40, width: 'auto', objectFit: 'contain',
                transition: 'transform .22s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            />
          </div>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => navLink(l.id, l.label, false))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setLang(l => l === 'en' ? 'es' : 'en')}
              title={lang === 'en' ? 'Ver en español' : 'View in English'}
              aria-label={lang === 'en' ? 'Ver en español' : 'View in English'}
              style={{ height: 36, padding: '0 12px', borderRadius: 18, background: 'var(--bg-inset)', border: '1px solid var(--border)', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'all .2s', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '.05em' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-muted)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-inset)'; e.currentTarget.style.color = 'var(--ink-2)'; }}>
             {lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </button>
            <Btn variant="accent" size="sm" className="nav-cta-btn" onClick={() => setPage('contact')}>{L.talk}</Btn>
            <button
              className="nav-burger"
              style={{ display: 'none', width: 36, height: 36, borderRadius: 8, background: 'var(--bg-inset)', border: '1px solid var(--border)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}
              onClick={() => setDrawer(d => !d)}>
              <span style={{ width: 17, height: 1.5, background: 'var(--ink)', borderRadius: 2, display: 'block', transition: 'all .2s', transform: drawer ? 'rotate(45deg) translate(4.5px,4.5px)' : 'none' }} />
              <span style={{ width: 17, height: 1.5, background: 'var(--ink)', borderRadius: 2, display: 'block', transition: 'all .2s', opacity: drawer ? 0 : 1 }} />
              <span style={{ width: 17, height: 1.5, background: 'var(--ink)', borderRadius: 2, display: 'block', transition: 'all .2s', transform: drawer ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, zIndex: 99,
        background: 'var(--bg)', padding: '32px clamp(24px,5vw,48px)',
        transform: drawer ? 'none' : 'translateX(100%)', opacity: drawer ? 1 : 0,
        pointerEvents: drawer ? 'all' : 'none', transition: 'all .35s ease',
        display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto',
      }}>
        {links.map(l => navLink(l.id, l.label, true))}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn variant="accent" onClick={() => { setPage('contact'); setDrawer(false); }} fullWidth>{L.talk}</Btn>
          <ResumeBtn size="md" style={{ justifyContent: 'center', width: '100%' }} />
        </div>
      </div>
    </>
  );
}