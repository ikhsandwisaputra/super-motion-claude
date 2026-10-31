---
source: https://animejs.com/documentation/animation/tween-value-types/color-value
title: "Color value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Color value](https://animejs.com/documentation/animation/tween-value-types/color-value "Color value")

Color values in the following formats can be parsed and used as values for animatable color properties.

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/color-value#accepts)

| Format | Syntax |
| --- | --- |
| HEX | `'#F44'` | `'#FF4444'` |
| HEXA | `'#F443'` | `'#FF444433'` |
| RGB | `'rgb(255, 168, 40)'` |
| RGBA | `'rgba(255, 168, 40, .2)'` |
| HSL | `'hsl(255, 168, 40)'` |
| HSLA | `'hsla(255, 168, 40, .2)'` |
| String name WAAPI | `'red'` | `'aqua'` |

## Color value code example

```js
import { animate } from 'animejs';

animate('.hex',  {
  background: '#FF4B4B',
});

animate('.rgb',  {
  background: 'rgb(255, 168, 40)',
});

animate('.hsl',  {
  background: 'hsl(44, 100%, 59%)',
});

animate('.hexa', {
  background: '#FF4B4B33',
});

animate('.rgba', {
  background: 'rgba(255, 168, 40, .2)',
});

animate('.hsla', {
  background: 'hsla(44, 100%, 59%, .2)',
});
```

```html
<div class="large justified row">
  <div class="circle hex"></div>
  <div class="circle rgb"></div>
  <div class="circle hsl"></div>
  <div class="circle hexa"></div>
  <div class="circle rgba"></div>
  <div class="circle hsla"></div>
</div>
```

```css
#colors .docs-demo-template { opacity: 0 }
```

###### Previous

###### Next

* [Relative value](https://animejs.com/documentation/animation/tween-value-types/relative-value "Relative value")
* [Color function value](https://animejs.com/documentation/animation/tween-value-types/color-function-value "Color function value")
