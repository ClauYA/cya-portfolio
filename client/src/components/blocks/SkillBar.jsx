import useInView from '../../hooks/useInView';

export default function SkillBar({ skill, delay = 0 }) {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 22, padding: 28, transition: 'all .3s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--accent-s)', border: '1px solid var(--accent-g)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 20, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'scale(0.8)', transition: `all .5s ease ${delay}ms` }}>{skill.icon}</div>
      <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(10px)', transition: `all .5s ease ${delay + 60}ms` }}>{skill.name}</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20, opacity: visible ? 1 : 0, transition: `all .5s ease ${delay + 120}ms` }}>{skill.desc}</p>
      <div className="skill-bar-track">
        <div className={`skill-bar-fill${visible ? ' animated' : ''}`} style={{ '--target-w': `${skill.pct}%`, transitionDelay: `${delay + 200}ms` }} />
      </div>
    </div>
  );
}