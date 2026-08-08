# AI Interview Agent — PS2

_"Build the interviewer, not the interview."_

**Live demo:** https://interview-ai-22n4.onrender.com/

> Hosted on Render's free tier — the first request after a period of inactivity can take 10–30s to wake up (cold start). This is expected, not a bug.

---

## What this is

A conversational AI agent that conducts a personalized technical interview based on a candidate's _actual_ progress through the ABTalks AI Cohort — not a generic quiz. The agent reads a candidate's real completion data (what they passed, skipped, or struggled with) and builds a live interview plan around it, asking follow-up questions grounded in what that specific person actually did, then produces structured feedback at the end tied to specific curriculum days.

## Why it was built

This was built for the **ABTalks AI Cohort Hackathon**, Problem Statement 2 (PS2): _The Interview Agent_.

The ABTalks AI Cohort is a 31-day enterprise AI engineering program covering RAG, vector databases, prompt engineering, agentic AI, MCP, deployment, and production AI systems. Graduates of programs like this often struggle to confidently explain what they built and the engineering decisions behind it in a real interview. PS2 asked for an AI interviewer that tests for that — real understanding of a candidate's own work, not memorized trivia.

Built solo-backend by one teammate handling infra/coordination, with two teammates on frontend, inside a ~47.5 hour build window.

## How it works

1. **Select** — choose a candidate from the cohort roster.
2. **Interview** — a live, adaptive technical conversation. The backend builds a question plan up front from the candidate's real mission data (weighted toward skipped topics and high-attempt passes — real weak signals), then walks that plan turn by turn, allowing one follow-up probe per topic if an answer is shallow.
3. **Review** — structured feedback at the end: a summary, strengths, gaps, and next steps, referencing specific curriculum days by name.

Minimum 8 questions, hard-capped at 12, spanning at least 4 distinct curriculum days — enforced in code, not left to the model.

## Tech stack

| Layer         | Choice                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Backend       | Node.js + Express, JavaScript (no TypeScript)                                                        |
| Session state | In-memory `Map` — no database, no cross-session persistence (explicitly out of scope)                |
| LLM           | Groq (`llama-3.3-70b-versatile`) primary, Gemini fallback on failure                                 |
| Frontend      | React + Vite, Tailwind CSS, Framer Motion                                                            |
| Serving       | Vite build served as static files from the same Express app — one deployable unit                    |
| Hosting       | Render, single persistent Web Service (required for in-memory session state to survive across turns) |

Full reasoning behind every choice above is in `PRD.md`.

## Local setup

See `PRD.md` Section 7 for the full step-by-step setup guide, including API key setup and the shadcn CLI commands needed to install the third-party UI components.

## AI usage log

See `PROMPTS.md` — a running, chronological log of prompts used to plan and build this project, updated live during the build as required for the hackathon's authenticity review.
