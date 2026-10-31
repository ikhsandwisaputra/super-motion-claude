---
source: https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes
title: "Tween parameters keyframes | Keyframes | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Tween parameters keyframes JS](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes "Tween parameters keyframes")

Sequences multiple [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters") specific to an [Animatable property](https://animejs.com/documentation/animation/animatable-properties "Animatable properties").

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default `duration` of a keyframe equals the total animation duration divided by the total number of keyframes.

## [Accepts](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes#accepts)

An `Array` of [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

## Tween parameters keyframes code example

```js
import { animate } from 'animejs';

animate('.square', {
  x: [
    { to: '17rem', duration: 700, delay: 400 },
    { to: 0, duration: 700, delay: 800 },
  ],
  y: [
    { to: '-2.5rem', ease: 'out', duration: 400 },
    { to: '2.5rem', duration: 800, delay: 700 },
    { to: 0, ease: 'in', duration: 400, delay: 700 },
  ],
  scale: [
    { to: .5, duration: 700, delay: 400 },
    { to: 1, duration: 700, delay: 800 },
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

* [Tween values keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes "Tween values keyframes")
* [Duration based keyframes](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes "Duration based keyframes")
