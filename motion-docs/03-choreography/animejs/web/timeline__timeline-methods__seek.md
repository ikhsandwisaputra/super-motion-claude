---
source: https://animejs.com/documentation/timeline/timeline-methods/seek
title: "seek() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [seek()](https://animejs.com/documentation/timeline/timeline-methods/seek "seek()")

Updates the `currentTime` of the timeline to a specific time.

```js
timeline.seek(time, muteCallbacks);
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/seek#parameters)

| Name | Type | Description |
| --- | --- | --- |
| time | `Number` | The new `currentTime` in ms of the timeline |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/seek#returns)

The timeline itself

Can be chained with other timeline methods.

## seek() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');

const updateButtonLabel = tl => {
  $playPauseButton.textContent = tl.paused ? 'Play' : 'Pause';
}

const tl = createTimeline({
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const seekTimeline = () => tl.seek(+$range.value);

const playPauseTimeline = () => {
  if (tl.paused) {
    tl.play();
  } else {
    tl.pause();
    updateButtonLabel(tl);
  }
}

$range.addEventListener('input', seekTimeline);
$playPauseButton.addEventListener('click', playPauseTimeline);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revert()](https://animejs.com/documentation/timeline/timeline-methods/revert "revert()")
* [stretch()](https://animejs.com/documentation/timeline/timeline-methods/stretch "stretch()")
