---
source: https://animejs.com/documentation/timer/timer-callbacks/onupdate
title: "onUpdate | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onUpdate](https://animejs.com/documentation/timer/timer-callbacks/onupdate "onUpdate")

Executes a function on every frames of a running timer at the specified [`frameRate`](https://animejs.com/documentation/timer/timer-playback-settings/framerate "frameRate").

## [Accepts](https://animejs.com/documentation/timer/timer-callbacks/onupdate#accepts)

A `Function` whose first argument is the timer itself

## [Default](https://animejs.com/documentation/timer/timer-callbacks/onupdate#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onUpdate = self => console.log(self.id);
```

## onUpdate code example

```js
import { createTimer, utils } from 'animejs';

const [ $updates ] = utils.$('.updates');
const [ $time ] = utils.$('.time');

let updates = 0;

createTimer({
  onUpdate: self => {
    $updates.innerHTML = ++updates;
    $time.innerHTML = self.currentTime;
  }
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">updates</span>
      <span class="updates value">0</span>
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

* [onComplete](https://animejs.com/documentation/timer/timer-callbacks/oncomplete "onComplete")
* [onLoop](https://animejs.com/documentation/timer/timer-callbacks/onloop "onLoop")
