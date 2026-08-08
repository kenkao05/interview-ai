"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TrueFocus from "./TrueFocus.jsx";
import { ArrowRight, Sparkles } from "lucide-react";

export default function IntroOverlay({ onStart, ready }) {
  const introFocusRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [offset, setOffset] = useState(0);

  function handleClick() {
    const introEl = introFocusRef.current;
    const homeEl = document.getElementById("hero-focus");
    if (introEl && homeEl) {
      const introRect = introEl.getBoundingClientRect();
      const homeRect = homeEl.getBoundingClientRect();
      setOffset(introRect.top - homeRect.top);
    }
    setPhase("sliding");
  }

  const sliding = phase === "sliding";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: sliding ? 0.4 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 bg-eggshell"
      >
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: sliding ? -offset : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (sliding) onStart();
        }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 pointer-events-auto text-ink"
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: sliding ? 0 : 1 }}
            transition={sliding ? { duration: 0.3 } : { delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-medium backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>31-Day AI Cohort Evaluation Engine</span>
          </motion.div>

          <div ref={introFocusRef}>
            <TrueFocus
              sentence="AI INTERVIEW AGENT"
              manualMode={false}
              blurAmount={5}
              borderColor="#C9A24B"
              glowColor="rgba(201, 162, 75, 0.8)"
              animationDuration={0.6}
              pauseBetweenAnimations={1}
            />
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: sliding ? 0 : 1 }}
            transition={sliding ? { duration: 0.3 } : { delay: 0.4 }}
            className="text-ink/60 text-sm sm:text-base max-w-lg leading-relaxed"
          >
            An automated technical interviewer designed to test candidate knowledge, conduct interactive Q&A sessions, and output accurate evaluation scorecards.
          </motion.p>

          <AnimatePresence mode="wait">
            {ready ? (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: sliding ? 0 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={sliding ? { duration: 0.3 } : { duration: 0.4 }}
              >
                <button
                  onClick={handleClick}
                  disabled={sliding}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-gold bg-ink text-eggshell font-semibold text-sm shadow-lg transition-all duration-300 hover:bg-gold hover:text-ink hover:scale-105 active:scale-95"
                >
                  <span>Start Interview Session</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 w-56"
              >
                <div className="w-full h-1.5 rounded-full bg-gold/15 overflow-hidden">
                  <motion.div
                    className="h-full w-1/3 bg-gold rounded-full"
                    animate={{ x: ["-100%", "220%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <span className="text-ink/50 text-xs">Loading…</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}