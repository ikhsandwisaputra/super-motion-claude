---
source: https://animejs.com/documentation/animation/keyframes/duration-based-keyframes
title: "Duration based keyframes | Keyframes | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Duration based keyframes JS](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes "Duration based keyframes")

Sequences multiple [Animatable property](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") one after another.

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default duration of a keyframe equals the total animation duration divided by the total number of keyframes.

```js
keyframes: [
  { y: 50, ease: 'out', duration: 400 },
  { x: 75, scale: .5, duration: 800 },
]
```

## [Accepts](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes#accepts)

An `Array` of `Object` containing one [Animatable property](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") and [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

## Duration based keyframes code example

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', ease: 'out', duration: 400 },
    { x: '17rem', scale: .5, duration: 800 },
    { y: '2.5rem' }, // The duration here is 3000 / 5 = 600ms
    { x: 0, scale: 1, duration: 800 },
    { y: 0, ease: 'in', duration: 400 }
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Tween parameters keyframes](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes "Tween parameters keyframes")
* [Percentage based keyframes](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes "Percentage based keyframes")
