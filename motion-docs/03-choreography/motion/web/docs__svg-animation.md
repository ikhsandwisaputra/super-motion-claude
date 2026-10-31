---
source: https://motion.dev/docs/svg-animation
title: "SVG animation: every technique compared"
fetched: 2026-10-28
---

# SVG animation: every technique compared

There are four ways to animate SVG on the web: SMIL, CSS, the Web Animations API and JavaScript. Here's how each SVG animation technique actually works, and which one to reach for.

SVG has a built-in, declarative animation system that works without CSS or JavaScript.

It was specified alongside SVG itself, over 20 years ago, and ships in every modern and legacy browser.

Almost nobody uses it.

In this article, we're going to take a look at this animation system, SMIL, alongside CSS, the Web Animations API, and Motion. What each one can do, what it can't, what it costs to run, and which to pick.

## SMIL

[SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL), pronounced "smile" (probably), is a set of HTML-like tags you nest inside SVG elements: `<animate>`, `<animateTransform>` and `<animateMotion>` (no relation).

```html
<circle cx="50" cy="50" r="20">
  <animate
    attributeName="r"
    values="20; 40; 20"
    dur="2s"
    repeatCount="indefinite"
  />
</circle>
```

`attributeName` here points at an attribute on the parent element, `values` is the keyframe list, and `dur` is short for duration.

The thing to notice is `attributeName`. SMIL can animate _any_ attribute. `viewBox`, `points` on a polyline, `stdDeviation` on a blur, `baseFrequency` on an `<feTurbulence>`. Like Motion, if it's an attribute, SMIL can animate it, which isn't true of CSS or Web Animations API.

### Motion along a path

[`<animateMotion>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion) is the precursor to CSS's `offset-path`. It moves an element along a path, and it can define its own, or point at a path that already exists in the document.

```
<circle r="6">
  <animateMotion path="M 0 0 H 300 Z" dur="3s" repeatCount="indefinite" rotate="auto" />
</circle>
```

`rotate="auto"` turns the circle to face its direction of travel. Swap the `path` attribute for an `<mpath href="#track" />` child and it follows a path that already exists in the document, so the curve you can see and the curve the circle follows are always in sync.

Live example: https://examples.motion.dev/js/svg-smil

For the best part of two decades there was nothing else on the web that could do this. CSS has since caught up: `offset-path` and `offset-distance` do the same job for any element.

Motion has its own path animation API, [`arc()`](https://motion.dev/docs/arc). Instead of authoring a path upfront, it dynamically bends the line between any two `x`/`y` points into a curve at runtime:

```javascript
import { animate, arc } from "motion"

animate(".item", { x: 200, y: 100 }, { duration: 1, path: arc() })
```

There's no `d` string anywhere: the curve is automatically generated from wherever the element is to wherever it's going, which is why it also works with [layout animations](https://motion.dev/docs/react-layout-animations).

### SMIL isn't dead, but maybe it should be

You'll read that SMIL is deprecated. It isn't.

Chrome shipped an intent to deprecate SMIL back in 2015, pointing developers to CSS animations and the Web Animations API instead. These, at the time, were not at feature parity with SMIL, so Google reversed this decision.

However, there are two outstanding issues with this API that will almost certainly never be addressed.

One, its verbosity. To animate multiple attributes, you need a separate `<animate>` tag for each one, and every tag carries its own attributes that have to be duplicated and kept in sync. This generates tons more code than either Motion or CSS.

Additionally, SMIL works exclusively via SVG attributes. CSS, Web Animations API and Motion will all drive animations like `opacity` and `transform` off-thread via the GPU, while the same SMIL animations will stutter when the main thread is busy. So given the lack of ongoing investment we don't recommend using SMIL to animate SVGs.

Live example: https://examples.motion.dev/js/svg-smil-vs-motion

## CSS and Web Animations API

CSS and Web Animations are the polar opposite to SMIL in that they **can't animate attributes**.

Luckily, SVG's "presentation attributes" like `fill`, `stroke`, `stroke-width` and `opacity` are also available as CSS properties. Which means they transition and animate like anything else on the page:

```css
circle {
  fill: #0f0;
  transition: fill 0.3s;
}

circle:hover {
  fill: #f00;
}
```

SVG 2 went further and promoted a handful of _geometry_ attributes to properties to CSS too: `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width` and `height`. Those landed across browsers between 2020 and 2024, so a circle's radius is now something a stylesheet can animate directly.

### The transform origin gotcha

Rotate an element in CSS and it spins around its own centre. However, rotate an **SVG elememt** and it spins around the origin of the `viewBox`, which is usually the top left corner of the image. Unintuitive and almost never what you want.

The fix is [`transform-box: fill-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-box), which tells the browser to resolve `transform-origin` against the element's own bounding box, the way CSS does:

```css
.spinner {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 1s linear infinite;
}
```

Older animation libraries like GSAP normalise transform origin by measuring elements relative to the `viewBox`, but this is no longer necessary. `transform-box` has been supported for years, which is why Motion's [`svgEffect`](https://motion.dev/docs/svg-effect) and `motion` components apply `fill-box` themselves the moment they see a transform, and you can opt back out with `transformBox: "view-box"`.

Live example: https://examples.motion.dev/js/svg-css

### Morphing with `d`

Path data is a CSS property too, in some browsers. Set `d` with `path()` and you can transition between two shapes (with the same order of path draw commands) without JavaScript:

```css
path {
  d: path("M 0,0 L 0,10 L 10,10");
  transition: d 0.4s;
}

path:hover {
  d: path("M 0,0 L 10,0 L 10,10");
}
```

The catch is (surprise) Safari, which doesn't support the `d` property as a style at all. You're better setting and animating it via Motion for full cross-browser compatibility.

### Unsupported properties

As mentioned, CSS and Web Animations API simply can't animate attributes, which precludes everything that never became a CSS property. `viewBox`, `points` on a `<polyline>`, `x1`/`y1`/`x2`/`y2` on a `<line>`, `offset` on a gradient stop. Every filter primitive attribute, so `stdDeviation`, `baseFrequency`, `numOctaves` and the rest.

For those, CSS has nothing at all. And, because it _is_ the CSS engine, neither does the Web Animations API.

```javascript
// cx became a CSS property in SVG 2, so this works
circle.animate({ cx: ["0px", "50px"] }, 1000)

// viewBox never did, so this does nothing at all
svg.animate({ viewBox: ["0 0 100 100", "0 0 50 50"] }, 1000)
```

**Tip:**
  Notice the units on that first line. WAAPI wants a complete CSS value, so a
  bare `50` is an error where `"50px"` is fine. That's one of a pile of
  WAAPI-related papercuts I've [tried to improve with
  Motion](https://motion.dev/docs/improvements-to-the-web-animations-api-dx).

Everything beyond these styles, `viewBox`, `points`, the filter primitives etc, needs a value written to the attribute every frame from JavaScript. That's exactly the job Motion's [`svgEffect`](https://motion.dev/docs/svg-effect) and `motion` components do for you, as we'll see below.

### Line drawing

The single most requested SVG animation is line drawing.

The secret to a drawing animation is a trick played with two properties designed for dashed lines: [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray) and `stroke-dashoffset`.

`stroke-dasharray` takes a line length and a gap length. Give it a line exactly as long as the whole path, followed by a gap exactly as long as the whole path, and you have a fully drawn line trailed by a gap so large that you don't see the start of the next line.

By animating `stroke-dashoffset` you can then slide that pattern along the stroke, leading to the illusion of a line being drawn.

The problem is, we don't know how long the line is. One typical approach is simply to read it with `.getTotalLength()`:

```javascript
const path = document.querySelector("path")
const length = path.getTotalLength()

path.style.strokeDasharray = length
path.style.strokeDashoffset = length

path.animate({ strokeDashoffset: [length, 0] }, 2000)
```

This works, but introduces a DOM measurement which, if not properly handled with something like Motion's [`frame` batching](https://motion.dev/docs/frame), will lead to style thrashing.

Luckily, there's a much simpler approach. By actively setting the shape's [`pathLength`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength) attribute, we can _tell_ the browser how long the line is. Set it to something very simple like `1` and suddenly the animation becomes much simpler:

```html
<path pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" />
```

Now the maths is in simpler progress units and there's no measurements. This is exactly what Motion does under the hood, handing you these simpler three attributes to achieve draw animations:

- `pathLength`: how much of the line is drawn
- `pathSpacing`: the gap between drawn segments
- `pathOffset`: where along the path the drawn segment starts

Which makes the whole effect one line:

```jsx
animate("path", { pathLength: [0, 1] }, { duration: 2 })
```

Live example: https://examples.motion.dev/js/svg-line-drawing

Or, in React:

```jsx
<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
```

Live example: https://examples.motion.dev/react/path-drawing

It works on `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline` and `rect`, and there's a full [path drawing example](https://motion.dev/examples/react-path-drawing) to check out.

Looping the offset gives you an infinite chasing-line loader:

```javascript
const pathLength = motionValue(0.25)
const pathOffset = motionValue(0)

svgEffect("path", { pathLength, pathOffset })

animate(pathOffset, [0, 1], { repeat: Infinity, ease: "linear" })
```

Live example: https://examples.motion.dev/js/loading-infinite-path-drawing

## Motion

To sum up, Motion adds:

- Simple path drawing API
- Automatically handles attributes vs styles
- Default init types

On top of the usual Motion features such as spring animations, timelines and simple keyframe syntax. Plus:

**`viewBox`.** `<motion.svg>` can animate `viewBox`, which is the tidiest way to pan or zoom a graphic and something neither CSS or WAAPI can animate:

```
<motion.svg
  viewBox="0 0 200 200"
  animate={{ viewBox: "-100 -100 300 300" }}
/>
```

Live example: https://examples.motion.dev/react/svg-viewbox

**Springs on SVG values.** Neither CSS nor WAAPI has native springs, both must use pre-generated `linear()` easing curves. Motion can animate any SVG attribute with time-based or physics-based springs:

```
animate("path", { pathLength: 1 }, { type: spring, bounce: 0.4 })
```

**Scroll-linking.** Motion's `scroll` is backwards-compatible with browsers that don't yet support native scroll animations, supporting hardware accelerated animations wherever the browser allows it:

```
scroll(animate("path", { pathLength: [0, 1] }))
```

**Morphing.** Like CSS and WAAPI, Motion can interpolate `d` natively, but this works in every browser including Safari. Also like CSS and WAAPI, the two paths must have the same points defined in the same order.

For genuinely different shapes you can pair Motion with a path mixer like Flubber, which is what our [SVG path morphing example](https://motion.dev/examples/js-svg-path-morphing) does.

Live example: https://examples.motion.dev/js/svg-path-morphing

## What does an SVG animation cost?

Broadly, animating an SVG is a paint (grade C by [the MotionScore methodology](https://motion.dev/magazine/web-animation-performance-tier-list).

However - animating `transform` or `opacity` via CSS, WAAPI or Motion is actually an S-tier, GPU-accelerated animation. Animating these via other animation libraries like GSAP, or via JS directly, is still **rendered** via the compositor but **animated** on the main thread.

Still, the majority of SVG animations like path drawing and morphing are still paint triggering. The thing that scales a paint is surface area. Bigger elements are more expensive to redraw. Therefore, it's always cheaper to animate `transform` instead of values like `x`, `cx` and `r`.

The `<svg>` element itself is the exception. This is an ordinary element in most respects, so normal rules apply, with the exception of `viewBox`, which redraws the contents of the element and is therefore another paint.

## Comparison table

|                     | SMIL              | CSS                       | WAAPI                     | Motion                       |
| ------------------- | ----------------- | ------------------------- | ------------------------- | ---------------------------- |
| Declarative         | Yes               | Yes                       | No                        | Yes, in React                |
| Attributes          | Yes               | No                        | No                        | Yes                          |
| Path morphing       | Yes               | Not in Safari             | Not in Safari             | Yes                          |
| Motion along a path | `<animateMotion>` | `offset-path`             | `offsetDistance`          | `offsetDistance` and `arc()` |
| Springs             | No                | Generated `linear()` only | Generated `linear()` only | Yes                          |
| Scroll-linking      | No                | Scroll timelines          | Scroll timelines          | `scroll()` (cross-browser)   |

## So which method should you use?

In most cases, Motion will perform optimally and give you the maximum flexibility. Learning Motion ensures that you'll never run into a situation where you _can't_ do something, and have to learn an entirely new API just to do it. However, it does come at the cost of including an external library.

If you're byte-constrained, then of course CSS and WAAPI offer a lot of functionality as long as you're willing to stay within the confines of animating CSS styles.
