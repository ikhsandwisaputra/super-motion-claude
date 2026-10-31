---
source: https://animejs.com/documentation/engine/engine-parameters/speed
title: "speed | Engine parameters | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Parameters](https://animejs.com/documentation/engine/engine-parameters "Engine parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [speed](https://animejs.com/documentation/engine/engine-parameters/speed "speed")

Controls the global playback rate of all animations managed by the engine.
Values greater than `1` speed up animations, while values between `0` and `1` slow them down.

Adjusting the global playback rate is useful for creating slow-motion or fast-forward effects across all animations simultaneously.

```js
engine.speed = 0.5; // Run all animations at half speed
```

## [Accepts](https://animejs.com/documentation/engine/engine-parameters/speed#accepts)

A `Number` greater than or equal to `0`

## [Default](https://animejs.com/documentation/engine/engine-parameters/speed#default)

`1`

## speed code example

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });
}

function onInput() {
  utils.sync(() => engine.speed = this.value);
}

$range.addEventListener('input', onInput);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0.1 max=2 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [timeUnit (seconds / milliseconds)](https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds "timeUnit (seconds / milliseconds)")
* [fps](https://animejs.com/documentation/engine/engine-parameters/fps "fps")
