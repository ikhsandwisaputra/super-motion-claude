---
source: https://animejs.com/documentation/animation/tween-parameters/ease
title: "ease | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

Defines the [easing function](https://animejs.com/documentation/easings "easing function") for all animated properties or a specific property.
Easing functions control the rate of change of a property value over time, determining the animation's speed at different points during playback.

All Anime.js built-in easing functions can either be used by passing the easing name `String` or the function accessible on the `eases` object.

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/ease#accepts)

* An [easing](https://animejs.com/documentation/easings "easing") `Function`
* A [built-in ease](https://animejs.com/documentation/easings/built-in-eases) `String`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns an [easing](https://animejs.com/documentation/easings "easing") `Function` or a [built-in ease](https://animejs.com/documentation/easings/built-in-eases) `String`

## [Default](https://animejs.com/documentation/animation/tween-parameters/ease#default)

`'out(2)'`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.ease = 'outElastic(1, .5)'; // v3 throwback :)
```

## ease code example

```js
import { animate, waapi, eases, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inQuad',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: eases.outQuad,
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: {
    to: 360,
    ease: 'out(6)',
  },
  ease: spring({ stiffness: 70 }),
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: 'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: eases.outQuad</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">x: spring()<br>rotate: 'inQuad'</div>
</div>
```

###### Previous

###### Next

* [duration](https://animejs.com/documentation/animation/tween-parameters/duration "duration")
* [composition](https://animejs.com/documentation/animation/tween-parameters/composition "composition")
