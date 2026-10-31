---
source: https://gsap.com/docs/v3/Plugins/MotionPathPlugin
title: "MotionPath"
fetched: 2026-10-28
---

# MotionPath

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(MotionPathPlugin) 
```

#### Minimal usage

```
gsap.to("#div", {
  motionPath: {
    path: "#path",
  },
  transformOrigin: "50% 50%",
  duration: 5,
});
```

info

[YouTube video player](https://www.youtube.com/embed/3FbYrkDzgd4)

Animate any object along a path (or even through arbitrary property values). The motionPath can be defined as any of the following:

* An SVG **`<path>`** element (selector text or direct reference) like:

  ```
  motionPath: "#pathID";
  ```

* A **string of SVG path data** like:

  ```
  motionPath: "M9,100c0,0,18-41,49-65";
  ```

* An **Array of objects with x,y coordinates**. By default, it will draw a curved path **through** these coordinates, but set `type: "cubic"` if they describe a cubic bezier:

  ```
  // plot a curve through these coordinates. The target's current coordinates will automatically be added to the start:
  motionPath: [{x:100, y:50}, {x:200, y:0}, {x:300, y:100}]

  // cubic bezier coordinates (anchor, two control points, anchor, two control points, etc.):
  motionPath: {
    path: [{x:0, y:0}, {x:20, y:0}, {x:30, y:50}, {x:50, y:50}],
    type: "cubic"
  }
  ```

* An **Array of objects defining *other* properties** (doesn't need to be "x" and "y"). This will basically smooth out the velocity changes as it hits each value:

  ```
  // property values through which to animate (the target's current property values will be added to the start):
  motionPath: [
    { scale: 0.5, rotation: 10 },
    { scale: 1, rotation: -10 },
    { scale: 0.8, rotation: 3 },
  ];
  ```

* A **configuration object** that has a `path` property with any of the above formats, plus other [configuration details](#usage) like:

  ```
  motionPath: {
    path: "#pathID",
    align: "#pathID",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
    start: 0.25,
    end: 0.75
  }
  ```

## Other features[​](#other-features "Direct link to Other features")

Feature Highlights

* **Magical `align` capabilities** that bend coordinate systems in order to position the target exactly on top of the path (or move the path to the target), regardless of how deeply nested they are inside different transformed containers! This is insanely convenient and no other tool on the web offers this functionality.

* `**autoRotate**` makes the target rotate automatically in the direction of the path as it moves.

* Define specific **`start`** and/or **`end`** positions on the path (progress values from 0-1). Even wrap around or go backwards!

* A separate [MotionPathHelper](/docs/v3/Plugins/MotionPathHelper) tool enables **interactive editing of the path directly in the browser!**

* No need to supply an SVG path - you can provide raw coordinates through which to **plot a curved path, complete with adjustable curviness**

* Loads of **helper methods** for doing advanced things like:

  <!-- -->

  * Convert native SVG shapes like `<circle>`, `<rect>`, etc. into an equivalent `<path>` ([convertToPath()](/docs/v3/Plugins/MotionPathPlugin/static.convertToPath\(\).md))
  * Calculate the relative position data between any two DOM elements so that you can move one to align perfectly with another, even if they're inside different containers that have various transforms applied! ([getRelativePosition()](/docs/v3/Plugins/MotionPathPlugin/static.getRelativePosition\(\).md))
  * Convert SVG `<path>` data into raw cubic bezier data/numbers (or the other way around) ([stringToRawPath()](/docs/v3/Plugins/MotionPathPlugin/static.stringToRawPath\(\).md)/[rawPathToString()](/docs/v3/Plugins/MotionPathPlugin/static.rawPathToString\(\).md))
  * Convert between coordinate spaces ([convertCoordinates()](/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates\(\).md)/[getGlobalMatrix()](/docs/v3/Plugins/MotionPathPlugin/static.getGlobalMatrix\(\).md)/[getAlignMatrix()](/docs/v3/Plugins/MotionPathPlugin/static.getAlignMatrix\(\).md))

## **Config Object**[​](#usage "Direct link to usage")

The `motionPath` can be used as either a shorthand for the `path` (described below) or as a configuration object with any of the following properties: The below code would align a div to an SVG `<path>`. It assumes that there is a DOM element with an `id` of `"div"` and an SVG `<path>` with an `id` of `"#path"`.

* ### Property

  ### Description

  #### path[](#path)

  String | Element | Array \[required] The motion path along which to animate the target(s). This can be any of the following:

  * An SVG **``**&#x65;lement (selector text or direct reference) like:
    ```
    // selector text: motionPath: {    path: "#pathID" }  // or direct reference to a  element: let myPath = document.querySelector("#pathID"); ... motionPath: {    path: myPath }
    ```
  * A **string of SVG path data** like:
    ```
    // path data: motionPath: {    path: "M9,100c0,0,18-41,49-65" }
    ```
  * An **Array of objects with x,y coordinates**. A curved path will be plotted **through** these coordinates, or set `type: "cubic"` to have them interpreted as sequential cubic bezier coordinates (ordered like: *anchor, two control points, anchor, two control points*, etc.):
    ```
    // plot a curve through these coordinates (the target's current coordinates will automatically be added to the start): motionPath: {   path: [{x:100, y:50}, {x:200, y:0}, {x:300, y:100}] }  // cubic bezier coordinates (anchor, two control points, anchor, two control points, etc.): motionPath: {   path: [{x:0, y:0}, {x:20, y:0}, {x:30, y:50}, {x:50, y:50}],   type: "cubic" }
    ```
  * An **Array of objects defining *other* properties** (doesn't need to be "x" and "y"). This will basically smooth out the velocity changes as it hits each value:
    ```
    // property values through which to animate (the target's current property values will be added to the start): motionPath: {   path: [{scale:0.5, rotation:10}, {scale:1, rotation:-10}, {scale:0.8, rotation:3}] }
    ```

* #### align[](#align)

  String | Element - By default, the raw coordinate values from the `path` data are plugged directly into the target's x/y transforms but the `align` property bends coordinate spaces in order to position the target exactly on top of the path (or move the path to the target) regardless of how deeply nested they are inside different transformed containers! You can align to the `path` too. In other words, `path` and `align` can point to the same element. `align` can be any of the following:

  * **Selector text**, like `"#path"` would select the element with the ID of "path" and move the tween's target so that its top left corner is aligned perfectly with that "#path" element. If you'd rather center the target on the spot, use `alignOrigin: [0.5, 0.5]`
  * **Element**, like a reference to a DOM element.
  * **`"self"`** moves the path to the tween's targets so that they don't jump initially. In other words, it's as if the path was drawn from their current position(s).

  You can also use `offsetX` and `offsetY` to fine-tune alignment.

* #### alignOrigin[](#alignOrigin)

  Array - Determines the point on the target that gets aligned with the path. `alignOrigin` is an Array with progress values along the x and y axis, so `[0.5, 0.5]` would be in the center, `[1, 0]` would be the top right corner, etc. Setting an `alignOrigin` also automatically sets the `transformOrigin` to the corresponding place on the target for convenience. *(added in GSAP 3.2.0)*

* #### autoRotate[](#autoRotate)

  Boolean | Number - Rotates the element in the direction of the path. `true` matches the angle of the path exactly, but you can offset the angle by any amount by defining `autoRotate` as a **number** (in degrees). For example, `autoRotate: 90` would add 90 degrees to the rotation as it moves along the path. If you’d like the element to rotate from its center, simply set `transformOrigin: "50% 50%"`. To align the path with the center of the target, either use `alignOrigin: [0.5, 0.5]` or set `xPercent: -50, yPercent: -50` on the target before the motionPath tween.

* #### start[](#start)

  Number - The position along the path at which to start, where 0 is the beginning and 1 is the end and 0.5 is the middle. It can be any positive or negative decimal number. For example, `0.3` would start the element at the 30% point along the curve. Default is 0.

* #### end[](#end)

  Number - The position along the path at which to end, where 0 is the beginning, 1 is the end, and 0.5 is in the middle. It can be any positive or negative decimal number, including a value that's less than the start (which would make the object travel backwards). For example, `0.3` would have the element end at the 30% point along the curve. 1.5 would make it loop around back to the beginning and stop at the halfway point. Default is 1.

* #### curviness[](#curviness)

  Number - Only applies when the `path` is an Array of points through which to plot a curve. This determines how "curvy" the resulting path is. So 0 would make straight lines (hard corners), 1 (the default) creates a nicely curved path, and 2 would make it much more curvy. Think of it like pulling the control points further and further outward from the anchors as the number goes higher. Default is 1.

* #### offsetX[](#offsetX)

  Number - An amount to add to the x coordinate(s) for fine-tuning alignment. Default is 0.

* #### offsetY[](#offsetY)

  Number - An amount to add to the y coordinate(s) for fine-tuning alignment. Default is 0.

* #### fromCurrent[](#fromCurrent)

  Boolean - When `false`, causes it **NOT** to include the current property values in an Array that's passed in for the `path`. For example, if the target is currently at `x: 0`, `y: 0` and then you do a `motionPath: {path: [{x: 100, y: 100}, {x: 200, y: 0}, {x: 300, y: 200}]}` tween, by default it would add `{x: 0, y: 0}` to the *start* of that Array so that it animates smoothly from wherever it **currently** is but you can set `fromCurrent: false` to avoid that and just have it *jump* to x: 100, y: 100 at the start of that tween. *(added in 3.7.0)*

* #### relative[](#relative)

  Boolean - Only applies when `path` is an Array. If `true`, each successive value is interpreted as **relative** to the previous one. For example, if the target's x starts at 100 and the path is `[{x:5}, {x:10}, {x:-2}] `, it would first move to 105, then 115, and finally end at 113.

* #### type[](#type)

  String - Only applies when `path` is an Array of objects with x/y properties - set `type: "cubic"` to have them interpreted as a sequence of cubic beziers in the following order: anchor, two control points, anchor, two control points, anchor, etc. for as many iterations as you want but obviously make sure that it starts and ends with anchors.

* #### resolution[](#resolution)

  Number - Only applies when `path` is an Array. Due to the nature of bezier curves, plotting the progression of an object on the path over time can make it appear to speed up or slow down based on the placement of the control points and the length of each successive segment on the path. So MotionPathPlugin implements a technique that reduces or eliminates that variance, but it involves breaking the segments down into a certain number of pieces which is what `resolution` controls. The greater the number, the more accurate the time remapping. But there is a processing price to pay for greater precision. The default value of 12 is typically perfect, but if you notice slight pace changes on the path you can increase the `resolution` value. Or, if you want to prioritize speed you could reduce the number.

* #### useRadians[](#useRadians)

  Boolean - If true, the the value passed to the rotation will use radians instead of degrees. This is particularly helpful when working with other scripts or libraries that default to radians like Pixi.js. Default is false.

## Demo[​](#demo "Direct link to Demo")

```
gsap.to("#div", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  transformOrigin: "50% 50%",
  duration: 5,
  ease: "power1.inOut",
});
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/9bdac66e1cb0ad0aa24396565f340e9c)

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

note

When you `align` the motionPath, those calculations are done at the very start of the animation - it is **NOT** responsive, so if the screen gets resized in a way that affects the path, the alignment won't get re-applied. Why? It would be too expensive CPU-wise to constantly be checking and re-calculating on each tick. But you could definitely set up your own resize listeners and handle it manually in that case (store the progress of the tween, `progress(0).kill()` it, create a new tween and jump to the recorded progress).

## Animating through other properties (not coordinates)[​](#animating-through-other-properties-not-coordinates "Direct link to Animating through other properties (not coordinates)")

You can pass in an Array of objects defining *other* properties (doesn't need to be "x" and "y") and it will basically smooth out the velocity changes as it hits each value. In the example below, we animate through various `scale` values with a curviness of 0 and 2; notice how the velocity changes are smoother with a higher curviness:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/vYBVQap)

```
<main>
  <div>
    <div class="box gradient-green" id="box-1"></div>
  <p>curviness: 0</p>
  </div>
  <div>
    <div class="box gradient-green" id="box-2"></div>
     <p>curviness: 2</p>
  </div>
	
	
</main>
```

```
main {
  text-align: center;
	width: 100%; min-height: 100vh;
	display: flex; flex-flow: row nowrap; justify-content: space-evenly; align-items: center;
}

main div {
  display:flex;align-items:center;justify-content:center;flex-direction: column;
}
.box {
  will-change: transform;
  margin-bottom: 2rem;
}
```

```
var scales = [{scale:1.3}, {scale:0.2},	{scale:1}];

gsap.to('#box-1', {
	motionPath: {
		path: scales, 
		curviness: 0
	}, 
	duration: 3, 
	ease: "none",
	repeat: -1,
	repeatDelay: 1
});

gsap.to('#box-2', {
	motionPath: {
		path: scales, 
		curviness: 2
	}, 
	duration: 3, 
	ease: "none",
	repeat: -1,
	repeatDelay: 1
});
```

Plugins[MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)

## Video[​](#video "Direct link to Video")

convert coordinates

## **Methods**[​](#methods "Direct link to methods")

|                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #### [MotionPathPlugin.arrayToRawPath](/docs/v3/Plugins/MotionPathPlugin/static.arrayToRawPath\(\).md)( values:Array, vars:Object ) : RawPath Array                                                                                                     | Takes an Array of coordinates and plots a curve through them, returning a corresponding RawPath Array. If `type: "cubic"` is declared in the `vars` parameter object, they will be interpreted as cubic bezier points like anchor, two control points, anchor, two control points, anchor, etc.)  |
| #### [MotionPathPlugin.convertCoordinates](/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates\(\).md)( fromElement:Element \| window, toElement:Element \| window, point:Object ) : Object (point or Matrix2D)                                 | Converts a point from one element's local coordinates into where that point lines up in a different element's local coordinate system regardless of how many nested transforms are affecting the elements!                                                                                        |
| #### [MotionPathPlugin.convertToPath](/docs/v3/Plugins/MotionPathPlugin/static.convertToPath\(\).md)( shape:String \| Element, swap:Boolean ) : Array                                                                                                   | Converts SVG shapes like `<circle>`, `<rect>`, `<ellipse>`, or `<line>` into `<path>`                                                                                                                                                                                                             |
| #### [MotionPathPlugin.getAlignMatrix](/docs/v3/Plugins/MotionPathPlugin/static.getAlignMatrix\(\).md)( fromElement:Element \| window, toElement:Element \| window, fromOrigin:Array, toOrigin:Array \| String ) : Matrix2D                             | Gets a Matrix2D for translating between coordinate spaces, typically so that you can move the `fromElement` to align it with the `toElement` while factoring in all transforms (even nested ones). The matrix allows you to convert any point/coordinate using its apply() method.                |
| #### [MotionPathPlugin.getGlobalMatrix](/docs/v3/Plugins/MotionPathPlugin/static.getGlobalMatrix\(\).md)( element:Element, inverse:Boolean, adjustGOffset:Boolean ) : Matrix2D                                                                          | Gets the Matrix2D that would be used to convert the element's local coordinate space into the global coordinate space. So, for example, if you take a point `{x:0, y:0}` and `apply()` the matrix to it, the resulting point would be the viewport coordinates of that element's top left corner. |
| #### [MotionPathPlugin.getLength](/docs/v3/Plugins/MotionPathPlugin/static.getLength\(\).md)( path:Element \| String \| RawPath ) : Number                                                                                                              | Returns the length of a path                                                                                                                                                                                                                                                                      |
| #### [MotionPathPlugin.getPositionOnPath](/docs/v3/Plugins/MotionPathPlugin/static.getPositionOnPath\(\).md)( rawPath:Array, progress:Number, includeAngle:Boolean ) : Object                                                                           | Calculates the x/y position (and optionally the angle) corresponding to a particular progress value along the RawPath                                                                                                                                                                             |
| #### [MotionPathPlugin.getRawPath](/docs/v3/Plugins/MotionPathPlugin/static.getRawPath\(\).md)( value:String \| Element ) : RawPath (Array)                                                                                                             | Gets the RawPath (Array) for the provided element or raw SVG \<path> data. A RawPath is essentially an Array containing one Array for each contiguous segment with alternating x, y, x, y cubic bezier data.                                                                                      |
| #### [MotionPathPlugin.getRelativePosition](/docs/v3/Plugins/MotionPathPlugin/static.getRelativePosition\(\).md)( fromElement:Element \| window, toElement:Element \| window, fromOrigin:Array \| Object, toOrigin:Array \| Object \| String ) : Object | Gets the x and y distances between two elements regardless of nested transforms! feed two elements to this method and it'll return the gap between them as a point {x, y} according to the coordinate system of the fromElement's parent.                                                         |
| #### [MotionPathPlugin.pointsToSegment](/docs/v3/Plugins/MotionPathPlugin/methods/static-pointsToSegment.md)( points:Array, curviness:Number ) : Array                                                                                                  | Plots a curved cubic bezier path through the provided x,y point coordinates, returning a segment Array that's typically dropped into a RawPath Array                                                                                                                                              |
| #### [MotionPathPlugin.rawPathToString](/docs/v3/Plugins/MotionPathPlugin/static.rawPathToString\(\).md)( rawPath:Array ) : String                                                                                                                      |                                                                                                                                                                                                                                                                                                   |
| #### [MotionPathPlugin.sliceRawPath](/docs/v3/Plugins/MotionPathPlugin/static.sliceRawPath\(\).md)( rawPath:Array, start:Number, end:Number ) : RawPath                                                                                                 | Slices the provided RawPath Array at the designated start/end positions and returns the resulting (new, sliced) RawPath                                                                                                                                                                           |
| #### [MotionPathPlugin.stringToRawPath](/docs/v3/Plugins/MotionPathPlugin/static.stringToRawPath\(\).md)( data:String ) : RawPath                                                                                                                       |                                                                                                                                                                                                                                                                                                   |

## **Demos**[​](#demos "Direct link to demos")

Check out the full collection of [SVG animation demos](https://codepen.io/collection/NqewVd) on CodePen.
