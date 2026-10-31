---
source: https://animejs.com/documentation/animation/keyframes
title: "Keyframes | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")

Create a sequence of animations on the same animatable property.

## [Property value keyframes](https://animejs.com/documentation/animation/keyframes#property-value-keyframes)

Specific to an animated property, these keyframes are passed to the property value directly:

```js
animate('.square', {
┌───────────────────┐
│ x: [0, 100, 200], ├─ Tween Values Array
│ y: [0, 100, 200], │
└───────────────────┘
  duration: 3000,
}

animate('.square', {
┌────────────────────────────┐
│ x: [{to: 100}, {to: 200}], ├─ Tween Parameters Array
│ y: [{to: 100}, {to: 200}], │
└────────────────────────────┘
  duration: 3000,
}
```

## [Animation keyframes](https://animejs.com/documentation/animation/keyframes#animation-keyframes)

Defined at the animation level, these keyframes can animate multiple properties per keyframe:

```js
animate('.square', {
┌───────────────────────┐
│ keyframes: [          │
│   { x: 100, y: 100 }, ├─ Duration Based
│   { x: 200, y: 200 }, │
│ ],                    │
└───────────────────────┘
  duration: 3000,
}

animate('.square', {
┌───────────────────────────────┐
│ keyframes: {                  │
│   '0%'  : { x: 0,   y: 0   }, │
│   '50%' : { x: 100, y: 100 }, ├─ Percentage Based
│   '100%': { x: 200, y: 200 }, │
│ },                            │
└───────────────────────────────┘
  duration: 3000,
}
```

###### In this section

* [Tween values](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes "Tween values keyframes")
* [Tween parameters](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes "Tween parameters keyframes")
* [Duration based](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes "Duration based keyframes")
* [Percentage based](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes "Percentage based keyframes")

###### Previous

###### Next

* [modifier](https://animejs.com/documentation/animation/tween-parameters/modifier "modifier")
* [Tween values keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes "Tween values keyframes")
