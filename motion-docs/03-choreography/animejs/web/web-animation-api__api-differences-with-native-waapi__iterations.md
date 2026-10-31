---
source: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations
title: "iterations | API differences with native WAAPI | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[API differences](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [iterations](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations "iterations")

The `iterations` parameter is replaced by the `loop` parameter and determines how many times the animation will repeat instead of the total number of iterations.

| `iterations` | `loop` | Effect |
| --- | --- | --- |
| `1` | `0` | No repeat |
| `3` | `2` | Repeat twice |
| `Infinity` | `Infinity` | `true` | -1 | Repeat indefinitely |

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations#syntax-comparison)

### Anime.js

```js
waapi.animate('.square', {
  x: 100,
  loop: 3
});
```

### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');

targets.forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 1000,
    iterations: 4
  })
});
```

## [Accepts](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations#accepts)

* A `Number` `[0, Infinity]`
* A `Boolean` where `true` is equivalent to `Infinity` and `false` doesn't loop

## iterations code example

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  loop: 3,
  alternate: true,
  delay: stagger(100)
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [API differences with native WAAPI](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")
* [direction](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction "direction")
