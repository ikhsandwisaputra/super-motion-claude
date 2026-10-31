---
source: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction
title: "direction | API differences with native WAAPI | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[API differences](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [direction](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction "direction")

The `direction` parameter is replaced by two separate parameters: `reversed` and `alternate`.

| `direction` | `reversed` | `alternate` | Effect |
| --- | --- | --- | --- |
| `'forward'` | `false` | `false` | Play forward |
| `'reverse'` | `true` | `false` | Play backward |
| `'alternate'` | `false` | `true` | Alternate on loop |
| `'alternate-reverse'` | `true` | `true` | Start in reverse and alternate on loop |

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction#syntax-comparison)

### Anime.js

```js
waapi.animate('.square', {
  x: 100,
  reversed: true,
  alternate: true,
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
    direction: 'alternate-reverse',
    iterations: 4
  })
});
```

## [Accepts](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction#accepts)

* `Boolean`

## direction code example

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  reversed: true,
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

* [iterations](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations "iterations")
* [easing](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing "easing")
