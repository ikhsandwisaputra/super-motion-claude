---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values
title: "Function based values | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Function based values](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values "Function based values")

Adds [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") support to WAAPI animations, allowing passing different values pert targets.

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values#syntax-comparison)

### Anime.js

```js
waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  delay: stagger(100)
});
```

### WAAPI equivalent

```js
document.querySelectorAll('.square').forEach(($el, i) => {
  $el.animate({
    translate: `${utils.random(10, 17)}rem`,
    rotate: utils.random(-180, 180),
    scale: .25 + (i * .25),
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```

## Function based values code example

```js
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  duration: $el => $el.dataset.duration,
  delay: stagger(100)
});
```

```html
<div class="small row">
  <div data-duration="400" class="square"></div>
</div>
<div class="small row">
  <div data-duration="600" class="square"></div>
</div>
<div class="small row">
  <div data-duration="800" class="square"></div>
</div>
<div class="small row">
  <div data-duration="1000" class="square"></div>
</div>
```

###### Previous

###### Next

* [Default units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units "Default units")
* [Individual CSS transforms](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms "Individual CSS transforms")
