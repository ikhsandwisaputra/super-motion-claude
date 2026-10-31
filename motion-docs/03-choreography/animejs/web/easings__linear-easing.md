---
source: https://animejs.com/documentation/easings/linear-easing
title: "Linear easing | Easings | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Easings](https://animejs.com/documentation/easings "Easings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Linear easing](https://animejs.com/documentation/easings/linear-easing "Linear easing")

A linear easing defines the pace of an animation using linear interpolation between specified points.

## [For JavaScript](https://animejs.com/documentation/easings/linear-easing#for-javascript)

The `linear()` function must be imported for the js [`animate()`](https://animejs.com/documentation/animation "`animate()`"):

```js
import { animate, linear } from 'animejs';

animate(target, { x: 100, ease: linear(0, '0.5 50%', '0.3 75%', 1) });
```

## [For WAAPI](https://animejs.com/documentation/easings/linear-easing#for-waapi)

The waapi [`animate()`](https://animejs.com/documentation/animation "`animate()`") function uses the browser native linear timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'linear(0, 0.5 50%, 0.3 75%, 1)' });
```

## [Parameters](https://animejs.com/documentation/easings/linear-easing#parameters)

The linear function takes a list of stops `linear(stop1, stop2, ...stopN)`:

| Name | Type | Info |
| --- | --- | --- |
| number | `Number` | Represents the output value at a point during the animation. At least two values must be specified. The value 0 represents the start, and 1 represents the end. Values outside 0-1 create overshoot effects. |
| percentage (opt) | `String` | Optional timing position as a string: `'value percentage'`. Indicates when the value is reached during the animation. Cannot be used on first or last stops. If omitted, stops are distributed evenly. |

## Linear easing code example

```js
import { animate, waapi, linear } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, 0, 0.5, 0.5, 1, 1)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, '1 25%', 0, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: 'linear(1, 0 25%, 1, 0)'
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, 0, 0.5, 0.5, 1, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, '1 25%', 0, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'linear(1, 0 25%, 1, 0)'</div>
</div>
```

###### Previous

###### Next

* [Cubic Bézier easing](https://animejs.com/documentation/easings/cubic-bezier-easing "Cubic Bézier easing")
* [Steps easing](https://animejs.com/documentation/easings/steps-easing "Steps easing")
