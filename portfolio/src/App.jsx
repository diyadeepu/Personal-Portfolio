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
    <div className="min-h-screen w-full bg-[#050505] text-neutral-100">
      <main className="p-6 md:p-12 flex flex-col items-center gap-12 max-w-5xl mx-auto">
        {page === 'contact' ? (
          <Contact onBack={() => setPage('home')} />
        ) : (
          <>
            <HeroTerminal onContactClick={() => setPage('contact')} />
            <TechStack />
            <Coursework />
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