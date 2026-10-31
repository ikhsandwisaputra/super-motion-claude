---
source: https://animejs.com/documentation/utilities/stagger/values-staggering
title: "Values staggering | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Values staggering](https://animejs.com/documentation/utilities/stagger/values-staggering "Values staggering")

All tweens animatable properties accept function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target having a staggered value, increasing by a set number for each subsequent target.

## Values staggering code example

```js
import { animate, stagger } from 'animejs';

const animation = animate('.square', {
  y: stagger(['-2.75rem', '2.75rem']),
  rotate: { from: stagger('-.125turn') },
  loop: true,
  alternate: true
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

* [Time staggering](https://animejs.com/documentation/utilities/stagger/time-staggering "Time staggering")
* [Timeline positions staggering](https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering "Timeline positions staggering")
