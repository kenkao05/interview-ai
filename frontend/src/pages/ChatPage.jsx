import { useState } from "react";
import ChatDock from "../components/ChatDock.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";
import FeedbackDrawer from "../components/FeedbackDrawer.jsx";
import { sendInterviewTurn } from "../lib/api.js";

export default function ChatPage({ candidate, sessionId, opening, onHome }) {
  const [messages, setMessages] = useState([
    { role: "interviewer", content: opening?.reply || "Welcome. Let's begin your interview." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(opening?.currentQuestion || 1);
  const [totalPlanned, setTotalPlanned] = useState(opening?.totalPlanned || 8);
  const [feedback, setFeedback] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setMessages((m) => [...m, { role: "candidate", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const result = await sendInterviewTurn({ sessionId, message: userMessage });
      setMessages((m) => [...m, { role: "interviewer", content: result.reply }]);

      if (result.currentQuestion) setQuestionCount(result.currentQuestion);
      if (result.totalPlanned) setTotalPlanned(result.totalPlanned);

      if (result.done) {
        setFeedback(result.feedback);
        setDrawerOpen(true);
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "interviewer", content: "Something went wrong — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-eggshell">
      <ProgressBar current={questionCount} total={totalPlanned} />
      <ChatDock onHome={onHome} />

      <div className="flex-1 overflow-y-auto px-6 pt-24 pb-32 max-w-2xl mx-auto w-full space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl max-w-[80%] ${
              m.role === "interviewer"
                ? "bg-white/70 border border-gold/40 self-start"
                : "bg-ink text-eggshell ml-auto"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <TypingIndicator />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-eggshell/90 backdrop-blur-md border-t border-gold/30">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            placeholder="Type your response…"
            className="flex-1 border border-gold/50 rounded-full px-5 py-3 bg-white/80 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="border-2 border-gold rounded-full px-6 py-3 bg-ink text-eggshell disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>

      <FeedbackDrawer
        feedback={feedback}
        open={drawerOpen}
        onToggle={() => setDrawerOpen((o) => !o)}
        onDrawerStateChange={setDrawerOpen}
      />
    </div>
  );
}