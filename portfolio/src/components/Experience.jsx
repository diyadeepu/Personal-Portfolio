export default function Experience({ darkMode }) {
  const experiences = [
    {
      role: 'Product Management Intern',
      company: 'Cardinal Services x OSU PM Club',
      date: 'Apr 2026 – June 2026',
      bullets: [
        'Architected product requirements and planned streamlined HR onboarding workflows with 7 other interns.',
        'Identified specific business needs and requirements from cross-functional leadership and qualitative research.',
      ],
    },
    {
      role: 'Undergraduate Research Assistant',
      company: 'OSU MIME Department (URSA Engage)',
      date: 'Feb 2026 – Sep 2026',
      bullets: [
        'Evaluated Maximal Covering Location-Interdiction Models (MCLIP) for Oregon freight and truck parking infrastructure.',
        'Analyzed insights from complex data sets on 97 truck parking locations in Oregon using Python to report on infrastructure progress with faculty mentorship on a weekly basis.',
      ],
    },
    {
      role: 'Software Engineering Intern',
      company: 'Vercible',
      date: 'Aug 2023 – Mar 2024',
      bullets: [
        'Built full-stack interactive features for an adaptive high school college-fit evaluation web app.',
        'Integrated an AI chatbot and custom site navigation flows using React, Node.js, and Express.',
      ],
    },
  ];

  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p className={`text-sm font-bold uppercase tracking-[0.25em] ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          $ experience
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.role + exp.company}
            className={`border rounded-xl p-6 transition-colors duration-500 ${
              darkMode ? 'bg-black border-neutral-800 shadow-lg' : 'bg-white border-neutral-300 shadow-md'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <h3 className={`text-base font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ├─ {exp.role}
              </h3>
              <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600 font-semibold'}`}>
                {exp.date}
              </span>
            </div>

            <p className={`text-xs font-semibold mb-4 pl-4 ${darkMode ? 'text-neutral-200' : 'text-neutral-900'}`}>
              {exp.company}
            </p>

            <ul className="space-y-2 pl-4 text-xs leading-relaxed">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className={`flex items-start gap-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>
                    {idx === exp.bullets.length - 1 ? '└─' : '├─'}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}