const skillGroups = [
  {
    title: 'LANGUAGES',
    skills: ['Python', 'Java', 'JavaScript', 'C++', 'SQL', 'HTML', 'CSS', 'Bash']
  },
  {
    title: 'FRAMEWORKS / LIBRARIES',
    skills: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    title: 'TOOLS / DATABASES',
    skills: ['MySQL', 'Git', 'GitHub', 'Linux', 'Vim', 'PyCharm', 'Visual Studio Code', 'Canvas REST API', 'Google AI Studio'],
  },
];

export default function TechStack({ darkMode }) {
  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p
          className={`text-sm font-bold uppercase tracking-[0.25em] ${
            darkMode ? 'text-white' : 'text-neutral-900'
          }`}
        >
          $ tech-stack
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className={`border rounded-xl p-6 transition-colors duration-500 ${
              darkMode
                ? 'bg-black border-neutral-800 shadow-lg'
                : 'bg-white border-neutral-300 shadow-md'
            }`}
          >
            <h3
              className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                darkMode ? 'text-neutral-200' : 'text-neutral-800'
              }`}
            >
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs border px-3 py-1.5 rounded-md font-medium transition-colors duration-500 ${
                    darkMode
                      ? 'bg-neutral-900 border-neutral-800 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}