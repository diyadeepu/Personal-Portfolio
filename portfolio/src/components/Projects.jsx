import { useState, useRef } from 'react';
import ScrambleText from './ScrambleText';
import GlowCard from './GlowCard';

// 1. Updated Data with 6 PM Metrics for the 3D Cube
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
      outOfScope: 'Local/state elections, real-time polling integration.',
      gtm: 'Pilot launch prior to midterm elections via university civic engagement clubs.',
      techStack: 'React for UI, Node.js backend, FEC REST API, Gemini AI.'
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
      outOfScope: 'Turn-by-turn voice dictation, driving/transit modes.',
      gtm: 'Targeted beta testing at university campuses for late-night study commuters.',
      techStack: 'React, Figma for UX Mockups, Location Services API.'
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

// 2. The 3D CSS Rubik's Cube Component (SMOOTHED + RADAR GRID)
function PRDCubeModal({ project, darkMode, onClose }) {
  const [rotation, setRotation] = useState({ x: -15, y: -25 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    // Lower multiplier (0.3) for heavier, smoother rotation feel
    setRotation(prev => ({ x: prev.x - deltaY * 0.3, y: prev.y + deltaX * 0.3 }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const cubeSize = 288;
  const translateZ = cubeSize / 2;

  const Face = ({ title, content, transform, faceName }) => (
    <div
      className={`absolute inset-0 w-full h-full border-2 p-6 flex flex-col justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)] ${
        darkMode ? 'bg-[#050505]/95 border-emerald-500/50' : 'bg-white/95 border-emerald-600/50'
      }`}
      style={{ transform, backfaceVisibility: 'hidden' }}
    >
      <div className={`absolute top-2 left-3 text-[9px] font-bold opacity-50 uppercase ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        [ {faceName} ]
      </div>
      <h4 className={`text-xs font-bold mb-3 uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        ## {title}
      </h4>
      <p className={`text-xs leading-relaxed font-medium ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
        {content}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 overflow-hidden animate-in fade-in duration-300">

      {/* 3. The Blueprint Radar Grid Background */}
      <div className={`absolute inset-0 z-0 ${darkMode ? 'bg-[#020504]' : 'bg-[#f0fdf4]'}`}>
        {/* Grid Lines */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"
          style={{ '--grid-color': darkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.3)' }}
        />
        {/* Sweeping Radar Scanner */}
        <div className="absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 pointer-events-none [mask-image:radial-gradient(circle_at_center,black_10%,transparent_40%)]">
           <div
             className="w-full h-full animate-[spin_6s_linear_infinite] rounded-full"
             style={{ background: `conic-gradient(from 0deg, transparent 75%, ${darkMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)'} 100%)` }}
           />
        </div>
      </div>

      {/* HUD Header & Close Button */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
        <div className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          $ render --3D prd_{project.title.toLowerCase().replace(/\s+/g, '_')}
          <br/>
          <span className="text-[10px] opacity-70 mt-1 block">
            &gt; click and drag to rotate the product spec cube
          </span>
        </div>
        <button
          onClick={onClose}
          className={`text-xs border px-4 py-2 rounded font-bold transition-all cursor-none pointer-events-auto shadow-lg backdrop-blur-md ${
            darkMode ? 'text-emerald-400 border-emerald-500/50 hover:bg-emerald-500 hover:text-black' : 'text-emerald-700 border-emerald-600/50 bg-white/50 hover:bg-emerald-600 hover:text-white'
          }`}
        >
          [x] exit_3D_mode
        </button>
      </div>

      {/* 3D Scene Container */}
      <div
        className="relative w-72 h-72 cursor-grab active:cursor-grabbing touch-none z-10"
        style={{ perspective: '1000px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            // SMOOTHING FIX: Adds micro-interpolations between mouse frames
            transition: isDragging ? 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <Face faceName="Face 1" title="Problem_Statement" content={project.prd.problem} transform={`translateZ(${translateZ}px)`} />
          <Face faceName="Face 2" title="Target_User" content={project.prd.user} transform={`rotateY(180deg) translateZ(${translateZ}px)`} />
          <Face faceName="Face 3" title="Success_Metrics" content={project.prd.metrics} transform={`rotateY(90deg) translateZ(${translateZ}px)`} />
          <Face faceName="Face 4" title="Out_Of_Scope" content={project.prd.outOfScope} transform={`rotateY(-90deg) translateZ(${translateZ}px)`} />
          <Face faceName="Face 5" title="GTM_Strategy" content={project.prd.gtm} transform={`rotateX(90deg) translateZ(${translateZ}px)`} />
          <Face faceName="Face 6" title="Tech_Stack" content={project.prd.techStack} transform={`rotateX(-90deg) translateZ(${translateZ}px)`} />
        </div>
      </div>
    </div>
  );
}

export default function Projects({ darkMode }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeCubeProject, setActiveCubeProject] = useState(null);

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
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`flex items-center gap-2 font-bold text-base mt-1 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  <span>{index === projects.length - 1 ? '└──' : '├──'}</span>
                  <span>{project.title}</span>
                </div>

                {/* Stacked Action Buttons Container (Vertical Layout) */}
                <div className="flex flex-col items-end gap-2 z-20 h-[60px]">
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

                  {/* 3D Cube PRD Button Bouncing Below */}
                  {project.prd && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCubeProject(project);
                      }}
                      className={`text-[10px] border px-2 py-0.5 rounded font-bold cursor-none transition-all duration-200 animate-[bounce_1.5s_infinite] hover:animate-none ${
                        darkMode 
                          ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black hover:border-emerald-500' 
                          : 'text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                      }`}
                    >
                      [view 3D PRD]
                    </button>
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

      {/* --- RENDER THE 3D CUBE MODAL --- */}
      {activeCubeProject && (
        <PRDCubeModal
          project={activeCubeProject}
          darkMode={darkMode}
          onClose={() => setActiveCubeProject(null)}
        />
      )}

      {/* Expanded High-Resolution Preview Modal (Fixed Corner) */}
      {activeProject?.video && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[32rem] md:w-[36rem] max-w-[95vw] border rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all pointer-events-none ${
            darkMode
              ? 'bg-black border-emerald-500/60'
              : 'bg-white border-emerald-600/60 shadow-2xl'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 mb-3 border-b ${
              darkMode ? 'border-neutral-800' : 'border-neutral-200'
            }`}
          >
            <span
              className={`text-xs font-bold ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              $ preview --{activeProject.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
            {activeProject.github && (
              <span
                className={`text-xs border px-2 py-1 rounded font-bold transition-colors ${
                  darkMode
                    ? 'text-white bg-emerald-500/20 border-emerald-500/40'
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                }`}
              >
                GitHub Repo ↗
              </span>
            )}
          </div>

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
        </div>
      )}
    </section>
  );
}