---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation
title: "Multi-targets animation | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Multi-targets animation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation "Multi-targets animation")

Targets one or multiple DOM Elements using a CSS selector, allowing animating multiple targets in one single `animate()` call and support of the [`stagger()`](https://animejs.com/documentation/utilities/stagger "`stagger()`") method.

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation#syntax-comparison)

### Anime.js

```js
waapi.animate('.circle', {
  translate: '100px',
  delay: stagger(100),
});
```

### WAAPI equivalent

```js
document.querySelectorAll('.circle').forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```

## [Accepts](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation#accepts)

Any `String` accepted by `document.querySelectorAll()`

## Multi-targets animation code example

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.circle', {
  translate: '17rem',
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

```html
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
```

###### Previous

###### Next

* [Sensible defaults](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults "Sensible defaults")
* [Default units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units "Default units")
