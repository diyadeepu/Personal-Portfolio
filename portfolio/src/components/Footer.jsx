export default function Footer() {
  return (
    <footer className="w-full max-w-5xl border-t border-neutral-800 pt-8 mt-4 font-mono text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-neutral-300 font-medium">status: available for software & product roles</span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-white font-bold hover:text-emerald-400 transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-emerald-400"
        >
          github
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="text-white font-bold hover:text-emerald-400 transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-emerald-400"
        >
          linkedin
        </a>
        <a
          href="mailto:your-email@oregonstate.edu"
          className="text-white font-bold hover:text-emerald-400 transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-emerald-400"
        >
          email
        </a>
      </div>

      <div className="text-neutral-400 font-medium">
        © {new Date().getFullYear()} Diya Deepu
      </div>
    </footer>
  );
}