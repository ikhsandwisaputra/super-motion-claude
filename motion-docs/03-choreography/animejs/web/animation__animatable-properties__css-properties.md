---
source: https://animejs.com/documentation/animation/animatable-properties/css-properties
title: "CSS Properties | Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [CSS Properties](https://animejs.com/documentation/animation/animatable-properties/css-properties "CSS Properties")

Any CSS numerical and color properties can be animated.
Properties containing a dash in their name, like `background-color`, must be converted to camel case (`backgroundColor`), or written as a `String` (`'background-color'`).

Most CSS properties can cause layout changes or repaint leading to choppy animations. To achieve smoother animations, always prioritise opacity and [CSS transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms "CSS transforms") as much as possible.

## CSS Properties code example

```js
import { animate } from 'animejs';

animate('.square', {
  left: 'calc(7.75rem * 2)',
  borderRadius: 64,
  'background-color': '#F9F640',
  filter: 'blur(5px)',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")
* [CSS transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms "CSS transforms")
