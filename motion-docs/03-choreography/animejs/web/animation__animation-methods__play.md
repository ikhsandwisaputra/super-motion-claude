---
source: https://animejs.com/documentation/animation/animation-methods/play
title: "play() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [play()](https://animejs.com/documentation/animation/animation-methods/play "play()")

Forces the animation to play forward.

## [Returns](https://animejs.com/documentation/animation/animation-methods/play#returns)

The animation itself

Can be chained with other animation methods.

## play() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
  autoplay: false, // The animation is paused by default
});

const playAnimation = () => animation.play();

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
    <button class="button play">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Animation methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")
* [reverse()](https://animejs.com/documentation/animation/animation-methods/reverse "reverse()")
