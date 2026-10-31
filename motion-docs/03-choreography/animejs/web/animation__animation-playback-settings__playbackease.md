---
source: https://animejs.com/documentation/animation/animation-playback-settings/playbackease
title: "playbackEase | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [playbackEase JS](https://animejs.com/documentation/animation/animation-playback-settings/playbackease "playbackEase")

Applies and easing function to the entire playback of the animation.

Unlike the tween [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") parameter that is applied in between every property keyframes like this:

```
0 ────────────────────────────────› 1
A ──ease──› B ──ease──› C ──ease──› D
```

The `playbackEase` parameter is applied globally like this:

```
0 ──────────────ease──────────────› 1
A ────────› B ────────› C ────────› D
```

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/playbackease#accepts)

[ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/playbackease#default)

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackEase = 'inOut';
```

## playbackEase code example

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', duration: 400 },
    { x: '17rem', rotate: 180, scale: .5 },
    { y: '2.5rem' },
    { x: 0, rotate: 360, scale: 1 },
    { y: 0, duration: 400 }
  ],
  duration: 4000,
  playbackEase: 'inOut(3)', // this ease is applied accross all keyframes
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [playbackRate](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate "playbackRate")
* [persist](https://animejs.com/documentation/animation/animation-playback-settings/persist "persist")
