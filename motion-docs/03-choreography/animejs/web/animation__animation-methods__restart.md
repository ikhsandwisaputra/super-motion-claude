---
source: https://animejs.com/documentation/animation/animation-methods/restart
title: "restart() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [restart()](https://animejs.com/documentation/animation/animation-methods/restart "restart()")

Resets all properties and set the `currentTime` of an animation to `0`.

If the [`autoplay`](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay") is set to `true`, the animation plays automatically.

## [Returns](https://animejs.com/documentation/animation/animation-methods/restart#returns)

The animation itself

Can be chained with other animation methods.

## restart() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const animation = animate('.square', {
  x: '17rem',
  direction: 'alternate',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100)
});

const restartAnimation = () => animation.restart();

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
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [pause()](https://animejs.com/documentation/animation/animation-methods/pause "pause()")
* [alternate()](https://animejs.com/documentation/animation/animation-methods/alternate "alternate()")
