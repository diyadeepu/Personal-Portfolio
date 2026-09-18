const credentials = [
  {
    category: 'Education & Honors',
    items: [
      'Oregon State University – Honors College (CS Major, Business Minor)',
      '4.0 GPA | Junior Standing | Expected Graduation: June 2028',
      'Lake Oswego High School Graduate (June 2025)',
    ],
  },
  {
    category: 'Research & Grants',
    items: [
      'URSA Engage Research Grantee – Freight Transport & Parking Location Modeling',
      'Undergraduate Researcher – OSU MIME Department',
    ],
  },
  {
    category: 'Awards, Course Certificates & Scholarships',
    items: [
      'Programming Foundations - Databases:  July 2026',
      'Understanding Prompt Engineering Course: February 2026',
      'Oregon State University Finley Scholarship: September 2025 - Present',
      'Best Creative Solution, ENGR 110H: December 2025',
      'Gloria Brown Scholarship: June 2025',
      'Lake Oswego High School Departmental Student of Merit - Computer Science: June 2025',
      'NCWIT Aspirations in Computing Oregon & SW Washington: May 2024, May 2025',
      'NorthSouth Foundation CS Bee - 2nd place Winner Oregon: April 2023',
    ],
  },
  {
    category: 'Leadership & Community',
    items: [
      'Event Coordinator & Executive Board Member – OSU Product Management Club',
      'President & Founder – Lake Oswego High School CS Club',
      'Youth Advisory Member – Lake Oswego Parks & Recreation DEI Subgroup',
    ],
  },
];

export default function Credentials() {
  return (
    <section className="w-full max-w-5xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white font-mono">
          $ credentials-and-honors
        </p>
      </div>

      <div className="space-y-6">
        {credentials.map((group) => (
          <div
            key={group.category}
            className="bg-black border border-neutral-800 rounded-xl p-6 font-mono shadow-lg"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              # {group.category}
            </h3>

            <div className="space-y-2">
              {group.items.map((item, idx) => (
                <div key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-emerald-400">
                    {idx === group.items.length - 1 ? '└──' : '├──'}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}