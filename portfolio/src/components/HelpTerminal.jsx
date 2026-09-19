import { useState, useRef, useEffect } from 'react';

// Web Audio API Synthesizer for Mechanical Keyboard Clicks
const playKeyClick = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // White noise burst for switch mechanical snap
    const bufferSize = ctx.sampleRate * 0.012;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to model mechanical switch body thock
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 + Math.random() * 500, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.012);
  } catch {
    // Fallback if browser audio context requires interaction
  }
};

const COMMAND_MAP = {
  'show coursework': { targetPage: 'coursework', sectionId: null, label: 'coursework page' },
  'show credentials': { targetPage: 'home', sectionId: 'credentials', label: 'credentials section' },
  'show awards': { targetPage: 'home', sectionId: 'credentials', label: 'credentials section' },
  'show honors': { targetPage: 'home', sectionId: 'credentials', label: 'credentials section' },
  'show experience': { targetPage: 'home', sectionId: 'experience', label: 'experience section' },
  'show projects': { targetPage: 'home', sectionId: 'projects', label: 'projects section' },
  'show contact information': { targetPage: 'contact', sectionId: null, label: 'contact page' },
  'show contact': { targetPage: 'contact', sectionId: null, label: 'contact page' },
};

const AVAILABLE_COMMANDS = Object.keys(COMMAND_MAP);

export default function HelpTerminal({ onNavigate, onBack, darkMode }) {
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Ask Diya about coursework, credentials, awards, honors, experience, projects, or contact information.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const filteredSuggestions = AVAILABLE_COMMANDS.filter((cmd) =>
    cmd.toLowerCase().includes(input.trim().toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [input]);

  const typeOutText = (text, type = 'system', onComplete = null) => {
    setIsTyping(true);
    let currentText = '';
    let index = 0;

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
    }, 28);
  };

  const executeCommand = (cmdToRun) => {
    const cleanCmd = cmdToRun.trim().toLowerCase();
    setShowDropdown(false);
    setInput('');

    const userLine = `diya@portfolio ~ % ${cleanCmd}`;
    setHistory((prev) => [...prev, { type: 'user', text: userLine }]);

    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    const matched = COMMAND_MAP[cleanCmd];

    if (matched) {
      const response = `Sounds good! :) Let me bring you over to the [${matched.label}].`;
      typeOutText(response, 'success', () => {
        setTimeout(() => {
          onNavigate(matched.targetPage, matched.sectionId);
        }, 800);
      });
    } else {
      const errorMsg = `Request failed as command '${cleanCmd}' doesn't exist.`;
      typeOutText(errorMsg, 'error');
    }
  };

  const handleKeyDown = (e) => {
    if (isTyping) return;

    if (showDropdown && filteredSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const selected = filteredSuggestions[selectedIndex];
        if (selected) setInput(selected);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredSuggestions[selectedIndex] || input;
        executeCommand(selected);
        return;
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
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
        <span>←</span> back to home
      </button>

      <div
        className={`border rounded-xl shadow-2xl overflow-hidden transition-colors duration-500 relative ${
          darkMode ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header Bar */}
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
        <div className="p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-3 text-sm relative">
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
          <div className="relative pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(input);
              }}
              className="flex items-center gap-2"
            >
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
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowDropdown(true);
                  playKeyClick();
                }}
                onKeyDown={handleKeyDown}
                placeholder="[type command...]"
                className={`w-full bg-transparent outline-none font-mono text-sm ${
                  darkMode ? 'text-white placeholder-neutral-600' : 'text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </form>

            {/* Dropdown Commands Menu */}
            {showDropdown && filteredSuggestions.length > 0 && !isTyping && (
              <div
                className={`absolute left-0 right-0 top-full mt-2 z-50 border rounded-lg shadow-2xl p-2 overflow-hidden transition-all ${
                  darkMode
                    ? 'bg-neutral-950 border-emerald-500/40 text-neutral-200'
                    : 'bg-white border-emerald-500/50 text-neutral-800 shadow-xl'
                }`}
              >
                <div
                  className={`text-[10px] uppercase font-bold px-3 py-1 mb-1 border-b ${
                    darkMode ? 'text-neutral-500 border-neutral-800' : 'text-neutral-400 border-neutral-200'
                  }`}
                >
                  Commands List (Use ↑ ↓ or click to execute)
                </div>
                <div className="max-h-48 overflow-y-auto space-y-0.5">
                  {filteredSuggestions.map((cmd, idx) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                        idx === selectedIndex
                          ? darkMode
                            ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                            : 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-300'
                          : darkMode
                          ? 'hover:bg-neutral-900 text-neutral-300'
                          : 'hover:bg-slate-100 text-neutral-700'
                      }`}
                    >
                      <span>$ {cmd}</span>
                      <span className="text-[10px] opacity-60">→ {COMMAND_MAP[cmd].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}