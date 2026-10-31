---
source: https://animejs.com/documentation/timeline/timeline-methods/resume
title: "resume() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [resume()](https://animejs.com/documentation/timeline/timeline-methods/resume "resume()")

Resumes the playback of a paused timeline in its current direction.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/resume#returns)

The timeline itself

Can be chained with other timeline methods.

## resume() code example

```js
import { creatTimeline, utils } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const alternateTimeline = () => tl.alternate();
const resumeTimeline = () => tl.resume();

$pauseButton.addEventListener('click', pauseTimeline);
$alternateButton.addEventListener('click', alternateTimeline);
$resumeButton.addEventListener('click', resumeTimeline);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
    <button class="button">Resume</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [alternate()](https://animejs.com/documentation/timeline/timeline-methods/alternate "alternate()")
* [complete()](https://animejs.com/documentation/timeline/timeline-methods/complete "complete()")
