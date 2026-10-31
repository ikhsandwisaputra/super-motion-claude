---
source: https://animejs.com/documentation/animation/animation-methods/reverse
title: "reverse() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [reverse()](https://animejs.com/documentation/animation/animation-methods/reverse "reverse()")

Forces the animation to play backward.

## [Returns](https://animejs.com/documentation/animation/animation-methods/reverse#returns)

The animation itself

Can be chained with other animation methods.

## reverse() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
});

const reverseAnimation = () => animation.reverse();

$reverseButton.addEventListener('click', reverseAnimation);
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
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [play()](https://animejs.com/documentation/animation/animation-methods/play "play()")
* [pause()](https://animejs.com/documentation/animation/animation-methods/pause "pause()")
