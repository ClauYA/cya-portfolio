export default function Container({ children, style: extra }) {
  return (
    <div style={{
      width: '100%', maxWidth: 1200,
      margin: '0 auto',
      padding: '0 clamp(24px,5vw,64px)',
      ...extra,
    }}>
      {children}
    </div>
  );
}