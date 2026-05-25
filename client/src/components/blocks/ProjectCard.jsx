import { useState } from 'react';
import Tag    from '../ui/Tag';
import Reveal from '../ui/Reveal';

export default function ProjectCard({ project, layout = 'normal', onOpen, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const isAlt  = layout === 'alt';
  const isFeat = layout === 'featured';

  const thumb = (
    <div style={{
      position: 'relative',
      background: isFeat && project.id === 'pulsetrack' ? 'linear-gradient(140deg,#1a1208,#3d2010)' : 'var(--bg-inset)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      minHeight: isFeat ? 240 : undefined,
      flex: !isFeat ? '0 0 300px' : undefined,
      order: isAlt ? 2 : 0,
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-m) 1px, transparent 1px)', backgroundSize: '18px 18px', opacity: 0.5 }} />
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem,7vw,5.5rem)', fontWeight: 400, color: hov ? 'var(--accent)' : 'var(--bg-muted)', letterSpacing: '-.05em', transition: 'color .3s, transform .4s cubic-bezier(.34,1.56,.64,1)', transform: hov ? 'scale(1.1)' : 'none', position: 'relative', zIndex: 1 }}>{project.num}</div>
      <div style={{ position: 'absolute', top: 14, left: 14 }}><Tag variant={project.tagStyle}>{project.tag}</Tag></div>
      <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500 }}>{project.year}</div>
    </div>
  );

  const body = (
    <div style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 16, flex: 1, order: isAlt ? 1 : 0 }}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
        {project.featured ? <Tag variant="accent">Read case study</Tag> : <span style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>{project.duration} · {project.year}</span>}
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: hov ? 'var(--accent)' : 'var(--bg-inset)', border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`, color: hov ? '#fff' : 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all .22s' }}>↗</div>
      </div>
    </div>
  );

  return (
    <Reveal delay={delay}>
      <div onClick={onOpen} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', flexDirection: isFeat ? 'column' : 'row',
          background: 'var(--bg-card)', border: `1px solid ${hov ? 'var(--border-m)' : 'var(--border)'}`,
          borderRadius: 22, overflow: 'hidden', cursor: 'pointer',
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