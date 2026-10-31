---
source: https://animejs.com/documentation/animation/tween-value-types
title: "Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

Specify the *start* and *end* values that define the animation of animatable properties.
Animation values are assigned to [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") and accept a wide range of syntaxes.

```js
animate('.square', {
  x: '6rem', ─────────────────┐
  y: $el => $el.dataset.y, ───┤
  scale: '+=.25', ────────────┼─ Tween Values
  opacity: {                  │
    from: .4, ────────────────┘
  },
});
```

###### In this section

* [Numerical](https://animejs.com/documentation/animation/tween-value-types/numerical-value "Numerical value")
* [Unit conversion](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value "Unit conversion value")
* [Relative](https://animejs.com/documentation/animation/tween-value-types/relative-value "Relative value")
* [Color](https://animejs.com/documentation/animation/tween-value-types/color-value "Color value")
* [Color function](https://animejs.com/documentation/animation/tween-value-types/color-function-value "Color function value")
* [CSS variable](https://animejs.com/documentation/animation/tween-value-types/css-variable "CSS variable")
* [Function based](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value")

###### Previous

###### Next

* [SVG Attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes "SVG Attributes")
* [Numerical value](https://animejs.com/documentation/animation/tween-value-types/numerical-value "Numerical value")
