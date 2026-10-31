---
source: https://animejs.com/documentation/timer/timer-callbacks/oncomplete
title: "onComplete | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onComplete](https://animejs.com/documentation/timer/timer-callbacks/oncomplete "onComplete")

Executes a function when all the iterations ([`loop`](https://animejs.com/documentation/timer/timer-playback-settings/loop "loop")) of a timer have finished playing.

## [Accepts](https://animejs.com/documentation/timer/timer-callbacks/oncomplete#accepts)

A `Function` whose first argument is the timer itself

## [Default](https://animejs.com/documentation/timer/timer-callbacks/oncomplete#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## onComplete code example

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onComplete: self => $status.innerHTML = 'true',
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">completed</span>
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

* [onBegin](https://animejs.com/documentation/timer/timer-callbacks/onbegin "onBegin")
* [onUpdate](https://animejs.com/documentation/timer/timer-callbacks/onupdate "onUpdate")
