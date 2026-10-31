---
source: https://animejs.com/documentation/animation/tween-value-types/css-variable
title: "CSS variable | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 4.2.0](https://github.com/juliangarnier/anime/releases/tag/v4.2.0)

# [CSS variable](https://animejs.com/documentation/animation/tween-value-types/css-variable "CSS variable")

CSS variables can be used as animation values by simply passing the variable name with the `'var(--my-value)'` syntax.

The JS `animate()` version needs to compute the variable in order to animate its value. This means the animation won't reflect the new value if the variable is updated separately. To update a CSS variable in a JS Animation, you can call [`.refresh()`](https://animejs.com/documentation/animation/animation-methods/refresh ".refresh()").

```js
target.style.setProperty('--x', '100px');
// Animate x to 100px
const anim = animate(target, { x: 'var(--x)' });
target.style.setProperty('--x', '200px');
// Restart, and refresh the value to animate x to 200px
anim.restart().refresh()
```

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/css-variable#accepts)

[CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#referencing_custom_properties_with_var "CSS variable") `String`

## CSS variable code example

```js
import { waapi, animate, stagger } from 'animejs';

waapi.animate('.square',  {
  rotate: 'var(--rotation)',
  borderColor: ['var(--hex-orange-1)', 'var(--hex-red-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
});

animate('.square',  {
  scale: 'var(--scale)',
  background: ['var(--hex-red-1)', 'var(--hex-orange-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

```css
#animation-tween-value-types-css-variable .docs-demo-template { opacity: 0 }
#animation-tween-value-types-css-variable .square { --rotation: 90deg; --scale: 1.5; border: 10px solid currentColor }
```

###### Previous

###### Next

* [Color function value](https://animejs.com/documentation/animation/tween-value-types/color-function-value "Color function value")
* [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value")
