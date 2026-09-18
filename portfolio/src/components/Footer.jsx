export default function Footer({ darkMode }) {
  return (
    <footer className="w-full max-w-5xl pt-12 pb-6 border-t border-neutral-300 dark:border-neutral-800 font-mono transition-colors duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className={`font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-800'}`}>
          status: <span className="text-emerald-600 dark:text-emerald-400">available for software & product roles</span>
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors font-medium ${
              darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
            }`}
          >
            github
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors font-medium ${
              darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
            }`}
          >
            linkedin
          </a>
          <a
            href="mailto:example@oregonstate.edu"
            className={`transition-colors font-medium ${
              darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
            }`}
          >
            email
          </a>
        </div>
      </div>

      <p className={`text-center text-[11px] mt-8 ${darkMode ? 'text-neutral-500' : 'text-neutral-600 font-medium'}`}>
        © {new Date().getFullYear()} Diya Deepu. All rights reserved.
      </p>
    </footer>
  );
}