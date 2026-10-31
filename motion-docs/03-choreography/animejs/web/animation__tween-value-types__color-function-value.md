---
source: https://animejs.com/documentation/animation/tween-value-types/color-function-value
title: "Color function value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Color function value WAAPI](https://animejs.com/documentation/animation/tween-value-types/color-function-value "Color function value")

The CSS [`color()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color "`color()`") function can be animated with the WAAPI `animate()` method.

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/color-function-value#accepts)

Any [valid CSS color space syntax](https://developer.mozilla.org/en-US/docs/Glossary/Color_space#named_color_spaces "CSS color space syntax") is supported

## Color function value code example

```js
import { waapi } from 'animejs';

waapi.animate('.circle',  {
  backgroundColor: 'color(display-p3 1.0 0.267 0.267 / 1.0)',
});
```

```html
<div class="large justified row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

```css
.is-active > #animation-tween-value-types-color-function-value .docs-demo-template { opacity: 0 }
.is-active > #animation-tween-value-types-color-function-value .circle { background-color: color(display-p3 1.000000 0.780392 0.188235 / 1.000000) }
```

###### Previous

###### Next

* [Color value](https://animejs.com/documentation/animation/tween-value-types/color-value "Color value")
* [CSS variable](https://animejs.com/documentation/animation/tween-value-types/css-variable "CSS variable")
