---
source: https://gsap.com/docs/v3/Eases/CustomWiggle
title: "CustomWiggle"
fetched: 2026-10-28
---

# CustomWiggle

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(CustomEase, CustomWiggle) 
```

#### Minimal usage

```
//Create a wiggle with 6 oscillations (default type:"easeOut")
CustomWiggle.create("myWiggle", {wiggles: 6});

//now use it in an ease. "rotation" will wiggle to 30 and back just as much in the opposite direction, ending where it began.
gsap.to(".class", {duration: 2, rotation: 30, ease: "myWiggle"});
```

### Description[​](#description "Direct link to Description")

CustomWiggle extends [CustomEase](/docs/v3/Eases/CustomEase.md) (which you must include in your project as well), and it lets you set a wiggle amount and type.

Ease walkthrough

[YouTube video player](https://www.youtube.com/embed/5lk5sLTd6N4)

### Demo[​](#demo "Direct link to Demo")

CustomWiggle Types

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ebdbdadcd678a211681b4aa66cb58c4f)

```
<link href='https://fonts.googleapis.com/css?family=Signika+Negative:300,400,700' rel='stylesheet' type='text/css'>
<h3>CustomWiggle built-in types</h3>

<div class="group">
  <code>"easeOut"</code>
  <div class="box" id="easeOut"><svg viewBox="0 0 250 150">
      <path id="easeOutSVG"></path>
    </svg></div>
  <div class="ball" id="easeOutBall"></div>
</div>

<div class="group">
  <code>"easeInOut"</code>
  <div class="box" id="easeInOut"><svg viewBox="0 0 250 150">
      <path id="easeInOutSVG"></path>
    </svg></div>
  <div class="ball" id="easeInOutBall"></div>
</div>

<div class="group">
  <code>"anticipate"</code>
  <div class="box" id="anticipate"><svg viewBox="0 0 250 150">
      <path id="anticipateSVG"></path>
    </svg></div>
  <div class="ball" id="anticipateBall"></div>
</div>

<div class="group">
  <code>"uniform"</code>
  <div class="box" id="uniform"><svg viewBox="0 0 250 150">
      <path id="uniformSVG"></path>
    </svg></div>
  <div class="ball" id="uniformBall"></div>
</div>

<div class="group">
  <code>"random"</code>
  <div class="box" id="random"><svg viewBox="0 0 250 150">
      <path id="randomSVG"></path>
    </svg></div>
  <div class="ball" id="randomBall"></div>
</div>

<p>Click on any box to trigger that animation.</p>
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
  margin:0;
  padding:0;
  overflow:hidden;
  line-height: 1em;
  padding: 20px;
  text-align: center;
}
svg {
  
  position:absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.ball {
  width: 40px;
  height: 40px; 
  margin: 50px 0 30px 0;
  border-radius: 50%;
  background: var(--gradient-macha);
  display: inline-block;
}
.group {
  display: inline-block;
  text-align: center;
  position: relative;
  margin-right: 0px;
  margin-top: 20px;
  cursor: pointer;
}
path {
  stroke-width: 3px;
  stroke: white;
  fill: none;
  opacity: 0.7;
}
.box {
  width: 150px;
  height:90px;
  background-color: var(--color-grey);
  color: var(--color-shockingly-green);
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  line-height: 90px;
  position: relative;
  transform: translate3d(0,0,0);
  user-select: none;
  -webkit-user-select: none;
}
h1, strong {
  font-weight: 400;
}
a:link, a:visited {
  color:#90E500;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

code {
  display: inline-block;
  font-size: 0.8rem;
  padding-bottom: 1rem;
}
```

```
gsap.registerPlugin(CustomEase, CustomWiggle);

var wiggles = 10; //tweak this to whatever number you want. 

//create the custom eases..
CustomWiggle.create("Wiggle.easeOut", {wiggles:wiggles, type:"easeOut"});
CustomWiggle.create("Wiggle.easeInOut", {wiggles:wiggles, type:"easeInOut"});
CustomWiggle.create("Wiggle.anticipate", {wiggles:wiggles, type:"anticipate"});
CustomWiggle.create("Wiggle.uniform", {wiggles:wiggles, type:"uniform"});
CustomWiggle.create("Wiggle.random", {wiggles:wiggles, type:"random"});


//now set up a master timeline that repeats 50 times...
var tl = gsap.timeline({repeat:50, repeatDelay:1, delay:1});
tl.add(wiggle("easeOut", 2))
  .add(wiggle("easeInOut", 2), "+=0.5")
  .add(wiggle("anticipate", 3), "+=0.5")
  .add(wiggle("uniform", 2), "+=0.5")
  .add(wiggle("random", 6), "+=0.5");


//for convenience, let the user click any of the boxes to trigger animation (which should pause the main timeline)
setupClick("easeOut", 2);
setupClick("easeInOut", 2);
setupClick("anticipate", 3);
setupClick("uniform", 2);
setupClick("random", 6);

//just a helper function for wiggling the box and ball for a particular ID, like "easeOut"
function wiggle(id, duration) {
  var tl = gsap.timeline();
    tl.to("#" + id + "Ball", {duration:duration, x:100, ease:"Wiggle." + id});
  return tl;
}

//a helper function for setting up the click behavior for each box according to ID 
function setupClick(id, duration) {
  var animation = wiggle(id, duration).pause();
  	document.querySelector("#" + id).addEventListener("click", function() {
			tl.pause(0);
			animation.play(0);
		});
}

//NOTE: if you want to start in the opposite direction, just set invert:true in the CustomWiggle.create() vars. 

//graph them
CustomEase.getSVGData("Wiggle.easeOut", {width:248, height:73, x:1, y:2, path:"#easeOutSVG"});
CustomEase.getSVGData("Wiggle.easeInOut", {width:248, height:73, x:1, y:2, path:"#easeInOutSVG"});
CustomEase.getSVGData("Wiggle.anticipate", {width:248, height:73, x:1, y:2, path:"#anticipateSVG"});
CustomEase.getSVGData("Wiggle.uniform", {width:248, height:73, x:1, y:2, path:"#uniformSVG"});
CustomEase.getSVGData("Wiggle.random", {width:248, height:73, x:1, y:2, path:"#randomSVG"});
```

Plugins[CustomEase](/docs/v3/Eases/CustomEase.md)[CustomWiggle](/docs/v3/Eases/CustomWiggle.md)

### Config Object[​](#config-object "Direct link to Config Object")

* ### Property

  ### Description

  #### wiggles[](#wiggles)

  Integer - The number of oscillations back and forth. Default: 10.

* #### type[](#type)

  String (“easeOut” | “easeInOut” | “anticipate” | “uniform” | “random”) - The type (or style) of wiggle (see demo above). Default: “easeOut”.

* #### amplitudeEase[](#amplitudeEase)

  Ease Provides advanced control over the shape of the amplitude (y-axis in the [ease visualizer](/ease-visualizer/)). You define an ease that controls the amplitude’s progress from 1 toward 0 over the course of the tween. Defining an amplitudeEase (or timingEase) will override the “type” (think of the 5 “types” as convenient presets for amplitudeEase and timingEase combinations). See the [example CodePen](//codepen.io/GreenSock/pen/a8a7bc33cf80a74165dd966244a6cc00?editors=0010) to play around and visualize how it works.

* #### timingEase[](#timingEase)

  Ease Provides advanced control over how the waves are plotted over time (x-axis in the [ease visualizer](/ease-visualizer/)). Defining an timingEase (or amplitudeEase) will override the “type” (think of the 5 “types” as convenient presets for amplitudeEase and timingEase combinations). See the [example CodePen](//codepen.io/GreenSock/pen/a8a7bc33cf80a74165dd966244a6cc00?editors=0010) to play around and visualize how it works.

How do you control the strength of the wiggle (or how far it goes)? Simply by setting the tween property values themselves. For example, a wiggle to `rotation:30` would be stronger than `rotation:10`. Remember that an ease just controls the ratio of movement toward whatever value you supply for each property in your tween.

### Sample code[​](#sample-code "Direct link to Sample code")

```
gsap.registerPlugin(CustomEase, CustomWiggle); // register

//Create a wiggle with 6 oscillations (default type:"easeOut")
CustomWiggle.create("myWiggle", {wiggles: 6});

//now use it in an ease. "rotation" will wiggle to 30 and back just as much in the opposite direction, ending where it began.
gsap.to(".class", {duration: 2, rotation: 30, ease: "myWiggle"});

//Create a 10-wiggle anticipation ease:
CustomWiggle.create("funWiggle", {wiggles: 10, type: "anticipate"});
gsap.to(".class", {duration: 2, rotation: 30, ease: "funWiggle"});

//Alternatively, make sure CustomWiggle is loaded and use GSAP's string ease format
ease: "wiggle(15)" //<-- easy!
ease: "wiggle({type:anticipate, wiggles:8})" //advanced
```

Wiggling isn't just for "rotation"; you can use it for any property. For example, you could create a swarm effect by using just 2 randomized wiggle tweens on "x" and "y", as [demonstrated here](https://codepen.io/GreenSock/pen/wzkBYZ).

### Demo collection[​](#demo-collection "Direct link to Demo collection")

* [CustomWiggle demos](https://codepen.io/collection/AxZmqK)
