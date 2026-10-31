---
source: https://animejs.com/documentation/timer/timer-callbacks/onpause
title: "onPause | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onPause](https://animejs.com/documentation/timer/timer-callbacks/onpause "onPause")

Executes a function when a running timer is paused.

## [Accepts](https://animejs.com/documentation/timer/timer-callbacks/onpause#accepts)

A `Function` whose first argument is the timer itself

## [Default](https://animejs.com/documentation/timer/timer-callbacks/onpause#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onPause = self => console.log(self.id);
```

## onPause code example

```js
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton ] = utils.$('.button');
const [ $paused ] = utils.$('.paused');
const [ $time ] = utils.$('.time');

let paused = 0;

const timer = createTimer({
  onPause: () => $paused.innerHTML = ++paused,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();
const resumeTimer = () => timer.resume();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">paused</span>
      <span class="value paused">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">elapsed time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Resume</button>
    <button class="button">Pause</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [onLoop](https://animejs.com/documentation/timer/timer-callbacks/onloop "onLoop")
* [then()](https://animejs.com/documentation/timer/timer-callbacks/then "then()")
