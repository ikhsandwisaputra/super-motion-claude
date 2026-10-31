---
source: https://animejs.com/documentation/animation/targets/array-of-targets
title: "Array of targets | Targets | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Targets](https://animejs.com/documentation/animation/targets "Targets")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Array of targets](https://animejs.com/documentation/animation/targets/array-of-targets "Array of targets")

Targets multiple valid [Targets](https://animejs.com/documentation/animation/targets "Targets") simultaneously by grouping them inside an `Array`.
Any types of targets can be grouped together

## [Accepts](https://animejs.com/documentation/animation/targets/array-of-targets#accepts)

An `Array` of [Targets](https://animejs.com/documentation/animation/targets "Targets")

## Array of targets code example

```js
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate([vector2D, '.square'], {
  x: '17rem',
  modifier: utils.roundPad(2).padStart(5, '0'),
  onRender: () => $log.textContent = JSON.stringify(vector2D),
});
```

```html
<pre class="row large centered">
  <code>{"x":"0"}</code>
</pre>
<div class="row medium">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [JavaScript Objects](https://animejs.com/documentation/animation/targets/javascript-objects "JavaScript Objects")
* [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")
