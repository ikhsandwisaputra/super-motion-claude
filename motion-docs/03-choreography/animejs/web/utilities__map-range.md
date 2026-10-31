---
source: https://animejs.com/documentation/utilities/map-range
title: "mapRange() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [mapRange()](https://animejs.com/documentation/utilities/map-range "mapRange()")

Maps a `Number` from one range to another or creates a mapping `Function` with pre-defined ranges parameters.

```js
const mappedValue = utils.mapRange(value, fromLow, fromHigh, toLow, toHigh);
const mapperFunction = utils.mapRange(fromLow, fromHigh, toLow, toHigh);
```

## [Parameters](https://animejs.com/documentation/utilities/map-range#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| fromLow | `Number` |
| fromHigh | `Number` |
| toLow | `Number` |
| toHigh | `Number` |

## [Returns](https://animejs.com/documentation/utilities/map-range#returns)

A `Number` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to map numbers from one range to another:

```js
const mapFrom0and100to0and200 = utils.mapRange(0, 100, 0, 200);
mapFrom0and100to0and200(45);  // 90
mapFrom0and100to0and200(120); // 240
mapFrom0and100to0and200(-15); // -30

const normalizeAndClamp = utils.mapRange(-100, 100, 0, 1).clamp(0, 1); // Normalize then clamp between 0 and 1
normalizeAndClamp(50);  // 0.75
normalizeAndClamp(120); // 1
```

## mapRange() code example

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '12turn',
  duration: 12000,
  loop: true,
  ease: 'inOut',
});

animate('.mapped', {
  rotate: '12turn',
  modifier: utils.mapRange(0, 12, 0, 1), // Used as a modifier
  duration: 12000,
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
    <div class="clock mapped"></div>
    <div class="label">mapped [0,12] [0,1]</div>
  </div>
</div>
```

###### Previous

###### Next

* [wrap()](https://animejs.com/documentation/utilities/wrap "wrap()")
* [lerp()](https://animejs.com/documentation/utilities/lerp "lerp()")
