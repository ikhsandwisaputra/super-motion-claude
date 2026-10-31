---
source: https://gsap.com/docs/v3/Eases/CustomBounce
title: "CustomBounce"
fetched: 2026-10-28
---

# CustomBounce

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(CustomEase, CustomBounce) 
```

#### Minimal usage

```
//Create a custom bounce ease:
CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});

//do the bounce by affecting the "y" property.
gsap.from(".class", { duration: 2, y: -200, ease: "myBounce" });

//and do the squash/stretch at the same time:
gsap.to(".class", {
  duration: 2,
  scaleX: 1.4,
  scaleY: 0.6,
  ease: "myBounce-squash",
  transformOrigin: "center bottom",
});
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/pRowwX)

```
<section>
<svg viewBox="0 0 700 700">
  <defs>
    <!-- Ball: angle follows the 114.41deg CSS gradient, stops at 20.74% / 65.5% -->
    <linearGradient id="macha-ball" x1="0.045" y1="0.293" x2="0.955" y2="0.707">
      <stop offset="20.74%" style="stop-color: var(--color-shockingly-green, #0ae448)" />
      <stop offset="65.5%" style="stop-color: var(--color-lt-green, #abff84)" />
    </linearGradient>

    <!-- Line: userSpaceOnUse because a flat line has no height for a bounding-box gradient -->
    <linearGradient id="macha-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="700" y2="0">
      <stop offset="20.74%" style="stop-color: var(--color-shockingly-green, #0ae448)" />
      <stop offset="65.5%" style="stop-color: var(--color-lt-green, #abff84)" />
    </linearGradient>
  </defs>

  <line x1="0" x2="700" y1="701" y2="701" stroke="url(#macha-line)" stroke-width="2" />
  <path id="bounce" fill="none" stroke="#fffce1" stroke-width="4px" />
  <path id="squash" fill="none" stroke="#abff84" stroke-width="4px" />
  <circle id="ball" fill="url(#macha-ball)" r="75" cx="350" cy="75" />
</svg>
<nav id="nav">
  <input id="progressSlider" type="range" min="0" max="1" value="0" step="0.001" />
  <button id="play">play</button>
</nav>
</section>
```

```
/* GSAP brand: fonts, type sizes, colour vars, buttons and form controls.
   Element selectors only, so a demo's own class-based styles still win. */

body{display:flex;align-items:center;justify-content:center;min-height:100vh;}

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

body {
  background-color: #0e100f;
  accent-color:#0ae448;
}
svg {
  width:400px;
  position:relative;
  display:block;
  left: 50%;
  z-index: -1;
  overflow: visible;
  transform: translate(-50%, 0%);
}

#progressSlider {
  display:inline-block;
  position:relative;
  width:300px;
}

#nav {
  width:600px;
  margin:10px auto;
  text-align:center;
}
```

```
//learn more about CustomBounce and CustomWiggle at: https://greensock.com/wiggle-bounce

var duration = 3;
var tl = gsap.timeline({delay:0.2, onUpdate:updateUI});

//strength between 0 and 1
CustomBounce.create("myBounce", {strength:0.7, squash:3});
tl.to("#ball", {y:550, duration: duration, ease:"myBounce"})
  .to("#ball", {scaleY:0.5, duration: duration, scaleX:1.3, ease:"myBounce-squash", transformOrigin:"bottom"}, 0)




//graph the lines...
//bounce ease green
CustomEase.getSVGData("myBounce", {path:"#bounce", width:700, height:500});
//squash ease red
CustomEase.getSVGData("myBounce-squash", {path:"#squash", width:700, height:500});

progressSlider = document.getElementById("progressSlider");

progressSlider.addEventListener("input", updateAnimation);

function updateAnimation(){
  tl.progress(progressSlider.value).pause();
 
}

function updateUI() {
  progressSlider.value = tl.progress();
}

document.getElementById("play").onclick = function() {
  if(tl.progress() == 1) {
    tl.restart()
  } else {
    tl.play();
  }
}
```

Plugins[CustomEase](/docs/v3/Eases/CustomEase.md)[CustomBounce](/docs/v3/Eases/CustomBounce.md)

### Description[​](#description "Direct link to Description")

GSAP always has the tried-and-true `"bounce"` ease, but there is no built-in way to customize how "bouncy" it is, nor could you easily get a synchronized squash and stretch effect during the bounce because:

* The "bounce" ease needs to stick to the ground momentarily at the point of the bounce while the squashing occurs. `"bounce"` offers no such customization.
* There was no way to create the corresponding \[synchronized] scaleX/scaleY ease for the squashing/stretching. [CustomEase](/docs/v3/Eases/CustomEase.md) solves this now, but it'd still be very difficult to manually draw that ease with all the points lined up in the right spots to match up with the bounces.

With CustomBounce, you can set a few parameters and it'll create **BOTH** CustomEases for you (one for the bounce, and one \[optionally] for the squash/stretch). Think of CustomBounce like a wrapper that creates a CustomEase under the hood based on the variables you pass in.

CustomBounce extends [CustomEase](/docs/v3/Eases/CustomEase.md) (which you must include in your project) and it lets you set the bounce and (optionally) a squash and stretch.

Ease walkthrough

[YouTube video player](https://www.youtube.com/embed/iO8J_CiH1fk)

### Options[​](#options "Direct link to Options")

* ### Property

  ### Description

  #### strength[](#strength)

  Number - A number between 0 and 1 that determines how “bouncy” the ease is, so 0.9 will have a lot more bounces than 0.3. Default: `0.7`.

* #### endAtStart[](#endAtStart)

  Boolean - If `true`, the ease will end back where it started, allowing you to get an effect like an object sitting on the ground, leaping into the air, and bouncing back down to a stop. Default: `false`.

* #### squash[](#squash)

  Number - Controls how long the squash should last (the gap between bounces, when it appears “stuck”). Typically 2 is a good number, but 4 (as an example) would make the squash longer in relation to the rest of the ease. Default: `0`.

* #### squashID[](#squashID)

  String - The ID that should be assigned to the squash ease. The default is whatever the ID of the bounce is plus “-squash” appended to the end. For example, `CustomBounce.create("hop", {strength: 0.6, squash: 2})` would default to a squash ease ID of `"hop-squash"`.

How do you get the bounce and the squash and stretch to work together? You'd use two tweens; one for the position (`y`), and the other for the `scaleX` and `scaleY`, with both running at the same time:

```
gsap.registerPlugin(CustomEase, CustomBounce); // register

//Create a custom bounce ease:
CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});

//do the bounce by affecting the "y" property.
gsap.from(".class", { duration: 2, y: -200, ease: "myBounce" });

//and do the squash/stretch at the same time:
gsap.to(".class", {
  duration: 2,
  scaleX: 1.4,
  scaleY: 0.6,
  ease: "myBounce-squash",
  transformOrigin: "center bottom",
});
```

### .getSVGData()[​](#getsvgdata "Direct link to .getSVGData()")

CustomBounce also shares CustomEase's method that calculates the SVG `<path>` data string for visualizing any ease graphically at any size that you define, like `{width: 500, height: 400, x: 10, y: 50}`. You can supply a CustomEase or the ID associated with one, or even a standard ease like `Power2.easeOut`. Feed in a `path` in the vars object and it'll populate its `d` attribute for you, like:

```
//create a CustomEase with an ID of "hop"
CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});

//draw the ease visually in the SVG  that has an ID of "ease" at 500px by 400px:
CustomEase.getSVGData("myBounce", { width: 500, height: 400, path: "#ease" });
```

### String format[​](#string-format "Direct link to String format")

You can also use GSAP's condensed string formatting for eases, like:

```
ease: "bounce(0.5)"; //<-- easy!
ease: "bounce({strength:0.5, endAtStart:true})"; //advanced
```

### **Demos**[​](#demos "Direct link to demos")

[CustomBounce demos](https://codepen.io/collection/DqaLzb)
