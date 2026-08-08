export default function ProgressBar({ current, total = 8 }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2
      bg-white/10 backdrop-blur-md border border-gold/50 rounded-full px-4 py-1.5 text-sm text-eggshell">
      <span className="w-2 h-2 rounded-full bg-gold" />
      <span>
        Question {current} of {total}
      </span>
    </div>
  );
}