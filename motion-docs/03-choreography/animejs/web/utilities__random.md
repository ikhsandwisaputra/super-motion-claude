---
source: https://animejs.com/documentation/utilities/random
title: "random() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [random()](https://animejs.com/documentation/utilities/random "random()")

Returns a random `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const randomValue = utils.random(min, max, decimalLength);
```

## [Parameters](https://animejs.com/documentation/utilities/random#parameters)

| Name | Accepts |
| --- | --- |
| min | `Number` |
| max | `Number` |
| decimalLength=0 (opt) | `Number` |

## [Returns](https://animejs.com/documentation/utilities/random#returns)

`Number`

## random() code example

```js
import { utils } from 'animejs';

utils.set('.square', {
  x: () => utils.random(2, 18, 2) + 'rem',
  rotate: () => utils.random(0, 180),
  scale: () => utils.random(.25, 1.5, 3),
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

* [keepTime()](https://animejs.com/documentation/utilities/createtimekeeper "keepTime()")
* [createSeededRandom()](https://animejs.com/documentation/utilities/createseededrandom "createSeededRandom()")
