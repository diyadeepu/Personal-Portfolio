export default function Coursework({ onBack }) {
  const categories = [
    {
      title: 'Computer Science & Software Systems',
      courses: [
        { code: 'CS 161/162', name: 'Intro to Computer Science I & II (C++)' },
        { code: 'CS 261', name: 'Data Structures' },
        { code: 'CS 290', name: 'Web Development' },
        { code: 'CS 225', name: 'Discrete Structures in Computer Science' },
        { code: 'CS 340', name: 'Introduction to Databases' },
      ],
    },
    {
      title: 'Business, Product & Management',
      courses: [
        { code: 'BA 101', name: 'Business Now (Foundations of Business)' },
        { code: 'BA 211', name: 'Financial Accounting' },
        { code: 'BA 213', name: 'Managerial Accounting' },
        { code: 'ECON 201', name: 'Intro to Microeconomics' },
      ],
    },
    {
      title: 'Mathematics & Honors Scholar',
      courses: [
        { code: 'MTH 251/252', name: 'Differential & Integral Calculus' },
        { code: 'MTH 254', name: 'Vector Calculus' },
        { code: 'HC 199', name: 'Honors Colloquia & Thesis Research' },
      ],
    },
  ];

  return (
    <section className="w-full max-w-3xl font-mono">
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
          <h1 className="text-2xl font-bold text-white">Relevant Coursework</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Oregon State University — Honors College | CS + Business
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3"
            >
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                # {cat.title}
              </h2>
              <ul className="space-y-2">
                {cat.courses.map((course) => (
                  <li
                    key={course.code}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b border-neutral-800/50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-bold text-neutral-200">
                      {course.code}
                    </span>
                    <span className="text-neutral-400">{course.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}