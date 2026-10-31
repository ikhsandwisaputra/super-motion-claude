---
source: https://animejs.com/documentation/timer/timer-playback-settings/autoplay
title: "autoplay | Timer playback settings | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Playback settings](https://animejs.com/documentation/timer/timer-playback-settings "Timer playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [autoplay](https://animejs.com/documentation/timer/timer-playback-settings/autoplay "autoplay")

Defines the play mode of a timer.

The autoplay parameter has no effect when the timer is added to a timeline, and will be overridden to `false`.

## [Accepts](https://animejs.com/documentation/timer/timer-playback-settings/autoplay#accepts)

`Boolean` | [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll")

* If set to `true` the timer plays automatically
* If set to `false` the timer has to be manually played
* If set to [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") the timer will starts when the [scroll thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "scroll thresholds") conditions are met

## [Default](https://animejs.com/documentation/timer/timer-playback-settings/autoplay#default)

`true`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

## autoplay code example

```js
const [ $time ] = utils.$('.time');
const [ $playButton ] = utils.$('.play');

const timer = createTimer({
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="play">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reversed](https://animejs.com/documentation/timer/timer-playback-settings/reversed "reversed")
* [frameRate](https://animejs.com/documentation/timer/timer-playback-settings/framerate "frameRate")
