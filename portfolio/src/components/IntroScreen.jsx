export default function IntroScreen({ onProceed }) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 font-mono relative overflow-hidden bg-[#050505] text-white">
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[30rem] h-[30rem] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="z-10 flex flex-col items-center justify-center space-y-10 text-center">
        {/* Main Greeting */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight">
          Hi, I'm <span className="text-emerald-400">Diya Deepu</span>
        </h1>

        {/* Action Button */}
        <button
          onClick={onProceed}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
        >
          <span>click here to learn more about me</span>
          <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}