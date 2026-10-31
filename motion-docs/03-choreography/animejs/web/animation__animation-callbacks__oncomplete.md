---
source: https://animejs.com/documentation/animation/animation-callbacks/oncomplete
title: "onComplete | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onComplete](https://animejs.com/documentation/animation/animation-callbacks/oncomplete "onComplete")

Executes a function when all the iterations ([loops](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")) of an animation have finished playing.

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/oncomplete#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/oncomplete#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## onComplete code example

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
  loop: 2,
  alternate: true,
  onComplete: self => $value.textContent = self.completed
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onBegin](https://animejs.com/documentation/animation/animation-callbacks/onbegin "onBegin")
* [onBeforeUpdate](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate "onBeforeUpdate")
