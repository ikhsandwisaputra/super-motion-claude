---
source: https://animejs.com/documentation/animatable/animatable-settings/duration
title: "duration | Animatable settings | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Settings](https://animejs.com/documentation/animatable/animatable-settings "Animatable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [duration](https://animejs.com/documentation/animatable/animatable-settings/duration "duration")

Specifies the duration in milliseconds for the transition to the animated value of the property.

## [Accepts](https://animejs.com/documentation/animatable/animatable-settings/duration#accepts)

* A `Number` equal to or greater than `0`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/animatable/animatable-settings/duration#default)

`1000`

## duration code example

```js
import { createAnimatable, utils, stagger } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circles = createAnimatable('.circle', {
  x: 0, // Imediatly set the value without animation
  y: stagger(200, { from: 'center', start: 200 }),
  ease: 'out(4)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  circles.x(x).y(y);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

```html
<div class="medium centered row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="small centered row">
  <span class="label"><br><br><br>Move cursor around</span>
</div>
```

###### Previous

###### Next

* [unit](https://animejs.com/documentation/animatable/animatable-settings/unit "unit")
* [ease](https://animejs.com/documentation/animatable/animatable-settings/ease "ease")
