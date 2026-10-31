---
source: https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate
title: "onBeforeUpdate | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onBeforeUpdate JS](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate "onBeforeUpdate")

Executes a function before updating the tween values, on every frames of a running animation at the specified [`frameRate`](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate").

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBeforeUpdate = self => console.log(self.id);
```

## onBeforeUpdate code example

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let mult = 1;
let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  modifier: v => mult * v,
  loop: true,
  alternate: true,
  onBeforeUpdate: self => {
    $value.textContent = ++updates;
    // Update the mult value just before updating the tweens
    mult = 1 - self.iterationProgress;
  }
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onComplete](https://animejs.com/documentation/animation/animation-callbacks/oncomplete "onComplete")
* [onUpdate](https://animejs.com/documentation/animation/animation-callbacks/onupdate "onUpdate")
