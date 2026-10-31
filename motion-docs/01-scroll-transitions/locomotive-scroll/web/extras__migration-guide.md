---
source: https://scroll.locomotive.ca/docs/extras/migration-guide
title: "Migration Guide: v4 to v5 | Locomotive Scroll Documentation"
fetched: 2026-10-28
---

# Migration Guide: v4 to v5

This guide will help you migrate from Locomotive Scroll v4 to v5. Version 5 is a complete rewrite built on [Lenis](https://github.com/darkroomengineering/lenis), offering better performance, smaller bundle size, and improved TypeScript support.

tip

Locomotive Scroll v5 is simpler and more performant than v4, but it requires some changes to your code. Take your time to understand the new patterns.

## Overview of Changes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#overview-of-changes "Direct link to Overview of Changes")

### What's New[​](https://scroll.locomotive.ca/docs/extras/migration-guide#whats-new "Direct link to What's New")

* **Built on Lenis** — Modern smooth scroll engine instead of Virtual Scroll
* **Smaller Bundle** — 9.4kB (v5) vs ~12.1kB (v4) gzipped
* **TypeScript First** — Fully typed with better autocomplete
* **Simplified API** — Fewer options, clearer patterns
* **Better Performance** — Dual Intersection Observer strategy
* **Custom Scroll Containers** — Support for contained scrolling
* **Native Events** — CustomEvents instead of ModularJS

### What's Removed[​](https://scroll.locomotive.ca/docs/extras/migration-guide#whats-removed "Direct link to What's Removed")

* ❌ **ModularJS support** — Use native CustomEvents instead
* ❌ **`data-scroll-container`** — No longer required
* ❌ **`data-scroll-section`** — No longer needed for performance
* ❌ **Custom scrollbar** — Use Lenis scrollbar or native scrollbar
* ❌ **`data-scroll-sticky`** — Use CSS `position: sticky` instead
* ❌ **`data-scroll-delay`** — No longer available
* ❌ **`data-scroll-direction`** — Parallax follows scroll orientation
* ❌ **`data-scroll-target`** — No longer available

---

## Installation[​](https://scroll.locomotive.ca/docs/extras/migration-guide#installation "Direct link to Installation")

### v4[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4 "Direct link to v4")

```bash
npm install locomotive-scroll@4.1.4
```

### v5[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5 "Direct link to v5")

```bash
npm install locomotive-scroll
```

---

## Basic Setup[​](https://scroll.locomotive.ca/docs/extras/migration-guide#basic-setup "Direct link to Basic Setup")

### v4: Required Container[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-required-container "Direct link to v4: Required Container")

```html
<div data-scroll-container>
    <div data-scroll-section>
        <h1 data-scroll>Hey</h1>
    </div>
</div>
```

```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
});
```

### v5: Simpler Setup[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-simpler-setup "Direct link to v5: Simpler Setup")

```html
<main>
    <h1 data-scroll>Hey</h1>
</main>
```

```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll();
```

info

In v5, smooth scrolling is enabled by default through Lenis. No need for `data-scroll-container` or `data-scroll-section`.

---

## Instance Options[​](https://scroll.locomotive.ca/docs/extras/migration-guide#instance-options "Direct link to Instance Options")

### v4 → v5 Mapping[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4--v5-mapping "Direct link to v4 → v5 Mapping")

| v4 Option | v5 Equivalent | Notes |
| --- | --- | --- |
| `el` | `lenisOptions.wrapper` | Now inside `lenisOptions` |
| `smooth` | ✅ Always enabled | Smooth scrolling is default behavior |
| `direction` | `lenisOptions.orientation` | Values: `'vertical'` or `'horizontal'` |
| `lerp` | `lenisOptions.lerp` | Same concept, inside `lenisOptions` |
| `multiplier` | `lenisOptions.wheelMultiplier` | Renamed for clarity |
| `touchMultiplier` | `lenisOptions.touchMultiplier` | Same, inside `lenisOptions` |
| `class` | ❌ Removed | Use `data-scroll-class` attribute instead |
| `offset` | `triggerRootMargin` | Now uses IntersectionObserver rootMargin format |
| `repeat` | `data-scroll-repeat` | Now per-element attribute |
| `initClass` | ❌ Removed | No longer needed |
| `scrollingClass` | ❌ Removed | Use scroll event to detect scrolling |
| `getDirection` | ✅ Available | Access via `lenisInstance.direction` |
| `getSpeed` | ✅ Available | Access via `lenisInstance.velocity` |
| `scrollbarContainer` | ❌ Removed | Use Lenis scrollbar or native |
| `scrollbarClass` | ❌ Removed | Use Lenis scrollbar or native |

### v4 Example[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-example "Direct link to v4 Example")

```js
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'vertical',
    lerp: 0.1,
    multiplier: 1,
    class: 'is-inview',
    scrollbarClass: 'c-scrollbar',
});
```

### v5 Equivalent[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-equivalent "Direct link to v5 Equivalent")

```js
const scroll = new LocomotiveScroll({
    lenisOptions: {
        orientation: 'vertical',
        lerp: 0.1,
        wheelMultiplier: 1,
    },
});

// Access Lenis directly for more control
console.log(scroll.lenisInstance.direction); // Get direction
console.log(scroll.lenisInstance.velocity); // Get speed
```

---

## Data Attributes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#data-attributes "Direct link to Data Attributes")

### Removed Attributes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#removed-attributes "Direct link to Removed Attributes")

| v4 Attribute | v5 Alternative |
| --- | --- |
| `data-scroll-container` | ❌ Remove it (not needed) |
| `data-scroll-section` | ❌ Remove it (not needed) |
| `data-scroll-sticky` | Use CSS `position: sticky` |
| `data-scroll-delay` | ❌ Not available |
| `data-scroll-direction` | ❌ Follows scroll orientation |
| `data-scroll-target` | ❌ Not available |

### Modified Attributes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#modified-attributes "Direct link to Modified Attributes")

| Attribute | v4 Behavior | v5 Behavior |
| --- | --- | --- |
| `data-scroll-speed` | Parallax effect with arbitrary values | ✅ **Recalculated based on scroll container size** (see details below) |
| `data-scroll-call` | Triggers ModularJS method | Now triggers **native CustomEvent** |
| `data-scroll-offset` | `"bottom,top"` format | ✅ Same format |
| `data-scroll-position` | Based on window position | Now based on **Lenis scroll container** position |

### New Attributes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#new-attributes "Direct link to New Attributes")

| Attribute | Description |
| --- | --- |
| `data-scroll-css-progress` | Adds `--progress` CSS variable (0-1) |
| `data-scroll-event-progress` | Emits progress via CustomEvent |
| `data-scroll-enable-touch-speed` | Enable parallax on touch devices |

---

## Parallax[​](https://scroll.locomotive.ca/docs/extras/migration-guide#parallax "Direct link to Parallax")

### v4[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-1 "Direct link to v4")

```html
<div data-scroll data-scroll-speed="2">Fast parallax</div>
```

### v5[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-1 "Direct link to v5")

```html
<!-- Parallax disabled on touch by default -->
<div data-scroll data-scroll-speed=".5">Fast parallax (desktop only)</div>

<!-- Enable on touch devices -->
<div data-scroll data-scroll-speed=".5" data-scroll-enable-touch-speed>
    Fast parallax (all devices)
</div>
```

Key Changes

1. **Parallax is automatically disabled on touch devices in v5** to use native scrolling. Use `data-scroll-enable-touch-speed` to override this behavior.
2. **Speed calculation completely redesigned** - Now based on scroll container size, not arbitrary values.

### How `data-scroll-speed` Works in v5[​](https://scroll.locomotive.ca/docs/extras/migration-guide#how-data-scroll-speed-works-in-v5 "Direct link to how-data-scroll-speed-works-in-v5")

The parallax calculation has been **completely redesigned** in v5 to be more predictable and based on the scroll container size.

**Formula:**

```text
translateValue = progress × containerSize × speed × -1
```

Where:

* `containerSize` = Height (vertical) or width (horizontal) of Lenis scroll container
* `progress` ranges from `-1` to `1` for normal elements
* `progress` ranges from `0` to `1` for elements visible on page load (in fold)

**Examples:**

With `data-scroll-speed="1"` and vertical scrolling:

* **Normal element**: Moves from `+containerHeight` to `-containerHeight` (total displacement = 2× container height)
* **In-fold element**: Moves from `0` to `-containerHeight` (total displacement = 1× container height)

With `data-scroll-speed="0.5"`:

* **Normal element**: Moves from `+0.5×containerHeight` to `-0.5×containerHeight` (total = 1× container height)
* **In-fold element**: Moves from `0` to `-0.5×containerHeight` (total = 0.5× container height)

With `data-scroll-speed="-1"` (reversed):

* **Normal element**: Moves from `-containerHeight` to `+containerHeight` (opposite direction)

Migration Tip

**v4 to v5 speed conversion:**

* v4 speeds were arbitrary values
* v5 speeds are relative to container size
* Start with smaller values (0.1 to 0.5) and adjust based on container size
* Test with different viewport sizes since it's now proportional

---

## Events & Callbacks[​](https://scroll.locomotive.ca/docs/extras/migration-guide#events--callbacks "Direct link to Events & Callbacks")

### v4: ModularJS Integration[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-modularjs-integration "Direct link to v4: ModularJS Integration")

```html
<div data-scroll data-scroll-call="myMethod, MyModule">Trigger</div>
```

```js
scroll.on('call', (func) => {
    this.call(...func); // ModularJS
});
```

### v5: Native CustomEvents[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-native-customevents "Direct link to v5: Native CustomEvents")

```html
<div data-scroll data-scroll-call="videoTrigger">Trigger</div>
```

```js
window.addEventListener('videoTrigger', (e) => {
    const { target, way, from } = e.detail;
    // way: 'enter' | 'leave'
    // from: 'start' | 'end'

    if (way === 'enter') {
        target.querySelector('video').play();
    }
});
```

Migration Tip

Replace all ModularJS `data-scroll-call` patterns with native CustomEvent listeners. It's simpler and has no dependencies!

---

## Scroll Events[​](https://scroll.locomotive.ca/docs/extras/migration-guide#scroll-events "Direct link to Scroll Events")

### v4[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-2 "Direct link to v4")

```js
scroll.on('scroll', (args) => {
    console.log(args.scroll.y);
    console.log(args.direction);
    console.log(args.speed);
});
```

### v5[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-2 "Direct link to v5")

```js
const scroll = new LocomotiveScroll({
    scrollCallback: ({ scroll, velocity, direction, progress }) => {
        console.log(scroll); // Current scroll position
        console.log(velocity); // Scroll speed
        console.log(direction); // 1 (down/right), -1 (up/left), 0 (stopped)
        console.log(progress); // 0 to 1
    },
});
```

---

## Progress Tracking[​](https://scroll.locomotive.ca/docs/extras/migration-guide#progress-tracking "Direct link to Progress Tracking")

### v4: Using `data-scroll-id`[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-using-data-scroll-id "Direct link to v4-using-data-scroll-id")

```html
<h1 data-scroll data-scroll-id="hero">Hero</h1>
```

```js
scroll.on('scroll', (args) => {
    if (args.currentElements['hero']) {
        let progress = args.currentElements['hero'].progress;
        console.log(progress); // 0 to 1
    }
});
```

### v5: Using Progress Events[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-using-progress-events "Direct link to v5: Using Progress Events")

```html
<h1 data-scroll data-scroll-event-progress="heroProgress">Hero</h1>
```

```js
window.addEventListener('heroProgress', (e) => {
    console.log(e.detail.progress); // 0 to 1
});
```

### v5: Using CSS Variables[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-using-css-variables "Direct link to v5: Using CSS Variables")

```html
<h1 data-scroll data-scroll-css-progress>Hero</h1>
```

```css
[data-scroll-css-progress] {
    opacity: calc(var(--progress) * 1);
    transform: translateY(calc((1 - var(--progress)) * 100px));
}
```

---

## Methods[​](https://scroll.locomotive.ca/docs/extras/migration-guide#methods "Direct link to Methods")

### Updated Methods[​](https://scroll.locomotive.ca/docs/extras/migration-guide#updated-methods "Direct link to Updated Methods")

| Method | v4 | v5 | Notes |
| --- | --- | --- | --- |
| `destroy()` | ✅ | ✅ | Same API |
| `start()` | ✅ | ✅ | Same API |
| `stop()` | ✅ | ✅ | Same API |
| `scrollTo(target)` | ✅ | ✅ | Delegated to Lenis |
| `update()` | ✅ | ❌ Renamed to `resize()` | Manual resize trigger |
| `init()` | ✅ | ❌ Removed | No longer needed |

### v4[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-3 "Direct link to v4")

```js
scroll.update();
scroll.destroy();
scroll.init(); // Reinitialize
```

### v5[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-3 "Direct link to v5")

```js
scroll.resize(); // Rarely needed (auto-synced with Lenis)
scroll.destroy();
// No init() - create new instance instead
```

---

## Sticky Elements[​](https://scroll.locomotive.ca/docs/extras/migration-guide#sticky-elements "Direct link to Sticky Elements")

### v4: Using `data-scroll-sticky`[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-using-data-scroll-sticky "Direct link to v4-using-data-scroll-sticky")

```html
<div data-scroll data-scroll-sticky data-scroll-target="#target">
    Sticky element
</div>

<div id="target">Target</div>
```

### v5: Use CSS `position: sticky`[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-use-css-position-sticky "Direct link to v5-use-css-position-sticky")

```html
<div class="sticky-element">Sticky element</div>
```

```css
.sticky-element {
    position: sticky;
    top: 0;
}
```

Why?

CSS `position: sticky` is performant, native, and doesn't require JavaScript. v5 removed custom sticky implementation in favor of the native solution.

---

## Custom Scroll Containers[​](https://scroll.locomotive.ca/docs/extras/migration-guide#custom-scroll-containers "Direct link to Custom Scroll Containers")

### v4: Not Supported[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-not-supported "Direct link to v4: Not Supported")

In v4, you could only do full-page scrolling.

### v5: Fully Supported[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-fully-supported "Direct link to v5: Fully Supported")

```js
const scroll = new LocomotiveScroll({
    lenisOptions: {
        wrapper: document.querySelector('.scroll-container'),
        content: document.querySelector('.scroll-content'),
    },
});
```

```html
<div class="scroll-container" style="height: 100vh; overflow: hidden;">
    <div class="scroll-content">
        <div data-scroll data-scroll-speed="0.5">Parallax works here too!</div>
    </div>
</div>
```

---

## Performance Improvements[​](https://scroll.locomotive.ca/docs/extras/migration-guide#performance-improvements "Direct link to Performance Improvements")

### v4 Performance Patterns[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v4-performance-patterns "Direct link to v4 Performance Patterns")

```html
<!-- Recommended: Split into sections for better performance -->
<div data-scroll-container>
    <div data-scroll-section>
        <!-- Content here -->
    </div>
    <div data-scroll-section>
        <!-- More content -->
    </div>
</div>
```

### v5 Performance (Automatic)[​](https://scroll.locomotive.ca/docs/extras/migration-guide#v5-performance-automatic "Direct link to v5 Performance (Automatic)")

v5 uses a **dual Intersection Observer strategy** that automatically optimizes performance:

* **Trigger IO** — For simple in-view detection (classes, callbacks)
* **RAF IO** — For continuous animations (parallax, progress)

Elements only subscribe to RAF when:

1. They're **visible** (detected by IO)
2. They need **continuous updates** (parallax, progress tracking)

**No manual optimization needed!**

---

## Complete Migration Checklist[​](https://scroll.locomotive.ca/docs/extras/migration-guide#complete-migration-checklist "Direct link to Complete Migration Checklist")

### HTML Changes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#html-changes "Direct link to HTML Changes")

* Remove all `data-scroll-container` attributes
* Remove all `data-scroll-section` attributes
* Remove `data-scroll-sticky` → use CSS `position: sticky`
* Remove `data-scroll-delay` → no replacement
* Remove `data-scroll-direction` → follows scroll orientation
* Remove `data-scroll-target` → no replacement
* Update ModularJS `data-scroll-call` → use simple event names
* Consider adding `data-scroll-enable-touch-speed` for mobile parallax

### JavaScript Changes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#javascript-changes "Direct link to JavaScript Changes")

* Remove `el` option → use `lenisOptions.wrapper` if needed
* Remove `smooth` option → always enabled
* Rename `direction` → `lenisOptions.orientation`
* Move scroll options into `lenisOptions` object
* Replace `scroll.on('call', ...)` → `window.addEventListener(eventName, ...)`
* Replace `scroll.on('scroll', ...)` → `scrollCallback` option
* Replace `scroll.update()` → `scroll.resize()` (rarely needed)
* Remove `scroll.init()` → recreate instance instead
* Remove custom scrollbar code → use native or Lenis scrollbar

### CSS Changes[​](https://scroll.locomotive.ca/docs/extras/migration-guide#css-changes "Direct link to CSS Changes")

* Remove locomotive-scroll v4 CSS
* Add locomotive-scroll v5 CSS (minimal)
* Replace sticky elements → use `position: sticky`
* Update any custom scrollbar styles → use Lenis scrollbar

---

## Example: Complete v4 to v5 Migration[​](https://scroll.locomotive.ca/docs/extras/migration-guide#example-complete-v4-to-v5-migration "Direct link to Example: Complete v4 to v5 Migration")

### Before (v4)[​](https://scroll.locomotive.ca/docs/extras/migration-guide#before-v4 "Direct link to Before (v4)")

```html
<div data-scroll-container>
    <div data-scroll-section>
        <h1 data-scroll data-scroll-id="hero">Hero</h1>
        <div data-scroll data-scroll-speed="2">Parallax</div>
        <div data-scroll data-scroll-call="videoPlay, VideoModule">Video</div>
        <div data-scroll-sticky data-scroll-target="#end">Sticky</div>
    </div>
    <div id="end" data-scroll-section>End</div>
</div>
```

```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'vertical',
    lerp: 0.1,
    class: 'is-inview',
});

scroll.on('scroll', (args) => {
    if (args.currentElements['hero']) {
        console.log(args.currentElements['hero'].progress);
    }
});

scroll.on('call', (func) => {
    this.call(...func); // ModularJS
});
```

### After (v5)[​](https://scroll.locomotive.ca/docs/extras/migration-guide#after-v5 "Direct link to After (v5)")

```html
<main>
    <h1 data-scroll data-scroll-event-progress="heroProgress">Hero</h1>
    <div data-scroll data-scroll-speed="2">Parallax</div>
    <div data-scroll data-scroll-call="videoPlay">Video</div>
    <div class="sticky">Sticky</div>
    <div>End</div>
</main>
```

```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    lenisOptions: {
        orientation: 'vertical',
        lerp: 0.1,
    },
    scrollCallback: ({ scroll, velocity, direction, progress }) => {
        // Global scroll callback if needed
    },
});

// Progress tracking
window.addEventListener('heroProgress', (e) => {
    console.log(e.detail.progress);
});

// Video callback
window.addEventListener('videoPlay', (e) => {
    const { target, way } = e.detail;
    if (way === 'enter') {
        target.querySelector('video').play();
    }
});
```

```css
.sticky {
    position: sticky;
    top: 0;
}
```

---

## Need Help?[​](https://scroll.locomotive.ca/docs/extras/migration-guide#need-help "Direct link to Need Help?")

* Check the [documentation](https://scroll.locomotive.ca/docs/documentation/options) for full API reference
* Review [examples](https://scroll.locomotive.ca/docs/examples) for common patterns
* Open an issue on [GitHub](https://github.com/locomotivemtl/locomotive-scroll/issues) for bugs

**Happy scrolling with v5! 🚀**
