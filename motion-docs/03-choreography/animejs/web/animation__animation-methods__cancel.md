---
source: https://animejs.com/documentation/animation/animation-methods/cancel
title: "cancel() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [cancel()](https://animejs.com/documentation/animation/animation-methods/cancel "cancel()")

Pauses the animation, removes it from the engine's main loop, and frees up memory.

## [Returns](https://animejs.com/documentation/animation/animation-methods/cancel#returns)

The animation itself

Can be chained with other animation methods.

## cancel() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $cancelButton ] = utils.$('.cancel');
const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const cancelAnimation = () => animation.cancel();
const playAnimation = () => animation.play();

$cancelButton.addEventListener('click', cancelAnimation);
$playButton.addEventListener('click', playAnimation);
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
    <button class="button cancel">Cancel</button>
    <button class="button play">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [complete()](https://animejs.com/documentation/animation/animation-methods/complete "complete()")
* [revert()](https://animejs.com/documentation/animation/animation-methods/revert "revert()")
