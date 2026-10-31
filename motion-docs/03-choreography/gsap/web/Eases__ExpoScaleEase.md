---
source: https://gsap.com/docs/v3/Eases/ExpoScaleEase
title: "ExpoScaleEase"
fetched: 2026-10-28
---

# ExpoScaleEase

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(EasePack) 
```

#### Minimal usage

```
// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap.to("#image", { duration: 1, scale: 2, ease: "expoScale(1, 2)" });
```

Not included in the Core

This ease is in the EasePack file. To learn how to include this in your project, see [the Installation page](/docs/v3/Installation).

### Description[​](#description "Direct link to Description")

There's an interesting phenomena that occurs when you animate an object's `scale` that makes it appear to change speed **even with a linear ease**; `ExpoScaleEase` compensates for this effect by bending the easing curve accordingly. This is the secret sauce for silky-smooth zooming/scaling animations.

### Video Explanation[​](#video-explanation "Direct link to Video Explanation")

Walkthrough

[YouTube video player](https://www.youtube.com/embed/rwdlO3uIlwk)

### Configuration[​](#configuration "Direct link to Configuration")

In order for ExpoScaleEase to create the correct easing curve, you must pass in the **starting** and **ending** scale values in the string, like:

```
// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap.to("#image", { duration: 1, scale: 2, ease: "expoScale(1, 2)" });
```

It can also accept a 3rd parameter, the ease that you'd like it to bend (the default is `"none"`). So, for example, if you'd like to use `"power2.inOut"`, your code would look like:

```
//scale from 0.5 to 3 using "power2.inOut" ...
gsap.fromTo(
  "#image",
  { scale: 0.5 },
  { duration: 1, scale: 3, ease: "expoScale(0.5, 3, power2.inOut)" }
);
```

**Note:** The scale values passed into the `config()` method **must be non-zero** because the math wouldn't work with 0. You're welcome to use a small value like 0.01 instead. Using a *SUPER* small number like 0.00000001 may not be ideal because a large portion of the tween would be used going through the very small values.

### Simple Demo[​](#simple-demo "Direct link to Simple Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/6239c068e182bdb8ff18926f519f8565)

```
<div id="container">
  <div id="expo">
    <img src="/demo-assets/106114/zoom-15.jpg" />
    <div class="label">ExpoScaleEase</div>
  </div>


  <div id="linear">
    <img src="/demo-assets/106114/zoom-15.jpg" />
    <div class="label">Linear easing</div>
</div>

<link href='//fonts.googleapis.com/css?family=Signika+Negative:300,400' rel='stylesheet' type='text/css'>
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
  margin: 0;
  padding: 0;
  background-color: black;
}
#expo {
  /*display: none;*/
}
#container {
  display: flex;
  min-height: 100vh;
}
#expo, #linear {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  color: white;
  font-size: 3em;
}
#linear {
  border-left: 2px solid white;
}
img {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
}
.label {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%);
  padding:10px;
  text-align: center;
  font-size: 1rem;
  margin: 0 auto;
  background-color: var(--color-just-black);
  display: inline-block;
  padding: 0.5rem;
  border-radius: 10px;
}
```

```
gsap.set("img", {yPercent:-50, xPercent:-50, top:"50%", left:"50%", minWidth:"100%", position:"absolute"});

//linear easing doesn't APPEAR linear (visually).
gsap.fromTo("#linear img", {scale:0.1}, {scale:8, duration: 10, ease: "none", repeat: -1});

//notice how we feed in the starting and ending [scale] values to "expoScale()" so that it can adjust its curve accordingly so that scaling appears linear visually even though technically the scale values aren't animating linearly at all. 
gsap.fromTo("#expo img", {scale:0.1}, {scale:8, duration: 10, ease: "expoScale(0.1, 8)", repeat: -1});

//for a more complicated example that shows multi-step zooming 
//(swapping new images for better resolution as it progresses), 
//see https://codepen.io/GreenSock/pen/0cfddbdd3f1954a5cc813994d7b502ac
```

Plugins[EasePack](/docs/v3/Eases/CustomWiggle.md)

### Complex Demo[​](#complex-demo "Direct link to Complex Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/qBBBxaL)

```
<div id="container">
  <div id="expo">
    <img src="/demo-assets/106114/zoom-1.jpg" />
    <img src="/demo-assets/106114/zoom-2.jpg" />
    <img src="/demo-assets/106114/zoom-3.jpg" />
    <img src="/demo-assets/106114/zoom-4.jpg" />
    <img src="/demo-assets/106114/zoom-5.jpg" />
    <img src="/demo-assets/106114/zoom-6.jpg" />
    <img src="/demo-assets/106114/zoom-7.jpg" />
    <img src="/demo-assets/106114/zoom-8.jpg" />
    <img src="/demo-assets/106114/zoom-9.jpg" />
    <img src="/demo-assets/106114/zoom-10.jpg" />
    <img src="/demo-assets/106114/zoom-11.jpg" />
    <img src="/demo-assets/106114/zoom-12.jpg" />
    <img src="/demo-assets/106114/zoom-13.jpg" />
    <img src="/demo-assets/106114/zoom-14.jpg" />
    <img src="/demo-assets/106114/zoom-15.jpg" />
    <img src="/demo-assets/106114/zoom-16.jpg" />
    <img src="/demo-assets/106114/zoom-17.jpg" />
    <img src="/demo-assets/106114/zoom-18.jpg" />
    <img src="/demo-assets/106114/zoom-19.jpg" />
    <img src="/demo-assets/106114/zoom-20.jpg" />
    <img src="/demo-assets/106114/zoom-21.jpg" />
    <img src="/demo-assets/106114/zoom-22.jpg" />
    <div class="label">ExpoScaleEase</div>
  </div>


  <div id="linear">
    <img src="/demo-assets/106114/zoom-1.jpg" />
    <img src="/demo-assets/106114/zoom-2.jpg" />
    <img src="/demo-assets/106114/zoom-3.jpg" />
    <img src="/demo-assets/106114/zoom-4.jpg" />
    <img src="/demo-assets/106114/zoom-5.jpg" />
    <img src="/demo-assets/106114/zoom-6.jpg" />
    <img src="/demo-assets/106114/zoom-7.jpg" />
    <img src="/demo-assets/106114/zoom-8.jpg" />
    <img src="/demo-assets/106114/zoom-9.jpg" />
    <img src="/demo-assets/106114/zoom-10.jpg" />
    <img src="/demo-assets/106114/zoom-11.jpg" />
    <img src="/demo-assets/106114/zoom-12.jpg" />
    <img src="/demo-assets/106114/zoom-13.jpg" />
    <img src="/demo-assets/106114/zoom-14.jpg" />
    <img src="/demo-assets/106114/zoom-15.jpg" />
    <img src="/demo-assets/106114/zoom-16.jpg" />
    <img src="/demo-assets/106114/zoom-17.jpg" />
    <img src="/demo-assets/106114/zoom-18.jpg" />
    <img src="/demo-assets/106114/zoom-19.jpg" />
    <img src="/demo-assets/106114/zoom-20.jpg" />
    <img src="/demo-assets/106114/zoom-21.jpg" />
    <img src="/demo-assets/106114/zoom-22.jpg" />
    <div class="label">Linear easing</div>
</div>

<link href='//fonts.googleapis.com/css?family=Signika+Negative:300,400' rel='stylesheet' type='text/css'>
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
  margin: 0;
  padding: 0;
}
#container {
  display: flex;
  min-height: 100vh;
}
#expo, #linear {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  color: white;
  font-size: 3em;
}
#linear {
  border-left: 2px solid black;
}
#expo {
  /*display: none;*/
}
img {
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
}
.label {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%);
  padding:10px;
  text-align: center;
  font-size: 1rem;
  margin: 0 auto;
  background-color: var(--color-just-black);
  display: inline-block;
  padding: 0.5rem;
  border-radius: 10px;
}
```

```
//Get all the details on ExpoScaleEase here: https://greensock.com/docs/v3/Eases/ExpoScaleEase
gsap.set("img", {yPercent:-50, xPercent:-50, top:"50%", left:"50%", minWidth:"100%", position:"absolute"});

zoom({
  elements:"#expo img",
  repeat:-1,
  fade:0.7,
  duration:20, 
  direction:"in",
  useExpoEase:true
})
  //.pause();

zoom({
  elements:"#linear img",
  repeat:-1,
  fade:0,
  //to better see what's happening (flipping between images), uncomment the next two lines...
  //startScale:0.25,
  //endScale:0.5,
  duration:20, 
  direction:"in",
  useExpoEase:false
});


function zoom(config) {
  var elements = gsap.utils.toArray(config.elements),
      tl = gsap.timeline({repeat:config.repeat || 0}),
      duration = 1,
      fade = Math.min(0.99, (typeof(config.fade) === "number") ? config.fade : 0.5) * duration,
      startScale = config.startScale || 1,
      endScale = config.endScale || 2,
      scaleDifference = endScale - startScale,
      extendedScale = endScale + scaleDifference * 2,
      templateEase = config.ease || "none",
      useExpoEase = (config.useExpoEase !== false),
      ease = useExpoEase ? `expoScale(${startScale}, ${endScale}, ${templateEase})` : "none",
      extendedEase = useExpoEase ? ExpoScaleEase.config(endScale, extendedScale, templateEase) : gsap.parseEase("none"),
      partialScale = endScale + extendedEase(fade / duration) * (extendedScale - endScale),
      partialEase = useExpoEase ? `expoScale(${endScale}, ${partialScale}, ${templateEase})` : "none",
      i;
  tl.set(elements, {scale:startScale}, "-=" + fade);
  for (i = 0; i < elements.length; i++) {
    if (i) {
      tl.to(elements[i-1], {duration: fade, scale:partialScale, ease:partialEase}).set(elements[i-1], {visibility:"hidden"});
    }
    tl.to(elements[i], {duration: fade, autoAlpha:1}, "-=" + fade)
      .to(elements[i], {duration: duration, scale:endScale, ease:ease}, "-=" + fade);
  }
  if (config.direction === "out") {
    tl = tl.pause().tweenFromTo(tl.duration(), 0, {repeat:config.repeat});
  }
  if (config.duration) {
    tl.duration(config.duration);
  }
  return tl.play(0);
}


//for a simpler example that only shows a single image, 
//see https://codepen.io/GreenSock/pen/6239c068e182bdb8ff18926f519f8565


/*
//this is the plain vanilla version that hasn't been paramaterized and wrapped into a convenient (but more complex) zoom() function:

var images = document.querySelectorAll("#expo img"),
    tl = gsap.timeline({repeat:-1}),
    fade = 0.5,
    duration = 1,
    ease = "expoScale(1, 2)",
    partialScale = 2 + ExpoScaleEase.config(2, 4).getRatio(fade / duration) * 2,
    partialEase = "expoScale(2, partialScale)",
    i, ease;

for (i = 0; i < images.length; i++) {
  if (i) {
    tl.to(images[i-1], {duration: fade, scale:partialScale, ease:partialEase}).set(images[i-1], {visibility:"hidden"});
  }
  tl.to(images[i], { duration: fade, autoAlpha: 1 }, "-=" + fade)
    .to(images[i], { duration: duration, scale: 2, ease: ease }, "-=" + fade);
}
*/
```

Plugins[EasePack](/docs/v3/Eases/CustomWiggle.md)
