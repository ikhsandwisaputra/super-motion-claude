---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units
title: "Default units | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Default units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units "Default units")

If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit for a set of commonly used properties:

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units#syntax-comparison)

### Anime.js

```js
waapi.animate('.circle', {
  x: 100,
  y: 50,
  width: 150,
  height: 80,
});
```

### WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({
  translate: '100px 50px',
  width: '150px',
  height: '80px',
}, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```

## [Properties that automatically adds default units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units#properties-that-automatically-adds-default-units)

| Name | Default Unit |
| --- | --- |
| x | `'px'` |
| y | `'px'` |
| z | `'px'` |
| translateX | `'px'` |
| translateY | `'px'` |
| translateZ | `'px'` |
| rotate | `'deg'` |
| rotateX | `'deg'` |
| rotateY | `'deg'` |
| rotateZ | `'deg'` |
| skew | `'deg'` |
| skewX | `'deg'` |
| skewY | `'deg'` |
| perspective | `'px'` |
| width | `'px'` |
| height | `'px'` |
| margin | `'px'` |
| padding | `'px'` |
| top | `'px'` |
| right | `'px'` |
| bottom | `'px'` |
| left | `'px'` |
| borderWidth | `'px'` |
| fontSize | `'px'` |
| borderRadius | `'px'` |

## Default units code example

```js
import { waapi } from 'animejs';

waapi.animate('.square', {
  opacity: .5,
  x: 250,
  rotate: 45,
  width: 40,
  height: 40,
});
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

* [Multi-targets animation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation "Multi-targets animation")
* [Function based values](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values "Function based values")
