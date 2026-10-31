---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease
title: "Stagger ease | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger ease](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease "Stagger ease")

Defines an easing applied to the staggered values distribution.

## [Accept](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease#accept)

[ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease#default)

`'linear'`

## Stagger ease code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem'], { ease: 'inOut(3)' }),
  delay: stagger([0, 500], { ease: 'inOut(3)', from: 'center' }),
  ease: 'inOutQuad',
  duration: 500,
  loop: true,
  alternate: true,
});
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
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

* [Stagger reversed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed "Stagger reversed")
* [Stagger grid](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid "Stagger grid")
