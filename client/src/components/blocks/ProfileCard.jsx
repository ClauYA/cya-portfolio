import { useState } from 'react';
import PHOTO_SRC from '../../assets/foto.png';

export default function ProfileCard() {
  const CARD_TAGS = [
    { label: 'UX Research',           color: '#C4611A' },
    { label: 'UI Design',             color: '#9B4DCA' },
    { label: 'Product Strategy',      color: '#1A7FC4' },
    { label: 'Health & Wellness Tech', color: '#2A8C5A' },
    { label: 'Fintech',               color: '#D97732' },
    { label: 'SaaS',                  color: '#C4611A' },
    { label: 'Government Systems',    color: '#C43A3A' },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-m)',
      borderRadius: 24, padding: '28px 24px',
      boxShadow: 'var(--sh-xl)',
      position: 'relative',
    }}>

      {/* My name badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 16px', borderRadius: 9999,
          background: 'var(--ink)', color: 'var(--ink-inv)',
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '.03em',
          textAlign: 'center', whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%',Display: 'inline-block', flexShrink: 0 }} />
          CLAUDIA BITTNER
        </div>
      </div>

      {/* Circular photo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{
          width: 200, height: 200, borderRadius: '50%',
          border: '3px solid var(--border-m)', overflow: 'hidden',
          boxShadow: '0 0 0 6px var(--bg-card), 0 0 0 9px var(--border)',
          flexShrink: 0,
        }}>
          <img
            src={PHOTO_SRC}
            alt="Claudia Bittner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

      {/* Tags — wrap naturally, centered */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {CARD_TAGS.map((tag, idx) => {
          const isHov = hovered === idx;
          return (
            <span
              key={tag.label}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 14px', borderRadius: 9999,
                fontSize: '0.78rem', fontWeight: 500,
                border: `1.5px solid ${tag.color}55`,
                color: tag.color,
                background: isHov ? `${tag.color}12` : 'transparent',
                transform: isHov ? 'translateY(-2px) scale(1.04)' : 'none',
                boxShadow: isHov ? `0 4px 14px ${tag.color}25` : 'none',
                transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                opacity: 0,
                animation: `fadeUp 0.5s cubic-bezier(0,0,0.2,1) ${idx * 60 + 300}ms forwards`,
                cursor: 'default', whiteSpace: 'nowrap',
              }}
            >
              {tag.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}