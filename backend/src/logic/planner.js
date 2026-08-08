import curriculum from "../data/curriculum.json" with { type: "json" };

const FLOOR_QUESTIONS = 8;
const CEILING_QUESTIONS = 12;

function findCurriculumDay(dayNumber) {
  return curriculum.days.find((d) => d.day === dayNumber) || null;
}

/**
 * Deterministic plan builder — NOT delegated to the LLM.
 * Weak signals: any `skipped: true` mission, or a `passed: true` mission with attempts >= 4.
 * Base plan = up to 8 slots drawn from a spread of curriculum days the candidate touched.
 * Extra slots (up to CEILING_QUESTIONS total) are added one-per-weak-signal, most severe first
 * (skips before high-attempt passes), until the ceiling is hit or weak signals run out.
 */
export function buildPlan(candidate) {
  const missions = candidate.missions || [];

  const skipped = missions.filter((m) => m.skipped);
  const highAttemptPasses = missions
    .filter((m) => m.passed && (m.attempts || 0) >= 4)
    .sort((a, b) => b.attempts - a.attempts);
  const cleanPasses = missions.filter(
    (m) => m.passed && (m.attempts || 0) < 4
  );

  const weakSignalMissions = [...skipped, ...highAttemptPasses];

  // Base plan: prioritize weak signals first, then fill remaining slots from clean passes
  // spread across distinct days, until we hit the floor of 8 or run out of missions.
  const baseSelection = [];
  const usedDays = new Set();

  for (const m of weakSignalMissions) {
    if (baseSelection.length >= FLOOR_QUESTIONS) break;
    if (usedDays.has(m.day)) continue;
    baseSelection.push({
      day: m.day,
      title: m.title,
      reasonSelected: m.skipped ? "skipped" : `high_attempts(${m.attempts})`,
    });
    usedDays.add(m.day);
  }

  for (const m of cleanPasses) {
    if (baseSelection.length >= FLOOR_QUESTIONS) break;
    if (usedDays.has(m.day)) continue;
    baseSelection.push({ day: m.day, title: m.title, reasonSelected: "clean_pass" });
    usedDays.add(m.day);
  }

  // Extra slots beyond the floor, one per remaining weak signal, capped at CEILING_QUESTIONS.
  const remainingWeakSignals = weakSignalMissions.filter((m) => !usedDays.has(m.day));
  for (const m of remainingWeakSignals) {
    if (baseSelection.length >= CEILING_QUESTIONS) break;
    baseSelection.push({
      day: m.day,
      title: m.title,
      reasonSelected: m.skipped ? "skipped_extra" : `high_attempts_extra(${m.attempts})`,
    });
    usedDays.add(m.day);
  }

  // Attach curriculum objectives for prompt context.
  return baseSelection.map((slot) => {
    const dayInfo = findCurriculumDay(slot.day);
    return {
      day: slot.day,
      title: slot.title,
      objectives: dayInfo?.objectives || [],
      reasonSelected: slot.reasonSelected,
    };
  });
}

export { FLOOR_QUESTIONS, CEILING_QUESTIONS };
