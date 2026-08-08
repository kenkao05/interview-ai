import { useState } from "react";
import LiquidEther from "../components/LiquidEther.jsx";
import CandidateDropdown from "../components/CandidateDropdown.jsx";
import ProfileCardPanel from "../components/ProfileCardPanel.jsx";
import { sendInterviewTurn } from "../lib/api.js";
import candidatesData from "../../../backend/src/data/candidates.json"; // adjust import path per bundler setup

export default function HomePage({ onStart }) {
  const [selected, setSelected] = useState(null);
  const [starting, setStarting] = useState(false);

  async function handleStartInterview() {
    if (!selected) return;
    setStarting(true);
    const sessionId = crypto.randomUUID();
    try {
      await sendInterviewTurn({ sessionId, candidate: selected });
      onStart(selected, sessionId);
    } catch (err) {
      console.error(err);
      setStarting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <LiquidEther colors={['#F5F1E8', '#C9A24B', '#afa7a7ff']} />
      </div>

      <div className="relative flex min-h-screen items-center justify-center gap-16 px-6">
        <div className="flex flex-col items-start gap-6 max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">AI Interview Agent</h1>

          <CandidateDropdown
            candidates={candidatesData.candidates}
            selected={selected}
            onSelect={setSelected}
            shrunk={!!selected}
          />

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

        {selected && (
          <div className="flex-shrink-0">
            <ProfileCardPanel candidate={selected} />
          </div>
        )}
      </div>
    </div>
  );
}