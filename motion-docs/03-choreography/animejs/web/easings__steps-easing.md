---
source: https://animejs.com/documentation/easings/steps-easing
title: "Steps easing | Easings | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Easings](https://animejs.com/documentation/easings "Easings")

[Since 3.0.0](https://github.com/juliangarnier/anime/releases/tag/v3.0.0)

# [Steps easing](https://animejs.com/documentation/easings/steps-easing "Steps easing")

A steps easing creates a stepped animation that jumps between values at discrete intervals.

## [For JavaScript](https://animejs.com/documentation/easings/steps-easing#for-javascript)

The `steps()` function must be imported for the js [`animate()`](https://animejs.com/documentation/animation "`animate()`"):

```js
import { animate, steps } from 'animejs';

animate(target, { x: 100, ease: steps(5) });
// Or with fromStart
animate(target, { x: 100, ease: steps(5, true) });
```

## [For WAAPI](https://animejs.com/documentation/easings/steps-easing#for-waapi)

The waapi [`animate()`](https://animejs.com/documentation/animation "`animate()`") function uses the browser native steps timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'steps(5)' });
// Or with jump-start
waapi.animate(target, { x: 100, ease: 'steps(5, start)' });
```

## [Parameters](https://animejs.com/documentation/easings/steps-easing#parameters)

The steps function takes up to 2 parameters `steps(n, fromStart)`:

| Name | Type | Info |
| --- | --- | --- |
| steps | `Number` | Represents the number of equal steps to divide the animation into. Must be a positive integer. |
| fromStart (opt) | `Boolean` | When `true`, the change happens at the start of each step. When `false`, the change happens at the end of each step (default: `false`). |

## [Examples](https://animejs.com/documentation/easings/steps-easing#examples)

| Name | Editor link |
| --- | --- |
| Steps start easing | [Open in editor](https://animejs.com/easing-editor/steps/start) |
| Steps end easing | [Open in editor](https://animejs.com/easing-editor/steps/end) |

## Steps easing code example

```js
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4, true)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'steps(8, end)'
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4, true)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'steps(8, end)'</div>
</div>
```

###### Previous

###### Next

* [Linear easing](https://animejs.com/documentation/easings/linear-easing "Linear easing")
* [Irregular easing](https://animejs.com/documentation/easings/irregular-easing "Irregular easing")
