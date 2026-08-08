import { callLLM } from "../llm/llmRouter.js";
import { feedbackSystemPrompt } from "../prompts/systemPrompts.js";

export async function generateFeedback(session) {
  const prompt = feedbackSystemPrompt(session.candidate, session.plan, session.transcript);
  const raw = await callLLM(prompt, [
    { role: "user", content: "Generate the feedback JSON now." },
  ]);

  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse feedback JSON, returning fallback shape:", err.message);
    return {
      summary: "The interview is complete. Detailed feedback generation encountered an error.",
      strengths: [],
      gaps: [],
      next: [],
    };
  }
}
