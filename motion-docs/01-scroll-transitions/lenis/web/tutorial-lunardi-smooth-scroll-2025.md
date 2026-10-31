---
source: https://www.edoardolunardi.dev/blog/building-smooth-scroll-in-2025-with-lenis
title: "Building Smooth Scroll in 2025 with Lenis | Edoardo Lunardi"
fetched: 2026-10-28
---

Edoardo Lunardi

* Home
* Works
* Blog
* Lab
* Awards

Open Menu

Notes

Publications

[![Portrait of Edoardo Lunardi in a black turtleneck against a green background](https://cdn.sanity.io/images/60rvi1lj/production/db451abc27a16f698305dcb56ec920d5a9dc08c8-1566x1566.jpg?w=16&h=16&max-h=3840&max-w=3840&q=85&fit=crop&auto=format)

Edoardo Lunardi](https://www.edoardolunardi.dev/)

[`E`Email](https://www.edoardolunardi.dev/cdn-cgi/l/email-protection#d3bbb6bfbfbc93b6b7bcb2a1b7bcbfa6bdb2a1b7bafdb7b6a5 "hello@edoardolunardi.dev (press E)")

Available

--:--

[VIE]

[22]

Notes

* [A video resolution ladder in Sanity, with a custom field and Cloudflare R2](https://www.edoardolunardi.dev/blog/video-resolution-ladder-in-sanity-with-a-custom-field-and-cloudflare-r2)
* [The Content Architecture IV: Content Primitives](https://www.edoardolunardi.dev/blog/the-content-architecture-content-primitives)
* [The Content Architecture III: Page Composition](https://www.edoardolunardi.dev/blog/the-content-architecture-page-composition)
* [The Content Architecture II: Content Models](https://www.edoardolunardi.dev/blog/the-content-architecture-content-models)
* [The Content Architecture I: CMS Structure](https://www.edoardolunardi.dev/blog/the-content-architecture-cms-structure)
* [Do You Really Need a Site Builder to Edit Your Website?](https://www.edoardolunardi.dev/blog/do-you-really-need-a-site-builder-to-edit-your-website)
* [Building Infinite Scroll in React, without a library](https://www.edoardolunardi.dev/blog/building-infinite-scroll-in-react-without-a-library)
* [Building Smooth Scroll in 2025 with Lenis](https://www.edoardolunardi.dev/blog)
* [Safari 26 and the Strange Case of Fixed Overlays](https://www.edoardolunardi.dev/blog/safari-26-and-the-strange-case-of-fixed-overlays)
* [Modern image lazy loading, with a CSS background placeholder](https://www.edoardolunardi.dev/blog/modern-image-lazy-loading-with-a-css-background-placeholder)
* [Building Drag in React with useDraggable, without a library](https://www.edoardolunardi.dev/blog/building-drag-in-react-without-a-library)
* [Building an Endless Drag Grid in React, without WebGL](https://www.edoardolunardi.dev/blog/building-an-endless-drag-grid-in-react-without-webgl)
* [Writing cleaner React with a tiny utility](https://www.edoardolunardi.dev/blog/writing-cleaner-react-with-a-tiny-utility)
* [Hold the Line](https://www.edoardolunardi.dev/blog/hold-the-line)

Publications

* [Multilingual Sanity Without Weeks of Plumbing: Translate a Whole Site in One Click](https://www.contentarchitecture.dev/blog/multilingual-sanity-translate-with-ai)
* [Beyond the Luminance Ramp: A Shape-Aware ASCII Renderer in Three.js](https://tympanus.net/codrops/2026/09/04/beyond-the-luminance-ramp-a-shape-aware-ascii-renderer-in-three-js/)
* [From Years of Client Work to a Next.js + Sanity Starter Kit](https://tympanus.net/codrops/2026/07/02/from-years-of-client-work-to-a-next-js-sanity-starter-kit/)
* [Your Site Is Invisible to AI Agents (and Your CMS Can Fix It)](https://www.contentarchitecture.dev/blog/serve-content-to-ai-agents-llms-txt-markdown-sanity)
* [Stale Sanity Content in Next.js: The Two Caches and How to Fix Them](https://www.contentarchitecture.dev/blog/stale-sanity-content-nextjs-caching-revalidation)
* [Where Engineering Meets Craft: Edoardo Lunardi’s Obsession with the Details](https://tympanus.net/codrops/2026/04/02/where-engineering-meets-craft-edoardo-lunardis-obsession-with-the-details/)
* [An interview with Edoardo Lunardi](https://okaydev.co/articles/edoardo-lunardi)
* [[Codrops] Infinite Canvas: Building a Seamless, Pan-Anywhere Image Space](https://tympanus.net/codrops/2026/01/07/infinite-canvas-building-a-seamless-pan-anywhere-image-space/)

A collection of stray thoughts, sharp takes, broken drafts, and useful bits. No structure, no promises, no theme. Sometimes code, sometimes not. Just things worth recording.

# Building Smooth Scroll in 2025 with Lenis

[Author]Edoardo Lunardi

[Published]28 Sep 2025

[Reading time]6 min

[Excerpt]

A lightweight smooth scroll engine built on top of scrollTo, not transforms. Lenis normalizes input, keeps native APIs intact, and delivers smooth motion without breaking the platform.

Smooth scrolling has been part of web design for years. Storytelling sites, parallax effects, and immersive layouts all used it to guide focus and create flow.

[Lenis](https://lenis.darkroom.engineering/) has become the go-to smooth scroll library for modern websites. It shows up in portfolios, product pages, and motion-driven experiences everywhere. The effect is easy to recognize, but how it works under the hood is less obvious. Unlike older approaches that fake motion with container transforms, Lenis runs on top of the browser’s native scroll engine.

## How smooth scroll was done in the past

Before Lenis, smooth scrolling was usually faked. A common technique fixed a wrapper and applied transforms each frame. The logic was simple: ease between current and target values, then move the container with CSS.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAcIBf/EACIQAAIBAwQCAwAAAAAAAAAAAAECAwAFEQQGBxIhURM0wf/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECEgP/2gAMAwEAAhEDEQA/AGDJzLs+ORke6RBlOCMGtxuQttrb49a1wUadxkP1PioYhjSXc4SRQytMcg0zuzBNVDk/ElvZlTPgH3ij1a5y6FD0UZFyts6VSY7vGwBxnqaKjKxfSJ9ufyingmj/2Q==)

*-> [Experiment from 2020, with custom smooth scrolling](https://archive-koi.netlify.app/)*

```
// Track positions
let current = 0        // the eased scroll value
let target = 0         // the actual scroll position
const ease = 0.1       // easing factor

// Reference to the wrapper that gets translated
const container = document.querySelector('.scroll-container')

// Sync body height so the browser thinks the page is scrollable
function updateBodyHeight() {
  document.body.style.height = `${container.getBoundingClientRect().height}px`
}

// Listen for scroll and update the target value
window.addEventListener('scroll', () => {
  target = window.scrollY
})

// Animation loop
function loop() {
  const diff = target - current
  current += diff * ease   // ease toward the target

  // Apply transform to simulate scrolling
  container.style.transform = `translate3d(0, -${current}px, 0)`

  requestAnimationFrame(loop)
}

// Init
updateBodyHeight()
window.addEventListener('resize', updateBodyHeight)
loop()
```

1. **Browser scrolls natively** → `scrollY` updates when the user scrolls.
2. **Target is set** → every scroll event assigns `target = window.scrollY`.
3. **Loop eases current toward target** → using `diff * ease`.
4. **Container is moved** → the content wrapper is shifted up with `translate3d`.
5. **Body height fakes the scrollable area** → without it, the browser wouldn’t show scrollbars.

This creates the illusion of smoothness, but it’s a hack: the page never really scrolls, the content is just translated. That’s why things like `position: sticky`, `scroll-snap`, or `IntersectionObserver` break. Popular libraries like [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) and [GSAP](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) built their logic on this same approach, packaging the transform trick into a reusable API.

### The cons of transform-based smooth scroll

* **Accessibility lost:** native search, anchor links, and screen readers broke.
* **Sticky and snap broken:** features like `position: sticky` and `scroll-snap` stopped working.
* **Performance overhead:** large transforms stressed the GPU and lowered frame rate.
* **Maintenance cost:** resize syncing, anchors, and nested scroll containers required extra code.

This worked visually, but it meant breaking the platform in several ways.

## What Lenis actually does

Lenis avoids the wrapper transform trick. Instead, it keeps native scrolling active, then applies a small interpolation layer on top.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKoAAAB//9k=)

*-> [Anuc Home, with Lenis](https://www.edoardolunardi.dev/works/anuc-home)*

### Step 1: Normalize input

Lenis uses a `VirtualScroll` helper to listen to wheel and touch events, normalize them, and emit deltas:

```
this.emitter.emit('virtual-scroll', {
  deltaX: e.deltaX,
  deltaY: e.deltaY,
  event: e,
})
```

This ensures consistent input across trackpads, wheels, and touch devices.

### Step 2: Track state

The instance keeps track of `targetScroll`, `animatedScroll`, velocity, and direction:

```
this.targetScroll = clamp(this.targetScroll + delta, 0, this.limit)
this.velocity = this.targetScroll - this.animatedScroll
```

The browser’s raw scroll is never discarded. Lenis just layers its own easing values on top.

### Step 3: Animate toward the target

On each animation frame, Lenis interpolates toward the target scroll. If `lerp` is provided, it uses linear interpolation. Otherwise, it falls back to duration + easing:

```
value += (to - value) * lerp
```

or

```
progress = easing(elapsed / duration)
value = from + (to - from) * progress
```

### Step 4: Update with scrollTo

This is where everything comes together. Instead of moving wrappers with transforms, Lenis applies the interpolated value directly with native `scrollTo`:

```
this.rootElement.scrollTo({
  top: this.animatedScroll,
  behavior: 'instant',
})
```

This is not a one-time call. It’s the engine. Each animation frame, Lenis runs `scrollTo` again with the eased scroll value, steadily advancing `animatedScroll` toward `targetScroll`. On most browsers this happens at the **refresh rate of the display**: typically 60fps, but up to **120fps or higher** on ProMotion or high-refresh monitors.

👉 This loop of calling `scrollTo` every frame is the essential trick. It’s what makes Lenis smooth while keeping everything native.

Safari introduces a [limitation](https://bugs.webkit.org/show_bug.cgi?id=173434) here: due to the way its compositor thread handles scroll updates, smooth scrolling is capped at **60fps** on desktop Safari and drops to **30fps in Low Power Mode**.

This design still keeps sticky, snap, anchor links, and accessibility intact.

### Step 5: Emit events

Finally, Lenis dispatches its own events with the smoothed values, so developers can hook into them:

```
this.emitter.emit('scroll', {
  animatedScroll: this.animatedScroll,
  velocity: this.velocity,
  direction: this.direction,
})
```

This makes it easy to sync GSAP, WebGL scenes, or any custom animation with the smooth scroll state.

### The pros of this model

* **Native compatibility:** sticky, search, anchors, and accessibility stay intact.
* **Unified inputs:** consistent feel across trackpads, wheels, and touch.
* **Lightweight:** under 4kb, no transforms painted each frame.
* **Animation-ready:** exposes velocity, progress, and direction for effects.
* **Future-proof:** designed for the latest browsers, running entirely on the main thread.

## Usage example

```
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  autoRaf: true,
})

lenis.on('scroll', ({ animatedScroll, velocity }) => {
  console.log(animatedScroll, velocity)
})
```

Manual loop alternative:

```
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

### Gotchas

* Safari caps smooth scroll at 60fps (30fps in low power mode).
* Touch sync on iOS < 16 can behave unexpectedly (pro tip: leave `synchTouch` set to `false`, there is usually no reason to enable smooth scroll on mobile or touch devices).
* Nested scroll containers require proper prevent rules.

## Conclusion

Lenis is everywhere, powering the motion of modern sites, but its mechanism is often misunderstood. It is not translating wrappers, it is not faking scroll. It is a small animation layer built on top of `scrollTo`, keeping the platform intact while exposing smooth, consistent motion.

Many websites already run on Lenis without calling attention to it, because it feels invisible. That is the mark of a good abstraction: it disappears, leaving only the experience.

[Check out Lenis on GitHub](https://github.com/darkroomengineering/lenis)

## Build Notes

Notes on content architecture, frontend systems, and the tools I use in real client work.

No spam. Unsubscribe anytime.

*Enjoyed the read? You can follow me on [LinkedIn](https://www.linkedin.com/in/edoardolunardi/), [X](https://x.com/edo_lunardi) or [Instagram](https://www.instagram.com/edo.tsx/) so you don’t miss future articles.*
