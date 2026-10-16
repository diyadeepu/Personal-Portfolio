import { useState, useEffect, useRef } from 'react';
import { playTypingClack, playHoverTick } from '../utils/audioManager';

export default function AIAssistantWidget({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', text: "Hi! I'm Diya's portfolio AI. Ask me about her internships, projects, or tech stack!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Mock Knowledge Base (Simulating an LLM response)
  const getSimulatedResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('vercible')) return "Diya worked at Vercible as a SWE Intern (Aug 2023 - Mar 2024), where she built full-stack features, an interactive college-fit quiz, and integrated an AI chatbot.";
    if (q.includes('cardinal') || q.includes('pm') || q.includes('product')) return "At Cardinal Services, Diya was a Product Management Intern. She led product strategy, qualitative user research, and authored PRDs for an employee onboarding platform.";
    if (q.includes('electable')) return "Electable is a civic-engagement app she built during BeaverHacks using React, Node.js, and the FEC API to match voters with candidates.";
    if (q.includes('route4u')) return "Route4U is a safety navigation platform she developed, focusing on pedestrian safety metrics like street lighting rather than just vehicle speed.";
    if (q.includes('education') || q.includes('osu') || q.includes('oregon state')) return "Diya is an Honors CS student minoring in Business at Oregon State University (4.0 GPA), expecting to graduate in June 2028.";
    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) return "Her technical stack includes React, Node.js, Python, Java, C++, SQL, Tailwind, and integrating APIs like Google AI Studio.";
    if (q.includes('research') || q.includes('ursa')) return "She worked as an Undergraduate Researcher in the URSA Engage program, researching mathematical models for commercial truck parking networks using Python and GIS data.";
    return "That's a great question! I'm a lightweight mock model, but you can definitely ask me about her Vercible SWE internship, her Cardinal Services PM role, or her projects like Electable!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    const fullResponse = getSimulatedResponse(userText);

    // Create an empty system message that we will stream text into
    setMessages(prev => [...prev, { role: 'system', text: '' }]);

    let currentIndex = 0;

    // Simulate API Streaming
    const streamInterval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        const nextChar = fullResponse[currentIndex];

        // Play typing clack for non-space characters
        if (nextChar !== ' ') playTypingClack();

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text += nextChar;
          return newMessages;
        });
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsTyping(false);
      }
    }, 25); // Speed of the text stream
  };

  return (
    <>
      {/* Floating Action Button (The ? icon) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={playHoverTick}
          className={`fixed bottom-6 left-6 z-[99999] w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xl cursor-none transition-all hover:scale-110 shadow-lg ${
            darkMode 
              ? 'bg-black border-emerald-500 text-emerald-400 shadow-emerald-500/20 hover:bg-emerald-500/10' 
              : 'bg-white border-emerald-600 text-emerald-600 shadow-emerald-600/20 hover:bg-emerald-50'
          } animate-[bounce_3s_infinite]`}
        >
          ?
        </button>
      )}

      {/* The Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 left-6 z-[100000] w-[calc(100vw-3rem)] sm:w-80 rounded-xl border flex flex-col font-mono shadow-2xl transition-colors duration-200 animate-in slide-in-from-bottom-8 fade-in ${
          darkMode ? 'bg-[#0a0a0a] border-emerald-500/50' : 'bg-white border-emerald-600/50'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-3 border-b ${darkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-slate-50'}`}>
            <span className={`text-xs font-bold flex items-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ai_prompt.exe
            </span>
            <button
              onClick={() => setIsOpen(false)}
              onMouseEnter={playHoverTick}
              className={`text-[10px] border px-2 py-1 rounded font-bold transition-colors cursor-none ${
                darkMode ? 'text-neutral-400 border-neutral-700 hover:text-white hover:bg-neutral-800' : 'text-neutral-600 border-neutral-300 hover:text-black hover:bg-neutral-100'
              }`}
            >
              [x]
            </button>
          </div>

          {/* Chat History */}
          <div className="h-64 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className={`text-[10px] mb-1 font-bold ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {msg.role === 'user' ? 'GUEST' : 'AI_AGENT'}
                </span>
                <div className={`p-2 rounded-lg max-w-[90%] ${
                  msg.role === 'user' 
                    ? (darkMode ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-300')
                    : (darkMode ? 'bg-neutral-900 text-neutral-300 border border-neutral-800' : 'bg-neutral-50 text-neutral-700 border border-neutral-200')
                }`}>
                  {msg.text}
                  {isTyping && idx === messages.length - 1 && msg.role === 'system' && (
                    <span className={`inline-block w-1.5 h-3 ml-1 align-middle animate-pulse ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className={`p-3 border-t flex gap-2 ${darkMode ? 'border-neutral-800 bg-black' : 'border-neutral-200 bg-white'} rounded-b-xl`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder="Ask me anything..."
              className={`flex-1 bg-transparent outline-none border-none text-xs sm:text-sm cursor-none ${
                darkMode ? 'text-white placeholder:text-neutral-600' : 'text-black placeholder:text-neutral-400'
              }`}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              onMouseEnter={playHoverTick}
              className={`text-xs px-3 py-1.5 rounded font-bold cursor-none transition-colors disabled:opacity-50 ${
                darkMode 
                  ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black' 
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              ↵
            </button>
          </form>
        </div>
      )}
    </>
  );
}