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
const HERO_PHRASES = {
  en: ['Claudia Bittner', 'Full-stack developer who understands users'],
  es: ['Claudia Bittner', 'Desarrolladora full-stack que entiende a los usuarios.'],
};

export default function HomePage() {
  const { setPage, setCaseProject, lang } = useContext(AppCtx);
  const es = lang === 'es';
  const openProject = useCallback((p) => {
    if (p.id === 'mining-royalties') { setPage('mining'); }
    else { setCaseProject(p); setPage('casestudy'); }
  }, [setPage, setCaseProject]);

  const [setIsMobile] = useState(window.innerWidth <= 900);
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
                <AvailDot text={es ? 'Hablemos de tu proyecto' : "Let's talk about your project"} />
                <Tag>{es ? 'Ubicación: EE. UU.' : 'US Location'}</Tag>
          </div>
              {/* Titular animado: efecto máquina de escribir */}
              <h1 className="anim-fadeup d100 typewriter-heading" aria-label="Claudia Bittner — UX/UI Designer- Fullstack Developer" style={{ marginBottom: 20, minHeight: '1.25em' }}>
                <Typewriter phrases={HERO_PHRASES[lang] || HERO_PHRASES.en} />
              </h1>
              <p className="anim-fadeup d200" style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'var(--ink-2)', lineHeight: 1.72, maxWidth: 580, margin: '0 auto 40px' }}>
                {es
                  ? 'Desarrolladora fullstack que entiende a los usuarios. Diseño y construyo productos completos: frontend, backend, bases de datos, APIs, deployment. Sin handoffs necesarios.'
                  : "Fullstack developer who understands users. I design and build complete products: frontend, backend, databases, APIs, deployment. No handoffs needed."}
              </p>
              <div className="anim-fadeup d300" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <Btn variant="solid" size="lg" onClick={() => setPage('projects')}>{es ? 'Ver proyectos →' : 'View Projects →'}</Btn>
                <Btn variant="outline" size="lg" onClick={() => setPage('contact')}>{es ? 'Trabajemos juntos' : "Let's Work Together"}</Btn>
              </div>
              <div className="anim-fadeup d400" style={{ paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
                {(es
                  ? [['3+','Años de experiencia'],['5+','Proyectos entregados'],['100%','Diseño + Código'],['3×','Aumento promedio de conversión']]
                  : [['3+','Years Experience'],['5+','Projects Shipped'],['100%','Design + Build'],['3×','Avg Conversion Lift']]
                ).map(([n,l]) => (
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
            <SectionHeader eyebrow={es ? 'Trabajo seleccionado' : 'Selected work'} heading={es ? <>Proyectos que <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>generan resultados.</em></> : <>Projects that <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>drive results.</em></>} marginBottom={0} />
            <Reveal delay={100}><Btn variant="outline" onClick={() => setPage('projects')}>{es ? 'Ver todos los proyectos →' : 'View all projects →'}</Btn></Reveal>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} layout={p.featured ? 'featured' : i % 2 === 0 ? 'alt' : 'normal'} onOpen={() => openProject(p)} delay={i * 80} />
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
            <Reveal><Eyebrow center>{es ? 'Cuando quieras' : 'Ready when you are'}</Eyebrow></Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginTop: 16 }}>
                {es
                  ? <>Construyamos experiencias <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>que la gente recuerde.</em></>
                  : <>Let's build experiences <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>people remember.</em></>}
              </h2>
            </Reveal>
            <Reveal delay={200}><p style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.7 }}>{es ? 'Ya seas una startup, una marca de fitness o un fundador con visión — creemos algo extraordinario juntos.' : "Whether you're a startup, a fitness brand, or a bold founder — let's create something extraordinary together."}</p></Reveal>
            <Reveal delay={300}>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}>
                <Btn variant="accent" size="lg" onClick={() => setPage('contact')}>{es ? 'Iniciar un proyecto →' : 'Start a project →'}</Btn>
                <Btn variant="outline" size="lg" href="mailto:info@yaczoe.com">cyabittner@gmail.com</Btn>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              {[
                { 
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  label: 'LinkedIn', 
                  href: 'https://www.linkedin.com/in/claudiabittner' 
                },
                { 
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                  label: 'Github', 
                  href: 'https://github.com/ClauYA' 
                },
                { 
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#006BFF"><path d="M11.5 2C6.261 2 2 6.261 2 11.5S6.261 21 11.5 21 21 16.739 21 11.5 16.739 2 11.5 2zm0 1.5c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-.5 2.5c-.276 0-.5.224-.5.5v5c0 .133.053.26.146.354l3 3c.195.195.512.195.707 0s.195-.512 0-.707L11.5 11.293V6.5c0-.276-.224-.5-.5-.5z"/></svg>,
                  label: es ? 'Agendar llamada' : 'Book a call', 
                  href: 'https://calendly.com/cyabittner/coffee-chats' 
                },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
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