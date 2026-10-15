import { useState, useEffect } from 'react';

export default function ExternalLinkModal({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    const handleOpen = (e) => {
      setTargetUrl(e.detail.url);
      setIsOpen(true);
    };

    // Listen for the custom event
    window.addEventListener('external-link', handleOpen);
    return () => window.removeEventListener('external-link', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-opacity"
      onClick={() => setIsOpen(false)} // Close if they click the background
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent background click from closing when clicking inside modal
        className={`relative w-full max-w-md rounded-xl border p-6 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm animate-in zoom-in-95 duration-200 ${
          darkMode ? 'bg-[#0a0a0a] border-emerald-500/50 text-neutral-300' : 'bg-white border-emerald-600/50 text-neutral-700'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center pb-3 mb-4 border-b ${darkMode ? 'border-emerald-500/20' : 'border-emerald-600/20'}`}>
          <span className={`font-bold uppercase tracking-widest ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            ! Warning: External_Redirect
          </span>
        </div>

        {/* Body */}
        <div className="space-y-4 mb-8">
          <p>
            You are about to leave this secure environment and open an external domain in a new tab:
          </p>
          <div className={`p-3 rounded border break-all font-bold ${darkMode ? 'bg-neutral-900 border-neutral-800 text-emerald-400' : 'bg-neutral-100 border-neutral-200 text-emerald-600'}`}>
            {targetUrl}
          </div>
          <p className="opacity-80 pt-2">
            Are you sure you want to proceed?
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2 rounded font-bold transition-colors cursor-pointer border ${
              darkMode 
                ? 'border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white' 
                : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-black'
            }`}
          >
            [ stay ]
          </button>
          <button
            onClick={handleProceed}
            className={`px-4 py-2 rounded font-bold transition-colors cursor-pointer border ${
              darkMode 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black' 
                : 'bg-emerald-50 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            [ proceed ↗ ]
          </button>
        </div>
      </div>
    </div>
  );
}