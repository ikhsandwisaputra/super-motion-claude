---
source: https://animejs.com/documentation/timer/timer-callbacks/onloop
title: "onLoop | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onLoop](https://animejs.com/documentation/timer/timer-callbacks/onloop "onLoop")

Executes a function every time a timer iteration completes.

## [Accepts](https://animejs.com/documentation/timer/timer-callbacks/onloop#accepts)

A `Function` whose first argument is the timer itself

## [Default](https://animejs.com/documentation/timer/timer-callbacks/onloop#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## onLoop code example

```js
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  onLoop: self => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [onUpdate](https://animejs.com/documentation/timer/timer-callbacks/onupdate "onUpdate")
* [onPause](https://animejs.com/documentation/timer/timer-callbacks/onpause "onPause")
