---
source: https://animejs.com/documentation/timer/timer-methods/play
title: "play() | Timer methods | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [play()](https://animejs.com/documentation/timer/timer-methods/play "play()")

Forces the timer to play forward.

## [Returns](https://animejs.com/documentation/timer/timer-methods/play#returns)

The timer itself

Can be chained with other timer methods.

## play() code example

```js
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button play">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Timer methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")
* [reverse()](https://animejs.com/documentation/timer/timer-methods/reverse "reverse()")
