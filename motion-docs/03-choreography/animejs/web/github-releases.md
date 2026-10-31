---
source: https://api.github.com/repos/juliangarnier/anime/releases?per_page=40
title: "GitHub releases juliangarnier/anime"
fetched: 2026-10-28
---

# GitHub releases: juliangarnier/anime

## v4.5.0 (2026-06-22)

## New Features

- **Adapters**
  - New `registerAdapter()` API to extend `animate()` and `utils.set()` to non-DOM targets (learn more: https://animejs.com/documentation/adapters)
- **Three.js adapter**
  - New built-in three.js adapter, imported as a side-effect from `animejs/adapters/three`, to animate `Object3D`, materials, lights, cameras, audio nodes, `UniformNode` (TSL) and instanced meshes (learn more: https://animejs.com/documentation/adapters/three)
- **Stagger**
  - Auto-grid mode now supports 3D layouts, using `{x, y, z}` coordinates or an explicit `grid: [columns, rows, depth]` triplet
  - The `from` parameter now accepts `[x, y, z]` normalized coordinates and `axis` now accepts `'z'` for 3D grid origins
  - New `jitter` parameter to add a random offset to staggered values, either a single number or a `[start, end]` range
  - New `seed` parameter to make `jitter` and `from: 'random'` reproducible

## Bug Fixes and improvements
- **Color**
  - Color animations now blend RGB channels in pseudo-linear space for smoother, more even transitions (intermediate colors differ slightly from previous versions)
- **Render**
  - Fix a flicker that could appear randomly between iterations of reversed loops
  - Fix a flicker that could appear randomly on alternate loops when using non-integer duration values
- **Timeline**
  - Fix a backward seek leaving a timeline child stuck at its end value when all its properties share the same delay
  - Fix a timeline child whose delay is longer than its duration overwriting a later sibling's value on a forward seek
  - Fix stale values when seeking a timeline whose children animate the same property through delayed tweens, most visible with staggered `jitter` delays
  - Fix an implicit `from` value resolving to a stale value when an overridden tween sits earlier in the chain
  - Improve performance when building large timelines with many overlapping `.add()` calls on the same property, and fix a case where such a timeline could cancel itself
- **Keyframes**
  - Fix a floating point precision issue producing incorrect intermediate values in keyframe arrays
  - Fix scrubbing backward past the start of a keyframe sequence not restoring the first keyframe's `from` value
  - Fix scrubbing forward past the end of a keyframe sequence leaving the target stuck on a previous keyframe's value
  - Fix sequential keyframes occasionally detected as overlapping because of floating point drift, leaving the target stuck on the wrong value when scrubbing
- **Animation**
  - Fix function-based and CSS variable `from` values in object form (`{ from, to }`) not re-resolving on `refresh()`
  - Fix `stretch()` not correctly scaling animations that use keyframes
- **Scroll**
  - Fix a `getBoundingClientRect` crash that could happen when a scroll container resized before its target was ready
- **Engine**
  - More accurate frame scheduling that no longer drops frames arriving slightly early because of `requestAnimationFrame` jitter
  - Faster `engine.speed` and `engine.timeUnit` updates that skip unnecessary work when the value does not actually change

## v4.4.1 (2026-04-30)

## Bug fix

* Fix a regression introduced in `4.4.0` with timeline `.call()` not triggering properly in some cases.

## v4.4.0 (2026-04-29)

## Breaking Changes

- **Transforms**
  - Transforms now follow a fixed render order (`perspective` > `translate` > `rotate` > `scale` > `skew`), regardless of the order they are defined in animation parameters:
    ```js
    // Before: scale rendered first because it was defined first
    animate(el, { scale: 2, translateX: 100 }) // → scale(2) translateX(100px)
    // After: order is always fixed
    animate(el, { scale: 2, translateX: 100 }) // → translate(100px, 0px) scale(2)
    ```
  - `matrix` and `matrix3d` can no longer be animated directly (they are still preserved when read from inline styles and can be set using transform: 'matrix(...)')
- **Function-based values**
  - The third argument of function-based value callbacks changed from `total` (Number) to `targets` (Array). To migrate, replace `total` with `targets.length`:
    ```js
    // Before
    translateX: (target, index, total) => total * 10
    // After
    translateX: (target, index, targets) => targets.length * 10
    ```
  - A fourth argument `prevTween` is now passed to function-based value callbacks, providing access to the previous sibling tween's computed end value for the same target and property.
- **Stagger**
  - The stagger callback signature changed to match function-based values: the third argument is now the `targets` array instead of the total count:
    ```js
    // Before
    delay: stagger(100, { use: (target, i, total) => total - i })
    // After
    delay: stagger(100, { use: (target, i, targets) => targets.length - i })
    ```

## New Features

- **scrambleText**
  - New `scrambleText()` function-based value to animate text with a character-by-character scramble/reveal effect (learn more: https://animejs.com/documentation/text/scrambletext)
- **Stagger**
  - New `grid: true` auto-grid mode that computes a 2D layout from element positions or JS object coordinates (`{x, y}`) instead of requiring explicit `[columns, rows]` dimensions
  - The `from` parameter now accepts `[x, y]` normalized coordinate arrays (0 to 1) for precise grid origin control
- **Timer / Animation / Timeline**
  - New `priority` parameter to control execution order within the engine tick loop
- **Transforms**
  - Adjacent axis properties are now grouped into CSS shorthand for shorter transform strings:
    - `translateX` + `translateY` → `translate(x, y)`
    - `translateX` + `translateY` + `translateZ` → `translate3d(x, y, z)`
    - `scaleX` + `scaleY` → `scale(x, y)`
    - `scaleX` + `scaleY` + `scaleZ` → `scale3d(x, y, z)`
  - Inline transform parsing rewritten to properly handle multi-argument CSS functions (`translate(x, y)`, `scale3d(x, y, z)`) and nested `calc()` expressions
- **Layout**
  - `createLayout()` now accepts an `id` parameter
- **Exports**
  - `globals` is now exported from the main module entry point
  - `forEachChildren`, `addChild`, `removeChild` helpers are now exported from `utils`

## Bug Fixes and improvements

- **JS Animation**
  - `revert()` now restores object properties and DOM attributes to their original pre-animation values, in addition to CSS styles and transforms (previously only CSS styles and transforms were reverted, leaving animated object props and attributes at their last animated value). The public `cleanInlineStyles()` utility keeps its original behavior and only clears inline styles and transforms.
  - Fix `getOriginalAnimatableValue` not storing the original inline value for object properties and DOM attributes, preventing proper revert
- **morphTo**
  - Fix chaining in keyframe arrays and timelines producing incorrect intermediate shapes
- **Chainable utils**
  - Fix accessing non-existent chainable methods throwing an error instead of returning `undefined`
- **splitText**
  - Fix `addEffect()` returning `undefined` instead of `this` when the effect argument is not a function
- **Layout**
  - Fix scroll-controlled layout animations not properly calling `onComplete` and `onPause` callbacks
- **keepTime**
  - Fix `_startTime` not being preserved when reconstructing tracked animations, causing timing jumps on effect refresh

## Changes

- **Engine**
  - DevTools integration (`AnimeJSDevTools`) removed
  - Render loop performance: inline closures in `tick()` and `render()` extracted to module-scope functions to avoid allocation every frame
  - Tween composition is now resolved before computing `to`/`from`/`duration`/`delay` values, so the previous sibling tween is available to function-based value callbacks
- **splitText**
  - Type annotation for `splitText()` and `TextSplitter` target parameter widened from `HTMLElement` to `Element`
- **Tween value chaining**
  - Each tween now pre-computes and stores its end value at construction time
  - Enables function-based values like `morphTo` and `scrambleText` to read the previous tween's end value when used in keyframe arrays or timelines
- **morphTo**
  - Now properly chains in keyframe arrays and timelines by reading the previous tween's computed end value instead of mutating the target element with a Symbol
- **Editor integration (👀)**
  - New `globals.editor` hook system allowing an external editor to intercept `animate()` and `createTimeline()` calls

## v4.3.6 (2026-02-13)

## Bug Fixes
- **Auto Layout**
  - Fix auto layout not properly synced with onScroll, allowing controlling layout animations like this:
```js
layout.animate({
  autoplay: onScroll({
    sync: true,
  })
});
```

## v4.3.5 (2026-01-25)

## Bug Fixes
- **Auto Layout**
  - Fix a regression introduced in v4.3.2 that prevented inline element to be animated in some cases.
- **Animation**
  - Fix a regression introduced in v4.3.0 that prevented CSS computed style of `background` to be correctly interpreted as a color value (#1136).

## v4.3.4 (2026-01-23)

## Improvements
- **WAAPI / Timeline**
  - Synced WAAPI animations now automatically have their `persist` property set to `true` (#1121)

## Bug Fixes
- **onScroll**
  - Fix comment syntax potentially causing an error (#1124)

## v4.3.3 (2026-01-22)

## Improvements

- **Refresh**
  - Function-based "from" values now refresh correctly when calling `.refresh()`
  - Unit conversion (e.g., `svh` to `rem`) is recalculated on refresh

- **onScroll**
  - Add `onResize` callback that triggers when the scroll container refreshes due to a resize event

## Documentation

- **Playback**
  - Add missing `tl.backward` / `anim.backward` / `time.backward` property doc

- **Easing**
  - Add an opacity animation preview to the easing functions editor

## v4.3.2 (2026-01-22)

## Bug Fixes
- **Layout**
  - Fix an issue where inline tags, like <span> or <strong> weren't detected when surrounded by comments (again)

## v4.3.1 (2026-01-21)

## Bug Fixes
- **Layout**
  - Fix an issue where inline tags, like <span> or <strong> weren't detected when surrounded by comments

## v4.3.0 (2026-01-20)

## New Features
- **AutoLayout**
  - New `createLayout()` method to easily animate between two layout states (learn more about layouts here:  https://animejs.com/documentation/layout)
- **Easings**
  - The `ease` parameter now accepts function-based values (like `duration` and `delay` properties)
- **Timeline**
  - Add `composition` parameter to disable animation composition when using `.add()` and greatly improve performance

## Bug Fixes
- **JS Animation**
  - Fix an issue where complex values containing a color (e.g., `box-shadow`) would be incorrectly handled as color values instead of complex string values
- **WAAPI**
  - Fix animations not being properly removed from `document.timeline` in some cases
- **Draggable**
  - Fix spring parameters not properly setting the duration
- **Timeline**
  - Fix spring easing being ignored when defined in the `defaults` parameter
  - Fix `.call()` and `.sync()` incorrectly inheriting `delay` from `defaults` parameters
- **splitText**
  - Fix a bug where the first word of the second line could be incorrectly added to the first line
  - Fix unnecessary empty spaces not being properly removed from lines

## Changes
- **Engine**
  - Increase max fps to 240 (previously 120)
  - **Animation / Timer / Timeline**
  - Add `muteCallbacks` parameter to `.complete(muteCallbacks)` to complete the animation without triggering callbacks

## v4.2.2 (2025-10-07)

## Fixes
* **SVG**
  * `createMotionPath()`: Fix a bug introduced in `v4.2.1` that wrapped the target back to 0 when reaching 1 (#1104
)

## v4.2.1 (2025-10-05)

## New features
- **SVG** 
  - `createMotionPath()`: Add an offset parameter (#1037) (@TheHyrox)
- **Draggable** 
  - `createDraggable()`: Add a `dragThreshold` parameter (#1091) (@craig-jennings)

## Changes
- **Timer**, **Animation**, **Timeline** 
  - `.reset(softReset)`: The `softReset` parameter type is now a `Boolean` instead of an int
- **Draggable** 
  - `createDraggable()`: The drag threshold is now 3px with a mouse and 7px with touch instead of 3px everywhere
    
## Fixes
- **onScroll**
  - Fix wrong target offsets calculation when container is scaled (#1098) (@sxnb)
- **Types**
  - Fix await `animate()` throwing Typescript error (#1043)
  
## Docs
- Every demos can now be edited on CodePen
- Added `.reset()` chapters

## v4.2.0 (2025-09-29)

## Breaking Changes
- **Utils**
  - Remove `interpolate()` (use the simplified `lerp()` instead)
  - Remove the clock parameter from `lerp()` (use the framerate dependent damping function `damp()` instead)
  - Setting a CSS variable using `utils.set()` now computes the variable value instead of setting the var name. To set the variable name without conversion, use a function-based value (`x: () => var(--value)`) or use the native `element.style.setProperty('--value')`
- **Easings**
  - `linear()`, `irregular()`, `steps()` and `cubicBezier()` have been removed from the core and must be imported separately

## New Features
- **API**
  - All modules can now be imported individually with subpaths:
```js
import { animate } from 'animejs/animation';
import { createTimer } from 'animejs/timer';
import { createTimeline } from 'animejs/timeline';
import { createAnimatable } from 'animejs/animatable';
import { createDraggable } from 'animejs/draggable';
import { createScope } from 'animejs/scope';
import { engine } from 'animejs/engine';
import * as events from 'animejs/events';
import * as easings from 'animejs/easings';
import * as utils from 'animejs/utils';
import * as svg from 'animejs/svg';
import * as text from 'animejs/text';
import * as waapi from 'animejs/waapi';
```
- **Spring**
  - Add `bounce` parameter to control the strength of the spring
  - Add `duration` parameter to define the perceived duration of the spring
  - Add `onComplete` callback called when the spring currentTime hits the perceived duration
  - Support for over-damped springs with stiffness values below 30 (previously these values had no effect)
- **WAAPI** 
  - `waapi.animate()` built-in eases are now on par with the JS `animate()` method, plus all native WAAPI easing parameters
  - Add `persist` parameter to control whether the animation should be canceled on finish
- **JS Animation**
  - Add support for CSS variable values (e.g., `animate(target, { x: 'var(--x, 100px)' })`)
- **Utils**
  - Add `createSeededRandom()` to generate pre-seeded pseudo-random utility functions
- **Docs**
  - Add an [easing functions editor](https://animejs.com/easing-editor)

## Bug Fixes
- **Draggable**
  - Allow touch dragging within Shadow DOM (#1067)
  - Fix draggable getting stuck while dragging near the origin of the initial grab
- **Animation**
  - Fix `animation.revert()` not properly reverting multi-target animations styles when targets have different starting style values
  - Fix inline styles with hyphens (e.g., `border-radius`, `stroke-width`) not being properly reverted
- **WAAPI**
  - Fix `animation.cancel()` not properly committing styles before canceling
  - Fix `animation.revert()` not properly reverting multi-target animation styles and not overriding newly added styles
  - Fix scroll-controlled WAAPI animations being disconnected after completing once
  - Fix staggered animations with `reversed: true` not updating on play
- **Timeline**
  - Fix `tl.call()` not being fired in some cases (#1088)

## Changes
- **Utils**
  - `stagger()` has been moved to `/utils` but still available globally via `import { stagger } from 'animejs'`
- **WAAPI**
  - `waapi.convertEase()` values are now rounded to 4 decimals (previously no rounding)
- **Spring**
  - `mass` minimum value is now clamped to 1
  - `stiffness` minimum allowed value is now 0
  - `damping` minimum allowed value is now 0
- **Easings**
  - `Ease Back` default overshoot value is now 1.7 (previously 1.70158)
- **Types**
  - Add `@types/node` dependency for type checking (#1069)
- **Build**
  - Simplify build scripts: `build`, `dev`, `dev:test`, `test:browser`, `test:node`, `open:examples`

## Deprecated
- **Text**
  - `text.split()` deprecated, use `splitText()` or `text.splitText()` instead
- **Spring**
  - `createSpring()` deprecated, use `spring()` instead

## v4.1.4 (2025-09-22)

## Bug fixes
- [Scroll] Fixes a bug where onEnter could be called even if the target is outside of the viewport if an other onScroll instance is already running

## v4.2.0-beta.0 (2025-08-26)

## New Features
- [API] All `utils`, `svg`, `text` and `eases` objects and methods are now exported by the main module:
  - `import { animate, clamp, inOut, splitText, morphTo } from 'animejs'`
- [API] All modules can now be imported individually:
  - `import { animate } from 'animejs/animation'`
  - `import { createTimer } from 'animejs/timer'`
  - `import { createTimeline } from 'animejs/timeline'`
  - `import { createAnimatable } from 'animejs/animatable'`
  - `import { createDraggable } from 'animejs/draggable'`
  - `import { createScope } from 'animejs/scope'`
  - `import { onScroll } from 'animejs/events'`
  - `import { createSpring } from 'animejs/spring'`
  - `import { engine } from 'animejs/engine'`
  - `import * as easings from 'animejs/easings'`
  - `import * as utils from 'animejs/utils'`
  - `import * as svg from 'animejs/svg'`
  - `import * as text from 'animejs/text'`
  - `import * as waapi from 'animejs/waapi'`
- [Utils] Add `createSeededRandom()` to generate pre-seeded pseudo-random functions
- [Utils] Add `damp()` utils to replace `lerp(start, end, amount, clock)`

## Breaking Changes
- [Utils] Remove the clock parameter from `lerp()` (use the framerate dependent damping function `damp()` instead)
- [Utils] Remove `interpolate()` (use the simplified `lerp()` instead)
- [Bundle] Replace `lib/` with `dist/bundles/` and `dist/modules/`
- [Bundle] Remove `lib/anime.iife.min.js` (use `dist/bundles/anime.umd.min.js` instead)

## Bug Fixes
- [Draggable] Fix touch dragging with Shadow DOM support (#1067) @wessmeister
- [Types] Add @types/node dependency for type checking (#1069) @Yukiniro

## Changes
- [Utils] `stagger()` has been moved to `/utils`, still available globally via `import { stagger } from 'animejs'`
- [Build] Simplify build scripts: `build`, `dev`, `dev:test`, `test:browser`, `test:node`, `open:examples`

## Deprecated
- [Text] `text.split()` deprecated, use `splitText()` instead


You can test it with
```
npm install animejs@beta
```

## v4.1.3 (2025-08-12)

## Improvements
- Increase spring stiffness and velocity limits (#1039, #1040) @lixiaolin94

## Bug fixes
- [Scroll] Fixes threshold with transforms on parent (#1059) @almirbi
- [Targets, Text] Fix non-browser usage (#1056) @ClassicOldSong
- [Draggable] Fix Draggable's `onUpdate` and `onSettle` callbacks not triggered when only updating the x axis (#1045)
- [Draggable] Prevents error when removing the draggable container element from the DOM (#1064)
- [Animatable] Fix callbacks triggered multiple times by setting the callbacks to a dedicated Animation instead of applying them to each individual property animations
- [Animation] Fix tweens composition inconsistencies on tweens with `composition: 'replace'` not controlled by a Timeline
- [Animation] Fix some time calculation inconsistencies when using seconds `engine.timeUnit = 's'` that affected tweens composition

## Types

- [WAAPI] Added missing `WAAPIAnimation` type to the `Revertible` type
- [Stagger] The `stagger()` function return type is now inferred from the input value type
- [Eases] Fix the error "A rest parameter must be of an array type." of the linear easing type (#972)
- Export the following missing types (#1051, #1010):
  - `SpringParams`
  - `TimelinePosition`
  - `TimelineAnimationPosition`
  - `WAAPITweenValue`
  - `WAAPIFunctionValue`
  - `WAAPIKeyframeValue`
  - `WAAPICallback`
  - `WAAPITweenOptions`
  - `WAAPIAnimationOptions`
  - `WAAPIAnimationParams`
  - `ScrollThresholdValue`
  - `ScrollThresholdParam`
  - `ScrollObserverAxisCallback`
  - `ScrollThresholdCallback`
  - `ScrollObserverParams`

## v4.1.2 (2025-07-27)

## Bug fixes

- [Timeline] Fix `onComplete` callback not called on reversed timelines (#378)
- [Scroll] Fix `onScoll()` not properly handling SVG targets by using `getBoundingClientRect()` for size and offset calculation instead of `offsetTop` / `offsetLeft` (#1021)
- [Animation] Fix relative values (+=, -=, *=) not properly refreshed when calling `animation.refresh()` (#1025)
- [Draggable] `draggable.disable()` now properly disable the drag without interrupting animations. The old behavior is still possible by chaining methods like this `draggable.disable().stop()`
- [Draggable] Fix an issue where the internal ResizeObserver won't be properly disconnected on revert (#1041)
- [Draggable] Draggable onUpdate is now only called when the draggable position change (#1032)
- [Docs] Clarify limitations of composition: "blend" with `.reverse()` and other parameters (#1012)

## v4.1.1 (2025-07-24)

## Bug fixes

### TextSplitter

- Fix a bug where the cleanup function returned by `split.addEffect()` was called after the split html reset when using `.refresh()`

## Docs

- Tweak morphTo description #1049
- Add missing `utils` import in Stagger grid axis #1048

## v4.1.0 (2025-07-23)

# Breaking changes

## Types

- `StaggerParameters` → `StaggerParams`

# New Features

## `text.split()`
The major new feature of this release is the new `text.split()` method, an easy to use, fully-featured, lightweight and performant modern text splitter for JavaScript.

It does all the following in only **7KB**:
- Split text by characters, words, and lines
- Split words in languages that don't use spaces like Chinese and Japanese
- Can split trough any level of nested tags, even when splitting by lines
- Element cloning with configurable position
- Custom wrapping methods to create masking effects
- Custom HTML wrapper with a powerful templating system
- Handles splitting ѕρє¢ιαℓ ¢нαяα¢тєяѕ and emojis
- Accessible for screen readers
- 100% responsive with the `.addEffect()` method

### Basic Usage
```javascript
import { text, animate } from 'animejs';

const split = text.split('.my-text');

animate(split.words, {
  x: () => utils.random(-100, 100),
  y: () => utils.random(-100, 100)
});

```

Check out the full documentation for text.split() here http://animejs.com/documentation/text/split

## New `Scope` methods

### `scope.addOnce()`
Adds a constructor to a Scope that is only called once, allowing you to execute code once and add scoped animations that won't be reverted between media query changes.

### `scope.keepTime()`
Adds a constructor `Function` that recreates a Timer, Animation, or Timeline between media query changes while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

Check out the full documentation for text.split() here http://animejs.com/documentation/scope/scope-methods/addonce

## New `utils` methods

### `utils.keepTime()`

Returns a `Function` that recreates a `Timer`, `Animation`, or `Timeline` while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
const trackedAnimate = utils.keepTime(() => animate(target, params));

const tracked = trackedAnimate();
```

## New `stagger()` settings

### `use` and `total` parameters

The new `use` and `total` parameters allow defining custom staggering order:

```js
const split = text.split('article', { lines: true });

// Animate the words with a stagger based on the lines order

animate(split.words, {
  y: () => utils.randomPick(['-100%', '100%']),
  delay: stagger(100, {
    use: 'data-line',
    from: 'last',
    total: split.lines.length
  })
})
```

### Random `from` parameter

You can now define `'random' to the `from` parameter of the `stagger()`` function to define a random staggered order:

```js
const split = text.split('article');

animate(split.words, {
  y: () => utils.randomPick(['-100%', '100%']),
  delay: stagger(100, { from: 'random' })
})
```

# Improvements and bug fixes

## Animation, Timer, Timeline

- Make sure `.refresh()` only updates the `fromNumbers` value when the value is defined as a function based value
- Improves startup performance on first load
- Improves tree shaking

# Docs

- Various bug fixes, copy and design tweaks

## v4.0.2 (2025-04-24)

## Fixes

### Timer
* Fixes floating point inaccuracies with `.stretch()`. (#1005)

### SVG
* Fixes `stroke-linecap` defined in a stylesheet overriding attributes defined by`createDrawable()` . (#1002)
* Fixes `createDrawable()` line effect issues when the attribute / property `vector-effect` is set to `"non-scaling-stroke"`. (#793)

### WAAPI
* Fixes a Promise issue with WAAPI animations when the `complete()` method is called before the animation plays. (#1001)
* Prevents conflicts between user defined CSS Custom Properties and the WAAPI `animate()` properties. (#1000)
* Fixes a caching issue that prevented to use different parameters for the same easing function. (#999)

### Draggable
* Fixes `.revert()` not properly reverting the draggable internal `Animatable`, keeping the x and y styles defined. (#997)
* Fixes `onSettle()` triggering on the `onComplete` callback of the x property, before the y property has updated, causing the draggable to sometimes not go back to its initial position. (#997)

### Types
* Added Draggable params to exported types #969 by @AdeboyeDN. (#1004)

## v4.0.1 (2025-04-09)

## Fixes

* Fix `createScope` root param type for `ReactRef` (#971) thanks @Jimmydalecleveland

## v4.0.0 (2025-04-03)

**A complete rewrite of Anime.js, with a modular, ESM-first API, improved performance, and TONS of new features.**

> [!TIP]
If you're migrating from v3, check out the [migration guide](https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4).

https://github.com/user-attachments/assets/9b3ebe57-c75b-440f-877f-53d35e14804a

## [Timer](https://animejs.com/documentation/timer)

`createTimer(options)`

Schedules and controls timed function callbacks that can be used as a replacement to `setTimeout()` or `setInterval()`, keeping animations and callbacks in sync.
This is the base class that both Animation and Timeline inherit from.

- Properties: `duration`, `delay`, `loop`, `loopDelay`, `frameRate`, `playbackRate`
- Methods: `play()`, `pause()`, `resume()`, `restart()`, `cancel()`, `seek()`, `stretch()`, `then()`

## [Animation](https://animejs.com/documentation/animation)

`animate(targets, options)`

### New parameters:
- New Object syntax, with `from` parameter `{ from: .5, to: .5, ease: 'inOut(3)' }`
- `playbackEase`: Apply easing to overall animation progress
- `composition`: Control how animations interact with existing ones:
  - `"replace"`: Override existing animations (default)
  - `"blend"`: Combine additively with existing animations
  - `"none"`: Run independently without affecting others
- `modifier`: Function to transform animation values during render
- `frameRate`: Control the max fps of the animation
- `keyframes`: More flexible keyframes system with four different syntaxes:
  - Tween value keyframes
  - Tween parameters keyframes
  - Duration-based keyframes
  - Percentage-based keyframes

### Improvements
- Added support for CSS variables
- Added support for hex colors with an alpha channel, e.g., '#F443' or '#FF444433'.

### New callbacks:
- `onBeforeUpdate`: Called before each animation update
- `onRender`: Triggered when animation values are updated and applied
- `onLoop`: Triggered when animation completes an iteration
- `onPause`: Called when animation is paused, either manually or when interrupted by an other animation

### New methods:
- `refresh()`: Update all function-based values with new states
- `revert()`: Restore all animated properties to their original values
- `complete()`: Immediately complete the animation
- `stretch(newDuration)`: Scale animation to new duration
- `then(callback)`: Simpler Promise handling

## [Timeline](https://animejs.com/documentation/timeline)

`createTimeline(options)`

Better children defaults definition with a dedicated `defaults` parameter.
Children loop and direction parameters are now correctly taken into account, and will be counted in the total duration of the timeline, allowing seeking trough the different iterations.

### New methods:
- `set(target, params, position)`: Set properties instantly at position
- `call(function, position)`: Execute callback at timeline position
- `sync(animation, position)`: Synchronize external animation with timeline
- `label(name, position)`: Create named markers for referencing
- `remove(targets, propertyName)`: Remove specific animations
- `refresh()`: Update all function-based values

### New position syntax:
- Label references: `"labelName"`
- Previous animation references: `"<"` (end) and `"<<"` (start)
- Relative positions: `"+=100"`, `"-=50"`, `"*=1.5"`

## [Animatable](https://animejs.com/documentation/animatable)

`createAnimatable(target, properties)`

Efficiently animates target properties, making it an ideal replacement for `[animate()](https://animejs.com/documentation/animation)` and `[utils.set()](https://animejs.com/documentation/utilities/set)` in situations where values change frequently, such as cursor events or animation loops.

## [Draggable](https://animejs.com/documentation/draggable)

`createDraggable(target, options)`

Adds draggable capabilities to DOM Elements with physics, constraints, and callbacks.

## [ScrollObserver](https://animejs.com/documentation/scroll)

`onScroll(options)`

Triggers and synchronises Timer, Animation and Timeline instances on scroll.

## [Scope](https://animejs.com/documentation/scope)

`createScope(options)`

Anime.js instances declared inside a Scope can react to media queries, use custom root elements, share default parameters, and be reverted in batch, streamlining work in responsive and component-based environments.

## [SVG](https://animejs.com/documentation/svg)

`svg`

Enhanced SVG animation helpers.

### New methods:
- `morphTo(path, precision)`: Shape morphing between SVG paths
- `createMotionPath(path)`: Move elements along SVG paths
- `createDrawable(selector, start, end)`: Control SVG path drawing

## [Stagger](https://animejs.com/documentation/stagger)

`stagger(options)`

The `stagger()` function can now be used as a Timeline time position.

## [Utils](https://animejs.com/documentation/utilities)

`utils`

Utility functions for DOM manipulation, math operations, and animation helpers, that can be easily chained together.

## [WAAPI](https://animejs.com/documentation/web-animation-api)

`waapi.animate(targets, options)`

Create Native browser WAAPI powered animations with the simplicity of Anime.js.

## Easing System

### New easing functions:
- `linear(x1, x2, x3, ...)`: Multi-point linear interpolation
- `irregular(length, randomness)`: Random stepped easing
- `in(power)`, `out(power)`, `inOut(power)`: Parameterized power functions

### [Spring](https://animejs.com/documentation/animation)

`createSpring(options)`

New spring syntax with Object parameters. 

## [Engine Configuration](https://animejs.com/documentation/engine)

`engine`

Easier global settings configuration

- `engine.defaults`: Set default animation parameters
- `engine.timeUnit`: Choose between seconds or milliseconds
- `engine.precision`: Control decimal precision for animated values globally
- `engine.pauseOnDocumentHidden`: Control if animations pause when tab is inactive

## v3.2.2 (2023-11-28)

## Bug fixes
* Fix wrong expo easing calculation #591

## v3.2.1 (2020-10-12)

## Improvements
* Add "remove" method on instance #635
* (Re) Add easeOutIn easing function #684

## Bug fixes
* Fix bug with `visibilitychange` event and paused instances #701, #560, #721, #711
* Fix condition for `getAttribute` when the returned value is 0 #540
* Fix a scaling issue on path animations when animating an element inside an SVG #568

## Docs
* Fix ranged staggering example #704
* Better Elastic easings explanations #694
* Cleanup examples

## 3.2.0 (2020-04-09)

## Improvements
* Add matrix and matrix3d parameters to allow the use of matrix values in CSS Transforms  #636
* Change steps easing behaviour to match jump-start CSS timing function  #625

## Bug fixes
* Fix (again) a bug where the animation will "flick" on reverse #623 #586 #503 #577

## v3.1.0 (2019-07-25)

## Improvements
* Add support for values with exponent (-1.12742e-12) #552
* Easing functions refactoring + added Bounce easing

## Bug fixes
* Fix wrong unit detection when a value contains spaces #502
* Fix a bug where the parent of responsive SVG path was not properly set #556
* Fix a bug where the animation will "flick" on reverse #512
* Fix a bug where loopBegin callback could be called just before animation complete
* Update anime.running reference when clearing array on visibility change #560, #466
* Update ES6 module instal path #588, #527, #590

## v3.0.1 (2019-01-17)

## Bug fixes

* Fix ReferenceError on document when running anime.js on the server #472 #481 #345
* Fix a bug that prevented complete callback to be called again when re-playing the animation #483 #373 #378 #392 #408 
* Fix a bug triggering a TL promise instantly #159

## v3.0.0 (2019-01-09)

![animejs-v3-release](https://user-images.githubusercontent.com/1268691/50895266-e58b1480-1405-11e9-996e-a96ef8d3f02c.gif)

## New features

* New easings: spring(mass, stiffness, damping, velocity) and steps(x)
* Add endDelay parameter
* New keyframes system
* New staggering helper
* New callbacks: loopBegin(), loopComplete(), changeBegin(), change() and changeComplete()
* Automatic CSS units conversion
* Responsive motion path animation
* New set() helper to apply values instantly to multiple targets
* ES6 Modules and new build process
* New documentation
* A website.

## Bug fixes

* No need to re-define a transform property when animating multiple transforms on the same target in a timeline
* Improved simultaneous animations on the same target  #257
* Allow remove() to remove targets from timeline #318 #286
* Reversed animations can now be delayed using endDelay #254
* Better inline style unit handling (check inline style before getComputedStyle) #251
* SVG scale property is no longer overridden by CSS transform scale #316
* Fix Uncaught “TypeError: Cannot read property 'targets' of undefined” when there are no TL parameters object specified #341
* Fix a bug that prevented specific HTML ids selectors to be selected (HEX colours) #281
* Fix wrong initial SVG transform value in some cases #340

## API changes

* run() callback has been replaced by change() 
* animations are now paused when tab of window is not active
* getValue() has been replaced by get() 
* Cubic Bézier curves are now defined using a string ‘cubicBezier(x1,y1,x2,y2)’ instead of an array
* Timeline offset property has been replaced by timelineOffset #229
* Timeline offset can be set as a second argument inside .add()

## v2.2.0 (2017-09-25)

![loop](https://user-images.githubusercontent.com/1268691/30821192-c80279b6-a224-11e7-9c53-ca8d9db64f47.gif)
## Improvements
* Performances boost, up to 1.5 faster 🔥
* Add support for RGBA and HSLA colors animations

## Bug fixes
* Fix timeline children `begin()` callback
* Fix a bug where some timeline durations weren’t properly calculated
* Fix a bug where `anime.path()` initial values weren’t properly set #245
* Fix a bug where percentage unit starting values were miscalculated #238
* `begin()` and `complete()` callbacks are now called instantly if duration is 0

## v2.1.0 (2017-09-17)

## Improvements
* Children animations can now inherit properties from their parent timeline (targets, duration, delay, easing, round) (#152)
* Add support for vmin/vmax/ch units
* Add support for the transform `perspective` property (#207)
* Add support for circle, rect, polyline, polygon and line shapes for `anime.setDashOffset()` (#145, #155)
* `duration: 0` now instantly finish the animation (#228, #208)
* Animation initial values are now automatically set even if autoplay is false

## Bug fixes
* Fix timeline Callbacks at initialisation (#215)
* Fix timeline Promise being called instantly (#159)
* Fix wrong values re-composition for complex CSS properties (like `filter`, `box-shadow`, `calc()`…) (#119, #174, #175, #167, #223)
* Numerical values are not converted to strings anymore (#116)
* Relatives values now keep their unit (#214)
* Seeking an animation to 0 now correctly set the initial properties values (#177, #208)
* `run` callback is now properly called after animation delay

## v2.0.2 (2017-03-26)

* Fix Timeline bugs and improvement #113 #131 #121 
* Fix an IE bug related to Promise #123
* Absolute images path in documentation #114

## v2.0.0 (2017-02-23)

## What's new?
- Up to 2 times faster
- Multiple keyframes by properties
- Animations timeline
- Custom bezier easing functions
- Promise support
- Relative values (+=, -=, *=)
- Reverse animations at anytime with `animation.reverse()`
- [Brand new documentation](http://anime-js.com/documentation/)

## Improvements
- New elastic easing functions (elasticity can slightly differ from v1.x)
- Improved playback and callback systems
- Motion path animation supports reverse and alternate directions
- `easing`, `elasticity` and `round` properties accept functions as value
- Add `animation.paused` to check if the instance is running or not
- Add `animation.reset()` to properly reset an animation
- Simpler instance Object

## Changes to consider when migrating from v1.x
- `update` callback is now called right after `.play()`
- `animation.ended` replaced by `animation.completed``
- `animation.play()` and `animation.restart()` no longer accept arguments
- `anime.list` is replaced by `anime.running`
- No more `...Bounce` and `OutIn...` built in easing functions
- No more `animation.settings`, all parameters are now accessible directly at the root of the Object
- Remove `will-change` support on CSS animation
- `reverse` direction now make the animation goes from 100% to 0% instead of reversing tweens properties

## v1.1.3 (2016-12-27)

## Bug fixes
- Fix an SVG path animation bug when using easeInSine eaquation #100
- Begin callback is now correctly fired when a delay is a function #98

## v1.1.2 (2016-10-26)

## Bug fixes
- Fix #79 Begin argument is now correctly called when delay is a function
- Update argument is now called only if the animation smallest delay is finished

## Other
- Add function based timing values example in documentation
- Improve colors examples

## v1.1.1 (2016-09-05)

## API changes
- Add easeOutIn easing functions #53 

## Bug fixes
- Chrome 53 SVG path animation fix #66 

## Optimisations
- Simpler `is` functions 

## Other
- Add JS Object animation example in documentation
- Add SVG path and color animation examples

## v1.1 (2016-07-04)

## Internal changes
- Performance optimisations
- Use a unique Request Animation Frame (instead of creating a new one for each animations)
- Replace `+new Date()` with the RAF timestamp
- Add -webkit- prefixe for Safari < 9

## Minor API changes
- Remove `myAnimation.running`
- Replace `myAnimation.time` by `myAnimation.currentTime`
- Add `anime.version`

## Other
- Add examples directory

## v1.0 (2016-06-29)

Public release

