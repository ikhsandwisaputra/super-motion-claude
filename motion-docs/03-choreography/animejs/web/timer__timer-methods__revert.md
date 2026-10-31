---
source: https://animejs.com/documentation/timer/timer-methods/revert
title: "revert() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/timer/timer-methods/revert "revert()")

Cancels the timer, and reverts the linked [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") instance if necessary.

Use `.revert()` when you want to completely stop and destroy and timer its attached ScrollObserver.

## [Returns](https://animejs.com/documentation/timer/timer-methods/revert#returns)

The timer itself

Can be chained with other timer methods.

## revert() code example

```js
import { createTimer, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const revertTimer = () => {
  timer.revert();
  $time.innerHTML = timer.currentTime
}

$revertButton.addEventListener('click', revertTimer);
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
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [cancel()](https://animejs.com/documentation/timer/timer-methods/cancel "cancel()")
* [seek()](https://animejs.com/documentation/timer/timer-methods/seek "seek()")
