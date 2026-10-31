---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings
title: "Spring and custom easings | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Spring and custom easings](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings "Spring and custom easings")

Uses any spring and custom JavaScript easing function.

All Anime.js built-in easing functions can be used by passing the function accessible on the `eases` object.

```js
import { eases } from 'animejs';

const { linear, outExpo, cubicBezier } = eases;
```

The `spring()` easing function must be imported separately.

```js
import { spring } from 'animejs';
```

## [Built-in eases](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings#built-in-eases)

| Built-in string | Function | Parameters |
| --- | --- | --- |
| `'linear'` `'linear(0, .5 75%, 1)'` | `linear()` | coords (`0, '.5 75%', 1`) |
| `'steps'` `'steps(10)'` | `steps()` | steps = `10` |
| `'cubicBezier'` `'cubicBezier(.5,0,.5,1)'` | `cubicBezier()` | x1 = `.5`, y1 = `0`, x2 = `.5`, y2 = `1` |
| `'in'` `'in(1.675)'` | `in()` | power = `1.675` |
| `'out'` `'out(1.675)'` | `out()` | power = `1.675` |
| `'inOut'` `'inOut(1.675)'` | `inOut()` | power = `1.675` |

## [Default](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings#default)

`'out(2)'`

## Spring and custom easings code example

```js
import { waapi, utils, stagger, spring } from 'animejs';

waapi.animate('.circle', {
  y: [0, -30, 0],
  ease: spring({ stiffness: 150, damping: 5 }),
  delay: stagger(75),
  loop: true,
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

###### Previous

###### Next

* [Individual property parameters](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters "Individual property parameters")
* [API differences with native WAAPI](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")
