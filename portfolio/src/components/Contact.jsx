export default function Contact({ onBack }) {
  return (
    <section className="w-full max-w-2xl font-mono">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <span>←</span> back to home
      </button>

      <div className="bg-black border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-xs text-neutral-500">contact.txt</span>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">
            $ cat contact.txt
          </p>
          <h1 className="text-2xl font-bold text-white">Get in Touch</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Open for full-stack software engineering, AI, IT, and product management opportunities.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
              # Email
            </span>
            <a
              href="mailto:maildiyadeepu@gmail.com"
              className="text-emerald-400 font-bold hover:underline text-sm"
            >
              maildiyadeepu@gmail.com
            </a>
          </div>

          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
              # LinkedIn
            </span>
            <a
              href="https://www.linkedin.com/in/diyadeepu/"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 font-bold hover:underline text-sm"
            >
              linkedin.com/in/diyadeepu/
            </a>
          </div>

          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
              # GitHub
            </span>
            <a
              href="https://github.com/diyadeepu"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 font-bold hover:underline text-sm"
            >
              github.com/diyadeepu
            </a>
          </div>

          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
              # Location
            </span>
            <p className="text-sm text-neutral-200 font-semibold">
              Oregon State University | Corvallis & Lake Oswego, OR
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}