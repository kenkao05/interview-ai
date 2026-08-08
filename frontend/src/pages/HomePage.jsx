import { useState } from "react";
import LiquidEther from "../components/LiquidEther.jsx";
import TrueFocus from "../components/TrueFocus.jsx";
import CandidateDropdown from "../components/CandidateDropdown.jsx";
import ProfileCardPanel from "../components/ProfileCardPanel.jsx";
import { sendInterviewTurn } from "../lib/api.js";
import candidatesData from "../../../backend/src/data/candidates.json";

export default function HomePage({ onStart }) {
  const [selected, setSelected] = useState(null);
  const [starting, setStarting] = useState(false);

  async function handleStartInterview() {
    if (!selected) return;
    setStarting(true);
    const sessionId = crypto.randomUUID();
    try {
      const result = await sendInterviewTurn({ sessionId, candidate: selected });
      onStart(selected, sessionId, result); // pass the real opening question through
    } catch (err) {
      console.error(err);
      setStarting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <LiquidEther colors={['#F5F1E8', '#C9A24B', '#afa7a7']} />
      </div>

      <div className="relative flex flex-col items-center px-6 py-20 gap-16 max-w-4xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col items-center gap-6 text-center">
          <TrueFocus
            sentence="AI INTERVIEW AGENT"
            manualMode={false}
            blurAmount={6}
            animationDuration={0.6}
            pauseBetweenAnimations={1.2}
          />
          <p className="text-ink/70 text-lg max-w-xl">
            Build the interviewer, not the interview.
          </p>
          <p className="text-ink/60 text-sm max-w-2xl leading-relaxed">
            A conversational AI that runs a personalized technical interview based on
            a candidate's actual progress through the ABTalks AI Cohort — a 31-day
            enterprise AI engineering program covering RAG, vector databases, prompt
            engineering, agentic AI, and MCP. Every question is grounded in what a
            candidate actually completed, skipped, or struggled with.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="border border-gold/40 rounded-2xl bg-white/60 backdrop-blur-md p-5 text-center">
            <h3 className="text-gold font-semibold mb-1">1. Select</h3>
            <p className="text-sm text-ink/70">Choose a candidate from the cohort roster.</p>
          </div>
          <div className="border border-gold/40 rounded-2xl bg-white/60 backdrop-blur-md p-5 text-center">
            <h3 className="text-gold font-semibold mb-1">2. Interview</h3>
            <p className="text-sm text-ink/70">A live, adaptive technical conversation — real follow-ups, not a script.</p>
          </div>
          <div className="border border-gold/40 rounded-2xl bg-white/60 backdrop-blur-md p-5 text-center">
            <h3 className="text-gold font-semibold mb-1">3. Review</h3>
            <p className="text-sm text-ink/70">Structured feedback tied to specific curriculum days.</p>
          </div>
        </div>

        {/* Candidate selection */}
        <div className="flex flex-col items-center gap-6 w-full">
          <CandidateDropdown
            candidates={candidatesData.candidates}
            selected={selected}
            onSelect={setSelected}
          />

          {selected && <ProfileCardPanel candidate={selected} />}

          {selected && (
            <button
              onClick={handleStartInterview}
              disabled={starting}
              className="border-2 border-gold rounded-full px-8 py-3 bg-ink text-eggshell
                hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
            >
              {starting ? "Starting…" : "Start Interview"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}