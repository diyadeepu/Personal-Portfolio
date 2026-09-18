export default function Footer({ darkMode }) {
  return (
    <footer
      className={`w-full max-w-5xl border-t pt-8 mt-4 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-500 ${
        darkMode
          ? 'border-neutral-800 text-neutral-400'
          : 'border-neutral-300 text-neutral-600'
      }`}
    >
      <div className="flex items-center gap-2">
        {/* Blinking green circle matching text size */}
        <span className="h-[1em] w-[1em] rounded-full bg-emerald-500 animate-pulse shrink-0 inline-block" />
        <span
          className={`font-medium ${
            darkMode ? 'text-neutral-300' : 'text-neutral-800 font-semibold'
          }`}
        >
          status: available for software & product roles
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com/diyadeepu"
          target="_blank"
          rel="noreferrer"
          className={`font-bold transition-colors underline underline-offset-4 ${
            darkMode
              ? 'text-white hover:text-emerald-400 decoration-neutral-700 hover:decoration-emerald-400'
              : 'text-neutral-900 hover:text-emerald-600 decoration-neutral-300 hover:decoration-emerald-600'
          }`}
        >
          github
        </a>
        <a
          href="https://linkedin.com/in/diyadeepu"
          target="_blank"
          rel="noreferrer"
          className={`font-bold transition-colors underline underline-offset-4 ${
            darkMode
              ? 'text-white hover:text-emerald-400 decoration-neutral-700 hover:decoration-emerald-400'
              : 'text-neutral-900 hover:text-emerald-600 decoration-neutral-300 hover:decoration-emerald-600'
          }`}
        >
          linkedin
        </a>
        <a
          href="mailto:maildiyadeepu@gmail.com"
          className={`font-bold transition-colors underline underline-offset-4 ${
            darkMode
              ? 'text-white hover:text-emerald-400 decoration-neutral-700 hover:decoration-emerald-400'
              : 'text-neutral-900 hover:text-emerald-600 decoration-neutral-300 hover:decoration-emerald-600'
          }`}
        >
          email
        </a>
      </div>

      <div
        className={`font-medium ${
          darkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        © {new Date().getFullYear()} Diya Deepu
      </div>
    </footer>
  );
}