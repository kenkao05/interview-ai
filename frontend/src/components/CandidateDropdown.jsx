import { motion } from "framer-motion";

export default function CandidateDropdown({
  candidates,
  onSelect,
  selected,
  shrunk,
}) {
  return (
    <motion.select
      layout
      animate={{
        width: shrunk ? 220 : 480,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`border-2 border-gold rounded-full bg-white/70 backdrop-blur-md px-5 py-3 text-ink shadow-sm
        ${shrunk ? "fixed top-6 left-6 text-sm z-20" : "mx-auto block text-lg"}`}
      value={selected?.member?.id || ""}
      onChange={(e) => {
        const c = candidates.find((c) => c.member.id === e.target.value);
        onSelect(c);
      }}
    >
      <option value="" disabled>
        Select a candidate to interview
      </option>
      {candidates.map((c) => (
        <option key={c.member.id} value={c.member.id}>
          {c.member.name} — {c.member.jobRole}
        </option>
      ))}
    </motion.select>
  );
}
