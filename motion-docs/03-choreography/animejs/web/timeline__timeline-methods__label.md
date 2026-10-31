---
source: https://animejs.com/documentation/timeline/timeline-methods/label
title: "label() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [label()](https://animejs.com/documentation/timeline/timeline-methods/label "label()")

Associate specific time positions with label names for easy reference within the timeline.
Once added to a timeline, a label can be used as a [Time position](https://animejs.com/documentation/timeline/time-position "Time position").

```js
timeline.label(labelName, position);
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/label#parameters)

| Name | Accepts |
| --- | --- |
| labelName | `String` |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/label#returns)

The timeline itself

Can be chained with other timeline methods.

## label() code example

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('circle', 0)
.label('square', 500)
.label('triangle', 1000)
.add('.square', {
  x: '17rem',
  duration: 500,
}, 'square')
.add('.circle', {
  x: '13rem',
  duration: 1000,
}, 'circle')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, 'triangle');
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

* [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()")
* [remove()](https://animejs.com/documentation/timeline/timeline-methods/remove "remove()")
