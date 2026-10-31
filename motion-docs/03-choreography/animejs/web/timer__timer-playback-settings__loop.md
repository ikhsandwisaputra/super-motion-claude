---
source: https://animejs.com/documentation/timer/timer-playback-settings/loop
title: "loop | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [loop](https://animejs.com/documentation/timer/timer-playback-settings/loop "loop")

Defines how many times a timer repeats.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/loop#accepts)

| Value | Effect |
| --- | --- |
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/loop#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loop = true;
```

## loop code example

```js
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime
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

* [duration](https://animejs.com/documentation/timer/timer-playback-settings/duration "duration")
* [loopDelay](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay "loopDelay")
