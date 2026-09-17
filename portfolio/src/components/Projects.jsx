const projects = [
  {
    name: 'Electable: May 2026',
    description:
      'Civic-tech platform built during BeaverHacks matching voters with congressional candidates using FEC data APIs in 24 hours.',
    tags: ['Civic Tech', 'React', 'API Integration', 'Hackathon'],
  },
  {
    name: 'Route4U: April - June 2026',
    description:
      'Custom safety navigation app landing platform and business framework where user inputs custom features and preferences (activity level, scenic preference, etc.) to generate a personalized route map.',
    tags: ['Product', 'UX', 'Navigation', 'Business Strategy'],
  },
  {
    name: 'AI Syllabus Checker: July 2026 – Present',
    description:
      'Full-stack web app parsing PDF syllabi via Google AI Studio and syncing directly with Canvas LMS APIs to generate interactive checklists.',
    tags: ['Full-Stack', 'AI', 'Canvas API', 'Google AI Studio'],
  },
];

export default function Projects() {
  return (
    <section className="w-full max-w-5xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white font-mono">
          $ featured-projects
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="bg-black border border-neutral-800 rounded-xl p-6 font-mono shadow-lg"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <span>{index === projects.length - 1 ? '└──' : '├──'}</span>
              <span>{project.name}</span>
            </div>

            <p className="mt-4 ml-6 text-sm leading-relaxed text-neutral-300">
              {project.description}
            </p>

            <div className="mt-4 ml-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-900 border border-neutral-700 text-emerald-400 px-3 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}