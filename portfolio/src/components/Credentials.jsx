export default function Credentials({ darkMode }) {
  const credentials = [
    { title: 'BS in Computer Science (Honors)', org: 'Oregon State University', detail: 'Minor in Business | 4.0 GPA' },
    { title: 'Executive Board Member', org: 'OSU Product Management Club', detail: 'Event Coordinator' },
    { title: 'URSA Engage Researcher', org: 'OSU MIME Department', detail: 'Freight & Parking Models' },
  ];

  return (
    <section className="w-full max-w-5xl font-mono">
      <div className="mb-6">
        <p className={`text-sm font-bold uppercase tracking-[0.25em] ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          $ credentials-and-honors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {credentials.map((cred) => (
          <div
            key={cred.title}
            className={`border rounded-xl p-6 transition-colors duration-500 ${
              darkMode ? 'bg-black border-neutral-800 shadow-lg' : 'bg-white border-neutral-300 shadow-md'
            }`}
          >
            <h3 className={`text-sm font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {cred.title}
            </h3>
            <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {cred.org}
            </p>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {cred.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}