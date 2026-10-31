---
source: https://animejs.com/documentation/timeline/timeline-methods/add
title: "add() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [add()](https://animejs.com/documentation/timeline/timeline-methods/add "add()")

Creates and adds animations and timers to a timeline.
The type of element added to the timeline depends of the parameters passed to `add()`.

## [Add animation](https://animejs.com/documentation/timeline/add-animations "Add animation")

```js
timeline.add(targets, parameters, position);
```

| Parameter | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| parameters | [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") & [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters") & [Animation playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings") & [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Add timer](https://animejs.com/documentation/timeline/add-timers "Add timer")

```js
timeline.add(timerParameters, position);
```

| Parameter | Type |
| --- | --- |
| timerParameters | [Timer playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings") & [Timer callbacks](https://animejs.com/documentation/timer/timer-callbacks) |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/add#returns)

The timeline itself

Can be chained with other timeline methods.

## add() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline()
// Add labels
.label('start timer 1', 0)
.label('animate circle', 1000)
.label('start timer 2', 2000)
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 1')
// Add Animation
.add('.circle', {
  duration: 2000,
  x: '16rem',
}, 'animate circle')
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 2');
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">value</span>
    <span class="value lcd">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [Timeline methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")
* [set()](https://animejs.com/documentation/timeline/timeline-methods/set "set()")
