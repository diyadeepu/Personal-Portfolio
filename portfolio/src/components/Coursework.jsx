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

export default function Coursework({ onBack, darkMode }) {
  return (
    <section className="w-full max-w-5xl font-mono">
      <button
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
          darkMode ? 'text-neutral-400 hover:text-emerald-400' : 'text-neutral-700 hover:text-emerald-600'
        }`}
      >
        <span>←</span> back to home
      </button>

      <div
        className={`border rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 transition-colors duration-500 ${
          darkMode ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b pb-4 ${
            darkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}
        >
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className={`ml-2 text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            coursework.txt
          </span>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-widest mb-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-500 font-semibold'}`}>
            $ cat coursework.txt
          </p>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            $ relevant-coursework
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-600 font-medium'}`}>
            Oregon State University — Honors College | CS + Business
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-2">
          {courseworkGroups.map((group) => (
            <div
              key={group.status}
              className={`border rounded-xl p-6 shadow-lg flex flex-col gap-5 transition-colors duration-500 ${
                darkMode
                  ? 'bg-neutral-950 border-neutral-800/80'
                  : 'bg-slate-50 border-neutral-300'
              }`}
            >
              <h3
                className={`text-sm font-semibold uppercase tracking-[0.18em] border-b pb-3 ${
                  darkMode
                    ? 'text-emerald-400 border-neutral-800/60'
                    : 'text-emerald-600 border-neutral-300'
                }`}
              >
                # {group.status}
              </h3>

              {/* CS, AI & Math */}
              <div>
                <p
                  className={`text-xs uppercase tracking-wider font-bold mb-3 ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-800'
                  }`}
                >
                  [ CS, AI & Math ]
                </p>
                <div className="space-y-1.5 ml-1">
                  {group.csMath.map((course, idx) => (
                    <div
                      key={course}
                      className={`flex items-center gap-2 text-xs ${
                        darkMode ? 'text-neutral-300' : 'text-neutral-900 font-medium'
                      }`}
                    >
                      <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600 font-bold'}>
                        {idx === group.csMath.length - 1 ? '└──' : '├──'}
                      </span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business & Communication */}
              <div>
                <p
                  className={`text-xs uppercase tracking-wider font-bold mb-3 ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-800'
                  }`}
                >
                  [ Business & Communication ]
                </p>
                <div className="space-y-1.5 ml-1">
                  {group.business.map((course, idx) => (
                    <div
                      key={course}
                      className={`flex items-center gap-2 text-xs ${
                        darkMode ? 'text-neutral-300' : 'text-neutral-900 font-medium'
                      }`}
                    >
                      <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600 font-bold'}>
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