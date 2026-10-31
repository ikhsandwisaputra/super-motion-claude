---
source: https://animejs.com/documentation/timer/timer-playback-settings/framerate
title: "frameRate | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [frameRate](https://animejs.com/documentation/timer/timer-playback-settings/framerate "frameRate")

Determines the frames per second (fps) at which a timer runs.
This value can be modified later with `timer.fps = 30`.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/framerate#accepts)

A `Number` greater than `0`

The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/framerate#default)

`240`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

## frameRate code example

```js
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  frameRate: 60,
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  timer.fps = value;
}

$range.addEventListener('input', updateFps);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">fps</span>
      <span class="fps value">60</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [autoplay](https://animejs.com/documentation/timer/timer-playback-settings/autoplay "autoplay")
* [playbackRate](https://animejs.com/documentation/timer/timer-playback-settings/playbackrate "playbackRate")
