import { useState, useEffect } from 'react';

// Add startTyping to your props
export default function HeroTerminal({ darkMode, onContactClick, startTyping }) {
  const [text, setText] = useState('');
  const fullText = "CS + Business @ Oregon State University, Honors College | September 2025 – June 2028";

  useEffect(() => {
    // DO NOT start typing until the intro screen is dismissed
    if (!startTyping) return;

    let i = 0;
    setText(''); // Reset text when typing starts

    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50); // Adjust speed here

    return () => clearInterval(timer);
  }, [startTyping]); // Re-run effect when startTyping changes

  return (
    // ... your existing HeroTerminal JSX
    <div className={`font-mono ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
      {text}
      <span className="animate-pulse">_</span>
    </div>
  );
}