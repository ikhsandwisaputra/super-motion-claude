---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter
title: "Stagger jitter | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Stagger jitter NEW](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter "Stagger jitter")

Adds a random offset to each staggered value.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter#accepts)

| Value | Description |
| --- | --- |
| `<Number>` | Random offset in `[-value, +value]` |
| `[<Number>, <Number>]` | Offset ramps from the first value (closest target) to the second (farthest) |

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter#default)

`null`

## [Seed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter#seed)

Pass a `seed` to make jitter reproducible. The same `seed` also makes `from: 'random'` reproducible.

| Value | Description |
| --- | --- |
| `false` | Default. Random offsets change on every run |
| `true` | Seeds the random generator with `0` |
| `<Number>` | Uses the number directly as the seed |

## Stagger jitter code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  y: ['-2.75rem', 2.75],
  duration: 500,
  delay: stagger(100, { jitter: 100 }),
  ease: 'inOutQuad',
  alternate: true,
  loop: true,
});
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Stagger total](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total "Stagger total")
* [$()](https://animejs.com/documentation/utilities/dollar-sign "$()")
