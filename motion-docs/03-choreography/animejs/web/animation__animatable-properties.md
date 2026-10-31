---
source: https://animejs.com/documentation/animation/animatable-properties
title: "Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

Define which properties of the [Targets](https://animejs.com/documentation/animation/targets "Targets") can be animated.
Animatable properties are defined in the parameters `Object` of the `animate()` function.

```js
animate('.square', {
┌──────────────────┐
│ translateX: 100, │
│ scale: 2,        ├─ Animatable Properties
│ opacity: .5,     │
└──────────────────┘
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

###### In this section

* [CSS Properties](https://animejs.com/documentation/animation/animatable-properties/css-properties "CSS Properties")
* [CSS transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms "CSS transforms")
* [CSS Variables](https://animejs.com/documentation/animation/animatable-properties/css-variables "CSS Variables")
* [JS Object properties](https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties "JavaScript Object properties")
* [HTML Attributes](https://animejs.com/documentation/animation/animatable-properties/html-attributes "HTML Attributes")
* [SVG Attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes "SVG Attributes")

###### Previous

###### Next

* [Array of targets](https://animejs.com/documentation/animation/targets/array-of-targets "Array of targets")
* [CSS Properties](https://animejs.com/documentation/animation/animatable-properties/css-properties "CSS Properties")
