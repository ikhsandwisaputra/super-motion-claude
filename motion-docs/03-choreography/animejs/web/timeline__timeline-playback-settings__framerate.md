---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/framerate
title: "frameRate | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [frameRate](https://animejs.com/documentation/timeline/timeline-playback-settings/framerate "frameRate")

Determines the number of frames per second (fps) a timeline is played at.
This value can be modified later with `timeline.fps = 30`.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/framerate#accepts)

A `Number` greater than `0`

The frame rate is capped to the monitor refresh rate or in some cases by the browser itself

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/framerate#default)

`240`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

## frameRate code example

```js
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');

const tl = createTimeline({
  frameRate: 60,
  loop: true,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  tl.fps = value;
}

$range.addEventListener('input', updateFps);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">fps</span>
    <span class="fps value">60</span>
  </pre>
</div>
<div class="large row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [autoplay](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay "autoplay")
* [playbackRate](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate "playbackRate")
