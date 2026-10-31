---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults
title: "Sensible defaults | Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Sensible defaults](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults "Sensible defaults")

By default, a native WAAPI animation requires a duration to be set, won't have any easing applied, and more annoyingly, won't persist its final value, letting the user to take care of setting the final styles manually after the animation completes.
Anime.js simplifies all that by making sure the animation state is preserved after the animation completes, and uses the same default duration and delay as the JS `animate()` method.

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults#syntax-comparison)

### Anime.js

```js
waapi.animate('.circle', { translate: '100px' });
```

### WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({ translate: '100px' }, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```

## Sensible defaults code example

```js
import { waapi } from 'animejs';

waapi.animate('.circle', { translate: '16rem' });
```

```html
<div class="large row">
  <div class="circle"></div>
</div>
```

###### Previous

###### Next

* [Improvements to the Web Animation API](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")
* [Multi-targets animation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation "Multi-targets animation")
