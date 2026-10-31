---
source: https://animejs.com/documentation/animatable/animatable-methods/setters
title: "Setters | Animatable methods | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Methods](https://animejs.com/documentation/animatable/animatable-methods "Animatable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Setters](https://animejs.com/documentation/animatable/animatable-methods/setters "Setters")

Every animatable properties defined in the animatable parameters are transformed into methods and accessible on the animatable object.

When calling a method with at least one argument, the method acts as a setter, and returns the animatable instance, allowing chaining methods calls.

```js
animatable.property(value, duration, easing);
```

## [Parameters](https://animejs.com/documentation/animatable/animatable-methods/setters#parameters)

| Name | Type | Description |
| --- | --- | --- |
| value | `Number` | `Array<Number>` | Defines the new value of the animatable to animate to |
| duration (opt) | `Number` | Optional new transition duration in ms |
| easing (opt) | [ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease") | Optional new easing function of the animation |

## [Returns](https://animejs.com/documentation/animatable/animatable-methods/setters#returns)

The animatable object itself, allowing for chaining of multiple property setter calls:

```js
animatable.x(100).y(200); // Animate x to 100 and y to 200 in 500ms
```

## Setters code example

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable('.circle', {
  x: 0,
  y: 0,
  backgroundColor: 0,
  ease: 'outExpo',
});

const rgb = [164, 255, 79];

// Sets new durations and easings
circle.x(0, 500, 'out(2)');
circle.y(0, 500, 'out(3)');
circle.backgroundColor(rgb, 250);

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  rgb[0] = utils.mapRange(x, -hw, hw, 0, 164);
  rgb[2] = utils.mapRange(x, -hw, hw, 79, 255);
  circle.x(x).y(y).backgroundColor(rgb); // Update values
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

```html
<div class="large centered row">
  <div class="circle"></div>
</div>
<div class="medium centered row">
  <span class="label">Move cursor around</span>
</div>
```

###### Previous

###### Next

* [Getters](https://animejs.com/documentation/animatable/animatable-methods/getters "Getters")
* [revert()](https://animejs.com/documentation/animatable/animatable-methods/revert "revert()")
