import { useEffect, useState } from "react";

export default function TypingIndicator() {
  const [stillThinking, setStillThinking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStillThinking(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (stillThinking) {
    return <p className="text-eggshell/50 italic text-sm">Still thinking…</p>;
  }

  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gold/70 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}