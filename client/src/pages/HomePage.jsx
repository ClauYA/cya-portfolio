import { useContext, useState, useCallback, useEffect } from 'react';
import { AppCtx }          from '../context/AppContext';
import { PROJECTS }        from '../data/projects';

import Btn           from '../components/ui/Btn';
import Tag           from '../components/ui/Tag';
import Eyebrow       from '../components/ui/Eyebrow';
import Reveal        from '../components/ui/Reveal';
import Container     from '../components/ui/Container';
import Section       from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import AvailDot      from '../components/ui/AvailDot';
import Typewriter    from '../components/ui/Typewriter';
import Footer        from '../components/Footer';
import ProjectCard   from '../components/blocks/ProjectCard';
//import SkillBar      from '../components/blocks/SkillBar';

//import { SKILLS } from '../data/skills';

// Frases del titular animado (typewriter)
const HERO_PHRASES = [
  'Claudia Bittner',
  'Product Design',
  'Human-Centered Design',
  'detail driven interfaces',
  'Interaction Design',
];

export default function HomePage() {
  const { setPage, setCaseProject } = useContext(AppCtx);
  const openProject = useCallback((p) => {
    if (p.id === 'mining-royalties') { setPage('mining'); }
    else { setCaseProject(p); setPage('casestudy'); }
  }, [setPage, setCaseProject]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <div style={{ paddingTop: 68 }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', padding: 'clamp(64px,8vw,120px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[700, 1060, 460].map((size, i) => (
            <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1px solid var(--border)', right: ['-200px','-420px','80px'][i], top: '50%', marginTop: -size/2, opacity: 0, animation: `ring-appear 14s cubic-bezier(0,0,0.2,1) ${[.3,.6,.9][i]}s forwards` }} />
          ))}
          <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-g) 0%, transparent 70%)', right: -60, top: -80, animation: 'float 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, var(--sage-g) 0%, transparent 70%)', right: 200, bottom: 40, animation: 'float 9s ease-in-out 3.5s infinite' }} />
        </div>

        <Container style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>

            <div style={{ width: '100%' }}>
               <div className="anim-fadeup" style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', gap: 14, marginBottom: 32, flexWrap: 'wrap' }}>
                <AvailDot />
                <Tag>US Location</Tag>
          </div> 
              {/* Titular animado: efecto máquina de escribir */}
              <h1 className="anim-fadeup d100 typewriter-heading" aria-label="Claudia Yupanqui — Product & UX/UI Designer" style={{ marginBottom: 20, minHeight: '1.25em' }}>
                <Typewriter phrases={HERO_PHRASES} />
              </h1>
              <p className="anim-fadeup d200" style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 560, margin: '0 auto 40px' }}>
                I design interfaces that are minimal, approachable, and aligned with user needs. My goal is to build experiences that feel professional, friendly, and easy to trust.
              </p>
              <div className="anim-fadeup d300" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <Btn variant="solid" size="lg" onClick={() => setPage('projects')}>View Projects →</Btn>
                <Btn variant="outline" size="lg" onClick={() => setPage('contact')}>Let's Work Together</Btn>
              </div>
              <div className="anim-fadeup d400" style={{ paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
                {[['3+','Years Experience'],['5+','Projects Shipped'],['100%','Client Satisfaction'],['3×','Avg Conversion Lift']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem,3vw,2.5rem)', fontWeight: 400, letterSpacing: '-.04em', color: 'var(--ink)', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500, marginTop: 3, letterSpacing: '.04em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SELECTED WORK */}
      <Section>
        <Container>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
            <SectionHeader eyebrow="Selected work" heading={<>Projects that <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>drive results.</em></>} marginBottom={0} />
            <Reveal delay={100}><Btn variant="outline" onClick={() => setPage('projects')}>View all projects →</Btn></Reveal>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} layout={p.featured ? 'featured' : i % 2 === 0 ? 'normal' : 'alt'} onOpen={() => openProject(p)} delay={i * 80} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTACT CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,140px) 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-inset)', clipPath: 'polygon(0 7%, 100% 0%, 100% 93%, 0 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--accent), var(--sage))', opacity: 0.35 }} />
        <Container style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Reveal><Eyebrow center>Ready when you are</Eyebrow></Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginTop: 16 }}>
                Let's build experiences <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>people remember.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}><p style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.7 }}>Whether you're a startup, a fitness brand, or a bold founder — let's create something extraordinary together.</p></Reveal>
            <Reveal delay={300}>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}>
                <Btn variant="accent" size="lg" onClick={() => setPage('contact')}>Start a project →</Btn>
                <Btn variant="outline" size="lg" href="mailto:info@yaczoe.com">info@yaczoe.com</Btn>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
                {[['💼','LinkedIn'],['🎨','Dribbble'],['📅','Book a call']].map(([icon, label]) => (
                  <a key={label} href="#"
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 16px', borderRadius: 9999, background: 'var(--bg-card)', border: '1px solid var(--border-m)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink-2)', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-m)'; e.currentTarget.style.color = 'var(--ink-2)'; e.currentTarget.style.transform = 'none'; }}>
                    {icon} {label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}