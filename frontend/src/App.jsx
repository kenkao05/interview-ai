import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [homeKey, setHomeKey] = useState(0);

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
    setHomeKey((k) => k + 1);
  }

  return (
    <>
      {showIntro && (
        <IntroOverlay ready={assetsReady} onStart={() => setShowIntro(false)} />
      )}

      <HomePage key={homeKey} onStart={handleStart} />

      <AnimatePresence>
        {view === "chat" && (
          <motion.div
            key="chat"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40"
          >
            <ChatPage candidate={candidate} sessionId={sessionId} opening={opening} onHome={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}