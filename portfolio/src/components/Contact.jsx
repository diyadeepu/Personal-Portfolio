export default function Contact({ onBack, darkMode }) {
  return (
    <section className="w-full max-w-2xl font-mono">
      <button
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 text-xs transition-colors cursor-none font-bold ${
          darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
        }`}
      >
        <span>←</span> back to home
      </button>

      <div
        className={`border rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 transition-colors duration-500 ${
          darkMode ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b pb-4 ${
            darkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}
        >
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className={`ml-2 text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            contact.txt
          </span>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-widest mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-500 font-semibold'}`}>
            $ cat contact.txt
          </p>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Get in Touch
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-600 font-medium'}`}>
            Open for full-stack software engineering, product management, AI, and IT opportunities.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div
            className={`p-4 border rounded-lg ${
              darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}
          >
            <span className={`text-xs uppercase tracking-wider block mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-bold'}`}>
              # Email
            </span>
            <a
              href="mailto:maildiyadeepu@gmail.com"
              className={`font-bold transition-colors underline underline-offset-4 cursor-none text-sm ${
                darkMode 
                  ? 'text-emerald-400 decoration-emerald-400/50 hover:text-white hover:decoration-white' 
                  : 'text-emerald-600 decoration-emerald-600/50 hover:text-black hover:decoration-black'
              }`}
            >
              maildiyadeepu@gmail.com
            </a>
          </div>

          <div
            className={`p-4 border rounded-lg ${
              darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}
          >
            <span className={`text-xs uppercase tracking-wider block mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-bold'}`}>
              # LinkedIn
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('external-link', { detail: { url: 'https://www.linkedin.com/in/diyadeepu/' } }));
              }}
              className={`font-bold transition-colors underline underline-offset-4 cursor-none text-sm ${
                darkMode 
                  ? 'text-emerald-400 decoration-emerald-400/50 hover:text-white hover:decoration-white' 
                  : 'text-emerald-600 decoration-emerald-600/50 hover:text-black hover:decoration-black'
              }`}
            >
              linkedin.com/in/diyadeepu/
            </button>
          </div>

          <div
            className={`p-4 border rounded-lg ${
              darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}
          >
            <span className={`text-xs uppercase tracking-wider block mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-bold'}`}>
              # GitHub
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('external-link', { detail: { url: 'https://github.com/diyadeepu' } }));
              }}
              className={`font-bold transition-colors underline underline-offset-4 cursor-none text-sm ${
                darkMode 
                  ? 'text-emerald-400 decoration-emerald-400/50 hover:text-white hover:decoration-white' 
                  : 'text-emerald-600 decoration-emerald-600/50 hover:text-black hover:decoration-black'
              }`}
            >
              github.com/diyadeepu
            </button>
          </div>

          <div
            className={`p-4 border rounded-lg ${
              darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}
          >
            <span className={`text-xs uppercase tracking-wider block mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-bold'}`}>
              # Location
            </span>
            <p className={`text-sm font-semibold ${darkMode ? 'text-neutral-200' : 'text-neutral-900'}`}>
              Lake Oswego, OR
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}