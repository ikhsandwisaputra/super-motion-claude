---
source: https://animejs.com/documentation/animation/animation-playback-settings/delay
title: "delay | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [delay](https://animejs.com/documentation/animation/animation-playback-settings/delay "delay")

Defines the default delay in milliseconds of the animation tweens.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/delay#accepts)

* A `Number` equal or greater than `0`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/delay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## delay code example

```js
import { animate } from 'animejs';

const playbackDelay = animate('.delay', {
  x: '16rem',
  scale: 1.8,
  delay: 500, // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

```html
<div class="medium row">
  <div class="circle delay"></div>
</div>
```

###### Previous

###### Next

* [Animation playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")
* [duration](https://animejs.com/documentation/animation/animation-playback-settings/duration "duration")
