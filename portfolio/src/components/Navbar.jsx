export default function Navbar({ activePage, onNavigate }) {
  const navItems = [
    { label: 'Home', page: 'home', section: null },
    { label: 'Experience', page: 'home', section: 'experience' },
    { label: 'Projects', page: 'home', section: 'projects' },
    { label: 'Credentials', page: 'home', section: 'credentials' },
    { label: 'Contact', page: 'contact', section: null },
  ];

  return (
    <header className="w-full max-w-5xl flex justify-end py-4 font-mono">
      <nav className="bg-black/80 border border-neutral-800 backdrop-blur-md rounded-full px-5 py-2 shadow-xl">
        <ul className="flex items-center gap-4 sm:gap-6 text-xs">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate(item.page, item.section)}
                className={`transition-colors cursor-pointer hover:text-emerald-400 ${
                  activePage === item.page && !item.section
                    ? 'text-emerald-400 font-bold'
                    : 'text-neutral-400'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}