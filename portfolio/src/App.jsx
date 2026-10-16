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
import CopyFeedback from './components/CopyFeedback';
import ExternalLinkModal from './components/ExternalLinkModal';
import ScrollProgress from './components/ScrollProgress';
import NeuralBackground from './components/NeuralBackground';
import AIAssistantWidget from './components/AIAssistantWidget'; // Added Import

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [startTerminalTyping, setStartTerminalTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Navigation & Scanner State
  const [page, setPage] = useState('home');
  const [prevPage, setPrevPage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (targetPage, sectionId = null) => {
    // Prevent spam-clicking during a scan transition
    if (isScanning) return;

    // If we are actually changing pages (e.g. Home -> Contact)
    if (targetPage !== page) {
      setPrevPage(page);
      setPage(targetPage);
      setIsScanning(true);
      window.scrollTo({ top: 0 }); // Instantly snap to top for the scan

      // Unlock the screen after the 800ms scan completes
      setTimeout(() => {
        setIsScanning(false);
        setPrevPage(null);
        if (sectionId) {
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }, 800);
    } else {
      // If we are already on the page, just scroll smoothly
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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

  // Extracts page rendering logic so we can render the old and new page simultaneously during a scan
  const renderPageContent = (pageToRender) => {
    switch (pageToRender) {
      case 'contact':
        return <Contact darkMode={darkMode} onBack={() => handleNavigate('home')} />;
      case 'coursework':
        return <Coursework darkMode={darkMode} onBack={() => handleNavigate('home')} />;
      case 'help':
        return <HelpTerminal darkMode={darkMode} onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center gap-12 w-full">
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
                  className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-all cursor-none shadow-lg hover:scale-[1.02] ${
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
          </div>
        );
    }
  };

  if (isLoading) {
    return <LoadingScreen darkMode={darkMode} />;
  }

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden cursor-none selection:bg-emerald-500 selection:text-black transition-colors duration-500 ${darkMode ? 'bg-[#050505]' : 'bg-slate-100'}`}>
      {/* Dynamic Keyframes for the scanner line and wipe effect */}
      <style>{`
        @keyframes scanDown {
          0% { clip-path: inset(0 0 100% 0); }
          100% { clip-path: inset(0 0 0% 0); }
        }
        @keyframes laserDown {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <CustomCursor darkMode={darkMode} />

      {/* ADDED NEURAL BACKGROUND */}
      <NeuralBackground darkMode={darkMode} />

      <ScrollProgress darkMode={darkMode} />
      <CopyFeedback darkMode={darkMode} />
      <ExternalLinkModal darkMode={darkMode} />

      {/* Added the AI Assistant Widget */}
      <AIAssistantWidget darkMode={darkMode} />

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

      {/* MODIFIED: Added `relative z-10` and changed backgrounds to `bg-transparent` */}
      <div
        className={`min-h-screen w-full font-mono transition-colors duration-500 relative z-10 ${
          darkMode ? 'bg-transparent text-neutral-100' : 'bg-transparent text-neutral-900'
        }`}
      >
        <main className="p-6 md:p-12 flex flex-col items-center gap-12 max-w-5xl mx-auto w-full">
          {/* Navbar sits outside the scanner so it doesn't get wiped */}
          <Navbar
            activePage={page}
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
          />

          {/* Scanner Container */}
          <div className="relative w-full min-h-[50vh]">

            {/* The Old Page (Dimmed, grayscale, frozen in background) */}
            {isScanning && prevPage && (
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 grayscale pointer-events-none">
                {renderPageContent(prevPage)}
              </div>
            )}

            {/* The New Page (Scanning in from top to bottom) */}
            <div className={`w-full relative ${isScanning ? 'animate-[scanDown_0.8s_ease-in-out_forwards]' : ''}`}>
              {renderPageContent(page)}
            </div>

            {/* The Laser Line */}
            {isScanning && (
              <div
                className={`absolute left-0 right-0 h-[2px] z-[100] animate-[laserDown_0.8s_ease-in-out_forwards] pointer-events-none ${
                  darkMode 
                    ? 'bg-emerald-400 shadow-[0_0_20px_5px_rgba(52,211,153,1)]' 
                    : 'bg-emerald-500 shadow-[0_0_20px_5px_rgba(16,185,129,1)]'
                }`}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;