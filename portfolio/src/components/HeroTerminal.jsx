import { useState, useEffect } from 'react';

export default function HeroTerminal({ onContactClick }) {
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
      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors duration-500">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
            TERMINAL — zsh
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            welcome@diya-deepu ~ %{' '}
            <span className="text-neutral-900 dark:text-white">cat intro.txt</span>
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Diya Deepu
          </h1>

          <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base font-semibold min-h-[1.75rem] flex items-center">
            <span>{displayedText}</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-emerald-600 dark:bg-emerald-400 ml-1" />
          </p>

          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed max-w-3xl">
            Honors Computer Science student minoring in Business at Oregon State University (4.0 GPA). Deeply passionate about full-stack software development, AI systems integration, and product management.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <span>$</span> contact --info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}