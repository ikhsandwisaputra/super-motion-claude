---
source: https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay
title: "loopDelay | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [loopDelay](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay "loopDelay")

Defines the delay in milliseconds between loops.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay#accepts)

A `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

## loopDelay code example

```js
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  loopDelay: 750,
  duration: 250,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = utils.clamp(self.iterationCurrentTime, 0, 250)
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [loop](https://animejs.com/documentation/timer/timer-playback-settings/loop "loop")
* [alternate](https://animejs.com/documentation/timer/timer-playback-settings/alternate "alternate")
