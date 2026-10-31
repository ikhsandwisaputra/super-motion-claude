---
source: https://animejs.com/documentation/animation/animation-callbacks/onpause
title: "onPause | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onPause JS](https://animejs.com/documentation/animation/animation-callbacks/onpause "onPause")

Executes a function when a running animation is paused, either manually or automatically.

An animation pauses when any of the following occurs during playback:

* The `.pause()` method is called
* The `.cancel()` method is called
* The `.revert()` method is called
* All animation tweens are overlapped by another animation with `composition: 'replace'`
* All animation targets have been removed

## [Accepts](https://animejs.com/documentation/animation/animation-callbacks/onpause#accepts)

A `Function` whose first argument is the animation itself

## [Default](https://animejs.com/documentation/animation/animation-callbacks/onpause#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onPause = self => console.log(self.id);
```

## onPause code example

```js
import { animate, utils } from 'animejs';

const [ $animateButton, $pauseButton, $removeButton ] = utils.$('.button');
const [ $value ] = utils.$('.value');
const [ $circle ] = utils.$('.circle');

let paused = 0;
let alternate = 0;
let animation;

const animateX = () => {
  alternate = !alternate;
  animation = animate($circle, {
    x: () => (alternate ? 16 : 0) + 'rem',
    duration: 2000,
    onPause: () => $value.innerHTML = ++paused,
  });
}

const pauseAnimation = () => {
  if (animation) animation.pause();
}

const removeTarget = () => {
  utils.remove($circle);
}

animateX();

$animateButton.addEventListener('click', animateX);
$pauseButton.addEventListener('click', pauseAnimation);
$removeButton.addEventListener('click', removeTarget);
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate x</button>
    <button class="button">Pause anim</button>
    <button class="button">Remove target</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [onLoop](https://animejs.com/documentation/animation/animation-callbacks/onloop "onLoop")
* [then()](https://animejs.com/documentation/animation/animation-callbacks/then "then()")
