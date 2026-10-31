---
source: https://animejs.com/documentation/animatable/animatable-methods/revert
title: "revert() | Animatable methods | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Methods](https://animejs.com/documentation/animatable/animatable-methods "Animatable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/animatable/animatable-methods/revert "revert()")

Reverts all the animatable properties to their original values and cleanup the CSS inline styles.

Use `revert()` when you want to completely stop and destroy an animatable.

## [Returns](https://animejs.com/documentation/animatable/animatable-methods/revert#returns)

The animatable itself

Can be chained with other animatable methods.

## revert() code example

```js
import { createAnimatable, utils, stagger } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = $demos.querySelector('.docs-demo.is-active');
const [ $revertButton ] = utils.$('.revert');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circles = createAnimatable('.circle', {
  x: stagger(50, { from: 'center', start: 100 }),
  y: stagger(200, { from: 'center', start: 200 }),
  ease: 'out(4)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  circles.x(x).y(y);
}

const revertAnimatable = () => {
  window.removeEventListener('mousemove', onMouseMove);
  circles.revert();
}

$revertButton.addEventListener('click', revertAnimatable);
window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

```html
<div class="large centered row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Setters](https://animejs.com/documentation/animatable/animatable-methods/setters "Setters")
* [Animatable properties](https://animejs.com/documentation/animatable/animatable-properties "Animatable properties")
