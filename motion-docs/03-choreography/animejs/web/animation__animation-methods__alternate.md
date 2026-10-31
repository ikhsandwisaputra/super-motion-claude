---
source: https://animejs.com/documentation/animation/animation-methods/alternate
title: "alternate() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [alternate()](https://animejs.com/documentation/animation/animation-methods/alternate "alternate()")

Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

## [Returns](https://animejs.com/documentation/animation/animation-methods/alternate#returns)

The animation itself

Can be chained with other animation methods.

## alternate() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const alternateAnimation = () => animation.alternate();

$alternateButton.addEventListener('click', alternateAnimation);
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
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [restart()](https://animejs.com/documentation/animation/animation-methods/restart "restart()")
* [resume()](https://animejs.com/documentation/animation/animation-methods/resume "resume()")
