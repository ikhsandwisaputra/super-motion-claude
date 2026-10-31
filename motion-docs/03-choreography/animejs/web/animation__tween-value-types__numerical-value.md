---
source: https://animejs.com/documentation/animation/tween-value-types/numerical-value
title: "Numerical value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Numerical value](https://animejs.com/documentation/animation/tween-value-types/numerical-value "Numerical value")

Specifies the numerical value of the animated property by passing either a `Number` or a `String` containing at least one `Number`.

If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit.

```js
animate(target, { width: 100 }); // Defaults to px
```

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/numerical-value#accepts)

* `Number`
* `String`

If a specific unit is already specified, the JS `animate()` method can inherits previously defined units and the next value set without a unit on the same target property inherits the previously defined unit.

```js
animate(target, { width: '50%' }); // Uses '%'
animate(target, { width: 75 });    // Inherits '%' -> '75%'
```

The WAAPI `animate()` method only falls back automatically to `'px'` with the following properties:

```
- x / translateX
- y / translateY
- z / translateZ
- perspective
- top
- right
- bottom
- left
- width
- height
- margin
- padding
- borderWidth
- borderRadius
- fontSize
```

## Numerical value code example

```js
import { waapi } from 'animejs';

waapi.animate('.square', {
  x: 240, //  -> 240px
  width: 75, // -> 75px
  rotate: '.75turn',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")
* [Unit conversion value](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value "Unit conversion value")
