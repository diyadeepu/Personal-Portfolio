import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroTerminal from './components/HeroTerminal';
import TechStack from './components/TechStack';
import Coursework from './components/Coursework';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  const handleNavigate = (targetPage, sectionId = null) => {
    setPage(targetPage);

    if (targetPage === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen w-full font-mono transition-colors duration-500 ${
        darkMode ? 'bg-[#050505] text-neutral-100' : 'bg-slate-100 text-neutral-900'
      }`}
    >
      <main className="p-6 md:p-12 flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <Navbar
          activePage={page}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />

        {page === 'contact' && (
          <Contact darkMode={darkMode} onBack={() => handleNavigate('home')} />
        )}

        {page === 'coursework' && (
          <Coursework darkMode={darkMode} onBack={() => handleNavigate('home')} />
        )}

        {page === 'home' && (
          <>
            <HeroTerminal
              darkMode={darkMode}
              onContactClick={() => handleNavigate('contact')}
            />

            <TechStack darkMode={darkMode} />

            <div className="w-full max-w-5xl flex justify-center -mt-4">
              <button
                onClick={() => handleNavigate('coursework')}
                className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-lg hover:scale-[1.02] ${
                  darkMode
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-white border-emerald-500/40 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <span>$</span> view relevant coursework --list ↗
              </button>
            </div>

            <div id="experience" className="w-full">
              <Experience darkMode={darkMode} />
            </div>

            <div id="projects" className="w-full">
              <Projects darkMode={darkMode} />
            </div>

            <div id="credentials" className="w-full">
              <Credentials darkMode={darkMode} />
            </div>

            <Footer darkMode={darkMode} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;