export default function Eyebrow({ children, center, sage }) {
  const color = sage ? 'var(--sage)' : 'var(--accent)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      justifyContent: center ? 'center' : undefined,
      fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '.14em', textTransform: 'uppercase', color,
    }}>
      {!center && (
        <span style={{ width: 22, height: 2, background: color, borderRadius: 2, flexShrink: 0, display: 'inline-block' }} />
      )}
      {children}
    </div>
  );
}