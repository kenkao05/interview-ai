import { motion } from "framer-motion";

// Auto-slides up on done:true. Backdrop dims/blocks taps on chat, but the drag
// handle is the ONLY dismiss path — pull down to peek chat, pull up to view
// feedback. Deliberately not a tap-outside-to-close modal (see PRD Section 6).
export default function FeedbackDrawer({ feedback, open }) {
  if (!feedback) return null;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-30" />}
      <motion.div
        drag="y"
        dragConstraints={{ top: -400, bottom: 0 }}
        dragElastic={0.15}
        initial={{ y: "100%" }}
        animate={{ y: open ? "10%" : "92%" }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg
          border-t-2 border-gold rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="w-12 h-1.5 bg-gold/60 rounded-full mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="mb-4 text-ink/80">{feedback.summary}</p>

        <h3 className="text-gold font-medium mb-1">Strengths</h3>
        <ul className="list-disc list-inside mb-4 text-sm space-y-1">
          {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
        </ul>

        <h3 className="text-gold font-medium mb-1">Gaps</h3>
        <ul className="list-disc list-inside mb-4 text-sm space-y-1">
          {feedback.gaps.map((g, i) => <li key={i}>{g}</li>)}
        </ul>

        <h3 className="text-gold font-medium mb-1">Next Steps</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {feedback.next.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      </motion.div>
    </>
  );
}
