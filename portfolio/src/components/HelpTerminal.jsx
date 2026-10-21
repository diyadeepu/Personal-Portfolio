import { useState, useEffect, useRef } from 'react';
import { playTypingClack } from '../utils/audioManager';

// Individual line typewriter
const TypewriterLine = ({ text, onComplete }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        if (text[i] !== ' ') playTypingClack(); // Skip sound on spaces for organic feel
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 20); // Typing speed: 20ms per character

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span>{displayed}</span>;
};

// Orchestrates the typing of multiple lines sequentially
const AnimatedResponse = ({ lines, finalNode, onFinish }) => {
  const [activeLine, setActiveLine] = useState(0);

  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        if (idx > activeLine) return null;
        return (
          <p key={idx} className={line.className}>
            {idx === activeLine ? (
              <TypewriterLine
                text={line.text}
                onComplete={() => {
                  if (idx === lines.length - 1) {
                    if (onFinish) onFinish();
                  } else {
                    setActiveLine((prev) => prev + 1);
                  }
                }}
              />
            ) : (
              <span>{line.text}</span>
            )}
          </p>
        );
      })}
      {activeLine === lines.length - 1 && finalNode && (
        <div className="mt-2 animate-in fade-in duration-500">{finalNode}</div>
      )}
    </div>
  );
};

export default function HelpTerminal({ darkMode, onNavigate, onBack }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: (
        <div className="space-y-2">
          <p>Initialize Diya_OS (v2.0.26) ... [ OK ]</p>
          <p>Loading NLP Command Module ... [ OK ]</p>
          <p className={`font-bold mt-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Welcome to the AI Command Line Interface.
          </p>
          <p>Type <span className="text-blue-400">help</span> to see available commands.</p>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmdText) => {
    const command = cmdText.trim().toLowerCase();
    if (!command) return;

    setHistory((prev) => [...prev, { type: 'user', content: `> ${command}` }]);
    setInput('');
    setIsProcessing(true); // Lock input until typing finishes

    // Trigger physical file download
    if (['get resume', 'curl resume', 'download resume'].includes(command)) {
      const link = document.createElement('a');
      link.href = `${import.meta.env.BASE_URL}Diya_Deepu_Resume.pdf`;
      link.download = 'Diya_Deepu_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setTimeout(() => {
      let lines = [];
      let finalNode = null;

      switch (command) {
        case 'help':
        case 'ls':
          lines = [
            { text: "Available commands:", className: "" },
            { text: "• whoami        Display user profile", className: "ml-2" },
            { text: "• navigate      List accessible directories", className: "ml-2" },
            { text: "• get resume    Download resume.pdf", className: "ml-2" },
            { text: "• clear         Clear terminal history", className: "ml-2" }
          ];
          break;

        case 'whoami':
          lines = [
            { text: "Diya Deepu", className: "font-bold" },
            { text: "Undergraduate Honors student at Oregon State University pursuing a B.S. in Computer Science with a minor in Business.", className: "" },
            { text: "Actively seeking undergraduate SWE and Product Management internships.", className: "" },
            { text: "Status: Available", className: "text-green-500 font-bold" }
          ];
          break;

        case 'navigate':
        case 'cd':
        case 'dir':
          lines = [{ text: "Select a directory to navigate to:", className: "" }];
          finalNode = (
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => onNavigate('home', 'experience')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/experience</button>
              <button onClick={() => onNavigate('home', 'projects')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/projects</button>
              <button onClick={() => onNavigate('coursework')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/coursework</button>
              <button onClick={() => onNavigate('contact')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/contact</button>
            </div>
          );
          break;

        case 'get resume':
        case 'curl resume':
        case 'download resume':
          lines = [{ text: "[SUCCESS] Triggering download sequence for resume.pdf...", className: darkMode ? 'text-emerald-400' : 'text-emerald-600' }];
          break;

        case 'clear':
          setHistory([]);
          setIsProcessing(false);
          return;

        case 'sudo hire':
        case 'sudo hire diya':
          lines = [
            { text: "[AUTHORIZATION GRANTED]", className: "text-emerald-500" },
            { text: "Generating offer letter...", className: "" }
          ];
          finalNode = (
            <button onClick={() => onNavigate('contact')} className="mt-2 border px-3 py-1 rounded bg-emerald-500 text-black font-bold hover:bg-emerald-400 cursor-none">
              Proceed to Contact Page ↗
            </button>
          );
          break;

        default:
          lines = [{ text: `Command not found: '${command}'. Type 'help' to view available commands.`, className: "text-red-400" }];
      }

      // Append the animated response to the history
      setHistory((prev) => [
        ...prev,
        {
          type: 'system',
          content: (
            <AnimatedResponse
              lines={lines}
              finalNode={finalNode}
              onFinish={() => setIsProcessing(false)} // Unlock input when typing is done
            />
          )
        }
      ]);
    }, 400); // Small AI thinking delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section className="w-full max-w-3xl font-mono relative flex flex-col h-[70vh] sm:h-[80vh]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs transition-colors cursor-none font-bold ${
            darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
          }`}
        >
          <span>←</span> exit terminal
        </button>
        <span className={`text-xs uppercase tracking-widest font-bold ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
          AI_Shell_Session
        </span>
      </div>

      <div
        className={`flex-1 rounded-xl border overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${
          darkMode ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-white border-neutral-300'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={`flex items-center gap-2 p-3 border-b shrink-0 ${darkMode ? 'border-neutral-800 bg-[#111]' : 'border-neutral-200 bg-slate-50'}`}>
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className={`ml-2 text-xs font-semibold ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
            diya@portfolio: ~/help
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                entry.type === 'user' ? (darkMode ? 'text-white' : 'text-black') : (darkMode ? 'text-neutral-300' : 'text-neutral-700')
              }`}
            >
              {entry.content}
            </div>
          ))}

          {isProcessing && history[history.length - 1]?.type === 'user' && (
            <div className="flex gap-2 items-center text-neutral-500 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Agent reasoning...</span>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        <div className={`p-4 border-t shrink-0 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex flex-wrap gap-2 mb-4">
            {['help', 'whoami', 'navigate', 'get resume'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                disabled={isProcessing}
                className={`text-xs px-2.5 py-1 rounded-md border cursor-none transition-colors ${
                  darkMode 
                    ? 'border-neutral-700 text-neutral-400 hover:border-emerald-500 hover:text-emerald-400 bg-neutral-900/50 disabled:opacity-50' 
                    : 'border-neutral-300 text-neutral-600 hover:border-emerald-600 hover:text-emerald-600 bg-slate-50 disabled:opacity-50'
                }`}
              >
                $ {cmd}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className={`font-bold ${darkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>
              root@diyadeepu:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // Play sound when the user types a physical key
                if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
                  playTypingClack();
                }
              }}
              disabled={isProcessing}
              className={`flex-1 bg-transparent outline-none border-none cursor-none ${
                darkMode ? 'text-white' : 'text-black'
              } disabled:opacity-50`}
              spellCheck="false"
              autoComplete="off"
            />
            {!isProcessing && (
              <span className={`w-2.5 h-4 inline-block animate-pulse ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
            )}
          </form>
        </div>
      </div>
    </section>
  );
}