---
source: https://animejs.com/documentation/animatable/animatable-settings/unit
title: "unit | Animatable settings | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Settings](https://animejs.com/documentation/animatable/animatable-settings "Animatable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [unit](https://animejs.com/documentation/animatable/animatable-settings/unit "unit")

Defines the unit for the animated value of the property.

## [Accepts](https://animejs.com/documentation/animatable/animatable-settings/unit#accepts)

A `String` containing a valid CSS unit

## unit code example

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const [ $clock ] = utils.$('.clock');
let bounds = $clock.getBoundingClientRect();
const refreshBounds = () => bounds = $clock.getBoundingClientRect();

const clock = createAnimatable($clock, {
  rotate: { unit: 'rad' }, // Set the unit to 'rad'
  duration: 400,
});

const { PI } = Math;
let lastAngle = 0
let angle = PI / 2;

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;
  const currentAngle = Math.atan2(y, x);
  const diff = currentAngle - lastAngle;
  angle += diff > PI ? diff - 2 * PI : diff < -PI ? diff + 2 * PI : diff;
  lastAngle = currentAngle;
  clock.rotate(angle); // Pass the new angle value in rad
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

```html
<div class="large centered row">
  <div class="col">
    <div class="clock"></div>
  </div>
</div>
<div class="small centered row">
  <span class="label">Move cursor around</span>
</div>
```

###### Previous

###### Next

* [Animatable settings](https://animejs.com/documentation/animatable/animatable-settings "Animatable settings")
* [duration](https://animejs.com/documentation/animatable/animatable-settings/duration "duration")
