/* Availability Dot */
export default function AvailDot({ text = 'Available for Projects or Full-Time Roles' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 9999, background: 'var(--bg-card)', border: '1px solid var(--border-m)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--ink-2)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse-dot 2.4s ease infinite' }} />
      {text}
    </div>
  );
}