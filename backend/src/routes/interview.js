import { Router } from "express";
import { createSession, getSession, updateSession } from "../state/sessionStore.js";
import { buildPlan } from "../logic/planner.js";
import { startInterview, advanceTurn } from "../logic/stateMachine.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { sessionId, candidate, message } = req.body;
    if (!sessionId) return res.status(400).json({ error: "sessionId is required" });

    let session = getSession(sessionId);

    // Already finished — return the static completion reply, don't reopen the state machine.
    if (session?.done) {
      return res.json({ reply: "Interview completed.", done: true, feedback: session.feedback });
    }

    // First request for this session — candidate object present, no message yet.
    if (!session && candidate) {
      const plan = buildPlan(candidate);
      session = createSession(sessionId, candidate, plan);
      const result = await startInterview(session);
      updateSession(sessionId, session);
      return res.json(result);
    }

    if (!session) {
      return res.status(400).json({ error: "Unknown sessionId and no candidate provided to start one" });
    }

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "message is required for a conversation turn" });
    }

    const result = await advanceTurn(session, message);
    updateSession(sessionId, session);
    return res.json(result);
  } catch (err) {
    console.error("Interview route error:", err);
    return res.status(500).json({ error: "Internal error processing interview turn" });
  }
});

export default router;
