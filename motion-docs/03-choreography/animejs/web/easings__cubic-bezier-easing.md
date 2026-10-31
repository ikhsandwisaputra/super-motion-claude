---
source: https://animejs.com/documentation/easings/cubic-bezier-easing
title: "Cubic Bézier easing | Easings | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Easings](https://animejs.com/documentation/easings "Easings")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Cubic Bézier easing](https://animejs.com/documentation/easings/cubic-bezier-easing "Cubic Bézier easing")

A cubic bezier easing defines the pace of an animation using a Bézier curve.

## [For JavaScript](https://animejs.com/documentation/easings/cubic-bezier-easing#for-javascript)

The `cubicBezier()` function must be imported for the js [`animate()`](https://animejs.com/documentation/animation "`animate()`"):

```js
import { animate, cubicBezier } from 'animejs';

animate(target, { x: 100, ease: cubicBezier(0, 0, 0.58, 1) });
```

## [For WAAPI](https://animejs.com/documentation/easings/cubic-bezier-easing#for-waapi)

The waapi [`animate()`](https://animejs.com/documentation/animation "`animate()`") function uses the browser native cubic bezier timing function and can be specified as a `String` directly in the [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") parameter:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'cubic-bezier(0, 0, 0.58, 1)' });

// Or

waapi.animate(target, { x: 100, ease: 'cubicBezier(0, 0, 0.58, 1)' });
```

## [Parameters](https://animejs.com/documentation/easings/cubic-bezier-easing#parameters)

The cubic bezier function takes 4 parameters `cubicBezier(x1, y1, x2, y2)`:

| Name | Type | Info |
| --- | --- | --- |
| x1 | `Number` | X coordinate of the first control point. Must be between 0 and 1. |
| y1 | `Number` | Y coordinate of the first control point. Can be any value (negative creates anticipation, >1 creates overshoot). |
| x2 | `Number` | X coordinate of the second control point. Must be between 0 and 1. |
| y2 | `Number` | Y coordinate of the second control point. Can be any value (negative creates anticipation, >1 creates overshoot). |

## [Examples](https://animejs.com/documentation/easings/cubic-bezier-easing#examples)

| Name | Editor link |
| --- | --- |
| In cubic bezier curve | [Open in editor](https://animejs.com/easing-editor/cubic-bezier/in) |
| Out cubic bezier curve | [Open in editor](https://animejs.com/easing-editor/cubic-bezier/out) |
| InOut cubic bezier curve | [Open in editor](https://animejs.com/easing-editor/cubic-bezier/inout) |
| OutIn cubic bezier curve | [Open in editor](https://animejs.com/easing-editor/cubic-bezier/outin) |

## Cubic Bézier easing code example

```js
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.5, 0, 0.9, 0.3)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.1, 0.7, 0.5, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'cubicBezier(0.7, 0.1, 0.5, 0.9)'
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.5, 0, 0.9, 0.3)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.1, 0.7, 0.5, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.7, 0.1, 0.5, 0.9)</div>
</div>
```

###### Previous

###### Next

* [Built-in eases](https://animejs.com/documentation/easings/built-in-eases "Built-in eases")
* [Linear easing](https://animejs.com/documentation/easings/linear-easing "Linear easing")
