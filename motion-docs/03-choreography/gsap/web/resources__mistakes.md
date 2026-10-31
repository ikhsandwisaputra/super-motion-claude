---
source: https://gsap.com/resources/mistakes
title: "Common GSAP mistakes"
fetched: 2026-10-28
---

# Common GSAP mistakes

info

With over 200,000 posts in the GSAP Forums, we've noticed some common mistakes that you'd be wise to avoid. We threw in a few tips as well.

## Creating from() logic issues[​](#creating-from-logic-issues "Direct link to Creating from() logic issues")

It 's usually smart to use `.to()` and `.from()` tweens instead of `.fromTo()` because they 're more dynamic - they pull either the starting or ending values from whatever they happen to *CURRENTLY* be at the time that tween renders for the first time. It's one of the tips in the article on [animating efficiently](https://css-tricks.com/tips-for-writing-animation-code-efficiently/). But be careful because that dynamic nature can bite you in a few scenarios.

First, keep in mind that `.from()` tweens go from the provided value to the *current* value. Take a look at this example:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/gOPXLwN)

```
<div class="box gradient-green"></div>
<button>Restart</button>
```

```
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 1rem;
}
```

```
document
  .querySelector("button")
  .addEventListener("click", () =>
    gsap.from(".box", { opacity: 0, duration: 3 })
  );
```

Try clicking it one time and letting it play. It works, fading in the element.

Now try clicking it multiple times right after each other. The box stops showing up because it uses the current opacity as the end point which, if the animation has not completed, is some value less than 1.

The fix for this is simple: use a `.fromTo()`. Alternatively you could create the animation beforehand and use a control method (we 'll talk more about this approach later in this article).

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/vYLWyWw)

```
<div class="box gradient-green"></div>
<button>Restart</button>
```

```
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 1rem;
}
```

```
// fromTo approach
document.querySelector("button").addEventListener("click", () => gsap.fromTo(".box", {opacity: 0}, {opacity: 1}));


// Control method approach
// const anim = gsap.from(".box", {opacity: 0});
// document.querySelector("button").addEventListener("click", () => anim.restart());
```

Second, keep in mind that by default `immediateRender` is true by default for `.from()` and `.fromTo()` tweens because that 's typically the most intuitive behavior (if you 're animating from a certain value, it should start there right away). But if you create a `.from()` tween **after** a `.to()` tween affecting the *same* properties of the *same* object, try to figure out what will happen:

```
const tl = gsap.timeline()
tl.to(".box", {x: 100});
tl.from(".box", {x: 100});
```

You might expect the box to animate x from 0 to 100 and then back to 0. Or maybe you 'd expect it to animate from 0 to 100 and then stay at 100. Let's see what happens:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/dyGOjGQ)

```
<div class="box gradient-green"></div>
```

```
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 1rem;
}
```

```
const tl = gsap.timeline()
tl.to(".box", {x: 100});
tl.from(".box", {x: 100});
```

The box animates x from 100 to 100 and then back to 0. Why is that?

By default `.to()` tweens wait to render until their playhead actually moves (it 's a waste of CPU cycles to render at a time of 0 because nothing will have changed). But since `from()` has `immediateRender: true`, `x` jumps to 100 immediately on the current tick! *Then* it runs the `.to()` tween on the next tick (since it's first in the timeline) and records the current starting value which is 100! So it animates 100 to 100 over 0.5 seconds. Then it runs the `.from()` tween which has the cached value of 0 as the end value.

If you have several timelines affecting the same element, situations like this can be a little tricky to catch. So just be mindful of how things work when using `.to()` and `.from()` tweens. They're very powerful but with power comes responsibility. A simple solution here is to set `immediateRender: true` on the `.to()` tween, or `immediateRender: false` on the `.from()` tween.

The third situation is similar but involves [repeatRefresh](/3-1/#repeatRefresh-tl) and repeats.

Let's say you have a situation where you want a looped animation that fades in some text and fades it out. You could create a timeline, use a `.from()` to fade in the text, then use a `.to()` to fade it out:

```
const tl = gsap.timeline({repeat:-1});
tl.set(".text", { color: "random([green, gray, orange, pink])" }, 2);	
tl.from(chars, { opacity: 0 });
tl.to(chars, { opacity: 0 });
```

This will work just fine! Here's the same thing but staggered using SplitText to make it look a little nicer:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ZEQBgNg)

```
<div class="quote">RANDOM COLORS</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #0e100f;
}

.quote {
  color: #fffce1;
  font-family: Mori, sans-serif;
  font-weight: 300;
  font-size: 4vw;
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
}
```

```
const tl = gsap.timeline({repeat:-1}), 
    split = new SplitText(".quote", { type: "chars, words" }),
    chars = split.chars;

tl.set(chars, { color: "random([#0ae448, #15bfe4, #ff8709, #abff84])" }, 2);	

tl.from(chars, { 
  opacity: 0,
  duration: .1, 
  stagger: .1,
});

tl.to(chars, {
  duration: .5, 
  opacity: 0, 
  stagger: 0.05,
  ease: "power4.inOut",
});
```

Plugins[SplitText](/docs/v3/Plugins/SplitText/.md)

But this only randomizes the colors at the start. What if we want new random values each repeat? That's where `repeatRefresh` comes in. Let's add `repeatRefresh: true` to see what happens:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/KKVNOYJ)

```
<div class="quote">RANDOM COLORS</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #0e100f;
}

.quote {
  color: #fffce1;
  font-family: Mori, sans-serif;
  font-weight: 300;
  font-size: 4vw;
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
}
```

```
const tl = gsap.timeline({repeat:-1, repeatRefresh: true}), 
    split = new SplitText(".quote", { type: "chars, words" }),
    chars = split.chars;

tl.set(chars, { color: "random([#0ae448, #15bfe4, #ff8709, #abff84])" }, 2);	

tl.from(chars, { 
  opacity: 0,
  duration: .1, 
  stagger: .1,
});

tl.to(chars, {
  duration: .5, 
  opacity: 0, 
  stagger: 0.05,
  ease: "power4.inOut",
});
```

Plugins[SplitText](/docs/v3/Plugins/SplitText/.md)

The animation plays correctly the first time but after that the elements don't fade in a second time! Why is that?

`repeatRefresh` uses the end values of the animation as the starting values of the next iteration. In this case, the opacity of our text elements are all 0 at the end. So when the animation gets to the `.from()` the second time around, the opacity animates from a value of 0 to a value of 0 since the tween is relative.

What we want to do instead is always animate from a value of 0 to a value of 1 so here the easiest fix is to use a `.fromTo()`:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LYGbwvR)

```
<div class="quote">RANDOM COLORS</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #0e100f;
}

.quote {
  color: #fffce1;
  font-family: Mori, sans-serif;
  font-weight: 300;
  font-size: 4vw;
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
}
```

```
const tl = gsap.timeline({repeat:-1, repeatRefresh: true}), 
    split = new SplitText(".quote", { type: "chars, words" }),
    chars = split.chars;

tl.set(chars, { color: "random([#0ae448, #15bfe4, #ff8709, #abff84])" }, 2);	

tl.fromTo(chars, { opacity: 0 }, {
  opacity: 1,
  duration: .1, 
  stagger: .1,
});

tl.to(chars, {
  duration: .5, 
  opacity: 0, 
  stagger: 0.05,
  ease: "power4.inOut",
});
```

Plugins[SplitText](/docs/v3/Plugins/SplitText/.md)

Now it does what we want. There are other solutions like using a `.set()` before the `.from()` but most often it's easiest to just use a `.fromTo()` in cases like this.

## Using fromTo() when from() or to() would work[​](#using-fromto-when-from-or-to-would-work "Direct link to Using fromTo() when from() or to() would work")

If you can, it 's better for performance, maintainability, and ease to use relative tweens like `.from()` or `.to()`. So don 't use `.fromTo()` unless you need to. `.fromTo()` tweens aren 't *bad*, but should only be used when needed.

## Not setting ALL transforms with GSAP[​](#transforms "Direct link to Not setting ALL transforms with GSAP")

If you are going to animate an element with GSAP, even the initial transform values (including on SVG elements) should be set with GSAP because it delivers better:

* **Accuracy** - The browser always reports computed values in *pixels*, thus it 's impossible for GSAP to discern when you use another unit like % or vw in your CSS rule. Also, computed values are in matrix() or matrix3d() which are inherently ambiguous when it comes to rotation and scale. The matrix for 0, 360, and 720 degrees are identical. A scaleX of -1 results in the same matrix as something with rotation of 180 degrees and scaleY of -1. There are infinite combinations that are identical, but when you set transform-related values with GSAP, everything is saved in a perfectly accurate way.
* **Performance** - GSAP caches transform-related values to make things super fast. Parsing all of the components from a computed value is more expensive.

If you are worried about a flash of unstyled content, you can handle that by using a technique that hides the element initially and then shows it via JavaScript as [this post covers](/resources/fouc.md). Or you can set the initial styles with CSS rules and *ALSO* set them in GSAP.

## Not using xPercent and yPercent[​](#not-using-xpercent-and-ypercent "Direct link to Not using xPercent and yPercent")

Did you know that you can *combine* percentage-based translation and other units? This is super useful if, for example, you 'd like to align the center of an element with a particular offset, like `{xPercent: -50, yPercent: -50, x: 100, y: 300}`. We often see people use percent values in the `x` and `y` properties which is technically possible but can cause confusion at times. For example, if you set `x` and `y` to `"-50%"` and then later you set `xPercent: -50`, you 'd see it move as if it 's at `xPercent: -100` because the `x` and `xPercent` both have `-50%`. Whenever you 're setting a percentage-based translation, it 's typically best to use the `xPercent` and `yPercent` properties.

```
// Not recommended
x: "50%",
y: "50%",

// Recommended
xPercent: 50,
yPercent: 50
```

## Recreating animations over and over[​](#recreating-animations-over-and-over "Direct link to Recreating animations over and over")

Creating your tweens and timelines beforehand has several advantages:

* **Performance** - Instead of having to create them right as they're needed, you can do it ahead of time. Additionally, you need fewer instances of animations. Most of the time you'd never notice, but it's good practice.
* **Simplified logic** - This is especially true when related to user interaction events.
* **Freedom** - Want to pause an animation when an event happens? Do it. Want to reverse an animation when the user does something? No problem. This sort of thing is much more difficult to handle when you create animations inside of event callbacks.

Most of the time when you create animations beforehand, you will want to keep them paused until they're needed. Then you can use control methods like `.play()`, `.pause()`, `.reverse()`, `.progress()`, `.seek()`, `.restart()`, and `.timeScale()` to affect their play state.

Here's a simple example:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/mdVPOQV)

```
<a class="btn" href="#">
  <span class="btn-fill"></span>
  <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 120 120" aria-hidden="true">
    <path class="left-up" d="M41.55 0H0v41.55h10.02V10.02h31.53V0z"/>
    <path class="right-down" d="M73.08 41.55v31.53H41.55V83.1H83.1V41.55H73.08z"/>
    <path class="right-up" d="M63.11.07h19.92v19.92H63.11z"/>
    <path class="left-down" d="M.06 63.1h19.92v19.92H.06z"/>
  </svg>
  <span class="label">Get started</span>
</a>

<a class="btn" href="#">
  <span class="btn-fill"></span>
  <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 120 120" aria-hidden="true">
    <path class="left-up" d="M41.55 0H0v41.55h10.02V10.02h31.53V0z"/>
    <path class="right-down" d="M73.08 41.55v31.53H41.55V83.1H83.1V41.55H73.08z"/>
    <path class="right-up" d="M63.11.07h19.92v19.92H63.11z"/>
    <path class="left-down" d="M.06 63.1h19.92v19.92H.06z"/>
  </svg>
  <span class="label">View demos</span>
</a>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  min-height: 100vh;
  margin: 0;
  background: #0e100f;
  font-family: Mori, sans-serif;
}

.btn {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 14px 26px 14px 16px;
  border: 1px solid rgba(255, 252, 225, 0.2);
  border-radius: 99px;
  color: #fffce1;
  font-size: 1rem;
  line-height: 1;
  text-decoration: none;
}

/* green sweep behind the content; GSAP scales it in from the left */
.btn-fill {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%);
  transform: scaleX(0);
  transform-origin: left center;
}

.logo {
  flex: none;
  width: 22px;
  fill: #fffce1;
  overflow: visible;
}
```

```
document.querySelectorAll(".btn").forEach((btn) => {
  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.4, ease: "power3.inOut" }
  });

  tl.to(btn.querySelector(".btn-fill"), { scaleX: 1 }, 0)
    .to(btn, { color: "#0e100f", borderColor: "rgba(10, 228, 72, 0)" }, 0)
    .to(btn.querySelector(".logo"), { rotation: 135, fill: "#0e100f", transformOrigin: "50% 50%" }, 0)
    .to(btn.querySelectorAll(".right-up, .left-down"), {
      scale: 1.35,
      transformOrigin: "50% 50%",
      ease: "back.out(3)",
      stagger: 0.05
    }, 0.1)
    .to(btn.querySelector(".label"), { x: 4 }, 0);

  // play on the way in, reverse on the way out
  btn.addEventListener("mouseenter", () => tl.play());
  btn.addEventListener("mouseleave", () => tl.reverse());
  btn.addEventListener("focus", () => tl.play());
  btn.addEventListener("blur", () => tl.reverse());
});
```

For more information related to creating animations beforehand, you can see the [animating efficiently](https://css-tricks.com/tips-for-writing-animation-code-efficiently/) article.

One exception to this rule is when you need things to be dynamic, like if the initial values may vary. For example, if you're animating the height of the bars in a chart between various states and the user may click different buttons quickly, it'd make sense to create the animation each time to ensure they flow from whatever the current state is (even if it 's mid-tween) like the demo below.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ZEQBemg)

```
<div id="graphContainer">
  <svg id="graph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 328.34">
    <defs>
      <!-- one gradient across the whole chart, so the colour sweeps from bar to bar -->
      <linearGradient id="bar-gradient" gradientUnits="userSpaceOnUse" x1="66" y1="280" x2="600" y2="20">
        <stop offset="0.19" stop-color="#ff8709" />
        <stop offset="0.73" stop-color="#f7bdf8" />
      </linearGradient>
    </defs>
    <line id="bar1" class="bar" x1="126.56" y1="280" x2="126.56" y2="20" />
    <line id="bar2" class="bar" x1="264.25" y1="280" x2="264.25" y2="20" />
    <line id="bar3" class="bar" x1="401.83" y1="280" x2="401.83" y2="20" />
    <line id="bar4" class="bar" x1="539.25" y1="280" x2="539.25" y2="20" />
    <polyline id="axis" points="58 20 58 280 608 280" />
    <g id="yAxis">
      <g>
        <path d="M25.89,279.53v-.93A9.24,9.24,0,0,0,27,279a5,5,0,0,0,1.11.15v-3.18l-.38-.14a3.73,3.73,0,0,1-1.46-.94,2,2,0,0,1-.48-1.38,1.94,1.94,0,0,1,.62-1.48,2.93,2.93,0,0,1,1.7-.68v-1.21H29v1.2a4.72,4.72,0,0,1,1,.18,5.6,5.6,0,0,1,.87.33v.92a7.36,7.36,0,0,0-.91-.35,5,5,0,0,0-1-.17v3l.39.14a4.1,4.1,0,0,1,1.59,1,2,2,0,0,1,.47,1.38,2.06,2.06,0,0,1-.66,1.61A3,3,0,0,1,29,280v1.23h-.82v-1.22a6.62,6.62,0,0,1-1.23-.18A4.59,4.59,0,0,1,25.89,279.53Zm.95-6a1.14,1.14,0,0,0,.33.84,2.54,2.54,0,0,0,1,.57v-2.66a1.69,1.69,0,0,0-.95.39A1.11,1.11,0,0,0,26.84,273.5Zm3.52,4.26a1.26,1.26,0,0,0-.31-.86,3.08,3.08,0,0,0-1.1-.63v2.84a1.81,1.81,0,0,0,1-.42A1.2,1.2,0,0,0,30.36,277.76Z" style="fill: #312d2a" />
        <path d="M35.65,280.14A2.74,2.74,0,0,1,33.27,279a5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44A5.68,5.68,0,0,1,38,279,2.74,2.74,0,0,1,35.65,280.14Zm0-.92c1.39,0,2.09-1.18,2.09-3.53a5.37,5.37,0,0,0-.51-2.65,1.87,1.87,0,0,0-3.15,0,5.25,5.25,0,0,0-.52,2.65C33.56,278,34.26,279.22,35.65,279.22Z" style="fill: #312d2a" />
        <path d="M40,280v-1.26h1.41V280Z" style="fill: #312d2a" />
        <path d="M45.68,280.14A2.74,2.74,0,0,1,43.3,279a5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.68,5.68,0,0,1-.81,3.33A2.74,2.74,0,0,1,45.68,280.14Zm0-.92c1.39,0,2.09-1.18,2.09-3.53a5.37,5.37,0,0,0-.51-2.65,1.87,1.87,0,0,0-3.15,0,5.36,5.36,0,0,0-.52,2.65C43.59,278,44.29,279.22,45.68,279.22Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M28.83,242.39v-.94a9.39,9.39,0,0,0,1.13.38,6.46,6.46,0,0,0,1.11.15V238.8l-.38-.14a3.63,3.63,0,0,1-1.46-.95,2,2,0,0,1-.48-1.37,1.92,1.92,0,0,1,.62-1.48,2.86,2.86,0,0,1,1.7-.68V233h.82v1.2a4.73,4.73,0,0,1,1,.17,6.84,6.84,0,0,1,.87.33v.93a6.05,6.05,0,0,0-.91-.35,5,5,0,0,0-1-.17v3l.39.15a4,4,0,0,1,1.59,1,2,2,0,0,1,.47,1.38,2,2,0,0,1-.66,1.6,2.91,2.91,0,0,1-1.79.69v1.24h-.82v-1.22a7.57,7.57,0,0,1-1.23-.18A4.59,4.59,0,0,1,28.83,242.39Zm1-6a1.15,1.15,0,0,0,.33.85,2.54,2.54,0,0,0,1,.57v-2.66a1.63,1.63,0,0,0-.95.39A1.09,1.09,0,0,0,29.78,236.35Zm3.52,4.26a1.25,1.25,0,0,0-.31-.85,3.23,3.23,0,0,0-1.1-.64V242a1.81,1.81,0,0,0,1-.43A1.18,1.18,0,0,0,33.3,240.61Z" style="fill: #312d2a" />
        <path d="M37.15,242.86v-7.21l-2,.91v-.68l2.31-1.63h.79v8.61Z" style="fill: #312d2a" />
        <path d="M40,242.86V241.6h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,243a2.74,2.74,0,0,1-2.38-1.12,5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.68,5.68,0,0,1-.81,3.33A2.74,2.74,0,0,1,45.68,243Zm0-.92c1.39,0,2.09-1.18,2.09-3.53a5.35,5.35,0,0,0-.51-2.65,1.86,1.86,0,0,0-3.15,0,5.33,5.33,0,0,0-.52,2.65C43.59,240.9,44.29,242.08,45.68,242.08Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M26.67,205.25v-.94a9.24,9.24,0,0,0,1.13.37,5.6,5.6,0,0,0,1.11.16v-3.18l-.38-.15a3.62,3.62,0,0,1-1.46-.94,2,2,0,0,1-.48-1.37,1.92,1.92,0,0,1,.62-1.48,2.86,2.86,0,0,1,1.7-.68v-1.21h.82V197a4.73,4.73,0,0,1,1,.17,5.6,5.6,0,0,1,.87.33v.92a6,6,0,0,0-.91-.34,4.36,4.36,0,0,0-1-.17v3l.39.14a4.1,4.1,0,0,1,1.59,1,2,2,0,0,1,.47,1.38,2.05,2.05,0,0,1-.66,1.6,2.91,2.91,0,0,1-1.79.69V207h-.82v-1.23a6.64,6.64,0,0,1-1.23-.17A5.18,5.18,0,0,1,26.67,205.25Zm.95-6a1.16,1.16,0,0,0,.33.85,2.54,2.54,0,0,0,1,.57V198a1.7,1.7,0,0,0-.95.4A1.09,1.09,0,0,0,27.62,199.21Zm3.52,4.26a1.23,1.23,0,0,0-.31-.85,2.94,2.94,0,0,0-1.1-.64v2.85a1.81,1.81,0,0,0,1-.43A1.2,1.2,0,0,0,31.14,203.47Z" style="fill: #312d2a" />
        <path d="M33.21,205.71V205l2.39-2.59c.47-.51.84-.94,1.12-1.3a5,5,0,0,0,.62-.95,1.81,1.81,0,0,0,.19-.77c0-1-.56-1.45-1.68-1.45a4.86,4.86,0,0,0-2.35.69v-.94a4.06,4.06,0,0,1,1.13-.5,4.88,4.88,0,0,1,1.28-.18,2.93,2.93,0,0,1,2,.61,2.18,2.18,0,0,1,.7,1.74,3,3,0,0,1-.51,1.52,16,16,0,0,1-1.66,2l-1.76,1.9h4v.92Z" style="fill: #312d2a" />
        <path d="M40,205.71v-1.26h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,205.86a2.76,2.76,0,0,1-2.38-1.12,5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.68,5.68,0,0,1-.81,3.33A2.76,2.76,0,0,1,45.68,205.86Zm0-.93c1.39,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0,5.38,5.38,0,0,0-.52,2.66C43.59,203.76,44.29,204.93,45.68,204.93Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M26.61,168.1v-.93a9.24,9.24,0,0,0,1.13.37,5.6,5.6,0,0,0,1.11.16v-3.19l-.38-.14a3.62,3.62,0,0,1-1.46-.94,2,2,0,0,1-.48-1.38,1.94,1.94,0,0,1,.62-1.48,2.86,2.86,0,0,1,1.7-.67v-1.22h.82v1.2a4.72,4.72,0,0,1,1,.18,5.6,5.6,0,0,1,.87.33v.92a7.36,7.36,0,0,0-.91-.35,5.89,5.89,0,0,0-1-.17v3l.39.14a4.22,4.22,0,0,1,1.59,1,2,2,0,0,1,.47,1.39,2.05,2.05,0,0,1-.66,1.6,3,3,0,0,1-1.79.69v1.23h-.82v-1.22a7.6,7.6,0,0,1-1.23-.17A5.15,5.15,0,0,1,26.61,168.1Zm.95-6a1.14,1.14,0,0,0,.33.84,2.54,2.54,0,0,0,1,.57v-2.66a1.77,1.77,0,0,0-1,.39A1.11,1.11,0,0,0,27.56,162.07Zm3.52,4.26a1.26,1.26,0,0,0-.31-.86,3.08,3.08,0,0,0-1.1-.63v2.84a1.74,1.74,0,0,0,1-.42A1.2,1.2,0,0,0,31.08,166.33Z" style="fill: #312d2a" />
        <path d="M33.29,168.17v-.93a4.92,4.92,0,0,0,2.31.54,2.43,2.43,0,0,0,1.62-.5,1.8,1.8,0,0,0,.58-1.41,1.63,1.63,0,0,0-.47-1.2,1.77,1.77,0,0,0-1.28-.46,4,4,0,0,0-.71.07,4.69,4.69,0,0,0-.69.18l-.38-.64,2.78-2.93H33.37V160h5.1v.68l-2.64,2.78.34,0a2.7,2.7,0,0,1,1.95.67,2.34,2.34,0,0,1,.71,1.79A2.65,2.65,0,0,1,38,168a3.39,3.39,0,0,1-2.34.75A4.61,4.61,0,0,1,33.29,168.17Z" style="fill: #312d2a" />
        <path d="M40,168.57v-1.26h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,168.71a2.74,2.74,0,0,1-2.38-1.12,5.66,5.66,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.66,5.66,0,0,1-.81,3.33A2.74,2.74,0,0,1,45.68,168.71Zm0-.92c1.39,0,2.09-1.17,2.09-3.53a5.37,5.37,0,0,0-.51-2.65,1.87,1.87,0,0,0-3.15,0,5.36,5.36,0,0,0-.52,2.65C43.59,166.62,44.29,167.79,45.68,167.79Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M25.79,131V130a9.28,9.28,0,0,0,1.12.38,5.71,5.71,0,0,0,1.11.15v-3.18l-.37-.14a3.7,3.7,0,0,1-1.47-.94,2.05,2.05,0,0,1-.48-1.38,1.9,1.9,0,0,1,.63-1.48,2.83,2.83,0,0,1,1.69-.68v-1.21h.83v1.2a4.63,4.63,0,0,1,1,.17,7.22,7.22,0,0,1,.87.33v.93a5.67,5.67,0,0,0-.91-.35,5,5,0,0,0-1-.17v3l.38.15a4.11,4.11,0,0,1,1.6,1,2.28,2.28,0,0,1-.2,3,2.9,2.9,0,0,1-1.78.69v1.24H28v-1.22a7.91,7.91,0,0,1-1.23-.18A4.49,4.49,0,0,1,25.79,131Zm.94-6a1.15,1.15,0,0,0,.33.85,2.54,2.54,0,0,0,1,.57v-2.66a1.63,1.63,0,0,0-.95.39A1.12,1.12,0,0,0,26.73,124.92Zm3.52,4.26a1.2,1.2,0,0,0-.31-.85,3,3,0,0,0-1.09-.63v2.84a1.81,1.81,0,0,0,1-.43A1.17,1.17,0,0,0,30.25,129.18Z" style="fill: #312d2a" />
        <path d="M32.34,129.42v-.8l4.47-5.8h1v5.68h1.15v.92H37.79v2H36.71v-2Zm1.23-.92h3.16v-4.06Z" style="fill: #312d2a" />
        <path d="M40,131.43v-1.26h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,131.57a2.74,2.74,0,0,1-2.38-1.12,5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.68,5.68,0,0,1-.81,3.33A2.74,2.74,0,0,1,45.68,131.57Zm0-.92c1.39,0,2.09-1.18,2.09-3.53a5.35,5.35,0,0,0-.51-2.65,1.86,1.86,0,0,0-3.15,0,5.33,5.33,0,0,0-.52,2.65C43.59,129.47,44.29,130.65,45.68,130.65Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M26.67,93.82v-.94a9.24,9.24,0,0,0,1.13.37,5.6,5.6,0,0,0,1.11.16V90.23l-.38-.15a3.62,3.62,0,0,1-1.46-.94,2,2,0,0,1-.48-1.37,1.92,1.92,0,0,1,.62-1.48,2.86,2.86,0,0,1,1.7-.68V84.4h.82v1.2a4.73,4.73,0,0,1,1,.17,5.6,5.6,0,0,1,.87.33V87a6,6,0,0,0-.91-.34,4.36,4.36,0,0,0-1-.17v3l.39.14a4.1,4.1,0,0,1,1.59,1A2,2,0,0,1,32.18,92a2.05,2.05,0,0,1-.66,1.6,2.91,2.91,0,0,1-1.79.69v1.24h-.82V94.33a6.64,6.64,0,0,1-1.23-.17A5.18,5.18,0,0,1,26.67,93.82Zm.95-6a1.16,1.16,0,0,0,.33.85,2.54,2.54,0,0,0,1,.57V86.53a1.7,1.7,0,0,0-.95.4A1.09,1.09,0,0,0,27.62,87.78ZM31.14,92a1.23,1.23,0,0,0-.31-.85,2.94,2.94,0,0,0-1.1-.64V93.4a1.81,1.81,0,0,0,1-.43A1.2,1.2,0,0,0,31.14,92Z" style="fill: #312d2a" />
        <path d="M33.17,93.89V93a4.65,4.65,0,0,0,1.11.41,5.23,5.23,0,0,0,1.19.13A2.17,2.17,0,0,0,37,93a1.82,1.82,0,0,0,.55-1.4,1.75,1.75,0,0,0-.49-1.31,1.88,1.88,0,0,0-1.34-.46,4.44,4.44,0,0,0-1,.12,3.68,3.68,0,0,0-.84.33l-.66-.51.51-4.07H38.1v.92H34.5l-.34,2.7A4.23,4.23,0,0,1,35,89a3.55,3.55,0,0,1,.86-.1,3.18,3.18,0,0,1,1.46.32,2.35,2.35,0,0,1,1,.93,2.7,2.7,0,0,1,.35,1.42,2.86,2.86,0,0,1-.38,1.52,2.48,2.48,0,0,1-1.06,1,3.78,3.78,0,0,1-1.64.34,6.4,6.4,0,0,1-1.26-.13A4,4,0,0,1,33.17,93.89Z" style="fill: #312d2a" />
        <path d="M40,94.28V93h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,94.43a2.76,2.76,0,0,1-2.38-1.12A5.68,5.68,0,0,1,42.49,90q0-4.44,3.19-4.44T48.87,90a5.68,5.68,0,0,1-.81,3.33A2.76,2.76,0,0,1,45.68,94.43Zm0-.93c1.39,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0A5.38,5.38,0,0,0,43.59,90C43.59,92.33,44.29,93.5,45.68,93.5Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M26.19,56.67v-.93a9.24,9.24,0,0,0,1.13.37,5.6,5.6,0,0,0,1.11.16V53.09l-.38-.15A3.62,3.62,0,0,1,26.59,52a2,2,0,0,1-.48-1.37,2,2,0,0,1,.62-1.49,2.86,2.86,0,0,1,1.7-.67V47.25h.82v1.2a5.43,5.43,0,0,1,1,.18,5.6,5.6,0,0,1,.87.33v.92a7.36,7.36,0,0,0-.91-.35,5,5,0,0,0-1-.16v3l.39.14a4.1,4.1,0,0,1,1.59,1,2,2,0,0,1,.47,1.38,2.05,2.05,0,0,1-.66,1.6,3,3,0,0,1-1.79.69v1.23h-.82V57.19A6.64,6.64,0,0,1,27.2,57,5.15,5.15,0,0,1,26.19,56.67Zm.95-6a1.14,1.14,0,0,0,.33.84,2.54,2.54,0,0,0,1,.57V49.39a1.7,1.7,0,0,0-.95.4A1.07,1.07,0,0,0,27.14,50.64Zm3.52,4.26a1.22,1.22,0,0,0-.31-.85,2.94,2.94,0,0,0-1.1-.64v2.84a1.74,1.74,0,0,0,1-.42A1.2,1.2,0,0,0,30.66,54.9Z" style="fill: #312d2a" />
        <path d="M35.59,57.29a2.81,2.81,0,0,1-2.14-.81,3.1,3.1,0,0,1-.78-2.24A4.27,4.27,0,0,1,33,52.63a9.47,9.47,0,0,1,1.08-1.86l1.6-2.23h1.18L35.1,51l-.36.5-.29.44a2.43,2.43,0,0,1,1.63-.58,2.32,2.32,0,0,1,2.19,1.38,3.57,3.57,0,0,1,.32,1.55,3.16,3.16,0,0,1-.38,1.56,2.53,2.53,0,0,1-1.05,1A3.17,3.17,0,0,1,35.59,57.29Zm-1.92-3a2.21,2.21,0,0,0,.51,1.55,1.8,1.8,0,0,0,1.42.56A1.88,1.88,0,0,0,37,55.81a2.14,2.14,0,0,0,.52-1.5,2.3,2.3,0,0,0-.48-1.53,1.59,1.59,0,0,0-1.27-.57,2.12,2.12,0,0,0-1.23.36,2.48,2.48,0,0,0-.86,1,3.11,3.11,0,0,0,0,.32C33.67,54,33.67,54.13,33.67,54.25Z" style="fill: #312d2a" />
        <path d="M40,57.14V55.88h1.41v1.26Z" style="fill: #312d2a" />
        <path d="M45.68,57.29a2.75,2.75,0,0,1-2.38-1.13,5.64,5.64,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44a5.64,5.64,0,0,1-.81,3.33A2.75,2.75,0,0,1,45.68,57.29Zm0-.93c1.39,0,2.09-1.17,2.09-3.53a5.37,5.37,0,0,0-.51-2.65,1.87,1.87,0,0,0-3.15,0,5.36,5.36,0,0,0-.52,2.65C43.59,55.19,44.29,56.36,45.68,56.36Z" style="fill: #312d2a" />
      </g>
      <g>
        <path d="M28,19.53v-.94a8.84,8.84,0,0,0,1.13.38,5.61,5.61,0,0,0,1.1.15V15.94l-.37-.14a3.7,3.7,0,0,1-1.47-.94,2.05,2.05,0,0,1-.48-1.38A1.9,1.9,0,0,1,28.5,12a2.83,2.83,0,0,1,1.69-.68V10.11H31v1.2a4.53,4.53,0,0,1,1,.17,7.22,7.22,0,0,1,.87.33v.93a5.67,5.67,0,0,0-.91-.35,4.91,4.91,0,0,0-1-.17v3l.38.15a4,4,0,0,1,1.6,1,2.27,2.27,0,0,1-.19,3A2.93,2.93,0,0,1,31,20v1.24h-.83V20.05A7.91,7.91,0,0,1,29,19.87,4.49,4.49,0,0,1,28,19.53Zm.95-6a1.14,1.14,0,0,0,.32.85,2.71,2.71,0,0,0,1,.57V12.25a1.66,1.66,0,0,0-1,.39A1.11,1.11,0,0,0,28.91,13.49Zm3.51,4.26a1.2,1.2,0,0,0-.31-.85A3,3,0,0,0,31,16.27v2.84a1.84,1.84,0,0,0,1-.43A1.2,1.2,0,0,0,32.42,17.75Z" style="fill: #312d2a" />
        <path d="M35.75,20,39,12.31H35.33L35,13.66h-.64V11.39H40.1v.71L36.91,20Z" style="fill: #312d2a" />
        <path d="M40,20V18.74h1.41V20Z" style="fill: #312d2a" />
        <path d="M45.68,20.14A2.74,2.74,0,0,1,43.3,19a5.68,5.68,0,0,1-.81-3.33q0-4.44,3.19-4.44t3.19,4.44A5.68,5.68,0,0,1,48.06,19,2.74,2.74,0,0,1,45.68,20.14Zm0-.92c1.39,0,2.09-1.18,2.09-3.53A5.35,5.35,0,0,0,47.26,13a1.86,1.86,0,0,0-3.15,0,5.33,5.33,0,0,0-.52,2.65C43.59,18,44.29,19.22,45.68,19.22Z" style="fill: #312d2a" />
      </g>
    </g>
    <g id="xAxis">
      <g id="_2018" data-name="2018">
        <path d="M526.85,299v-.75l2.39-2.59c.47-.51.84-.94,1.13-1.3a5.43,5.43,0,0,0,.61-.95,1.85,1.85,0,0,0,.19-.77c0-1-.55-1.45-1.67-1.45a5,5,0,0,0-2.36.68V291a4.2,4.2,0,0,1,1.13-.5,4.9,4.9,0,0,1,1.28-.19,2.93,2.93,0,0,1,2,.62,2.18,2.18,0,0,1,.7,1.74,2.89,2.89,0,0,1-.51,1.51,15.33,15.33,0,0,1-1.66,2.06l-1.76,1.9h4V299Z" style="fill: #1d1d1b" />
        <path d="M536.63,299.16a2.78,2.78,0,0,1-2.38-1.12,5.68,5.68,0,0,1-.81-3.33c0-3,1.07-4.45,3.19-4.45s3.2,1.49,3.2,4.45A5.68,5.68,0,0,1,539,298,2.78,2.78,0,0,1,536.63,299.16Zm0-.93c1.4,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0,5.39,5.39,0,0,0-.51,2.66C534.55,297.06,535.24,298.23,536.63,298.23Z" style="fill: #1d1d1b" />
        <path d="M542.78,299V291.8l-2,.91V292l2.31-1.63h.79V299Z" style="fill: #1d1d1b" />
        <path d="M551.39,296.65a2.24,2.24,0,0,1-.8,1.84,4.1,4.1,0,0,1-4.49,0,2.27,2.27,0,0,1-.8-1.84,2.2,2.2,0,0,1,.47-1.39,2.72,2.72,0,0,1,1.28-.86,2.59,2.59,0,0,1-1.13-.79,1.83,1.83,0,0,1-.39-1.16,1.93,1.93,0,0,1,.73-1.62,4.1,4.1,0,0,1,4.17,0,1.93,1.93,0,0,1,.74,1.62,1.78,1.78,0,0,1-.4,1.16,2.53,2.53,0,0,1-1.13.79,2.72,2.72,0,0,1,1.28.86A2.15,2.15,0,0,1,551.39,296.65Zm-3-1.86c-1.33.21-2,.81-2,1.8a1.51,1.51,0,0,0,.53,1.23,2.21,2.21,0,0,0,1.47.44,2.24,2.24,0,0,0,1.47-.44,1.5,1.5,0,0,0,.52-1.23C550.34,295.6,549.67,295,548.35,294.79Zm0-.77a3,3,0,0,0,1.31-.57,1.18,1.18,0,0,0,.46-.94c0-.9-.59-1.34-1.77-1.34s-1.78.44-1.78,1.34a1.18,1.18,0,0,0,.46.94A3,3,0,0,0,548.35,294Z" style="fill: #1d1d1b" />
      </g>
      <g id="_2017" data-name="2017">
        <path d="M389.63,299v-.75l2.39-2.59c.46-.51.84-.94,1.12-1.3a5.57,5.57,0,0,0,.62-.95,1.85,1.85,0,0,0,.19-.77c0-1-.56-1.45-1.68-1.45a4.92,4.92,0,0,0-2.35.68V291a4.06,4.06,0,0,1,1.13-.5,4.9,4.9,0,0,1,1.28-.19,2.93,2.93,0,0,1,2,.62,2.18,2.18,0,0,1,.7,1.74,2.82,2.82,0,0,1-.52,1.51,14.37,14.37,0,0,1-1.65,2.06l-1.77,1.9h4V299Z" style="fill: #1d1d1b" />
        <path d="M399.41,299.16A2.76,2.76,0,0,1,397,298a5.68,5.68,0,0,1-.81-3.33c0-3,1.06-4.45,3.19-4.45s3.19,1.49,3.19,4.45a5.68,5.68,0,0,1-.81,3.33A2.76,2.76,0,0,1,399.41,299.16Zm0-.93c1.39,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0,5.38,5.38,0,0,0-.52,2.66C397.32,297.06,398,298.23,399.41,298.23Z" style="fill: #1d1d1b" />
        <path d="M405.55,299V291.8l-2,.91V292l2.3-1.63h.79V299Z" style="fill: #1d1d1b" />
        <path d="M409.43,299l3.24-7.69H409l-.35,1.36H408v-2.27h5.76v.71l-3.2,7.89Z" style="fill: #1d1d1b" />
      </g>
      <g id="_2016" data-name="2016">
        <path d="M251.85,299v-.75l2.39-2.59c.46-.51.84-.94,1.12-1.3a5.57,5.57,0,0,0,.62-.95,2,2,0,0,0,.19-.77c0-1-.56-1.45-1.68-1.45a4.92,4.92,0,0,0-2.35.68V291a4.06,4.06,0,0,1,1.13-.5,4.84,4.84,0,0,1,1.28-.19,2.93,2.93,0,0,1,2,.62,2.22,2.22,0,0,1,.7,1.74,2.91,2.91,0,0,1-.52,1.51,14.37,14.37,0,0,1-1.65,2.06l-1.77,1.9h4V299Z" style="fill: #1d1d1b" />
        <path d="M261.63,299.16a2.76,2.76,0,0,1-2.38-1.12,5.68,5.68,0,0,1-.81-3.33c0-3,1.06-4.45,3.19-4.45s3.19,1.49,3.19,4.45A5.68,5.68,0,0,1,264,298,2.76,2.76,0,0,1,261.63,299.16Zm0-.93c1.39,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0,5.27,5.27,0,0,0-.52,2.66C259.54,297.06,260.24,298.23,261.63,298.23Z" style="fill: #1d1d1b" />
        <path d="M267.77,299V291.8l-2,.91V292l2.3-1.63h.79V299Z" style="fill: #1d1d1b" />
        <path d="M273.26,299.16a2.81,2.81,0,0,1-2.14-.81,3.1,3.1,0,0,1-.78-2.24,4.09,4.09,0,0,1,.34-1.61,9.47,9.47,0,0,1,1.08-1.86l1.59-2.23h1.19l-1.77,2.47-.36.5-.29.44a2.41,2.41,0,0,1,1.63-.58,2.38,2.38,0,0,1,1.31.36,2.45,2.45,0,0,1,.88,1,3.57,3.57,0,0,1,.32,1.55,3.16,3.16,0,0,1-.38,1.56,2.61,2.61,0,0,1-1.05,1.06A3.28,3.28,0,0,1,273.26,299.16Zm-1.92-3a2.19,2.19,0,0,0,.51,1.55,1.8,1.8,0,0,0,1.42.56,1.86,1.86,0,0,0,1.43-.55,2.1,2.1,0,0,0,.53-1.5,2.35,2.35,0,0,0-.48-1.53,1.59,1.59,0,0,0-1.28-.57,2.17,2.17,0,0,0-1.23.36,2.54,2.54,0,0,0-.85,1,3.11,3.11,0,0,0,0,.32C271.34,295.89,271.34,296,271.34,296.12Z" style="fill: #1d1d1b" />
      </g>
      <g id="_2015" data-name="2015">
        <path d="M114.59,299v-.75l2.39-2.59c.46-.51.83-.94,1.12-1.3a5.57,5.57,0,0,0,.62-.95,2,2,0,0,0,.19-.77c0-1-.56-1.45-1.68-1.45a4.89,4.89,0,0,0-2.35.68V291a4,4,0,0,1,1.12-.5,4.91,4.91,0,0,1,1.29-.19,2.88,2.88,0,0,1,2,.62,2.19,2.19,0,0,1,.71,1.74,2.91,2.91,0,0,1-.52,1.51,15.12,15.12,0,0,1-1.65,2.06l-1.77,1.9h4V299Z" style="fill: #1d1d1b" />
        <path d="M124.37,299.16A2.76,2.76,0,0,1,122,298a5.68,5.68,0,0,1-.81-3.33c0-3,1.06-4.45,3.19-4.45s3.19,1.49,3.19,4.45a5.68,5.68,0,0,1-.81,3.33A2.76,2.76,0,0,1,124.37,299.16Zm0-.93c1.39,0,2.09-1.17,2.09-3.52a5.39,5.39,0,0,0-.51-2.66,1.87,1.87,0,0,0-3.15,0,5.27,5.27,0,0,0-.52,2.66C122.28,297.06,123,298.23,124.37,298.23Z" style="fill: #1d1d1b" />
        <path d="M130.51,299V291.8l-2,.91V292l2.3-1.63h.79V299Z" style="fill: #1d1d1b" />
        <path d="M133.09,298.62v-.94a4.57,4.57,0,0,0,1.12.41,5.17,5.17,0,0,0,1.19.13,2.18,2.18,0,0,0,1.54-.51,1.85,1.85,0,0,0,.54-1.4A1.71,1.71,0,0,0,137,295a1.84,1.84,0,0,0-1.33-.46,4.44,4.44,0,0,0-1,.12,3.5,3.5,0,0,0-.84.33l-.66-.51.51-4.07H138v.92h-3.6l-.33,2.7a4,4,0,0,1,.8-.29,3.55,3.55,0,0,1,.86-.1,3.23,3.23,0,0,1,1.46.32,2.39,2.39,0,0,1,1,.92,2.86,2.86,0,0,1,.35,1.43,3,3,0,0,1-.38,1.52,2.42,2.42,0,0,1-1.07,1,3.61,3.61,0,0,1-1.64.35,5.57,5.57,0,0,1-1.25-.14A3.78,3.78,0,0,1,133.09,298.62Z" style="fill: #1d1d1b" />
      </g>
    </g>
    <g id="graphMarkers">
      <line x1="58" y1="242.86" x2="608" y2="242.86" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="205.71" x2="608" y2="205.71" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="168.57" x2="608" y2="168.57" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="131.43" x2="608" y2="131.43" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="94.29" x2="608" y2="94.29" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="57.14" x2="608" y2="57.14" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
      <line x1="58" y1="20" x2="608" y2="20" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 0.5px;opacity: 0.5" />
    </g>

  </svg>

</div>
<button id="graphButton1">State 1</button>
<button id="graphButton2">State 2</button>
<button id="graphButton3">State 3</button>
<button id="graphButton4">State 4</button>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

body {
  margin: 0;
  padding: 20px;
  background-color: #0e100f;
  font-family: Mori, sans-serif;
}

#graphContainer {
  width: 640px;
  max-width: 100%;
  height: 329px;
  margin-bottom: 1rem;
}

.bar {
  fill: none;
  stroke: url(#bar-gradient);
  stroke-width: 120px;
}

#axis {
  fill: none;
  stroke: #7c7c6f;
  stroke-width: 1px;
}

#yAxis,
#xAxis {
  fill: #7c7c6f;
}

button {
  margin: 0 0.25rem 0.25rem 0;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 252, 225, 0.2);
  border-radius: 99px;
  color: #bbbaa6;
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

button:hover {
  color: #fffce1;
  border-color: rgba(255, 252, 225, 0.6);
}
```

```
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var bar3 = document.getElementById("bar3");
var bar4 = document.getElementById("bar4");

function drawBars(vals) {
  const offset = "-=0.6";
  const graphLa = gsap.timeline({
    defaults: {
      ease: "power2.inOut",
      duration: 0.7,
      overwrite: "auto"
    }
  })
  .to(bar1, { drawSVG: vals[0] })
  .to(bar2, { drawSVG: vals[1] }, offset)
  .to(bar3, { drawSVG: vals[2] }, offset)
  .to(bar4, { drawSVG: vals[3] }, offset)
}


//	State 1 Animation
document.querySelector("#graphButton1").addEventListener("click", () => drawBars(["0px 111px", "0px 126px", "0px 141px", "0px 148px"]) );
drawBars(["0px 111px", "0px 126px", "0px 141px", "0px 148px"]); // set the intial state

//	State 2 Animation
document.querySelector("#graphButton2").addEventListener("click", () => drawBars(["0px 100px", "0px 14px", "0px 185px", "0px 219px"]) );

//	State 3 Animation
document.querySelector("#graphButton3").addEventListener("click", () => drawBars(["0px 55px", "0px 74px", "0px 85px", "0px 96px"]) );

//	State 4 Animation
document.querySelector("#graphButton4").addEventListener("click", () => drawBars(["0px 11px", "0px 11px", "0px 19px", "0px 19px"]) );
```

Plugins[DrawSVGPlugin](/docs/v3/Plugins/DrawSVGPlugin.md)

If you 're animating dynamically to a new position that 's updated very frequently, you might want to consider the [gsap.quickTo()](/docs/v3/GSAP/gsap.quickTo\(\).md) method.

## Adding tweens to completed timelines[​](#adding-tweens-to-completed-timelines "Direct link to Adding tweens to completed timelines")

A common pattern of mistakes that I've seen goes like this:

```
const tl = gsap.timeline()
tl.to(myElem, { x: 100 });

myElem.addEventListener("click", () => tl.to(myElem, { x: 300 }) );
```

Did you catch the mistake? If you add new tweens to a timeline that is already completed, they won't be called unless you re-run the timeline. Almost always in these situations you should just use control methods for a previously created animation or create a new animation instead (not using an existing timeline) following the guidelines that we covered in the previous section.

## Not using loops[​](#not-using-loops "Direct link to Not using loops")

If you want to apply the same effect to multiple elements (sections, cards, buttons, etc.) when a certain event happens to each one, you should almost always use a loop.

For example, don't use a selector like `"button"` when you want it to affect just one button.

For example, if you wanted to fire [an effect](/docs/v3/GSAP/gsap.effects.md) when each button is clicked:

```
// BAD: immediately animates ALL buttons at once!
gsap.effects.explode("button", { direction: "up", duration: 3 });

// GOOD: animation is specific to each button, and only when clicked
gsap.utils.toArray("button").forEach(btn => {
  btn.addEventListener("click", () => gsap.effects.explode(btn, { direction: "up", duration: 3 }))
});
```

Inside of this loop, you can use a selector that is scoped to the given element so that you 're only getting things INSIDE that element. For example:

```
gsap.utils.toArray(".container").forEach(container => {
  let info = container.querySelector(".information"),
      silhouette = container.querySelector(".silhouette .cover"),
      tl = gsap.timeline({ paused: true });
  
  tl.to(info, { yPercent: 0 })
    .to(silhouette, { opacity: 0 }, 0);
  
  container.addEventListener("mouseenter", () => tl.play() );
  container.addEventListener("mouseleave", () => tl.reverse() );
});
```

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

## Importing GSAP incorrectly[​](#importing-gsap-incorrectly "Direct link to Importing GSAP incorrectly")

A common issue people face when using GSAP in a module environment is importing GSAP or its plugins incorrectly. Most of the time import errors error can be avoided by thoroughly reading the relevant parts of [the installation page](/docs/v3/Installation). I won 't copy all of the details into this post, but be sure to make use of that page if you 're facing any sort of import error. It even has a very handy GSAP install helper tool that can generate the correct import code to use in most environments.

## Using CSS transitions and GSAP on the same properties[​](#using-css-transitions-and-gsap-on-the-same-properties "Direct link to Using CSS transitions and GSAP on the same properties")

You should **definitely avoid** having CSS transitions applied to elements that you 're animating with GSAP. That 's terrible for performance because the browser would constantly be interrupting things. For example, let 's say you animate width to 500px from 100px. On every single tick (requestAnimationFrame), GSAP would set the interpolated value but the CSS transition would basically say *"NOPE! I won 't let you do that yet...I 'm gonna transition to that new value over the course of \_\_\_\_ seconds..."* and it 'd start interpolating. But on the very next tick, GSAP would set a new value and CSS transitions would interrupt and start over again, going to that new value. Over and over and over.

That would not only add a bunch of stress to the browser, but it 'd slow things down regarding the overall timing of the animation. For example, if the GSAP tween has a duration of 1 second and the CSS transition is also set to 1 second, that means it 'd stop moving after TWO seconds!

## Using old/verbose syntax[​](#using-oldverbose-syntax "Direct link to Using old/verbose syntax")

### Drop the Lite/Max[​](#drop-the-litemax "Direct link to Drop the Lite/Max")

I regularly see people using the old syntax even though they are loading [GSAP 3](https://gsap.com/blog/3-release-notes). Old habits die hard. Even though the old syntax still technically works, the new modern GSAP 3 syntax is sleeker and simpler. Plus the old syntax won 't be supported in GSAP 4 (which is ***far*** off in the future, but it 's still a good idea to write future-friendly code).

For example instead of using something that has Lite/Max in it, just use `gsap`:

```
// old
TweenLite.to()
TweenMax.from()
new TimelineMax()

// new
gsap.to()
gsap.from()
gsap.timeline()
```

### Use the string form for eases[​](#use-the-string-form-for-eases "Direct link to Use the string form for eases")

The shorter string form of eases requires less typing and lets you avoid extra import statements in module environments.

```
// old
Power2.easeOut
Sine.easeInOut

// new
"power2" // The default is .out
"sine.inOut"
```

### Duration belongs in the vars parameter[​](#duration-belongs-in-the-vars-parameter "Direct link to Duration belongs in the vars parameter")

Putting the duration inside of the vars parameter does require a bit more typing, but it makes things more readable and intuitive. GSAP's [defaults](/3-release-notes#defaults) and [effects](/docs/v3/GSAP/gsap.effects.md) are very helpful but you can't make use of them if you're putting the duration as the second parameter.

```
// old
gsap.to(elem, 1, { x: 100 });

// new
gsap.to(elem, { duration: 1, x: 100});

// using GSAP's defaults:
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.to(elem, { x: 100 }); // no duration necessary!
tl.to(elem, { y: 100, duration: 3 }); // easily overwrite the default value
```

For a more full listing of changes in GSAP 3, check out the [GSAP 3 Migration Guide](/resources/3-migration.md).

### Numerical values don't usually need to be strings[​](#numerical-values-dont-usually-need-to-be-strings "Direct link to Numerical values don't usually need to be strings")

For example if you want to set the x transform to 100 pixels, you don't need to say `x: "100px"`, you can just say `x: 100`. Simple!

The only time when you need to pass numerical values as strings are if you need to change the unit (like `x: "10vw"`) or pass in a complex value (like `transformOrigin: "0px 50px"`).

### The target of a tween can be a selector string[​](#the-target-of-a-tween-can-be-a-selector-string "Direct link to The target of a tween can be a selector string")

I often see people do something like this:

```
gsap.to(document.querySelectorAll(".box"), { x: 100 });
```

That will work but could be simplified by passing a selector string in as the target; GSAP will automatically use `.querySelectorAll()` to get a list of all of the elements that match. So the above can be written simple as

```
gsap.to(".box", { x: 100 });
```

You could also pass in a complex selector string like `".box, .card"` and it will select all boxes and cards. Or use an Array of elements so long as they are of the same type (selector string, variable reference, generic object, etc.).

## Conclusion[​](#conclusion "Direct link to Conclusion")

So how 'd you do? Is your GSAP code clear of these common mistakes? Hopefully you learned a few things. As always, if you need any help, the [GSAP Forums](https://gsap.com/community/) are a fantastic resource. We love to help people develop their animation superpowers.

If you 're looking for another great learning resource, read [how to animate efficiently](https://css-tricks.com/tips-for-writing-animation-code-efficiently/)!

Now go forth and tween responsibly!
