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
    title: 'AI Syllabus Checker',
    dates: 'Jul 2026 – Present',
    desc: 'Full-stack web application extracting syllabus tasks via Google AI Studio and Canvas REST APIs into interactive checklists.',
    tech: ['React', 'Google AI Studio', 'Canvas API', 'Node.js'],
    github: null,
    video: null,
  },
  {
    title: 'Route4U',
    dates: 'May 2026 – Jun 2026',
    desc: 'Customizable safety navigation landing platform and business framework generating personalized routes based on user preferences.',
    tech: ['React', 'UX Design', 'Product Strategy', 'Tailwind CSS'],
    github: null,
    video: null,
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="w-full max-w-5xl font-mono relative">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">
          $ featured-projects
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.title}
            onMouseEnter={() => project.video && setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className="bg-black border border-neutral-800 hover:border-emerald-500/50 rounded-xl p-6 shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <span>{index === projects.length - 1 ? '└──' : '├──'}</span>
                  <span>{project.title}</span>
                </div>
                {project.video && (
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    [hover preview]
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-500 mb-3 ml-6">
                # {project.dates}
              </p>

              <p className="text-xs text-neutral-300 leading-relaxed ml-6 mb-4">
                {project.desc}
              </p>
            </div>

            <div className="ml-6 flex items-center justify-between pt-3 border-t border-neutral-900">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-neutral-900 border border-neutral-800 text-emerald-400 px-2 py-1 rounded"
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
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  GitHub ↗
                </a>
              ) : (
                <span className="text-xs text-neutral-600">
                  [private repo]
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Hover Video Modal (Renders only when video is present) */}
      {activeProject?.video && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-black border border-emerald-500/60 rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
            <span className="text-xs font-bold text-emerald-400">
              $ preview --{activeProject.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
            {activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 px-2 py-1 rounded font-bold transition-colors"
              >
                GitHub Repo ↗
              </a>
            )}
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
            <video
              src={activeProject.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}