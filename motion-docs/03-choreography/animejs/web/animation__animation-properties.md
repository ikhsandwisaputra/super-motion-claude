---
source: https://animejs.com/documentation/animation/animation-properties
title: "Animation properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

# [Animation properties](https://animejs.com/documentation/animation/animation-properties "Animation properties")

Properties available on the `Animation` instance returned by the `animate()` and `waapi.animate()` functions.

```js
const animation = animate(targets, parameters);
          ┌────────────┐
animation.│targets     │
animation.│currentTime ├─ Properties
animation.│duration    │
          └────────────┘
```

Properties exclusive to the JS version of `animate()` are marked with a JS badge.

| Name | Description |
| --- | --- |
| id JS | Gets and sets the ID of the animation (`String` | `Number`) |
| targets | Gets the current animation targets (`Array`) |
| currentTime | Gets and sets the global current time in ms of the animation (`Number`) |
| iterationCurrentTime JS | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime JS | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the animation from `0` to `1` (`Number`) |
| iterationProgress JS | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration JS | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the animation (`Number`) |
| speed | Gets and sets the speed multiplier of the animation (`Number`) |
| fps JS | Gets and sets the fps of the animation (`Number`) |
| paused | Gets and sets whether the animation is paused (`Boolean`) |
| began JS | Gets and sets whether the animation has started (`Boolean`) |
| completed | Gets and sets whether the animation has completed (`Boolean`) |
| reversed JS | Gets and sets whether the animation is reversed (`Boolean`) |
| backwards JS | Gets whether the animation is currently playing backwards (`Boolean`) |

###### Previous

###### Next

* [refresh()](https://animejs.com/documentation/animation/animation-methods/refresh "refresh()")
* [Timeline](https://animejs.com/documentation/timeline "Timeline")
