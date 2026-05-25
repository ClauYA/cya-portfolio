export default function Section({ children, bg, style: extra }) {
  return (
    <section style={{ padding: 'clamp(80px,10vw,160px) 0', background: bg, ...extra }}>
      {children}
    </section>
  );
}