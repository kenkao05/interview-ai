import { motion } from "framer-motion";

export default function FeedbackDrawer({ feedback, open, onToggle, onDrawerStateChange }) {
  if (!feedback) return null;

  function handleDragEnd(event, info) {
    // If dragged down far enough, collapse to peek. Otherwise snap open.
    if (info.offset.y > 100) {
      onDrawerStateChange(false);
    } else {
      onDrawerStateChange(true);
    }
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-30" />}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: open ? "10%" : "99%" }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg
          border-t-2 border-gold rounded-t-3xl p-6 pb-40 max-h-[125vh] overflow-y-auto"
      >
        <div
          onClick={onToggle}
          className="w-12 h-1.5 bg-gold/60 rounded-full mx-auto mb-4 cursor-pointer"
        />
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