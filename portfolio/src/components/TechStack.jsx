const skillGroups = [
  {
    title: 'LANGUAGES',
    skills: ['Python', 'Java', 'JavaScript', 'C++', 'HTML', 'CSS', 'SQL', 'Malayalam'],
  },
  {
    title: 'FRAMEWORKS / LIBRARIES',
    skills: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    title: 'TOOLS / DATABASES',
    skills: ['MySQL', 'Git', 'GitHub', 'Linux', 'Bash', 'Vim', 'PyCharm', 'VS Code'],
  },
];

export default function TechStack() {
  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-900 dark:text-white transition-colors duration-500">
          $ tech-stack
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-md dark:shadow-lg transition-colors duration-500"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-4">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md font-medium transition-colors duration-500"
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