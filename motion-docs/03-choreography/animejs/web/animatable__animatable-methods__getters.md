---
source: https://animejs.com/documentation/animatable/animatable-methods/getters
title: "Getters | Animatable methods | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Methods](https://animejs.com/documentation/animatable/animatable-methods "Animatable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Getters](https://animejs.com/documentation/animatable/animatable-methods/getters "Getters")

Every animatable properties defined in the animatable parameters are transformed into methods and accessible on the animatable object.

When calling a method without any argument, the method acts as a getter, and returns the current value of the animatable property.

## [Returns](https://animejs.com/documentation/animatable/animatable-methods/getters#returns)

* A `Number` if the current animatable property has a single value
* An `Array` of `Number` if the current animatable property has multiple values (like an RGB color value)

## Getters code example

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
const [ $x, $y ] = utils.$('.coords');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable('.circle', {
  x: 500,
  y: 500,
  ease: 'out(2)',
});

// Gets and log the current x and y values
circle.animations.x.onRender = () => {
  $x.innerHTML = utils.roundPad(circle.x(), 2);
  $y.innerHTML = utils.roundPad(circle.y(), 2);
}

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  // Sets x and y values
  circle.x(x);
  circle.y(y);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

```html
<div class="large row">
  <div class="col">
    <div class="large row">
      <pre class="large log row">
        <span class="label">x</span>
        <span class="coords x value">0</span>
      </pre>
    </div>
  </div>
  <div class="col" style="flex: .25; z-index: 3;">
    <div class="large centered row">
      <div class="circle"></div>
    </div>
  </div>
  <div class="col">
    <div class="large row">
      <pre class="large log row">
        <span class="label">y</span>
        <span class="coords y value">0</span>
      </pre>
    </div>
  </div>
</div>
<div class="medium centered row">
  <span class="label">Move cursor around</span>
</div>
```

###### Previous

###### Next

* [Animatable methods](https://animejs.com/documentation/animatable/animatable-methods "Animatable methods")
* [Setters](https://animejs.com/documentation/animatable/animatable-methods/setters "Setters")
