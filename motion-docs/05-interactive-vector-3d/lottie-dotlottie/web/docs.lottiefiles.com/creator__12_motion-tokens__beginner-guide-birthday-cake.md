---
source: https://docs.lottiefiles.com/en/creator/12_motion-tokens/beginner-guide-birthday-cake.md
title: ""
fetched: 2026-10-28
---

# Beginner Guide Birthday Cake
This is a short tutorial for creating the Birthday Cake example.

You can access the Codepen example here: [https://codepen.io/George-Dikun/pen/JoKmQjV](https://codepen.io/George-Dikun/pen/JoKmQjV)

<CodePen url="https://codepen.io/George-Dikun/pen/JoKmQjV" defaultTab="result" theme="dark" height={400} />

## Creating the File

Before you begin using your motion tokens in code, you first need to create a file that uses motion tokens.

Here is the remix link of the birthday cake animation in Lottie Creator: [https://lottie.link/cake](https://lottie.link/cake)

<img src="https://assets.docs.lottiefiles.com/static/3511b8f3a1-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/3511b8f3a1-640.webp 640w, https://assets.docs.lottiefiles.com/static/3511b8f3a1-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/3511b8f3a1-1920.webp 1920w" alt="Birthday Cake guide step 1" width="3456" height="2166" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAoklEQVR4nB3HWwvBYACA4c8hh7txwTCfNmZzzOHCWq0IbUsWIb/WnRTlwo9QlL+gV7l4Lh5Ra3VQimVUqTP3AxZBiGaYKAWVaqePkHaPZDrL2PV43W98Lhem4Yp4IoW0u4iKaZNIZxg5Ls/Hlff5xMwPEbE4qmEiinqDnFpB1i2i3YHN/ohutcmXNKTVRpSM5tccTnD9LQPP/3OW0f/ucv39Aa0SRAPVWwsAAAAAAElFTkSuQmCC" />

Once inside Creator, you can see the current tokens by opening the Motion Tokens manager.

<img src="https://assets.docs.lottiefiles.com/static/70c9128942-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/70c9128942-640.webp 640w, https://assets.docs.lottiefiles.com/static/70c9128942-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/70c9128942-1920.webp 1920w" alt="Birthday Cake guide step 2" width="2702" height="1520" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAfUlEQVR4nGPwiUj+b+3m+1/f2um/gbXTfz1L+//mTl7/fSJT/nuHJ/1l8I1M+a9maPZfVF7pv4ic4n9+Sen/ijoG/0HiIM1gBVqmVv8llNTAWFRO8b+qvil2BeKKqv+FZeX/q+gZoypQNzL/L6ag/F9cUQVMaxhbghWA3AAAxRxDat+NZIwAAAAASUVORK5CYII=" />

Here you can find the text token called Name. It simply decides what text should be displayed on the cake. It is “Kelly” by default.

Also in the manager, you’ll see that there are several tokens named candle-\[x]-opac where \[x] is a number. This number corresponds to the respective candle. For instance, \[candle 8] has the token candle-8-opac attached to its opacity property.

<img src="https://assets.docs.lottiefiles.com/static/21e171d5a1-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/21e171d5a1-640.webp 640w, https://assets.docs.lottiefiles.com/static/21e171d5a1-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/21e171d5a1-1920.webp 1920w" alt="Birthday Cake guide step 3" width="2804" height="1576" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAf0lEQVR4nAXBuw6CMABA0X6DDjAQeRSkYKHiKyS6udG4mEATJsv//wJczxHWLVv3enPsHpSXHtneOKgW2VwZJr+KwXnU+U4YS8IkJyoqQqWR5o6dPGKYPHn/ZN8YdupEVGmCoiTTHdYtCDv+tvo7ks4zsf2QaEOQFaS1wTq//gFG3DREigHcsgAAAABJRU5ErkJggg==" />

This is a clever solution for selectively choosing which candles to show. Later on, the code can count from 0-10 and make the opacity 100% for the matching candles. So if the age is 30, then our code can “turn on” candles 1, 2, and 3 by making them visible. This technique of using opacity to toggle specific layers is very useful and has lots of applications.

For this project, that’s actually all the setup necessary on the design side. Next we will focus on how to get it working in Codepen and ultimately in your project.

## Vibe Coding with ChatGPT

The logic involved with this project is actually pretty straightforward for someone who understands code. For those who don’t, it is a trivial task for AI.

The prompt we used was:

<Panel title="Prompt">
  I have a token called “Name” that I want to update with the user’s name. I also have tokens called “candle-x-opac” where “x” is a number. These are the opacity of specific candles. I want these candles to become visible at specific ages of the user. If the user is 10-19, I want 1 candle to show. If the user is 40-49, then I want 4 candles to show.

  I also want some UI to test it with. Make a text input for the username and a slider for the age (0-100).

  Make it so it starts with Name = user and age = 100.
</Panel>

Make sure to include the dotLottie file and the skills document!

<img src="https://assets.docs.lottiefiles.com/static/cfbfc76abc-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/cfbfc76abc-640.webp 640w" alt="Birthday Cake guide step 4" width="819" height="482" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVR4nD2NQQ6DIAAE+YqGE4LYNEJARYtSjU3//5xp9NDDHDaTzYiqqpBS0rYtWmu6rsNaS13XXE6klAgh4p4P7PzFT5ngHX3f3ydR1pXPebLvO9v7IK8bOWdKKcQYESEEXstCSjPTOOK9/+OcQzRNgzHm7mtjuPaFUophGPgBnA9A6VBPNVkAAAAASUVORK5CYII=" />

Here’s the code from the output:

```jsx
import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web@latest";

// ------------------------------------------------------------
// Defaults
// ------------------------------------------------------------
const DEFAULT_NAME = "user";
const DEFAULT_AGE = 100;

// If your file has more/less candles, change this:
const CANDLE_COUNT = 10;

// Opacity values: adjust if your authored slots expect 0..1 instead of 0..100
const OPAC_VISIBLE = 100;
const OPAC_HIDDEN = 0;

// Slot IDs
const NAME_SLOT = "Name"; // text slot
const candleSlotId = (i) => `candle-${i}-opac`; // scalar slots

// ------------------------------------------------------------
// Canvas + Player
// ------------------------------------------------------------
const canvas = document.getElementById("dotLottie-canvas");
const SRC = canvas.dataset.src;

const dotLottie = new DotLottie({
  canvas,
  src: SRC,
  autoplay: true,
  loop: true,
  renderConfig: { autoResize: true },
});

// ------------------------------------------------------------
// UI
// ------------------------------------------------------------
const ui = document.createElement("div");
ui.style.display = "grid";
ui.style.gap = "10px";
ui.style.marginTop = "14px";
ui.style.width = "320px";
ui.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
ui.style.color = "#fff";

ui.innerHTML = `
  <label style="display:grid; gap:6px;">
    <span style="opacity:.85;">Name</span>
    <input id="ui-name" type="text" value="${DEFAULT_NAME}"
      style="padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,.15);
             background: rgba(255,255,255,.06); color:#fff; outline:none;" />
  </label>

  <label style="display:grid; gap:6px;">
    <div style="display:flex; justify-content:space-between; align-items:baseline;">
      <span style="opacity:.85;">Age</span>
      <span id="ui-age-label" style="opacity:.85;">${DEFAULT_AGE}</span>
    </div>

    <input id="ui-age" type="range" min="0" max="100" step="1" value="${DEFAULT_AGE}" />
  </label>
`;

canvas.insertAdjacentElement("afterend", ui);

const nameInput = document.getElementById("ui-name");
const ageSlider = document.getElementById("ui-age");
const ageLabel = document.getElementById("ui-age-label");

// ------------------------------------------------------------
// Logic
// ------------------------------------------------------------
function decadeCandleCount(age) {
  // 0–9 => 0, 10–19 => 1, ... 100 => 10
  const n = Math.floor(age / 10);
  return Math.max(0, Math.min(CANDLE_COUNT, n));
}

function applyName(name) {
  // Partial update: only text content
  dotLottie.setTextSlot(NAME_SLOT, { t: name });
}

function applyCandles(age) {
  const show = decadeCandleCount(age);

  for (let i = 1; i <= CANDLE_COUNT; i++) {
    dotLottie.setScalarSlot(candleSlotId(i), i <= show ? OPAC_VISIBLE : OPAC_HIDDEN);
  }
}

function applyAll() {
  const name = nameInput.value || DEFAULT_NAME;
  const age = Number(ageSlider.value) || 0;

  ageLabel.textContent = String(age);

  applyName(name);
  applyCandles(age);
}

// ------------------------------------------------------------
// Init + Events
// ------------------------------------------------------------
dotLottie.addEventListener("load", () => {
  applyAll();

  nameInput.addEventListener("input", applyAll);
  ageSlider.addEventListener("input", applyAll);
});
```

Pasting that into the JS panel in Codepen (after adding my Asset CDN link to the HTLM) resulted in the working demo at the top of the article.

<img src="https://assets.docs.lottiefiles.com/static/1dd85df560-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/1dd85df560-640.webp 640w, https://assets.docs.lottiefiles.com/static/1dd85df560-1024.webp 1024w" alt="Birthday Cake guide step 5" width="1919" height="1446" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkklEQVR4nCWOPQ+CMABEOykugkaghbZQ2vKhTiYM7vz/v/RM6/CSu7wbTjg3IWVHrweU0tSNwtiRdXsTlhfCDp6EDysxrtgxEOOG9zPGuv9AG4+bZrSd6I3DhyX3EJ8IqXoSreyYRocfXc6q0xlRllfuVcW5uHB8d479w6kouFUlyYl0sGklj7pBG5epmzYfT+4H/WZAQ1oEsFUAAAAASUVORK5CYII=" />

Sometimes it takes a few tries, but if your prompt is descriptive and your file is constructed well, then it should be able to get you pretty far. This prompt didn’t completely work on the first try, but I just re-ran it and it gave me a perfect result. You can also just tell the LLM which part isn’t working and it will often fix it on the next try.
