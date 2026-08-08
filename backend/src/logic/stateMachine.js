import { callLLM } from "../llm/llmRouter.js";
import { interviewerSystemPrompt } from "../prompts/systemPrompts.js";
import { CEILING_QUESTIONS } from "./planner.js";
import { generateFeedback } from "./feedback.js";

// Advances one turn of the interview. Code — not the LLM — is the final authority
// on whether the plan/cap has room left. See PRD Section 5.3.
export async function advanceTurn(session, candidateMessage) {
  session.transcript.push({ role: "candidate", content: candidateMessage });

  const atCeiling = session.questionsAskedCount >= CEILING_QUESTIONS;
  const planExhausted = session.currentIndex >= session.plan.length;

  if (atCeiling || planExhausted) {
    const feedback = await generateFeedback(session);
    session.done = true;
    session.feedback = feedback;
    return {
      reply: "Interview completed.",
      done: true,
      feedback,
    };
  }

  const systemPrompt = interviewerSystemPrompt(session.candidate, session.plan);
  const messages = session.transcript.map((t) => ({
    role: t.role === "interviewer" ? "assistant" : "user",
    content: t.content,
  }));

  const reply = await callLLM(systemPrompt, messages);

  session.transcript.push({ role: "interviewer", content: reply });
  session.questionsAskedCount += 1;

  // Simple heuristic: advance the plan pointer unless this looks like a probe
  // (kept intentionally simple — the LLM signals a probe via a leading marker;
  // in a production implementation this should be tightened with a structured output call).
  const isProbe = reply.trim().startsWith("[PROBE]");
  if (!isProbe) {
    session.currentIndex += 1;
    session.probesUsedThisQuestion = 0;
  } else {
    session.probesUsedThisQuestion += 1;
  }

  return { reply: reply.replace(/^\[PROBE\]\s*/, ""), done: false };
}

export async function startInterview(session) {
  const systemPrompt = interviewerSystemPrompt(session.candidate, session.plan);
  const opening = await callLLM(systemPrompt, [
    { role: "user", content: "Begin the interview with a brief welcome and your first question." },
  ]);
  session.transcript.push({ role: "interviewer", content: opening });
  session.questionsAskedCount += 1;
  return { reply: opening, done: false };
}
