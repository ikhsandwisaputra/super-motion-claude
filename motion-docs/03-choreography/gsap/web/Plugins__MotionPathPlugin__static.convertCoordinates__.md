---
source: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates()
title: "MotionPathPlugin.convertCoordinates"
fetched: 2026-10-28
---

# MotionPathPlugin.convertCoordinates

### MotionPathPlugin.convertCoordinates( fromElement:Element | window, toElement:Element | window, point:Object ) : Object (point or Matrix2D)

Converts a point from one element's local coordinates into where that point lines up in a different element's local coordinate system regardless of how many nested transforms are affecting the elements!

#### Parameters

* #### **fromElement**: Element | window

  The element whose local coordinates serve as the **input**. The `point` (3rd parameter) is defined according to this element's local coordinates.

* #### **toElement**: Element | window

  The element whose local coordinates serve as the **output**. In other words, the `point` will be converted into this element's local coordinate system. This should be an element reference (like myElem), not a selector string

* #### **point**: Object

  \[optional] An object with x and y properties like `{x:100, y:200}` that define the local coordinates in the `fromElement` that should be converted into the `toElement`'s local coordinates.

### Returns : Object (point or Matrix2D)[​](#returns--object-point-or-matrix2d "Direct link to Returns : Object (point or Matrix2D)")

If a `point` parameter is provided, it will be converted and a new point is returned like `{x: 100, y: 200}` representing the converted coordinates in the `toElement`. If no `point` is provided, a **Matrix2D** object is returned so that you can use it to quickly convert ANY coordinates using its `apply()` method.

### Details[​](#details "Direct link to Details")

Converts a point from one element's local coordinates into where that point lines up in a different element's local coordinate system regardless of how many nested transforms are affecting the elements! For example, if an element is rotated and scaled inside a transformed container and the user clicks on it, you could convert the event's pageX and pageY coordinates into where that is in that nested element's coordinate system.

## Sample code[​](#sample-code "Direct link to Sample code")

```
let fromElement = document.querySelector("#from"),
  toElement = document.querySelector("#to"),
  point = { x: 100, y: 0 },
  convertedPoint = MotionPathPlugin.convertCoordinates(
    fromElement,
    toElement,
    point
  );

// or if you want to convert multiple points, don't pass one to the function and it'll return a Matrix2D
let matrix = MotionPathPlugin.convertCoordinates(fromElement, toElement), // no point parameter!
  p1 = matrix.apply({ x: 100, y: 0 }),
  p2 = matrix.apply({ x: 0, y: 200 }),
  p3 = matrix.apply({ x: 50, y: 50 });
```

## Video[​](#video "Direct link to Video")

## Demo[​](#demo "Direct link to Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/GRJEGzB)

```
<h1>GSAP 3 convertCoordinates()</h1>
<p>The #orangeArm is being rotated and then inside of an onUpdate, <a href="https://greensock.com/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates()">MotionPathPlugin.convertCoordinates()</a> is used to map where the tip of the arm is located in the coordinate system of the #kolben element so that the tip of the #greenArm can be positioned there dynamically...in a totally different container element.</p>
<svg stroke-linecap="round" stroke-linejoin="round" viewBox="40 50 180 42">
  <defs>
    <linearGradient id="macha" gradientUnits="userSpaceOnUse" x1="54" y1="71" x2="194.5" y2="71">
      <stop offset="20.74%" style="stop-color: var(--color-shockingly-green, #0ae448)" />
      <stop offset="65.5%" style="stop-color: var(--color-lt-green, #abff84)" />
    </linearGradient>
  </defs>

  <path fill="none" stroke="#444" stroke-width="2" d="M150 89h54l.133-36h-54"/>
  <circle id="wheelPath" cx="71" cy="71" r="17.5"/>

  <polyline id="orangeArm" fill="none" stroke-width="4"  points="71 71 88.5 71" />

  <g id="kolben">
    <path fill="none" stroke="#444" stroke-width="2" d="M186.211 54.511h15.964v33.184h-15.964z"/>
    <line id="greenArm" fill="none" stroke-width="4" x1="88.5" y1="71" x2="194.5" y2="71"  />
    <circle class="joint" cx="194.193" cy="71" r="1"/>
    <circle id="joint" class="joint" cx="88.5" cy="71" r="1"/>
  </g>
</svg>
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
body {
  font-weight: 300;
  text-align: center;
  padding: 5px 15px;
  font-size: 18px;
}

p {
  font-weight: 300;
  max-width: 900px;
  display: inline-block;
  text-align: left;
  margin-top: 1px;
}

.joint, #wheelPath {
  stroke: black;
  fill: none;
  vector-effect: non-scaling-stroke;
}

#wheelPath {
  stroke: var(--color-orangey);   /* was red */
  stroke-width: 4px;
  stroke-dasharray: 12px 12px;
}

#orangeArm { stroke: var(--color-orangey); }   /* was red */
#greenArm  { stroke: url(#macha); }            /* was blue */
```

```
gsap.registerPlugin(MotionPathPlugin);

var orangeArm = document.querySelector("#orangeArm"),
    greenArm = document.querySelector("#greenArm"),
    joint = document.querySelector("#joint"),
    kolben = document.querySelector("#kolben"),
    duration = 5,
    radius = 17.5,

    // local coordinates in the orangeArm that'll be the joint. It's 17.5px wide so the right tip is at {x: 17.5, y: 0}
    armTip = { x: radius, y: 0 };

var tl = gsap.timeline({ onUpdate: onUpdate, repeat: -1 })
  .to(orangeArm, {
    duration: duration,
    rotation: 360,
    ease: "none"
  }, 0)
  .to(kolben, {
    duration: duration / 2,
    x: -radius * 2,
    ease: "sine.inOut",
    repeat: 1,
    yoyo: true
  }, 0);

function onUpdate() {
  // convert from orangeArm's local coordinates {x: 17.5, y: 0} into where that exact point would be in kolben's local coordinates.
  var p = MotionPathPlugin.convertCoordinates(orangeArm, kolben, armTip);
  greenArm.setAttribute("x1", p.x);
  greenArm.setAttribute("y1", p.y);
  joint.setAttribute("cx", p.x);
  joint.setAttribute("cy", p.y);
}
```

Plugins[MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)
