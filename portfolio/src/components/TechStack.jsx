import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3-force';
import ScrambleText from './ScrambleText';

export default function TechStack({ darkMode }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // 1. Define the Graph Data
  const initialData = useMemo(() => {
    const nodes = [
      // Core
      { id: 'Diya_OS', group: 0, radius: 24 },
      // Categories
      { id: 'Frontend', group: 1, radius: 16 },
      { id: 'Backend', group: 2, radius: 16 },
      { id: 'AI & APIs', group: 3, radius: 16 },
      { id: 'Systems', group: 4, radius: 16 },
      // Frontend Tech
      { id: 'React.js', group: 1, radius: 12 },
      { id: 'Tailwind CSS', group: 1, radius: 12 },
      { id: 'Vite', group: 1, radius: 12 },
      { id: 'JavaScript', group: 1, radius: 12 },
      // Backend Tech
      { id: 'Node.js', group: 2, radius: 12 },
      { id: 'Express.js', group: 2, radius: 12 },
      { id: 'SQL & MySQL', group: 2, radius: 12 },
      { id: 'Java', group: 2, radius: 12 },
      // AI & Data
      { id: 'Google AI Studio', group: 3, radius: 12 },
      { id: 'Gemini API', group: 3, radius: 12 },
      { id: 'Python', group: 3, radius: 12 },
      // Systems & Low Level
      { id: 'C++', group: 4, radius: 12 },
      { id: 'C', group: 4, radius: 12 },
      { id: 'Linux / Bash', group: 4, radius: 12 },
      { id: 'Git', group: 4, radius: 12 },
    ];

    const links = [
      { source: 'Diya_OS', target: 'Frontend' },
      { source: 'Diya_OS', target: 'Backend' },
      { source: 'Diya_OS', target: 'AI & APIs' },
      { source: 'Diya_OS', target: 'Systems' },

      { source: 'Frontend', target: 'React.js' },
      { source: 'Frontend', target: 'Tailwind CSS' },
      { source: 'Frontend', target: 'Vite' },
      { source: 'Frontend', target: 'JavaScript' },

      { source: 'Backend', target: 'Node.js' },
      { source: 'Backend', target: 'Express.js' },
      { source: 'Backend', target: 'SQL & MySQL' },
      { source: 'Backend', target: 'Java' },

      { source: 'AI & APIs', target: 'Google AI Studio' },
      { source: 'AI & APIs', target: 'Gemini API' },
      { source: 'AI & APIs', target: 'Python' },

      { source: 'Systems', target: 'C++' },
      { source: 'Systems', target: 'C' },
      { source: 'Systems', target: 'Linux / Bash' },
      { source: 'Systems', target: 'Git' },
    ];

    return { nodes, links };
  }, []);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const simulationRef = useRef(null);

  // 2. Handle Resize
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Initialize D3 Physics Engine
  useEffect(() => {
    const simNodes = initialData.nodes.map(d => ({ ...d }));
    const simLinks = initialData.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(simNodes)
      .force('link', d3.forceLink(simLinks).id(d => d.id).distance(60))
      .force('charge', d3.forceManyBody().strength(-300)) // Repel nodes away from each other
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide().radius(d => d.radius + 10).iterations(2))
      .on('tick', () => {
        // Trigger React re-render on every physics frame
        setNodes([...simulation.nodes()]);
        setLinks([...simLinks]);
      });

    simulationRef.current = simulation;

    return () => simulation.stop();
  }, [dimensions.width, dimensions.height, initialData]);

  // 4. Drag Event Handlers
  const handleDragStart = (e, node) => {
    if (!simulationRef.current) return;
    // Heat up the simulation to get things moving
    simulationRef.current.alphaTarget(0.3).restart();
    node.fx = node.x;
    node.fy = node.y;
  };

  const handleDrag = (e, node) => {
    // Update fixed position based on mouse coordinates relative to SVG
    const svgRect = containerRef.current.getBoundingClientRect();
    node.fx = e.clientX - svgRect.left;
    node.fy = e.clientY - svgRect.top;
  };

  const handleDragEnd = (e, node) => {
    if (!simulationRef.current) return;
    // Cool down the simulation
    simulationRef.current.alphaTarget(0);
    node.fx = null; // Release the node back to physics
    node.fy = null;
  };

  return (
    <section className="w-full max-w-5xl font-mono relative">
      <div className="mb-6">
        <p className={`text-sm font-bold uppercase tracking-[0.25em] ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          $ <ScrambleText text="system-architecture" />
        </p>
      </div>

      <div
        ref={containerRef}
        className={`w-full h-[500px] border rounded-xl shadow-2xl overflow-hidden relative cursor-crosshair ${
          darkMode ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'
        }`}
      >
        <svg width="100%" height="100%" className="absolute inset-0 z-10">

          {/* Draw Links (Rubber Bands) */}
          <g strokeOpacity={0.4}>
            {links.map((link, i) => (
              <line
                key={i}
                x1={link.source.x || 0}
                y1={link.source.y || 0}
                x2={link.target.x || 0}
                y2={link.target.y || 0}
                strokeWidth={Math.sqrt(link.value || 2)}
                className={darkMode ? 'stroke-emerald-500/30' : 'stroke-emerald-600/30'}
              />
            ))}
          </g>

          {/* Draw Nodes */}
          <g>
            {nodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x || 0},${node.y || 0})`}
                onPointerDown={(e) => {
                  e.target.setPointerCapture(e.pointerId);
                  handleDragStart(e, node);
                }}
                onPointerMove={(e) => {
                  if (node.fx !== undefined && node.fx !== null) {
                    handleDrag(e, node);
                  }
                }}
                onPointerUp={(e) => {
                  e.target.releasePointerCapture(e.pointerId);
                  handleDragEnd(e, node);
                }}
                onPointerCancel={(e) => handleDragEnd(e, node)}
                className="cursor-grab active:cursor-grabbing touch-none"
              >
                {/* Node Circle */}
                <circle
                  r={node.radius}
                  className={`transition-colors duration-200 ${
                    node.group === 0 
                      ? (darkMode ? 'fill-emerald-500' : 'fill-emerald-600')
                      : node.group === 1 || node.group === 2 || node.group === 3 || node.group === 4
                        ? (darkMode ? 'fill-neutral-800 stroke-emerald-500 stroke-2' : 'fill-slate-100 stroke-emerald-600 stroke-2')
                        : (darkMode ? 'fill-neutral-900 stroke-neutral-700' : 'fill-white stroke-neutral-300')
                  }`}
                />

                {/* Node Label Container (ForeignObject allows standard HTML text rendering) */}
                <foreignObject
                  x={-(node.radius * 4)}
                  y={node.radius + 4}
                  width={node.radius * 8}
                  height={40}
                  className="pointer-events-none"
                >
                  <div className={`w-full text-center text-[10px] font-bold ${
                    node.group === 0 
                      ? (darkMode ? 'text-white' : 'text-neutral-900')
                      : (darkMode ? 'text-emerald-400' : 'text-emerald-700')
                  }`}>
                    {node.id}
                  </div>
                </foreignObject>
              </g>
            ))}
          </g>
        </svg>

        {/* HUD Overlay */}
        <div className={`absolute bottom-4 left-4 z-20 text-[10px] font-bold opacity-50 pointer-events-none ${
          darkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          [ INTERACTIVE_NODE_GRAPH ]<br/>
          &gt; drag nodes to apply physics forces
        </div>
      </div>
    </section>
  );
}