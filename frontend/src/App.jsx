import { useState, useEffect } from "react";
import IntroOverlay from "./components/IntroOverlay.jsx";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [view, setView] = useState("home");
  const [candidate, setCandidate] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    let mounted = true;
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([pageLoaded, fontsReady]).then(() => {
      if (mounted) setAssetsReady(true);
    });
    return () => { mounted = false; };
  }, []);

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

  return (
    <>
      {showIntro && (
        <IntroOverlay ready={assetsReady} onStart={() => setShowIntro(false)} />
      )}

      {view === "home" ? (
        <HomePage onStart={handleStart} />
      ) : (
        <ChatPage candidate={candidate} sessionId={sessionId} opening={opening} onHome={goHome} />
      )}
    </>
  );
}