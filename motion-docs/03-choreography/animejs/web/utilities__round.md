---
source: https://animejs.com/documentation/utilities/round
title: "round() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [round()](https://animejs.com/documentation/utilities/round "round()")

Rounds a `Number` to a specified number of decimal places or creates a rounding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedValue = utils.round(value, decimalLength);
const roundingFunction = utils.round(decimalLength);
```

## [Parameters](https://animejs.com/documentation/utilities/round#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| decimalLength | `Number` |

## [Returns](https://animejs.com/documentation/utilities/round#returns)

A `Number` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to round numbers with the specified decimal length:

```js
const clampAndRound = utils.clamp(0, 100).round(2); // Clamp then round to 2 decimal places
clampAndRound(72.7523); // 72.75
clampAndRound(120.2514); // 100
```

## round() code example

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
});

animate('.rounded', {
  rotate: '1turn',
  modifier: utils.round(1), // Used as a function
  duration: 3000,
  loop: true,
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock rounded"></div>
    <div class="label">rounded (.1)</div>
  </div>
</div>
```

###### Previous

###### Next

* [shuffle()](https://animejs.com/documentation/utilities/shuffle "shuffle()")
* [clamp()](https://animejs.com/documentation/utilities/clamp "clamp()")
