---
source: https://animejs.com/documentation/timeline/time-position
title: "Time position | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Time position](https://animejs.com/documentation/timeline/time-position "Time position")

Specifies the time at which a timeline child is inserted into a timeline.
If no position is defined, the child will be positioned at the end of the timeline.

The time position is defined as the last parameter of the following methods:

```js
timeline.add(target, animationParameters, position);
timeline.add(timerParameters, position);
timeline.call(callbackFunction, position);
timeline.sync(labelName, position);
timeline.label(labelName, position);
```

## [Time position types](https://animejs.com/documentation/timeline/time-position#time-position-types)

| Type | Example | Description |
| --- | --- | --- |
| Absolute | `100` | Position the element at exactly 100ms in the timeline |
| Addition | `'+=100'` | Position the element 100ms after the last element |
| Subtraction | `'-=100'` | Position the element 100ms before the last element end |
| Multiplier | `'*=.5'` | Position the element at half of the total element duration |
| Previous end position | `'<'` | Position the element at the end position of the previous element |
| Previous start position | `'<<'` | Position the element at the start position of the previous element |
| Combined | `'<<+=250'` | Position the element 250ms after the beginning position of the previous element |
| [Label](https://animejs.com/documentation/timeline/timeline-methods/label "Label") | `'My Label'` | Position the element at the `'My Label'` element |
| [Stagger](https://animejs.com/documentation/utilities/stagger "Stagger") | `stagger(10)` | Stagger the elements position by `10` |

## Time position code example

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('start', 0)
.add('.square', {
  x: '15rem',
  duration: 500,
}, 500)
.add('.circle', {
  x: '15rem',
  duration: 500,
}, 'start')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, '<-=250');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

###### Previous

###### Next

* [Call functions](https://animejs.com/documentation/timeline/call-functions "Call functions")
* [Timeline playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")
