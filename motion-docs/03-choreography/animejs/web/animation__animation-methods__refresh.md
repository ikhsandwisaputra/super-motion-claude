---
source: https://animejs.com/documentation/animation/animation-methods/refresh
title: "refresh() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [refresh() JS](https://animejs.com/documentation/animation/animation-methods/refresh "refresh()")

Re-computes animated properties values defined with a [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") by updating the *from* values to the current target values, and the *to* values to the newly computed values.

Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.

## [Returns](https://animejs.com/documentation/animation/animation-methods/refresh#returns)

The animation itself

Can be chained with other animation methods.

## refresh() code example

```js
import { animate } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const animation = animate('.square', {
  x: () => utils.random(0, 17) + 'rem',
  y: () => utils.random(-1, 1) + 'rem',
  rotate: () => utils.random(-360, 360, 1),
  scale: () => utils.random(.1, 1.5, 2),
  duration: 750,
  loop: true,
  onLoop: self => self.refresh()
});

const refreshAnimation = () => animation.refresh().restart();

$refreshButton.addEventListener('click', refreshAnimation);
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

```css
#resize .large.log.row {
  margin-top: 1rem;
}
```

###### Previous

###### Next

* [stretch()](https://animejs.com/documentation/animation/animation-methods/stretch "stretch()")
* [Animation properties](https://animejs.com/documentation/animation/animation-properties "Animation properties")
