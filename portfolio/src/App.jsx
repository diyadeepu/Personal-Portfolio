import { useState } from 'react';
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

  return (
    <div className="min-h-screen w-full bg-[#050505] text-neutral-100 font-mono">
      <main className="p-6 md:p-12 flex flex-col items-center gap-12 max-w-5xl mx-auto">
        {page === 'contact' && (
          <Contact onBack={() => setPage('home')} />
        )}

        {page === 'coursework' && (
          <Coursework onBack={() => setPage('home')} />
        )}

        {page === 'home' && (
          <>
            <HeroTerminal onContactClick={() => setPage('contact')} />

            <TechStack />

            {/* Coursework Button placed directly below Tech Stack */}
            <div className="w-full max-w-5xl flex justify-center -mt-4">
              <button
                onClick={() => setPage('coursework')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <span>$</span> view relevant coursework --list ↗
              </button>
            </div>

            <Experience />
            <Projects />
            <Credentials />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;