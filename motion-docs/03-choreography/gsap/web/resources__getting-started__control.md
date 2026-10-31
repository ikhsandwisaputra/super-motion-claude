---
source: https://gsap.com/resources/getting-started/control
title: "Control and Callbacks"
fetched: 2026-10-28
---

# Control and Callbacks

## Control Methods[​](#control-methods "Direct link to Control Methods")

All the animations we 've looked at so far play on page load or after a `delay`. But what if you want a little more control over your animation? A common use case is to play an animation on a certain interaction like a button click or hover.

Control methods can be used on both tweens and timelines and allow you to [play](/docs/v3/GSAP/Tween/play\(\).md), [pause](/docs/v3/GSAP/Tween/pause\(\).md), [reverse](/docs/v3/GSAP/Tween/reverse\(\).md) or even [speed up](/docs/v3/GSAP/Tween/timeScale\(\).md) your animations!

```
// store the tween or timeline in a variable
let tween = gsap.to("#logo", {duration: 1, x: 100});

//pause
tween.pause();

//resume (honors direction - reversed or not)
tween.resume();

//reverse (always goes back towards the beginning)
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween 's progress:
tween.progress(0.25);

//make the tween go half-speed
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();

// You can even chain control methods
// Play the timeline at double speed - in reverse.
tween.timeScale(2).reverse();
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/OJLgdyg)

```
<div class="container">
  <div class="flair flair--25"></div>
  <div class="nav light">
  <button id="play">play()</button>
  <button id="pause">pause()</button>
  <button id="resume">resume()</button>
  <button id="reverse">reverse()</button>
  <button id="restart">restart()</button>
</div>
</div>
```

```
@font-face {
  font-display: block;
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  background-color: var(--dark);
}

.flair {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-size: contain;
  background-repeat: no-repeat;
  will-change: transform;
}

.flair--25 {
  background-image: url("/demo-assets/flair-25.webp");
}

.nav.light {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 2rem;
  background-color: transparent;
}
button {
  margin: 0.25rem;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 252, 225, 0.2);
  border-radius: 99px;
  color: #bbbaa6;
  font-family: Fraktion Mono, monospace;
  font-size: 0.85rem;
  line-height: 1;
  text-transform: none;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

button:hover {
  color: #fffce1;
  border-color: rgba(255, 252, 225, 0.6);
}
```

```
let nav = document.querySelector('.nav')

let tween = gsap.to(".flair", {
  duration: 2, 
  x: () => nav.offsetWidth, // animate by the px width of the nav
  xPercent: -100, // offset by the width of the box
  rotation: 360, 
  ease: "none", 
  paused: true
});

// click handlers for controlling the tween instance...
document.querySelector("#play").onclick = () => tween.play();
document.querySelector("#pause").onclick = () => tween.pause();
document.querySelector("#resume").onclick = () => tween.resume();
document.querySelector("#reverse").onclick = () => tween.reverse();
document.querySelector("#restart").onclick = () => tween.restart();
```

tip

Clients love to make last minute tweaks to animation! **[timeScale](/docs/v3/GSAP/Timeline/timeScale\(\).md)** comes in really handy for speeding up or slowing down complex animation timelines without having to change lots of durations and delays.

## Callbacks[​](#callbacks "Direct link to Callbacks")

If you need to know when an animation starts, or maybe run some JS when an animation comes to an end, you can use **Callbacks**. All tweens and timelines have these callbacks:

* **onComplete**: invoked when the animation has completed.
* **onStart**: invoked when the animation begins
* **onUpdate**: invoked every time the animation updates (on every frame while the animation is active).
* **onRepeat**: invoked each time the animation repeats.
* **onReverseComplete**: invoked when the animation has reached its beginning again when reversed.

```
gsap.to(".class", {
  duration: 1, 
  x: 100, 
  // arrow functions are handy for concise callbacks
  onComplete: () => console.log("the tween is complete")
});

// If your function doesn't fit neatly on one line, no worries.
// you can write a regular function and reference it
gsap.timeline({onComplete: tlComplete}); // <- no () after the reference!

function tlComplete() {
  console.log("the tl is complete");
  // more code
}
```

Use case: interaction events that trigger animations

Inside of event listeners for user interaction events, we can use control methods to have fine control over our animation’s play state.

In the example below, we are creating a timeline for each element (so that it doesn’t fire the same animation on all instances), attaching a reference for that timeline to the element itself, and then playing the relevant timeline when the element is hovered, reversing it when the mouse leaves. We're also adjusting the speed so it's faster on reverse and slower on entry. This is a good UX pattern.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/PoqRZOB)

```
<div class="container blue">
  <div class="silhouette" style="--img: url(/demo-assets/3D-hoop.png)"><div class="cover"></div></div>
  <div class="card">
    <h1>Hover</h1>
    <div class="information">
      <h2>Hoop</h2>
      <p>A glossy ring that loops forever. Perfect for anything that spins, orbits, or repeats.</p>
      <p class="tags"><span>rotate</span><span>repeat</span></p>
    </div>
  </div>
</div>

<div class="container pink">
  <div class="silhouette" style="--img: url(/demo-assets/3D-combo.png)"><div class="cover"></div></div>
  <div class="card">
    <h1>to</h1>
    <div class="information">
      <h2>Combo</h2>
      <p>Stacked shapes in one tidy bundle, like a timeline packed with perfectly sequenced tweens.</p>
      <p class="tags"><span>timeline</span><span>stagger</span></p>
    </div>
  </div>
</div>

<div class="container purple">
  <div class="silhouette" style="--img: url(/demo-assets/3D-spiral.png)"><div class="cover"></div></div>
  <div class="card">
    <h1>reveal</h1>
    <div class="information">
      <h2>Spiral</h2>
      <p>Coils in and out again. Made for smooth easing curves and scroll-driven reveals.</p>
      <p class="tags"><span>ease</span><span>scroll</span></p>
    </div>
  </div>
</div>

<div class="instructions">Hover over a card to reveal its flair</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
  --surface50: #7c7c6f;
  --gradient-blue: radial-gradient(
    78.77% 78.77% at 71.71% 30.77%,
    #f0fcff 0%,
    #9bedff 67.21%,
    #98ecff 76.04%,
    #5be1ff 84.9%,
    #00bae2 94.79%
  );
  --gradient-pink: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
  --gradient-purple: radial-gradient(
    129.03% 100% at 120.97% 81.45%,
    #dfdcff 27.08%,
    #a69eff 100%
  );
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem 0;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 200px;
  max-width: 250px;
  height: 450px;
  margin: 0 10px;
}

.container.blue {
  --accent: var(--gradient-blue);
}
.container.pink {
  --accent: var(--gradient-pink);
}
.container.purple {
  --accent: var(--gradient-purple);
}

/* flair image, overlapping the top of the card */
.silhouette {
  position: relative;
  z-index: 3;
  width: 150px;
  height: 150px;
  margin: 0 auto -60px;
  background: var(--img) center / contain no-repeat;
}

/* same image, flattened to a light silhouette; GSAP fades this out */
.silhouette .cover {
  position: absolute;
  inset: 0;
  background: var(--img) center / contain no-repeat;
  filter: brightness(0) invert(0.2);
}

.card {
  position: relative;
  flex: 1;
  overflow: hidden;
  padding-top: 90px;
  background: var(--grey);
  border: 1px solid rgba(255, 252, 225, 0.08);
  border-radius: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  color: var(--light);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.information {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 90px 1.25rem 1.5rem;
  background: var(--grey);
  text-align: left;
}

.information::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--accent);
}

h2 {
  margin: 0 0 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(255, 252, 225, 0.2);
  font-size: 1.6rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--accent);
  -webkit-background-clip: text;
  background-clip: text;
}

p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.tags span {
  padding: 6px 12px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--dark);
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
}

.instructions {
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  color: var(--surface50);
}

h1 {
  opacity: 0.5;
  font-size: 1.3rem;
}
```

```
gsap.set(".information", { yPercent: 100 });

gsap.utils.toArray(".container").forEach((container) => {
  let info = container.querySelector(".information"),
    silhouette = container.querySelector(".silhouette .cover"),
    tl = gsap.timeline({ paused: true });

  tl.to(info, { yPercent: 0 }).to(silhouette, { opacity: 0 }, 0);

  container.addEventListener("mouseenter", () => tl.timeScale(1).play());
  container.addEventListener("mouseleave", () => tl.timeScale(3).reverse());
});
```
