---
source: https://animejs.com/documentation/animation/tween-parameters/duration
title: "duration | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [duration](https://animejs.com/documentation/animation/tween-parameters/duration "duration")

Defines the duration in milliseconds of all animated properties, or of a specific property.

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/duration#accepts)

* A `Number` equal to or greater than `0`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

Duration values higher than `1e12` or equal to `Infinity` are clamped internally to `1e12` (approximately 32 years).

## [Default](https://animejs.com/documentation/animation/tween-parameters/duration#default)

The animation duration value (default `1000`).

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.duration = 500;
```

## duration code example

```js
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    duration: 1500, // Local duration only applied to rotate property
  },
  duration: 3000,  // Global duration applied to all properties
  loop: true,
  alternate: true
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [delay](https://animejs.com/documentation/animation/tween-parameters/delay "delay")
* [ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")
