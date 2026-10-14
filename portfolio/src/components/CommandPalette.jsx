import { useState, useEffect, useRef } from 'react';

// Added onToggleGraphMode to props
export default function CommandPalette({ onNavigate, darkMode, onToggleTheme, onToggleGraphMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { id: 'home', title: '> cd /home', action: () => onNavigate('home') },
    { id: 'projects', title: '> cd /projects', action: () => onNavigate('home', 'projects') },
    { id: 'experience', title: '> cd /experience', action: () => onNavigate('home', 'experience') },
    { id: 'coursework', title: '> cd /coursework', action: () => onNavigate('coursework') },
    { id: 'contact', title: '> cat contact.txt', action: () => onNavigate('contact') },
    { id: 'help', title: '> ./help.sh', action: () => onNavigate('help') },
    { id: 'theme', title: '> toggle_dark_mode', action: () => onToggleTheme() },
    { id: 'resume', title: '> download_resume.pdf', action: () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.BASE_URL}Diya_Deepu_Resume.pdf`;
        link.download = 'Diya_Deepu_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }},
    // Added graph toggle command
    { id: 'graph', title: '> toggle_graph_mode', action: () => {
        onToggleGraphMode();
    }}
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/60 transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-mono animate-in fade-in zoom-in-95 duration-200 ${
        darkMode ? 'bg-[#0a0a0a] border-neutral-800 text-neutral-200' : 'bg-white border-neutral-300 text-neutral-800'
      }`}>

        <div className={`flex items-center px-4 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <span className="text-emerald-500 font-bold mr-3">{'>'}</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent outline-none text-sm sm:text-base placeholder-neutral-600"
          />
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-1 rounded border ${darkMode ? 'border-neutral-700 text-neutral-400 bg-neutral-900' : 'border-neutral-300 text-neutral-500 bg-neutral-100'}`}>ESC</span>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-neutral-500">
              zsh: command not found: {query}
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left px-5 py-3 text-sm flex justify-between items-center transition-colors cursor-pointer ${
                  index === selectedIndex 
                    ? (darkMode ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500') 
                    : (darkMode ? 'border-l-2 border-transparent hover:bg-neutral-900/50 text-neutral-400' : 'border-l-2 border-transparent hover:bg-neutral-50 text-neutral-600')
                }`}
              >
                <span>{cmd.title}</span>
                {index === selectedIndex && <span>⏎</span>}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}