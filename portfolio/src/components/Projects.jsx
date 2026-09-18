export default function Projects({ darkMode }) {
  const projects = [
    {
      title: 'Electable — Civic Engagement Platform',
      tech: ['React', 'Node.js', 'Express', 'FEC API'],
      description: 'Built during BeaverHacks. Matches voters with local congressional candidates based on campaign issues and verified FEC financial data.',
      link: '#',
    },
    {
      title: 'AI Syllabus Checker',
      tech: ['Python', 'Google AI Studio', 'Canvas REST API', 'React'],
      description: 'Web application parsing scanned PDF syllabi and extracting assignments directly into interactive Canvas checklist tasks.',
      link: '#',
    },
    {
      title: 'Route4U Safety Navigation',
      tech: ['React', 'Tailwind CSS', 'Mapbox API'],
      description: 'Conceptual safety navigation landing platform providing customized well-lit route options for nighttime travel.',
      link: '#',
    },
  ];

  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p className={`text-sm font-bold uppercase tracking-[0.25em] ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          $ featured-projects
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((proj) => (
          <div
            key={proj.title}
            className={`border rounded-xl p-6 flex flex-col justify-between transition-colors duration-500 ${
              darkMode ? 'bg-black border-neutral-800 shadow-lg' : 'bg-white border-neutral-300 shadow-md'
            }`}
          >
            <div>
              <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {proj.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                      darkMode ? 'bg-neutral-900 border-neutral-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className={`text-xs leading-relaxed mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {proj.description}
              </p>
            </div>

            <a
              href={proj.link}
              className={`inline-flex items-center gap-1 text-xs font-bold ${
                darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
              }`}
            >
              view project ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}