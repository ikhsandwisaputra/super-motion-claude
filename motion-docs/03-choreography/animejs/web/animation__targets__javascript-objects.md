---
source: https://animejs.com/documentation/animation/targets/javascript-objects
title: "JavaScript Objects | Targets | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Targets](https://animejs.com/documentation/animation/targets "Targets")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [JavaScript Objects JS](https://animejs.com/documentation/animation/targets/javascript-objects "JavaScript Objects")

Targets one or multiple JavaScript `Object`.

## [Accepts](https://animejs.com/documentation/animation/targets/javascript-objects#accepts)

* `Object`
* Instance of `Class`

## JavaScript Objects code example

```js
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate(vector2D, {
  x: 100,
  y: 150,
  modifier: utils.round(0),
  onUpdate: () => $log.textContent = JSON.stringify(vector2D),
});
```

```html
<pre class="row large centered">
  <code>{"x":0,"y":0}</code>
</pre>
```

###### Previous

###### Next

* [DOM Elements](https://animejs.com/documentation/animation/targets/dom-elements "DOM Elements")
* [Array of targets](https://animejs.com/documentation/animation/targets/array-of-targets "Array of targets")
