---
source: https://animejs.com/documentation/animation/tween-value-types/function-based
title: "Function based value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value")

Sets different values for each target of a multi-target animation by using a `Function` as the value.

Function-based values can be re-calculated without creating a new animation using the [`animation.refresh()`](https://animejs.com/documentation/animation/animation-methods/refresh "animation.refresh()") method.

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/function-based#accepts)

A `Function` with the following parameters:

```js
animate(targets, {
  x: (target, index, targets) => target.dataset.value * (targets.length - index),
});
```

## [Parameters](https://animejs.com/documentation/animation/tween-value-types/function-based#parameters)

| Name | Description |
| --- | --- |
| target | The current animated target element |
| index | The index of current targeted element |
| targets | The `Array` of all animated targets of the animation |
| prevTween | The previous sibling tween's computed end value for the same target and property |

Since version 4.4.0, the third argument of function-based value callbacks changed from `total` (`Number`) to `targets` (`Array`). To migrate, replace `total` with `targets.length`.

## [Must return](https://animejs.com/documentation/animation/tween-value-types/function-based#must-return)

* [Tween value](https://animejs.com/documentation/animation/tween-value-types "Tween value")
* [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

## Function based value code example

```js
import { animate, utils } from 'animejs';

animate('.square', {
  x: $el => /** @type {HTMLElement} */($el).getAttribute('data-x'),
  y: (_, i) => 50 + (-50 * i),
  scale: (_, i, t) => (t.length - i) * .75,
  rotate: () => utils.random(-360, 360),
  borderRadius: () => `+=${utils.random(0, 8)}`,
  duration: () => utils.random(1200, 1800),
  delay: () => utils.random(0, 400),
  ease: 'outElastic(1, .5)',
});
```

```html
<div class="medium row">
  <div class="square" data-x="170"></div>
</div>
<div class="medium row">
  <div class="square" data-x="80"></div>
</div>
<div class="medium row">
  <div class="square" data-x="270"></div>
</div>
```

###### Previous

###### Next

* [CSS variable](https://animejs.com/documentation/animation/tween-value-types/css-variable "CSS variable")
* [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")
