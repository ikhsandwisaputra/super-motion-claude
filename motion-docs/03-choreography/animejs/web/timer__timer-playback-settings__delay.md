---
source: https://animejs.com/documentation/timer/timer-playback-settings/delay
title: "delay | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [delay](https://animejs.com/documentation/timer/timer-playback-settings/delay "delay")

Defines the time in milliseconds before the timer starts.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/delay#accepts)

A `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/delay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## delay code example

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  delay: 2000,
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

* [Timer playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")
* [duration](https://animejs.com/documentation/timer/timer-playback-settings/duration "duration")
