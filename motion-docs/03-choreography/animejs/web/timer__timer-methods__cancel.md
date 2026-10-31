---
source: https://animejs.com/documentation/timer/timer-methods/cancel
title: "cancel() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [cancel()](https://animejs.com/documentation/timer/timer-methods/cancel "cancel()")

Pauses the timer, removes it from the engine's main loop, and frees up memory.

## [Returns](https://animejs.com/documentation/timer/timer-methods/cancel#returns)

The timer itself

Can be chained with other timer methods.

## cancel() code example

```js
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $cancelButton ] = utils.$('.cancel');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const playTimer = () => timer.play();
const cancelTimer = () => timer.cancel();

$playButton.addEventListener('click', playTimer);
$cancelButton.addEventListener('click', cancelTimer);
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
    <button class="button play">Play</button>
    <button class="button cancel">Cancel</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reset()](https://animejs.com/documentation/timer/timer-methods/reset "reset()")
* [revert()](https://animejs.com/documentation/timer/timer-methods/revert "revert()")
