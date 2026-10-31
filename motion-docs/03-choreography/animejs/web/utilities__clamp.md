---
source: https://animejs.com/documentation/utilities/clamp
title: "clamp() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [clamp()](https://animejs.com/documentation/utilities/clamp "clamp()")

Restricts a `Number` between the specified *min* and *max* values or creates a clamping `Function` with pre-defined *min* and *max* parameters.

```js
const clampedValue = utils.clamp(value, min, max);
const clamperFunction = utils.clamp(min, max);
```

## [Parameters](https://animejs.com/documentation/utilities/clamp#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |

## [Returns](https://animejs.com/documentation/utilities/clamp#returns)

A `Number` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to clamp numbers between the specified *min* and *max* values:

```js
const clampBetween0and100 = utils.clamp(0, 100);
clampBetween0and100(90);  // 90
clampBetween0and100(120); // 100
clampBetween0and100(-15); // 0

const clampAndRound = utils.clamp(0, 100).round(2); // Clamp then round to 2 decimal places
clampAndRound(72.7523); // 72.75
clampAndRound(120.2514); // 100
```

## clamp() code example

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.clamped', {
  rotate: '1turn',
  modifier: utils.clamp(.25, .75), // Used as a function
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
    <div class="clock clamped"></div>
    <div class="label">clamped [.25,.75]</div>
  </div>
</div>
```

###### Previous

###### Next

* [round()](https://animejs.com/documentation/utilities/round "round()")
* [snap()](https://animejs.com/documentation/utilities/snap "snap()")
