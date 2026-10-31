---
source: https://animejs.com/documentation/timeline/timeline-methods/remove
title: "remove() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [remove()](https://animejs.com/documentation/timeline/timeline-methods/remove "remove()")

Removes animations, timers, timelines, targets or specific tween properties from the timeline.

The timeline will pauses automatically if all targets, animations, timers and timelines are removed.

Removing items from a timeline doesn't affect its duration. If you need to change the shape and duration of the timeline, you should create a new timeline instead.

## [Removing animations, timers or timelines](https://animejs.com/documentation/timeline/timeline-methods/remove#removing-animations-timers-or-timelines)

```js
timeline.remove([animation, timer, timeline]);
```

| Parameter | Accepts |
| --- | --- |
| object | [Animation](https://animejs.com/documentation/animation "Animation") | [Timer](https://animejs.com/documentation/timer "Timer") | [Timeline](https://animejs.com/documentation/timeline "Timeline") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Removing targets](https://animejs.com/documentation/timeline/timeline-methods/remove#removing-targets)

```js
timeline.remove(targets);
```

| Parameter | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |

## [Removing targets properties](https://animejs.com/documentation/timeline/timeline-methods/remove#removing-targets-properties)

```js
timeline.remove(targets, propertyName);
```

| Parameter | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| propertyName | A valid [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") `String` |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/remove#returns)

The timeline itself

Can be chained with other timeline methods.

## remove() code example

```js
import { animate, createTimeline, utils } from 'animejs';

const [ $removeA, $removeB, $removeC ] = utils.$('.button');

const animation = animate('.circle', { x: '15rem', scale: [1, .5, 1] });

const tl = createTimeline({ loop: true, alternate: true })
.sync(animation)
.add('.triangle', { x: '15rem', rotate: 360 }, 100)
.add('.square',   { x: '15rem' }, 200);

const removeAnimation = () => tl.remove(animation);
const removeTarget = () => tl.remove('.square');
const removeRotate = () => tl.remove('.triangle', 'rotate');

$removeA.addEventListener('click', removeAnimation);
$removeB.addEventListener('click', removeTarget);
$removeC.addEventListener('click', removeRotate);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove anim</button>
    <button class="button">Remove target</button>
    <button class="button">remove tween</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [label()](https://animejs.com/documentation/timeline/timeline-methods/label "label()")
* [call()](https://animejs.com/documentation/timeline/timeline-methods/call "call()")
