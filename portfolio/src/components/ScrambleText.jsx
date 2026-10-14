import { useState, useEffect, useRef } from 'react';

const CHARS = '0189ABCDEF<>/[]{}';

export default function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const hasScrambled = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrambled.current) {
          setInView(true);
          hasScrambled.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [inView, text]);

  return <span ref={ref} className="inline-block">{displayText}</span>;
}