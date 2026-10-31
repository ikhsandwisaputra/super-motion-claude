---
source: https://animejs.com/documentation/animation/animation-methods/pause
title: "pause() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [pause()](https://animejs.com/documentation/animation/animation-methods/pause "pause()")

Pauses a running animation.

## [Returns](https://animejs.com/documentation/animation/animation-methods/pause#returns)

The animation itself

Can be chained with other animation methods.

## pause() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();

$pauseButton.addEventListener('click', pauseAnimation);
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
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reverse()](https://animejs.com/documentation/animation/animation-methods/reverse "reverse()")
* [restart()](https://animejs.com/documentation/animation/animation-methods/restart "restart()")
