---
source: https://animejs.com/documentation/timeline/add-animations
title: "Add animations | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Add animations](https://animejs.com/documentation/timeline/add-animations "Add animations")

Animations can be added to a timeline using the [`add()`](https://animejs.com/documentation/timeline/timeline-methods/add "add()") method or the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.

## [Animation creation](https://animejs.com/documentation/timeline/add-animations#animation-creation)

Creates and adds an animation directly to the timeline with the [`add()`](https://animejs.com/documentation/timeline/timeline-methods/add "add()") method.
This allows tween value composition with the timeline's existing children.

```js
timeline.add(targets, parameters, position);
```

## [Parameters](https://animejs.com/documentation/timeline/add-animations#parameters)

| Name | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| parameters | An `Object` of [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties"), [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters"), [Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings") and [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Animation synchronisation](https://animejs.com/documentation/timeline/add-animations#animation-synchronisation)

Synchronises an existing animation with the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.
Tween value composition is handled when the animation is created, and won't affect the timeline's existing children when added.

```js
const animation = animate(target, { x: 100 });

timeline.sync(animation, position);
```

## [Parameters](https://animejs.com/documentation/timeline/add-animations#parameters)

| Name | Accepts |
| --- | --- |
| animation | [Animation](https://animejs.com/documentation/animation "Animation") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/add-animations#returns)

The timeline itself

Can be chained with other timeline methods.

## Add animations code example

```js
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tl = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
  alternate: true,
  loop: 2,
})
.add('.square', {
  x: '15rem',
});
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

* [Add timers](https://animejs.com/documentation/timeline/add-timers "Add timers")
* [Sync WAAPI animations](https://animejs.com/documentation/timeline/sync-waapi-animations "Sync WAAPI animations")
