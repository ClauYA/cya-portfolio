import { useContext, useCallback } from 'react';
import { AppCtx }      from '../context/AppContext';
import { PROJECTS }    from '../data/projects';

import Eyebrow     from '../components/ui/Eyebrow';
//import Btn         from '../components/ui/Btn';
//import Reveal      from '../components/ui/Reveal';
import Container   from '../components/ui/Container';
import Footer      from '../components/Footer';
import ProjectCard from '../components/blocks/ProjectCard';

export default function ProjectsPage() {
  const { setPage, setCaseProject } = useContext(AppCtx);

  const openProject = useCallback((p) => {
    if (p.id === 'mining-royalties') {
      setPage('mining');
    } else {
      setCaseProject(p);
      setPage('casestudy');
    }
  }, [setPage, setCaseProject]);

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ padding: 'clamp(64px,7vw,110px) 0 clamp(40px,5vw,64px)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 64, alignItems: 'end' }}>
            <div>
              <div className="anim-fadeup"><Eyebrow>Portfolio</Eyebrow></div>
              <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem,6vw,4.5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
                Selected<br /><em style={{ color: 'var(--accent)' }}>Work.</em>
              </h1>
              <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.7, maxWidth: 500 }}>
                Projects spanning fitness technology, SaaS, wellness, and government — each a story from problem to elegant solution.
              </p>
            </div>
            <div className="anim-fadeup d300" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: '1.5rem' }}>🏆</span>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>5+ projects delivered</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>Across 3 years of practice</div>
                </div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Specializing in</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>Fitness Tech · SaaS · Small Business · Government</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,10vw,140px)' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                layout={p.featured ? 'featured' : i % 2 === 0 ? 'normal' : 'alt'}
                onOpen={() => openProject(p)}
                delay={i * 60}
              />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}