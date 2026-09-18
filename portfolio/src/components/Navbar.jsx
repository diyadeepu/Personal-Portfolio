export default function Navbar({ activePage, activeSection, onNavigate, darkMode, onToggleTheme }) {
  const navItems = [
    { label: 'Home', page: 'home', section: null },
    { label: 'Experience', page: 'home', section: 'experience' },
    { label: 'Projects', page: 'home', section: 'projects' },
    { label: 'Credentials', page: 'home', section: 'credentials' },
    { label: 'Contact', page: 'contact', section: null },
    { label: 'Help', page: 'help', section: null },
  ];

  return (
    <header className="w-full max-w-5xl flex justify-between items-center py-4 font-mono">
      {/* Theme Toggle Button */}
      <button
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        className={`p-2.5 rounded-full border transition-all duration-500 cursor-pointer ${
          darkMode
            ? 'bg-black/80 border-neutral-800 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/50'
            : 'bg-white border-neutral-300 text-neutral-700 hover:text-emerald-600 hover:border-emerald-500/50 shadow-md'
        }`}
      >
        {darkMode ? (
          /* Sun Icon */
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            />
          </svg>
        ) : (
          /* Moon Icon */
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Navigation Bar */}
      <nav
        className={`border backdrop-blur-md rounded-full px-5 py-2 shadow-xl transition-all duration-500 ${
          darkMode ? 'bg-black/80 border-neutral-800' : 'bg-white/80 border-neutral-300'
        }`}
      >
        <ul className="flex items-center gap-4 sm:gap-6 text-xs">
          {navItems.map((item) => {
            const isActive = item.section
              ? activePage === item.page && activeSection === item.section
              : activePage === item.page;

            return (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.page, item.section)}
                  className={`transition-colors cursor-pointer ${
                    isActive
                      ? darkMode
                        ? 'text-emerald-400 font-bold'
                        : 'text-emerald-600 font-bold'
                      : darkMode
                      ? 'text-neutral-400 hover:text-emerald-400'
                      : 'text-neutral-600 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}