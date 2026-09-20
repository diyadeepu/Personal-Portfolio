export default function Contact({ onBack, darkMode }) {
  return (
    <section className="w-full max-w-2xl font-mono">
      <button
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 text-xs transition-colors cursor-pointer font-bold ${
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
            Open for full-stack software engineering, AI, IT, and product management opportunities.
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
              className={`font-bold hover:underline text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
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
            <a
              href="https://www.linkedin.com/in/diyadeepu/"
              target="_blank"
              rel="noreferrer"
              className={`font-bold hover:underline text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
            >
              linkedin.com/in/diyadeepu/
            </a>
          </div>

          <div
            className={`p-4 border rounded-lg ${
              darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}
          >
            <span className={`text-xs uppercase tracking-wider block mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-bold'}`}>
              # GitHub
            </span>
            <a
              href="https://github.com/diyadeepu"
              target="_blank"
              rel="noreferrer"
              className={`font-bold hover:underline text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
            >
              github.com/diyadeepu
            </a>
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