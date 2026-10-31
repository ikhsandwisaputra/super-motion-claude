---
source: https://animejs.com/documentation/animation/animation-callbacks/onbegin
title: "onBegin | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onBegin JS](https://animejs.com/documentation/animation/animation-callbacks/onbegin "onBegin")

Executes a function when an animation begins to play.

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/onbegin#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/onbegin#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## onBegin code example

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

###### Previous

###### Next

* [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")
* [onComplete](https://animejs.com/documentation/animation/animation-callbacks/oncomplete "onComplete")
