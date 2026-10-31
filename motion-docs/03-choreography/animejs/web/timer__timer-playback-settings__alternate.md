---
source: https://animejs.com/documentation/timer/timer-playback-settings/alternate
title: "alternate | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [alternate](https://animejs.com/documentation/timer/timer-playback-settings/alternate "alternate")

Defines if the direction of the timer alternates on each iteration when the [`loop`](https://animejs.com/documentation/timer/timer-playback-settings/loop "loop") is set to `true` or superior to `1`.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/alternate#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/alternate#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## alternate code example

```js
import { animate } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  alternate: true,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
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

* [loopDelay](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay "loopDelay")
* [reversed](https://animejs.com/documentation/timer/timer-playback-settings/reversed "reversed")
