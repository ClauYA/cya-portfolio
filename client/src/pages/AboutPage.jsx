import { useContext, useState, useEffect } from 'react';
import { AppCtx }     from '../context/AppContext';
import { TOOLS }      from '../data/about';
import { TIMELINE }   from '../data/about';

import Eyebrow       from '../components/ui/Eyebrow';
import Btn           from '../components/ui/Btn';
import Reveal        from '../components/ui/Reveal';
import Container     from '../components/ui/Container';
import AvailDot      from '../components/ui/AvailDot';
import ResumeBtn     from '../components/ui/ResumeBtn';
import Footer        from '../components/Footer';
import PhotoCarousel from '../components/blocks/PhotoCarousel';

export default function AboutPage() {
  const { setPage, lang } = useContext(AppCtx);
  const es = lang === 'es';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ padding: 'clamp(64px,7vw,110px) 0 clamp(48px,6vw,80px)' }}>
        <Container>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 'clamp(40px,7vw,80px)',
            alignItems: 'start',
          }}>

            {/* ── Columna izquierda — texto ── */}
            <div style={{
              flex: 1,
              minWidth: 0,
              order: isMobile ? 2 : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 64
            }}>

              {/* Intro */}
              <div>
                <div className="anim-fadeup"><Eyebrow>{es ? 'Mi historia' : 'My story'}</Eyebrow></div>
                <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
                  {es
                    ? <>Ingeniera de formación, <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>diseñadora por obsesión.</em></>
                    : <>Engineer by training, <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>designer by obsession.</em></>}
                </h1>
                <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.72, maxWidth: 640 }}>
                  {es
                    ? 'Empecé en Ingeniería en Computación, así que siempre me he sentido tan cómoda en el código como en un archivo de Figma. El diseño de producto es donde ambos mundos se encuentran: investigo y diseño la experiencia, y luego la construyo en código cuando el proyecto lo pide. Eso significa que lo que diseño es realmente construible — porque más de una vez, soy yo quien lo construye.'
                    : "I started in Computer Engineering, so I've always been as comfortable in a codebase as in a Figma file. Product design is where the two meet: I research and design the experience, then build it in code when the project calls for it. That means the things I design are actually buildable — because more than once, I'm the one who builds them."}
                </p>
                <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                  {es
                    ? 'Con una formación en Ingeniería en Computación, al principio pensé que mi carrera giraría en torno a construir software. Pero después de mudarme a Estados Unidos, exploré distintos caminos y empecé a cuestionar si la tecnología seguía siendo mi lugar. Descubrir el diseño UX/UI lo cambió todo.'
                    : 'With a Computer Engineering background, I originally thought my career would revolve around building software. But after moving to the United States, I explored different paths and began questioning whether technology was still where I belonged. Discovering UX/UI Design changed that.'}
                </p>
                <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                 {es
                    ? 'Me permitió combinar mi base técnica con algo que siempre había disfrutado: entender a las personas. Hoy diseño productos que no solo son funcionales y factibles de construir, sino también significativos, intuitivos y centrados en las personas.'
                    : 'It allowed me to combine my technical foundation with something I had always enjoyed: understanding people. Today, I design products that are not only functional and feasible to build, but also meaningful, intuitive, and human-centered.'}
                </p>
                 <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                {es
                    ? 'Cuando no estoy diseñando, probablemente me encuentres levantando pesas, experimentando en la cocina, ayudando a alguien a mejorar sus hábitos de fitness, o pasando tiempo con niños — que constantemente me recuerdan que la curiosidad es una de las herramientas de diseño más poderosas que tenemos.'
                    : "When I'm not designing, you'll probably find me lifting weights, experimenting in the kitchen, helping someone improve their fitness habits, or spending time with kids—who constantly remind me that curiosity is one of the most powerful design tools we have."}
                </p>
                <div className="anim-fadeup d400" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, alignItems: 'center' }}>
                  <Btn variant="solid" onClick={() => setPage('contact')}>{es ? 'Trabaja conmigo →' : 'Work with me →'}</Btn>
                  <ResumeBtn size="md" />
                </div>
              </div>

              {/* Philosophy */}
              <Reveal>
                <Eyebrow>{es ? 'Filosofía de diseño' : 'Design philosophy'}</Eyebrow>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, marginTop: 12, marginBottom: 24, letterSpacing: '-.02em' }}>{es ? 'Cómo pienso.' : 'How I think.'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
                  {(es
                    ? [
                        ['01', 'La investigación guía cada decisión', 'Empiezo con usuarios reales, dolores reales y contexto real. Cada decisión de diseño se basa en evidencia — no en suposiciones.'],
                        ['02', 'Los sistemas de diseño piensan a escala',  'Un buen diseño no es una sola pantalla — es un sistema. Construyo componentes reutilizables y patrones consistentes que escalan con el producto.'],
                        ['03', 'Construible por diseño',            'Diseño pensando en el navegador — componentes reales, restricciones reales, código real.'],
                      ]
                    : [
                        ['01', 'Research Drives Every Decision', 'I start with real users, real pain points, and real context. Every design choice is grounded in evidence — not assumptions.'],
                        ['02', 'Design Systems Think at Scale',  'Good design is not just one screen — it is a system. I build reusable components and consistent patterns that scale with the product.'],
                        ['03', 'Buildable by Design',            'I design with the browser in mind — real components, real constraints, real code.'],
                      ]
                  ).map(([n, t, d]) => (
                    <div key={n}
                      style={{ padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--border-s)', lineHeight: 1, marginBottom: 14 }}>{n}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{t}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.55 }}>{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Tools */}
              <Reveal>
                <Eyebrow sage>{es ? 'Herramientas' : 'Toolkit'}</Eyebrow>
                {[
                  ['Design', [['🎨','Figma','Design'],['✏️','Adobe XD','Design'],['⚛️','React','Frontend'],['🧪','Maze','Testing']]],
                  ['Development', [['🟨','JavaScript','Frontend'],['🌐','Django','Backend'],['🔺','Angular','Frontend'],['🐍','Python','Backend'],['🗄️','SQL/NoSQL','Database'],['📋','Git','Dev']]],
                ].map(([group, tools], gi) => (
                  <div key={group} style={{ marginTop: gi === 0 ? 12 : 32 }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.4vw,2rem)', fontWeight: 400, marginBottom: 16, letterSpacing: '-.02em' }}>{es ? (group === 'Design' ? 'Diseño' : 'Desarrollo') : group}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 10 }}>
                      {tools.map(([icon, name, cat]) => (
                        <div key={name}
                          style={{ padding: '18px 12px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all .2s', cursor: 'default' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-sage)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{icon}</div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{name}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--ink-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2 }}>{cat}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Reveal>

              <div style={{ paddingBottom: 60 }} />
            </div>

            {/* ── Columna derecha — Carrusel sticky ── */}
            <div style={{
              width: isMobile ? '100%' : 360,
              flexShrink: 0,
              order: isMobile ? 1 : 2,
              position: isMobile ? 'relative' : 'sticky',
              top: isMobile ? 'auto' : 88,
            }}>
              <Reveal direction="right">
                <PhotoCarousel />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                  {(es
                    ? [['3+','Años de experiencia'],['5+','Proyectos entregados'],['100%','Satisfacción del cliente']]
                    : [['3+','Years Experience'],['5+','Projects Delivered'],['100%','Client Satisfaction']]
                  ).map(([n, l]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--accent)' }}>{n}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500 }}>{l}</div>
                    </div>
                  ))}
                  <AvailDot text={es ? 'Disponible para nuevos proyectos' : 'Available for new work'} />
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