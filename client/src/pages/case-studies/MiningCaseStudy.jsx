import { useContext,useState } from 'react';
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

export default function MiningCaseStudy() {
  const [lightbox, setLightbox] = useState(null);
  const { setPage } = useContext(AppCtx);
  const readingPct  = useReadingProgress();

  const CsSection = ({ eyebrow, children, sage }) => (
    <section style={{ padding: 'clamp(48px,6vw,80px) 0', borderBottom: '1px solid var(--border)' }}>
      <Container>
        <Reveal><Eyebrow sage={sage}>{eyebrow}</Eyebrow></Reveal>
        {children}
      </Container>
    </section>
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
          <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem,6vw,4.5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
            Mining Royalties —<br />
            <em style={{ color: 'var(--accent)' }}>Bolivia Government Platform</em>
          </h1>

          <div className="anim-fadeup d200" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
            <Tag variant="sage">UI Design</Tag>
            <Tag variant="sage">Information Architecture</Tag>
            <Tag variant="sage">Design System</Tag>
            <Tag variant="accent">Government · SaaS</Tag>
          </div>

          <div className="anim-fadeup d200" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {[['Role','UI Designer · IA · Design Systems'],['Duration','6 months'],['Client','AMSIX & Dept. of Mining, Oruro'],['Tools','Figma · FigJam · Angular · Python']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                <strong style={{ color: 'var(--ink)' }}>{k}</strong> {v}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CONTEXT ── */}
      <CsSection eyebrow="Context">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'start', marginTop: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginBottom: 20 }}>What are mining royalties?</h2>
            <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 16 }}>
              When companies extract minerals from Bolivia's land — silver, gold, zinc — they pay a royalty fee (typically 5%) to the government. 85% goes to the regional government, 15% to local municipalities. This money funds education, healthcare, and infrastructure for the communities bearing the impact of mining.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>
              Despite being legally mandated and economically critical, the entire system was managed through paper documents, disconnected Excel sheets, and manual approvals — creating enormous inefficiency at every level.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        </div>
      </CsSection>

      {/* ── MY ROLE ── */}
      <CsSection eyebrow="My Role — What I focused on" sage>
        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginBottom: 16 }}>
            I joined this project focused on three areas.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 700, marginBottom: 32 }}>
            Working closely with AMSIX's development team and government representatives from the Department of Oruro, my contributions were scoped to UI design, information architecture, and the design system.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* ── Card 1: Information Architecture ── */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>🏗️</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>Information Architecture</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 20 }}>
                Mapped user journeys for 3 distinct user types: government officials, cooperative leaders, and field inspectors. Designed the navigation structure and content hierarchy for a complex multi-stakeholder platform.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {['User Flows', 'Sitemaps', 'Navigation Design'].map(t => <Tag key={t} variant="sage">{t}</Tag>)}
              </div>
              {/* Image gallery — 3 images */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  [imgUserFlow,     'User Flow Diagram'],
                  [imgUseCaseGen,   'General Use Case'],
                  [imgUseCaseRoy,   'Royalties Use Case'],
                ].map(([src, alt]) => (
                  <div key={alt} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
                    onClick={() => setLightbox({ src, alt })}>
                    <img src={src} alt={alt}
                      style={{ width: '100%', height: 140, objectFit: 'cover', objectPosition: 'top left', display: 'block', transition: 'transform 0.3s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ padding: '6px 10px', fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500 }}>{alt}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Card 2: UI Design ── */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>🎨</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>UI Design</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 20 }}>
                Designed the platform interfaces — dashboards, royalty registration forms, compliance tracking screens, and reporting views — ensuring clarity for users with varying levels of digital literacy.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {['Dashboards', 'Forms', 'Data Tables', 'Responsive'].map(t => <Tag key={t} variant="sage">{t}</Tag>)}
              </div>
              {/* Image gallery — 3 images */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  [imgRevisionUsers,    'User Review Dashboard'],
                  [imgRevisionUsersEnd, 'Approved User View'],
                  [imgRevisionLegal,    'Legal Review Screen'],
                ].map(([src, alt]) => (
                  <div key={alt} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
                    onClick={() => window.open(src, '_blank')}>
                    <img src={src} alt={alt}
                      style={{ width: '100%', height: 140, objectFit: 'cover', objectPosition: 'top left', display: 'block', transition: 'transform 0.3s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ padding: '6px 10px', fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500 }}>{alt}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Card 3: Design System ── */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>🧩</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>Design System</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 20 }}>
                Built reusable UI components and design templates aligned with technical implementation constraints. Ensured consistency across all platform surfaces and facilitated smooth developer handoff.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {['Component Library', 'Tokens', 'Dev Handoff', 'Angular'].map(t => <Tag key={t} variant="sage">{t}</Tag>)}
              </div>
              {/* Image — full width */}
              <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-inset)', cursor: 'zoom-in' }}
                onClick={() => window.open(imgDesignSystem, '_blank')}>
                <img src={imgDesignSystem} alt="Design System Overview"
                  style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'top left', display: 'block', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ padding: '6px 10px', fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500 }}>Design System — Figma Component Library</div>
              </div>
            </div>

          </div>
        </div>
      </CsSection>

      {/* ── THE PROBLEM ── */}
      <CsSection eyebrow="The Problem">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 24 }}>A paper-based system managing millions in public funds.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {[
            ['📄','Paperwork overload',        'Physical documents and manual forms caused errors, loss, and impossible-to-track paper trails across multiple government departments.'],
            ['📊','Disconnected Excel sheets', 'Critical royalty data was scattered across disconnected spreadsheets — no single source of truth, no way to audit.'],
            ['⏳','Bureaucratic bottlenecks',  'Manual approvals meant documents physically moved between departments. Payments and audits took weeks instead of hours.'],
            ['🔓','Transparency gaps',         'Inefficient systems made it easy for bad actors to manipulate records — leading to fund misappropriation and corruption risk.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── RESEARCH ── */}
      <CsSection eyebrow="Research — What I did" sage>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, marginTop: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 16 }}>Stakeholder interviews & discovery.</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>I conducted interviews with different institutions and departments to understand the workflows, pain points, and mental models of each user type. This discovery phase shaped every IA and UI decision that followed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              {[
                ['👤','Government officials',       'Needed real-time visibility into royalty collection and compliance status'],
                ['⛏️','Mining cooperative leaders', 'Required simple registration flows — limited digital literacy, often in remote areas'],
                ['🔍','Field inspectors',           'Needed mobile-friendly interfaces with offline capability for on-site reporting'],
              ].map(([icon, role, need]) => (
                <div key={role} style={{ padding: '14px 18px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 3 }}>{role}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{need}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 16 }}>Key insight.</h2>
            <div style={{ padding: 24, borderRadius: 16, background: 'var(--sage-s)', border: '1px solid var(--sage-g)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Core finding</div>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.72 }}>"The biggest challenge wasn't the technology — it was reconciling the needs of traditional mining cooperatives with modern digital tools. Many operators had limited technology access and poor internet connectivity."</p>
            </div>
            <div style={{ marginTop: 16, padding: 20, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>Design response</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Designed a mobile-friendly interface with offline capabilities. Simple, high-contrast UI patterns for low-literacy users. Collaborated with local universities to plan training workshops alongside the platform launch.</p>
            </div>
          </div>
        </div>
      </CsSection>

      {/* ── IA ── */}
      <CsSection eyebrow="Information Architecture">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 24 }}>Structuring a complex multi-stakeholder system.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'start' }}>
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
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '85%', height: '80%', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                <div style={{ height: 32, width: '50%', background: 'var(--accent-s)', borderRadius: 8, border: '1px solid var(--accent-g)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)' }}>Platform Home</div>
                <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
                  {['Government','Operators','Inspectors'].map(n => (
                    <div key={n} style={{ flex: 1, height: 28, background: 'var(--sage-s)', borderRadius: 6, border: '1px solid var(--sage-g)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--sage)' }}>{n}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                  {['Dashboard','Reports','Registration','Tracking','Field Form','Sync'].map(n => (
                    <div key={n} style={{ flex: 1, height: 22, background: 'var(--bg-inset)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 500, color: 'var(--ink-3)' }}>{n}</div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', fontSize: '0.72rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Navigation structure — simplified IA diagram</div>
            </div>
          </div>
        </div>
      </CsSection>

      {/* ── DESIGN SYSTEM ── */}
      <CsSection eyebrow="Design System" sage>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginTop: 16, marginBottom: 20 }}>Built for developers, not just designers.</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 680, marginBottom: 32 }}>Because I understand how Angular components are structured, I built the design system with developer handoff in mind — reusable patterns, clear naming conventions, and token-based decisions that mapped directly to the codebase.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
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
      </CsSection>

      {/* ── OUTCOME ── */}
      <CsSection eyebrow="Outcome & Impact">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, marginTop: 16, marginBottom: 32, letterSpacing: '-.02em' }}>
          From paper chaos to <em style={{ color: 'var(--accent)' }}>real-time clarity.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginBottom: 40 }}>
          {[
            ['50%',       'Increase in platform engagement during pilot'],
            ['Real-time', 'Royalty status tracking replacing paper trail'],
            ['3 portals', 'Unified under one design system'],
            ['↓ Delays',  'Reporting bottlenecks significantly reduced'],
          ].map(([n, l]) => (
            <div key={l}
              style={{ textAlign: 'center', padding: 32, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
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