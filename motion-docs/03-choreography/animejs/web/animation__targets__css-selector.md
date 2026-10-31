---
source: https://animejs.com/documentation/animation/targets/css-selector
title: "CSS Selector | Targets | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Targets](https://animejs.com/documentation/animation/targets "Targets")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")

Targets one or multiple DOM Elements using a CSS selector.

## [Accepts](https://animejs.com/documentation/animation/targets/css-selector#accepts)

Any `String` accepted by `document.querySelectorAll()`

## CSS Selector code example

```js
import { animate } from 'animejs';

animate('.square', { x: '17rem' });
animate('#css-selector-id', { rotate: '1turn' });
animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div id="css-selector-id" class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Targets](https://animejs.com/documentation/animation/targets "Targets")
* [DOM Elements](https://animejs.com/documentation/animation/targets/dom-elements "DOM Elements")
