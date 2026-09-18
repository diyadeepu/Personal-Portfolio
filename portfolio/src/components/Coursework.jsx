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

export default function Coursework({ onBack }) {
  return (
    <section className="w-full max-w-5xl font-mono">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <span>←</span> back to home
      </button>

      <div className="bg-black border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-xs text-neutral-500">coursework.txt</span>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">
            $ cat coursework.txt
          </p>
          <h1 className="text-2xl font-bold text-white">$ relevant-coursework</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Oregon State University — Honors College | CS + Business
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-2">
          {courseworkGroups.map((group) => (
            <div
              key={group.status}
              className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-6 shadow-lg flex flex-col gap-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400 border-b border-neutral-800/60 pb-3">
                # {group.status}
              </h3>

              {/* CS, AI & Math */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
                  [ CS, AI & Math ]
                </p>
                <div className="space-y-1.5 ml-1">
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

              {/* Business & Communication */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">
                  [ Business & Communication ]
                </p>
                <div className="space-y-1.5 ml-1">
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
      </div>
    </section>
  );
}