---
source: https://animejs.com/documentation/animation/tween-parameters/delay
title: "delay | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [delay](https://animejs.com/documentation/animation/tween-parameters/delay "delay")

Defines the delay in milliseconds at the beginning of all animated properties, or locally to a specific property.

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/delay#accepts)

* A `Number` equal to or greater than `0`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/animation/tween-parameters/delay#default)

The animation delay value (default `0`).

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## delay code example

```js
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    delay: 1000, // Local delay applied only to rotate property
  },
  delay: 500,  // Global delay applied to all properties
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

* [from](https://animejs.com/documentation/animation/tween-parameters/from "from")
* [duration](https://animejs.com/documentation/animation/tween-parameters/duration "duration")
