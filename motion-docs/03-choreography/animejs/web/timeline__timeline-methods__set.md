---
source: https://animejs.com/documentation/timeline/timeline-methods/set
title: "set() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [set()](https://animejs.com/documentation/timeline/timeline-methods/set "set()")

Instantly sets targets property values at a specific time of the timeline.

```js
timeline.set(targets, parameters, position);
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/set#parameters)

| Name | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| parameters | [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/set#returns)

The timeline itself

Can be chained with other timeline methods.

## set() code example

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.set('.circle', { x: '15rem' })
.set('.triangle', { x: '15rem' }, 500)
.set('.square', { x: '15rem' }, 1000);
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

* [add()](https://animejs.com/documentation/timeline/timeline-methods/add "add()")
* [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()")
