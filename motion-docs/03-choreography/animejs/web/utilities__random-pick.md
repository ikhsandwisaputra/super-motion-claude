---
source: https://animejs.com/documentation/utilities/random-pick
title: "randomPick() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [randomPick()](https://animejs.com/documentation/utilities/random-pick "randomPick()")

Returns a random element from a collection.

```js
const ramdomElement = utils.randomPick(collection);
```

## [Parameters](https://animejs.com/documentation/utilities/random-pick#parameters)

| Name | Accepts |
| --- | --- |
| collection | `Array` | `NodeList` | `String` |

## [Returns](https://animejs.com/documentation/utilities/random-pick#returns)

An random element from the collection

## randomPick() code example

```js
import { utils } from 'animejs';

utils.set('.letter', {
  x: () => utils.randomPick([5, 9, 13, 17]) + 'rem',
  scale: () => utils.randomPick([1, 1.25, 1.5, 1.75]),
  color: () => `var(--hex-${utils.randomPick(['red', 'orange', 'yellow'])}-1)`,
  innerHTML: () => utils.randomPick('ABCD'),
});
```

```html
<div class="small row">
  <div class="letter">A</div>
</div>
<div class="small row">
  <div class="letter">B</div>
</div>
<div class="small row">
  <div class="letter">C</div>
</div>
<div class="small row">
  <div class="letter">D</div>
</div>
```

###### Previous

###### Next

* [createSeededRandom()](https://animejs.com/documentation/utilities/createseededrandom "createSeededRandom()")
* [shuffle()](https://animejs.com/documentation/utilities/shuffle "shuffle()")
