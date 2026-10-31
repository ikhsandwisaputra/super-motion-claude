---
source: https://animejs.com/documentation/timer/timer-properties
title: "Timer properties | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

# [Timer properties](https://animejs.com/documentation/timer/timer-properties "Timer properties")

Properties available on the `Timer` instance returned by a `createTimer()` function.

```js
const timer = createTimer(parameters);
      ┌────────────┐
timer.│progress    │
timer.│currentTime ├─ Properties
timer.│duration    │
      └────────────┘
```

| Name | Description |
| --- | --- |
| id | Gets and sets the ID of the timer (`String` | `Number`) |
| deltaTime | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| currentTime | Gets and sets the global current time in ms of the timer (`Number`) |
| iterationCurrentTime | Gets and sets the current iteration time in ms (`Number`) |
| progress | Gets and sets the overall progress of the timer from `0` to `1` (`Number`) |
| iterationProgress | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration | Gets and sets the current iteration count (`Number`). |
| speed | Gets and sets the playbackRate multiplier of the timer (`Number`) |
| fps | Gets and sets the frameRate of the timer (`Number`) |
| paused | Gets and sets whether the timer is paused (`Boolean`) |
| began | Gets and sets whether the timer has started (`Boolean`) |
| completed | Gets and sets whether the timer has completed (`Boolean`) |
| reversed | Gets and sets whether the timer is reversed (`Boolean`) |
| backwards | Gets whether the timer is currently playing backwards (`Boolean`) |

###### Previous

###### Next

* [stretch()](https://animejs.com/documentation/timer/timer-methods/stretch "stretch()")
* [Animation](https://animejs.com/documentation/animation "Animation")
