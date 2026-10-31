---
source: https://animejs.com/documentation/timer/timer-callbacks/onbegin
title: "onBegin | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onBegin](https://animejs.com/documentation/timer/timer-callbacks/onbegin "onBegin")

Executes a function when a timer starts.

## [Accepts](https://animejs.com/documentation/timer/timer-callbacks/onbegin#accepts)

A `Function` whose first argument is the timer itself

## [Default](https://animejs.com/documentation/timer/timer-callbacks/onbegin#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## onBegin code example

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  delay: 2000,
  duration: 2000,
  onBegin: self => $status.innerHTML = 'true'
});

const logTimer = createTimer({
  duration: 4000,
  onUpdate: self => $time.innerHTML = timer.currentTime
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">began</span>
      <span class="status value">false</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [Timer callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")
* [onComplete](https://animejs.com/documentation/timer/timer-callbacks/oncomplete "onComplete")
