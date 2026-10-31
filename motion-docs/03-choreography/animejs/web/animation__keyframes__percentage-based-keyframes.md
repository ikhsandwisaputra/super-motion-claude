---
source: https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes
title: "Percentage based keyframes | Keyframes | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Percentage based keyframes JS](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes "Percentage based keyframes")

Sequences multiple [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") with positions defined from a percentage of the animation total duration.

This syntax is very similar to the CSS `@keyframes` syntax and only exposes control over the [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") parameter for each individual keyframes.

The first keyframe defines the [from value](https://animejs.com/documentation/animation/tween-parameters/from "from value") of the tween.

```js
keyframes: {
  '25%' : { x: 100, y: 50, ease: 'out' },
  '50%' : { x: 200, y: 75, },
}
```

## [Accepts](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes#accepts)

An `Object` where

* `keys` are `String` representing the percentages
* `values` are an `Object` containing at least one [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties") and an optional [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") parameter.

## Percentage based keyframes code example

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: {
    '0%'  : { x: '0rem', y: '0rem', ease: 'out' },
    '13%' : { x: '0rem', y: '-2.5rem', },
    '37%' : { x: '17rem', y: '-2.5rem', scale: .5 },
    '63%' : { x: '17rem', y: '2.5rem', scale: .5 },
    '87%' : { x: '0rem', y: '2.5rem', scale: 1 },
    '100%': { y: '0rem', ease: 'in' }
  },
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

* [Duration based keyframes](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes "Duration based keyframes")
* [Animation playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")
