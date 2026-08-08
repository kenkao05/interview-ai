import { callGroq } from "./groqClient.js";
import { callGemini } from "./geminiClient.js";

// Single automatic fallback: try Groq, and if it throws or times out, retry
// once against Gemini for this turn only. No rotation, no multi-key switching —
// deliberately the simplest resilience mechanism, see PRD Section 5.4.
export async function callLLM(systemPrompt, messages) {
  try {
    return await callGroq(systemPrompt, messages);
  } catch (err) {
    console.warn("Groq call failed, falling back to Gemini:", err.message);
    return await callGemini(systemPrompt, messages);
  }
}
