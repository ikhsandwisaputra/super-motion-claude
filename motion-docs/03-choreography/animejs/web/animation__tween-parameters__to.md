---
source: https://animejs.com/documentation/animation/tween-parameters/to
title: "to | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [to](https://animejs.com/documentation/animation/tween-parameters/to "to")

Animates *to* a specified value from the current target value.
Must be defined inside a local tween parameter `Object`.

## [Required](https://animejs.com/documentation/animation/tween-parameters/to#required)

Only if no [from](https://animejs.com/documentation/animation/tween-parameters/from "from") property is defined

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/to#accepts)

* Any valid [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")
* An `Array` of two [Tween value keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes "Tween value keyframes") (`[fromValue, toValue]`)

## [Default](https://animejs.com/documentation/animation/tween-parameters/to#default)

The current target value is used if only a [from](https://animejs.com/documentation/animation/tween-parameters/from "from") property is defined

## to code example

```js
import { animate } from 'animejs';

animate('.square', {
  x: {
    to: '16rem', // From 0px to 16rem
    ease: 'outCubic',
  },
  rotate: {
    to: '.75turn', // From 0turn to .75turn
    ease: 'inOutQuad'
  },
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")
* [from](https://animejs.com/documentation/animation/tween-parameters/from "from")
