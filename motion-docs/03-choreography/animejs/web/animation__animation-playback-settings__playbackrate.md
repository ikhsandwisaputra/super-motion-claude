---
source: https://animejs.com/documentation/animation/animation-playback-settings/playbackrate
title: "playbackRate | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [playbackRate](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate "playbackRate")

Defines a speed multiplier to speed up or slow down an animation.
This value can be modified later with `animation.speed = .5`.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate#accepts)

A `Number` greater than or equal to `0`

If set to `0` the animation won't play.

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate#default)

`1`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackRate = .75;
```

## playbackRate code example

```js
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [frameRate](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate")
* [playbackEase](https://animejs.com/documentation/animation/animation-playback-settings/playbackease "playbackEase")
