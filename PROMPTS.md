# PROMPTS.md — AI Usage Log

Running log of prompts used to plan and build the AI Interview Agent (PS2), in chronological order, alongside what was implemented from each. Required for Stage 2 (Authenticity Review) — keep this updated live as the build progresses, not reconstructed at the end.

---

### Planning Phase

1. "want to discuss a hackathon. here are some requirements [hackathon rules pasted] ... i want you to briefly describe them and tell me what tech each PS will use and how hard they are to develop. i have 2 days time."

2. [PS1, PS2, PS3 full problem statement texts pasted for comparison]

3. "team of 3. these 3 files were given for ps2 so go through them fully and give me full confidence tech stack which is all free of use. search for free AI keys like groq or gemini or whatever. we've also been given this free AI tool so tell me if this can help us by reading the info below and/or searching the internet for more info [Breeth docs pasted]"

4. "do note other requirements and then give me project details for PS2. [submission requirements: GitHub repo, live deployment, AI usage log] final tech stack with all requirement in mind and also brief flow of our website."

5. "check for similar projects or websites and see how they work. check github as well. gain more insight from that for our project so we can add more features to this project that will make us shine brighter than other contestants."

6. "my plan is to fully discuss this project then make an PRD md file that has all the context, final file structure, setup guide, all files code that i can give to each person. ill be more involved with setting up everything meanwhile friend b and c will work on the frontend."

7. "dont worry about the key. lets talk more about features. is there anything mroe we can add aside from the already present PS."

8. "i was thinking of having a person like figure behind or something behind that has facial expressions displayed according to response by user."

9. "how many pages are there and whats on those pages. im choosing react bits from https://www.reactbits.dev/text-animations/particle-text so tell me whats on each page so i can discuss with my teammates and then get back to you."

10. "give me a gemini image generation prompt to generate a basic mockup of the pages. refer to the image for glassmorphic design." [2 reference images attached — glassmorphic AI agency landing page and services page]

11. "summarize the chat into an md file. add context about everything, the competition, the problem statement and all its details and requirements, what we're building, how we're building it, its default features, the pages, add the worth adding 3 features as well. all context. also make a separate section where all the prompts ive given are noted down so i can copy paste them into another prompts.md file later."

_(Backend language decision: JavaScript, chosen after being asked "JavaScript vs TypeScript" and answering "whichever is best." Frontend decision: React, chosen explicitly over plain HTML/CSS/JS "because i have some design ideas.")_

---

### Frontend Design Discussion

12. "read all files, especially project context, fully without skipping a line and lets further discuss the project. ive finallized the design. these react bits as per page. [home page: profile-card, dock, liquid-ether background / chat page: orb background, dock / summary page: pull-up-and-down translucent box per uploaded reference image]. lets first finish discussing the frontend and then move onto backend."

13. "liquid either in the background so all componenets show over it just like the reference image provided. lets drop the orb in chat page. add dock to chat page only with only home button all the way somewhere in the top right or top left such that it has rounded corners and isnt touching any boundary so user can go back home. no need for avatar, just fit the info of candidate in the card. also just give a very tiny yes or no with some info why to this question, can we make it so that the dropdown bar is big and long but onces a candidate is chosen it animates to the left and gets smaller and the profile card is animated into existence to the left."

14. [Reference image uploaded: reactbits.dev-style landing page] "sure. this is the design im going for. translucency where ether is behind the elements. dont copy the color theme tho. color theme is more white/egg and black with hints of gold like boundaries/buttons etc. whats left to discuss."

15. "1. nothing to replace for now. 2. auto slide up. and modal thats semi translucent. 3. choose name, job role, yearsExperience and education to be displayed and rest stays backend only for llm. 4. typing dots. 5. a translucent bar with rounded boundaries at center top with gold line and 4 of ~8 to the left or right should do it. 6. whichever is guaranteed to work and easy to use. any more questions?"

16. "1. i want the result summary to be able to be animatedly pulled up and down so we can see the chat as well. 2. yes add still thinking logic. 3. shadcn cli it is. done? if yes, lets move to backend"

---

### Backend Design Discussion

17. (in response to adaptive-length question) "Adaptive (more for weak signals), stronger differentiator"

18. "continue with questions."

19. (in response to cap question) "12" / (in response to fallback question) "can we add 2-3 gemini and groq keys and add a switcher?"

20. "ok forget the switcher. any more questions before we make the master prd?"

21. "any more questions?"

22. (in response to probe/cap question) "Probe replaces a planned question — cap stays hard at 8-12 total" / (in response to who-decides-probing question) "LLM-decided — model judges mid-conversation whether to probe further"

23. "any more questions?"

---

### PRD Generation

24. "write the PRD just as i say. it needs to have everything. the context of the hackathon, the requirements, the PS, the setup step by step guide, the final file structure, all the code for all the files as well. it needs to have evrerything inside. just so that we have some substance and can improve off of it later. also write a prompts.md and put all the prompts i wrote inside it."

25. "write it in an PRD.md file"

26. "make sure the file is readable by AI. and also make sure it has context such that if i write a prompt it will automatically write all the files, put them in the correct file structure, zip them up and give them to me as well. it needs to have everything. the context of the hackathon, the requirements, the PS, the setup step by step guide, the final file structure, all the code for all the files as well. read all previous files and our chat again to have all the context."

---

## What Was Implemented From This Log

- Full tech stack (Section 3 of PRD): JS backend/Express, in-memory session Map, Groq primary + single Gemini fallback (no rotation/switcher — explicitly rejected per prompt 20), React + Vite + Tailwind + Framer Motion frontend, Render hosting.
- Plan-then-execute architecture with a deterministic (non-LLM) planner for adaptive question count, floor 8 / hard ceiling 12 (prompts 17, 19).
- Probe logic: LLM decides whether to probe, code enforces the cap by treating a probe as replacing a planned slot, not adding to it (prompt 22).
- 2-view frontend (home/chat), feedback as a draggable overlay drawer rather than a 3rd route (prompts 12, 16).
- Liquid Ether as a behind-content, pointer-events-none background on the home page only; Orb dropped from the chat page (prompt 13).
- Dock reduced to chat-page-only, single Home button, top-corner placement with margin from every edge (prompt 13).
- ProfileCard limited to name/jobRole/yearsExperience/education, no avatar (prompt 13).
- Animated dropdown-shrink + ProfileCard-entrance sequence via Framer Motion (prompt 13).
- Final color direction: white/eggshell + black + gold, overriding the earlier charcoal/dark-mode direction from initial planning (prompt 14).
- Typing dots → "still thinking" fallback after ~7s to mask Render free-tier cold starts (prompt 15).
- Center-top translucent progress bar with gold accent, "Question N of ~8" (prompt 15).
- Feedback drawer: auto-slide-up on `done:true`, semi-translucent modal backdrop, drag-only dismiss so chat stays reachable underneath (prompts 15, 16).
- shadcn CLI as the install method for all three reactbits components (prompt 16).

### Debugging & Build Session (continuation of PROMPTS.md)

27. "trying to run frontend. [plugin:vite:import-analysis] Failed to resolve import '../components/reactbits/LiquidEther.jsx' from 'src/pages/HomePage.jsx'. Does the file exist?" [error trace pasted]

28. [terminal output pasted: `find`/`grep` commands showing Dock.jsx contents, incorrect `find frontend/src` path]

29. [terminal output pasted: corrected `find src -iname "*liquidether*"` result]

30. "[postcss error pasted] The `border-border` class does not exist..."

31. [terminal output pasted: `tailwind.config.js`, `src/index.css` contents]

32. "everything is just white. Uncaught SyntaxError: The requested module '/src/components/Dock.jsx' does not provide an export named 'Dock' (at ChatDock.jsx:4:10) [favicon 404 also pasted]"

33. [terminal output pasted: grep results for `export default` and import statements across components]

34. [terminal output pasted: `ChatDock.jsx` import lines]

35. [image + PDF uploaded: screenshot of home page, ProfileCard react-bits integration doc] "everything is just white... 1. profile card isnt working like it should. 2. firstly the purple ether is obnoxious, where do i change its color 3. the profile card is supposed to show on the center right and the dropdown moves to center left not top left corner. i have not touched the backend yet."

36. [HomePage.jsx uploaded] [terminal grep output for LiquidEther/colors]

37. "now what change do i need to make before git pushing? where do i and what do i put in the gitognore files?"

38. [git status output pasted]

39. "how do i add all the changes i made to git like downloading the components and all the frontend changes such that my teammates can directly download the files and not need to manually download the shadcn componenets themselves just like the two flags you raised?"

40. [git status output pasted, confirming staged files]

41. "i put a groq key in but still getting errors and not moving to second page [THREE.Color hex error + 500 error console output pasted]"

42. [backend terminal log pasted: Groq 401 invalid_api_key, Gemini 400 system_instruction error]

43. [geminiClient.js uploaded] "groq key was just made right now and it ok."

44. [chat transcript screenshots pasted, showing interview in progress] "what kinda answers do i choose to check whether this is working fine or not"

45. "just tell me what to type next. nothing extra. after the interview tell me how its doing. [transcript continuation pasted]"

46. [transcript continuation pasted, repeated across several turns feeding back interviewer responses]

47. "Question 9 of ~8 [continuing transcript]"

48. [3 images uploaded: feedback summary screenshots, drawer-drag-too-far screenshot] "make it so that this summary box isnt above to move up like shown in the third photo. only down fully but leaves the line so when thats clicked it pops up again. also how did the internet ai agent go. anything broken?"

49. [PROJECT_CONTEXT.md, CHAT_SUMMARY.md, FeedbackDrawer.jsx uploaded] "read these to know if the questions going above the limit are on purpose as discussed."

50. [image uploaded: drawer over-extension screenshot] "i want it to fully go down such that only the middle golden line is visible and the chat becomes focused. when user clicks on the line or drags the summary back up then the chat behind goes dark like it does. also theres a little bit of extra drag available when i drag the box up which shows the chat so can we extend the summary box length wise downward so that extra gap doesnt expose the chat."

51. [image + ChatPage.jsx uploaded] "nothing seems to have changed. the summary box still doesnt go fully down."

52. "i want the summary to auto open. if i move it down then it should stay there which it isnt... it doesnt go down at all now."

53. "so summary is auto opening which is good. but after dragging it down, it doesnt come back up. need it to be just a little bit above so i can click the golden bar. how do i do that. again. short simple answers."

54. "need to elongate it downwards as well. how"

55. [image uploaded: over-extended drawer with short summary] "it is coming up much more than it needs to. how do i make it so that it only opens upto the last line no matter what the summary is (because different interviews will have different lengths of summary.)"

56. [shit.md uploaded — teammate's unrelated Next.js/TypeScript TrueFocus + page.tsx code] "what is all this. read the whole file and tell me what these files are"

57. "im not asking if i should paste this directly in. my teammate sent me this. what do those files do. i want to incorporate that stuff into our files. so read what each file does and tell me what they do first."

58. [GradualBlur react-bits doc pasted] "ok i want to incorporate that into my homepage. also keep the color screen but remake the home page such that theres more content on the homepage. read the prd and make the homepage with reference to it being an interview ai agent for abtalks ai cohort or whatever it was and add more shit to the homepage because it looks blank af. what files do you need right now to make the new home page. also forget about the dropdown animating to the left and all of that. revamp it all to be simple but also have more shit. same color scheme and make sure it has the liquid ether background as well."

59. [TrueFocus react-bits doc + HomePage.jsx, CandidateDropdown.jsx, ProfileCardPanel.jsx uploaded] "not gradual blue but true focus. my bad. i dont want gradual blur. idea is to have the name of the website in the center in big font and be able to do the true focus play on that."

60. "write a log of all the prompts ive given in this chat into an md file."

---

## What Was Implemented From This Log

- Fixed relative import paths for LiquidEther and other misplaced/misnamed components (prompts 27–29).
- Fixed missing Tailwind `theme.extend.colors` token mappings for shadcn-style CSS variables (`border-border`, etc.) that were referenced in `index.css` but never defined in `tailwind.config.js` (prompts 30–31).
- Fixed default-vs-named export mismatches across `Dock.jsx` / `ChatDock.jsx` and `LiquidEther.jsx` / `HomePage.jsx` (prompts 32–34).
- Reworked home page layout from edge-pinned to centered flex row, removed `fixed top-6 left-6` hardcoded positioning bug from `CandidateDropdown.jsx` that broke layout on candidate selection (prompt 35, and later corrections).
- Changed LiquidEther `colors` prop away from default purple palette; later fixed an invalid 8-digit hex value (`#afa7a7ff`) causing a THREE.Color console error (prompts 35–36, 41).
- `.gitignore` verification and confirmation `.env` was never committed to git history, before pushing reactbits components + shadcn config files that teammates need without a manual CLI install (prompts 37–40).
- Diagnosed and fixed a real Gemini SDK bug in `geminiClient.js` — `systemInstruction` was passed as a raw string instead of the `{ role, parts }` object shape the SDK expects, plus moved it from `startChat()` to `getGenerativeModel()` (prompts 41–43).
- Manually tested probe-then-continue logic, probe-replaces-question logic, and question cap enforcement by feeding deliberately vague answers through a live interview session (prompts 44–47).
- Discovered and confirmed (via PROJECT_CONTEXT.md/CHAT_SUMMARY.md cross-check) a real bug: question counter exceeded the planned ~8 ceiling ("Question 10 of ~8"), meaning probes were being added rather than substituted — flagged as unresolved, pending `stateMachine.js` review (prompts 47, 49).
- Rebuilt `ProfileCardPanel.jsx` to use Framer Motion cursor-tracked 3D tilt (`useMotionValue`/`useTransform`) instead of adopting the full react-bits `ProfileCard` component, to avoid its avatar/prop-shape mismatch with existing candidate data (earlier in session, carried forward).
- Multiple iterations on `FeedbackDrawer.jsx` drag/peek behavior: fixed `dragConstraints` allowing drag above the open position, adjusted peek percentage, added `onDragEnd`-based state sync (drag position wasn't persisting because `animate` was bound to state, not drag position), then moved from a fixed-percentage/fixed-padding approach to content-based sizing (`max-h-[85vh]`, `y: 0` vs `y: "88%"`) so drawer height adapts to variable feedback-summary length instead of a hardcoded pixel/percent value (prompts 48, 50–55).
- Read and explained an unrelated Next.js/TypeScript file a teammate sent (`shit.md`), distinguishing the reusable `TrueFocus` component from the non-portable `page.tsx` homepage it was bundled with (prompts 56–57).
- Declined `GradualBlur` integration after clarification; integrated `TrueFocus` (JS/CSS variant, swapped `motion/react` → `framer-motion` to match existing dependency, retthemed to gold/ink) as a centered hero title, and rebuilt `HomePage.jsx` with added cohort-context content (tagline, program description, 3-step "how it works" section) pulled from PRD/PROJECT_CONTEXT source text; simplified `CandidateDropdown.jsx` by removing the shrink-and-relocate animation per updated instruction (prompts 58–59).

---

### Intro Overlay & Transition Session

61. [`PRD.md` uploaded] "read the prd fully."

62. [`excerpt_from_previous_claude_message.txt`, teammate's `page.tsx` uploaded] "tell me what do these pages do?"

63. "homepage.tsx you mean?"

64. [`HomePage.jsx` uploaded] "this is the homepage. i want to integrate the intro overlay so that it happens before homepage. what other files do u need besides homepage.tsx so that nothing breaks? i want you to give me updated code such that introdisplay works."

65. [`App.jsx` uploaded] [`package.json` pasted] "i dont think lucid is installed"

66. "give me introoverlay code as well such that it follows the overall theme of my website. and where to paste it as well"

67. "can we make it so that introoverlay after clicking start slides up and the main true focus of intro overlay matches the true focus logo of homepage in height and thats where introoverlay blurs out."

68. "i want it to start in the middle just like before. but when i click start introoverlay moves up such that when the logo of introoverlay matches the logo of homepage in height it burns out so it looks like introoverlay merged into homepage."

69. "make it so that when start is clicked, the background slowly turns semi translucent because when it moves up it looks like the whole screen is moving up instead of just the logo. or make it so that the whole introoverlay page slowly goes transparent as its moving up."

70. "do this and give me updated files fully." (in response to being asked whether the logo should stay visible while everything else fades first)

71. [`LiquidEther.jsx`, `TrueFocus.jsx`, `ChatPage.jsx`, `CandidateDropdown.jsx`, `ProfileCardPanel.jsx`, `index.css`, `tailwind.config.js` uploaded]

72. "what files do u need? u said u didnt have truefocus. ill send all files necessary."

73. "ok back to introoverlay. can we make it so that it shows a loading bar till homepage and everything else is loaded and once everything is loaded it shows the start button?"

74. [unrelated teammate-sourced voice/speech-synthesis feature pasted] "what about this feature?"

75. "i want some kind of transition between homepage and chatpage as well. check the internet for transitions that can be applied, put 5 of those in a page so that i can see them for myself and whatever i choose will be implemented. do u understand? dont waste too many tokens on generating this tester. i just want to experience the transitions only."

76. "not in chat. build a file. like an html file or something"

77. "i like 4 but will it work with liquid ether?"

78. "lets go for 1 slide up then. that will be better right?"

79. [console error log pasted: `handleStart is not defined`] "everything is just white."

80. "want to make some changes to chat page. first whats the black thing on the right side."

81. "why does start acting funky and move like crazy when i hover on it and what exactly does it do?"

82. [screenshot uploaded] "im talking about chatpage. the thing on the top right"

83. [`Dock.jsx` uploaded]

84. "coming back to homepage. it says starting. i cant start a new chat."

85. "full updated app.jsx. also the slide up transition looks obnoxious because the backgrounds for both home and chat page are similar. how do i change the background of chatpage and what do i change it to so that it doesnt conflict with the other stuff already present in that page."

86. [`ProgressBar.jsx`, `TypingIndicator.jsx`, `FeedbackDrawer.jsx` uploaded]

87. "updated fully chatpage as well"

88. "add all the prompts ive written to this."

---

## What Was Implemented From This Log

- Added `IntroOverlay.jsx`, wired to show before `HomePage` via a `showIntro` state in `App.jsx`, restyled from the teammate-supplied version to the eggshell/ink/gold theme (prompts 61–66).
- Fixed a non-existent `lucide-react` version (`^1.30.0`) flagged as the likely install failure (prompt 65).
- Iterated intro→home merge transition: slide-up + scale, then position-matched merge via `getBoundingClientRect` offset between intro's and home's `TrueFocus` elements (added `id="hero-focus"` anchor to `HomePage.jsx`), then split into a two-layer fade (background dims to semi-translucent separately from content) with the logo itself never fading — only translating — so it visually "merges" into `HomePage`'s logo (prompts 67–70).
- Added an asset-readiness gate (`window.load` + `document.fonts.ready`) to `App.jsx`, swapping IntroOverlay's button for a loading bar until ready (prompt 73).
- Declined an unrelated teammate-sourced Web Speech API voice-mode feature as explicit PRD out-of-scope, off-stack (TSX vs the repo's JSX), and non-graded (prompt 74).
- Built a standalone `transitions-demo.html` file (outside the app) showing 5 page-transition options (slide up, fade, scale, push-left, iris reveal) for direct comparison (prompts 75–76).
- Flagged that CSS `transform` on an ancestor breaks `position: fixed` containment for `LiquidEther`, ruled out push-left for that reason, chose slide-up specifically because it avoids transforming `HomePage`'s tree at all (prompts 77–78).
- Restructured `App.jsx` so `HomePage` stays permanently mounted (LiquidEther fixed-positioning requirement) while `ChatPage` slides up as an absolutely-positioned overlay via `AnimatePresence`/`motion.div` (prompt 78, corrected in 79 after a literal placeholder-comment bug caused `handleStart is not defined`).
- Diagnosed reactbits `Dock` as structurally incompatible with a single top-right icon (bottom-center-anchored absolute positioning + `overflow-hidden` wrapper clipping the hover-magnified icon) and replaced `ChatDock.jsx` with a plain button (prompts 80–83).
- Fixed a `starting` state bug where `HomePage` being permanently mounted meant the "Starting…" button state never reset after a successful interview start; fixed via a remount `key` bumped in `goHome()` (prompt 84).
- Switched `ChatPage.jsx` background from `bg-eggshell` to `bg-ink` to visually distinguish it from `HomePage` during the slide-up transition; updated `ChatPage.jsx`, `ProgressBar.jsx`, and `TypingIndicator.jsx` for dark-background contrast; left `FeedbackDrawer.jsx` on its light background deliberately, pending confirmation (prompts 85–87).