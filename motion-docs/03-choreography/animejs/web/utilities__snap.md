---
source: https://animejs.com/documentation/utilities/snap
title: "snap() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [snap()](https://animejs.com/documentation/utilities/snap "snap()")

Rounds a `Number` to the nearest specified *increment* or creates a snapping `Function` with a pre-defined *increment* parameter.
If an `Array` is provided as the increment, it selects the closest value from the array.

```js
const snappedValue = utils.snap(value, increment);
const snapperFunction = utils.snap(increment);
```

## [Parameters](https://animejs.com/documentation/utilities/snap#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| increment | `Number` | `Array<Number>` |

## [Returns](https://animejs.com/documentation/utilities/snap#returns)

A `Number` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to snap numbers to the nearest *increment* or array value:

```js
const snapTo10 = utils.snap(10);
snapTo10(94);  // 90
snapTo10(-17); // -20

const snapToArray = utils.snap([0, 50, 100]);
snapToArray(30);  // 50
snapToArray(75);  // 100
snapToArray(-10); // 0

const clampAndSnap = utils.clamp(0, 100).snap(30);
clampAndSnap(72.7523); // 60
clampAndSnap(120.2514); // 90
```

## snap() code example

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.snapped', {
  rotate: '1turn',
  modifier: utils.snap(.25), // Used as a modifier
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock snapped"></div>
    <div class="label">snapped (.25)</div>
  </div>
</div>
```

###### Previous

###### Next

* [clamp()](https://animejs.com/documentation/utilities/clamp "clamp()")
* [wrap()](https://animejs.com/documentation/utilities/wrap "wrap()")
