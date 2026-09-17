const courseworkGroups = [
  {
    status: 'Completed / Current',
    csMath: [
      'Data Structures',
      'Collaborating with AI',
      'Web Development',
      'Computer Architecture',
      'Discrete Mathematics',
      'Intro to Computer Science II',
      'Differential & Integral Calculus',
      'Your Data Body',
    ],
    business: [
      'Foundations of the Entrepreneurial Mindset',
      'Technical Writing & Writing in Business',
      'Public Speaking',
      'Principles of Marketing',
      'Principles of Microeconomics',
    ],
  },
  {
    status: 'Upcoming',
    csMath: [
      'Software Engineering I',
      'Introduction to Databases',
      'Analysis of Algorithms',
      'Operating Systems I',
      'Introduction to Systems Programming',
      'Intro to Stats for Engineers',
    ],
    business: [
      'Managing Organizations',
      'Sustainable Business Operations',
      'Introduction to Business Law',
    ],
  },
];

export default function Coursework() {
  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">
          $ relevant-coursework
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courseworkGroups.map((group) => (
          <div
            key={group.status}
            className="bg-black border border-neutral-800 rounded-xl p-6 shadow-lg flex flex-col gap-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              # {group.status}
            </h3>

            {/* CS, AI & Math */}
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
                [ CS, AI & Math ]
              </p>
              <div className="space-y-1 ml-1">
                {group.csMath.map((course, idx) => (
                  <div key={course} className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="text-emerald-400">
                      {idx === group.csMath.length - 1 ? '└──' : '├──'}
                    </span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business, Product & Communication */}
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
                [ Business & Communication ]
              </p>
              <div className="space-y-1 ml-1">
                {group.business.map((course, idx) => (
                  <div key={course} className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="text-emerald-400">
                      {idx === group.business.length - 1 ? '└──' : '├──'}
                    </span>
                    <span>{course}</span>
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