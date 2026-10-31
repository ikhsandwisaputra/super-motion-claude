---
source: https://animejs.com/documentation/animation/targets/dom-elements
title: "DOM Elements | Targets | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Targets](https://animejs.com/documentation/animation/targets "Targets")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [DOM Elements](https://animejs.com/documentation/animation/targets/dom-elements "DOM Elements")

Targets one or multiple DOM Elements.

## [Accepts](https://animejs.com/documentation/animation/targets/dom-elements#accepts)

* `HTMLElement`
* `SVGElement`
* `SVGGeometryElement`
* `NodeList`

## DOM Elements code example

```js
import { animate } from 'animejs';

const $demo = document.querySelector('#selector-demo');
const $squares = $demo.querySelectorAll('.square');

animate($demo, { scale: .75 });
animate($squares, { x: '23rem' });
```

```html
<div id="selector-demo">
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
</div>
```

###### Previous

###### Next

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [JavaScript Objects](https://animejs.com/documentation/animation/targets/javascript-objects "JavaScript Objects")
