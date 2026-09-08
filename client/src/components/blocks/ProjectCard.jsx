import { useState } from 'react';
import Tag    from '../ui/Tag';
import Reveal from '../ui/Reveal';

export default function ProjectCard({ project, layout = 'normal', onOpen, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const isAlt  = layout === 'alt';
  const isFeat = layout === 'featured';

  // Detectar si es un proyecto de Web Design con links externos
  const hasExternalLinks = project.githubUrl || project.liveUrl;

  const thumb = (
    <div style={{
      position: 'relative',
      background: isFeat && project.id === 'pulsetrack' ? 'linear-gradient(140deg,#1a1208,#3d2010)' : 'var(--bg-inset)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      minHeight: isFeat ? 240 : undefined,
      flex: !isFeat ? '0 0 300px' : undefined,
      order: isAlt ? 2 : 0,
    }}>
      {project.image ? (
        <img src={project.image} alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: 12, transition: 'transform .4s cubic-bezier(.34,1.56,.64,1)', transform: hov ? 'scale(1.03)' : 'none' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-m) 1px, transparent 1px)', backgroundSize: '18px 18px', opacity: 0.5 }} />
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem,7vw,5.5rem)', fontWeight: 400, color: hov ? 'var(--accent)' : 'var(--bg-muted)', letterSpacing: '-.05em', transition: 'color .3s, transform .4s cubic-bezier(.34,1.56,.64,1)', transform: hov ? 'scale(1.1)' : 'none', position: 'relative', zIndex: 1 }}>{project.num}</div>
        </>
      )}
      <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2 }}><Tag variant={project.tagStyle}>{project.tag}</Tag></div>
      <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500, zIndex: 2 }}>{project.year}</div>
    </div>
  );

  const body = (
    <div style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 16, flex: 1, order: isAlt ? 1 : 0 }}>
      {project.badge && (
        <span style={{
          alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 9999,
          background: /web|dev|build/i.test(project.badge) ? 'var(--accent)' : 'var(--ink)',
          color: '#fff', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
        }}>{project.badge}</span>
      )}
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{project.cat}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', lineHeight: 1.15, letterSpacing: '-.015em', color: 'var(--ink)' }}>{project.title}</div>
      <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{project.summary}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {[project.role, project.duration].map((m, i) => (
          <span key={i} style={{ fontSize: '0.72rem', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-s)', display: 'inline-block' }} />} {m}
          </span>
        ))}
      </div>
      <div style={{ padding: '9px 16px', borderRadius: 8, background: 'var(--accent-s)', border: '1px solid var(--accent-g)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }}>{project.impact}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tools.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      
      {/* Footer: Botones dinámicos según el tipo de proyecto */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)', marginTop: 'auto', gap: 12, flexWrap: 'wrap' }}>
        {hasExternalLinks ? (
          // Web Design projects: GitHub + Live Demo
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '8px 16px', 
                  borderRadius: 42, 
                  background: 'var(--bg-inset)', 
                  border: '1px solid var(--border)',
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  transition: 'all .2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '8px 16px', 
                  borderRadius: 42, 
                  background: 'var(--accent)', 
                  border: '1px solid var(--accent)',
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all .2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Live Demo
                <span style={{ fontSize: '0.85rem' }}>↗</span>
              </a>
            )}
          </div>
        ) : (
          // UI Design projects: Read case study
          <>
            <Tag variant="accent">Read case study</Tag>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: hov ? 'var(--accent)' : 'var(--bg-inset)', border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`, color: hov ? '#fff' : 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all .22s' }}>↗</div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Reveal delay={delay}>
      <div 
        onClick={hasExternalLinks ? undefined : onOpen}
        onMouseEnter={() => setHov(true)} 
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', flexDirection: isFeat ? 'column' : 'row',
          background: 'var(--bg-card)', border: `1px solid ${hov ? 'var(--border-m)' : 'var(--border)'}`,
          borderRadius: 22, overflow: 'hidden', cursor: hasExternalLinks ? 'default' : 'pointer',
          transform: hov ? 'translateY(-5px)' : 'none',
          boxShadow: hov ? 'var(--sh-xl)' : 'var(--sh-sm)',
          transition: 'all .3s cubic-bezier(0,0,0.2,1)', flexWrap: 'wrap',
        }}>
        {thumb}
        {isFeat ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 0, flex: 1 }}>{body}</div> : body}
      </div>
    </Reveal>
  );
}
