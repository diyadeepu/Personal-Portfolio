import { useState, useEffect } from 'react';

export default function HeroTerminal({ onContactClick, darkMode }) {
  const subtitleText =
    'CS + Business @ Oregon State University, Honors College | September 2025 – June 2028';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < subtitleText.length) {
        setDisplayedText(subtitleText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="w-full max-w-5xl font-mono">
      <div
        className={`border rounded-xl p-6 sm:p-8 shadow-2xl transition-colors duration-500 ${
          darkMode
            ? 'bg-black border-neutral-800 text-white'
            : 'bg-white border-neutral-300 text-neutral-900'
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b pb-4 mb-6 ${
            darkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}
        >
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span
            className={`ml-2 text-xs ${
              darkMode ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          >
            TERMINAL — zsh
          </span>
        </div>

        <div className="space-y-4">
          <p
            className={
              darkMode ? 'text-xs text-emerald-400' : 'text-xs text-emerald-600'
            }
          >
            welcome@diya-deepu ~ %{' '}
            <span
              className={darkMode ? 'text-white' : 'text-neutral-900 font-semibold'}
            >
              cat intro.txt
            </span>
          </p>

          <h1
            className={`text-3xl sm:text-5xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Diya Deepu
          </h1>

          <p
            className={`text-sm sm:text-base font-semibold min-h-[1.75rem] flex items-center ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            <span>{displayedText}</span>
            <span
              className={`animate-pulse inline-block w-2 h-4 ml-1 ${
                darkMode ? 'bg-emerald-400' : 'bg-emerald-600'
              }`}
            />
          </p>

          <p
            className={`text-sm leading-relaxed max-w-3xl ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            Honors Computer Science student minoring in Business at Oregon State
            University (4.0 GPA). Deeply passionate about full-stack software
            development, AI systems integration, and product management.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onContactClick}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                darkMode
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <span>$</span> contact --info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}