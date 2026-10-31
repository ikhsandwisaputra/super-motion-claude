---
source: https://animejs.com/documentation/timeline/sync-waapi-animations
title: "Sync WAAPI animations | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Sync WAAPI animations](https://animejs.com/documentation/timeline/sync-waapi-animations "Sync WAAPI animations")

WAAPI animations can be synchronised to a timeline using the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.

```js
timeline.sync(animation, position);
```

## [Parameters](https://animejs.com/documentation/timeline/sync-waapi-animations#parameters)

| Name | Accepts |
| --- | --- |
| synced | [Animation](https://animejs.com/documentation/animation "Animation") | [Timer](https://animejs.com/documentation/timer "Timer") | [Timeline](https://animejs.com/documentation/timeline "Timeline") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/sync-waapi-animations#returns)

The timeline itself

Can be chained with other timeline methods.

## Sync WAAPI animations code example

```js
import { createTimeline, waapi } from 'animejs';

const circle = waapi.animate('.circle', {
  x: '15rem',
});

const triangle = waapi.animate('.triangle', {
  x: '15rem',
  y: [0, '-1.5rem', 0],
  ease: 'out(4)',
  duration: 750,
});

const square = waapi.animate('.square', {
  x: '15rem',
  rotateZ: 360,
});

const tl = createTimeline()
.sync(circle, 0)
.sync(triangle, 350)
.sync(square, 250);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

###### Previous

###### Next

* [Add animations](https://animejs.com/documentation/timeline/add-animations "Add animations")
* [Sync timelines](https://animejs.com/documentation/timeline/sync-timelines "Sync timelines")
