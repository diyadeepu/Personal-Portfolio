import { useState } from 'react';

const projects = [
  {
    title: 'Electable',
    dates: 'May 2026',
    desc: 'Civic-engagement platform matching voters with congressional candidates using Federal Election Commission (FEC) data.',
    tech: ['React', 'Node.js', 'FEC API', 'Tailwind CSS'],
    github: 'https://github.com/virtuosovodka/beaverhacks',
    video: '/Personal-Portfolio/videos/electable-demo.mp4',
  },
  {
    title: 'Route4U',
    dates: 'May 2026 – Jun 2026',
    desc: 'Customizable safety navigation landing platform and business framework generating personalized routes based on user preferences.',
    tech: ['React', 'UX Design', 'Product Strategy', 'Tailwind CSS'],
    github: null,
    video: '/Personal-Portfolio/videos/route4u.mp4',
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

export default function Projects({ darkMode }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="w-full max-w-5xl font-mono relative">
      <div className="mb-6">
        <p
          className={`text-sm font-bold uppercase tracking-[0.25em] ${
            darkMode ? 'text-white' : 'text-neutral-900'
          }`}
        >
          $ featured-projects
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.title}
            onMouseEnter={() => project.video && setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className={`border rounded-xl p-6 transition-all flex flex-col justify-between ${
              darkMode
                ? 'bg-black border-neutral-800 hover:border-emerald-500/50 shadow-lg'
                : 'bg-white border-neutral-300 hover:border-emerald-500/50 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex items-center gap-2 font-bold text-base ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  <span>{index === projects.length - 1 ? '└──' : '├──'}</span>
                  <span>{project.title}</span>
                </div>
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
          </div>
        ))}
      </div>

      {/* Expanded High-Resolution Preview Modal */}
      {activeProject?.video && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[32rem] md:w-[36rem] max-w-[95vw] border rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all ${
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
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className={`text-xs border px-2 py-1 rounded font-bold transition-colors ${
                  darkMode
                    ? 'text-white bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300 hover:bg-emerald-200'
                }`}
              >
                GitHub Repo ↗
              </a>
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