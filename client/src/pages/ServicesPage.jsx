import { useContext } from 'react';
import { AppCtx }   from '../context/AppContext';
import { SERVICES } from '../data/skills';

import Eyebrow       from '../components/ui/Eyebrow';
import Btn           from '../components/ui/Btn';
import Tag           from '../components/ui/Tag';
import Reveal        from '../components/ui/Reveal';
import Container     from '../components/ui/Container';
import Section       from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Footer        from '../components/Footer';

export default function ServicesPage() {
  const { setPage, lang } = useContext(AppCtx);
  const es = lang === 'es';

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ padding: 'clamp(64px,7vw,110px) 0 clamp(40px,5vw,64px)' }}>
        <Container>
          <div className="anim-fadeup"><Eyebrow>{es ? 'Lo que ofrezco' : 'What I offer'}</Eyebrow></div>
          <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
            {es
              ? <>Servicios de diseño <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>hechos para escalar.</em></>
              : <>Design services <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>built to scale.</em></>}
          </h1>
          <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.7, maxWidth: 560 }}>
            {es
              ? 'Desde el descubrimiento inicial hasta el producto lanzado — capacidad de diseño de punta a punta para startups, equipos de producto y marcas que quieren crecer.'
              : 'From early discovery to shipped product — end-to-end design capability for startups, product teams, and brands that want to grow.'}
          </p>
        </Container>
      </section>

      <Section style={{ padding: '0 0 clamp(80px,10vw,160px)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div
                  style={{ position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 22, padding: 36, display: 'flex', flexDirection: 'column', gap: 16, transition: 'all .3s', overflow: 'hidden', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--sh-xl)'; e.currentTarget.querySelector('.bar').style.transform = 'scaleX(1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.querySelector('.bar').style.transform = 'scaleX(0)'; }}>
                  <div className="bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: i % 2 === 0 ? 'var(--accent)' : 'var(--sage)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(0,0,0.2,1)' }} />
                  <div style={{ fontSize: '2rem' }}>{s.icon}</div>
                  <Tag variant={i % 2 === 0 ? 'accent' : 'sage'} style={{ width: 'fit-content' }}>{es ? (s.label_es || s.label) : s.label}</Tag>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, letterSpacing: '-.015em', lineHeight: 1.15 }}>{es ? (s.name_es || s.name) : s.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{es ? (s.desc_es || s.desc) : s.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {(es ? (s.items_es || s.items) : s.items).map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                        <span style={{ color: i % 2 === 0 ? 'var(--accent)' : 'var(--sage)', fontSize: '0.75rem', marginTop: 3 }}>→</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="var(--bg-card)">
        <Container>
          <SectionHeader center eyebrow={es ? 'Mi proceso' : 'My process'} heading={es ? 'Cómo trabajo.' : 'How I work.'} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
            {(es
              ? [
                  ['Descubrir','Investigación profunda de usuarios, mercado y contexto de negocio. Hago las preguntas incómodas antes de abrir Figma.'],
                  ['Definir',  'Sintetizo los hallazgos en problemas claros, personas y principios de diseño.'],
                  ['Diseñar',  'Ideación rápida → wireframes → UI de alta fidelidad. Testeo iterativo en cada etapa.'],
                  ['Entregar', 'Entrega lista para desarrollo con specs, documentación y componentes del sistema de diseño. Sigo presente después del lanzamiento.'],
                ]
              : [
                  ['Discover','Deep research into users, market, and business context. I ask uncomfortable questions before I open Figma.'],
                  ['Define',  'Synthesize insights into clear problem statements, personas, and design principles.'],
                  ['Design',  'Rapid ideation → wireframes → high-fidelity UI. Iterative testing at every stage.'],
                  ['Deliver', 'Developer-ready handoff with specs, docs, and design system components. I stay engaged post-launch.'],
                ]
            ).map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 22, padding: 28, transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; e.currentTarget.style.borderColor = i % 2 === 0 ? 'var(--accent)' : 'var(--sage)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: 1, color: 'var(--border-s)', marginBottom: 20, fontWeight: 400 }}>0{i + 1}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{t}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <section style={{ padding: 'clamp(80px,10vw,120px) 0', textAlign: 'center' }}>
        <Container>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, letterSpacing: '-.02em', marginBottom: 24 }}>{es ? '¿Listo para empezar un proyecto?' : 'Ready to start a project?'}</h2>
            <Btn variant="accent" size="lg" onClick={() => setPage('contact')}>{es ? 'Hablemos →' : "Let's Talk →"}</Btn>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </div>
  );
}