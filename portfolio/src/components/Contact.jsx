export default function Contact({ onBack, darkMode }) {
  return (
    <div className="w-full max-w-3xl font-mono">
      <button
        onClick={onBack}
        className={`mb-6 text-xs font-bold inline-flex items-center gap-1 cursor-pointer ${
          darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
        }`}
      >
        ← back to main terminal
      </button>

      <div
        className={`border rounded-xl p-6 sm:p-8 shadow-2xl transition-colors duration-500 ${
          darkMode ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
        }`}
      >
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          $ contact --send-message
        </h2>

        <form className="space-y-4">
          <div>
            <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Name
            </label>
            <input
              type="text"
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-emerald-600'
              }`}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Email
            </label>
            <input
              type="email"
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-emerald-600'
              }`}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Message
            </label>
            <textarea
              rows="5"
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-emerald-600'
              }`}
              placeholder="Type your message here..."
            />
          </div>

          <button
            type="button"
            className={`px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              darkMode ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            send_message()
          </button>
        </form>
      </div>
    </div>
  );
}