import { useContext } from 'react';
import { AppCtx }   from '../context/AppContext';
import { TIMELINE, TOOLS } from '../data/about';

import Eyebrow   from '../components/ui/Eyebrow';
import Btn       from '../components/ui/Btn';
import Reveal    from '../components/ui/Reveal';
import Container from '../components/ui/Container';
import AvailDot  from '../components/ui/AvailDot';
import ResumeBtn from '../components/ui/ResumeBtn';
import Footer    from '../components/Footer';
import PhotoCarousel from '../components/blocks/PhotoCarousel';

/* ═══════════════════════════════════════════════════════════════
   ██  ABOUT PAGE  — accessed via navbar "About" link
═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { setPage } = useContext(AppCtx);
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ padding: 'clamp(64px,7vw,110px) 0 clamp(48px,6vw,80px)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 'clamp(40px,7vw,80px)', alignItems: 'start' }}>

            {/* ── Content column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

              {/* Intro + Resume */}
              <div>
                <div className="anim-fadeup"><Eyebrow>My story</Eyebrow></div>
                <h1 className="anim-fadeup d100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem,6vw,4.5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
                  Designing with<br /><em style={{ color: 'var(--accent)' }}>purpose.</em>
                </h1>
                <p className="anim-fadeup d200" style={{
                  fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20,
                  lineHeight: 1.72, maxWidth: 600
                }}>
                  I'm a Designer and Frontend Developer with a full-stack foundation —
                  I design with the backend in mind, understanding what is buildable, scalable,
                  and consistent across platforms.
                </p>
                <p className="anim-fadeup d300" style={{
                  fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72
                }}>
                  I translate user research and business requirements into reusable components,
                  clear user stories, and structured information architecture. Experienced across
                  product, design, and engineering teams in Agile environments — representing
                  both design and technical perspectives to cross-functional stakeholders.
                </p>

                {/* CTA buttons including Resume */}
                <div className="anim-fadeup d400" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, alignItems: 'center' }}>
                  <Btn variant="solid" onClick={() => setPage('contact')}>Work with me →</Btn>
                  <ResumeBtn size="md" />
                </div>
              </div>

              {/* Timeline */}
              <Reveal>
                <Eyebrow>Journey</Eyebrow>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, marginTop: 12, marginBottom: 28, letterSpacing: '-.02em' }}>How I got here.</h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {TIMELINE.map((item, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 12px 1fr', gap: '0 20px', padding: '20px 0' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'var(--accent)', textAlign: 'right', paddingTop: 2 }}>{item.year}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {i > 0 && <div style={{ width: 1, background: 'var(--border)', flex: '0 0 20px' }} />}
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, boxShadow: '0 0 0 3px var(--accent-s)', margin: '4px 0' }} />
                        {i < TIMELINE.length - 1 && <div style={{ width: 1, background: 'var(--border)', flex: 1, minHeight: 20 }} />}
                      </div>
                      <div style={{ paddingBottom: 12 }}>
                        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)', marginBottom: 8 }}>{item.sub}</div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Philosophy */}
              <Reveal>
                <Eyebrow>Design philosophy</Eyebrow>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, marginTop: 12, marginBottom: 24, letterSpacing: '-.02em' }}>How I think.</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
                  {[[
                      '01',
                      'Research Drives Every Decision',
                      'I start with real users, real pain points, and real context. Every design choice is grounded in evidence — not assumptions or personal preference.'
                    ],
                    [
                      '02',
                      'Design Systems Think at Scale',
                      'Good design is not just one screen — it is a system. I build reusable components, consistent patterns, and shared logic that works across every surface and scales with the product.'
                    ],
                    [
                      '03',
                      'Buildable by Design',
                      'I design with the backend in mind. Understanding what is technically feasible, scalable, and consistent across platforms makes the handoff stronger and the final product better.'
                    ],].map(([n, t, d]) => (
                    <div key={n}
                      style={{ padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'var(--border-s)', lineHeight: 1, marginBottom: 14 }}>{n}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{t}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.55 }}>{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Tools */}
              <Reveal>
                <Eyebrow sage>Toolkit</Eyebrow>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, marginTop: 12, marginBottom: 24, letterSpacing: '-.02em' }}>Tools &amp; workflow.</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 10 }}>
                  {TOOLS.map(t => (
                    <div key={t.name}
                      style={{ padding: '18px 12px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all .2s', cursor: 'default' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-sage)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{t.icon}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2 }}>{t.cat}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div style={{ paddingBottom: 60 }} />
            </div>

            {/* ── Sticky portrait sidebar ── */}
            <div style={{ position: 'sticky', top: 88 }}>
              <Reveal direction="right">
               {/* ── PHOTO CAROUSEL ── */}
                <PhotoCarousel /> 
              {/* Stats below collage */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                {[['3+','Years Experience'],['5+','Projects Delivered'],['100%','Client Satisfaction']].map(([n, l]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--accent)' }}>{n}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
                <AvailDot text="Available for new work" />
                <ResumeBtn size="md" style={{ justifyContent: 'center', width: '100%', marginTop: 6 }} />
              </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}