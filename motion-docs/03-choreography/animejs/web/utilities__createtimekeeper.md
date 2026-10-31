---
source: https://animejs.com/documentation/utilities/createtimekeeper
title: "keepTime() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [keepTime()](https://animejs.com/documentation/utilities/createtimekeeper "keepTime()")

Returns a `Function` that recreates a [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline") while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
const trackedAnimate = utils.keepTime(() => animate(target, params));

const tracked = trackedAnimate();
```

## [Parameters](https://animejs.com/documentation/utilities/createtimekeeper#parameters)

| Name | Accepts |
| --- | --- |
| constructor | A `Function` that returns a [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline") |

## [Returns](https://animejs.com/documentation/utilities/createtimekeeper#returns)

A `Function` that returns the tracked [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline")

## keepTime() code example

```js
import { animate, utils } from 'animejs';

const [ $button ] = utils.$('button');
const clocks = utils.$('.clock');
let targetIndex = 0;

const animateNextTarget = utils.keepTime(() => {
  if (targetIndex > clocks.length - 1) targetIndex = 0;
  return animate(clocks[targetIndex++], {
    color: ['#B7FF54', '#FF4B4B'],
    rotate: 360,
    ease: 'linear',
    duration: 8000,
    loop: true,
  })
});

animateNextTarget();

$button.addEventListener('click', animateNextTarget);
```

```html
<div class="large row spaced-evenly">
  <div class="col">
    <div class="clock input"></div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Switch target</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [sync()](https://animejs.com/documentation/utilities/sync "sync()")
* [random()](https://animejs.com/documentation/utilities/random "random()")
