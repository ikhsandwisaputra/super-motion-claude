---
source: https://animejs.com/documentation/animation/animation-methods/reset
title: "reset() | Animation methods | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")

[Since 3.0.0](https://github.com/juliangarnier/anime/releases/tag/v3.0.0)

# [reset() JS](https://animejs.com/documentation/animation/animation-methods/reset "reset()")

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
animation.reset(softReset);
```

## [Parameters](https://animejs.com/documentation/animation/animation-methods/reset#parameters)

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## [Returns](https://animejs.com/documentation/animation/animation-methods/reset#returns)

The animation itself

Can be chained with other animation methods.

## reset() code example

```js
import { animate, utils, stagger } from 'animejs';

const [ $hardReset, $softReset ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const hardReset = () => animation.reset();
const softReset = () => animation.reset(true);

$hardReset.addEventListener('click', hardReset);
$softReset.addEventListener('click', softReset);
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
    <button class="button">Hard reset</button>
    <button class="button">Soft reset</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revert()](https://animejs.com/documentation/animation/animation-methods/revert "revert()")
* [seek()](https://animejs.com/documentation/animation/animation-methods/seek "seek()")
