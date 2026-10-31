---
source: https://animejs.com/documentation/animatable/animatable-settings/modifier
title: "modifier | Animatable settings | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Settings](https://animejs.com/documentation/animatable/animatable-settings "Animatable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [modifier](https://animejs.com/documentation/animatable/animatable-settings/modifier "modifier")

Defines a [Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier "Modifier function") to modify or alter the behaviour of the animated numerical value.

## [Accepts](https://animejs.com/documentation/animatable/animatable-settings/modifier#accepts)

[Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier "Modifier function")

## [Default](https://animejs.com/documentation/animatable/animatable-settings/modifier#default)

`noop`

## modifier code example

```js
import { createAnimatable, utils, stagger } from 'animejs';

const PI = Math.PI;

const clock1 = createAnimatable('.clock-1', {
  rotate: { unit: 'rad' },
  modifier: utils.snap(PI / 10),
  duration: 0,
});

const clock2 = createAnimatable('.clock-2', {
  rotate: { unit: 'rad' },
  modifier: v => -v,
  duration: 0,
});

const rotateClock = (animatable) => {
  return e => {
    const [ $clock ] = animatable.targets;
    const { width, height, left, top } = $clock.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    animatable.rotate(Math.atan2(y, x) + PI / 2);
  }
}

const rotateClock1 = rotateClock(clock1);
const rotateClock2 = rotateClock(clock2);

const onMouseMove = e => {
  rotateClock1(e);
  rotateClock2(e);
}

window.addEventListener('mousemove', onMouseMove);
```

```html
<div class="large centered row">
  <div class="col">
    <div class="clock clock-1"></div>
    <div class="label">snapped</div>
  </div>
  <div class="col">
    <div class="clock clock-2"></div>
    <div class="label">inverted</div>
  </div>
</div>
```

###### Previous

###### Next

* [ease](https://animejs.com/documentation/animatable/animatable-settings/ease "ease")
* [Animatable methods](https://animejs.com/documentation/animatable/animatable-methods "Animatable methods")
