---
source: https://animejs.com/documentation/easings
title: "Easings | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

# [Easings](https://animejs.com/documentation/easings "Easings")

## [A collection of easing functions and a physics-based spring generator](https://animejs.com/documentation/easings#a-collection-of-easing-functions-and-a-physics-based-spring-generator)

Use the [**Easing Functions Editor**](https://animejs.com/easing-editor) to visualize, create and customize easing functions.

All easing functions are available on the `easings` object imported from the main `'animejs'` module:

```js
import { easings } from 'animejs';

easings.eases.inOut(3);
easings.cubicBezier(.7, .1, .5, .9);
easings.spring({ bounce: .35 });
```

Or imported directly from the main `'animejs'` module:

```js
import { eases, cubicBezier, spring } from 'animejs';

eases.inOut(3);
cubicBezier(.7, .1, .5, .9);
spring({ bounce: .35 });
```

Or imported as a standalone module from the `'animejs/easings'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { eases, cubicBezier, spring } from 'animejs/easings';
```

Easing and spring functions can be passed to the [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") and [`playbackEase`](https://animejs.com/documentation/animation/animation-playback-settings/playbackease) parameters of the [`animate()`](https://animejs.com/documentation/animation "animate()") method or the [`ease`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease) parameter of the [`stagger()`](https://animejs.com/documentation/utilities/stagger) function.

```js
import { cubicBezier, linear, spring } from 'animejs';

animate(target, { x: 100, ease: 'inOut(3)' });
animate(target, { x: 100, ease: cubicBezier(.7, .1, .5, .9) });
animate(target, { x: 100, ease: spring({ bounce: .35 }) });
```

## Easings code example

```js
import { animate, waapi, cubicBezier, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'out(3)', // Built-in ease
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(.7, .1, .5, .9), // Custom cubic Bezier curves
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: spring({ bounce: .35 }), // Spring physics
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(.7, .1, .5, .9)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">spring({ bounce: 1.25 })</div>
</div>
```

###### In this section

* [Built-in eases](https://animejs.com/documentation/easings/built-in-eases "Built-in eases")
* [Cubic Bézier](https://animejs.com/documentation/easings/cubic-bezier-easing "Cubic Bézier easing")
* [Linear](https://animejs.com/documentation/easings/linear-easing "Linear easing")
* [Steps](https://animejs.com/documentation/easings/steps-easing "Steps easing")
* [Irregular](https://animejs.com/documentation/easings/irregular-easing "Irregular easing")
* [Spring](https://animejs.com/documentation/easings/spring "Spring")

###### Previous

###### Next

* [Chain-able utility functions](https://animejs.com/documentation/utilities/chain-able-utility-functions "Chain-able utility functions")
* [Built-in eases](https://animejs.com/documentation/easings/built-in-eases "Built-in eases")
