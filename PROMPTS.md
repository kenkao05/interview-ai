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

*(Backend language decision: JavaScript, chosen after being asked "JavaScript vs TypeScript" and answering "whichever is best." Frontend decision: React, chosen explicitly over plain HTML/CSS/JS "because i have some design ideas.")*

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
