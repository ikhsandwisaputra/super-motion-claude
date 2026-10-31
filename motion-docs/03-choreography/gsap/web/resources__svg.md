---
source: https://gsap.com/resources/svg
title: "SVG"
fetched: 2026-10-28
---

May 4, 2015

# SVG

info

When it comes to animation, SVG and GSAP go together like peanut butter and jelly. Chocolate and strawberries. Bacon and...anything. SVG offers the sweet taste of tiny file size plus excellent browser support and the ability to scale graphics infinitely without degradation. They're perfect for building a rich, responsive UI (which includes animation, of course).

However, just because every major browser offers excellent support for **displaying** SVG graphics doesn't mean that **animating** them is easy or consistent. Each browser has its own quirks and implementations of the SVG spec, causing quite a few challenges for animators. For example, some browsers don't support CSS animations on SVG elements. Some don't recognize CSS transforms (rotation, scale, etc.), and implementation of transform-origin is a mess.

Don't worry, GSAP smooths out the rough spots and harmonizes behavior across browsers for you. There are quite a few unique features that GSAP offers specifically for SVG animators. Below we cover some of the things that GSAP does for you and then we have a list of other things to watch out for. This page is intended to be a go-to resource for anyone animating SVG with GSAP.

## Challenges that GSAP solves for you[​](#challenges-that-gsap-solves-for-you "Direct link to Challenges that GSAP solves for you")

GSAP does the best that it can to normalize browser issues and provide useful tools to make animate SVG as easy as it can be. Here are some of the challenges that using GSAP to animate SVG solves for you:

### Scale, rotate, skew, and move using 2D transforms[​](#scale-rotate-skew-and-move-using-2d-transforms "Direct link to Scale, rotate, skew, and move using 2D transforms")

When using GSAP, 2D transforms on SVG content work exactly like they do on any other DOM element.

```
gsap.to("#gear", {duration: 1, x: 100, y: 100, scale: 0.5, rotation: 180, skewX: 45});
```

Since IE and Opera don't honor CSS transforms at all, GSAP applies these values via the SVG `transform` attribute like:

```
<g id="gear" transform="matrix(0.5, 0, 0, 0.5, 100, 0)">...</g>
```

When it comes to animating or even setting 2D transforms in IE, CSS simply is not an option.

```
#gear {
  /* won't work in IE */
  transform: translateX(100px) scale(0.5);
}
```

Very few JavaScript libraries take this into account, but GSAP handles this for you behind the scenes so you can get amazing results in IE with no extra hassles.

### Set the transformOrigin[​](#set-the-transformorigin "Direct link to Set the transformOrigin")

Another unique GSAP feature: use the same syntax you would with normal DOM elements and get the same behavior. For example, to rotate an SVG `<rect>` that is 100px tall by 100px wide around its center you can do *any* of the following:

```
gsap.to("rect", {duration: 1, rotation: 360, transformOrigin: "50% 50%"}); //percents
gsap.to("rect", {duration: 1, rotation: 360, transformOrigin: "center center"}); //keywords
gsap.to("rect", {duration: 1, rotation: 360, transformOrigin: "50px 50px"}); //pixels
```

The demo below shows complete parity between DOM and SVG when setting `transformOrigin` to various values. We encourage you to test it in all major browsers and devices.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/17b4f47aa28f02e305dab386e9f79e89)

```
<div class="demo">
  <div class="cell">
    <h2>SVG &lt;rect&gt;</h2>
    <svg id="svg" class="container" width="260" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 200">
      <defs>
        <linearGradient id="rect-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.19" stop-color="#ff8709"/>
          <stop offset="0.73" stop-color="#f7bdf8"/>
        </linearGradient>
      </defs>
      <rect id="svgRectangle" class="animated" x="20" y="60" width="220" height="80" fill="url(#rect-gradient)"/>
    </svg>
  </div>
  <div class="cell">
    <h2>&lt;div&gt;</h2>
    <div class="container" style="width:260px; height:200px; position:relative;">
      <div id="divRectangle" class="animated"></div>
    </div>
  </div>
</div>

<div id="nav">
  <h3 id="message"></h3>
  <div class="controls">
    <input type="range" id="slider" min="0" max="1" step="0.001" value="0">
    <button id="play">play</button>
  </div>
</div>
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
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
  --surface25: #42433d;
  --orange: #ff8709;
}

body {
  margin: 0;
  padding: 18px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
}

.demo {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.cell {
  text-align: center;
}

h2 {
  margin: 5px 0 0.3em;
  color: var(--light);
  font-family: Fraktion Mono, monospace;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
}

.container {
  display: block;
  overflow: hidden;
  background: var(--grey);
  border: 1px solid var(--surface25);
  border-radius: 12px;
}

#divRectangle {
  position: absolute;
  width: 220px;
  height: 80px;
  top: 60px;
  left: 20px;
  background: linear-gradient(90deg, #ff8709 19%, #f7bdf8 73%);
}

#nav {
  width: 560px;
  max-width: 100%;
  margin: 0 auto;
}

#message {
  min-height: 1.5em;
  color: var(--light);
  font-family: Fraktion Mono, monospace;
  font-size: 1rem;
  font-weight: 400;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

#slider {
  flex: 1;
  accent-color: var(--orange);
}

button {
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}
```

```
gsap.registerPlugin(TextPlugin);
gsap.defaults({ smoothOrigin: false });

const elements = "#svgRectangle, #divRectangle";
const message = "#message";
const slider = document.getElementById("slider");

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 1 },
  onUpdate: () => (slider.value = tl.progress())
});

// both elements use the exact same tweens
tl.set(message, { text: '{rotation:360, transformOrigin:"50% 50%"}' })
  .to(elements, { rotation: 360, transformOrigin: "50% 50%" }, "+=1")
  .set(message, { text: '{rotation:"+=360", transformOrigin:"right bottom"}' }, "+=1")
  .to(elements, { rotation: "+=360", transformOrigin: "right bottom" })
  .set(message, { text: '{scale:0, transformOrigin:"0px 0px"}' }, "+=1")
  .to(elements, { scale: 0, transformOrigin: "0px 0px" })
  .set(message, { text: '{scale:1, transformOrigin:"100% 0%"}' }, "+=1")
  .to(elements, { scale: 1, transformOrigin: "100% 0%" })
  .set(message, { text: '{scaleY:0, transformOrigin:"0% 50%"}' }, "+=1")
  .to(elements, { scaleY: 0, transformOrigin: "0% 50%" })
  .set(message, { text: '{scale:1, transformOrigin:"50% bottom"}' }, "+=1")
  .to(elements, { scale: 1, transformOrigin: "50% bottom" })
  .set(message, { text: '{scale:0.5, rotation:360, transformOrigin:"50% 50%"}' }, "+=1")
  .to(elements, { scale: 0.5, rotation: 360, transformOrigin: "50% 50%" });

// --- SLIDER ---
slider.addEventListener("input", () => tl.progress(slider.value).pause());

// --- PLAY ---
document.getElementById("play").addEventListener("click", () => {
  tl.progress() === 1 ? tl.restart() : tl.play();
});
```

Plugins[TextPlugin](/docs/v3/Plugins/TextPlugin.md)

According to the SVG spec, the transform origin of an element is relative to its parent SVG canvas. So if you want to rotate an SVG child element around its own center, you need to manually plot that point in relation to the top-left corner of the SVG canvas. This can be rather cumbersome with multiple elements or if you ever change the position of the element. In contrast, a DOM element's transform-origin is relative to **its own** top left corner. Most developers expect (and most likely appreciate) the behavior they are accustomed to in the DOM – transform-origin is relative to the element itself.

Among other transform-origin related browser bugs (like zooming in Safari) we also found that Firefox doesn't honor percentages or keyword-based values. To learn the technical details of how GSAP fixes these `transformOrigin` issues behind the scenes, check out [this CSS-Tricks article](https://css-tricks.com/svg-animation-on-css-transforms/).

### Set transformOrigin without unsightly jumps[​](#set-transformorigin-without-unsightly-jumps "Direct link to Set transformOrigin without unsightly jumps")

You can run into some unexpected (yet "according to spec") results when changing the `transformOrigin` *after* an element has been transformed. In simple terms, once you scale or rotate an SVG element and then change its `transformOrigin`, the new `transformOrigin` is aligned to where it would have been according to the elements *un-transformed* state. This forces the element to be re-positioned and then the transforms are applied – leading to some awkward results.

With `smoothOrigin` enabled CSSPlugin applies some offsets so that the transformOrigin will be placed where you want without any jumps. It's a tough concept to explain with mere words so we made a nice little video for you and an interactive demo.

Study the demo below and scrub slowly.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/053d0ee8da31db3bdca1a4531e0628ee)

```
<div id="wrapper">
  <div class="overlay" id="overlay1"><code>smoothOrigin:true</code><br>element doesn't jump when origin changes.</div>
  <div class="overlay" id="overlay2"><code>smoothOrigin:false</code><br>element jumps when origin changes.</div>
  <div class="bottomOverlay"><h2 id="transform"></h2></div>

  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="800px" height="300px" viewBox="0 0 800 300">
    <defs>
      <linearGradient id="true-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0.19" stop-color="#ff8709"/>
        <stop offset="0.73" stop-color="#f7bdf8"/>
      </linearGradient>
      <linearGradient id="false-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0.21" stop-color="#f7bdf8"/>
        <stop offset="0.82" stop-color="#cd237f"/>
      </linearGradient>
    </defs>

    <g id="boxFalseGhost" class="box">
      <rect x="420" y="100" class="false ghost" width="50" height="50"/>
      <g>
        <g>
          <path d="M430.669,131.898v-10.464c0-0.512,0.48-0.768,1.44-0.768h0.816c0.96,0,1.44,0.256,1.44,0.768v10.224c0,0.848,0.304,1.544,0.912,2.088c0.608,0.544,1.392,0.816,2.352,0.816s1.748-0.271,2.364-0.816c0.616-0.543,0.924-1.24,0.924-2.088v-10.224c0-0.512,0.48-0.768,1.44-0.768h0.792c0.96,0,1.44,0.256,1.44,0.768v10.464c0,1.84-0.608,3.269-1.824,4.284c-1.216,1.016-2.928,1.524-5.136,1.524s-3.92-0.508-5.136-1.524C431.277,135.167,430.669,133.738,430.669,131.898z"/>
          <path d="M447.829,136.794v-15.12c0-0.64,0.32-0.96,0.96-0.96h5.04c1.872,0,3.32,0.464,4.344,1.392c0.384,0.369,0.708,0.884,0.972,1.548c0.264,0.664,0.396,1.436,0.396,2.316s-0.152,1.652-0.456,2.316c-0.304,0.664-0.668,1.176-1.092,1.536s-0.908,0.652-1.452,0.876c-0.849,0.352-1.672,0.528-2.472,0.528h-2.544v5.568c0,0.513-0.48,0.768-1.44,0.768h-0.816C448.309,137.562,447.829,137.307,447.829,136.794z M451.525,128.058h2.136c0.576,0,1.068-0.152,1.476-0.456c0.408-0.304,0.612-0.848,0.612-1.632c0-0.784-0.204-1.332-0.612-1.644c-0.408-0.312-0.9-0.468-1.476-0.468h-2.136V128.058z"/>
        </g>
        <polygon points="430.459,118.931 444.481,110.931 458.503,118.931"/>
      </g>
    </g>

    <g id="boxTrueGhost" class="box">
      <rect y="100" class="true ghost" width="50" height="50"/>
      <g>
        <g>
          <path d="M10.669,131.898v-10.464c0-0.512,0.48-0.768,1.44-0.768h0.816c0.96,0,1.44,0.256,1.44,0.768v10.224c0,0.848,0.304,1.544,0.912,2.088c0.608,0.544,1.392,0.816,2.352,0.816s1.748-0.271,2.364-0.816c0.616-0.543,0.924-1.24,0.924-2.088v-10.224c0-0.512,0.48-0.768,1.44-0.768h0.792c0.96,0,1.44,0.256,1.44,0.768v10.464c0,1.84-0.608,3.269-1.824,4.284c-1.216,1.016-2.928,1.524-5.136,1.524s-3.92-0.508-5.136-1.524C11.277,135.167,10.669,133.738,10.669,131.898z"/>
          <path d="M27.829,136.794v-15.12c0-0.64,0.32-0.96,0.96-0.96h5.04c1.872,0,3.32,0.464,4.344,1.392c0.384,0.369,0.708,0.884,0.972,1.548c0.264,0.664,0.396,1.436,0.396,2.316s-0.152,1.652-0.456,2.316c-0.304,0.664-0.668,1.176-1.092,1.536s-0.908,0.652-1.452,0.876c-0.849,0.352-1.672,0.528-2.472,0.528h-2.544v5.568c0,0.513-0.48,0.768-1.44,0.768h-0.816C28.309,137.562,27.829,137.307,27.829,136.794z M31.525,128.058h2.136c0.576,0,1.068-0.152,1.476-0.456c0.408-0.304,0.612-0.848,0.612-1.632c0-0.784-0.204-1.332-0.612-1.644c-0.408-0.312-0.9-0.468-1.476-0.468h-2.136V128.058z"/>
        </g>
        <polygon points="10.459,118.931 24.481,110.931 38.503,118.931"/>
      </g>
    </g>

    <g id="boxFalse" class="box">
      <rect x="420" y="100" class="false" width="50" height="50"/>
      <g>
        <g>
          <path d="M430.669,131.898v-10.464c0-0.512,0.48-0.768,1.44-0.768h0.816c0.96,0,1.44,0.256,1.44,0.768v10.224c0,0.848,0.304,1.544,0.912,2.088c0.608,0.544,1.392,0.816,2.352,0.816s1.748-0.271,2.364-0.816c0.616-0.543,0.924-1.24,0.924-2.088v-10.224c0-0.512,0.48-0.768,1.44-0.768h0.792c0.96,0,1.44,0.256,1.44,0.768v10.464c0,1.84-0.608,3.269-1.824,4.284c-1.216,1.016-2.928,1.524-5.136,1.524s-3.92-0.508-5.136-1.524C431.277,135.167,430.669,133.738,430.669,131.898z"/>
          <path d="M447.829,136.794v-15.12c0-0.64,0.32-0.96,0.96-0.96h5.04c1.872,0,3.32,0.464,4.344,1.392c0.384,0.369,0.708,0.884,0.972,1.548c0.264,0.664,0.396,1.436,0.396,2.316s-0.152,1.652-0.456,2.316c-0.304,0.664-0.668,1.176-1.092,1.536s-0.908,0.652-1.452,0.876c-0.849,0.352-1.672,0.528-2.472,0.528h-2.544v5.568c0,0.513-0.48,0.768-1.44,0.768h-0.816C448.309,137.562,447.829,137.307,447.829,136.794z M451.525,128.058h2.136c0.576,0,1.068-0.152,1.476-0.456c0.408-0.304,0.612-0.848,0.612-1.632c0-0.784-0.204-1.332-0.612-1.644c-0.408-0.312-0.9-0.468-1.476-0.468h-2.136V128.058z"/>
        </g>
        <polygon points="430.459,118.931 444.481,110.931 458.503,118.931"/>
      </g>
      <circle class="originMarker" cx="422.5" cy="102.5" r="2.5"/>
    </g>

    <g id="boxTrue" class="box">
      <rect y="100" class="true" width="50" height="50"/>
      <g>
        <g>
          <path d="M10.669,131.898v-10.464c0-0.512,0.48-0.768,1.44-0.768h0.816c0.96,0,1.44,0.256,1.44,0.768v10.224c0,0.848,0.304,1.544,0.912,2.088c0.608,0.544,1.392,0.816,2.352,0.816s1.748-0.271,2.364-0.816c0.616-0.543,0.924-1.24,0.924-2.088v-10.224c0-0.512,0.48-0.768,1.44-0.768h0.792c0.96,0,1.44,0.256,1.44,0.768v10.464c0,1.84-0.608,3.269-1.824,4.284c-1.216,1.016-2.928,1.524-5.136,1.524s-3.92-0.508-5.136-1.524C11.277,135.167,10.669,133.738,10.669,131.898z"/>
          <path d="M27.829,136.794v-15.12c0-0.64,0.32-0.96,0.96-0.96h5.04c1.872,0,3.32,0.464,4.344,1.392c0.384,0.369,0.708,0.884,0.972,1.548c0.264,0.664,0.396,1.436,0.396,2.316s-0.152,1.652-0.456,2.316c-0.304,0.664-0.668,1.176-1.092,1.536s-0.908,0.652-1.452,0.876c-0.849,0.352-1.672,0.528-2.472,0.528h-2.544v5.568c0,0.513-0.48,0.768-1.44,0.768h-0.816C28.309,137.562,27.829,137.307,27.829,136.794z M31.525,128.058h2.136c0.576,0,1.068-0.152,1.476-0.456c0.408-0.304,0.612-0.848,0.612-1.632c0-0.784-0.204-1.332-0.612-1.644c-0.408-0.312-0.9-0.468-1.476-0.468h-2.136V128.058z"/>
        </g>
        <polygon points="10.459,118.931 24.481,110.931 38.503,118.931"/>
      </g>
      <circle class="originMarker" cx="2.5" cy="102.5" r="2.5"/>
    </g>
  </svg>

  <div class="nav">
    <input type="range" id="slider" min="0" max="100" step="0.02" value="0">
    <button id="play">restart</button>
  </div>
</div>

<p>Initial scale of the boxes is <code>scale:2</code> with their transform origin in the upper left corner,
<code>transformOrigin:"left top"</code>. The white dots indicate the transformOrigin position.</p>
<p><code>smoothOrigin:false</code> is actually the "proper" implementation based on the SVG and CSS specs, but <code>smoothOrigin:true</code> looks more natural and smooth.</p>
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
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
  --orange: #ff8709;
}

body {
  margin: 0;
  padding: 12px;
  background: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-size: 16px;
}

p {
  max-width: 75ch;
  margin: 1rem auto;
  text-align: center;
  line-height: 1.5;
}

code {
  background-color: #28292b;
  color: var(--light);
  padding: 2px 4px;
  border-radius: 5px;
  font-family: Fraktion Mono, monospace;
  font-size: 0.9em;
}

#wrapper {
  position: relative;
  width: 800px;
  margin: auto;
}

svg {
  display: block;
  background: var(--grey);
  border-radius: 12px;
}

.true { fill: url(#true-gradient); }
.false { fill: url(#false-gradient); }
.ghost { opacity: 0.3; }

/* "UP" label and arrow inside each box */
.box path,
.box polygon {
  fill: var(--dark);
}

.originMarker {
  fill: var(--light);
  stroke: var(--dark);
  stroke-width: 1px;
}

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  line-height: 1.6;
}

#overlay2 {
  left: 420px;
}

.bottomOverlay {
  position: absolute;
  top: 250px;
  width: 800px;
  text-align: center;
}

.bottomOverlay h2 {
  margin: 0;
  color: var(--light);
  font-family: Fraktion Mono, monospace;
  font-size: 1.1rem;
  font-weight: 400;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 20px auto;
}

#slider {
  width: 400px;
  accent-color: var(--orange);
}

button {
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}
```

```
gsap.registerPlugin(TextPlugin);

//CSSPlugin.defaultSmoothOrigin = false;
var boxTrue = document.getElementById("boxTrue");
var boxFalse = document.getElementById("boxFalse");
var boxTrueGhost = document.getElementById("boxTrueGhost");
var text = document.getElementById("transform");
var originMarkers = document.querySelectorAll(".originMarker");
var slider = document.getElementById("slider");

var tl = gsap.timeline({onUpdate:updateSlider, paused:true, defaults:{duration: 0.5}});

tl.add("scaleUp1")
  .set(text, {text:'transformOrigin:"left top"'})
  .to(boxTrue, {scale:2}, "scaleUp1")
  .to(boxFalse, {scale:2}, "scaleUp1")
  .set(originMarkers, {x:"-50%", y:"-50%"}, "scaleUp1+=-0.01")

  .add("rotate1")
  .set(originMarkers, {x:25, y:25}, "rotate1") //move them inside box so they don't alter bounds / transformOrigin of boxes
  .set(text, {text:'transformOrigin:"right bottom"'}, "rotate1")
  .to(boxTrue, {rotation:"+=90", transformOrigin:"right bottom"}, "rotate1")
  .to(boxFalse, {rotation:"+=90", transformOrigin:"right bottom", smoothOrigin:false}, "rotate1")
  .set(originMarkers, {x:50, y:50}, "rotate1")

  .add("rotate2")
  .set(originMarkers, {x:25, y:25}, "rotate2")
  .set(text, {text:'transformOrigin:"right top"'}, "rotate2")
  .to(boxTrue, {rotation:"+=90", transformOrigin:"right top"}, "rotate2")
  .to(boxFalse, {rotation:"+=90", transformOrigin:"right top", smoothOrigin:false}, "rotate2")
  .set(originMarkers, {x:50, y:0}, "rotate2")

  .add("rotate3")
  .set(originMarkers, {x:25, y:25}, "rotate3")
  .set(text, {text:'transformOrigin:"left top"'}, "rotate3")
  .to(boxTrue, {rotation:"+=90", transformOrigin:"left top"}, "rotate3")
  .to(boxFalse, {rotation:"+=90", transformOrigin:"left top", smoothOrigin:false}, "rotate3")
  .set(originMarkers, {x:0, y:0}, "rotate3");

tl.timeScale(0.3);
gsap.set(".box", {y:45});
gsap.set([boxTrue, boxTrueGhost], {x:10});

document.getElementById("play").addEventListener("click", function() {
  tl.restart();
});

//--- SLIDER ---
slider.addEventListener("input", function() {
  tl.progress(slider.value / 100).pause();
});

function updateSlider() {
  slider.value = tl.progress() * 100;
}
```

Plugins[TextPlugin](/docs/v3/Plugins/TextPlugin.md)

When changing the `transformOrigin` (or `svgOrigin`) of an SVG element, CSSPlugin will automatically record/apply some offsets to ensure that the element doesn't "jump". You can disable this by setting `CSSPlugin.defaultSmoothOrigin = false`, or you can control it on a per-tween basis using `smoothOrigin:true | false`. `smoothOrigin` only applies to SVG elements.

### Transform SVG elements around any point in the SVG canvas[​](#transform-svg-elements-around-any-point-in-the-svg-canvas "Direct link to Transform SVG elements around any point in the SVG canvas")

Sometimes it's useful to define the transformOrigin in the SVG's global coordinate space rather than relative to the element itself. GSAP has you covered. Our CSSPlugin recognizes a `svgOrigin` special property that works exactly like `transformOrigin` but it uses the SVG's **global coordinate space** instead of the element's local coordinate space. This can be very useful if, for example, you want to make a bunch of SVG elements rotate around a common point.

```
//rotate svgElement as though its origin is at x:250, y:100 in the SVG canvas's global coordinates.
gsap.to(svgElement, {duration: 1, rotation: 270, svgOrigin: "250 100"}); 
```

The demo below shows how `transformOrigin` and `svgOrigin` compare.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/6c9c78077e09ff7a9dfdc59af29079cf)

```
<p>Each box is a &lt;rect&gt; with a class of "box" inside an &lt;svg&gt;</p>
<div>
<button id="svgOrigin">spin each box around &lt;svg&gt; center</button>
<button id="transformOrigin">spin each box around its own center</button>
</div>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300px" height="200px" viewBox="0 0 300 200">
  <defs>
    <linearGradient id="box-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0.19" stop-color="#ff8709"/>
      <stop offset="0.73" stop-color="#f7bdf8"/>
    </linearGradient>
  </defs>
  <rect x="150" y="100" class="box" width="50" height="50"/>
  <rect x="105.377" y="13.156" class="box" width="31.934" height="31.934"/>
  <rect x="250.08" y="150" class="box" width="31.934" height="31.934"/>
  <rect x="53.181" y="109.162" class="box" width="31.676" height="31.676"/>
  <rect x="251.577" y="22.717" class="box" width="32.968" height="32.968"/>
  <rect x="21.398" y="29.123" class="box" width="41.43" height="41.43"/>
</svg>
<code id="tweenCode">//sample code</code>
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
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
}

body {
  margin: 0;
  padding: 12px;
  background: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  gap: 1rem;
  display:flex;align-items:center;justify-content:center;min-height:100vh; flex-direction: column;
}

p {
  margin: 0;
  font-size: 24px;
  color: var(--light);
}

svg {
  max-width: 100%;
  height: auto;
  background: var(--grey);
  border-radius: 12px;
  border: solid 2px var(--light);
}

.box {
  fill: url(#box-gradient);
}

button {
  margin: 10px 10px 10px 0;
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}

code {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  background: #201f1f;
  border-radius: 5px;
  color: var(--light);
  font-family: Fraktion Mono, monospace;
  font-size: 16px;
}
```

```
const boxes = document.querySelectorAll(".box");
const tweenCode = document.getElementById("tweenCode");
let tween = gsap.to({}, { duration: 1 });

function spin(vars, code) {
  tween.seek(0).kill(); // reset
  tween = gsap.to(boxes, { duration: 1, rotation: 360, ...vars });
  tweenCode.textContent = code;
}

document.getElementById("svgOrigin").addEventListener("click", () =>
  // svgOrigin only supports px-based values (no percentages)
  spin({ svgOrigin: "150 100" }, 'gsap.to(".box", {duration: 1, rotation: 360, svgOrigin: "150 100"});')
);

document.getElementById("transformOrigin").addEventListener("click", () =>
  spin({ transformOrigin: "50% 50%" }, 'gsap.to(".box", {duration: 1, rotation: 360, transformOrigin: "50% 50%"});')
);
```

For the majority of use cases where setting a point of origin is necessary, `transformOrigin` is ideal, as it delivers behavior consistent with normal DOM elements in all major browsers. No headaches. However, there will be times when `svgOrigin` will come in handy too. [Sara Soueidan](https://twitter.com/SaraSoueidan) used this feature in her excellent [Circulus tool demo](https://sarasoueidan.com/tools/circulus/). `svgOrigin` only supports px-based values (no percentages).

### Animate SVG attributes like cx, cy, radius, width, etc.[​](#animate-svg-attributes-like-cx-cy-radius-width-etc "Direct link to Animate SVG attributes like cx, cy, radius, width, etc.")

GSAP handles pretty much any CSS properties like `fill`, `stroke`, `strokeWeight`, `fillOpacity`, etc. but to animate attributes you can use the built in [AttrPlugin](/docs/v3/GSAP/CorePlugins/Attributes.md) which handles any numeric attribute. For example, let's say your SVG element looks like this:

```
<rect id="rect" fill="none" x="0" y="0" width="500" height="400"></rect>
```

You could tween the "x", "y", "width", or "height" attributes using AttrPlugin like this:

```
gsap.to("#rect", {duration: 1, attr: {x: 100, y: 50, width: 100, height: 100}, ease: "none"});
```

Check out the JS tab in the demo below to see the syntax used.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/907579916ec09b51ff63459d6894da5e)

```
<svg version="1.1" id="demo" xmlns="http://www.w3.org/2000/svg" width="600px" height="207px" viewBox="0 0 600 207">
  <defs>
    <linearGradient id="stroke-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0.19" stop-color="#ff8709"/>
      <stop offset="0.73" stop-color="#f7bdf8"/>
    </linearGradient>
  </defs>
  <circle id="cssCircle" class="element" cx="57.464" cy="89.464" r="30.131"/>
  <circle id="attrCircle" class="element" cx="358" cy="89.464" r="30.131"/>
  <text transform="matrix(1 0 0 1 32.3333 27)" class="label">CSSPlugin</text>
  <text transform="matrix(1 0 0 1 327.8688 27)" class="label">AttrPlugin</text>
  <rect id="attrRectangle" x="327.869" y="145.667" class="element" width="134" height="49.333" rx="0"/>
  <line class="rule" x1="300" y1="46.595" x2="300" y2="192.595"/>
</svg><br>
<button id="play">play</button>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
  --surface25: #42433d;
}

body {
  margin-top: 10px;
  background: var(--dark);
  text-align: center;
  color: var(--surface75);
  font-family: Mori, sans-serif;
}

svg {
  max-width: 100%;
  height: auto;
  background: var(--grey);
  border-radius: 12px;
  margin-bottom: 10px;
}

.element {
  fill: none;
  stroke: url(#stroke-gradient);
  stroke-width: 4px;
}

.label {
  font-family: Mori, sans-serif;
  font-size: 12px;
  fill: var(--light);
}

.rule {
  fill: none;
  stroke: var(--surface25);
  stroke-width: 1px;
}

button {
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}
```

```
var cssCircle = document.getElementById("cssCircle"),
    attrCircle = document.getElementById("attrCircle"),
    attrRectangle = document.getElementById("attrRectangle"),
    playBtn = document.getElementById("play"),
		tl = gsap.timeline({repeat:1, yoyo:true, repeatDelay:0.5, paused:true, defaults:{duration: 1}}); 

tl.to(cssCircle, {x:120, scale:2})
  .to(cssCircle, {duration: 0.5, strokeWidth:12, stroke:"white"})
  .to(attrCircle, {attr:{cx:500}})
  .to(attrCircle, {attr:{r:50}})
  .to(attrRectangle, {attr:{rx:"30"}});

play.onclick = function() {
  tl.restart();
}
```

If you want to specify a particular unit (px or percentages) in your AttrPlugin tween it is important that the element already use the same units. AttrPlugin doesn't do unit conversion (like between % and px).

```
//Given the following element with percentage-based position:
<rect id="rectangle" x="0%" y="0%" class="element" width="200" height="100"/>

//The following tween would put the top left corner of the  exactly in the center of its parent's coordinate space.
gsap.to("#rectangle", {duration: 1, attr: {x: "50%", y: "50%"});
```

By combining percentage-based positional attributes and percentage-based transforms you could center the `<rect>` in its parent like so:

```
gsap.to("#rectangle", {duration: 1, attr: {x: "50%", y: "50%"}, x: "-50%", y: "-50%"})
```

See the[demo](https://codepen.io/GreenSock/pen/2e6fc2f37f89a718cd79ac7981f67f3f?editors=001).

### Use percentage-based x/y transforms[​](#use-percentage-based-xy-transforms "Direct link to Use percentage-based x/y transforms")

Another "gotcha" in the world of SVG is that percentage-based transforms are not accounted for in the SVG spec. When building responsive sites it can be very handy to move or simply position an element based on a percentage of its own native width or height. In the demo below four boxes of varying widths are all translated along the x-axis based on 100% of their width. No need to manually plug in unique pixel values for unique tweens of each element. All the animation runs off 1 line of code (see the JS tab).

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/f3acfdfb2847f7f79d1d4817cc0f3ecd)

```
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="600px" height="205.061px" viewBox="0 0 600 205.061">
  <defs>
    <linearGradient id="box-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0.19" stop-color="#ff8709"/>
      <stop offset="0.73" stop-color="#f7bdf8"/>
    </linearGradient>
  </defs>
  <line class="rule" x1="181.223" y1="0" x2="181.223" y2="205.061"/>
  <rect id="test" x="18.24" y="11.245" class="box" width="163.319" height="38.865"/>
  <rect x="53.611" y="58.843" class="box" width="127.948" height="38.865"/>
  <rect x="105.14" y="107.314" class="box" width="76.419" height="38.865"/>
  <rect x="142.694" y="154.773" class="box" width="38.865" height="38.865"/>
</svg><br>
<button id="play">play</button>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --grey: #191919;
  --surface75: #bbbaa6;
  --surface25: #42433d;
}

body {
  margin-top: 10px;
  background: var(--dark);
  text-align: center;
  color: var(--surface75);
  font-family: Mori, sans-serif;
}

svg {
  max-width: 100%;
  height: auto;
  background: var(--grey);
  border-radius: 12px;
  margin-bottom: 10px;
}

.rule {
  stroke: var(--surface25);
  stroke-miterlimit: 10;
}

.box {
  fill: url(#box-gradient);
}

button {
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}
```

```
var playBtn = document.getElementById("play")
    tl = gsap.timeline({repeat:1, yoyo:true, paused:true});

tl.to("rect", {duration:0.5, xPercent:100, stagger:0.4});



play.onclick = function() {
  tl.restart();
}
```

To make this happen GSAP converts the percentage values you provide to pixel values. There is one important caveat: the value are not “live” like normal percentage-based CSS transforms are. GSAP has to do the math to bake the pixel values into the matrix(), thus if you change the element's width or height AFTER you apply a GSAP percentage-based transform, the translation won't be adjusted.

### Drag SVG elements (with accurate bounds and hit-testing)[​](#drag-svg-elements-with-accurate-bounds-and-hit-testing "Direct link to Drag SVG elements (with accurate bounds and hit-testing)")

There are quite a few tools out there that allow you to drag DOM elements, but few are optimized for SVG elements. With GreenSock's [Draggable](/docs/v3/Plugins/Draggable/.md), you can drag and drop SVG elements, confine movement to any axis and/or within bounds, do hitTest() detection, and throw or spin them too (with [InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)). Impressive fact: It even works inside nested transformed elements. Each interactive element below is a `<g>` contained in a single SVG canvas.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/yLGqXzZ)

```
<div class="container">
  <div class="wrapper">
    <div class="flair flair--1"></div>
  </div>
  <div class="wrapper">
    <div class="flair flair--3"></div>
  </div>
  <div class="wrapper">
    <div class="flair flair--4"></div>
  </div>

  <div class="text">
    <h4 class="braces">spin us, drag us...</h4>
  </div>

</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --surface75: #bbbaa6;
}

* {
  box-sizing: border-box;
}

html,
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

body {
  margin: 0;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
  line-height: 1.45;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

h4 {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 1rem;
  margin: 0;
  text-align: center;
  pointer-events: none;
  color: var(--light);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;
}

.flair {
  cursor: pointer;
  width: 80px;
  height: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  will-change: transform;
}

.flair--1 {
  background-image: url("/demo-assets/ui-flair-3.webp");
}

.flair--3 {
  background-image: url(/demo-assets/ui-flair-2.webp);
}

.flair--4 {
  background-image: url(/demo-assets/ui-flair-4.webp);
}

.text {
  position: fixed;
  bottom: 1rem;
}

/* brand curly braces around the hint text */
.braces {
  position: relative;
  color: var(--light);
}

.braces::before,
.braces::after {
  position: absolute;
  content: "";
  top: 50%;
  height: 2rem;
  aspect-ratio: 1 / 2;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 27 78'%3E%3Cpath fill='%23FFFCE1' d='M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z'%3E%3C/path%3E%3C/svg%3E");
}

.braces::before {
  right: 100%;
  transform: translateY(-50%);
}

.braces::after {
  left: 100%;
  transform: rotate(180deg) translateY(50%);
}
```

```
gsap.registerPlugin(Draggable, InertiaPlugin);

Draggable.create(".flair--1", {
  type: "x",
  bounds: ".container"
});

Draggable.create(".flair--3", {
  type: "rotation",
  inertia: true
});

Draggable.create(".flair--4", {
  bounds: ".container",
  inertia: true
});
```

Plugins[Draggable](/docs/v3/Plugins/Draggable/.md)[InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)

## Move *anything* along a path[​](#move-anything-along-a-path "Direct link to move-anything-along-a-path")

Move *anything* (DOM, SVG) along a path including autorotation, offset, looping, and more

GSAP's [MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md) makes it a *breeze* to animate DOM or SVG elements along a path. It has a lot of features like autorotation, offset, and looping in additional to *very* useful helper functions for converting between coordinate systems.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LwzMKL)

```
<svg width="100%" height="100%" viewBox="-20 0 557 190" id="svg">
  	<defs>
		<linearGradient id="orange-crush" gradientUnits="userSpaceOnUse" x1="0.6" y1="-1.5" x2="84.4" y2="31.5">
			<stop offset="19.42%" style="stop-color: var(--color-orangey, #ff8709)" />
			<stop offset="73.08%" style="stop-color: #f7bdf8" />
		</linearGradient>
	</defs>
	<path id="path" fill="none" d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"/>
	<g id="rect">
		<rect width="85" height="30"  />
		<text x="18" y="19" font-size="10">SVG &lt;rect&gt;</text>
	</g>
</svg>

<div id="div">#div</div>
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
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 15px;
}

svg {
  overflow: visible;
  height: 100%;

  /* Fix Safari rendering bug */
  transform: translateZ(0);
}

circle {
  fill: var(--color-surface50);
}

path {
  stroke-width: 2;
  stroke: var(--color-surface50);
}

/* SVG rect: orange gradient */
#rect rect {
  fill: url(#orange-crush);
  rx: 8px;
}

#rect text {
  pointer-events: none;
  fill: var(--color-just-black);
  font-family: Mori, system-ui, sans-serif;
  font-weight: 600;
}

/* DIV: green gradient */
#div {
  position: absolute;
  top: 30%;
  left: 60%;
  width: 120px;
  height: 60px;
  pointer-events: none;
  background: var(--gradient-macha);
  border-radius: 12px;
  color: var(--color-just-black);
  font-size: 32px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
}

a {
  color: var(--color-shockingly-green);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.gsap-3-logo {
  width: 20vw;
  max-width: 150px;
  position: fixed;
  bottom: 15px;
  right: 15px;
}
```

```
//register the plugin (just once)
gsap.registerPlugin(MotionPathPlugin);

gsap.to("#rect", {
  duration: 5, 
  repeat: 12,
  repeatDelay: 3,
  yoyo: true,
  ease: "power1.inOut",
  motionPath:{
    path: "#path",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  }
});
```

Plugins[MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)

## Animate SVG strokes[​](#animate-svg-strokes "Direct link to Animate SVG strokes")

[DrawSVGPlugin](/docs/v3/Plugins/DrawSVGPlugin.md) allows you to progressively reveal (or hide) the **stroke** of an SVG `<path>`, `<line>`, `<polyline>`, `<polygon>`, `<rect>`, or `<ellipse>`. It does this by controlling the `stroke-dashoffset` and `stroke-dasharray` CSS properties. You can even animate the stroke in both directions.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/jEEoyw)

```
<svg class="hero" viewBox="0 0 1466 446" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="squiggle-gradient" x1="936" y1="-8.50098" x2="965.779" y2="458.785" gradientUnits="userSpaceOnUse">
      <stop offset="0.140625" stop-color="#FF8709"/>
      <stop offset="0.791667" stop-color="#FEC5FB"/>
    </linearGradient>
    <linearGradient id="star-gradient" x1="1236.31" x2="1472.88" y1="257.796" y2="262.837" gradientUnits="userSpaceOnUse">
      <stop offset=".427" stop-color="#FF8709"/>
      <stop offset=".792" stop-color="#F7BDF8"/>
    </linearGradient>
    <linearGradient id="handle-gradient-left" x1="203.347" x2="227.071" y1="31.277" y2="40.597" gradientUnits="userSpaceOnUse">
      <stop offset=".427" stop-color="#FF8709"/>
      <stop offset=".792" stop-color="#F7BDF8"/>
    </linearGradient>
    <linearGradient id="handle-gradient-right" x1="508.346" x2="532.07" y1="31.277" y2="40.597" gradientUnits="userSpaceOnUse">
      <stop offset=".427" stop-color="#FF8709"/>
      <stop offset=".792" stop-color="#F7BDF8"/>
    </linearGradient>
    <clipPath id="hero-clip">
      <path d="M0 0h1466v446H0z"/>
    </clipPath>
  </defs>

  <g clip-path="url(#hero-clip)">
    <path id="squiggle" stroke="url(#squiggle-gradient)" stroke-width="4" d="M-81.026 101.203c40.388 192.282 162.965 262.446 310.87 254.449 5.702-.308 11.351-1.168 17.001-1.884a543.143 543.143 0 0 0 16.754-2.922 541.57 541.57 0 0 0 16.428-3.933A534.282 534.282 0 0 0 296.054 342a527.555 527.555 0 0 0 15.549-5.854 520.54 520.54 0 0 0 15.003-6.754 511.906 511.906 0 0 0 14.389-7.603 507.271 507.271 0 0 0 13.713-8.399 495.237 495.237 0 0 0 12.979-9.138 483.725 483.725 0 0 0 12.191-9.813 473.047 473.047 0 0 0 11.356-10.422 462.35 462.35 0 0 0 10.478-10.961 446.417 446.417 0 0 0 9.564-11.429 434.791 434.791 0 0 0 8.618-11.819 420.088 420.088 0 0 0 7.648-12.135 406.596 406.596 0 0 0 6.659-12.37 391.33 391.33 0 0 0 5.658-12.526 376.709 376.709 0 0 0 4.65-12.603 359.598 359.598 0 0 0 3.642-12.599 345.005 345.005 0 0 0 2.642-12.515 327.414 327.414 0 0 0 1.653-12.354 312.273 312.273 0 0 0 .683-12.114c-.01-3.962-.097-7.896-.262-11.8-.318-3.839-.71-7.644-1.177-11.413a266.103 266.103 0 0 0-2.057-10.956 250.65 250.65 0 0 0-2.895-10.433 238.047 238.047 0 0 0-3.688-9.847 222.999 222.999 0 0 0-4.43-9.2 210.665 210.665 0 0 0-5.117-8.501 197.48 197.48 0 0 0-5.746-7.75 186.145 186.145 0 0 0-6.312-6.957 176.51 176.51 0 0 0-6.812-6.121 168.978 168.978 0 0 0-7.245-5.253 161.575 161.575 0 0 0-7.608-4.355 155.16 155.16 0 0 0-7.898-3.434 150.6 150.6 0 0 0-8.114-2.498 148.312 148.312 0 0 0-8.256-1.548 145.162 145.162 0 0 0-8.324-.594c-2.776.04-5.548.16-8.317.358-2.755.357-5.5.792-8.235 1.305a149.34 149.34 0 0 0-8.08 2.24 152.775 152.775 0 0 0-7.854 3.154 157.467 157.467 0 0 0-7.557 4.047 163.77 163.77 0 0 0-7.193 4.91 171.704 171.704 0 0 0-6.764 5.738 181.298 181.298 0 0 0-6.273 6.527 189.626 189.626 0 0 0-5.723 7.272 200.992 200.992 0 0 0-5.12 7.969 212.51 212.51 0 0 0-4.465 8.614 223.881 223.881 0 0 0-3.764 9.203 237.327 237.327 0 0 0-3.023 9.733 251.838 251.838 0 0 0-2.244 10.2 266.724 266.724 0 0 0-1.434 10.603c-.27 3.621-.469 7.267-.597 10.939a290.792 290.792 0 0 0 .259 11.207c.304 3.788.682 7.59 1.132 11.406a319.451 319.451 0 0 0 2.015 11.533 333.8 333.8 0 0 0 2.901 11.592 348.6 348.6 0 0 0 3.786 11.578 361.625 361.625 0 0 0 4.666 11.495 370.148 370.148 0 0 0 5.532 11.344 383.876 383.876 0 0 0 6.381 11.125 396.16 396.16 0 0 0 7.208 10.84 407.813 407.813 0 0 0 8.006 10.491 420.94 420.94 0 0 0 8.774 10.082 423.998 423.998 0 0 0 9.503 9.615 438.617 438.617 0 0 0 10.192 9.094 447.654 447.654 0 0 0 10.835 8.521 454.946 454.946 0 0 0 11.43 7.901 459.324 459.324 0 0 0 11.972 7.239 466.18 466.18 0 0 0 12.459 6.539 470.745 470.745 0 0 0 12.889 5.803 476.198 476.198 0 0 0 13.258 5.041 477.882 477.882 0 0 0 13.565 4.252 480.786 480.786 0 0 0 13.808 3.446 482.176 482.176 0 0 0 13.989 2.626 482.396 482.396 0 0 0 14.102 1.797 482.887 482.887 0 0 0 14.151.965c4.715.114 9.427.159 14.134.135 4.694-.162 9.379-.391 14.054-.689a478.522 478.522 0 0 0 13.909-1.5c4.587-.7 9.154-1.464 13.702-2.294a469.06 469.06 0 0 0 13.434-3.067 467.275 467.275 0 0 0 13.108-3.812 456.131 456.131 0 0 0 12.727-4.528 447.83 447.83 0 0 0 12.291-5.207 442.007 442.007 0 0 0 11.807-5.847 440.502 440.502 0 0 0 11.275-6.445 430.89 430.89 0 0 0 10.7-6.997 419.745 419.745 0 0 0 10.086-7.499 405.848 405.848 0 0 0 9.437-7.949 392.888 392.888 0 0 0 8.759-8.345 379.013 379.013 0 0 0 8.052-8.684 367.221 367.221 0 0 0 7.326-8.965 353.98 353.98 0 0 0 6.581-9.186 338.638 338.638 0 0 0 5.826-9.347 325.584 325.584 0 0 0 5.062-9.447 307.845 307.845 0 0 0 4.296-9.486 293.687 293.687 0 0 0 3.533-9.464 278.768 278.768 0 0 0 2.776-9.382 261.518 261.518 0 0 0 2.032-9.241 247.227 247.227 0 0 0 1.303-9.041c.256-2.952.455-5.88.595-8.785a214.65 214.65 0 0 0-.088-8.476 198.74 198.74 0 0 0-.741-8.115 183.468 183.468 0 0 0-1.363-7.703 167.909 167.909 0 0 0-1.947-7.247 154.363 154.363 0 0 0-2.492-6.748 140.822 140.822 0 0 0-2.994-6.208 128.609 128.609 0 0 0-3.45-5.633 117.338 117.338 0 0 0-3.858-5.027 107.95 107.95 0 0 0-4.216-4.392 99.808 99.808 0 0 0-4.522-3.734 91.714 91.714 0 0 0-4.774-3.056 86.505 86.505 0 0 0-4.971-2.364 81.626 81.626 0 0 0-5.114-1.661 78.37 78.37 0 0 0-5.199-.952 76.855 76.855 0 0 0-5.23-.241 76.92 76.92 0 0 0-5.204.466 77.95 77.95 0 0 0-5.123 1.166 81.006 81.006 0 0 0-4.989 1.855 85.72 85.72 0 0 0-4.802 2.527 92.43 92.43 0 0 0-4.562 3.18 98.127 98.127 0 0 0-4.276 3.809 106.634 106.634 0 0 0-3.94 4.411 115.704 115.704 0 0 0-3.562 4.98 125.74 125.74 0 0 0-3.141 5.517 138.053 138.053 0 0 0-2.681 6.015 149.831 149.831 0 0 0-2.186 6.474 160.706 160.706 0 0 0-1.66 6.889 176.54 176.54 0 0 0-1.104 7.259 188.565 188.565 0 0 0-.524 7.583 204.7 204.7 0 0 0 .077 7.859 217.74 217.74 0 0 0 .695 8.084 231.27 231.27 0 0 0 1.326 8.259 246.429 246.429 0 0 0 1.966 8.383 258.798 258.798 0 0 0 2.61 8.454 275.032 275.032 0 0 0 3.254 8.475 288.211 288.211 0 0 0 3.897 8.443 298.856 298.856 0 0 0 4.531 8.362 309.318 309.318 0 0 0 5.153 8.231 323.218 323.218 0 0 0 5.762 8.052 334.663 334.663 0 0 0 6.35 7.825 346.231 346.231 0 0 0 6.917 7.554 354.909 354.909 0 0 0 7.458 7.24 367.98 367.98 0 0 0 7.971 6.887 373.26 373.26 0 0 0 8.451 6.494 382.251 382.251 0 0 0 8.897 6.068 392.222 392.222 0 0 0 9.307 5.609 392.358 392.358 0 0 0 9.677 5.121 401.381 401.381 0 0 0 10.005 4.609 402.915 402.915 0 0 0 10.292 4.074 407.728 407.728 0 0 0 10.535 3.522 410.802 410.802 0 0 0 10.731 2.953 411.835 411.835 0 0 0 10.883 2.376 417.34 417.34 0 0 0 10.987 1.789 415.335 415.335 0 0 0 11.045 1.201 418.008 418.008 0 0 0 11.057.612c3.678.058 7.352.067 11.022.027 3.655-.135 7.303-.319 10.942-.55 3.617-.325 7.223-.697 10.817-1.115a413.271 413.271 0 0 0 10.649-1.667c3.5-.69 6.98-1.423 10.441-2.2a399.634 399.634 0 0 0 10.19-2.712 397.466 397.466 0 0 0 9.904-3.2 393.42 393.42 0 0 0 9.58-3.66 388.74 388.74 0 0 0 9.223-4.092 382.534 382.534 0 0 0 8.837-4.491 365.394 365.394 0 0 0 8.421-4.857 354.037 354.037 0 0 0 7.982-5.185 347.059 347.059 0 0 0 7.519-5.476 337.3 337.3 0 0 0 7.038-5.728 327.633 327.633 0 0 0 6.541-5.939 312.049 312.049 0 0 0 6.033-6.11 299.797 299.797 0 0 0 5.516-6.238 293.603 293.603 0 0 0 4.992-6.324 274.273 274.273 0 0 0 4.466-6.368 260.266 260.266 0 0 0 3.943-6.369 243.506 243.506 0 0 0 3.423-6.33 229.656 229.656 0 0 0 2.911-6.248 215.85 215.85 0 0 0 2.41-6.128 197.627 197.627 0 0 0 1.922-5.968 178.535 178.535 0 0 0 1.453-5.771 166.604 166.604 0 0 0 1.002-5.538 145.364 145.364 0 0 0 .573-5.273 128.69 128.69 0 0 0 .17-4.975 113.777 113.777 0 0 0-.206-4.648 100.214 100.214 0 0 0-.554-4.294 85.219 85.219 0 0 0-.871-3.915 70.68 70.68 0 0 0-1.154-3.516 60.338 60.338 0 0 0-1.405-3.098 48.946 48.946 0 0 0-1.62-2.662 39.407 39.407 0 0 0-1.798-2.215 32.117 32.117 0 0 0-1.94-1.758 26.787 26.787 0 0 0-2.045-1.293c-.7-.314-1.405-.589-2.113-.824a20.097 20.097 0 0 0-2.142-.356 19.76 19.76 0 0 0-2.135.111 20.6 20.6 0 0 0-2.092.574c-.679.305-1.349.647-2.012 1.027a27.235 27.235 0 0 0-1.897 1.471 32.374 32.374 0 0 0-1.749 1.9 40.282 40.282 0 0 0-1.569 2.313 48.858 48.858 0 0 0-1.357 2.709 58.565 58.565 0 0 0-1.118 3.083 70.33 70.33 0 0 0-.85 3.434 84.412 84.412 0 0 0-.558 3.761 97.286 97.286 0 0 0-.243 4.061c.002 1.423.033 2.867.092 4.333a123.514 123.514 0 0 0 .446 4.575 138.457 138.457 0 0 0 .814 4.786c.366 1.642.765 3.298 1.196 4.967a168.274 168.274 0 0 0 1.588 5.114 183.206 183.206 0 0 0 1.988 5.229 196.745 196.745 0 0 0 2.392 5.311c.899 1.784 1.832 3.57 2.799 5.36a228.89 228.89 0 0 0 3.205 5.375 244.168 244.168 0 0 0 3.609 5.358 254.621 254.621 0 0 0 4.006 5.309 268.74 268.74 0 0 0 4.396 5.228 270.726 270.726 0 0 0 4.776 5.118 279.336 279.336 0 0 0 5.141 4.978 295.16 295.16 0 0 0 5.493 4.811 306.202 306.202 0 0 0 5.828 4.617 314.084 314.084 0 0 0 6.143 4.399 323.684 323.684 0 0 0 6.438 4.157 323.892 323.892 0 0 0 6.714 3.895c2.3 1.229 4.62 2.434 6.96 3.614 2.37 1.131 4.77 2.237 7.18 3.317 2.44 1.028 4.9 2.029 7.38 3.004 2.5.921 5.02 1.814 7.55 2.679 2.56.81 5.12 1.592 7.7 2.345 2.59.697 5.2 1.364 7.81 2.003 2.63.581 5.26 1.132 7.9 1.655 2.64.464 5.3.899 7.95 1.304 2.66.347 5.33.665 7.99.954 2.66.23 5.33.432 7.99.604 2.65.115 5.31.201 7.96.259 2.64.001 5.28-.026 7.91-.08 2.62-.11 5.23-.247 7.83-.411 2.58-.218 5.16-.461 7.72-.731a365.9 365.9 0 0 0 7.6-1.04c2.5-.42 4.98-.865 7.45-1.333 2.44-.515 4.86-1.052 7.27-1.612a351.71 351.71 0 0 0 7.08-1.872c2.31-.686 4.6-1.39 6.87-2.114 2.23-.762 4.45-1.54 6.64-2.337a347.86 347.86 0 0 0 6.4-2.537c2.07-.891 4.12-1.796 6.14-2.715 1.98-.945 3.94-1.902 5.88-2.871a326.25 326.25 0 0 0 5.6-3.003 324.205 324.205 0 0 0 5.32-3.112 374.852 374.852 0 0 0 5.03-3.195 387.85 387.85 0 0 0 4.74-3.254 317.665 317.665 0 0 0 4.45-3.29c1.41-1.101 2.79-2.201 4.16-3.301a376.188 376.188 0 0 0 3.87-3.289 360.99 360.99 0 0 0 3.59-3.253 355.11 355.11 0 0 0 3.31-3.194c1.04-1.046 2.05-2.084 3.04-3.115.95-1.014 1.88-2.019 2.79-3.015.87-.975 1.72-1.94 2.54-2.894.79-.932 1.56-1.85 2.31-2.757.72-.881 1.42-1.748 2.1-2.601.64-.826 1.27-1.636 1.89-2.431.58-.765 1.14-1.513 1.7-2.246.52-.7 1.03-1.383 1.53-2.049.47-.631.94-1.245 1.39-1.841.42-.559.84-1.1 1.25-1.623.39-.485.77-.951 1.14-1.398.36-.409.71-.798 1.05-1.168.33-.331.65-.642.97-.933.32-.252.63-.484.93-.697.3-.172.6-.325.89-.458a7.56 7.56 0 0 1 .88-.222 6.757 6.757 0 0 1 .89.011c.31.061.61.142.92.241.31.136.63.291.96.464.33.21.67.437 1.02.681.36.279.72.575 1.1.889.39.346.79.708 1.19 1.086.43.409.86.833 1.31 1.272.46.469.93.951 1.42 1.447a547.94 547.94 0 0 1 1.56 1.608l1.71 1.756c.6.619 1.22 1.248 1.86 1.888.66.659 1.33 1.328 2.02 2.005.72.695 1.45 1.397 2.2 2.107.77.724 1.56 1.455 2.37 2.192.83.749 1.68 1.502 2.55 2.261.89.768 1.81 1.539 2.73 2.314.96.781 1.93 1.564 2.92 2.35 1.02.789 2.05 1.579 3.1 2.37 1.08.791 2.17 1.583 3.28 2.374a301.68 301.68 0 0 0 3.46 2.362c1.19.782 2.4 1.561 3.63 2.337a293.82 293.82 0 0 0 3.8 2.295c1.310.752 2.63 1.5 3.96 2.242 1.36.73 2.73 1.455 4.12 2.174a351.22 351.22 0 0 0 4.26 2.095 288.65 288.65 0 0 0 4.4 2.005c1.49.644 3 1.279 4.52 1.905 1.53.608 3.08 1.207 4.63 1.796 1.57.57 3.15 1.13 4.74 1.68 1.6.529 3.21 1.048 4.83 1.557a363.02 363.02 0 0 0 4.9 1.428c1.66.443 3.31.875 4.97 1.296 1.67.399 3.35.786 5.03 1.161 1.68.353 3.37.694 5.06 1.024 1.69.307 3.38.603 5.08.887 1.7.261 3.4.511 5.1.75 1.7.216 3.4.421 5.1.615 1.7.172 3.39.333 5.09.484 1.69.129 3.38.248 5.06.356 1.68.088 3.36.166 5.03.234 1.67.048 3.33.087 4.99.117 1.64.012 3.29.014 4.93.008 1.63-.023 3.25-.055 4.86-.094"/>

    <path id="star" fill="url(#star-gradient)" fill-rule="evenodd" clip-rule="evenodd" d="m1365.65 283.192-32.23-15.024a7.653 7.653 0 0 1-3.71-10.148c1.76-3.829 6.29-5.508 10.13-3.756l32.34 14.775-12.16-33.412c-1.45-3.963.59-8.346 4.54-9.804a7.667 7.667 0 0 1 9.83 4.51l12.42 33.316 15.02-32.227a7.658 7.658 0 0 1 10.15-3.717 7.66 7.66 0 0 1 3.76 10.133l-14.78 32.343 33.41-12.165a7.66 7.66 0 0 1 9.81 4.547c1.45 3.957-.56 8.349-4.51 9.822l-33.32 12.422 32.23 15.024a7.653 7.653 0 0 1 3.71 10.148c-1.76 3.829-6.29 5.508-10.13 3.756l-32.34-14.774 12.16 33.411c1.45 3.963-.59 8.346-4.540 9.804a7.668 7.668 0 0 1-9.83-4.509l-12.42-33.317-15.02 32.227a7.658 7.658 0 0 1-10.15 3.717 7.66 7.66 0 0 1-3.76-10.133l14.78-32.343-33.41 12.165a7.665 7.665 0 0 1-9.81-4.547c-1.45-3.957.56-8.348 4.51-9.822m33.32-12.422"/>

    <rect class="dot" width="12" height="12" x="194.573" y="346.999" rx="6" fill="#FEC5FB" transform="rotate(51.796 194.573 346.999)"/>
    <rect class="dot" width="12" height="12" x="370.259" y="30.278" rx="6" fill="#FF8709" transform="rotate(51.796 370.259 30.278)"/>
    <rect class="dot" width="12" height="12" x="514.573" y="328.999" rx="6" fill="#FEC5FB" transform="rotate(51.796 514.573 328.999)"/>
    <rect class="dot" width="12" height="12" x="660.572" y="92.999" rx="6" fill="#FF8709" transform="rotate(51.796 660.572 92.999)"/>
    <rect class="dot" width="12" height="12" x="804.572" y="310.999" rx="6" fill="#FEC5FB" transform="rotate(51.796 804.572 310.999)"/>
    <rect class="dot" width="12" height="12" x="954.574" y="154.999" rx="6" fill="#FF8709" transform="rotate(51.796 954.574 154.999)"/>
    <rect class="dot" width="12" height="12" x="1103.57" y="292.999" rx="6" fill="#FEC5FB" transform="rotate(51.796 1103.57 292.999)"/>
    <rect class="dot" width="12" height="12" x="1241.57" y="213.999" rx="6" fill="#FF8709" transform="rotate(51.796 1241.57 213.999)"/>

    <g id="handle">
      <path id="handle-line" stroke="#FF8709" stroke-width="2" d="M214.999 39.559h310.236"/>
      <path class="handle-end" fill="url(#handle-gradient-left)" d="M217.197 33.127a.43.43 0 0 1 .609 0l6.07 6.069a.431.431 0 0 1 0 .61l-6.07 6.068a.43.43 0 0 1-.609 0l-6.069-6.069a.431.431 0 0 1 0-.61l6.069-6.068Z"/>
      <path class="handle-end" fill="url(#handle-gradient-right)" d="M522.196 33.127a.43.43 0 0 1 .609 0l6.07 6.069a.431.431 0 0 1 0 .61l-6.07 6.068a.43.43 0 0 1-.609 0l-6.069-6.069a.431.431 0 0 1 0-.61l6.069-6.068Z"/>
    </g>
  </g>
</svg>

<svg class="hero title" viewBox="70 530 1005 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DrawSVG">
  <path d="M77 699.678V543.08H133.37C148.73 543.08 162.376 546.362 174.306 552.924C186.236 559.486 195.557 568.658 202.267 580.44C208.978 592.073 212.333 605.421 212.333 620.485C212.333 635.846 208.978 649.567 202.267 661.647C195.557 673.579 186.236 682.9 174.306 689.611C162.376 696.323 148.73 699.678 133.37 699.678H77ZM135.16 675.518C144.704 675.518 153.204 673.206 160.661 668.582C168.266 663.959 174.157 657.471 178.332 649.12C182.508 640.768 184.596 631.223 184.596 620.485C184.596 610.343 182.508 601.245 178.332 593.192C174.157 585.138 168.266 578.8 160.661 574.176C153.204 569.553 144.704 567.241 135.16 567.241H103.843V675.518H135.16Z"/>
  <path d="M234.87 699.678V581.111H256.121L259.253 604.377C267.007 587.972 280.727 579.769 300.412 579.769H304.886V605.496H300.412C288.034 605.496 278.416 608.628 271.556 614.892C264.696 621.156 261.266 629.88 261.266 641.066V699.678H234.87Z"/>
  <path d="M359.43 702.139C345.71 702.139 334.749 699.082 326.547 692.967C318.494 686.703 314.468 678.127 314.468 667.24C314.468 654.712 319.091 645.913 328.337 640.842C337.732 635.771 350.035 632.341 365.246 630.552C366.588 630.402 370.614 629.955 377.325 629.209C384.185 628.464 389.106 627.27 392.089 625.63C395.071 623.84 396.563 621.454 396.563 618.471C396.413 612.655 394.177 608.031 389.852 604.601C385.527 601.022 379.637 599.232 372.18 599.232C364.426 599.232 357.938 601.171 352.719 605.048C347.5 608.777 344.517 613.773 343.771 620.037H317.152C317.898 611.834 320.731 604.526 325.652 598.113C330.574 591.551 337.061 586.48 345.113 582.901C353.316 579.322 362.487 577.532 372.628 577.532C388.286 577.532 400.44 581.41 409.089 589.165C417.888 596.92 422.287 607.286 422.287 620.261V673.952C422.287 677.382 424.226 679.097 428.103 679.097H434.59V699.678H422.063C416.098 699.678 411.252 698.485 407.523 696.099C403.944 693.713 401.633 690.282 400.589 685.808C400.142 684.466 399.769 683.124 399.471 681.781C392.163 695.353 378.816 702.139 359.43 702.139ZM364.798 681.334C374.044 681.334 381.65 678.948 387.615 674.175C393.58 669.403 396.563 663.064 396.563 655.16V638.605C394.624 641.737 391.418 643.974 386.944 645.316C382.47 646.51 376.207 647.628 368.154 648.672C358.908 649.716 352.048 651.282 347.574 653.37C343.249 655.458 341.087 659.336 341.087 665.003C341.087 670.223 343.1 674.25 347.127 677.083C351.302 679.917 357.193 681.334 364.798 681.334Z"/>
  <path d="M501.512 699.678H473.775L438.655 581.111H465.722L489.657 667.016L513.144 581.111H535.066L558.777 666.122L582.265 581.111H609.332L574.212 699.678H546.922L524.105 618.695L501.512 699.678Z"/>
  <path d="M692.559 703.034C678.988 703.034 666.983 700.946 656.545 696.77C646.106 692.445 637.829 686.405 631.715 678.649C625.75 670.745 622.469 661.647 621.872 651.357H649.386C650.579 660.007 654.979 666.793 662.584 671.714C670.19 676.636 680.181 679.097 692.559 679.097C702.699 679.097 710.38 677.307 715.599 673.728C720.968 669.999 723.652 664.779 723.652 658.068C723.652 652.401 721.639 648.001 717.612 644.869C713.586 641.737 707.323 638.829 698.822 636.144L673.321 628.538C664.075 625.704 656.321 622.871 650.057 620.037C643.943 617.203 638.426 612.878 633.504 607.062C628.732 601.245 626.346 593.639 626.346 584.243C626.346 575.593 628.583 567.912 633.057 561.201C637.68 554.49 644.167 549.27 652.518 545.541C661.018 541.664 670.935 539.725 682.269 539.725C701.208 539.725 716.345 544.497 727.678 554.042C739.012 563.587 745.201 576.637 746.245 593.192H718.954C718.358 584.094 714.779 576.935 708.217 571.715C701.805 566.346 692.857 563.662 681.374 563.662C672.725 563.662 665.79 565.377 660.571 568.807C655.501 572.237 652.965 576.935 652.965 582.901C652.965 587.077 654.158 590.507 656.545 593.192C659.08 595.727 661.988 597.666 665.269 599.008C668.698 600.351 674.216 602.289 681.822 604.825L705.533 612.207C715.077 615.19 722.906 618.247 729.021 621.379C735.284 624.362 740.503 628.687 744.679 634.355C748.855 640.022 750.942 647.479 750.942 656.726C750.942 666.122 748.556 674.324 743.784 681.334C739.012 688.344 732.227 693.713 723.428 697.441C714.63 701.17 704.34 703.034 692.559 703.034Z"/>
  <path d="M846.838 699.678H818.653L757.809 543.08H786.665L832.745 662.99L877.26 543.08H905.892L846.838 699.678Z"/>
  <path d="M987.112 703.034C972.646 703.034 959.747 699.678 948.413 692.967C937.079 686.107 928.206 676.487 921.794 664.108C915.53 651.73 912.399 637.337 912.399 620.932C912.399 605.123 915.53 591.104 921.794 578.874C928.206 566.496 937.303 556.876 949.084 550.015C961.014 543.155 974.958 539.725 990.914 539.725C1011.2 539.725 1027.97 545.392 1041.24 556.727C1054.52 568.062 1062.87 583.647 1066.3 603.482H1038.78C1036.25 591.104 1030.73 581.41 1022.23 574.4C1013.73 567.39 1003.29 563.886 990.914 563.886C975.256 563.886 962.804 569.031 953.558 579.322C944.461 589.463 939.913 603.333 939.913 620.932C939.913 632.714 941.926 642.93 945.952 651.58C950.128 660.231 955.944 666.942 963.4 671.714C971.006 676.338 979.804 678.649 989.796 678.649C1001.88 678.649 1011.57 675.145 1018.88 668.135C1026.33 660.976 1030.06 651.73 1030.06 640.395H982.861V617.8H1036.32C1046.46 617.8 1054.14 620.261 1059.36 625.182C1064.73 630.104 1067.42 637.337 1067.42 646.882V699.678H1043.71V651.804H1043.26C1041.62 667.613 1035.88 680.141 1026.03 689.388C1016.19 698.485 1003.22 703.034 987.112 703.034Z"/>
</svg>

<input type="range" id="slider" min="0" max="100" step="0.01" value="0">
```

```
:root {
  --dark: #0e100f;
  --light: #fffce1;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--dark);
}

.hero {
  width: 90%;
  max-width: 1100px;
  visibility: hidden; /* avoids a flash before the initial state is set */
}

#squiggle {
  stroke-linecap: round;
}

.title {
  width: 55%;
  max-width: 600px;
  fill: var(--light);
}

.title path {
  stroke-width: 3px;
  stroke: var(--light);
  fill: var(--light);
}

#slider {
  width: 400px;
  max-width: 60vw;
  margin-top: 1.5rem;
  accent-color: #ff8709;
}
```

```
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, CustomEase);

const pathEase = CustomEase.create("pathEase", "M0,0 C0.096,0.014 0.212,0.101 0.242,0.134 0.418,0.328 0.788,0.754 1,1");
const popIn = () => ({ scale: [0, 1.5, 1], easeEach: "back.out(1.1)" });
const popOut = () => ({ scale: [1, 1.5, 0], easeEach: "back.out(1.1)" });
const slider = document.getElementById("slider");

// initial state
gsap.set(".dot, .handle-end, #star", { scale: 0, transformOrigin: "50% 50%" });
gsap.set("#handle-line", { scaleX: 0, transformOrigin: "50% 50%" });
gsap.set("#handle", { transformOrigin: "50% 50%" });

const tl = gsap.timeline({
  defaults: { ease: "back.inOut(1.1)" },
  onUpdate: () => (slider.value = tl.progress() * 100)
});

tl.from(".title path", { drawSVG: 0, duration: 1.5, stagger: 0.1, ease: "power1.inOut" }, 0)
  .from(".title path", { fillOpacity: 0, duration: 0.6, stagger: 0.1, ease: "none" }, 1.3)
  .fromTo("#squiggle", { drawSVG: 0 }, { drawSVG: "100% 0%", ease: pathEase, duration: 2.5 }, 0)
  .to(".dot", { keyframes: popIn(), stagger: 0.1, duration: 0.5 }, 2)
  .to("#handle-line", { scaleX: 1, duration: 1 }, 2.5)
  .to(".handle-end", { keyframes: popIn(), stagger: 0.1, duration: 0.5 }, 2.75)
  .to("#handle", { rotate: -10, y: -2.5, duration: 0.5 }, 2.75)
  // star rides the path, then the line erases behind it
  .to("#star", {
    motionPath: { path: "#squiggle", align: "#squiggle", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: pathEase,
    duration: 2.5
  }, 3)
  .to("#star", { scale: 1, duration: 0.5 }, 3)

// from() tweens have rendered their start state, so it's safe to show everything
gsap.set(".hero, .title", { visibility: "visible" });

// --- SLIDER ---
slider.addEventListener("input", () => tl.progress(slider.value / 100).pause());
slider.addEventListener("change", () => tl.play());
```

Plugins[DrawSVGPlugin](/docs/v3/Plugins/DrawSVGPlugin.md)[MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)[CustomEase](/docs/v3/Eases/CustomEase.md)

Unlike most "pure CSS" solutions that only allow you to animate what percentage of a stroke is visible, DrawSVGPlugin allows you to animate both the starting and ending positions of the stroke segment that is being animated. This allows you to make more advanced animations:

* Increase/reveal stroke segment from beginning, end, center or any position.
* Decrease/hide stroke segment to beginning, end, center or any position.
* Move a segment of a stroke along a path for that [snake in a maze effect](https://codepen.io/GreenSock/full/Qbjxmx/).

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/GJpGdm)

```
<p>DrawSVGPlugin Values</p>

<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 width="300" viewBox="0 0 516.3 190" style="enable-background:new 0 0 516.3 211.99;"
	 xml:space="preserve">
  <defs>
    <linearGradient id="svg-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.19" stop-color="#ff8709"/>
      <stop offset="0.73" stop-color="#f7bdf8"/>
    </linearGradient>
  </defs>
  <path id="template" d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"/>
	<path id="path" d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"/>
</svg>

<div id="code">drawSVG:<div id="current">"100%"</div></div>
<button id="next">Next Example</button>
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
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --surface75: #bbbaa6;
  --surface50: #7c7c6f;
  --surface25: #42433d;
}

body {
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
  text-align: center;
}

p {
  font-family: Mori, sans-serif;
}

#template, #path {
  fill: none;
}
#template {
  stroke-width: 5px;
  stroke: var(--surface25);
}
#path {
  stroke: url(#svg-gradient);
  stroke-width: 20px;
  visibility: hidden;
}
#code, #value {
  font-size: 20px;
  font-family: Fraktion Mono, monospace;
}
#code {
  color: var(--surface50);
  margin: 20px;
  position: relative;
  visibility: hidden;
}
#current {
  display: inline-block;
  color: var(--light);
}
#description {
  max-width: 530px;
  color: var(--surface50);
  font-family: Mori, sans-serif;
  font-size: 24px;
  display: inline-block;
  text-align: left;
}

button {
  background: var(--dark);
  border: solid 2px var(--surface75);
  color: var(--surface75);
  border-radius: 99px;
  padding: 12px 25px;
  cursor: pointer;
  line-height: 1;
  font-family: inherit;
  font-size: 0.9rem;
}
button:hover {
  border-color: var(--light);
  color: var(--light);
}
```

```
gsap.registerPlugin(DrawSVGPlugin);

var values = "100%;40% 60%;20 350;50% 50%;true;10%".split(";"),
    currentIndex = 0;

//set the initial value
gsap.set("#path", {visibility:"visible"});
gsap.set("#code", {visibility:"visible"});

function next() {

  gsap.killTweensOf(next); //in case the user clicks, clear any delayed calls to this method.
  if (++currentIndex === values.length) {
    currentIndex = 0;
  }
  if (values[currentIndex] === "true") {
    gsap.set("#current", {innerText:(values[currentIndex]), ease:"none"});
  } else {
    gsap.set("#current", {innerText:('"' + values[currentIndex] + '"'), ease:"none"});
  }
  gsap.to("#path", {duration: 1, drawSVG:values[currentIndex], ease:"power1.inOut"});

}

document.getElementById("next").addEventListener("click", next);
```

Plugins[DrawSVGPlugin](/docs/v3/Plugins/DrawSVGPlugin.md)

### Morph SVG paths with differing numbers of points[​](#morph-svg-paths-with-differing-numbers-of-points "Direct link to Morph SVG paths with differing numbers of points")

MorphSVGPlugin provides advanced control over tweens that morph SVG paths.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/vEGpawb)

```
<svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path id="diamond" fill="url(#grad)" d="M50,1l49,49L50,99L1,50L50,1z" />
  <path id="lightning" fill="transparent" d="M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z" />
</svg>














<svg id="gradient" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
      <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
      <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
    </linearGradient>
  </defs>
</svg>
```

```
body {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #0e100f;
  overflow: hidden;
}

.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 9px;
}

#svg-stage {
  width:60%;
  max-height:60vh;
  max-width:500px;
  overflow:visible;
}

#gradient {
  height: 0;
}
```

```
gsap.to("#diamond", {
  morphSVG: "#lightning",
  duration: 2,
  ease: "expo.inOut",
  repeat: -1,
  yoyo: true
});
```

Plugins[MorphSVGPlugin](/docs/v3/Plugins/MorphSVGPlugin.md)

With [MorphSVGPlugin](https://gsap.com/morphSVG), you can

* Morph `<path>` data **even if the number (and type) of points is completely different** between the start and end shapes! Most other SVG shape morphing tools require that the number of points matches.
* Morph a `<polyline>` or `<polygon>` to a different set of points
* Convert and replace non-path SVG elements (like `<circle>`, `<rect>`, `<ellipse>`, `<polygon>`, `<polyline>`, and `<line>`) into identical `<path>`s using MorphSVGPlugin.convertToPath().
* Optionally define a "shapeIndex" that controls how the points get mapped. This affects what the in-between state looks like during animation.
* Simply feed in selector text or an element (instead of passing in raw path data) and the plugin will grab the data it needs from there, making workflow easier.

## Tips to Avoid Common Gotchas[​](#tips-to-avoid-common-gotchas "Direct link to Tips to Avoid Common Gotchas")

There are some things that GSAP can't solve for you. But hopefully this part of the article can help prepare you to avoid them ahead of time! Here are some things to keep in mind when creating and animating SVGs.

Vector editor/SVG creation tips:

* When creating an SVG in Illustrator or Inkscape, create a rectangle the same size as your artboard for when you copy elements out of your vector editor and paste them into a code editor ([how-to here](https://www.motiontricks.com/use-background-rectangle-with-svg-exports/)).

* How to quickly reverse the direction of a path in Illustrator (Note: If the Path Direction buttons are not visible in the attributes panel, click the upper right menu of that panel and choose 'Show All'):

  <!-- -->

  * Open path: Select the pen tool and click on the first point of your path and it will reverse the points.
  * Closed path: Right click the path and make it a compound path, choose menu-window-attributes and then use the Reverse Path Direction buttons.

* If you're morphing between elements it might be useful to [add extra points](https://gsap.com/community/topic/13681-svg-gotchas/?do=findComment\&comment=119550) yourself to simpler shapes where necessary so that MorphSVG doesn't have to guess at where to add points.

* You can think of masks as clip-paths that allow for alpha as well.

* When using masks, it's often important to [specify which units to use](https://gsap.com/community/topic/13681-svg-gotchas/?do=findComment\&comment=65150).

* Use a tool like [SVGOMG](https://jakearchibald.github.io/svgomg/) (or [this simpler tool](https://petercollingridge.appspot.com/svg-editor)) to minify your SVGs before using them in your projects.

Code/animation-related tips:

* Always set transforms of elements with GSAP (not just CSS). There are quite a few browser bugs related to getting transform values of elements which GSAP can't fix or work around so you should always set the transform of elements with GSAP if you're going to animate that element with GSAP.
* Always use relative values when animating an SVG element. Using something like `y: "+=100"` allows you to change the SVG points while keeping the same animation effect as hard coding those values.
* You can fix some rendering issues (especially in Chrome) by adding a very slight rotation to your tween(s) like `rotation: 0.01`.
* If you're having performance issues with your issue, usually the issue is that you have too many elements or are using filters/masks too much. For more information, see [this post](https://codepen.io/tigt/post/improving-svg-rendering-performance) focused on performance with SVGs.
* You might like injecting SVGs into your HTML instead of keeping it there directly. You can do this by using a tool [like Gulp](https://github.com/kiyopikko/inject-inline-svg/blob/master/gulp/injectsvg.js).
* You can easily convert between coordinate systems by using MotionPathPlugin's helper functions like [.convertCoordinates()](/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates\(\).md).

Technique tips/resources:

* You can [animate the viewBox attribute](https://www.motiontricks.com/basic-svg-viewbox-animation/) ([demo](https://cdpn.io/PointC/pen/OMabPa))!

* You can animate (draw) a dashed line by following the technique outlined in [this post](https://www.motiontricks.com/svg-dashed-line-animation/).

* You can animate (draw) lines with varied widths by following the technique outlined in [this post](https://www.motiontricks.com/svg-calligraphy-handwriting-animation/).

* You can animate (draw) handwriting effects by following the technique outlined in [this post](https://www.motiontricks.com/animated-handwriting-effect-part-1/).

* You can [create dynamic SVG elements](https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/)!

* You can animate (draw) [a "3D" SVG path](https://gsap.com/community/topic/13681-svg-gotchas/?tab=comments#comment-58229).

* You can fake nested SVG elements (which will be available in SVG 2) by positioning the inner SVG with GSAP and scaling it ([demo](https://cdpn.io/PointC/pen/BwwEyK)).

* You can fake 3D transforms (which will be available in SVG 2) in some cases by either

  <!-- -->

  * Faking the transform that you need. For example sometimes rotationYs can be replaced by a `scaleX` instead.
  * Applying the transform to a container instead. If you can limit the elements within the SVG to just the ones you want to transform, this is a great approach. For example, applying a `rotationY` to the `<svg>` or `<div>` containing a `<path>` instead of applying it to the `<path>` itself.

* [When to use SVG vs When to use canvas](https://css-tricks.com/when-to-use-svg-vs-when-to-use-canvas/), Performance deep dive on CSS tricks

## Limitations of SVG[​](#limitations-of-svg "Direct link to Limitations of SVG")

* The current SVG spec does not account for 3D transforms. Browser support is varied. Best to test thoroughly and have fallbacks in place.
* SVG is now [hardware accelerated](https://developer.chrome.com/blog/hardware-accelerated-animations/#hardware-accelerated-svg-animations) in most browsers, but certain properties (such as filters) are still very performance intensive to animate.

## Browser support[​](#browser-support "Direct link to Browser support")

All SVG features in this article will work in all major desktop and mobile browsers unless otherwise noted. If you find any cross-browser inconsistencies please don't hesitate to let us know in our [support forums](https://gsap.com/community/forum/11-gsap/).

## Inspiration[​](#inspiration "Direct link to Inspiration")

[![blog-svg-tips-full](/assets/images/blog-svg-tips-full-9a47f74f87cb6a078104514673327ddd.png)](https://codepen.io/collection/XzxeNJ/)<br /><!-- -->The [Chris Gannon GSAP Animation collection](https://codepen.io/collection/XzxeNJ/) is great for seeing more SVG animations made with GSAP. Be sure to also check out [Chris Gannon's full portfolio on CodePen](https://codepen.io/chrisgannon/) and [follow him on Twitter](https://twitter.com/ChrisGannon) for a steady influx of inspiration.

## Awesome SVG Resources[​](#awesome-svg-resources "Direct link to Awesome SVG Resources")

* [SVG Tutorials](https://www.motiontricks.com/svg-tutorials/) - MotionTricks
* [The SVG Animation Masterclass](https://www.cassie.codes/speaking/getting-started-with-svg-animation/) - Cassie Evans
* [Understanding SVG Coordinate Systems and Transformations](https://sarasoueidan.com/blog/svg-coordinate-systems/) - Sara Soueidan
* [Improving SVG Runtime Performance](https://codepen.io/tigt/post/improving-svg-rendering-performance) - Taylor Hunt
* [SVG tips](https://twitter.com/hashtag/SVGTipOfTheDay?src=hashtag_click\&f=live) - Louis Hoebregts
* [A Compendium of SVG Information](https://css-tricks.com/mega-list-svg-information/) - Chris Coyier
* [Making SVGs Responsive with CSS](https://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/) - Sara Soueidan
* [viewBox newsletter - archived](https://buttondown.email/viewBox/archive/) (SVG focus) - Cassie Evans and Louis Hoebregts
