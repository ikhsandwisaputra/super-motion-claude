---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms
title: "Individual CSS transforms | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Individual CSS transforms](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms "Individual CSS transforms")

Unlike CSS animations or native WAAPI, the CSS `transform` property can be animated by specifying individual properties.
This allows a greater level of control over how to animate individual transform properties.

Individual transforms with WAAPI only works for browsers that support [`CSS.registerProperty(propertyDefinition)`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static "CSS.registerProperty(propertyDefinition)"), and fallback to no animations.

Individual transforms cannot be [hardware-accelerated](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations "hardware-accelerated").

## [Valid individual CSS transforms properties](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms#valid-individual-css-transforms-properties)

| Name | Shorthand | Default Value | Default Unit |
| --- | --- | --- | --- |
| translateX | x | `'0px'` | `'px'` |
| translateY | y | `'0px'` | `'px'` |
| translateZ | z | `'0px'` | `'px'` |
| rotate | — | `'0deg'` | `'deg'` |
| rotateX | — | `'0deg'` | `'deg'` |
| rotateY | — | `'0deg'` | `'deg'` |
| rotateZ | — | `'0deg'` | `'deg'` |
| scale | — | `'1'` | — |
| scaleX | — | `'1'` | — |
| scaleY | — | `'1'` | — |
| scaleZ | — | `'1'` | — |
| skew | — | `'0deg'` | `'deg'` |
| skewX | — | `'0deg'` | `'deg'` |
| skewY | — | `'0deg'` | `'deg'` |

## Individual CSS transforms code example

```js
import { waapi, utils } from 'animejs';

const $squares = utils.$('.square');

const animateSquares = () => {
  waapi.animate($squares, {
    x: () => utils.random(0, 17) + 'rem',
    y: () => utils.random(-1, 1) + 'rem',
    rotateX: () => utils.random(-90, 90),
    rotateY: () => utils.random(-90, 90),
    onComplete: () => animateSquares()
  });
}

animateSquares();
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Function based values](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values "Function based values")
* [Individual property parameters](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters "Individual property parameters")
