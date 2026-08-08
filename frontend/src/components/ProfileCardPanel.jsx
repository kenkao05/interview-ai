import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ProfileCardPanel({ candidate }) {
  if (!candidate) return null;
  const { name, jobRole, yearsExperience, education } = candidate.member;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
    </motion.div>
  );
}