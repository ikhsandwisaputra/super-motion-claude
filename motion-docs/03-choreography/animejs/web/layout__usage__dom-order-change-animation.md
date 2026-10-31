---
source: https://animejs.com/documentation/layout/usage/dom-order-change-animation
title: "DOM order change animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [DOM order change animation](https://animejs.com/documentation/layout/usage/dom-order-change-animation "DOM order change animation")

Automatically animates DOM order changes.

## DOM order change animation code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  layout.update(({ root }) => {
    const items = [...root.querySelectorAll('.item')];
    utils.shuffle(items).forEach($el => root.appendChild($el))
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container row">
    <div class="item col">A</div>
    <div class="item col">B</div>
    <div class="item col">C</div>
    <div class="item col">D</div>
    <div class="item col">E</div>
    <div class="item col">F</div>
    <div class="item col">G</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Shuffle</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Staggered layout animation](https://animejs.com/documentation/layout/usage/staggered-layout-animation "Staggered layout animation")
* [Enter layout animation](https://animejs.com/documentation/layout/usage/enter-layout-animation "Enter layout animation")
