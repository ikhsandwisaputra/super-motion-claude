---
source: https://github.com/williamngan/pts/releases
title: "williamngan/pts GitHub releases"
fetched: 2026-10-28
---

# williamngan/pts — GitHub releases (16 entries, newest first)

## v1.0.1 — 2026-09-19

# 1.0.1 (2026-09-19)

## New features

- Path booleans. The new `Path` class unites, intersects, excludes, subtracts, divides and crops polygons, returning rings with holes that form.compound draws as one path.
- Curve conversions. `Curve.cardinalToBezier` and `Curve.bsplineToBezier` turn curve anchors into cubic Bezier control points that `form.bezier` draws as one native path, and `Curve.bezierToCardinal` and `Curve.bezierToBspline` convert back.
- Poisson-disk sampling. `Create.sampling` returns a PoissonDisk group of randomly placed points that are never closer than a given radius, and a PoissonDisk can also grow one point or one batch at a time.

## Bug fix
- Fix Num.equals threshold inclusivity (#228)

## v1.0.0 — 2026-09-12

## 1.0.0 (2026-09-12)

Pts 1.0 is a full modernization of the library: the toolchain, the type
system, and every core module were reviewed line by line, with roughly
sixty verified bugs fixed and each fix pinned by a test. The public API
is intentionally familiar — most sketches written for 0.12 run
unchanged — but corrected behavior, stricter types, and a handful of
deprecations make this a major release. The detailed findings for every
review pass live in the `plans/` directory.

### Highlights

- Modern toolchain: pnpm, tsdown (rolldown/oxc) builds, vitest 4 with
  node, browser (Playwright), and visual-regression projects — 514
  tests including type-level pins, plus benchmark suites with recorded
  baselines for node and Chromium.
- TypeScript 6 with `strict: true` across the codebase, and an honest
  public type surface (see the TypeScript section below).
- Large performance gains in hot paths, with a benchmark A/B gate
  against the previous build for every change.
- New Oklab/Oklch color modes, modernized UI and Space event APIs, and
  a documented renderer contract for building custom renderers.

### Breaking changes — API migration

- `Img.load(url)` now returns `Promise<Img>`, not an immediately available
  `Img`. Use `const img = await Img.load(url)` or `.then(...)`. To retain an
  instance while loading, use `const img = new Img(); await img.load(url)`.
- The static helpers `SVGForm.styleTo` and `SVGForm.log` are no longer
  available. Use the form's `fill`, `stroke`, `alpha`, and `font` methods for
  styles, and `form.log(message)` or `form.text([10, 14], message)` for a
  debug label. Original static drawing names still accept legacy DOM
  contexts; the explicit `*Element` names are also available, for example
  `SVGForm.circleElement(ctx, pt, radius)`.
- `SVGForm` now extends `CanvasForm` (which became generic in its space
  type) and inherits its full drawing API. `SVGForm` fills accept the same
  values as `CanvasForm`, but SVG output supports only colors and
  gradients; a `CanvasPattern` fill warns once and renders as none.
- `Pts.quickStart(id)` creates an `SVGSpace` when the target is, or
  contains, an `<svg>` element; it still creates a `CanvasSpace` otherwise.
- `Img.sync()` returns `Promise<Img>` (was `void`).
- The package `exports` map exposes `pts`, `pts/dist/*`, and
  `pts/package.json` only. Deep imports of `pts/src/...` are no longer
  resolvable; import from `pts`.
- SVG supports a subset of Canvas drawing. Clipping, image-data writes,
  source-cropped image drawing, canvas offscreen buffers, and Porter-Duff
  composites require Canvas output. See the Space guide for details.

### Breaking changes — runtime behavior

These are places where the old result was a defect. Code that relied on
the buggy output will see different (correct) values:

- `Pt.equals` no longer reports a shorter Pt or a NaN dimension as
  equal; NaN never equals NaN (IEEE semantics).
- `Pt.angleBetween` returns a normalized signed angle in [−π, π)
  instead of raw differences that jumped at the 0°/360° wrap.
- `Group.split`, `Group.segments`, and `Group.lines` (and
  `Polygon.lines`, `Polygon.midpoints`) return real `Group` instances
  instead of plain arrays cast as Group — array-style access is
  unchanged, and Group methods now actually work on the results.
- `Group.forEachPt` on an empty Group is a silent no-op instead of a
  `TypeError`.
- `Bound.update()` recomputes from the existing corner Pts in place; it
  no longer replaces them with fresh Pt instances.
- `Num.mapToRange` and `Range.mapTo` map a reversed target range
  directionally instead of sorting it: `Num.mapToRange(2, 0, 10, 100, 0)`
  is now 80 (was 20), so `range.mapTo(height, 0)` flips an axis as
  written. Values outside the source range are no longer clamped.
  (`Num.normalizeValue` still reorients its range.)
- Geometry fixes that change numbers: `Line.collinear` uses a
  sine-of-angle threshold (a point 0.4 off a unit segment is no longer
  collinear); `Circle.toRect(c, true)` returns the inscribed square
  (half-side `r/√2`, was `r/2`); `Geom.isPerpendicular` uses a relative
  epsilon instead of exact zero; `Mat.scale2D([0, s])` and
  `Mat.shear2D([s, 0])` honor a zero component; the `Bound.center` setter
  no longer double-applies its offset; `Rectangle.boundingBox` returns
  real values; `Group.moveTo` on an empty group is a no-op.
- Delaunay triangulation is a new implementation: incremental insertion
  in Hilbert-curve order with exact orientation and in-circle tests, so
  cocircular grids, collinear runs, points on edges, and duplicate points
  never produce degenerate triangles. It is faster than 0.12 at every
  size, and triangle order and tie-breaking on cocircular inputs differ.
  The mesh cache behind `mesh()`, `neighbors()`, and `neighborPts()` is
  built on first use instead of inside `delaunay()`.
  `Delaunay.voronoi(bound?)` accepts a bound and constructs complete hull
  cells; fewer than three or collinear sites yield empty cells instead of
  throwing. Pts contains no third-party code and ships no third-party
  notices.
- Sound: every `Sound` shares one `AudioContext` (0.12 created one per
  instance), so closing a sound's `ctx` silences all sounds — use
  `sound.stop()` / `sound.dispose()` instead. `Sound.load` rejects with
  an `Error` rather than a string. `Sound.createBuffer` is public.
- Perlin noise (`Create.noise2D`, `noisePts`) is fixed — the old
  gradient hash skipped the permutation table, producing exact
  period-12 repetition. Same API and seeding, different (correct)
  values. `Noise.seed` now covers the full table, and `noisePts` no
  longer scrambles non-square grids.
- `Num.randomRange(a, b)` with `a > b` no longer shifts the range;
  `Range` handles all-negative data correctly.
- Color conversions were overhauled: 8 defects fixed including
  normalized-flag handling across RGB/HSL/HSB/XYZ/LAB/LCH/LUV, 8-digit
  hex alpha, and negative hue. Core CIE math was verified against
  reference values; results differ only where the old code was wrong.
- Canvas/SVG rendering fixes: `paragraphBox` no longer crops one line
  early, `imageData` rect no longer double-offsets, `SVGSpace.removeAll`
  no longer wipes its own mount element, and the SVG reconciler removes
  stale attributes between frames.
- `CanvasSpace`, `SVGSpace`, and `DOMSpace` honor their documented empty
  mount: `new SVGSpace()`, or an empty or missing id, creates
  `<div id="pt_container"><svg id="pt">` (a `<canvas>` or `<div>` for the
  other spaces; a missing id names the created element). `dispose()`
  removes the elements a space created and resets `ready`.
- Physics: `Body.linkAll` no longer creates duplicate and self links on
  odd-sized bodies.
- Physics is now frame-rate independent. `World.update(ms)` solves in
  substeps of about `1 / (60 × substeps)` s, so a slow frame runs more
  substeps rather than larger ones, and velocity is preserved exactly when
  frame timing changes (a resting body no longer gains energy under
  alternating frame times). `Particle.hit`, drag deltas via the `position`
  setter, `Particle.changed`, `World.friction`, and body stiffness are all
  expressed per 60 Hz frame at any `substeps` setting — the same numbers a
  0.12 sketch used at 60 fps. Updates shorter than 2 ms are carried into
  the next call. `Particle.timeStep` exposes the time spanned by a
  particle's current displacement.
- Space: `play(t)` no longer stacks parallel animation-frame chains;
  first-frame and resume no longer produce a frame-time spike; touch
  `preventDefault` paths work as documented.
- UI: removing a handler no longer invalidates other handlers' ids;
  hover-leave delivers the current pointer position; built-in button
  and dragger behavior can no longer be destroyed by `off(type)`.
- Seeded randomness is **not** a breaking change: `Num.seed` sequences
  are bit-identical to 0.12 (pinned by golden-value tests), while
  seeding got ~60% faster.

### Breaking changes — TypeScript types (compile-time only)

The emitted JavaScript for the type-system modernization is
byte-identical to the previous build; these affect only TypeScript
consumers, who may see new compile errors that reflect what the runtime
always did:

- Functions that could always return `undefined` now say so. Affected:
  `Line.slope`, `Line.intercept`, `Line.perpendicularFromPt`,
  `Line.intersectRay2D`, `Line.intersectLine2D`,
  `Line.intersectLineWithRay2D`, `Line.intersectPolygon2D`, `Line.crop`,
  `Polygon.bisector`, `Triangle.incircle`, `Triangle.circumcircle`,
  `Triangle.incenter`, `Triangle.orthocenter`, `Triangle.circumcenter`,
  `Circle.fromTriangle`, `Img.getForm`, `Range.calc`, and
  `SVGForm.lineElement` / `SVGForm.rectElement` / `HTMLForm.rect`.
  Migration: narrow the result (`if (pt) …`) or assert (`pt!`) where
  your inputs guarantee a hit.
- `Bound.x` / `Bound.y` / `Bound.z` are `number | undefined` (undefined
  for missing dimensions, as at runtime).
- New exported type `UIActionEvent` =
  `MouseEvent | TouchEvent | PointerEvent | KeyboardEvent`.
  `UIHandler`'s `evt` parameter and `IPlayer.action` use it — keyboard
  events always flowed through this path. A handler that declares a
  narrower `evt: MouseEvent` parameter no longer type-checks; accept
  the union (or omit the parameter types) instead. `UIHandler`'s `type`
  parameter is now autocompleted via `UIPointerAction` while still
  accepting custom strings.
- `IntersectContext.other` is `unknown` (was `any`) — narrow before
  member access.
- `DefaultFormStyle.lineJoin` / `lineCap` use the DOM's
  `CanvasLineJoin` / `CanvasLineCap` literal types.
- `AnimateCallbackFn`'s third parameter is typed `Space` (was `any`);
  `IPlayer.resize` accepts `Event | null`; `MultiTouchElement` uses
  DOM-typed listener signatures; `DOMFormContext.group` is honestly
  nullable and `style` is a `Record`.
- `UIButton.onHover` returns `(number | undefined)[]` — an id is
  undefined when the corresponding handler was not provided.

### Deprecated

- `HTMLSpace` / `HTMLForm` — deprecated, removal in a future major.
  Use `SVGSpace` / `SVGForm`, which share the supported subset of the
  `CanvasForm` drawing API. `DOMSpace` remains public as the subclassing point.
- `Img.loadAsync` — use `Img.load`, which now returns a Promise.
- `Img.cleanup` — use `Img.dispose`.
- `SVGForm.updateScope` / `SVGForm.scope` — no longer needed; elements
  are reconciled automatically each frame.
- `Typography.fontSizeToBox` initial-box argument — it never affected
  the result; use `fontSizeToBox(ratio, byHeight)`.
- `Util.randomInt` — use `Num.randomRange`.

### New

- **Flocking**: `Create.flock(pts, options)` builds a `Flock` of `Boid`
  agents that steer by separation, alignment, and cohesion over a spatial
  hash, with `"steer"`, `"wrap"`, `"bounce"`, or `"none"` boundaries.
  Advance it with `flock.step(ftime)`; see the `create.flock` demo.
- **Color**: Oklab and Oklch modes (`Color.oklab(...)`,
  `Color.oklch(...)`), with constants verified against published
  reference values.
- **Space**: `space.track(ui)` / `space.untrack(ui)` forward all
  pointer, touch, and keyboard actions to UI elements without
  hand-writing an `action` player; robust mount/unmount lifecycle
  (idempotent `dispose`, no leaked listeners) that survives React
  StrictMode double-mounting; SSR-safe imports are checked in CI.
- **UI**: `UI.registerShape(name, fn)` for custom hit tests; built-in
  `line` / `polyline` hit-testing with a `lineThreshold` state;
  `on(type, fn, { once, signal })`; `getState` / `setState`; typed
  action constants (`UIPointerActions`, `UIPointerAction`).
- **Rendering**: the renderer contract (context surface + frame
  lifecycle) is documented, with `SVGContext2D` as the reference
  implementation for building custom renderers.
- **Types**: `UIActionEvent`; type-level regression tests
  (`expectTypeOf`) run with the test suite.

### Performance

Highlights from the benchmark gates (5-round A/B against the prior
build; full numbers in `plans/*.md`):

- `Polygon.hasIntersectPoint` −97%, Curve step generation −90%
- `Bound.x/y/z` reads −92%, `Group.insert` −87% (and stack-safe for
  very large inserts), `Group.segments`/`lines` −45%
- Space pointer dispatch −84%, `UI.track` −67%
- `Mat.zipSlice`-based ops −72%, `Create.noisePts` −65%,
  `Create.distributeRandom` −30%, `Num.seed` −60%
- Perlin noise: lag-12 autocorrelation 0.95 → 0.009 (quality fix)

### Internal / tooling

- Build: tsdown with ESM + CJS + browser IIFE outputs, byte-exact
  artifact size budgets, and public-export smoke checks in CI.
- Tests: vitest 4 with browser (Chromium) and visual-regression
  projects; 514 tests. Benchmarks: node + Chromium suites with
  recorded baselines and an A/B mode against any git ref.
- TypeScript 6.0.3, `strict: true`, `import type` hygiene enforced via
  eslint (`consistent-type-imports`) — deliberately not via
  `verbatimModuleSyntax`, which the bundler also reads and which
  changes the emitted bundle (see note in `tsconfig.json`).
- Docs generator no longer emits unstable numeric ids, so regenerated
  docs diff minimally.

## v0.11.3 — 2022-12-08 (prerelease)

# New features
- Improved Img class API
- Static and dynamic pattern support in Img class
- Random seed using `Num.random` and `Num.seed` - thanks @carlo-colombo 
- Updated build system using tsup

# Bug fixes
- Fixed mouse and key event bugs
- Various minor bug fixes and improvements, with thanks to @doseofted and @rmschindler

## v0.10.2 — 2021-02-19 (prerelease)

## New Features
- Support iterables and generators in addition to arrays in functions that take GroupLike parameters. See [PtIterable](https://ptsjs.org/docs/?p=Types_PtIterable) and [PtLikeIterabe](https://ptsjs.org/docs/?p=Types_PtLikeIterable) types
- New [Img](https://ptsjs.org/docs/?p=Image_Img#constructor_constructor) class to support image loading and manipulations in CanvasSpace. See demo [img.pixel](https://ptsjs.org/demo/?name=img.pixel)
- [Util.performance](https://ptsjs.org/docs/?p=Util_Util#function_performance) to measure average frame rate
- Added a few convenient functions: [Pt.toGroup](https://ptsjs.org/docs/?p=Pt_Pt#function_toGroup), [Pt.toBound](https://ptsjs.org/docs/?p=Pt_Pt#function_toBound), [Num.randomPt](https://ptsjs.org/docs/?p=Num_Num#function_randomPt)


## Bug fixes 
(thanks @tibotiber and @prkirby)
- Rotational axis bug #106 
- space.dispose #109 
- distanceFromPt bug #118 
- half-pixel bug #119 
- svg id bug #128 
- nodejs bug #132 
- audible output node bug #134 
- semi transparent bug #135
- add the missing static [CanvasForm.point](https://ptsjs.org/docs/?p=Canvas_CanvasForm#function_point) function 
- update webpack and babel to resolve security issues

## v0.9.1 — 2020-03-07 (prerelease)

## New Features
- Better drag-drop and other improvements on `UI` classes
- [Gradient fill](https://ptsjs.org/docs/?p=Canvas_CanvasForm#function_gradient), global [alpha](https://ptsjs.org/docs/?p=Canvas_CanvasForm#function_alpha) and [composite operations](https://ptsjs.org/docs/?p=Canvas_CanvasForm#function_composite)


## Bug fixes
- SVG and DOM fixes (font set correctly, default style and others)
- `Util.split` now split the arrays correctly
- Safari / iOS issues with Sound now fixed
- Other minor fixes and API improvements

## v0.8.0 — 2019-03-25 (prerelease)

## New features
- new `Sound` class 
- add `ellipse` drawing function in `CanvasForm`
- add an angle offset parameter in`Create.radialPts` 

## Bug fixes and changes
- `unit` function no longer throws error when magnitude is 0
- `alpha` property in Color now has setter as well as getter
- Move `Tempo` class to `Play` module (typescript only)
- Fix doc links in Animation guide

## v0.7.0 — 2019-02-04 (prerelease)

## New features
- Tempo class for creating animation sequences
- (Related) New Pts React component ( [react-pts-canvas](https://www.npmjs.com/package/react-pts-canvas) ). Examples in [pts-react-example](https://github.com/williamngan/pts-react-example) also updated.
- New posenet demo in /demo/more/tfjs_posenet/js/d.js

## Bug fixes
- Fix Num.cycle
- Fix various bugs in Physics 
- Fix resize issues and type parameter
- Fix documentations and broken links

## v0.6.0 — 2018-08-24 (prerelease)

## New features
- Experimental `UI` module for creating buttons and drag-drops. See [demo here](http://ptsjs.org/demo/?name=ui.track). 
- Add `Circle.fromTriangle` function (Thanks @AndGem for the suggestion)
- es2015 build by @bsouthga 

## Bug fixes
- Various bug fixes and docs improvements by our contributors ( @ichabodcole , @amilajack , @bnjm , @thewarpaint )
- Fix documentation scrolling issue
- Improve readability for exported html in demo editor
- Other minor fixes and improvements

## v0.5.0 — 2018-08-07 (prerelease)

Pts has reached 0.5! 🎉This is a milestone release with many updates and improvements.

## New features:
- New homepage
- New and improved documentation
- Live [demo code editor](https://ptsjs.org/demo/edit/?name=circle.intersectCircle2D)
- `Pts.quickStart` mode and updated demo code (see [Getting started](https://ptsjs.org/guide/get-started-0100) for details)

## Breaking changes
- Pt's `cross2D` renamed to `$cross2D`
- `Util.warnLevel` property becomes a function `Util.warnLevel( ... )`
- Removed `Circle.toInnerRect` (use `Circle.toRect` instead)
- typescript: `Bound` class moved into `Pt` module
- typescript: All type alias moved into `Types.ts` file
- typescript: updated version to 2.9.2

## Bug fixes
- fix IE and mobile css bugs
- fix devicePixelRatio bug when it's less than 1.
- demo updates and minor bug fixes

## v0.4.2 — 2018-05-15 (prerelease)

- CanvasForm now as an `image()` function to draw image
- Add package version info to build files

## v0.4.0 — 2018-05-07 (prerelease)

- Verlet physics engine
- Better polygon intersection algorithms and bug fixes
- Methods to create regular polygons
- New demos

## 0.3.1 — 2018-03-09 (prerelease)

- Fix minify code
- Fix license header

## v0.3.0 — 2018-03-08 (prerelease)

- Single-line and multi-line textbox implementation for CanvasSpace
- Basic UI handling
- Range and stepper utility
- Minor improvements and bug fixes

## v0.2.3 — 2017-11-13 (prerelease)

- Fix mouse position and other bug fixes
- Perlin noise 2D in `Create` module

## v0.2.0 — 2017-09-22 (prerelease)

- Basic supports for SVG and DOM
- Bug fixes

## v0.1.6 — 2017-08-21 (prerelease)

- Foundation
- 2D graphics in html canvas
- More to come soon!

