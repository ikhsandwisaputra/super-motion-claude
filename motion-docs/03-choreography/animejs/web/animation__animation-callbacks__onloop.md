---
source: https://animejs.com/documentation/animation/animation-callbacks/onloop
title: "onLoop | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onLoop JS](https://animejs.com/documentation/animation/animation-callbacks/onloop "onLoop")

Executes a function every time an animation iteration ([loop](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")) completes.

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/onloop#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/onloop#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## onLoop code example

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onLoop: self => $value.textContent = ++loops
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onRender](https://animejs.com/documentation/animation/animation-callbacks/onrender "onRender")
* [onPause](https://animejs.com/documentation/animation/animation-callbacks/onpause "onPause")
