const experiences = [
  {
    role: 'Product Management Intern',
    org: 'Cardinal Services x OSU PM Club',
    dates: 'Apr 2026 – June 2026',
    bullets: [
      'Architected product requirements and planned streamlined HR onboarding workflows with 7 other interns.',
      'Identified specific business needs and requirements from cross-functional leadership and qualitative research.'
    ],
  },
  {
    role: 'Undergraduate Research Assistant',
    org: 'OSU MIME Department (URSA Engage)',
    dates: 'Feb 2026 – Sep 2026',
    bullets: [
      'Evaluated Maximal Covering Location-Interdiction Models (MCLIP) for Oregon freight and truck parking infrastructure.',
      'Analyzed insights from complex data sets on 97 truck parking locations in Oregon using Python to report on infrastructure progress with faculty mentorship on a weekly basis.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Vercible',
    dates: 'Aug 2023 – Mar 2024',
    bullets: [
      'Developed full-stack web features and integrated interactive AI chat components for easier site navigation with 3 other interns.',
      'Engineered a best fit college quiz using HTML, CSS, and JavaScript to enhance user engagement and provide personalized recommendations.',
    ],
  },
  {
    role: 'Event Coordinator & Executive Board Member',
    org: 'OSU Product Management Club',
    dates: 'Ongoing',
    bullets: [
      'Leading event planning and member engagement initiatives for the product management community.',
      'Collaborating with a team of 10 members to bring more product management projects and opportunities for OSU community.',
    ],
  },
];

export default function Experience() {
  return (
    <section className="w-full max-w-5xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white font-mono">
          $ experience
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className="bg-black border border-neutral-800 rounded-xl p-6 font-mono shadow-lg"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <span>├──</span>
              <span>{item.role}</span>
            </div>

            <div className="mt-3 ml-6 space-y-2 text-sm text-neutral-300">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
                <span className="text-neutral-100">{item.org}</span>
                <span className="text-neutral-500">|</span>
                <span className="text-neutral-400">{item.dates}</span>
              </div>

              <div className="mt-3 space-y-2">
                {item.bullets.map((bullet, bulletIndex) => (
                  <div key={bullet} className="flex items-start gap-2 text-neutral-300">
                    <span className="text-emerald-400">
                      {bulletIndex === item.bullets.length - 1 ? '└──' : '├──'}
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}