---
source: https://animejs.com/documentation/animation/animation-methods/seek
title: "seek() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [seek()](https://animejs.com/documentation/animation/animation-methods/seek "seek()")

Updates the `currentTime` of the animation and advances it to a specific time.

```js
animation.seek(time, muteCallbacks);
```

## [Parameters](https://animejs.com/documentation/animation/animation-methods/seek#parameters)

| Name | Type | Description |
| --- | --- | --- |
| time | `Number` | The new `currentTime` in ms of the animation |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |

## [Returns](https://animejs.com/documentation/animation/animation-methods/seek#returns)

The animation itself

Can be chained with other animation methods.

## seek() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');

const updateButtonLabel = animation => {
  $playPauseButton.textContent = animation.paused ? 'Play' : 'Pause';
}

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  duration: 1750,
  delay: stagger(250),
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
});

const seekAnimation = () => animation.seek(+$range.value);

const playPauseAnimation = () => {
  if (animation.paused) {
    animation.play();
  } else {
    animation.pause();
    updateButtonLabel(animation);
  }
}

$range.addEventListener('input', seekAnimation);
$playPauseButton.addEventListener('click', playPauseAnimation);
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
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

* [reset()](https://animejs.com/documentation/animation/animation-methods/reset "reset()")
* [stretch()](https://animejs.com/documentation/animation/animation-methods/stretch "stretch()")
