import { useState, useEffect, useRef } from 'react';

/**
 * <Typewriter /> — escribe cada frase letra por letra, hace una pausa,
 * la borra, y pasa a la siguiente en bucle infinito.
 *
 * Props:
 *   phrases          string[]  frases a mostrar (obligatorio)
 *   typingSpeed      ms entre cada letra al escribir   (default 80)
 *   deletingSpeed    ms entre cada letra al borrar      (default 40)
 *   pauseAfterTyping ms de pausa con la frase completa  (default 1500)
 *   pauseBeforeNext  ms de pausa antes de la siguiente   (default 300)
 *   className        clases CSS opcionales para el texto
 *
 * Accesibilidad: respeta `prefers-reduced-motion`. Si está activo,
 * muestra solo la primera frase sin animar.
 */
export default function Typewriter({
  phrases = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterTyping = 1500,
  pauseBeforeNext = 300,
  className = '',
}) {
  const [text, setText] = useState('');       // texto visible ahora mismo
  const [index, setIndex] = useState(0);       // índice de la frase actual
  const [deleting, setDeleting] = useState(false); // ¿escribiendo o borrando?

  // ¿El usuario pidió menos movimiento? Se calcula una sola vez.
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ).current;

  useEffect(() => {
    // Si no hay frases o se prefiere menos movimiento, no animamos.
    if (reduceMotion || phrases.length === 0) return;

    const current = phrases[index];
    let timer;

    if (!deleting && text === current) {
      // Frase completa → esperar y empezar a borrar.
      timer = setTimeout(() => setDeleting(true), pauseAfterTyping);
    } else if (deleting && text === '') {
      // Frase borrada → esperar y pasar a la siguiente (en bucle).
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, pauseBeforeNext);
    } else {
      // Escribir o borrar un carácter.
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timer = setTimeout(
        () => setText(next),
        deleting ? deletingSpeed : typingSpeed
      );
    }

    // Limpieza: cancela el timer en cada render y al desmontar (evita fugas).
    return () => clearTimeout(timer);
  }, [
    text, deleting, index, phrases,
    typingSpeed, deletingSpeed, pauseAfterTyping, pauseBeforeNext,
    reduceMotion,
  ]);

  // Con reduced-motion mostramos la primera frase fija.
  const display = reduceMotion ? (phrases[0] ?? '') : text;

  return (
    <span className={className}>
      {display}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}
