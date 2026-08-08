# reactbits components go here

This folder is intentionally empty of component source. Populate it by running,
from /frontend:

  npx shadcn@latest add https://reactbits.dev/r/Dock-JS-TW
  npx shadcn@latest add https://reactbits.dev/r/ProfileCard-JS-TW
  npx shadcn@latest add https://reactbits.dev/r/LiquidEther-JS-TW

(Verify exact registry names on reactbits.dev — they occasionally rename items.
The -JS-TW suffix selects the plain JavaScript + Tailwind variant, matching this
project's stack per PRD.md Section 3.)

Do not hand-write or paste guessed source for these here — the wrapper components
in ../ChatDock.jsx and ../../pages/HomePage.jsx import directly from this folder
and expect whatever props the CLI-installed versions actually expose. Check those
imports after installing.
