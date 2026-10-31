---
source: https://animejs.com/documentation/timer/timer-playback-settings/duration
title: "duration | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [duration](https://animejs.com/documentation/timer/timer-playback-settings/duration "duration")

Defines the duration in milliseconds of the timer.
Setting `0` to a duration completes the timer instantly upon play.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/duration#accepts)

A `Number` equal to or greater than `0`

Duration values higher than `1e12` are clamped internally to `1e12` (Or approximatively 32 years).

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/duration#default)

`Infinity`

## duration code example

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [delay](https://animejs.com/documentation/timer/timer-playback-settings/delay "delay")
* [loop](https://animejs.com/documentation/timer/timer-playback-settings/loop "loop")
