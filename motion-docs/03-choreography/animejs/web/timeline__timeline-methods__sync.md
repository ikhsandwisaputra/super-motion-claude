---
source: https://animejs.com/documentation/timeline/timeline-methods/sync
title: "sync() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()")

Synchronises a JS animation, WAAPI Animation, timer, timeline or even a native [WAAPI Animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation "WAAPI Animation") to a timeline.

```js
const tlChild = createTimeline().add(target, { x: 100 }).add(target, { y: 100 });

createTimeline().sync(tlChild);
```

Tween value composition is handled when the timeline is created, and won't affect the timeline's existing children when added.

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/sync#parameters)

| Name | Accepts |
| --- | --- |
| synced | [JSAnimation](https://animejs.com/documentation/animation "JSAnimation") | [Timer](https://animejs.com/documentation/timer "Timer") | [Timeline](https://animejs.com/documentation/timeline "Timeline") | [Anime.js WAAPIAnimation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Anime.js WAAPI Animation") | [WAAPIAnimation](https://developer.mozilla.org/en-US/docs/Web/API/Animation "WAAPI Animation") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/sync#returns)

The timeline itself

Can be chained with other timeline methods.

## sync() code example

```js
import { createTimeline, animate, waapi } from 'animejs';

const circleAnimation = waapi.animate('.circle', {
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

* [set()](https://animejs.com/documentation/timeline/timeline-methods/set "set()")
* [label()](https://animejs.com/documentation/timeline/timeline-methods/label "label()")
