---
source: https://animejs.com/documentation/timeline/add-timers
title: "Add timers | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Add timers](https://animejs.com/documentation/timeline/add-timers "Add timers")

Timers can be added to a timeline using the [`add()`](https://animejs.com/documentation/timeline/timeline-methods/add "add()") method or the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.

## [Timer creation](https://animejs.com/documentation/timeline/add-timers#timer-creation)

Creates and adds a timer directly to the timeline using the [`add()`](https://animejs.com/documentation/timeline/timeline-methods/add "add()") method.

```js
timeline.add(parameters, position);
```

## [Parameters](https://animejs.com/documentation/timeline/add-timers#parameters)

| Name | Accepts |
| --- | --- |
| parameters | An `Object` of [Timer playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings") and [Timer callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Timer synchronisation](https://animejs.com/documentation/timeline/add-timers#timer-synchronisation)

Synchronises an existing timer with the [`sync()`](https://animejs.com/documentation/timeline/timeline-methods/sync "sync()") method.

```js
timeline.sync(timer, position);
```

## [Parameters](https://animejs.com/documentation/timeline/add-timers#parameters)

| Name | Accepts |
| --- | --- |
| timer | [Timer](https://animejs.com/documentation/timer "Timer") |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/add-timers#returns)

The timeline itself

Can be chained with other timeline methods.

## Add timers code example

```js
import { createTimeline, createTimer, utils } from 'animejs';

const [ $timer01, $timer02, $timer03 ] = utils.$('.timer');

const timer1 = createTimer({
  duration: 1500,
  onUpdate: self => $timer01.innerHTML = self.currentTime,
});

const tl = createTimeline()
.sync(timer1)
.add({
  duration: 500,
  onUpdate: self => $timer02.innerHTML = self.currentTime,
})
.add({
  onUpdate: self => $timer03.innerHTML = self.currentTime,
  duration: 1000
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 01</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 02</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 03</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [Timeline](https://animejs.com/documentation/timeline "Timeline")
* [Add animations](https://animejs.com/documentation/timeline/add-animations "Add animations")
