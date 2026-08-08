import { motion } from "framer-motion";

// No avatar — candidates.json has no photo field. Only name, job role,
// years experience, and education are shown; signals/missions stay backend-only.
export default function ProfileCardPanel({ candidate }) {
  if (!candidate) return null;
  const { name, jobRole, yearsExperience, education } = candidate.member;

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
      className="border border-gold/60 rounded-2xl bg-white/70 backdrop-blur-md p-6 max-w-sm shadow-md"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-ink/70">{jobRole}</p>
      <div className="mt-3 text-sm space-y-1 text-ink/80">
        <p>
          <span className="text-gold font-medium">Experience:</span> {yearsExperience} years
        </p>
        <p>
          <span className="text-gold font-medium">Education:</span> {education}
        </p>
      </div>
    </motion.div>
  );
}
