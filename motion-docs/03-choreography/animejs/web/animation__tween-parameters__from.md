---
source: https://animejs.com/documentation/animation/tween-parameters/from
title: "from | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [from](https://animejs.com/documentation/animation/tween-parameters/from "from")

Animates *from* a specified value to the current target value.
Must be defined inside a local tween parameter `Object`.

## [Required](https://animejs.com/documentation/animation/tween-parameters/from#required)

Only if no [to](https://animejs.com/documentation/animation/tween-parameters/to "to") property is defined

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/from#accepts)

* Any valid [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

## [Default](https://animejs.com/documentation/animation/tween-parameters/from#default)

The current target value is used if only a [to](https://animejs.com/documentation/animation/tween-parameters/to "to") property is defined

## from code example

```js
import { animate } from 'animejs';

animate('.square', {
  opacity: { from: .5 }, // Animate from .5 opacity to 1 opacity
  translateX: { from: '16rem' }, // From 16rem to 0rem
  rotate: {
    from: '-.75turn', // From -.75turn to 0turn
    ease: 'inOutQuad',
  },
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [to](https://animejs.com/documentation/animation/tween-parameters/to "to")
* [delay](https://animejs.com/documentation/animation/tween-parameters/delay "delay")
