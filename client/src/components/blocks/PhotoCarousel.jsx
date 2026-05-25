import { useState, useEffect } from 'react';
import PHOTO1_SRC from '../../assets/foto.png';
import PHOTO2_SRC from '../../assets/ClaudiaC2.jpg';
import PHOTO3_SRC from '../../assets/ClaudiaFt.png';

export default function PhotoCarousel() {
  const photos = [
    { src: PHOTO1_SRC, alt: 'Claudia Bittner'   },
    { src: PHOTO2_SRC, alt: 'Claudia — Lifestyle'},
    { src: PHOTO3_SRC, alt: 'Claudia — Working'  },
  ];

  const [current,   setCurrent]   = useState(0);
  const [prev,      setPrev]      = useState(null);
  const [animating, setAnimating] = useState(false);
  const [paused,    setPaused]    = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo((current + 1) % photos.length), 3000);
    return () => clearInterval(timer);
  }, [current, paused]);

  function goTo(idx) {
    if (animating || idx === current) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 600);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Main frame */}
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: 22, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(0,0,0,0.14)', background: 'var(--bg-inset)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Prev photo fading out */}
        {prev !== null && (
          <img key={`prev-${prev}`} src={photos[prev].src} alt={photos[prev].alt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0, transform: 'scale(1.04)', transition: 'opacity 0.6s ease, transform 0.6s ease' }} />
        )}

        {/* Current photo */}
        <img key={`current-${current}`} src={photos[current].src} alt={photos[current].alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 1, animation: 'carouselIn 0.6s ease forwards' }} />

        {/* Gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)', zIndex: 2 }} />

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 9999, background: i === current ? '#fff' : 'rgba(255,255,255,0.45)', border: 'none', cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', padding: 0 }} />
          ))}
        </div>

        {/* Arrows */}
        {[['left', 12, '‹', () => goTo((current - 1 + photos.length) % photos.length)],
          ['right', 12, '›', () => goTo((current + 1) % photos.length)]
        ].map(([side, pos, char, fn]) => (
          <button key={side} onClick={fn}
            style={{ position: 'absolute', [side]: pos, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', zIndex: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'background 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
            {char}
          </button>
        ))}
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: 8 }}>
        {photos.map((photo, i) => (
          <div key={i} onClick={() => goTo(i)}
            style={{ flex: 1, aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: i === current ? '2.5px solid var(--accent)' : '2.5px solid transparent', opacity: i === current ? 1 : 0.55, transition: 'all 0.3s ease', transform: i === current ? 'scale(1.04)' : 'scale(1)' }}
            onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = '0.55'; }}>
            <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        ))}
      </div>
    </div>
  );
}