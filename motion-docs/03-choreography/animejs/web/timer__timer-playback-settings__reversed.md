---
source: https://animejs.com/documentation/timer/timer-playback-settings/reversed
title: "reversed | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reversed](https://animejs.com/documentation/timer/timer-playback-settings/reversed "reversed")

Sets the initial direction of the timer.
The timer `currentTime` always progresses from `0` to `duration`.
Only the `iterationTime` property is actually reversed.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/reversed#accepts)

`Boolean`

* If set to `true` the timer's first iteration runs in reverse
* If set to `false` the timer's first iteration runs normally

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/reversed#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## reversed code example

```js
import { animate } from 'animejs';

const [ $iterationTime ] = utils.$('.iteration-time');
const [ $currentTime ] = utils.$('.current-time');

createTimer({
  duration: 10000,
  reversed: true,
  onUpdate: self => {
    $iterationTime.innerHTML = self.iterationCurrentTime;
    $currentTime.innerHTML = self.currentTime;
  }
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="iteration-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="current-time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [alternate](https://animejs.com/documentation/timer/timer-playback-settings/alternate "alternate")
* [autoplay](https://animejs.com/documentation/timer/timer-playback-settings/autoplay "autoplay")
