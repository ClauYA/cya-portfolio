import { useContext,useState,useEffect } from 'react';
import { AppCtx }    from '../../context/AppContext';
import useReadingProgress from '../../hooks/useReadingProgress';

import Eyebrow   from '../../components/ui/Eyebrow';
import Btn       from '../../components/ui/Btn';
import Tag       from '../../components/ui/Tag';
import Reveal    from '../../components/ui/Reveal';
import Container from '../../components/ui/Container';
import Footer    from '../../components/Footer';
import imgUserFlow         from '../../assets/case-studies/mining/user-flow.png';
import imgUseCaseGen       from '../../assets/case-studies/mining/caso-de-uso-general.png';
import imgUseCaseRoy       from '../../assets/case-studies/mining/caso-de-uso.png';
import imgRevisionLegal    from '../../assets/case-studies/mining/revision-legal.png';
import imgRevisionUsers    from '../../assets/case-studies/mining/revision-usuarios.png';
import imgRevisionUsersEnd from '../../assets/case-studies/mining/revision-usuarios-last.png';
import imgDesignSystem     from '../../assets/case-studies/mining/design-system.png';
import imgFormularios      from '../../assets/case-studies/mining/formularios.png';
import imgPaperDocs        from '../../assets/case-studies/mining/paperdocuments.jpg';

// 🔗 PROTOTIPOS INTERACTIVOS — un pedacito por cada parte del proyecto
// Para cada pieza pega su link de prototipo de Figma en `url`.
//   Cómo sacar el link de UNA parte: en Figma abre esa pantalla/flujo → Present ▶ →
//   Share prototype → Copy link. Cada flujo tiene su propio link (arranca donde tú elijas).
// Deja `url: ''` en las piezas que aún no tengas: esas simplemente no se muestran.
// Puedes agregar o quitar piezas de esta lista libremente.
// 🔗 Prototipo interactivo mostrado en la sección OVERVIEW (embebido).
//    Pega aquí el link del prototipo de Figma (Present ▶ → Share prototype → Copy link).
const OVERVIEW_PROTO_URL = 'https://www.figma.com/proto/XZp58Kv8iUd2OeP9o8HxGV/Dashboard-Oruro-II?node-id=113-115645&viewport=1380%2C-99%2C0.1&t=cDyN9PqR1d38NmpU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=113%3A115645&show-proto-sidebar=1&page-id=0%3A4';

const PROTOS = [
  { title: 'Legal review & approval',  desc: 'The legal team reviews, observes, or approves each submission.', url: '' },
  { title: 'Admin dashboard',          desc: 'Role-based portal with real-time tracking and data tables.',     url: '' },
];

// Tokens de color del producto (plataforma GADOR)
const DS_COLORS = [
  ['Primary', '#6E2A33'],
  ['Dark',    '#4E1C24'],
  ['Success', '#2E7D4F'],
  ['Ink',     '#1F1F1F'],
  ['Surface', '#EDEFF6'],
];

// Convierte un link normal de prototipo/diseño de Figma al formato de embed recomendado
// (embed.figma.com), que carga mejor y no parpadea. Acepta links que ya vengan en ese formato.
function figmaEmbedSrc(url) {
  let u = url.replace('://www.figma.com', '://embed.figma.com').replace('://figma.com', '://embed.figma.com');
  if (!/embed-host=/.test(u)) u += (u.includes('?') ? '&' : '?') + 'embed-host=share';
  // Oculta el panel lateral "Flows" que Figma muestra al cargar el prototipo.
  u = u.replace(/([?&])show-proto-sidebar=1/g, '$1show-proto-sidebar=0');
  if (!/show-proto-sidebar=/.test(u)) u += '&show-proto-sidebar=0';
  // Oculta la barra superior de Figma ("Dashboard Oruro II · Edited…") para un embed más limpio.
  if (!/hide-ui=/.test(u)) u += '&hide-ui=1';
  return u;
}

// Sección del caso. Definida a NIVEL DE MÓDULO (no dentro del componente) a propósito:
// así React no la re-monta en cada render y el iframe del prototipo no se recarga.
function CsSection({ eyebrow, children, sage }) {
  return (
    <section style={{ padding: 'clamp(48px,6vw,80px) 0', borderBottom: '1px solid var(--border)' }}>
      <Container>
        <Reveal><Eyebrow sage={sage}>{eyebrow}</Eyebrow></Reveal>
        {children}
      </Container>
    </section>
  );
}

// Carrusel de diagramas: rota entre imágenes con flechas o puntos. Nivel de módulo
// para conservar su estado (índice) entre renders del caso de estudio.
function DiagramCarousel({ items, onExpand, maxWidth = 760, height = 360 }) {
  const [idx, setIdx] = useState(0);
  const go = (d) => setIdx(i => (i + d + items.length) % items.length);
  const [src, alt] = items[idx];
  const arrow = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 40, height: 40, borderRadius: '50%',
    background: 'var(--bg-glass)', backdropFilter: 'blur(8px)',
    border: '1px solid var(--border)', color: 'var(--ink)',
    fontSize: '1.4rem', lineHeight: 1, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'var(--sh-sm)', zIndex: 2, transition: 'all .2s',
  };
  return (
    <div style={{ maxWidth, marginInline: 'auto' }}>
      <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)' }}>
        <img key={src} src={src} alt={alt}
          onClick={() => onExpand({ src, alt })}
          style={{ width: '100%', height, objectFit: 'contain', objectPosition: 'center', display: 'block', cursor: 'zoom-in', animation: 'fade-in .35s ease', padding: 12, boxSizing: 'border-box' }} />
        {items.length > 1 && (
          <>
            <button type="button" aria-label="Anterior" onClick={() => go(-1)}
              style={{ ...arrow, left: 12 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--ink)'; }}>‹</button>
            <button type="button" aria-label="Siguiente" onClick={() => go(1)}
              style={{ ...arrow, right: 12 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--ink)'; }}>›</button>
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--ink-2)', fontWeight: 500 }}>{alt} <span style={{ color: 'var(--ink-3)' }}>· {idx + 1}/{items.length}</span></div>
        <div style={{ display: 'flex', gap: 7 }}>
          {items.map(([, a], i) => (
            <button key={a} type="button" aria-label={a} onClick={() => setIdx(i)}
              style={{ width: 9, height: 9, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer', background: i === idx ? 'var(--accent)' : 'var(--border-m)', transition: 'background .2s, transform .2s', transform: i === idx ? 'scale(1.15)' : 'none' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MiningCaseStudy() {
  const [lightbox, setLightbox] = useState(null);
  const [protoFull, setProtoFull] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  const { setPage } = useContext(AppCtx);
  const readingPct  = useReadingProgress();

  // Galería de imágenes reutilizable (abre lightbox)
  const Gallery = ({ items, height = 140 }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 10 }}>
      {items.map(([src, alt]) => (
        <div key={alt} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
          onClick={() => setLightbox({ src, alt })}>
          <img src={src} alt={alt}
            style={{ width: '100%', height, objectFit: 'cover', objectPosition: 'top left', display: 'block', transition: 'transform 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ padding: '6px 10px', fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500 }}>{alt}</div>
        </div>
      ))}
    </div>
  );

  // Lightbox overlay
  const Lightbox = () => lightbox ? (
    <div
      onClick={() => setLightbox(null)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out', padding: 24,
      }}>
      <button
        onClick={() => setLightbox(null)}
        style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>
        ×
      </button>
      <img
        src={lightbox.src}
        alt={lightbox.alt}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
      />
      <div style={{ position: 'absolute', bottom: 24, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{lightbox.alt}</div>
    </div>
  ) : null;

  return (
    <div style={{ paddingTop: 68 }}>
      <Lightbox/>
      {protoFull && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', padding: 'clamp(16px,3vw,40px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500 }}>Mining Royalties — interactive prototype</div>
            <button type="button" aria-label="Cerrar" onClick={() => setProtoFull(false)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', background: '#000' }}>
            <iframe
              title="Mining Royalties — interactive prototype (fullscreen)"
              src={figmaEmbedSrc(OVERVIEW_PROTO_URL)}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div className="reading-progress-bar">
        <div className="reading-progress-fill" style={{ width: `${readingPct}%` }} />
      </div>

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0 clamp(32px,4vw,56px)' }}>
        <Container>
          <button onClick={() => setPage('projects')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink-2)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32, transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            ← Back to projects
          </button>

          <div className="anim-fadeup"><Eyebrow>Case study · 02</Eyebrow></div>
          <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
            Digital Transformation in Oruro's Mining Sector — <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>AMSIX &amp; Department of Mining</em>
          </h1>

          <div className="anim-fadeup d200" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
            <Tag variant="sage">UX Research</Tag>
            <Tag variant="sage">Information Architecture</Tag>
            <Tag variant="sage">Design System</Tag>
            <Tag variant="accent">Government · SaaS</Tag>
          </div>

          <div className="anim-fadeup d200" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {[['Role','UI Designer · Design Systems'],['Duration','6 months'],['Client','AMSIX & Dept. of Mining, Oruro'],['Tools','Figma · FigJam · Angular · Python']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                <strong style={{ color: 'var(--ink)' }}>{k}</strong> {v}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OVERVIEW ── */}
      <CsSection eyebrow="Overview">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: isMobile ? 28 : 48, alignItems: 'start', marginTop: 24 }}>
          <div>
            <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 16 }}>
              Bolivia's mining sector — a critical pillar of the national economy — has long relied on outdated, manual data management systems. This lack of digital infrastructure has created serious vulnerabilities: corruption, financial losses, and a 15–25% error rate in manual data entry that compromises institutional integrity across government agencies, mining cooperatives, and private companies.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>
              Partnering with AMSIX and Bolivian government representatives, I led UX strategy and research to design a centralized platform for managing geological surveys, mining concessions, environmental compliance, and public transparency data. This case study walks through the research, information architecture, and design system created to bring structure, accountability, and efficiency to a historically fragmented sector.
            </p>
          </div>
          {OVERVIEW_PROTO_URL ? (
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', aspectRatio: '4 / 3' }}>
              <iframe
                title="Mining Royalties — interactive prototype"
                src={figmaEmbedSrc(OVERVIEW_PROTO_URL)}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                allowFullScreen
              />
              <button type="button" aria-label="Ampliar prototipo" title="Ampliar"
                onClick={() => setProtoFull(true)}
                style={{ position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: 9, background: 'var(--bg-glass)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', color: 'var(--ink)', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-sm)', zIndex: 2, transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--ink)'; }}>⤢</button>
            </div>
          ) : (
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
              onClick={() => setLightbox({ src: '/overview.png', alt: 'Platform login — desktop & mobile' })}>
              <img src="/overview.png" alt="Platform login — desktop & mobile"
                style={{ width: '100%', display: 'block' }} />
            </div>
          )}
        </div>
        {/* Supporting data */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12, marginTop: 32 }}>
          {[
            ['15–25%','Data entry error rate from manual processes'],
            ['60%',   'Productive labor hours lost to repetitive tasks'],
            ['3 types','Mining operators: state, private, cooperative'],
            ['$B',    'In royalties mismanaged annually due to poor transparency'],
          ].map(([n, l]) => (
            <div key={l}
              style={{ textAlign: 'center', padding: '24px 16px', borderRadius: 18, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 8, fontWeight: 500, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── THE PROBLEM / THE SOLUTION ── */}
      <CsSection eyebrow="The Problem" sage>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: isMobile ? 32 : 48, alignItems: 'start', marginTop: 24 }}>
          {/* Problem */}
          <div>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 20 }}>
              Bolivia's mining sector runs on outdated data management systems, minimal process automation, and poor coordination between stakeholders. These gaps create serious risks across the sector.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Corruption & Restricted Access', 'Fragmented information systems make records easy to manipulate, opening the door to fund misappropriation.', '/Card%20Icon1.png'],
                ['Financial Losses',              'Weak transparency and coordination mechanisms result in billions of dollars misspent or lost each year.', '/Card%20Icon2.png'],
                ['Data Integrity Issues',         'Manual data entry carries a 15–25% error rate, compromising institutional records and generating constant rework.', '/Card%20Icon3.png'],
                ['Operational Inefficiency',      'Lack of automation wastes 60% of productive labor hours — the equivalent of 4–5 full-time employees on repetitive tasks.', '/Card%20Icon4.png'],
              ].map(([title, desc, icon]) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
                  <img src={icon} alt="" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 10, display: 'block' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Solution */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>The Solution</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 20 }}>
              A centralized digital platform designed to replace fragmented, manual processes with structured, transparent, and automated workflows.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Centralized Data Management', 'Digitizing geological surveys, mining concessions, and production reports into a single source of truth.', '/Centralized%20Data%20Management.png', null],
                ['Stakeholder Integration',    'Connecting government agencies, mining cooperatives, and private companies on one platform.', '/Stakeholder%20Integration.png', null],
                ['Environmental Monitoring',   'Tracking compliance with environmental regulations and sustainability metrics in real time.', '/Environmental%20Monitoring.png', null],
                ['Public Transparency',        'Designed to give citizens access to non-sensitive mining data to promote accountability — a public transparency layer built and ready, pending legal clearance before it goes live.', null, 'Not yet public'],
              ].map(([title, desc, img, status]) => (
                <div key={title} style={{ background: 'var(--sage-s)', border: '1px solid var(--sage-g)', borderRadius: 14, padding: 18 }}>
                  {img && (
                    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--sage-g)', background: 'var(--bg-card)', marginBottom: 12, cursor: 'zoom-in' }}
                      onClick={() => setLightbox({ src: img, alt: title })}>
                      <img src={img} alt={title}
                        style={{ width: '100%', height: 120, objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.3s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{title}</div>
                    {status && <span style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', padding: '2px 8px', borderRadius: 9999, background: 'var(--bg-card)', border: '1px solid var(--sage-g)', color: 'var(--sage)' }}>{status}</span>}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CsSection>

      {/* ── RESEARCH ── */}
      <CsSection eyebrow="Research — What I did">

        {/* Franja 1 — Intro + hallazgo clave (2 columnas balanceadas) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: isMobile ? 28 : 48, marginTop: 24, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 16 }}>Stakeholder interviews &amp; discovery.</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>Across the government's institutions and departments, I ran a qualitative discovery phase — stakeholder interviews paired with analysis of their existing forms, spreadsheets, and system documentation — to map the workflows, pain points, and mental models of each user group. These findings grounded every information-architecture and UI decision that followed.</p>
          </div>
          <div style={{ padding: 24, borderRadius: 16, background: 'var(--sage-s)', border: '1px solid var(--sage-g)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Key insight · Core finding</div>
            <p style={{ fontSize: '1rem', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.72, marginBottom: 18 }}>"The biggest challenge wasn't the technology — it was reconciling the needs of traditional mining cooperatives with modern digital tools. Many operators had limited technology access and poor internet connectivity."</p>
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--sage-g)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>From insight to design</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>A mobile-friendly interface with offline capabilities. Simple, high-contrast UI patterns for low-literacy users. Training workshops planned with local universities alongside the platform launch.</p>
            </div>
          </div>
        </div>

        {/* Franja 2 — A quiénes entrevisté (3 tarjetas en fila, ancho completo) */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 18 }}>Who I spoke with — goals vs. reality</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {[
              ['👤','Government administrators',  'Real-time visibility into royalty collection and compliance.', 'Data was scattered across disconnected spreadsheets — no single source of truth.'],
              ['⛏️','Mining cooperative leaders', 'Register and pay royalties without friction.', 'Low digital literacy and patchy connectivity, often in remote areas.'],
              ['🔍','Field inspectors',           'Capture and submit reports on-site.', 'Unreliable connectivity — offline-first, mobile-friendly flows were essential.'],
            ].map(([icon, role, goal, reality]) => (
              <div key={role} style={{ padding: 20, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{icon}</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2 }}>{role}</div>
                </div>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--sage-s)', border: '1px solid var(--sage-g)' }}>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 5 }}>Goal</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{goal}</p>
                </div>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-inset)', border: '1px solid var(--border-m)' }}>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 5 }}>Reality</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{reality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Franja 3 — Sistema real del gobierno (carrusel a ancho completo) */}
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.7rem)', fontWeight: 400, marginBottom: 10 }}>Grounded in the government's real system.</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              The government shared their spreadsheets, paper forms, and system documentation. I mapped the use cases and studied the data model behind the platform — so every information-architecture decision reflected how the process actually worked, end to end.
            </p>
          </div>
          <DiagramCarousel
            onExpand={setLightbox}
            maxWidth={900}
            height={460}
            items={[
              ['/use-case-general.png',      'Use cases — general system'],
              ['/use-case-royalties.png',    'Use cases — royalty collection'],
              ['/use-case-registration.png', 'Use cases — user registration'],
              ['/use-case-admin.png',        'Use cases — administration'],
              ['/database-schema.jpg',       'Data model — database schema'],
            ]}
          />
        </div>
      </CsSection>

      {/* ── INFORMATION ARCHITECTURE ── */}
      <CsSection eyebrow="Information Architecture" sage>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 24 }}>Structuring a complex multi-stakeholder system.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: isMobile ? 28 : 48, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 20 }}>The platform needed to serve 3 very different user types with different goals, permissions, and technical comfort levels — all within a single system. I mapped out distinct user flows and navigation paths for each.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Government Admin', 'Dashboard → Reports → Audit Trail → Approvals', '#2A8C5A'],
                ['Mining Operator',  'Registration → Document Upload → Status Tracking','#1A7FC4'],
                ['Field Inspector',  'Assignment → On-site Form → Submit → Sync',       '#C4611A'],
              ].map(([role, flow, color]) => (
                <div key={role} style={{ padding: '14px 18px', borderRadius: 12, background: 'var(--bg-card)', border: `1px solid ${color}30` }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>{role}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)', fontFamily: 'monospace' }}>{flow}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Platform Work Flow</div>
            <DiagramCarousel
              onExpand={setLightbox}
              maxWidth={560}
              height={380}
              items={[
                ['/Mining%20projectflow%20chart%201.png', 'Platform work flow — part 1'],
                ['/Mining%20projectflow%20chart%202.png', 'Platform work flow — part 2'],
                ['/Mining%20projectflow%20chart%203.png', 'Platform work flow — part 3'],
              ]}
            />
          </div>
        </div>
      </CsSection>

      {/* ── DESIGN SYSTEM ── */}
      <CsSection eyebrow="Design System">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 20 }}>Built for developers, not just designers.</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 680, marginBottom: 32 }}>Because I understand how Angular components are structured, I built the design system with developer handoff in mind — reusable patterns, clear naming conventions, and token-based decisions that mapped directly to the codebase.</p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0,1fr))' : 'repeat(3, minmax(0,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            ['🧱','Component Library','Reusable UI patterns for forms, tables, status badges, and navigation — consistent across all 3 user portals'],
            ['🎨','Design Tokens',    'Color, spacing, and typography tokens aligned with Angular implementation constraints'],
            ['📋','Form Patterns',    'Standardized input patterns for complex registration forms — validation states, error handling, offline indicators'],
            ['📊','Data Display',     'Table components and dashboard widgets built for high data density without sacrificing readability'],
            ['📱','Responsive Grid',  'Mobile-first layouts ensuring the system worked for field inspectors on low-end devices'],
            ['🤝','Dev Handoff',      'Annotated Figma specs with component behavior, states, and Angular component name references'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ padding: 22, borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 6 }}>{title}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Component library & tokens — showcase visual */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>Component library &amp; tokens</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 40, alignItems: 'start' }}>

            {/* Starting point — Government logo */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Starting point – Goverment Logo</div>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
                onClick={() => setLightbox({ src: '/logogoverment.jpg', alt: 'Gobierno Autónomo Municipal de Oruro — brand starting point' })}>
                <img src="/logogoverment.jpg" alt="Gobierno Autónomo Municipal de Oruro"
                  style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Color tokens */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Color tokens</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {DS_COLORS.map(([name, hex]) => (
                  <div key={hex} style={{ textAlign: 'left' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: hex, border: '1px solid var(--border)' }} />
                    <div style={{ fontSize: '0.6rem', color: 'var(--ink-3)', marginTop: 6 }}>{hex}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type scale */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Type scale</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--ink)', lineHeight: 1.1 }}>Registro de regalías</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--ink-3)' }}>Heading · 22 / SemiBold</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--ink-2)' }}>Formulario de sujeto pasivo</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--ink-3)' }}>Body · 15 / Regular</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>NIT / NIM · validación</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--ink-3)' }}>Caption · 12 / Regular</div>
                </div>
              </div>
            </div>

            {/* Components */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Components</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ padding: '9px 18px', borderRadius: 8, background: '#6E2A33', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>Registrar</span>
                  <span style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #6E2A33', color: '#6E2A33', fontSize: '0.8rem', fontWeight: 600 }}>Cancelar</span>
                </div>
                <div style={{ width: '100%', maxWidth: 220 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>NIT</div>
                  <div style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-m)', background: 'var(--bg)', fontSize: '0.8rem', color: 'var(--ink-3)' }}>000-000-000</div>
                </div>
                <span style={{ padding: '5px 14px', borderRadius: 9999, background: '#E0EFE5', color: '#2E7D4F', fontSize: '0.72rem', fontWeight: 600 }}>● Aprobado</span>
              </div>
            </div>

          </div>
        </div>
      </CsSection>

      {/* ── UI DESIGN ── */}
      <CsSection eyebrow="UI Design" sage>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 12 }}>Clarity under complexity.</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 700 }}>
          The interface had to work for a government admin on a desktop and a field inspector on a low-end phone with poor connectivity. High-contrast patterns, generous touch targets, and offline-friendly states keep the experience usable for every user type — across registration, legal review, and approval.
        </p>

        {/* Desktop & mobile — lado a lado como en Figma */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginTop: 32 }}>
          {/* Desktop */}
          <div style={{ flex: '2 1 360px' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
              onClick={() => setLightbox({ src: '/DesktopUI.png', alt: 'State-owned registration — desktop' })}>
              <img src="/DesktopUI.png" alt="State-owned registration — desktop"
                style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 10, fontWeight: 500 }}>State-owned registration — desktop</div>
          </div>
          {/* Mobile */}
          <div style={{ flex: '0 1 210px', maxWidth: 210 }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
              onClick={() => setLightbox({ src: '/MobileUIpng.png', alt: 'Same flow — mobile-first' })}>
              <img src="/MobileUIpng.png" alt="Same flow — mobile-first"
                style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 10, fontWeight: 500 }}>Same flow — mobile-first</div>
          </div>
        </div>
      </CsSection>

      {/* ── INTERACTIVE PROTOTYPES ── */}
      {PROTOS.some(p => p.url) && (
        <CsSection eyebrow="Interactive prototypes">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 12 }}>
            Try the real thing.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 680, marginBottom: 32 }}>
            A piece of each part of the platform — click through the flows real users walk, from registration to legal review and the admin dashboard.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>
            {PROTOS.filter(p => p.url).map(p => (
              <div key={p.title}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', aspectRatio: '4 / 3' }}>
                  <iframe
                    title={`Prototype — ${p.title}`}
                    src={figmaEmbedSrc(p.url)}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </CsSection>
      )}

      {/* ── OUTCOME ── */}
      <CsSection eyebrow="Outcome & Impact">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 28, letterSpacing: '-.02em' }}>
          From paper chaos to <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>real-time clarity.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginBottom: 40 }}>
          {[
            ['50%',       'Higher engagement vs. the manual paper process (pilot)'],
            ['Real-time', 'Royalty status tracking replacing paper trail'],
            ['3 portals', 'Unified under one design system'],
            ['↓ Delays',  'Reporting bottlenecks significantly reduced'],
          ].map(([n, l]) => (
            <div key={l}
              style={{ textAlign: 'center', padding: 28, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, color: 'var(--accent)', lineHeight: 1.1 }}>{n}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: 8, fontWeight: 500, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── LESSONS ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
        <Container>
          <Reveal><Eyebrow>Lessons learned</Eyebrow></Reveal>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginTop: 16, marginBottom: 28 }}>What this project taught me.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0,1fr))' : 'repeat(4, minmax(0,1fr))', gap: 14 }}>
            {[
              ['01','Design systems need to speak developer',    'Building the DS with Angular component names in mind made the handoff seamless and reduced back-and-forth by design.'],
              ['02','IA is the hardest part of complex platforms','Getting the navigation right for 3 completely different user types required more iteration than any visual design decision.'],
              ['03','Context changes everything',               'Designing for users with limited digital literacy and poor connectivity forced me to prioritize clarity and resilience over aesthetics.'],
              ['04','Stakeholder buy-in is part of the design', 'Government projects require building trust with non-technical stakeholders. Explaining design decisions in their language was as important as the designs themselves.'],
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <div style={{ padding: 22, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 18, transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.boxShadow = 'var(--sh-sage)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--border-s)', flexShrink: 0, width: 26, lineHeight: 1.1 }}>{n}</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>{t}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setPage('projects')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-2)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}>
                ← All projects
              </button>
              <Btn variant="accent" size="lg" onClick={() => setPage('contact')}>Work with me →</Btn>
            </div>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </div>
  );
}
