---
source: https://docs.lottiefiles.com/en/creator/12_motion-tokens/intermediate-guide-drag-and-drop-planets.md
title: ""
fetched: 2026-10-28
---

# Intermediate Guide Drag and Drop Planets
This is a short tutorial for creating the Drag and Drop Planets example.

You can access the Codepen example here: [https://codepen.io/lottiefiles/pen/YPGzZxE](https://codepen.io/lottiefiles/pen/YPGzZxE)

<CodePen url="https://codepen.io/lottiefiles/pen/YPGzZxE" defaultTab="result" theme="dark" height={400} />

## Creating the File

Before you begin using your motion tokens in code, you first need to create a file that uses motion tokens.

Here is the remix link of the planets animation in Lottie Creator: [https://lottie.link/planet](https://lottie.link/planet)
<img src="https://assets.docs.lottiefiles.com/static/e955d8857b-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/e955d8857b-640.webp 640w, https://assets.docs.lottiefiles.com/static/e955d8857b-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/e955d8857b-1920.webp 1920w" alt="Planets animation open in Lottie Creator" width="1922" height="1447" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nB3MXQ+BUACA4XNhIyUHceispFphvsaFz+RrzND//zevcfncPCIaTjDtBs224ni+ccgvKFdj2pJwNEUMkjGVqkVNOmyXKftFgKM0FcOkH6eIMBljWDay1SEOAzzdRbke5aqFDqLfMPyjLpucsi3L+QTVcymVDdx+iNCDGNlq0+lpXp+CT1Gg/eA/+lGC8KOU2WpDdnuzzu6s8we785Ps+mKT3/kCGNBEB9wMbN0AAAAASUVORK5CYII=" />

Once inside Creator, you can see the current tokens by opening the Motion Tokens manager.

<img src="https://assets.docs.lottiefiles.com/static/70c9128942-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/70c9128942-640.webp 640w, https://assets.docs.lottiefiles.com/static/70c9128942-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/70c9128942-1920.webp 1920w" alt="Motion Tokens manager showing planets tokens" width="2702" height="1520" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAfUlEQVR4nGPwiUj+b+3m+1/f2um/gbXTfz1L+//mTl7/fSJT/nuHJ/1l8I1M+a9maPZfVF7pv4ic4n9+Sen/ijoG/0HiIM1gBVqmVv8llNTAWFRO8b+qvil2BeKKqv+FZeX/q+gZoypQNzL/L6ag/F9cUQVMaxhbghWA3AAAxRxDat+NZIwAAAAASUVORK5CYII=" />

This example is actually quite a bit more complex, involving multiple drag and drop elements and some scaling. For the purposes of this tutorial, I will only focus on the drag and drop portion.

You can see several position tokens with unique names, such as earth, jupiter, etc. These are bound to the corresponding planet layers.

These tokens can be used to update the position of the planets later in code. The idea is that while the mouse is dragging them, the mouse position changes, and that change can also be applied to the position token of the layer that is being dragged.

So while I’m dragging a layer, if my mouse moves up 100px, then code can input that 100px difference into the layer’s token.

### Hitboxes

Now keep in mind that the position is from the origin point of the layer, and it’s a single point. Out planet is actually several pixels wide and tall, and we want to be able to drag from anywhere in that area. So we have to at least have some idea what that area should be.

In the case of Earth, it’s about 100px by 100px, and the origin is in the center. That means it’s about 50px wide in every direction. We can just remember this for later.

Similarly, we will need its target position, which is the one directly under the sun. If I select it on the canvas, I can see that it’s about at 418x/800y.

We now have just about everything we’ll need to get this example to work.

## Vibe Coding with ChatGPT

The logic involved with this project is actually pretty straightforward for someone who understands code. For those who don’t, it is a trivial task for AI.

The prompt we used was:

<Panel title="Prompt">
  I want to drag and drop the layer for Earth. It has a position token named "earth". It's starting position is 487/1676. It is 50px from the center in all directions. When I click down in this area, then I want to start changing the position of the earth so that I can drag it with my mouse.

  If I let it go within 50px of 418/800, then I want it to snap to 418/800. If I let it go anywhere else, then I want it to go back to its original position.
</Panel>

Make sure to include the dotLottie file and the skills document!

<img src="https://assets.docs.lottiefiles.com/static/e25e01483e-574.webp" srcSet="https://assets.docs.lottiefiles.com/static/e25e01483e-574.webp 574w" alt="ChatGPT or editor with drag and drop planets prompt and setup" width="574" height="384" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nB3JUQqEIACEYQ/SLlnWg5CJL4tm2kJbIB2h+1/jX/LhY5gZ0bYtUkpeTUP+FXyIaK0Zx5Gu6xB936OGASXfqO+N/SSsmZiM4flECIHruiilVMdxcJ5nZYxBeO/Z952UEjmnmo9t25jnGeGcqyXGWK3ryrIsdbPW8gdJy0FZdO94OAAAAABJRU5ErkJggg==" />

Here’s the code from the output:

```javascript
// CodePen JS (Module)
// HTML:
// <canvas id="dotLottie-canvas" data-src="YOUR_DOTLOTTIE_URL"></canvas>

import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web@latest";

/* =============================
   Animation-space constants
   (from your file coords)
============================= */
const SLOT_EARTH = "earth";

// Animation dimensions must match the coordinate system your token uses.
// Your provided coords strongly imply anim-space pixels.
// (For planets-4.lottie, it's 942 x 1931.)
const ANIM_W = 942;
const ANIM_H = 1931;

const START_POS = { x: 487, y: 1676 };
const START_HIT_HALF = 50; // 50px from center in all directions (square)

const SNAP_POS = { x: 418, y: 800 };
const SNAP_RADIUS = 50; // within 50px of target (circle)

/* =============================
   Setup
============================= */
const canvas = document.getElementById("dotLottie-canvas");
const SRC = canvas?.dataset?.src;

if (!canvas) throw new Error("Missing #dotLottie-canvas element.");
if (!SRC) throw new Error("Missing data-src on #dotLottie-canvas.");

canvas.style.touchAction = "none";

const dotLottie = new DotLottie({
  canvas,
  src: SRC,
  autoplay: true,
  loop: true,
  renderConfig: { autoResize: true },
});

// Track current earth position in anim-space
let earthPos = { ...START_POS };

// Drag state
let dragging = false;
let pointerId = null;
let grabOffset = { x: 0, y: 0 };

/* =============================
   Helpers
============================= */
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

// Convert pointer (client) coords -> animation coords,
// assuming the animation is "contain" fit and centered in the canvas rect.
function clientToAnim(clientX, clientY) {
  const r = canvas.getBoundingClientRect();
  const xCss = clientX - r.left;
  const yCss = clientY - r.top;

  const scale = Math.min(r.width / ANIM_W, r.height / ANIM_H);
  const ox = (r.width - ANIM_W * scale) / 2;
  const oy = (r.height - ANIM_H * scale) / 2;

  const x = (xCss - ox) / scale;
  const y = (yCss - oy) / scale;

  return { x, y };
}

function setEarth(pos) {
  earthPos = { x: pos.x, y: pos.y };
  dotLottie.setVectorSlot(SLOT_EARTH, [earthPos.x, earthPos.y]); // per Slots API :contentReference[oaicite:0]{index=0}
}

function withinStartHitbox(p) {
  return (
    Math.abs(p.x - START_POS.x) <= START_HIT_HALF &&
    Math.abs(p.y - START_POS.y) <= START_HIT_HALF
  );
}

/* =============================
   Init
============================= */
dotLottie.addEventListener("load", () => {
  // Ensure earth is exactly at the declared starting point on load.
  setEarth(START_POS);
});

/* =============================
   Pointer events
============================= */
canvas.addEventListener("pointerdown", (e) => {
  const p = clientToAnim(e.clientX, e.clientY);

  // Only start dragging if click is within the 50px square around the START_POS
  if (!withinStartHitbox(p)) return;

  dragging = true;
  pointerId = e.pointerId;

  // Keep the relative grab point so it doesn't jump
  grabOffset = { x: p.x - earthPos.x, y: p.y - earthPos.y };

  canvas.setPointerCapture(pointerId);
});

canvas.addEventListener("pointermove", (e) => {
  if (!dragging || e.pointerId !== pointerId) return;

  const p = clientToAnim(e.clientX, e.clientY);

  // Move earth so the grabbed point stays under the cursor
  const next = { x: p.x - grabOffset.x, y: p.y - grabOffset.y };
  setEarth(next);
});

function endDrag(e) {
  if (!dragging || e.pointerId !== pointerId) return;

  dragging = false;

  // Snap test: within 50px of SNAP_POS => snap, else reset
  if (dist(earthPos, SNAP_POS) <= SNAP_RADIUS) {
    setEarth(SNAP_POS);
  } else {
    setEarth(START_POS);
  }

  try {
    canvas.releasePointerCapture(pointerId);
  } catch {}
  pointerId = null;
}

canvas.addEventListener("pointerup", endDrag);
canvas.addEventListener("pointercancel", endDrag);
canvas.addEventListener("lostpointercapture", () => {
  // Safety: if capture is lost mid-drag, treat as release (reset behavior)
  if (dragging) {
    dragging = false;
    setEarth(START_POS);
    pointerId = null;
  }
});
```

Pasting that into the JS panel in Codepen (after adding my Asset CDN link to the HTLM) resulted in the working demo at the top of the article.

<img src="https://assets.docs.lottiefiles.com/static/79ce9818a2-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/79ce9818a2-640.webp 640w, https://assets.docs.lottiefiles.com/static/79ce9818a2-1024.webp 1024w" alt="Drag and drop planets example working in Codepen" width="1916" height="1445" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjklEQVR4nC3OwRKCIABFUdY2CTQhIqCGimZOU///cbeRaXE3Z/OeSGnibgy29TSNxZiW/fiwrgfb+4uYl5U5byz5xfN5kFImTZll3RnHGWFtx5lzntZ5jHG4LhD7B52PCK01Z1IprK6I5kItNVqp4kJKiVIKKRU3eUXXFcX+iRB6vI/l3BB7oj+nAiEMxX9qJj5KHhoggwAAAABJRU5ErkJggg==" />

Since this is not the same as the final version, here’s the example that I just made with ChatGPT and the skills doc: [https://codepen.io/George-Dikun/pen/pvEoEoY](https://codepen.io/George-Dikun/pen/pvEoEoY)

And it works! You can drag the Earth to the spot directly under the sun. Getting the remainder of the example to work is mostly just repeating those steps, and it might even be possible to do it in one prompt if you give it detailed info. You can also add some nice QoL upgrades, like changing the cursor to become the grabbing hand rather than the mouse pointer.
