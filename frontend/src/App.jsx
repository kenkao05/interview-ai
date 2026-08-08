import { useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

export default function App() {
  // Two views only — feedback is an overlay on 'chat', not a third route.
  const [view, setView] = useState("home");
  const [candidate, setCandidate] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [opening, setOpening] = useState(null);

  function handleStart(selectedCandidate, newSessionId, openingResult) {
    setCandidate(selectedCandidate);
    setSessionId(newSessionId);
    setOpening(openingResult);
    setView("chat");
  }

  function goHome() {
    setView("home");
    setOpening(null);
  }

  return view === "home" ? (
    <HomePage onStart={handleStart} />
  ) : (
    <ChatPage candidate={candidate} sessionId={sessionId} opening={opening} onHome={goHome} />
  );
}