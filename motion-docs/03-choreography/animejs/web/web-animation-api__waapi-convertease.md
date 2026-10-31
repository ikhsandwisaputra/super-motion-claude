---
source: https://animejs.com/documentation/web-animation-api/waapi-convertease
title: "waapi.convertEase() | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [waapi.convertEase()](https://animejs.com/documentation/web-animation-api/waapi-convertease "waapi.convertEase()")

Converts any JavaScript easing functions into a compatible WAAPI [linear easing](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear "linear easing").

```js
import { waapi, spring } from 'animejs';

const spring = spring({ stiffness: 12 });

const linearEasing = waapi.convertEase(spring.ease);
```

## waapi.convertEase() code example

```js
import { waapi, spring } from 'animejs';

const springs = [
  spring({ stiffness: 100 }),
  spring({ stiffness: 150 }),
  spring({ stiffness: 200 })
]

document.querySelectorAll('#web-animation-api-waapi-convertease .demo .square').forEach(($el, i) => {
  $el.animate({
    translate: '17rem',
    rotate: '1turn',
  }, {
    easing: waapi.convertEase(springs[i].ease),
    delay: i * 250,
    duration: springs[i].duration,
    fill: 'forwards'
  });
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 100</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 150</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 200</div>
</div>
```

###### Previous

###### Next

* [finished](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished "finished")
* [Engine](https://animejs.com/documentation/engine "Engine")
