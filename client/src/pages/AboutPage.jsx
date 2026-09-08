import { useContext, useState, useEffect } from 'react';
import { AppCtx }     from '../context/AppContext';


import Eyebrow       from '../components/ui/Eyebrow';
import Btn           from '../components/ui/Btn';
import Reveal        from '../components/ui/Reveal';
import Container     from '../components/ui/Container';
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
                    ? <>Hablo ambos idiomas: <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>usuarios y código.</em></>
                    : <>I speak both languages: <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>users and code.</em></>}
                </h1>
                <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.72, maxWidth: 640 }}>
                  {es
                    ? 'Empecé en Ingeniería en Computación, así que siempre me he sentido tan cómoda en el código como en un archivo de Figma. El diseño de producto es donde ambos mundos se encuentran: investigo y diseño la experiencia, y luego la construyo en código cuando el proyecto lo pide. Eso significa que lo que diseño es realmente construible — porque más de una vez, soy yo quien lo construye.'
                    : "I started in Computer Engineering, so I've always been as comfortable in a codebase as in a Figma file. Product design is where the two meet: I research and design the experience, then build it in code when the project calls for it. That means the things I design are actually buildable — because more than once, I'm the one who builds them."}
                </p>
                <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                  {es
                    ? 'Después de mudarme a Estados Unidos, exploré distintos caminos y empecé a cuestionarme si la tecnología seguía siendo mi lugar. Descubrir el diseño UX/UI lo cambió todo. Me permitió combinar mi base técnica con algo que siempre me había gustado: entender a las personas.'
                    : 'After moving to the United States, I explored different paths and began questioning whether technology was still where I belonged. Discovering UX/UI Design changed that. It allowed me to combine my technical foundation with something I had always enjoyed: understanding people.'}
                </p>
                <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                 {es
                    ? 'Hoy diseño productos que no solo son funcionales y viables de construir, sino también significativos, intuitivos y centrados en las personas.'
                    : 'Today, I design products that are not only functional and feasible to build, but also meaningful, intuitive, and human-centered.'}
                </p>
                 <p className="anim-fadeup d300" style={{ fontSize: '1rem', color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.72 }}>
                {es
                    ? 'Cuando no estoy diseñando, probablemente me encuentres levantando pesas, experimentando en la cocina, ayudando a alguien a mejorar sus hábitos de fitness, o pasando tiempo con niños — que me recuerdan constantemente que la curiosidad es una de las herramientas de diseño más poderosas que tenemos.'
                    : "When I'm not designing, you'll probably find me lifting weights, experimenting in the kitchen, helping someone improve their fitness habits, or spending time with kids — who constantly remind me that curiosity is one of the most powerful design tools we have."}
                </p>
                <div className="anim-fadeup d400" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, alignItems: 'center' }}>
                  <Btn variant="solid" onClick={() => setPage('contact')}>{es ? 'Trabaja conmigo →' : 'Work with me →'}</Btn>
                  <ResumeBtn size="md" />
                </div>
              </div>

              {/* Philosophy */}
              <Reveal>
                <Eyebrow>{es ? 'Como diseño y construyo' : 'How I design and build'}</Eyebrow>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, marginTop: 12, marginBottom: 24, letterSpacing: '-.02em' }}>{es ? 'Lo que me guia.' : 'What guides me.'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                  {(es
                    ? [
                        ['01', 'Usuarios reales, no suposiciones', 'Cada decisión empieza con investigación: entrevistas, análisis de datos, pruebas de usabilidad. Si no puedo explicar por qué algo funciona con evidencia, no lo incluyo.'],
                        ['02', 'Sistemas, no pantallas sueltas', 'Construyo componentes reutilizables en React y patrones consistentes en Figma. Documentación clara, props bien definidas, tokens de diseño. Así el producto escala sin volverse deuda técnica.'],
                        ['03', 'Construible desde el día uno', 'Como escribo el código, diseño pensando en restricciones reales: rendimiento, arquitectura de datos, APIs. No entrego mockups que viven en Figma para siempre.'],
                        ['04', 'Resultados sobre estética', 'No diseño para ganar premios. Diseño para convertir, retener y resolver problemas reales. Si una interfaz es hermosa pero nadie la usa, fallé.'],
                      ]
                    : [
                        ['01', 'Real users, not assumptions', 'Every decision starts with research: interviews, data analysis, usability tests. If I can\'t explain why something works with evidence, it doesn\'t make the cut.'],
                        ['02', 'Systems, not isolated screens', 'I build reusable React components and consistent Figma patterns. Clear documentation, well-defined props, design tokens. So the product scales without becoming technical debt.'],
                        ['03', 'Buildable from day one', 'Since I write the code, I design with real constraints in mind: performance, data architecture, APIs. I don\'t hand off mockups that live in Figma forever.'],
                        ['04', 'Outcomes over aesthetics', 'I don\'t design to win awards. I design to convert, retain, and solve real problems. If an interface is beautiful but nobody uses it, I failed.'],
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
                    ['Design', [
                      { name: 'Figma', cat: 'Design', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 5.5A3.5 3.5 0 1 0 8.5 9H12V5.5A3.5 3.5 0 1 0 5 5.5z" fill="#F24E1E"/><path d="M5 12a3.5 3.5 0 1 0 3.5 3.5V12H5z" fill="#A259FF"/><path d="M8.5 15.5A3.5 3.5 0 1 0 12 12v3.5z" fill="#0ACF83"/><path d="M12 5.5V9h3.5A3.5 3.5 0 1 0 12 5.5z" fill="#FF7262"/><path d="M15.5 9H12v3.5A3.5 3.5 0 1 0 15.5 9z" fill="#1ABCFE"/></svg> },
                      { name: 'Adobe XD', cat: 'Design', icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#470137"/><path d="M7 17L9.5 7H11L13.5 17H12L11.2 14H8.8L8 17H7ZM9.2 12.5H10.8L10 9.5L9.2 12.5ZM15 7H17V17H15V7Z" fill="#FF61F6"/></svg> },
                    ]],
                    ['Front-end', [
                      { name: 'React', cat: 'Frontend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/></svg> },
                      { name: 'Angular', cat: 'Frontend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2L3 7l1.5 12L12 22l7.5-3L21 7L12 2zm0 2.5l5.5 10h-2l-1-2.5h-5l-1 2.5h-2L12 4.5zm2 6l-2-4.5-2 4.5h4z" fill="#DD0031"/></svg> },
                      { name: 'HTML', cat: 'Frontend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z" fill="#E34F26"/><path d="M17.12 5H6.88l.24 3h10l-.48 5.5L12 15l-4.64-1.5-.16-2h-2l.32 3.5L12 17l6.48-2L19 5z" fill="#fff"/></svg> },
                      { name: 'CSS', cat: 'Frontend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" fill="#1572B6"/><path d="M17.12 5H6.88l.24 3h10l-.48 5.5L12 15l-4.64-1.5-.16-2h-2l.32 3.5L12 17l6.48-2L19 5z" fill="#fff"/></svg> },
                      { name: 'Git', cat: 'Dev', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M23.546 10.93L13.067.452a1.548 1.548 0 00-2.188 0L8.708 2.627l2.76 2.76a1.837 1.837 0 012.328 2.338l2.66 2.66a1.837 1.837 0 11-1.103 1.116l-2.48-2.48v6.525a1.837 1.837 0 11-1.532-.04V8.835a1.837 1.837 0 01-.997-2.41L7.636 3.7.45 10.881a1.548 1.548 0 000 2.189l10.48 10.477a1.548 1.548 0 002.186 0l10.43-10.43a1.548 1.548 0 000-2.187" fill="#F05032"/></svg> },
                    ]],
                    ['Backend', [
                      { name: 'Laravel', cat: 'Backend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.071.26-.186.326l-4.323 2.49v4.934c0 .135-.071.26-.186.326L9.927 23.57a.363.363 0 01-.364 0L.555 18.755a.373.373 0 01-.186-.326V8.028a.37.37 0 01.186-.326l4.506-2.596a.37.37 0 01.372 0l4.506 2.596a.373.373 0 01.186.326v9.303l3.761-2.166V10.23a.37.37 0 01.186-.326l4.506-2.596a.37.37 0 01.372 0z" fill="#FF2D20"/></svg> },
                      { name: 'Django', cat: 'Backend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M11.146 0h3.924v18.166c-2.013.37-3.491.536-5.096.536-4.791 0-7.19-2.166-7.19-6.498 0-4.07 2.56-6.53 6.787-6.53.652 0 1.106.052 1.579.166V0zm0 9.083c-.42-.134-.767-.186-1.31-.186-2.146 0-3.22 1.227-3.22 3.65 0 2.372 1.025 3.516 3.168 3.516.453 0 .827-.032 1.362-.104V9.083zm-6.755 9.08h-3.92V9.198c0-2.424-.166-3.568-.62-4.66h3.924c.217 1.227.318 2.268.318 4.66v8.965zm14.33 0h-3.924V9.198c0-2.424-.166-3.568-.62-4.66h3.924c.217 1.227.318 2.268.318 4.66v8.965zm-3.924-18.166h3.924v3.924h-3.924V0z" fill="#092E20"/></svg> },
                      { name: 'Node.js', cat: 'Backend', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.935-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.036.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.794-5.076a.277.277 0 00.134-.237V6.991a.28.28 0 00-.137-.242l-8.791-5.075a.278.278 0 00-.271 0L3.075 6.75a.28.28 0 00-.139.24v10.08a.27.27 0 00.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.822c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v9.986c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.31-1.328A1.85 1.85 0 011.35 17.07V6.99a1.86 1.86 0 01.922-1.604l8.794-5.082a1.87 1.87 0 011.843 0l8.794 5.082a1.85 1.85 0 01.922 1.604v10.08a1.86 1.86 0 01-.922 1.604l-8.794 5.082a1.85 1.85 0 01-.922.247z" fill="#339933"/></svg> },
                      { name: 'MySQL', cat: 'Database', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M18.86 8.57s.78-1.22.46-2.07c-.32-.85-1.14-1.39-2.75-1.39H8.43c-1.61 0-2.43.54-2.75 1.39-.32.85.46 2.07.46 2.07s-1.14.68-1.14 1.86v4.14c0 1.18 1.14 1.86 1.14 1.86s-.78 1.22-.46 2.07c.32.85 1.14 1.39 2.75 1.39h8.14c1.61 0 2.43-.54 2.75-1.39.32-.85-.46-2.07-.46-2.07s1.14-.68 1.14-1.86v-4.14c0-1.18-1.14-1.86-1.14-1.86z" fill="#4479A1"/></svg> },
                      { name: 'PostgreSQL', cat: 'Database', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3v4c0 1.66-1.34 3-3 3s-3-1.34-3-3V8c0-1.66 1.34-3 3-3z" fill="#336791"/></svg> },
                    ]],
                    ['Languages', [
                      { name: 'PHP', cat: 'Language', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.4L7.2 16.8l-.6-3.6-1.2 3.6L3 16.2l2.4-7.8 2.4.6.6 3.6 1.2-3.6 2.4.6-2.4 7.8zm8.4 0l-2.4-.6-.6-3.6-1.2 3.6-2.4-.6 2.4-7.8 2.4.6.6 3.6 1.2-3.6 2.4.6-2.4 7.8z" fill="#777BB4"/></svg> },
                      { name: 'JavaScript', cat: 'Language', icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" fill="#F7DF1E"/><path d="M6 18l1.5-1.5c.3.6.6.9 1.2.9.6 0 .9-.3.9-1.2V10.5h2.1v5.7c0 1.8-.9 2.7-2.4 2.7-1.2 0-2.1-.6-2.4-1.8zM13.5 18l1.5-1.5c.3.6.9 1.2 1.8 1.2.9 0 1.2-.3 1.2-.9 0-.6-.6-.9-1.5-1.2-.6-.3-1.2-.6-1.2-1.5 0-.9.6-1.5 1.8-1.5.6 0 1.2.3 1.5.6l-.9 1.2c-.3-.3-.6-.6-1.2-.6-.6 0-.9.3-.9.6 0 .3.3.6 1.2.9.9.3 1.5.6 1.5 1.5 0 .9-.6 1.8-2.1 1.8-1.2 0-2.1-.6-2.4-1.5z" fill="#000"/></svg> },
                      { name: 'TypeScript', cat: 'Language', icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" fill="#3178C6"/><path d="M5 11.5h3v7.5H5v-7.5zm1.5-5.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5S4 10 4 8.5 5 6 6.5 6z" fill="#fff"/><path d="M13 11.5h3v7.5h-3v-7.5zm1.5-5.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5-2.5-1-2.5-2.5 1-2.5 2.5-2.5z" fill="#fff"/></svg> },
                      { name: 'Python', cat: 'Language', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C6.48 2 6 4 6 6v2h6v1H4c-2 0-4 1-4 5s2 5 4 5h2v-3c0-2 1-3 3-3h6c2 0 3-1 3-3V6c0-2-1-4-6-4zm-3 2c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z" fill="#3776AB"/><path d="M12 22c5.52 0 6-2 6-4v-2h-6v-1h8c2 0 4-1 4-5s-2-5-4-5h-2v3c0 2-1 3-3 3H9c-2 0-3 1-3 3v4c0 2 1 4 6 4zm3-2c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" fill="#FFD43B"/></svg> },
                      { name: 'Java', cat: 'Language', icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M8.85 18.85c-.6.6 1.5 1 2.5 1 2 0 4-.5 5.5-1.5l.5.5c-1.5 1.5-4 2-6 2-1.5 0-2.5-.5-2.5-1 0-.5.5-1 1-1l-1 0zm9-2.5c.5.5-.5 1-1 1.5-1 .5-2 1-3.5 1-2 0-3.5-.5-4.5-1.5l.5-.5c1 1 2.5 1.5 4 1.5 1.5 0 2.5-.5 3-1l1.5-1zM14 14c-2.5 1-5 1-6.5.5-1-.5-1-1 0-1.5l1-.5c-.5.5-.5 1 0 1 1 .5 3 .5 5-.5l.5 1z" fill="#007396"/></svg> },
                    ]],
                   
                  ].map(([group, tools], gi) => (
                    <div key={group} style={{ marginTop: gi === 0 ? 12 : 32 }}>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.4vw,2rem)', fontWeight: 400, marginBottom: 16, letterSpacing: '-.02em' }}>
                        {es 
                          ? (group === 'Design' ? 'Diseño' : group === 'Front-end' ? 'Front-end' : group === 'Backend' ? 'Backend' : group === 'Languages' ? 'Lenguajes' : 'Analítica')
                          : group}
                      </h2>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 10 }}>
                        {tools.map(({ icon, name, cat }) => (
                          <div key={name}
                            style={{ padding: '18px 12px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all .2s', cursor: 'default' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-sage)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{icon}</div>
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
