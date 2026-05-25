import { useRef, useState, useEffect } from 'react';

export default function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold, rootMargin: '0px 0px -40px 0px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}