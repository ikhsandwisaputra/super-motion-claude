---
source: https://animejs.com/documentation/animation/animation-methods/complete
title: "complete() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [complete()](https://animejs.com/documentation/animation/animation-methods/complete "complete()")

Completes the animation instantly.

## [Returns](https://animejs.com/documentation/animation/animation-methods/complete#returns)

The animation itself

Can be chained with other animation methods.

## complete() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const completeAnimation = () => animation.complete();

$completeButton.addEventListener('click', completeAnimation);
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [resume()](https://animejs.com/documentation/animation/animation-methods/resume "resume()")
* [cancel()](https://animejs.com/documentation/animation/animation-methods/cancel "cancel()")
