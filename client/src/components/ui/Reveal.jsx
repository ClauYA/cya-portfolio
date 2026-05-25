import { useRef, useState, useEffect } from 'react';

export default function Reveal({ children, delay = 0, direction = 'up', style: extra }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transforms = {
    up:    'translateY(26px)',
    left:  'translateX(-26px)',
    right: 'translateX(26px)',
    scale: 'scale(0.96)',
  };

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity .65s cubic-bezier(0,0,0.2,1) ${delay}ms, transform .65s cubic-bezier(0,0,0.2,1) ${delay}ms`,
      ...extra,
    }}>
      {children}
    </div>
  );
}