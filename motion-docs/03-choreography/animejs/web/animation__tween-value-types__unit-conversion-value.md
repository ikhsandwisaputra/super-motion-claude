---
source: https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value
title: "Unit conversion value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Unit conversion value](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value "Unit conversion value")

Converts and animates to a value with a different unit than the default or currently used one.

When using the JS `animate()` method, unit conversions may sometimes produce unexpected results depending on the unit type and animated properties used.
For more predictable results, it's recommended to define the unit outside of the animation using [`utils.set()`](https://animejs.com/documentation/utilities/set "utils.set()"), and then animate to the current unit.

Or simply use the WAAPI `animate()` method.

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value#accepts)

`String`

## Unit conversion value code example

```js
import { animate, utils } from 'animejs';

animate('.square', {
  width: '25%', // from '48px' to '25%',
  x: '15rem', // from '0px' to '15rem',
  rotate: '.75turn', // from `0deg` to '.75turn',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Numerical value](https://animejs.com/documentation/animation/tween-value-types/numerical-value "Numerical value")
* [Relative value](https://animejs.com/documentation/animation/tween-value-types/relative-value "Relative value")
