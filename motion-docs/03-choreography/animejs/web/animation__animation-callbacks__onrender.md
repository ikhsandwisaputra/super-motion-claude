---
source: https://animejs.com/documentation/animation/animation-callbacks/onrender
title: "onRender | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onRender JS](https://animejs.com/documentation/animation/animation-callbacks/onrender "onRender")

Executes a function every time an animation renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames.

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/onrender#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/onrender#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onRender = self => console.log(self.id);
```

## onRender code example

```js
import { animate, utils } from 'animejs';

const [ $rendersLog ] = utils.$('.value');

let renders = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onRender: self => $rendersLog.textContent = ++renders
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onUpdate](https://animejs.com/documentation/animation/animation-callbacks/onupdate "onUpdate")
* [onLoop](https://animejs.com/documentation/animation/animation-callbacks/onloop "onLoop")
