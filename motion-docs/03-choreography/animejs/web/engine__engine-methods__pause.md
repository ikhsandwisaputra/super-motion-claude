---
source: https://animejs.com/documentation/engine/engine-methods/pause
title: "pause() | Engine methods | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Methods](https://animejs.com/documentation/engine/engine-methods "Engine methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [pause()](https://animejs.com/documentation/engine/engine-methods/pause "pause()")

Pauses the engine's main loop, pausing all active [Timer](https://animejs.com/documentation/timer "Timer"), [Animation](https://animejs.com/documentation/animation "Animation"), and [Timeline](https://animejs.com/documentation/timeline "Timeline") instances. Use [`engine.resume()`](https://animejs.com/documentation/engine/engine-methods/resume "engine.resume()") to restart the animations from where they paused.

```js
engine.pause();  // Stops all animations
engine.resume(); // Resumes all animations
```

[Timer](https://animejs.com/documentation/timer "Timer"), [Animation](https://animejs.com/documentation/animation "Animation"), or [Timeline](https://animejs.com/documentation/timeline "Timeline") can still be added when the engine is paused, but won't play until the engine is started again.

## [Returns](https://animejs.com/documentation/engine/engine-methods/pause#returns)

[Engine](https://animejs.com/documentation/engine "Engine")

## pause() code example

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $add, $pause ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
  });
}

let timeout = 3;
let interval;

function pauseEngine() {
  engine.pause();
  $pause.setAttribute('disabled', 'true');
  $pause.innerHTML = `Resume in ${timeout--} seconds`;
  interval = setInterval(() => {
    if (timeout <= 0) {
      clearInterval(interval);
      engine.resume();
      $pause.removeAttribute('disabled');
      $pause.innerHTML = 'Pause for 3 seconds';
      timeout = 3;
    } else {
      $pause.innerHTML = `Resume in ${timeout--} seconds`;
    }
  }, 1000);
}

$add.addEventListener('click', addAnimation);
$pause.addEventListener('click', pauseEngine);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add animation</button>
    <button>Pause for 3 seconds</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [update()](https://animejs.com/documentation/engine/engine-methods/update "update()")
* [resume()](https://animejs.com/documentation/engine/engine-methods/resume "resume()")
