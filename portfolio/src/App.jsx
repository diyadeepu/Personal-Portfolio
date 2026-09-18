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

  const handleNavigate = (targetPage, sectionId = null) => {
    setPage(targetPage);

    if (targetPage === 'home') {
      if (sectionId) {
        // Wait briefly for DOM rendering if coming from another page
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
    <div className="min-h-screen w-full bg-[#050505] text-neutral-100 font-mono">
      <main className="p-6 md:p-12 flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <Navbar activePage={page} onNavigate={handleNavigate} />

        {page === 'contact' && (
          <Contact onBack={() => handleNavigate('home')} />
        )}

        {page === 'coursework' && (
          <Coursework onBack={() => handleNavigate('home')} />
        )}

        {page === 'home' && (
          <>
            <HeroTerminal onContactClick={() => handleNavigate('contact')} />

            <TechStack />

            {/* Coursework Button below Tech Stack */}
            <div className="w-full max-w-5xl flex justify-center -mt-4">
              <button
                onClick={() => handleNavigate('coursework')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <span>$</span> view relevant coursework --list ↗
              </button>
            </div>

            <div id="experience" className="w-full">
              <Experience />
            </div>

            <div id="projects" className="w-full">
              <Projects />
            </div>

            <div id="credentials" className="w-full">
              <Credentials />
            </div>

            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;