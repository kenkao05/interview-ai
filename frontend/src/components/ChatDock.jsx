import { HomeIcon } from "./icons.jsx";

export default function ChatDock({ onHome }) {
  return (
    <button
      onClick={onHome}
      aria-label="Home"
      className="fixed top-6 right-6 z-30 w-12 h-12 rounded-2xl border-2 border-gold
        bg-white/70 backdrop-blur-md flex items-center justify-center
        hover:bg-gold hover:text-eggshell transition-colors text-ink"
    >
      <HomeIcon />
    </button>
  );
}