const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'C++', 'SQL', 'HTML/CSS', 'Bash'],
  },
  {
    title: 'Frameworks / Libraries',
    skills: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    title: 'Tools / Databases',
    skills: ['MySQL', 'Git', 'GitHub', 'Linux', 'Vim', 'PyCharm', 'Visual Studio Code', 'Canvas REST API', 'Google AI Studio'],
  },
];

export default function TechStack() {
  return (
    <section className="w-full max-w-5xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white font-mono">
          $ tech-stack
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-black border border-neutral-800 rounded-xl p-6 font-mono shadow-lg"
          >
            <h3 className="mb-5 text-sm uppercase tracking-[0.18em] text-neutral-400">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center border border-neutral-700 bg-neutral-900 text-xs text-emerald-400 px-3 py-1 rounded-md"
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