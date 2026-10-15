import { useState, useEffect, useRef } from 'react';
import { playTypingClack } from '../utils/audioManager';

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
          <p>Type <span className="text-blue-400">help</span> to see available commands, or use the quick actions below.</p>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when new messages appear
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmdText) => {
    const command = cmdText.trim().toLowerCase();
    if (!command) return;

    // Add user command to history
    setHistory(prev => [...prev, { type: 'user', content: `> ${command}` }]);
    setInput('');
    setIsProcessing(true);

    // FIX: Trigger the download event immediately to bypass browser popup blockers
    if (['get resume', 'curl resume', 'download resume'].includes(command)) {
      window.dispatchEvent(new CustomEvent('start-download'));
    }

    // Simulate AI / Network processing delay
    setTimeout(() => {
      let responseContent;

      switch (command) {
        case 'help':
        case 'ls':
          responseContent = (
            <div className="space-y-2">
              <p>Available commands:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><span className="font-bold">whoami</span> Display user profile</li>
                <li><span className="font-bold">navigate</span> List accessible directories (pages)</li>
                <li><span className="font-bold">get resume</span> Download resume.pdf</li>
                <li><span className="font-bold">clear</span> Clear terminal history</li>
              </ul>
            </div>
          );
          break;

        case 'whoami':
          responseContent = (
            <div className="space-y-2">
              <p className="font-bold">Diya Deepu</p>
              <p>Undergraduate Honors student at Oregon State University pursuing a B.S. in Computer Science with a minor in Business.</p>
              <p>Actively seeking undergraduate SWE and Product Management internships.</p>
              <p>Status: <span className="text-green-500">Available</span></p>
            </div>
          );
          break;

        case 'navigate':
        case 'cd':
        case 'dir':
          responseContent = (
            <div className="space-y-3">
              <p>Select a directory to navigate to:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => onNavigate('home', 'experience')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/experience</button>
                <button onClick={() => onNavigate('home', 'projects')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/projects</button>
                <button onClick={() => onNavigate('coursework')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/coursework</button>
                <button onClick={() => onNavigate('contact')} className="border px-2 py-1 rounded hover:bg-emerald-500/20 border-emerald-500/50 cursor-none">/contact</button>
              </div>
            </div>
          );
          break;

        case 'get resume':
        case 'curl resume':
        case 'download resume':
          responseContent = (
            <p className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>
              [SUCCESS] Triggering download sequence for resume.pdf...
            </p>
          );
          break;

        case 'clear':
          setHistory([]);
          setIsProcessing(false);
          return;

        case 'sudo hire':
        case 'sudo hire diya':
          responseContent = (
            <div className="space-y-1">
              <p className="text-emerald-500 animate-pulse">[AUTHORIZATION GRANTED]</p>
              <p>Generating offer letter...</p>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-2 border px-3 py-1 rounded bg-emerald-500 text-black font-bold hover:bg-emerald-400 cursor-none"
              >
                Proceed to Contact Page ↗
              </button>
            </div>
          );
          break;

        default:
          responseContent = (
            <p className="text-red-400">
              Command not found: '{command}'. Type <span className="text-blue-400 cursor-none hover:underline" onClick={() => handleCommand('help')}>help</span> to view available commands.
            </p>
          );
      }

      setHistory(prev => [...prev, { type: 'system', content: responseContent }]);
      setIsProcessing(false);
    }, 600); // 600ms AI delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section className="w-full max-w-3xl font-mono relative flex flex-col h-[70vh] sm:h-[80vh]">
      {/* Header */}
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

      {/* Terminal Window */}
      <div
        className={`flex-1 rounded-xl border overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${
          darkMode ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-white border-neutral-300'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Top Bar */}
        <div className={`flex items-center gap-2 p-3 border-b shrink-0 ${darkMode ? 'border-neutral-800 bg-[#111]' : 'border-neutral-200 bg-slate-50'}`}>
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className={`ml-2 text-xs font-semibold ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
            diya@portfolio: ~/help
          </span>
        </div>

        {/* Output History Area */}
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

          {isProcessing && (
            <div className="flex gap-2 items-center text-neutral-500 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Agent reasoning...</span>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t shrink-0 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          {/* Quick Command Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['help', 'whoami', 'navigate', 'get resume'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                disabled={isProcessing}
                className={`text-xs px-2.5 py-1 rounded-md border cursor-none transition-colors ${
                  darkMode 
                    ? 'border-neutral-700 text-neutral-400 hover:border-emerald-500 hover:text-emerald-400 bg-neutral-900/50' 
                    : 'border-neutral-300 text-neutral-600 hover:border-emerald-600 hover:text-emerald-600 bg-slate-50'
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
                if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
                  playTypingClack();
                }
              }}
              disabled={isProcessing}
              className={`flex-1 bg-transparent outline-none border-none cursor-none ${
                darkMode ? 'text-white' : 'text-black'
              }`}
              spellCheck="false"
              autoComplete="off"
            />
            {/* Blinking block cursor effect on the input */}
            <span className={`w-2.5 h-4 inline-block animate-pulse ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
          </form>
        </div>
      </div>
    </section>
  );
}