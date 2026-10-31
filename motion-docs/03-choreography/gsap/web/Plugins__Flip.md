---
source: https://gsap.com/docs/v3/Plugins/Flip
title: "Flip"
fetched: 2026-10-28
---

added in v<!-- -->3.9.0

# Flip

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(Flip) 
```

#### Minimal usage

```
// grab state
const state = Flip.getState(squares);
  
// Make DOM or styling changes
switchItUp();
  
// Animate from the initial state to the end state
Flip.from(state, {duration: 2, ease: "power1.inOut"});
```

info

Flip involves a whole different way of thinking about animation. Once you get it, you'll be wowed.

Flip plugin lets you seamlessly transition between two states even if there are sweeping changes to the structure of the DOM that would normally cause elements to jump.

Flip records the current position/size/rotation of your elements, you make whatever changes you want, and then Flip applies offsets to make them ***look*** like they never moved... Lastly FLIP animates the **removal** of those offsets! UI transitions become remarkably simple to code. Flip does all the heavy lifting.

## What people are saying:

> *Experimenting more with GSAP's flip plugin and I'm blown away by how much this accelerates development! What a powerful tool!*&#xD83D;&#xDCAA;*"* - Manoela Ilic, Codrops

> *"HOW DOES IT KNOW WHAT TO DO?* �&#xDD2F;*"* - @georgedoescode

> *"I'm truly amazed at the power of GSAP and FLIP."* - @Alex.Marti

> *"My 'Wow' of the week goes to the Flip Plugin. Star-struck. It's soooo smart!"* - @PeHaa

## Video[​](#video "Direct link to Video")

Detailed walkthrough

Of course like all GreenSock tools, there's a rich API for finessing effects and getting exactly the look you want.

"**FLIP**" is an animation technique that stands for "**F**irst", "**L**ast", "**I**nvert", "**P**lay" and was coined [by Paul Lewis](https://aerotwist.com/blog/flip-your-animations/). Here's a demo of how it works:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ad75564d0ac3e9c6dcaf26e85838ee2a)

```
<section id="flip" data-state="initial">
	<button id="prev">&lsaquo;</button>

	<div class="window">
		<div class="boxPosition initialPosition"></div>
		<div class="box gradient-blue">Flip</div>
		<div class="finalContainer"><div class="boxPosition finalPosition"></div></div>
	</div>

	<div class="steps">
		<p>If we reparent the blue div into a new rotated &amp; scaled container (altering the DOM structure), how could we animate there seamlessly? Use the "FLIP" animation technique! Press the right arrow to begin.</p>

		<p><strong>"First":</strong> Get the initial state.<br/><code>const state = <a href="https://greensock.com/docs/v3/Plugins/Flip/static.getState()">Flip.getState(targets)</a></code></p>
		<p><strong>"Last":</strong> Put elements in their final state. In this case we'll place the element in the new container &lt;div&gt; which results in a totally different position, scale, and rotation.</p>
		<p><strong>"Invert":</strong> Make the element <i>appear</i> in its previous position/size by applying offsets instantly. That way, it <i>looks</i> like it hasn't moved yet. <i>Note: we animate this step in the demo to illustrate what normally happens immediately.</i></p>
		<p><strong>"Play":</strong> Animate the removal of those offsets.<br/>
			<code><a href="https://greensock.com/docs/v3/Plugins/Flip/static.from()">Flip.from(state, options)</a></code> returns a GSAP timeline so you can add other animations, control it, etc.
		</p>

		<p>GSAP's <a href="https://greensock.com/docs/v3/Plugins/Flip">Flip Plugin</a> makes this a breeze! </p>
	</div>

	<button id="next">&rsaquo;</button>
</section>
```

```
* {
  box-sizing: border-box;
}

html, body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	font-weight: 300;
  font-size: 1rem;
}

.window {
	position: relative;
	height: 70vh;
	width: 40vw;
	border-top: 2rem solid #474b4c;
	border-radius: .5rem;
	background-color: #252525;
	overflow: hidden;
}

body, section {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

#flip {
	width: 100%;
}

section > .steps, section > .window {
	flex-basis: 50%;
}

button {
	appearance: none;
	flex: 0 0 auto;
	display: flex;           
	align-items: center;     
	justify-content: center;
	width: 2.75rem;
	height: 2.75rem;
	margin: 0 1rem;
	padding: 0;
	border: 1px solid var(--color-surface25, #42433d);
	border-radius: 50%;
	background: transparent;
	color: var(--color-surface50, #7c7c6f);
	font-size: 0; /* hides the ‹ › characters */
	cursor: pointer;
	transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

button::before {
	content: "";
	width: 1.25rem;
	height: 1.25rem;
	background: currentColor; /* so hover/focus colors still apply */
	-webkit-mask: var(--chevron) center / contain no-repeat;
	mask: var(--chevron) center / contain no-repeat;
}

#prev {
	--chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 6l-6 6 6 6'/%3E%3C/svg%3E");
}

#next {
	--chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 6l6 6-6 6'/%3E%3C/svg%3E");
}

button:hover {
	color: var(--color-surface-white, #fffce1);
	border-color: var(--color-surface-white, #fffce1);
}

#prev:hover { transform: translateX(-2px); }
#next:hover { transform: translateX(2px); }

button:active {
	transform: scale(0.94);
}

button:focus-visible {
	outline: none;
	border-color: var(--color-shockingly-green, #0ae448);
	box-shadow: 0 0 0 3px rgba(10, 228, 72, 0.3);
}

button:disabled {
	opacity: 0.3;
	cursor: default;
	pointer-events: none;
}


.steps {
	padding: 0 2rem;
  font-size: 1.1em;
}

.steps p:not(:first-child) {
	display: none;
}

.box, .boxPosition {
	position: absolute;
	top: 8px;
	left: 8px;
	height: 10vmin!important;
	width: 10vmin!important;
  box-sizing: content-box;
}

.boxPosition {
	top: 6px;
	left: 6px;
	visibility: hidden;
	opacity: 0;
}

.box {
	text-align: center;
	line-height: 10vmin;
	font-size: 3.5vmin;
	font-weight: 400;
	border-radius: 1vmin;
}

.initialPosition {
  border-radius: 5px;
	border: 2px dashed var(--color-blue);
}

.finalPosition {
  border-radius: 10px;
	border: 2px dashed var(--color-surface-white);
}

.finalContainer {
  position: relative;
	width: 36vmin;
	height: 36vmin;
	position: absolute;
	bottom: 0;
	right: 0;
	border: 1px dashed var(--color-surface50);
  border-radius: 10px;
	transform: translate(15vmin, -12vmin) scale(1.5) rotate(-30deg);
	color: var(--color-surface75);
	padding: 1vmin;
	font-size: 2vmin;
  overflow: visible;
}

.finalContainer:after {
  content: "new container";
  position: absolute;
  bottom: 100%;
  left: 0;
  padding-bottom: 0.25rem;
  font-size: 0.9rem;
  z-index: -1;
}
.logo {
  position: absolute;
  width: 60px;
  bottom: 20px;
  right: 30px;
}

code {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  font-size: 1rem;
}

.gsap-logo {
  max-width: 100px;
}
```

```
gsap.registerPlugin(Flip);

let states = [ toInitState, toFirstState, toLastState, toInvertState, toPlayState, toEndState ],
	stateIndex = 0,
	stateIndexWrap = gsap.utils.wrap(0, states.length),
	stepBlurbs = gsap.utils.toArray('.steps p'),
	boxEl = document.querySelector(".box"),
	windowEl = document.querySelector(".window"),
	finalContainerEl = document.querySelector(".finalContainer");

gsap.defaults({ duration: 0.4, overwrite: 'auto' });

document.querySelector('#prev').addEventListener('click', () => goToState(stateIndex - 1));
document.querySelector('#next').addEventListener('click', () => goToState(stateIndex + 1));

let transition;
function resize() {
  transition && transition.kill();

	// reset (put back in original container and remove any inline styles)
	windowEl.appendChild(boxEl);
	boxEl.style.cssText = "";

	// grab the original state
	const state = Flip.getState(boxEl);

	// put into the new container
	finalContainerEl.appendChild(boxEl);

	// FLIP!
	transition = Flip.from(state, {
		scale: true,
		duration: 1,
		repeat: -1,
		repeatDelay: 1.5,
		ease: "power1.inOut",
		paused: true
	}).progress(1).progress(0); // lock in the starting/ending values.

	if (stateIndex === 2 || stateIndex === 3) {
		transition.progress(1);
	} else if (stateIndex === 4 || stateIndex === 5) {
		transition.play();
	}
}

function goToState(newState) {
	stateIndex = stateIndexWrap(newState);
	states[stateIndex]();
}

function updateBlurb() {
	const textState = Flip.getState(stepBlurbs);

	gsap.set(stepBlurbs, { display: 'none' });
  gsap.set(stepBlurbs[stateIndex], { display: 'block' });

	Flip.from(textState, {
		duration: 0.4,
		absolute: true,
		onLeave: elements => gsap.to(elements, {opacity: 0, duration: 0.3}),
		onEnter: elements => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, duration: 0.3})
	});
}

function toInitState() {
	transition.pause(0);
	gsap.to(boxEl, {opacity: 1});
	gsap.to(".boxPosition", {autoAlpha: 0});
	updateBlurb();
}

function toFirstState() {
	transition.pause(0);
	gsap.to(boxEl, {opacity: 0.5});
	gsap.to(".initialPosition", {autoAlpha: 1});
	gsap.to(".finalPosition", {autoAlpha: 0});
	updateBlurb();
}

function toLastState() {
	gsap.killTweensOf(transition);
	gsap.set(boxEl, {opacity: 1});
	transition.progress(1).pause();
	gsap.to(".finalPosition", {autoAlpha: 1});
	updateBlurb();
}

function toInvertState() {
	transition.tweenFromTo(">", 0, {duration: 1, overwrite: true});
	updateBlurb();
}

function toPlayState() {
	gsap.killTweensOf(transition);
	gsap.to('.boxPosition', { autoAlpha: 1 });
	transition.play();
	updateBlurb();
}

function toEndState() {
	gsap.to(boxEl, { opacity: 1 });
	gsap.to('.boxPosition', { autoAlpha: 1 });
	transition.play();
	updateBlurb();
}

function init() {
	window.addEventListener('resize', resize);
	resize();
}

init();

// document.addEventListener("click", e => {
//   if (e.target.tagName.toLowerCase() === "button") {
//     return;
//   }
//   if (e.pageX < window.innerWidth / 4) {
//     goToState(stateIndex - 1);
//   } else {
//     goToState(stateIndex + 1);
//   }
// });
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)

## Features[​](#features "Direct link to Features")

Feature Highlights

* **Nested transforms? No problem!** Most FLIP libraries only calculate basic offsets assuming no transforms beyond x/y, so a scaled parent breaks things. Rotations certainly aren't allowed. GSAP's Flip plugin **just works**!
* Set `absolute: true` to **make elements use `position: absolute` during the flip**. This solves layout challenges with flexbox, grid, etc. You can even define a subset of targets, like `absolute: ".box"`
* One flip can handle **multiple elements** and even stagger them.
* **Resize via width/height properties** (default) **or scaleX/scaleY** (`scale: true`)
* You get the **full power of GSAP under the hood**, so you can use any `ease`, define special properties like `onComplete`, `onUpdate`, `repeat`, `yoyo`, and even `add()` other animations with total control of timing, etc.

**read more...**

* **Apply a CSS class during the flip with `toggleClass`**. It'll be removed at the end of the flip.
* **[Flip.fit()](/docs/v3/Plugins/Flip/static.fit\(\).md) repositions/resizes one element to fit perfectly on top another (or even a previous state of the same element)**.
* **Compensate for nested offsets**. If a container element is getting flipped along with some of its children, set `nested: true` to prevent the offsets from compounding.
* **Smoothly handles interruptions**.
* **Flip one element to another**; even have them cross-fade (`fade: true`). Just give them the same `data-flip-id` attribute to correlate them.
* **`onEnter` and `onLeave` callbacks** for when elements enter or leave (like if the flip senses a `display: none` toggle and there's no matching target to swap), making it easy to elegantly animate on/off elements.
* **Batch** multiple Flip animations so they don't step on each other's toes, like in a React app with multiple independent components that need to work together.

## How does Flip work?[​](#how-does-flip-work "Direct link to How does Flip work?")

There are typically 3 steps to a "FLIP" animation:

1. ### Get the current state[​](#get-the-current-state "Direct link to Get the current state")

   ```
   // returns a state object containing data about the elements' current position/size/rotation in the viewport
   const state = Flip.getState(".targets");
   ```

   This merely captures some data about the current state. Use selector text, an Element, an Array of Elements, or NodeList. [Flip.getState()](/docs/v3/Plugins/Flip/static.getState\(\).md) doesn't alter anything (unless there's an active flip animation affecting any of the targets in which case it will force it to completion to capture the final state accurately). By default, Flip only concerns itself with position, size, rotation, and skew. If you want your Flip animations to affect other CSS properties, you can define a configuration object with a comma-delimited list of `props`, like:

   ```
   // record some extra properties (optional)
   const state = Flip.getState(".targets", { props: "backgroundColor,color" });
   ```

2. ### Make your state changes[​](#make-your-state-changes "Direct link to Make your state changes")

   Perform DOM edits, styling updates, add/remove classes, or whatever is necessary to get things in their final state. There's no need to do that through the plugin (unless you're [batching](/docs/v3/Plugins/Flip/static.batch\(\).md)). For example, we'll toggle a class:

   ```
   // make state changes. We'll toggle a class, for example:
   element.classList.toggle("full-screen");
   ```

3. ### Call `Flip.from(state, options)`[​](#call-flipfromstate-options "Direct link to call-flipfromstate-options")

   Flip will look at the `state` object, compare the recorded positions/sizes to the current ones, immediately reposition/resize them to *appear* where they were in that previous state, and then animate the *removal* of those offsets. You can specify almost any standard tween special properties like `duration`, `ease`, `onComplete`, etc. [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md) returns a timeline that you can `add()` things to or control in any way:

   ```
   // animate from the previous state to the current one:
   Flip.from(state, {
     duration: 1,
     ease: "power1.inOut",
     absolute: true,
     onComplete: myFunc,
   });
   ```

   ***That's it!***

## Simple example[​](#simple-example "Direct link to Simple example")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/5e9998b2c467309c357987dde1a9a21b)

```
<button class="button">Swop element positions</button>
<div class="container">
  <div class="square box gradient-blue" id="sq1">1</div>
  <div class="square box gradient-pink" id="sq2">2</div>
</div>
```

```
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

p {
  margin-top: 1rem;
}
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
}

.box {
  width: 80px;
  height: 80px;
}

button {
  margin: 2rem 0.5rem;
}
```

```
gsap.registerPlugin(Flip);

const squares = gsap.utils.toArray(".square");

function doFlip() {
  // Get the initial state
  const state = Flip.getState(squares);
  
  // Make DOM or styling changes (swap the squares in our case)
  swap(squares);
  
  // Animate from the initial state to the end state
  Flip.from(state, {duration: 2, ease: "power1.inOut"});
}

// Given an Array of two siblings, append the one that's first so it's last (swap)
function swap([a, b]) {
  a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(b);
}

// click to flip
document.querySelector(".button").addEventListener("click", doFlip);
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)

## Flex example[​](#flex-example "Direct link to Flex example")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/02b5ff28e7175110cad7d24a1dce7201)

```
<h3>Smoothly change flex direction with GSAP's Flip plugin</h3>

<button id="changeLayout" class="button">change</button>
<div class="group">
  <div class="box">Common "FLIP" techniques employed by other tools won't work with flex elements because of the way browsers handle width/height. 
  </div>
  <div class="box">Simply set <code>absolute: true</code> to have GSAP's Flip plugin make the elements position: absolute during the flip to work around challenges with flex and grid layouts. 
  </div>
  <div class="box">When the flip animation is done, elements get reverted back to their normal positioning and everything appears seamless.</div>
  <div class="box">Happy flipping!</div>
</div>
```

```
/* Typography */

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

@font-face {
  font-display: block;
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff)
    format("woff");
}

:root {
  --color-shockingly-green: #0ae448;
  --color-just-black: #0e100f;
  --color-surface-white: #fffce1;
  --color-pink: #fec5fb;
  --color-shockingly-pink: #f100cb;
  --color-orangey: #ff8709;
  --color-lilac: #9d95ff;
  --color-lt-green: #abff84;
  --color-blue: #00bae2;
  --color-grey: gray;
  --color-surface75: #bbbaa6;
  --color-surface50: #7c7c6f;
  --color-surface25: #42433d;
}

body {
  color: var(--color-surface-white);
  background-color: var(--color-just-black);
  font-family: Mori, sans-serif;
  font-weight: 400;
  margin: 0;
  font-size: 1rem;
  line-height: 1.45;
  text-align: center;
}

.group.reorder {
  flex-direction: row;
}

h1 {
  font-weight: 400;
}

.group {
  width: 740px;
  height: auto;
  margin: 1rem auto;
  padding: 4px;
 border: dashed 2px var(--color-surface-white);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--color-just-black);
  position: relative;
  border-radius: 10px;
}

.box {
  margin: 4px;
  padding: 8px;
  line-height: 28px;
  border-radius: 10px;
}
.box:nth-child(1) {
  background-color: #bef3fe;
}
.box:nth-child(2) {
   background-color: var(--color-blue);
}
.box:nth-child(3) {
  background-color: var(--color-pink);
}
.box:nth-child(4) {
   background-color: #e1faff;
}

button {
  margin: 0 auto;
  display: inline-block;
  outline: none;
  padding: 8px 14px;
  background: var(--dark);
  border: solid 2px var(--color-surface-white);
  color: var(--light);
  text-decoration: none;
  border-radius: 99px;
  padding: 12px 25px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  line-height: 18px;
}

.gsap-logo {
  width: 20vw;
  max-width: 90px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  mix-blend-mode: difference;
  z-index: 9999;
}

img {
  max-width: 100%;
}
```

```
gsap.registerPlugin(Flip);

const group = document.querySelector(".group");

document.querySelector(".button").addEventListener("click", () => {
  // Get the initial state
  const state = Flip.getState(".group, .box");

  console.log(state);

  // toggle the flex direction
  group.classList.toggle("reorder");

  Flip.from(state, {
    absolute: true, // uses position: absolute during the flip to work around flexbox challenges
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.inOut"
    // you can use any other tweening properties here too, like onComplete, onUpdate, delay, etc.
  });
});
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)

## Advanced example[​](#advanced-example "Direct link to Advanced example")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/eed66252fd3d05b32ba336fbabb38e94)

```
<div class="app">
  <div class="gallery">
    <div class="item" data-title="Hoop" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-hoop.png" alt="" />
    </div>
    <div class="item" data-title="Cone" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-cone.png" alt="" />
    </div>
    <div class="item" data-title="Combo" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-combo.png" alt="" />
    </div>
    <div class="item" data-title="Star" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-star.png" alt="" />
    </div>
    <div class="item" data-title="Sparkle" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-sparkle.png" alt="" />
    </div>
    <div class="item" data-title="Squish" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-squish.png" alt="" />
    </div>
    <div class="item" data-title="Spiral" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-spiral.png" alt="" />
    </div>
    <div class="item" data-title="Tunnel" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-tunnel.png" alt="" />
    </div>
    <div class="item" data-title="Lock" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-lock.png" alt="" />
    </div>
    <div class="item" data-title="Windmill" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-windmill.png" alt="" />
    </div>
    <div class="item" data-title="Triangle" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-triangle.png" alt="" />
    </div>
    <div class="item" data-title="Hoop" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-hoop.png" alt="" />
    </div>
    <div class="item" data-title="Cone" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-cone.png" alt="" />
    </div>
    <div class="item" data-title="Combo" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-combo.png" alt="" />
    </div>
    <div class="item" data-title="Star" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-star.png" alt="" />
    </div>
    <div class="item" data-title="Sparkle" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-sparkle.png" alt="" />
    </div>
    <div class="item" data-title="Squish" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-squish.png" alt="" />
    </div>
    <div class="item" data-title="Spiral" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-spiral.png" alt="" />
    </div>
    <div class="item" data-title="Tunnel" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-tunnel.png" alt="" />
    </div>
    <div class="item" data-title="Lock" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-lock.png" alt="" />
    </div>
    <div class="item" data-title="Windmill" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/2D-windmill.png" alt="" />
    </div>
    
    <div class="item" data-title="Triangle" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-triangle.png" alt="" />
    </div>
    <div class="item" data-title="Hoop" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-hoop.png" alt="" />
    </div>
    <div class="item" data-title="Cone" data-secondary="Lorem ipsum dolor sit amet." data-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.">
      <img src="/demo-assets/3D-cone.png" alt="" />
    </div>
  </div>
  
 
</div>

<div class="detail">
  <img />

  <div class="content">
    <div class="title">Placeholder title</div>
    <div class="secondary">Placeholder secondary</div>
    <div class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.</div>
  </div>
</div>
```

```
/* GSAP brand: fonts, type sizes, colour vars, buttons and form controls.
   Element selectors only, so a demo's own class-based styles still win. */

/* Fonts */
@font-face {
  font-display: swap;
  font-family: Mori;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}
@font-face {
  font-display: swap;
  font-family: Mori;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}
@font-face {
  font-display: swap;
  font-family: "Fraktion Mono";
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

/* Colours */
:root {
  --color-shockingly-green: #0ae448;
  --color-just-black: #0e100f;
  --color-surface-white: #fffce1;
  --color-pink: #fec5fb;
  --color-shockingly-pink: #f100cb;
  --color-orangey: #ff8709;
  --color-lilac: #9d95ff;
  --color-lt-green: #abff84;
  --color-blue: #00bae2;
  --color-grey: #191919;
  --color-surface75: #bbbaa6;
  --color-surface50: #7c7c6f;
  --color-surface25: #42433d;

  --gradient-macha: linear-gradient(114.41deg, var(--color-shockingly-green) 20.74%, var(--color-lt-green) 65.5%);
  --gradient-orange-crush: linear-gradient(111.45deg, var(--color-orangey) 19.42%, #f7bdf8 73.08%);
  --gradient-lipstick: linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%);
  --gradient-purple-haze: linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%);
  --gradient-skyfall: linear-gradient(131.77deg, #0a157a 30.82%, #15bfe4 81.82%);
  --gradient-emerald-city: linear-gradient(166.9deg, var(--color-shockingly-green) 53.19%, #0085d0 107.69%);
  --gradient-summer-fair: linear-gradient(144.02deg, var(--color-blue) 4.56%, var(--color-pink) 72.98%);

  /* Short names many demos use */
  --dark: var(--color-just-black);
  --light: var(--color-surface-white);
  --mid: var(--color-surface50);
  --grey: var(--color-grey);
  --gray: var(--color-grey);
  --green: var(--color-shockingly-green);
  --green-light: var(--color-lt-green);
  --blue: var(--color-blue);
  --purple: var(--color-lilac);
  --pink: var(--color-pink);
  --orange: var(--color-orangey);
  --red: #cd237f;

  /* Form controls */
  --field-bg: #1c1d1f;
  --field-border: var(--color-surface25);
  --field-radius: 8px;
  --focus-ring: 0 0 0 3px rgba(10, 228, 72, 0.35);

  accent-color: var(--color-shockingly-green);
  color-scheme: dark;
}

/* Type */
* { box-sizing: border-box; }

body {
  margin: 0;
  background-color: var(--color-just-black);
  color: var(--color-surface75);
  font-family: Mori, system-ui, sans-serif;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  margin: 0.5em 0;
  color: var(--color-surface-white);
  font-weight: 400;
  line-height: 1.2;
}
h1 { font-size: clamp(2rem, 1.6rem + 2vw, 2.875rem); }
h2 { font-size: clamp(1.625rem, 1.4rem + 1.2vw, 2.2rem); }
h3 { font-size: clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem); }
h4 { font-size: clamp(1.125rem, 1rem + 0.5vw, 1.4rem); }

a { color: inherit; text-underline-offset: 0.15em; }

code, pre, kbd { font-family: "Fraktion Mono", ui-monospace, Menlo, monospace; }

/* Buttons */
button,
input[type="button"],
input[type="submit"],
input[type="reset"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  min-height: 2.5rem;
  padding: 0 1.25rem;
  border: 2px solid var(--color-surface75);
  border-radius: 99px;
  background: var(--color-just-black);
  color: var(--color-surface75);
  font: 600 0.9rem/1 Mori, system-ui, sans-serif;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}
button:hover,
input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  border-color: var(--color-surface-white);
  color: var(--color-surface-white);
}
button:disabled,
input:disabled { opacity: 0.4; cursor: not-allowed; }

/* Form controls */
label { color: var(--color-surface75); font-size: 0.9rem; }

input[type="text"],
input[type="number"],
input[type="email"],
input[type="search"],
input[type="url"],
input:not([type]),
select,
textarea {
  min-height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid var(--field-border);
  border-radius: var(--field-radius);
  background: var(--field-bg);
  color: var(--color-surface-white);
  font: 400 0.9rem/1.2 Mori, system-ui, sans-serif;
  transition: border-color 0.2s, box-shadow 0.2s;
}
textarea { padding: 0.6rem 0.75rem; line-height: 1.45; }
input::placeholder,
textarea::placeholder { color: var(--color-surface50); }

input[type="checkbox"],
input[type="radio"] {
  width: 1.1em;
  height: 1.1em;
  margin: 0 0.4em 0 0;
  vertical-align: -0.15em;
}
input[type="range"] { width: min(100%, 18rem); }

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--color-shockingly-green);
  box-shadow: var(--focus-ring);
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  display: grid;
  align-items: center;
  justify-items: center;
  background: #1D1F20;
  color: white;
  font-size: 14px;
  font-family: Lato, sans-serif;
}

img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  padding: 12%;   
  border-radius: 10px;
  background-color: #1c1d1f;    /* was black; lifts tiles off the dark background */
}

.app {
  height: 90vmin;
  width: 90vmin;
  background: var(--color-just-black);  /* was white */
  position: relative;
  overflow: auto;
  color-scheme: dark;                   /* dark scrollbar */

  /* Hide the app on load */
  visibility: hidden;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 10px;
}

.item {
  cursor: pointer;
  font-size: 0;
}



.detail {
  position: fixed;
  top: 10px;
  left: 50%;
  width: 90.1vmin;
  cursor: pointer;
  font-size: 0;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  max-height: 100%;
  overflow: auto;
}

.detail > img {
  position: relative;
  z-index: 1;
}

.detail .content {
  background: #232323;
  padding: 2rem 1.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  flex-grow: 1;
}

.detail .content > * {
  margin-bottom: 1rem;
}

.detail .title {
  font-size: 2rem;
  text-transform: uppercase;
}

.detail .secondary {
  color: lightgray;
}

.detail .description {
  line-height: 1.5;
}
```

```
const items = gsap.utils.toArray(".item"),
      details = document.querySelector('.detail'),
      detailContent = document.querySelector('.content'),
      detailImage = document.querySelector('.detail img'),
      detailTitle = document.querySelector('.detail .title'),
      detailSecondary = document.querySelector('.detail .secondary'),
      detailDescription = document.querySelector('.detail .description');

let activeItem; // keeps track of which item is open (details)

gsap.set(detailContent, { yPercent: -100 }); // close the details "drawer" (content) initially

function showDetails(item) {
	if (activeItem) { // someone could click on an element behind the open details panel in which case we should just close it.
		return hideDetails();
	}
	let onLoad = () => {

		// position the details on top of the item (scaled down)
		Flip.fit(details, item, {scale: true, fitChild: detailImage});

		// record the state
		const state = Flip.getState(details);

		// set the final state
		gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
		gsap.set(details, {xPercent: -50, top: "50%", yPercent: -50, visibility: "visible", overflow: "hidden"});

		Flip.from(state, {
			duration: 0.5,
			ease: "power2.inOut",
			scale: true,
			onComplete: () => gsap.set(details, {overflow: "auto"}) // to permit scrolling if necessary
		})
			// Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
			.to(detailContent, {yPercent: 0}, 0.2);

		detailImage.removeEventListener("load", onLoad);
		document.addEventListener('click', hideDetails);
	};

	// Change image and text
	const data = item.dataset;
	detailImage.addEventListener("load", onLoad);
	detailImage.src = item.querySelector('img').src;
	detailTitle.innerText = data.title;
	detailSecondary.innerText = data.secondary;
	detailDescription.innerText = data.text;

	// stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
	gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);
	activeItem = item;
}

function hideDetails() {
	document.removeEventListener('click', hideDetails);
	gsap.set(details, {overflow: "hidden"});

	// record the current state of details
	const state = Flip.getState(details);

	// scale details down so that its detailImage fits exactly on top of activeItem
	Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

	// animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
	const tl = gsap.timeline();
	tl.set(details, {overflow: "hidden"})
    .to(detailContent, {yPercent: -100})
	  .to(items, {opacity: 1, stagger: {amount: 0.7, from: items.indexOf(activeItem), grid: "auto"}})
	  .to(".app", {backgroundColor: "#0e100f"}, "<");

	// animate from the original state to the current one.
	Flip.from(state, {
		scale: true,
		duration: 0.5,
		delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
		onInterrupt: () => tl.kill()
	})
	  .set(details, {visibility: "hidden"});

	activeItem = null;
}

// Add click listeners
gsap.utils.toArray('.item').forEach(item => item.addEventListener('click', () => showDetails(item)));

// Intro animation
window.addEventListener('load', () => {
	gsap.to('.app', { autoAlpha: 1, duration: 0.2 });
	gsap.from('.item', {autoAlpha: 0, yPercent: 30, stagger: 0.04});
});
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)

## **Config Object**[​](#config-object "Direct link to config-object")

The [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md) options object (2nd parameter) can contain any of the following optional properties **in addition to any standard tween properties like `duration`, `ease`, `onComplete`**, etc. as described [here](/docs/v3/GSAP/gsap.to\(\).md):

* ### Property

  ### Description

  #### absolute[](#absolute)

  Boolean | String | Array | NodeList | Element - specifies which of the targets should have `position: absolute` applied during the course of the FLIP animation. If `true`, **all** of the targets are affected, or use selector text like `".box"` (or an Array/NodeList of Elements, or even a single Element) to specify a subset of the targets. This can solve layout challenges with flex and grid layouts, for example. If things aren't behaving in a seamless way, try setting `absolute: true`. Beware, that `position: absolute` removes the elements from document flow, so things below can collapse. In that case, just define a subset that doesn't include the container element so it props the layout open. *(added in 3.9.0)*

* #### absoluteOnLeave[](#absoluteOnLeave)

  Boolean - if `true`, any "leaving" Elements (ones passed to the `onLeave()`) will be set to `position: absolute` during the flip animation. This can be very useful when you set elements to `display: none` to hide them in the final state, but you want to animate them out (fade, scale, whatever). It's critical that they not affect layout but you still want them visible during the animation. *(added in 3.9.0)*

* #### fade[](#fade)

  Boolean - by default, if the target element associated with a particular `data-flip-id` in the previous state is a **different element** than the one with the same `data-flip-id` in the end state, it will get swapped immediately but if you'd prefer that they cross-fade, set `fade: true`. Again, this only applies when swapping elements. If the "swapping out" (leaving) element is `display: none` (CSS), obviously it won't be visible for fading but if you set the Flip to `absolute: true`, it will force the element to the previous display state *during* the flip so that it can cross-fade. The reason `absolute: true` is necessary in this case is because otherwise the element would affect document flow and throw off the positioning of other elements but if it is `position: absolute` (CSS), it's removed from the document flow and won't contaminate positioning.

* #### nested[](#nested)

  Boolean - if the Flip has any *nested* targets (like a parent and its child are both in the `targets`), set `nested: true` to have Flip perform extra calculations to prevent those movements from compounding. A parent's movement affects its children, so if both are mapped to end up 200px from their original position and Flip moves them both 200px, the child would end up moving 400px unless `nested: true` is set.

* #### onEnter[](#onEnter)

  Function - A callback that's called if/when a target either isn't found in the original `state` or it was not in the document flow in that original state (like `display: none`), but it *IS* in the document flow in the **end** state. Since there is no position/size data to compare to in the original state, it won't be included in the flip animation, but the callback receives an Array of the entering elements as a parameter so that you can animate them as you please (like fade them in). Any animation returned by this callback will get added to the flip timeline so that it gets forced to completion if a competing flip interrupts it. For example:

  ```
  onEnter: elements => gsap.fromTo(elements, {opacity: 0}, {opacity: 1})
  ```

* #### onLeave[](#onLeave)

  Function - A callback that's called if/when a target is in the original `state` but not the end state, or if it isn't in the document flow in the end state (like `display: none`). Since there is no position/size data to compare to in the end state, it won't be included in the flip animation, but the callback receives an Array of the leaving elements as a parameter so that you can animate them as you please (like fade them out). **IMPORTANT:** these elements won't be visible unless you also set `absolute: true` (otherwise, it'd throw off document flow). If `absolute: true` is set, it will force `display` to whatever it was in the previous state and then revert it back at the end of the flip. Any animation returned by this callback will get added to the flip timeline so that it gets forced to completion if a competing flip interrupts it. For example:

  ```
  onLeave: elements => gsap.fromTo(elements, {opacity: 1}, {opacity: 0})
  ```

* #### props[](#props)

  String - a comma-delimited list of *camelCased* CSS properties that should be included in the flip animation beyond the standard positioning/size/rotation/skew ones. For example, `"backgroundColor,color"`. This will only work, however, if the props exist in the `state` object (first parameter) because otherwise there's no corresponding data to pull from. By default, Flip will use the `props` that were captured in the state with [Flip.getState(targets, props)](/docs/v3/Plugins/Flip/static.getState\(\).md), so it's very rare that you'd need to define `props` in [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md). It's only useful if you want to *LIMIT* them to a subset of the ones captured in the state.

* #### prune[](#prune)

  Boolean - if `true`, Flip will remove any targets from the animation that match the previous state (position/size) in order to conserve resources. This requires a little more processing up-front, but it may improve performance during the animation when several get removed, plus it also makes staggering more intuitive since you may not want non-animating targets to be factored into the staggering. *(added in 3.9.0)*

* #### scale[](#scale)

  Boolean - by default, Flip will affect the `width` and `height` CSS properties to alter the size, but if you'd rather scale the element instead (typically better performance), set `scale: true`.

* #### simple[](#simple)

  Boolean - if `true`, Flip will skip the extra calculations that would be necessary to accommodate rotation/scale/skew in determining positions. It's like telling Flip *"I promise that there aren't any rotated/scaled/skewed containers for the Flipping elements"* which makes things **faster**. In most cases, the performance difference isn't noticeable, but if you're flipping a lot of elements it can help keep things snappy.

* #### spin[](#spin)

  Boolean | Number | Function -

  if `true`, the elements will spin an extra 360 degrees during the flip animation which makes it look a little more fun. Or you can define a **number** of full rotations, including a negative number, so `-1` would spin in the opposite direction once. If you provide a **function**, it will be called once for each target so that you can return whatever value you'd like for each individual element's spin. This allows you to, for example, have certain targets spin one direction, other elements spin another direction, or return 0 to not spin at all. Sample code: ...

  ```
  Flip.from(state, {
    spin: (index, target) => {
      if (target.classList.contains("clockwise")) {
        return 1;
      } else if (target.classList.contains("counter-clockwise")) {
        return -1;
      } else {
        return 0;
      }
    },
  })
  ```

* #### targets[](#targets)

  String | Element | Array | NodeList - by default, Flip will use the targets from the `state` object (first parameter), but you can specify a subset of those as either selector text (`".class, #id"`), an Element, an Array of Elements, or a NodeList. If any of the targets provided is NOT found in the `state` object, it will be passed to the `onEnter` and *not* included in the flip animation because there's no previous state from which to pull position/size data.

* #### toggleClass[](#toggleClass)

  String - adds a CSS class to the targets while the flip animation is in progress. For example `"flipping"`.

* #### zIndex[](#zIndex)

  Number - immediately sets the zIndex CSS property to this value for the entire course of the flip animation and then reverts at the end. This makes it easy to ensure that your flipping elements are on top of other elements during the animation, for example.

## How do I flip between two *different* elements?[​](#how-do-i-flip-between-two-different-elements "Direct link to how-do-i-flip-between-two-different-elements")

Flip looks for a `data-flip-id` attribute on every element it interacts with (via [Flip.getState()](/docs/v3/Plugins/Flip/static.getState\(\).md) or [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md), etc.) and if one isn't found, Flip assigns an incremented one automatically ("auto-1", "auto-2", etc.). It lets you correlate targets (the target with the `data-flip-id` of `"5"` in the "from" state gets matched up with the target with a `data-flip-id` of `"5"` in the end state). The `data-flip-id` can be any string, not just a number.

So if you want to flip between two different targets, make sure the data-flip-id attribute in the end state matches the one in the "from" state. When Flip sees that there are two with the same value in the from/end state, it will automatically figure out which one is disappearing (typically with `display: none`) and base things off of that to "swap" the elements. If you want them to crossfade, simply set `fade: true`, otherwise they'll immediately swap. And it is typically best to set `absolute: true` so that when Flip alters the `display` value, it doesn't affect the document flow.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/0268e6a4e9d646eba82f852a869677ca)

```
<div class="initial">
  <img class="thumbnail" data-flip-id="img" src="/demo-assets/flip-flair.webp">
</div>

<div class="container">
  <img class="full-size" data-flip-id="img"  src="/demo-assets/massive-flip-flair.webp">
</div>
```

```
body {
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
h1 {
  margin-left: 20px;
}

.container {
  position: fixed;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  pointer-events: none;
  z-index: 999;
}

.full-size {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  height: 80%;
  aspect-ratio: 1/1;
  display: none;
}
.full-size.active {
  display: block;
  z-index: 2;
}

.thumbnail {
  width: 150px;
  height: 150px;
}

.initial {
  position: relative;
  width: 180px;
  height: 180px;
  border: dashed 2px var(--color-surface-white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.initial:after {
  content: "drag and click me...";
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1516 1464' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'%3E%3Cpath d='M481.106,1059.48c40.533,-60.792 74.612,-125.5 105.72,-191.542c33.38,-70.875 64.242,-142.917 98.3,-213.458c33.85,-70.084 70.951,-139 116.609,-202.209c4.479,-6.208 9.108,-12.333 13.75,-18.416c36.487,-46.334 78.041,-88.125 124.45,-124.542c64.5,-48.917 136.066,-87.458 210.354,-119.333c83.954,-35.042 170.958,-62.167 258.404,-87.042c25.217,-7.167 50.479,-14.125 75.754,-21.083c21.009,-5.792 36.03,-29.834 29.1,-51.25c-6.954,-21.5 -28.737,-35.292 -51.254,-29.125c-100.741,27.708 -201.579,56.041 -299.054,93.958c-101.329,39.417 -197.683,88.458 -283.421,155.792c-84.475,66.375 -151.204,151.666 -205.071,244.125c-53.637,92.042 -95.441,190.25 -139.691,286.958c-41.634,91 -86.405,180.75 -144.725,262.375c-5.73,8.042 -11.613,15.958 -17.588,23.792c-34.783,44.375 -73.808,85.5 -118.171,120.458c-31.387,23.583 -65.154,43.792 -101.121,59.584c-3.295,1.333 -6.608,2.625 -9.929,3.916c29.221,-57.958 56.104,-117.166 79.171,-177.792c15.171,-39.874 28.579,-80.583 37.846,-122.249c2.421,-10.875 1.529,-22.334 -4.2,-32.126c-5.058,-8.625 -14.967,-16.875 -24.9,-19.124c-10.667,-2.459 -22.642,-1.917 -32.108,4.166c-8.871,5.75 -16.788,14.292 -19.15,24.917c-12.555,56.458 -32.48,111.166 -54.746,164.5c-19.3,45.333 -40.504,89.875 -63.046,133.708c-15.325,29.792 -31.233,59.292 -47.879,88.375c-2.946,5.167 -5.9,10.292 -8.938,15.417c-6.841,11.458 -7.191,25 -2.1,37.083c4.634,10.959 14.567,21.917 27,24.125c102.446,18 204.888,36 307.329,54c28.688,5.042 57.371,10.083 86.055,15.125c11.287,1.959 21.891,1.75 32.104,-4.208c8.646,-5.084 16.887,-14.959 19.15,-24.917c2.429,-10.666 1.904,-22.625 -4.2,-32.083c-5.563,-8.625 -14.379,-17.334 -24.9,-19.167c-93.467,-16.416 -186.929,-32.833 -280.392,-49.25c62.683,-23.708 119.513,-59.458 170.283,-103.5c56.417,-48.916 103.888,-107.958 145.205,-169.958Z' style='fill:%23fffce1;fill-rule:nonzero;'/%3E%3C/svg%3E");
  width:200px;
  height: 72px;
  background-size: 60px;
  padding-left: 75px;
  background-position: bottom left;
  background-repeat: no-repeat;
  text-align: left;
  bottom: 100%;
  margin-bottom: 0.2rem;
  margin-left: 0.5rem;
  left: 100%;
}

.thumbnail.active {
  visibility: hidden;
}
.thumbnail,
.thumbnail.flipping {
  visibility: visible;
}
```

```
gsap.registerPlugin(Flip, Draggable);

const fullSize = document.querySelector(".full-size"),
      thumbnail = document.querySelector(".thumbnail");

Draggable.create(".initial", {bounds: "body"});

document.addEventListener("click", () => {
	const state = Flip.getState(".thumbnail, .full-size");

	fullSize.classList.toggle("active");
  thumbnail.classList.toggle("active");

	Flip.from(state, {
		duration: 0.6,
		fade: true,
		absolute: true,
		toggleClass: "flipping",
		ease: "power1.inOut"
	});
  
});
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)[Draggable](/docs/v3/Plugins/Draggable/.md)

## Batching[​](#batching "Direct link to Batching")

What if you need to create **multiple** coordinated Flip animations (perhaps in various React components)? They'd need to all [.getState()](/docs/v3/Plugins/Flip/static.getState\(\).md) *BEFORE* any of them make their changes to the DOM/styling because doing so could alter the position/size of the other elements. See the docs for [Flip.batch()](/docs/v3/Plugins/Flip/static.batch\(\).md) for details.

## Caveats & Tips[​](#caveats--tips "Direct link to Caveats & Tips")

warning

* Flip does not accommodate 3D transforms (like rotationX, rotationY, or z).
* It is strongly recommended that you use `box-sizing: border-box` on your elements to ensure accurate width/height calculations.
* When `absolute: true` is set, remember that coordinates will be calculated based on the current viewport, so if the viewport size changes or the user scrolls DURING the flip, it may affect positioning (but once the flip is done and the offsets are removed, things will be where they should be). In other words, in-progress flipping isn't always responsive.
* Set any transform-related values (x, y, scale, rotation, etc.) [directly via GSAP](/resources/mistakes.md#transforms) whenever possible (instead of just in CSS classes or inline) because GSAP caches transform-related data to supercharge performance and maximize accuracy. To clear GSAP's cache on a particular element (which you'd never need to do if you're making all your changes via GSAP), `gsap.set(element, {clearProps: "transform"});`

Deep Dive - Using a framework like Vue, React or Angular?

Beware that frameworks often **DON'T** render changes immediately, so you should wait until the render occurs *before* initiating the [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md). [Batching](/docs/v3/Plugins/Flip/static.batch\(\).md) may be an excellent option because you can `batch.getState(true)` and then perhaps a `useLayoutEffect(() => batch.run(true), [...])` in React. Another hack would be to use requestAnimationFrame() to wait one tick: `requestAnimationFrame(() => Flip.from(...));`

When you `Flip.getState(".your-class")`, it records position/size data for the elements with ".your-class" at that time, remembering **those particular elements** and their `data-flip-id` attribute values. Then, if you `Flip.from(yourState)`, and don't specify any `targets`, it will default to using the elements that were captured in the getState() but your framework may have re-rendered entirely new element instances (even if they look the same), thus they won't animate because Flip doesn't know to look at those new elements. The original ones were completely removed from the DOM, hence the need to tell the Flip *"use these new targets and search the state object for the IDs that match..."*. So make sure you define `targets` like this:

```
// BAD
Flip.from(state, {
  duration: 1,
});

// GOOD
Flip.from(state, {
  targets: ".your-class", // <-- BINGO!
  duration: 1,
});
```

And don't forget that you'll probably need to set a `data-flip-id` on those elements to make sure Flip knows which target matches up with which one from the captured state.

## **Methods**[​](#methods "Direct link to methods")

|                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #### [Flip.batch](/docs/v3/Plugins/Flip/static.batch\(\).md)( id:String ) : FlipBatch                                                                                | Coordinates the creation of multiple Flip animations in the properly sequenced set of steps to avoid cross-contamination.                                                                                                                                                                                                                                                                                                                                                          |
| #### [Flip.fit](/docs/v3/Plugins/Flip/static.fit\(\).md)( targetToResize:String \| Element, destinationTargetOrState:String \| Element \| FlipState, vars:Object ) ; | Repositions/resizes one element so that it appears to fit exactly into the same area as another element. Using the `fitChild` special property, you can even scale/reposition an element so that one if its *child* elements is used for the fitting calculations instead! By default it alters the transforms (x, y, rotation, and skewX) as well as the width and height of the element, but if you set `scale: true` it will use scaleX and scaleY instead of width and height. |
| #### [Flip.from](/docs/v3/Plugins/Flip/static.from\(\).md)( state:FlipState, vars:Object ) : Timeline                                                                | Immediately moves/resizes the targets to match the provided `state` object, and then animates backwards to remove those offsets to end up at the current state. By default, `width` and `height` properties are used for the resizing, but you can set `scale: true` to scale instead (transform). It returns a timeline animation, so you can control it or add() other animations.                                                                                               |
| #### [Flip.getState](/docs/v3/Plugins/Flip/static.getState\(\).md)( targets:String \| Element \| Array, vars:Object ) : Object                                       | Captures information about the current state of the `targets` so that they can be Flipped later. By default, this information includes the dimensions, rotation, skew, opacity, and the position of the targets in the viewport. Other properties can be captured by configuring the `vars` parameter.                                                                                                                                                                             |
| #### [Flip.isFlipping](/docs/v3/Plugins/Flip/static.isFlipping\(\).md)( target:String \| Element ) : Boolean                                                         | Returns `true` if the given target is currently being Flipped. Otherwise returns `false`.                                                                                                                                                                                                                                                                                                                                                                                          |
| #### [Flip.killFlipsOf](/docs/v3/Plugins/Flip/static.killFlipsOf\(\).md)( targets:String \| Array \| NodeList \| Element, complete:boolean ) ;                       | Immediately kills the Flip animation associated with any of the targets provided.                                                                                                                                                                                                                                                                                                                                                                                                  |
| #### [Flip.makeAbsolute](/docs/v3/Plugins/Flip/static.makeAbsolute\(\).md)( targets:String \| Element \| Array \| NodeList \| FlipState ) : Array                    | Sets all of the provided target elements to `position: absolute` while retaining their current positioning.                                                                                                                                                                                                                                                                                                                                                                        |
| #### [Flip.to](/docs/v3/Plugins/Flip/static.to\(\).md)( state:FlipState, vars:Object ) : Timeline                                                                    | Identical to [Flip.from()](/docs/v3/Plugins/Flip/static.from\(\).md) except inverted, so this would animate **to** the provided state (from the current one).                                                                                                                                                                                                                                                                                                                      |

## **Demos**[​](#demos "Direct link to demos")

Check out the full collection of [How-to demos](https://codepen.io/collection/4a605f253549434210c139fa331704cb) and our favourite [inspiring community demos](https://codepen.io/collection/d725bcacb2f44bbdf0f44718f7ebbf55) on CodePen.
