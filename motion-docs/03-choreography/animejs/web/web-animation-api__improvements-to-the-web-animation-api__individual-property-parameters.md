---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters
title: "Individual property parameters | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Individual property parameters](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters "Individual property parameters")

Each property can have specific `delay`, `duration` and `ease` parameters by passing an `Object` with at least one [`to`](https://animejs.com/documentation/animation/tween-parameters/to "`to`") or [`from`](https://animejs.com/documentation/animation/tween-parameters/from "`from`") properties as value.

## Individual property parameters code example

```js
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  y: {
    to: [0, -30, 0],
    ease: 'out(4)',
    duration: 1000,
  },
  rotate: { from: -180, to: 0, ease: 'out(3)' },
  scale: { to: [.65, 1, .65], ease: 'inOut(3)' },
  duration: 500,
  delay: stagger(75),
  loop: true,
});
```

```html
<div class="large row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Individual CSS transforms](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms "Individual CSS transforms")
* [Spring and custom easings](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings "Spring and custom easings")
