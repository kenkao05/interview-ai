// In-memory session store. Spec explicitly excludes cross-session persistence,
// so a Map is the correct amount of engineering here — no DB.
const sessions = new Map();

export function createSession(sessionId, candidate, plan) {
  const state = {
    candidate,
    plan,
    transcript: [],
    currentIndex: 0,
    probesUsedThisQuestion: 0,
    questionsAskedCount: 0,
    done: false,
    feedback: null,
  };
  sessions.set(sessionId, state);
  return state;
}

export function getSession(sessionId) {
  return sessions.get(sessionId) || null;
}

export function updateSession(sessionId, patch) {
  const current = sessions.get(sessionId);
  if (!current) return null;
  const updated = { ...current, ...patch };
  sessions.set(sessionId, updated);
  return updated;
}
