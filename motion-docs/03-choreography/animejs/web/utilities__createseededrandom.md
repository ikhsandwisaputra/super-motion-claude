---
source: https://animejs.com/documentation/utilities/createseededrandom
title: "createSeededRandom() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [createSeededRandom()](https://animejs.com/documentation/utilities/createseededrandom "createSeededRandom()")

Returns a pre-seeded pseudo-random function that always return the same suite of `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const seededRandom = utils.createSeededRandom(12345);

const randomValue = seededRandom(min, max, decimalLength);
```

## [Parameters](https://animejs.com/documentation/utilities/createseededrandom#parameters)

| Name | Accepts |
| --- | --- |
| seed=0 (opt) | `Number` |
| seededMin=0 (opt) | `Number` |
| seededMax=1 (opt) | `Number` |
| seededDecimalLength=0 (opt) | `Number` |

## [Returns](https://animejs.com/documentation/utilities/createseededrandom#returns)

A pre-seeded [`random()`](https://animejs.com/documentation/utilities/random "random()") function

## createSeededRandom() code example

```js
import { utils } from 'animejs';

const seededRandom = utils.createSeededRandom(12345);

utils.set('.square', {
  x: () => seededRandom(2, 18, 2) + 'rem',
  rotate: () => seededRandom(0, 180),
  scale: () => seededRandom(.25, 1.5, 3),
});
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [random()](https://animejs.com/documentation/utilities/random "random()")
* [randomPick()](https://animejs.com/documentation/utilities/random-pick "randomPick()")
