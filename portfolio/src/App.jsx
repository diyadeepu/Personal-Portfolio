import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroTerminal from './components/HeroTerminal';
import TechStack from './components/TechStack';
import Coursework from './components/Coursework';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import HelpTerminal from './components/HelpTerminal';
import LoadingScreen from './components/LoadingScreen';
import IntroScreen from './components/IntroScreen';
import Footer from './components/Footer';
import ScrollHighlight from './components/ScrollHighlight';
import CustomCursor from './components/CustomCursor';
import MagneticWrapper from './components/MagneticWrapper';
import CommandPalette from './components/CommandPalette';
import CopyFeedback from './components/CopyFeedback'; // IMPORT ADDED HERE

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [startTerminalTyping, setStartTerminalTyping] = useState(false);
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleProceedFromIntro = () => {
    setIsSlidingUp(true);
    setTimeout(() => {
      setShowIntro(false);
      setIsSlidingUp(false);
      setStartTerminalTyping(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  if (isLoading) {
    return <LoadingScreen darkMode={darkMode} />;
  }

  return (
    {/* ADDED SELECTION CSS CLASSES TO THIS ROOT DIV */}
    <div className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden cursor-none selection:bg-emerald-500 selection:text-black">
      <CustomCursor darkMode={darkMode} />

      {/* MOUNTED COPY FEEDBACK COMPONENT */}
      <CopyFeedback darkMode={darkMode} />

      <CommandPalette
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {showIntro && (
        <div
          className={`fixed inset-0 z-50 transition-transform duration-800 ease-in-out ${
            isSlidingUp ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <IntroScreen onProceed={handleProceedFromIntro} darkMode={darkMode} />
        </div>
      )}

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

          {page === 'help' && (
            <HelpTerminal
              darkMode={darkMode}
              onNavigate={handleNavigate}
              onBack={() => handleNavigate('home')}
            />
          )}

          {page === 'home' && (
            <>
              <HeroTerminal
                darkMode={darkMode}
                onContactClick={() => handleNavigate('contact')}
                startTyping={startTerminalTyping}
              />

              <div id="techstack" className="w-full">
                <ScrollHighlight darkMode={darkMode}>
                  <TechStack darkMode={darkMode} />
                </ScrollHighlight>
              </div>

              <div className="w-full max-w-5xl flex justify-center -mt-4 z-10 relative">
                <MagneticWrapper>
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
                </MagneticWrapper>
              </div>

              <div id="experience" className="w-full">
                <ScrollHighlight darkMode={darkMode}>
                  <Experience darkMode={darkMode} />
                </ScrollHighlight>
              </div>

              <div id="projects" className="w-full">
                <Projects darkMode={darkMode} />
              </div>

              <div id="credentials" className="w-full">
                <ScrollHighlight darkMode={darkMode}>
                  <Credentials darkMode={darkMode} />
                </ScrollHighlight>
              </div>

              <Footer darkMode={darkMode} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;