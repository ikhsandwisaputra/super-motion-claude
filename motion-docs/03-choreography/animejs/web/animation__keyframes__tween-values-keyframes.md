---
source: https://animejs.com/documentation/animation/keyframes/tween-values-keyframes
title: "Tween values keyframes | Keyframes | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Tween values keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes "Tween values keyframes")

Sequences multiple [Tween value](https://animejs.com/documentation/animation/tween-value-types "Tween value types") specific to an [Animatable property](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") using an `Array`.
The duration between each keyframe equals the total animation duration divided by the number of transitions between each keyframes.
The first keyframe defines the [from value](https://animejs.com/documentation/animation/tween-parameters/from "from value") of the tween.

You can use this syntax to quickly set the initial [from value](https://animejs.com/documentation/animation/tween-parameters/from "from value") value of an animation:

```js
animate(target: { x: [-100, 100] }); // Animate x from -100 to 100
```

## [Accepts](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes#accepts)

An `Array` of valid [Tween values](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

## Tween values keyframes code example

```js
import { animate } from 'animejs';

animate('.square', {
  translateX: ['0rem', 0, 17, 17, 0, 0],
  translateY: ['0rem', -2.5, -2.5, 2.5, 2.5, 0],
  scale: [1, 1, .5, .5, 1, 1],
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

* [Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")
* [Tween parameters keyframes](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes "Tween parameters keyframes")
