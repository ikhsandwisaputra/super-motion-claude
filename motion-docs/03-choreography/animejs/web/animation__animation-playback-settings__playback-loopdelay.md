---
source: https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay
title: "loopDelay | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [loopDelay JS](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay "loopDelay")

Defines the delay in milliseconds between loops.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay#accepts)

A `Number` that is equal to or greater than `0`

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

## loopDelay code example

```js
import { animate } from 'animejs';

const loopDelayAnimation = animate('.circle', {
  x: '16rem',
  scale: {
    to: 1.8,
    delay: 500,
    duration: 500,
  },
  loopDelay: 1000,
  loop: true,
  alternate: true,
});
```

```html
<div class="medium row">
  <div class="circle"></div>
</div>
```

###### Previous

###### Next

* [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")
* [alternate](https://animejs.com/documentation/animation/animation-playback-settings/alternate "alternate")
