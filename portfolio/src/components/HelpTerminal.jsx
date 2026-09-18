import { useState, useRef, useEffect } from 'react';

// Web Audio API synthesized keyboard click sound
const playKeyClick = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Randomize pitch slightly for organic typing sound
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300 + Math.random() * 250, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Fallback if audio context is restricted
  }
};

const VALID_COMMANDS = {
  'show projects': { name: 'projects', pageKey: 'projects' },
  'show credentials': { name: 'credentials', pageKey: 'credentials' },
  'show coursework': { name: 'coursework', pageKey: 'credentials' },
  'show contact': { name: 'contact', pageKey: 'contact' },
  'show home': { name: 'home', pageKey: 'home' },
  'show main': { name: 'home', pageKey: 'home' },
};

export default function HelpTerminal({ onNavigate, onBack, darkMode }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Ask Diya about projects, credentials, coursework, or contact.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const typeOutText = (text, type = 'system', onComplete = null) => {
    setIsTyping(true);
    let currentText = '';
    let index = 0;

    // Append an empty entry to update iteratively
    setHistory((prev) => [...prev, { type, text: '' }]);

    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        index++;
        playKeyClick();

        setHistory((prev) => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { type, text: currentText };
          return newHist;
        });
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 35);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd || isTyping) return;

    // Log the user's input line
    const userLine = `diya@portfolio ~ % ${input}`;
    setHistory((prev) => [...prev, { type: 'user', text: userLine }]);
    setInput('');

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const matchedCmd = VALID_COMMANDS[cmd];

    if (matchedCmd) {
      const response = `Sounds good! :) Let me bring you over to the [${matchedCmd.name}] page.`;
      typeOutText(response, 'success', () => {
        setTimeout(() => {
          onNavigate(matchedCmd.pageKey);
        }, 1000);
      });
    } else {
      const errorMsg = `Request failed: command '${cmd}' does not exist. Try commands like: show projects, show credentials, show coursework, show contact, show home.`;
      typeOutText(errorMsg, 'error');
    }
  };

  return (
    <section className="w-full max-w-3xl font-mono">
      <button
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
          darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
        }`}
      >
        <span>←</span> back to main
      </button>

      <div
        className={`border rounded-xl shadow-2xl overflow-hidden transition-colors duration-500 ${
          darkMode ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header Bar */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            darkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            <span
              className={`ml-2 text-xs font-bold ${
                darkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              zsh - interactive help prompt
            </span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">[zsh active]</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-3 text-sm">
          {history.map((item, i) => (
            <div
              key={i}
              className={`leading-relaxed whitespace-pre-wrap ${
                item.type === 'user'
                  ? darkMode
                    ? 'text-white font-bold'
                    : 'text-neutral-900 font-bold'
                  : item.type === 'error'
                  ? 'text-rose-500 font-medium'
                  : darkMode
                  ? 'text-emerald-400'
                  : 'text-emerald-600 font-medium'
              }`}
            >
              {item.text}
            </div>
          ))}

          {/* Interactive Input Line */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
            <span
              className={`font-bold shrink-0 ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              diya@portfolio ~ % Ask Diya about
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              placeholder="[e.g., show projects]"
              className={`w-full bg-transparent outline-none font-mono text-sm ${
                darkMode ? 'text-white placeholder-neutral-600' : 'text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}