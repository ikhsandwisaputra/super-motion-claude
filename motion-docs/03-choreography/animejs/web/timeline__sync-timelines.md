---
source: https://animejs.com/documentation/timeline/sync-timelines
title: "Sync timelines | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Sync timelines](https://animejs.com/documentation/timeline/sync-timelines "Sync timelines")

Timelines can be synchronised to an other timeline using the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.

```js
timelineA.sync(timelineB, position);
```

## [Parameters](https://animejs.com/documentation/timeline/sync-timelines#parameters)

| Name | Accepts |
| --- | --- |
| synced | [Animation](https://animejs.com/documentation/animation "Animation") | [Timer](https://animejs.com/documentation/timer "Timer") | [Timeline](https://animejs.com/documentation/timeline "Timeline") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/sync-timelines#returns)

The timeline itself

Can be chained with other timeline methods.

## Sync timelines code example

```js
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
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

* [Sync WAAPI animations](https://animejs.com/documentation/timeline/sync-waapi-animations "Sync WAAPI animations")
* [Call functions](https://animejs.com/documentation/timeline/call-functions "Call functions")
