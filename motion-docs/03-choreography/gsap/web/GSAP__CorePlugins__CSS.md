---
source: https://gsap.com/docs/v3/GSAP/CorePlugins/CSS
title: "CSS"
fetched: 2026-10-28
---

# CSS

**GSAP can animate pretty much ANY CSS-related property** of DOM elements. Commonly animated properties are transforms, opacity and colors. But GSAP can handle anything you throw at it. There is no official list as it would be far too long, but **if in doubt - try it out!**

## CSS properties[​](#css-properties "Direct link to CSS properties")

GSAP can animate any [animatable CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties), and many that aren't *officially* animatable using CSS.

Hyphenated CSS properties

It's important to note that hyphenated-names become CamelCaseNames. So instead of "font-size", you'd use "fontSize". "background-color" will be "backgroundColor".

```
// some example properties.
gsap.to(element, {
  backgroundColor: "red", // background-color
  fontSize: 12, // font-size
  boxShadow: "0px 0px 20px 20px red", // animate complex strings
  borderRadius: "50% 50%",
  height: "auto", // animate between auto and a px value 🪄
});
```

### Non-animatable properties...[​](#non-animatable-properties "Direct link to Non-animatable properties...")

If you define a property that is non-animatable — like `position: "absolute"` or `borderStyle: "solid"` — GSAP will instantly apply the property for you . These non-tweenable properties will be set at the beginning of the tween (except `display: "none"` which will be applied at the end of the tween for obvious reasons).

What's a 'non-animatable property'?

In order for a property to be animatable, the start, end and in between values must be valid. If you animate between `rotation: 0` and `rotation: 360`, there are valid numerical values in between. Following this logic, you can't animate between two different background images as there is no valid CSS for **a little bit of that image and a tiny bit of that one**. background-image is a binary property, there is either an image or there isn't an image, there's no inbetween to animate.

Animating Layout

Some other "impossible properties" are **layout** properties. These are far too complex for a normal tween - but will be handled *magically* by GSAP's [FLIP plugin](/docs/v3/Plugins/Flip/.md)

## Transforms[​](#transforms "Direct link to Transforms")

GSAP provides built in aliases for transforms which are cross browser friendly, more performant and more reliable than animating the transform string.

```
gsap.to(element, {
  // writing out the transform string 🔥
  // transform: "translate(-50%,-50%)"
  xPercent: -50,
  yPercent: -50,
});
```

In regular CSS, the order that you list the transforms matters but GSAP always applies them in the same order for consistency: translation (`x`, `y`, `z`), then `scale`, then `rotationX`, then `rotationY`, then `skew`, then `rotation` (same as `rotationZ`).

Deep Dive - Why use shorthand transforms?

When you define a transform as a string, like `"transform: translateX(50px)"`, GSAP applies it to the element and then reads back and parses the `matrix()` or `matrix3d()` that the browser creates. This process is necessary because the string can contain any number or order of transform values, such as `"translateX(50px) rotate(40deg) scale(0.5,0.5) translateY(100px) rotate(30deg)"`. This approach involves a lot of extra work. Additionally, according to the CSS spec, the order of operation matters which can lead to unexpected results for people unfamiliar with CSS transforms.

When you define properties using the shorthand like `x:50` instead of `"transform: translateX(50px)"`, GSAP can directly handle that one value without the need for extra calculations. In short, using GSAP for transforms offers performance gains, optimizations for speed and an intuitive and consistent order-of-operation.

We strongly recommend using GSAP's built-in aliases for transforms unless you specifically require a non-standard order-of-operation, which is rare.

### Quick reference[​](#quick-reference "Direct link to Quick reference")

Here's a list of the shorthand transforms and some other commonly used properties.

| GSAP                          | Description or equivalent CSS       |
| ----------------------------- | ----------------------------------- |
| x: 100                        | transform: translateX(100px)        |
| y: 100                        | transform: translateY(100px)        |
| xPercent: 50                  | transform: translateX(50%)          |
| yPercent: 50                  | transform: translateY(50%)          |
| scale: 2                      | transform: scale(2)                 |
| scaleX: 2                     | transform: scaleX(2)                |
| scaleY: 2                     | transform: scaleY(2)                |
| rotation: 90                  | transform: rotate(90deg)            |
| rotation: "1.25rad"           | transform: rotate(1.25rad)          |
| skew: 30                      | transform: skew(30deg)              |
| skewX: 30                     | transform: skewX(30deg)             |
| skewY: "1.23rad"              | transform: skewY(1.23rad)           |
| transformOrigin: "center 40%" | transform-origin: center 40%        |
| opacity: 0                    | adjust the elements opacity         |
| autoAlpha: 0                  | shorthand for opacity & visibility  |
| duration: 1                   | animation-duration: 1s              |
| repeat: -1                    | animation-iteration-count: infinite |
| repeat: 2                     | animation-iteration-count: 3        |
| delay: 2                      | animation-delay: 2s                 |
| yoyo: true                    | animation-direction: alternate      |

Notes about transforms

* To do percentage-based translation use `xPercent` and `yPercent` instead of `x` or `y` which are typically pixel based. This allows you to combine px and percentage transformations.
* You can use scale as a shortcut to control both the `scaleX` and `scaleY` properties identically.
* You can define relative values, like `rotation: "+=30"`.
* The order in which you declare the transform properties makes no difference.
* GSAP has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don't handle anti-aliasing as well.
* Percentage-based x/y translations also work on SVG elements.

### Complex strings[​](#complex-strings "Direct link to Complex strings")

GSAP can animate complex values like `boxShadow: "0px 0px 20px 20px red"`, `borderRadius: "50% 50%"`, and `border: "5px solid rgb(0,255,0)"`. When necessary, it attempts to figure out if the property needs a vendor prefix and applies it accordingly.

### Units[​](#units "Direct link to Units")

GSAP has sensible defaults for units. If you want to set the x property, you can say `x: 24` instead of x: "24px" because GSAP uses pixels as the default unit for x. If you want to specify a particular unit you can append the unit value on the end and wrap the value in a string.

```
gsap.to(HTMLelement, {
  rotation: 360 // default deg
  rotation: "1.25rad" // use radians instead
  x: 24 // using px
  x: "20vw" // use viewport widths instead
});
```

info

If the unit of measurement that's currently used doesn't match the current one, GSAP will convert them for you. e.g. Tweening an element's width from "50%" to "200px".

## 3D Transforms[​](#3d-transforms "Direct link to 3D Transforms")

You can animate 3D properties like `rotationX`, `rotationY`, `rotationZ` (identical to regular `rotation`), `z`, `perspective`, and `transformPerspective` in all modern browsers (see [Can I Use](//caniuse.com/transforms3d) for details about browser support for 3D transforms). You can animate 3D transform properties and 2D properties together intuitively:

```
gsap.to(element, {
  duration: 2,
  rotationX: 45,
  scaleX: 0.8,
  z: -300,
});
```

warning

To get your elements to have a true 3D visual perspective applied, you must either set the perspective property of the parent element or set the special `transformPerspective` of the element itself

The `transformPerspective` is like adding a `perspective()` directly inside the CSS `transform` style, like: `transform: perspective(500px) rotateX(45deg)` which only applies to that specific element. Common values range from around 200 to 1000, the lower the number the stronger the perspective distortion. If you want a group of elements to share a common perspective (the same vanishing point), you should set the regular `perspective` *property* on the parent/container of those elements.

```
//apply a perspective to the PARENT element (the container) to make the perspective apply to all child elements (typically best)
gsap.set(container, { perspective: 500 });

//or apply perspective to a single element using "transformPerspective"
gsap.set(element, { transformPerspective: 500 });

//sample css:
.myClass {
    transform: translate3d(10px, 0px, -200px) rotateY(45deg) scale(1.5, 1.5);
}

//corresponding GSAP transform (animated over 2 seconds):
gsap.to(element, {
    duration: 2,
    scale: 1.5,
    rotationY: 45,
    x: 10,
    y: 0,
    z: -200
});

//sample CSS that uses a perspective():
.myClass {
    transform: perspective(500px) translateY(50px) rotate(120deg);
}

//corresponding GSAP transform (set, not animated):
gsap.set(element, {
    transformPerspective: 500,
    rotation: 120,
    y: 50
});
```

For more information about perspective, see [this article](//3dtransforms.desandro.com/perspective).

Notes about 3D transforms

* In browsers that don't support 3D transforms, they'll be ignored. For example, rotationX may not work, but rotation would. See [can I use](https://caniuse.com/transforms3d) for a chart of which browser versions support 3D transforms.
* All transforms are cached, so you can tween individual properties without worrying that they'll be lost. You don't need to define all of the transform properties on every tween - only the ones you want to animate. You can read the transform-related values (or any property) anytime using the method. If you'd like to clear those values (including the transform applied to the inline style of the element), you can use `clearProps: "transform"`. If you'd like to force GSAP to re-parse the transform data from the CSS (rather than use the data it had recorded from previous tweens), you can pass `parseTransform: true` into the `config` object.
* GSAP has nothing to do with the rendering quality of the element in the browser. Some browsers seem to render transformed elements beautifully while others don't handle anti-aliasing as well.
* To learn more about CSS 3D transforms, see [this article](https://www.smashingmagazine.com/2012/01/adventures-in-the-third-dimension-css-3-d-transforms/)
* Opera mini does not support 3D transforms

### force3D[​](#force3d "Direct link to force3D")

`force3D` defaults to `"auto"` mode which means transforms are automatically optimized for speed by using `translate3d()` instead of `translate()`. This typically results in the browser putting that element onto its own compositor layer, making animation updates more efficient. In `"auto"` mode, GSAP will automatically switch back to 2D when the tween is done (if 3D isn't necessary) to free up more GPU memory. If you'd prefer to keep it in 3D mode, you can set `force3D: true`. Or, to stay in 2D mode whenever possible, set `force3D: false`. See [Myth Busting CSS Animations vs JavaScript"](//css-tricks.com/myth-busting-css-animations-vs-javascript/) for more details about performance.

## transformOrigin[​](#transformorigin "Direct link to transformOrigin")

Sets the origin around which all transforms (2D and/or 3D) occur. By default, it is in the center of the element (`"50% 50%"`). You can define the values using the keywords `"top"`, `"left"`, `"right"`, or `"bottom"` or you can use percentages (bottom right corner would be `"100% 100%"`) or pixels. If, for example, you want an object to spin around its top left corner you can do this:

```
//spins around the element's top left corner
gsap.to(element, {
  duration: 2,
  rotation: 360,
  transformOrigin: "left top",
});
```

The first value in the quotes corresponds to the x-axis and the second corresponds to the y-axis, so to make the object transform around exactly 50px in from its left edge and 20px from its top edge, you could do:

```
//spins/scales around a point offset from the top left by 50px, 20px
gsap.to(element, {
  duration: 2,
  rotation: 270,
  scale: 0.5,
  transformOrigin: "50px 20px",
});
```

This even works with SVG elements!

You can define a transformOrigin as a **3D value** by adding a 3rd number, like to rotate around the y-axis from a point that is offset 400px in the distance, you could do:

```
//rotates around a point that is 400px back in 3D space, creating an interesting effect:
gsap.to(element, {
  duration: 2,
  rotationY: 360,
  transformOrigin: "50% 50% -400px",
});
```

SVG

GSAP does make `transformOrigin` work on SVG elements consistently across browsers. But keep in mind that SVG elements don't officially support 3D transforms according to the spec.

## SVG[​](#svg "Direct link to SVG")

### svgOrigin[​](#svgorigin "Direct link to svgOrigin")

**Only for SVG elements** Works exactly like `transformOrigin` but it uses the SVG's global coordinate space instead of the element's local coordinate space. This can be very useful if, for example, you want to make a bunch of SVG elements rotate around a common point. You can either define an `svgOrigin` or a `transformOrigin`, not both (for obvious reasons). So you can do `gsap.to(svgElement, {duration: 1, rotation: 270, svgOrigin: "250 100"})` if you'd like to rotate `svgElement` as though its origin is at x: 250, y: 100 in the SVG canvas's global coordinates. Units are not required. It also records the value in a `data-svg-origin` attribute so that it can be parsed back in. `svgOrigin` doesn't accommodate percentage-based values.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ZYRqRx)

```
<link href='//fonts.googleapis.com/css?family=Signika+Negative:300,400' rel='stylesheet' type='text/css'>

<p>Each green box is a &lt;rect&gt; with a class of "box" inside an &lt;svg&gt;
</p>

<div><button id="svgOrigin">spin each box around &lt;svg&gt; center</button>

  <button id="transformOrigin">spin each box around its own center</button>
</div>

<svg id="container" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="macha" x1="0.045" y1="0.293" x2="0.955" y2="0.707">
      <stop offset="20.74%" style="stop-color: var(--color-shockingly-green, #0ae448)" />
      <stop offset="65.5%" style="stop-color: var(--color-lt-green, #abff84)" />
    </linearGradient>
  </defs>

  <rect style="fill:#000;stroke:#fffce1;stroke-miterlimit:10;" width="600" height="400" />
  <g fill="url(#macha)">
    <rect class="box" x="44" y="110" width="65" height="65" rx="10" />
    <rect class="box" x="270" y="51" width="55" height="55" rx="10" />
    <rect class="box" x="491" y="98.5" width="53.5" height="53.5" rx="10" />
    <rect class="box" x="430" y="290" width="96.5" height="96.5" rx="10" />
    <rect class="box" x="302" y="190" width="80" height="80" rx="10" />
    <rect class="box" x="140" y="259" width="64" height="64" rx="10" />
  </g>
</svg>

<code id="tweenCode">//sample code</code>
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
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

svg {
  height: 300px;
}

code {
  width: 300px;
}



h1 {
  margin: 5px 0;
}
p {
  margin:0;
  font-size:18px;
  font-weight:300;
}

.box {
  width:50px;
  height:50px;
  position:relative;
  margin-bottom:2px;
}

.red {
  background-color:red;
}

.blue {
  background-color:blue;
}

.nav {
  width:600px;
  background-color:#ccc;
  text-align:right;
}

button {
  padding:10px;
  margin:10px;
}

svg {
  overflow: visible;
  margin: 1rem;
  border-radius: 10px;
}


code {
  display:block;
  font-size:18px;
  margin-top: 1rem;
}
```

```
var svgOriginButton = document.getElementById("svgOrigin"),
    transformOriginButton = document.getElementById("transformOrigin"),
    tweenCode = document.getElementById("tweenCode"),
		boxes = document.querySelectorAll(".box"),
    tween = gsap.to({}, {});

function svgOriginRotation() {
  tween.seek(0).kill(); //reset
  tween = gsap.to(boxes, {duration: 1, rotation: 360, svgOrigin: "300 200"});
  tweenCode.innerHTML = 'svgOrigin: "300 200"';
}

function transformOriginRotation() {
  tween.seek(0).kill(); //reset
  tween = gsap.to(boxes, {duration: 1, rotation: 360, transformOrigin: "50% 50%"});
  tweenCode.innerHTML = 'transformOrigin: "50% 50%"'
}

svgOriginButton.onclick = svgOriginRotation;
transformOriginButton.onclick = transformOriginRotation;
```

### smoothOrigin[​](#smoothorigin "Direct link to smoothOrigin")

**Only for SVG elements** When changing the `transformOrigin` (or `svgOrigin`) of an SVG element, CSSPlugin will now automatically record/apply some offsets to ensure that the element doesn't "jump". You can disable this by setting `CSSPlugin.defaultSmoothOrigin = false`, or you can control it on a per-tween basis using `smoothOrigin: true` or `smoothOrigin: false`.

Deep Dive - Why use shorthand transforms?

The way transforms and transform-origins work in the browser (and according to the official spec), changing the origin causes the element jump in a jarring way. For example, if you rotate 180 degrees when the `transform-origin` is in the element's top left corner, it ends up at a very different position than if you applied the same rotation around its bottom right corner. Since GSAP is focused on solving real-world problems for animators (most of whom prefer to smoothly alter the `transformOrigin`), the `smoothOrigin` feature in GSAP solves this issue. This also means that if you create SVG artwork in an authoring program like Adobe Flash where it may not be easy/obvious to control where the element's origin is, things will "just work" when you define a `transformOrigin` via GSAP. Currently, this feature only applies to SVG elements, as that is where it is more commonly a pain-point.

## directionalRotation[​](#directionalrotation "Direct link to directionalRotation")

Tweens rotation for a CSS property in a particular direction which can be either **clockwise** (`"_cw"` suffix), **counter-clockwise** (`"_ccw"` suffix), or in the **shortest direction** (`"_short"` suffix) in which case the plugin chooses the direction for you based on the shortest path. For example, if the element's rotation is currently 170 degrees and you want to tween it to -170 degrees, a normal rotation tween would travel a total of 340 degrees in the counter-clockwise direction, but if you use the \_short suffix, it would travel 20 degrees in the clockwise direction instead. Example:

```
gsap.to(element, {
  duration: 2,
  rotation: "-170_short",
});

//or even use it on 3D rotations and use relative prefixes:
gsap.to(element, {
  duration: 2,
  rotation: "-170_short",
  rotationX: "-=30_cw",
  rotationY: "1.5rad_ccw",
});
```

Notice that the value is in quotes, thus a string with a particular suffix indicating the direction (`_cw`, `_ccw`, or `_short`). You can also use the `"+="` or `"-="` prefix to indicate relative values. Directional rotation suffixes are supported in all rotational properties (`rotation`, `rotationX`, and `rotationY`); you don't need to use `directionalRotation` as the property name. There is a [DirectionalRotationPlugin](/docs/v3/GSAP/CorePlugins/CSS.md#directionalrotation) that you can use to animate objects that aren't DOM elements, but there's no need to load that plugin if you're just animating CSS-related properties with CSSPlugin because it has DirectionalRotationPlugin's capabilities baked-in. Check out an [interactive example here](http://codepen.io/GreenSock/pen/jiEyG).

## autoAlpha[​](#autoalpha "Direct link to autoAlpha")

Identical to `opacity` except that when the value hits `0` the `visibility` property will be set to `hidden` in order to improve browser rendering performance and prevent clicks/interactivity on the target. When the value is anything other than `0`, `visibility` will be set to `inherit`. It is not set to `visible` in order to honor inheritance (imagine the parent element is hidden - setting the child to visible explicitly would cause it to appear when that's probably not what was intended). And for convenience, if the element's `visibility` is initially set to `hidden` and `opacity` is `1`, it will assume `opacity` should also start at `0`. This makes it simple to start things out on your page as invisible (set your CSS `visibility: hidden`) and then fade them in whenever you want.

```
//fade out and set visibility:hidden
gsap.to(element, {
  duration: 2,
  autoAlpha: 0,
});

//in 2 seconds, fade back in with visibility:visible
gsap.to(element, { duration: 2, autoAlpha: 1, delay: 2 });
```

## CSS variables[​](#css-variables "Direct link to CSS variables")

GSAP can animate CSS variables in browsers that support them.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/e1a338a481c001eb5f8654c8d155170f)

```
<link href='//fonts.googleapis.com/css?family=Signika+Negative:300,400' rel='stylesheet' type='text/css'>

<div class="wrapper">
<h2>Apply same --myColor variable to multiple css rules.</h2>
<p>Tweening the <strong> --myColor</strong> variable will update multiple elements.</p>

<div class="cool">this is cool </div>
</div>
```

```
body {
  margin:20px;
}

html {
  --myColor: #00bae2;
}

h2 {
  font-size:20px;
}

.wrapper {
  border: 3px solid var(--myColor);
  border-radius: 10px;
  margin-right:10px;
  padding: 1rem;
}

 h2, strong {
  color:var(--myColor);
}

.cool {
  display:inline-block;
  padding: 0.5rem 1rem;
  color:white;
  border-radius:99px;
  background-color:var(--myColor);
}
```

```
gsap.to("html", {"--myColor":"#0ae448", yoyo:true, repeat:20, duration: 1});
```

### clearProps[​](#clearprops "Direct link to clearProps")

You may enter a comma-delimited list of property names into `clearProps` that you want to clear from the element's `style` property when the tween completes (or use `"all"` or `true` to clear all properties). This can be useful if, for example, you have a class (or some other selector) that should apply certain styles to an element when the tween is over that would otherwise get overridden by the `element.style`-specific data that was applied during the tween. Typically you do **not** need to include vendor prefixes. `clearProps` also clears the "transform" attribute of SVG elements that have been affected by GSAP because GSAP always applies transforms (like x, y, rotation, scale, etc.) via the transform **attribute** to avoid browser bugs/quirks. Clearing any transform-related property (like `x`, `y`, `scale`, `rotation`, etc.) will clear the *entire* `transform` because those are all merged into one "transform" CSS property.

```
//tweens 3 properties and then clears only "left" and "transform" (because "scale" affects the "transform" css property. CSSPlugin automatically applies the vendor prefix if necessary too)
gsap.from(element, {
  duration: 5,
  scale: 0,
  left: 200,
  backgroundColor: "red",
  clearProps: "scale,left", // note: "scale" (or any transform-related property) clears all transforms
});
```

### autoRound[​](#autoround "Direct link to autoRound")

By default, CSSPlugin will round pixel values and `zIndex` to the closest integer during the tween (the inbetween values) because it improves browser performance, but if you'd rather disable that behavior, pass `autoRound: false` in the CSS object. You can still use the [SnapPlugin](/docs/v3/GSAP/CorePlugins/Snap.md) to manually define properties that you want rounded.

If you need to animate numeric attributes (rather than CSS-related properties), you can use the [AttrPlugin](/docs/v3/GSAP/CorePlugins/Attributes.md). And to replace the text in a DOM element, use the [TextPlugin](/docs/v3/Plugins/TextPlugin.md).

***

## Try out what you've learnt\![​](#try-out-what-youve-learnt "Direct link to Try out what you've learnt!")

Try it out

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/BaGvbXb)

```
<div class="box"></div>
```

```
body {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  flex-direction: column;
}
```

```
gsap.to(".box", {
  duration: 2,
  rotation: 360,
  backgroundColor: "#9d95ff",
})
```

### FAQs[​](#faqs "Direct link to FAQs")

#### How do I include this in my project?

Simply load GSAP's core - CSSPlugin is included automatically!

#### Do I need to use the css: <!-- -->wrapper in tweens?

Nope. That was required *wayyy* back when GSAP was first created but due to the frequency of animating DOM elements, GSAP removed the need to use that for animating CSS properties.
