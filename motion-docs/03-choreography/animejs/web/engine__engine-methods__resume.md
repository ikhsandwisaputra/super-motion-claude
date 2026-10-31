---
source: https://animejs.com/documentation/engine/engine-methods/resume
title: "resume() | Engine methods | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Methods](https://animejs.com/documentation/engine/engine-methods "Engine methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [resume()](https://animejs.com/documentation/engine/engine-methods/resume "resume()")

Resumes the engine after being either paused with a call to [`engine.pause()`](https://animejs.com/documentation/engine/engine-methods/pause "engine.pause()").

```js
engine.pause();  // Pauses the engine and all animations
engine.resume(); // Resumes the engine and all animations
```

## [Returns](https://animejs.com/documentation/engine/engine-methods/resume#returns)

[Engine](https://animejs.com/documentation/engine "Engine")

## resume() code example

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $pause, $resume ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
    delay: utils.random(0, 1000)
  });
}

for (let i = 0; i < 150; i++) addAnimation();

const resumeEngine = () => engine.resume();
const pauseEngine = () => engine.pause();

$pause.addEventListener('click', pauseEngine);
$resume.addEventListener('click', resumeEngine);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Pause</button>
    <button>Resume</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [pause()](https://animejs.com/documentation/engine/engine-methods/pause "pause()")
* [Engine properties](https://animejs.com/documentation/engine/engine-properties "Engine properties")
