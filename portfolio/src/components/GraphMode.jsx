import { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphMode({ darkMode, onToggleTheme, onClose }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const graphRef = useRef();

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Your Resume structured as a Graph Database
  const data = {
    nodes: [
      { id: 'Diya Deepu', group: 'root', val: 35, desc: 'Honors CS Student & AI PM' },

      { id: 'Experience', group: 'category', val: 22, desc: 'Professional History' },
      { id: 'Cardinal Services', group: 'exp', val: 14, desc: 'Product Management Intern - Defined product strategy for customizable employee onboarding handbook.' },
      { id: 'Vercible', group: 'exp', val: 14, desc: 'Software Engineering Intern - Built interactive web quiz and integrated AI chatbot.' },
      { id: 'URSA Engage', group: 'exp', val: 14, desc: 'Undergraduate Researcher - Python data analysis for emergency truck parking networks.' },

      { id: 'Projects', group: 'category', val: 22, desc: 'Technical & PM Projects' },
      { id: 'Electable', group: 'proj', val: 14, desc: 'Civic matching web app built in 24 hrs using Gemini API and FEC data.' },
      { id: 'Route4U', group: 'proj', val: 14, desc: 'Safety-focused customizable travel route PM project.' },
      { id: 'AI Syllabus', group: 'proj', val: 14, desc: 'Canvas REST API & Google AI Studio syllabus parser.' },

      { id: 'Education', group: 'category', val: 22, desc: 'Academic Background' },
      { id: 'Oregon State', group: 'edu', val: 14, desc: 'B.S. Computer Science, Minor in Business. Honors College. 4.0 GPA.' },

      { id: 'Skills', group: 'category', val: 22, desc: 'Technical Competencies' },
      { id: 'React & Node', group: 'skill', val: 12, desc: 'Full-stack web development frameworks.' },
      { id: 'Python & C++', group: 'skill', val: 12, desc: 'Object-oriented and systems programming.' },
      { id: 'Gemini API', group: 'skill', val: 12, desc: 'AI integration and prompt engineering.' }
    ],
    links: [
      { source: 'Diya Deepu', target: 'Experience', label: 'HAS_HISTORY' },
      { source: 'Experience', target: 'Cardinal Services', label: 'INTERNED_AT' },
      { source: 'Experience', target: 'Vercible', label: 'INTERNED_AT' },
      { source: 'Experience', target: 'URSA Engage', label: 'RESEARCHES_AT' },

      { source: 'Diya Deepu', target: 'Projects', label: 'BUILT' },
      { source: 'Projects', target: 'Electable', label: 'CREATED' },
      { source: 'Projects', target: 'Route4U', label: 'MANAGED' },
      { source: 'Projects', target: 'AI Syllabus', label: 'ENGINEERED' },

      { source: 'Diya Deepu', target: 'Education', label: 'STUDIES' },
      { source: 'Education', target: 'Oregon State', label: 'ATTENDS' },

      { source: 'Diya Deepu', target: 'Skills', label: 'KNOWS' },
      { source: 'Skills', target: 'React & Node', label: 'PROFICIENT_IN' },
      { source: 'Skills', target: 'Python & C++', label: 'PROFICIENT_IN' },
      { source: 'Skills', target: 'Gemini API', label: 'INTEGRATES' }
    ]
  };

  // Color mapping based on your emerald aesthetic
  const getNodeColor = (group) => {
    const colors = {
      root: darkMode ? '#10b981' : '#059669',     // Emerald
      category: darkMode ? '#34d399' : '#10b981', // Lighter Emerald
      exp: darkMode ? '#f59e0b' : '#d97706',      // Amber
      proj: darkMode ? '#8b5cf6' : '#6d28d9',     // Purple
      edu: darkMode ? '#3b82f6' : '#2563eb',      // Blue
      skill: darkMode ? '#ec4899' : '#db2777'     // Pink
    };
    return colors[group] || '#10b981';
  };

  return (
    <div className={`fixed inset-0 z-[99999] font-mono overflow-hidden transition-colors duration-500 ${
      darkMode ? 'bg-[#050505] text-neutral-200' : 'bg-slate-50 text-neutral-900'
    }`}>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="inline-flex flex-col gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded border ${
              darkMode ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
            }`}>
              GRAPH_MODE: ACTIVE
            </span>
            <button
              onClick={onClose}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                darkMode ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-400' : 'border-neutral-300 hover:bg-neutral-200 text-neutral-600'
              }`}
            >
              Press ESC or Click to Exit
            </button>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className={`pointer-events-auto p-2.5 rounded-full border transition-all duration-500 cursor-pointer shadow-lg ${
            darkMode
              ? 'bg-black/80 border-neutral-800 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/50'
              : 'bg-white border-neutral-300 text-neutral-700 hover:text-emerald-600 hover:border-emerald-500/50'
          }`}
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" strokeWidth="2" />
              <path strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Side Details Panel */}
      {selectedNode && (
        <div className={`absolute bottom-6 right-6 sm:top-24 sm:bottom-auto w-80 p-5 rounded-xl border shadow-2xl z-10 pointer-events-auto backdrop-blur-md animate-in fade-in slide-in-from-right-8 duration-300 ${
          darkMode ? 'bg-black/80 border-neutral-800' : 'bg-white/90 border-neutral-300'
        }`}>
          <div className="flex items-center gap-3 mb-3 border-b pb-3 border-neutral-700/50">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getNodeColor(selectedNode.group) }} />
            <h3 className="font-bold text-lg">{selectedNode.id}</h3>
          </div>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            {selectedNode.desc}
          </p>
        </div>
      )}

      {/* The Physics Graph */}
      <div className="w-full h-full cursor-move">
        <ForceGraph2D
          ref={graphRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeLabel="id"
          onNodeClick={(node) => setSelectedNode(node)}
          onBackgroundClick={() => setSelectedNode(null)}
          linkColor={() => darkMode ? '#333333' : '#cbd5e1'}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.25}
          // Custom Canvas Drawing to make it look exactly like Neo4j
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = Math.max(12 / globalScale, 4); // Keep text legible
            const nodeRadius = node.val;

            // Draw Node Circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor(node.group);
            ctx.fill();

            // Draw Outer Glow/Stroke
            ctx.lineWidth = 1.5 / globalScale;
            ctx.strokeStyle = darkMode ? '#ffffff30' : '#00000030';
            ctx.stroke();

            // Draw Text inside Node
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = (darkMode || node.group === 'root') ? '#ffffff' : '#000000';
            ctx.font = `bold ${fontSize}px Sans-Serif`;

            // Text Wrapping/Fitting logic
            if (label.includes(' ')) {
              const parts = label.split(' ');
              ctx.fillText(parts[0], node.x, node.y - fontSize * 0.6);
              ctx.fillText(parts.slice(1).join(' '), node.x, node.y + fontSize * 0.6);
            } else {
              ctx.fillText(label, node.x, node.y);
            }
          }}
        />
      </div>
    </div>
  );
}