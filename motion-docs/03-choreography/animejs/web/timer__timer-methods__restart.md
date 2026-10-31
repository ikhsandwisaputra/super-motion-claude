---
source: https://animejs.com/documentation/timer/timer-methods/restart
title: "restart() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [restart()](https://animejs.com/documentation/timer/timer-methods/restart "restart()")

Resets all properties and set the `currentTime` of a timer to `0`.

If the [`autoplay`](https://animejs.com/documentation/timer/timer-playback-settings/autoplay "autoplay") is set to `true`, the timer plays automatically.

## [Returns](https://animejs.com/documentation/timer/timer-methods/restart#returns)

The timer itself

Can be chained with other timer methods.

## restart() code example

```js
import { createTimer, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const restartTimer = () => timer.restart();

$restartButton.addEventListener('click', restartTimer);
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
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [pause()](https://animejs.com/documentation/timer/timer-methods/pause "pause()")
* [alternate()](https://animejs.com/documentation/timer/timer-methods/alternate "alternate()")
