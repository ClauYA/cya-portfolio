import Eyebrow from './Eyebrow';
import Reveal  from './Reveal';

export default function SectionHeader({ eyebrow, heading, sub, center, sage, marginBottom = 56 }) {
  return (
    <div style={{ textAlign: center ? 'center' : undefined, marginBottom }}>
      <Reveal>
        <Eyebrow center={center} sage={sage}>{eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginTop: 14, color: 'var(--ink)' }}>
          {heading}
        </h2>
        {sub && (
          <p style={{ fontSize: 'clamp(1rem,1.6vw,1.1rem)', color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.72, maxWidth: center ? 520 : undefined, margin: center ? '14px auto 0' : '14px 0 0' }}>
            {sub}
          </p>
        )}
      </Reveal>
    </div>
  );
}