---
source: https://animejs.com/documentation/timer/timer-methods/reverse
title: "reverse() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reverse()](https://animejs.com/documentation/timer/timer-methods/reverse "reverse()")

Forces the timer to play backward.

## [Returns](https://animejs.com/documentation/timer/timer-methods/reverse#returns)

The timer itself

Can be chained with other timer methods.

## reverse() code example

```js
import { createTimer, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const reverseTimer = () => timer.reverse();

$reverseButton.addEventListener('click', reverseTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [play()](https://animejs.com/documentation/timer/timer-methods/play "play()")
* [pause()](https://animejs.com/documentation/timer/timer-methods/pause "pause()")
