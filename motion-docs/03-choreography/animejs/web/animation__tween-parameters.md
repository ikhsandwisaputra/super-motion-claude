---
source: https://animejs.com/documentation/animation/tween-parameters
title: "Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

Configure values, timings, and behaviors of animated properties.
Tween parameters can be specified *globally* for all properties directly with the other animation parameters, or *locally* for a specific property using an `Object`.
All animatable properties inherit the *global* parameters, which can be overridden *locally* for a specific tween.

```js
animate('.square', {
  x: {
┌───────────────────┐
│   to: 100,        │
│   delay: 0,       ├─ Local Tween Parameters
│   ease: 'inOut(4)'│
└───────────────────┘
  },
  scale: 1,
  opacity: .5,
┌───────────────────┐
│ duration: 400,    │
│ delay: 250,       ├─ Global Tween Parameters
│ ease: 'out(3)',   │
└───────────────────┘
  loop: 3,
  alternate: true,
});
```

###### In this section

* [to](https://animejs.com/documentation/animation/tween-parameters/to "to")
* [from](https://animejs.com/documentation/animation/tween-parameters/from "from")
* [delay](https://animejs.com/documentation/animation/tween-parameters/delay "delay")
* [duration](https://animejs.com/documentation/animation/tween-parameters/duration "duration")
* [ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")
* [composition](https://animejs.com/documentation/animation/tween-parameters/composition "composition")
* [modifier](https://animejs.com/documentation/animation/tween-parameters/modifier "modifier")

###### Previous

###### Next

* [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value")
* [to](https://animejs.com/documentation/animation/tween-parameters/to "to")
