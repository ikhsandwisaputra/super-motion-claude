---
source: https://animejs.com/documentation/timer/timer-methods/complete
title: "complete() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [complete()](https://animejs.com/documentation/timer/timer-methods/complete "complete()")

Completes a timer instantly.

## [Returns](https://animejs.com/documentation/timer/timer-methods/complete#returns)

The timer itself

Can be chained with other timer methods.

## complete() code example

```js
import { createTimer, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 100000,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const completeTimer = () => timer.complete();

$completeButton.addEventListener('click', completeTimer);
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
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [resume()](https://animejs.com/documentation/timer/timer-methods/resume "resume()")
* [reset()](https://animejs.com/documentation/timer/timer-methods/reset "reset()")
