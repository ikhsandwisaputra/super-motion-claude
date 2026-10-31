---
source: https://animejs.com/documentation/web-animation-api/when-to-use-waapi
title: "When to use WAAPI | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [When to use WAAPI](https://animejs.com/documentation/web-animation-api/when-to-use-waapi "When to use WAAPI")

The Web Animations API (WAAPI) offers a lot of advantages over JavaScript `requestAnimationFrame` (RAF) powered animations, but both have their strengths and downsides, and depending on the type of animation or the context in which an animation is created, it's not always possible or even recommended to use WAAPI over RAF.

## [Prioritize `waapi.animate()` when:](https://animejs.com/documentation/web-animation-api/when-to-use-waapi#prioritize-waapi-animate-when)

* Animating during CPU/network load (see the [hardware-accelerated animations](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations) section)
* Initial page load time is critical and every KB counts (3KB gzip vs 10KB for the JavaScript version)
* Animating complex CSS values not correctly handled by the JavaScript version, like CSS transform matrixes or CSS color functions.

## [Use `animate()` when:](https://animejs.com/documentation/web-animation-api/when-to-use-waapi#use-animate-when)

* Animating a large amount of targets (> 500)
* Animating JS/canvas/WebGL/WebGPU
* Animating SVG, DOM attributes or CSS properties not handled by the Web Animation API
* Animating complex timelines and keyframes
* You need more [control methods](https://animejs.com/documentation/animation/animation-methods "control methods")
* You need more advanced [callback functions](https://animejs.com/documentation/animation/animation-callbacks "callback functions")

## When to use WAAPI code example

```js
import { animate, waapi, utils } from 'animejs';

// WAAPI Animation

waapi.animate('.waapi.square', {
  x: '17rem',
  rotate: 180,
  loop: 3,
  alternate: true,
});

// JS Animation

const data = { x: '0rem', rotate: '0deg' }
const [ $log ] = utils.$('code');

animate(data, {
  x: 17,
  rotate: 180,
  modifier: utils.round(0),
  loop: 3,
  alternate: true,
  onRender: () => $log.innerHTML = JSON.stringify(data)
});
```

```html
<div class="medium row">
  <div class="square waapi"></div>
</div>
<div class="small row"></div>
<pre class="medium centered row">
  <code>{"x": '0rem',"rotate":"0deg"}</code>
</pre>
```

###### Previous

###### Next

* [Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")
* [Hardware-accelerated animations](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations "Hardware-accelerated animations")
