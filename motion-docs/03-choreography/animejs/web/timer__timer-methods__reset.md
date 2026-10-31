---
source: https://animejs.com/documentation/timer/timer-methods/reset
title: "reset() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 3.0.0](https://github.com/juliangarnier/anime/releases/tag/v3.0.0)

# [reset()](https://animejs.com/documentation/timer/timer-methods/reset "reset()")

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
timer.reset(softReset);
```

## [Parameters](https://animejs.com/documentation/timer/timer-methods/reset#parameters)

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## [Returns](https://animejs.com/documentation/timer/timer-methods/reset#returns)

The timer itself

Can be chained with other timer methods.

## reset() code example

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');
const [ $reset ] = utils.$('.button');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const resetTimer = () => {
  timer.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimer);
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
    <button class="button">Reset</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [complete()](https://animejs.com/documentation/timer/timer-methods/complete "complete()")
* [cancel()](https://animejs.com/documentation/timer/timer-methods/cancel "cancel()")
