---
source: https://animejs.com/documentation/timer/timer-methods/resume
title: "resume() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [resume()](https://animejs.com/documentation/timer/timer-methods/resume "resume()")

Resumes the playback of a paused timer in its current direction.

## [Returns](https://animejs.com/documentation/timer/timer-methods/resume#returns)

The timer itself

Can be chained with other timer methods.

## resume() code example

```js
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton, $alternateButton ] = utils.$('.button');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
  loop: true,
});

const resumeTimer = () => timer.resume();
const pauseTimer = () => timer.pause();
const alternateTimer = () => timer.alternate();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
$alternateButton.addEventListener('click', alternateTimer);
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
    <button class="button">Resume</button>
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [alternate()](https://animejs.com/documentation/timer/timer-methods/alternate "alternate()")
* [complete()](https://animejs.com/documentation/timer/timer-methods/complete "complete()")
