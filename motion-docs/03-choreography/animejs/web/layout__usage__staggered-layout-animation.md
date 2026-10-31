---
source: https://animejs.com/documentation/layout/usage/staggered-layout-animation
title: "Staggered layout animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Staggered layout animation](https://animejs.com/documentation/layout/usage/staggered-layout-animation "Staggered layout animation")

The `AutoLayout` [`delay`](https://animejs.com/documentation/layout/layout-settings/delay) property accepts the [`stagger()`](https://animejs.com/documentation/utilities/stagger) utility method to easily create staggered animations of layout children changes.

## Staggered layout animation code example

```js
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $root ] = utils.$('.layout-container');
const items = utils.$('.item');

const layout = createLayout($root, { ease: 'outExpo' });

function animateLayout() {
  layout.update(() => {
    $root.classList.toggle('row');
  }, {
    // Different stagger "from" param depending on the layout state
    delay: stagger(50, { from: $root.classList.contains('row') ? 'last' : 'first' })
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
    <div class="item col">Item D</div>
    <div class="item col">Item E</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Stagger animation</button>
  </fieldset>
</div>
```

```css
#layout-usage-staggered-layout-animation .layout-container {
  overflow: scroll;
  flex-wrap: nowrap;
}

#layout-usage-staggered-layout-animation .layout-container .item {
  min-height: 2rem;
}
```

###### Previous

###### Next

* [CSS display property animation](https://animejs.com/documentation/layout/usage/css-display-property-animation "CSS display property animation")
* [DOM order change animation](https://animejs.com/documentation/layout/usage/dom-order-change-animation "DOM order change animation")
