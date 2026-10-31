---
source: https://animejs.com/documentation/animation/animation-methods/stretch
title: "stretch() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [stretch() JS](https://animejs.com/documentation/animation/animation-methods/stretch "stretch()")

Changes the total duration of an animation and its tweens duration to fit a specific time.
The total duration is equal to the duration of an iteration multiplied with the total number of iterations. So if an animation is 1000ms and loops twice (3 iterations in total), the total duration will be 3000ms (1000 \* 3).

```js
animation.stretch(duration);
```

## [Parameters](https://animejs.com/documentation/animation/animation-methods/stretch#parameters)

| Name | Type | Description |
| --- | --- | --- |
| duration | `Number` | The new total duration in ms of the animation |

Stretching an animation to `0` will also set all its tweens' durations to `0`, which will make them all the same length on subsequent calls to `stretch()`.

## [Returns](https://animejs.com/documentation/animation/animation-methods/stretch#returns)

The animation itself

Can be chained with other animation methods.

## stretch() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $totalDuration ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(200),
});

const stretchAnimation = () => {
  const newDuration = +$range.value;
  $totalDuration.textContent = newDuration;
  animation.stretch(newDuration).restart();
}

stretchAnimation();

$range.addEventListener('input', stretchAnimation);
```

```html
<pre class="large log row">
  <span class="label">total duration</span>
  <span class="value">0</span>
</pre>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=100 max=2000 value=1000 step=100 class="seek range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [seek()](https://animejs.com/documentation/animation/animation-methods/seek "seek()")
* [refresh()](https://animejs.com/documentation/animation/animation-methods/refresh "refresh()")
