---
source: https://animejs.com/documentation/animation/animation-playback-settings/framerate
title: "frameRate | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [frameRate JS](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate")

Determines the number of frames per second (fps) an animation is played at.
This value can be modified later with `animation.fps = 30`.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/framerate#accepts)

A `Number` greater than `0`

The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/framerate#default)

`240`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

## frameRate code example

```js
import { animate } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  frameRate: 60,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  animation.fps = value;
}

$range.addEventListener('input', updateFps);
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">fps</span>
    <span class="fps value">60</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay")
* [playbackRate](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate "playbackRate")
