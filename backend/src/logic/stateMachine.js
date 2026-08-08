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

  const isProbe = reply.trim().startsWith("[PROBE]");
  if (!isProbe) {
    session.currentIndex += 1;
    session.probesUsedThisQuestion = 0;
  } else {
    session.probesUsedThisQuestion += 1;
  }

  // Re-check right after advancing — the plan may have just been completed by this turn.
  const nowExhausted = !isProbe && session.currentIndex >= session.plan.length;
  const nowAtCeiling = session.questionsAskedCount >= CEILING_QUESTIONS;

  if (nowExhausted || nowAtCeiling) {
    const feedback = await generateFeedback(session);
    session.done = true;
    session.feedback = feedback;
    return {
      reply: reply.replace(/^\[PROBE\]\s*/, ""),
      done: true,
      feedback,
      currentQuestion: session.currentIndex,
      totalPlanned: session.plan.length,
    };
  }

  return {
    reply: reply.replace(/^\[PROBE\]\s*/, ""),
    done: false,
    isProbe,
    currentQuestion: session.currentIndex + 1,
    totalPlanned: session.plan.length,
  };
}

export async function startInterview(session) {
  const systemPrompt = interviewerSystemPrompt(session.candidate, session.plan);
  const opening = await callLLM(systemPrompt, [
    { role: "user", content: "Begin the interview with a brief welcome and your first question." },
  ]);
  session.transcript.push({ role: "interviewer", content: opening });
  session.questionsAskedCount += 1;
  return {
    reply: opening,
    done: false,
    currentQuestion: session.currentIndex + 1,
    totalPlanned: session.plan.length,
  };
}