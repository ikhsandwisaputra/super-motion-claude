---
source: https://animejs.com/documentation/animation/animation-methods/resume
title: "resume() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [resume()](https://animejs.com/documentation/animation/animation-methods/resume "resume()")

Resumes the playback of a paused animation in its current direction.

## [Returns](https://animejs.com/documentation/animation/animation-methods/resume#returns)

The animation itself

Can be chained with other animation methods.

## resume() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();
const alternateAnimation = () => animation.alternate();
const resumeAnimation = () => animation.resume();

$pauseButton.addEventListener('click', pauseAnimation);
$alternateButton.addEventListener('click', alternateAnimation);
$resumeButton.addEventListener('click', resumeAnimation);
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
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
    <button class="button">Resume</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [alternate()](https://animejs.com/documentation/animation/animation-methods/alternate "alternate()")
* [complete()](https://animejs.com/documentation/animation/animation-methods/complete "complete()")
