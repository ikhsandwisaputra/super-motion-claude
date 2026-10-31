# Team guide — making Claude a professional motion designer

For people on any team, in any organization, who use these seven skills with Claude Code.

## 1. Setup (once per laptop)
- Install Node 20+, Python 3.11+ and Microsoft Edge.
- Run `pip install playwright opencv-python numpy scipy imageio-ffmpeg`, then `python -m playwright install` (the renderer drives Edge through Playwright).
- Optional, for narration and SFX: an ElevenLabs account with **your own** API key. Put it in a `.env.local` file that only you can read, never in code, chats or shared folders. One key per person. When a key leaks, deactivate it first.
- Get the skills either by installing the plugin from the team repo (`/plugin marketplace add <repo-url>`, then `/plugin install`) or by copying the seven `motion-*` folders into your project's `.claude/skills/`.

## 2. How to ask
Talk to Claude the way you would brief an editor. Good first messages:
- "Bikin video motion 60 detik 9:16 tentang <topic>, gaya mirip referensi ini <file>, narator cewek English."
- "Bedah video ini dulu, aku mau tiru struktur dan transisinya."
- "Hook-nya bikin dulu, jangan full render."

Claude will follow this order and stop at each gate for your answer: breakdown → script + voice choice (asks before spending credits) → hook preview → your notes → the rest → full render.

## 3. How to give feedback (this is what makes it expert)
- **Point at time and compare.** "Di detik 4, tulisan 'SAME' kurang miring dibanding referensi detik 4.4" works much better than "kurang keren".
- **Name the feeling and the element.** For example: "pop-up kurang mulus", "kontras terlalu tajam", "tulisan numpuk di MOTION/video", "jedug-jedug". Claude maps each one to a rule (see `lessons-learned.md`).
- **Ask for a technique by name** when you know it: camera travel between phrases, marker per word, text on the desk, smash zoom, mosaic, typo SFX.
- **Screenshots of reference vs result side by side** are the fastest feedback of all.
- When something is good, say so. It tells Claude what to keep.

## 4. What the result looks like
A project folder `<name>/` holding:
- `src/timeline.js` — the film, editable by hand or by Claude;
- `build/frames` and `build/mix_full.wav`;
- `out/*.mp4` — a 1080p master plus a 720p share copy;
- `README.md` — how to re-render, what was used, the placeholders to change.

## 5. Rules to keep
- **No secrets** in any file you share. No client data in demo videos; use dummy content.
- **Numbers on screen** come only from real sources you give Claude.
- **Characters and art are original.** Reference videos are studied, not redistributed and not committed to repos.
- **Generated audio is licensed to the account that generated it.** Share SFX inside your own organization only, or regenerate them with your own key using `generate_sfx.py`.

## 6. Improving the skills
When you find a new rule (a note that fixed a real problem), add it to `motion-director/references/lessons-learned.md` (symptom → cause → rule) and, if it is code, to the engine template. Push it to the team repo, and everyone's Claude gets it on the next update.
