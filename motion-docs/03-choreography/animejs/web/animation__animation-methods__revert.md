---
source: https://animejs.com/documentation/animation/animation-methods/revert
title: "revert() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/animation/animation-methods/revert "revert()")

Cancels the animation, reverts all its animated values to their original state, cleanup the CSS inline styles, and reverts the linked [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") instance if necessary.

Use `revert()` when you want to completely stop and destroy an animation.

## [Returns](https://animejs.com/documentation/animation/animation-methods/revert#returns)

The animation itself

Can be chained with other animation methods.

## revert() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial translateX value
utils.set('.square', { x: '17rem' });

const animation = animate('.square', {
  x: 0,
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const revertAnimation = () => animation.revert();
const restartAnimation = () => animation.restart();

$revertButton.addEventListener('click', revertAnimation);
$restartButton.addEventListener('click', restartAnimation);
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
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [cancel()](https://animejs.com/documentation/animation/animation-methods/cancel "cancel()")
* [reset()](https://animejs.com/documentation/animation/animation-methods/reset "reset()")
