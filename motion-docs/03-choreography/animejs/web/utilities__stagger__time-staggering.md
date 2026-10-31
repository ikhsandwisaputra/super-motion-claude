---
source: https://animejs.com/documentation/utilities/stagger/time-staggering
title: "Time staggering | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Time staggering](https://animejs.com/documentation/utilities/stagger/time-staggering "Time staggering")

Tween's time related properties like `delay` and `duration` accepts Function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target tween having different timings, increasing by a set number of milliseconds for each subsequent target.

## Time staggering code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  delay: stagger(100),
  duration: stagger(200, { start: 500 }),
  loop: true,
  alternate: true
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 0ms;&nbsp;&nbsp;&nbsp;duration: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 100ms; duration: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 200ms; duration: 900ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 300ms; duration: 1100ms</div>
</div>
```

###### Previous

###### Next

* [stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")
* [Values staggering](https://animejs.com/documentation/utilities/stagger/values-staggering "Values staggering")
