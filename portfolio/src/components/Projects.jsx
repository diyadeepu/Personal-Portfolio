import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ScrambleText from './ScrambleText';
import GlowCard from './GlowCard';

const projects = [
  {
    title: 'Electable',
    dates: 'May 2026',
    desc: 'Civic-engagement platform matching voters with congressional candidates using Federal Election Commission (FEC) data.',
    tech: ['React', 'Node.js', 'FEC API', 'Tailwind CSS'],
    github: 'https://github.com/virtuosovodka/beaverhacks',
    video: '/Personal-Portfolio/videos/electable-demo.mp4',
    prd: {
      problem: 'Voters lack an accessible, unbiased way to align their personal values with congressional candidate records.',
      user: 'Young voters (18-29) and first-time participants seeking data-driven civic alignment.',
      metrics: 'User match-completion rate, API latency < 1.5s, and session duration.',
      outOfScope: 'Local/state elections, real-time polling integration.'
    }
  },
  {
    title: 'Route4U',
    dates: 'May 2026 – Jun 2026',
    desc: 'Customizable safety navigation landing platform and business framework generating personalized routes based on user preferences.',
    tech: ['React', 'UX Design', 'Product Strategy', 'Tailwind CSS'],
    github: null,
    video: '/Personal-Portfolio/videos/route4u.mp4',
    prd: {
      problem: 'Standard navigation apps optimize for speed, ignoring pedestrian concerns like street lighting and populated areas.',
      user: 'College students, late-night urban commuters, and vulnerable pedestrians.',
      metrics: 'Route generation time, user safety rating post-trip, daily active users.',
      outOfScope: 'Turn-by-turn voice dictation, driving/transit modes.'
    }
  },
  {
    title: 'AI Syllabus Checker',
    dates: 'Jul 2026 – Present',
    desc: 'Full-stack web application extracting syllabus tasks via Google AI Studio and Canvas REST APIs into interactive checklists.',
    tech: ['React', 'Google AI Studio', 'Canvas API', 'Node.js'],
    github: null,
    video: null,
  },
];

// REUSABLE DRAGGABLE WINDOW COMPONENT
function DraggableWindow({ children, darkMode, title, onClose, extraHeaderContent, initialX = 0, initialY = 0, zIndex = 100000, widthClass = "max-w-2xl" }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Wrap the return in createPortal to escape the CSS clip-path trap
  return createPortal(
    <div
      className={`fixed rounded-xl border shadow-2xl flex flex-col font-mono animate-in fade-in zoom-in-95 duration-200 ${
        darkMode ? 'bg-[#0a0a0a] border-emerald-500/50' : 'bg-white border-emerald-600/50'
      } ${widthClass}`}
      style={{
        zIndex,
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: 'translate(-50%, -50%)',
        maxWidth: 'calc(100vw - 2rem)',
        width: '100%'
      }}
    >
      {/* Draggable Header */}
      <div
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-between p-3 border-b cursor-grab active:cursor-grabbing ${
          darkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-slate-50'
        }`}
      >
        <span className={`text-xs font-bold pointer-events-none ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          {title}
        </span>
        <div className="flex items-center gap-2">
          {extraHeaderContent}
          <button
            onClick={onClose}
            className={`text-[10px] border px-2 py-1 rounded font-bold transition-colors cursor-none ${
              darkMode ? 'text-neutral-400 border-neutral-700 hover:text-white hover:bg-neutral-800' : 'text-neutral-600 border-neutral-300 hover:text-black hover:bg-neutral-100'
            }`}
          >
            [x] close
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 overflow-y-auto max-h-[70vh]">
        {children}
      </div>
    </div>,
    document.body // Renders this exactly at the top level of the DOM
  );
}

export default function Projects({ darkMode }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activePrdProject, setActivePrdProject] = useState(null);

  return (
    <section className="w-full max-w-5xl font-mono relative">
      <div className="mb-6">
        <p
          className={`text-sm font-bold uppercase tracking-[0.25em] ${
            darkMode ? 'text-white' : 'text-neutral-900'
          }`}
        >
          $ <ScrambleText text="featured-projects" />
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <GlowCard
            key={project.title}
            darkMode={darkMode}
            onMouseEnter={() => project.video && setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className={`border rounded-xl p-6 transition-all flex flex-col justify-between ${
              darkMode
                ? 'bg-black border-neutral-800 hover:border-emerald-500/50 shadow-lg'
                : 'bg-white border-neutral-300 hover:border-emerald-500/50 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`flex items-center gap-2 font-bold text-base ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  <span>{index === projects.length - 1 ? '└──' : '├──'}</span>
                  <span>{project.title}</span>
                </div>

                {/* Action Buttons Container */}
                <div className="flex items-center gap-2 z-20">
                  {/* PRD Popup Button */}
                  {project.prd && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePrdProject(project);
                      }}
                      className={`text-[10px] border px-2 py-0.5 rounded font-bold cursor-none transition-all duration-200 ${
                        darkMode 
                          ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black hover:border-emerald-500' 
                          : 'text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                      }`}
                    >
                      [view PRD]
                    </button>
                  )}

                  {project.video && (
                    <span
                      className={`text-[10px] border px-2 py-0.5 rounded font-semibold ${
                        darkMode
                          ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                          : 'text-emerald-700 border-emerald-300 bg-emerald-50'
                      }`}
                    >
                      [hover preview]
                    </span>
                  )}
                </div>
              </div>

              {/* Standard Project Details */}
              <div className="min-h-[80px]">
                <p
                  className={`text-xs mb-3 ml-6 ${
                    darkMode ? 'text-neutral-500' : 'text-neutral-600 font-semibold'
                  }`}
                >
                  # {project.dates}
                </p>
                <p
                  className={`text-xs leading-relaxed ml-6 mb-4 ${
                    darkMode ? 'text-neutral-300' : 'text-neutral-800 font-medium'
                  }`}
                >
                  {project.desc}
                </p>
              </div>
            </div>

            <div
              className={`ml-6 flex items-center justify-between pt-3 border-t ${
                darkMode ? 'border-neutral-900' : 'border-neutral-200'
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] border px-2 py-1 rounded font-medium ${
                      darkMode
                        ? 'bg-neutral-900 border-neutral-800 text-emerald-400'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs transition-colors font-bold ${
                    darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  GitHub ↗
                </a>
              ) : (
                <span
                  className={`text-xs ${
                    darkMode ? 'text-neutral-600' : 'text-neutral-600 font-medium'
                  }`}
                >
                  [private repo]
                </span>
              )}
            </div>
          </GlowCard>
        ))}
      </div>

      {/* --- DRAGGABLE PRD MODAL --- */}
      {activePrdProject && (
        <DraggableWindow
          darkMode={darkMode}
          title={`$ cat prd_${activePrdProject.title.toLowerCase().replace(/\s+/g, '_')}.md`}
          onClose={() => setActivePrdProject(null)}
          zIndex={100005}
        >
          <div className="space-y-4">
            <div>
              <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>## PROBLEM_STATEMENT</h4>
              <p className={`text-xs leading-relaxed pl-3 border-l-2 ${darkMode ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                {activePrdProject.prd.problem}
              </p>
            </div>

            <div>
              <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>## TARGET_USER</h4>
              <p className={`text-xs leading-relaxed pl-3 border-l-2 ${darkMode ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                {activePrdProject.prd.user}
              </p>
            </div>

            <div>
              <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>## SUCCESS_METRICS</h4>
              <p className={`text-xs leading-relaxed pl-3 border-l-2 ${darkMode ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                {activePrdProject.prd.metrics}
              </p>
            </div>

            <div>
              <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>## OUT_OF_SCOPE</h4>
              <p className={`text-xs leading-relaxed pl-3 border-l-2 ${darkMode ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                {activePrdProject.prd.outOfScope}
              </p>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* --- DRAGGABLE VIDEO PREVIEW MODAL --- */}
      {activeProject?.video && (
        <DraggableWindow
          darkMode={darkMode}
          title={`$ preview --${activeProject.title.toLowerCase().replace(/\s+/g, '-')}`}
          onClose={() => setActiveProject(null)}
          initialX={window.innerWidth > 768 ? 200 : 0}
          initialY={window.innerWidth > 768 ? 100 : 0}
          zIndex={100000}
          widthClass="sm:w-[32rem] md:w-[36rem]"
          extraHeaderContent={
            activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className={`text-[10px] border px-2 py-1 rounded font-bold transition-colors cursor-none ${
                  darkMode
                    ? 'text-white bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/40'
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300 hover:bg-emerald-200'
                }`}
              >
                GitHub Repo ↗
              </a>
            )
          }
        >
          <div
            className={`overflow-hidden rounded-lg border aspect-video flex items-center justify-center ${
              darkMode ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-300 bg-neutral-100'
            }`}
          >
            <video
              src={activeProject.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </DraggableWindow>
      )}
    </section>
  );
}