---
source: https://animejs.com/documentation/timer/timer-methods/pause
title: "pause() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [pause()](https://animejs.com/documentation/timer/timer-methods/pause "pause()")

Pauses a running timer.

## [Returns](https://animejs.com/documentation/timer/timer-methods/pause#returns)

The timer itself

Can be chained with other timer methods.

## pause() code example

```js
import { createTimer, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();

$pauseButton.addEventListener('click', pauseTimer);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reverse()](https://animejs.com/documentation/timer/timer-methods/reverse "reverse()")
* [restart()](https://animejs.com/documentation/timer/timer-methods/restart "restart()")
