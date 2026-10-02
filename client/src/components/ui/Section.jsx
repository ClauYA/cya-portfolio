export default function Section({ children, bg, style: extra }) {
  return (
    <section style={{ padding: 'clamp(40px,5vw,80px) 0', background: bg, ...extra }}>
      {children}
    </section>
  );
}