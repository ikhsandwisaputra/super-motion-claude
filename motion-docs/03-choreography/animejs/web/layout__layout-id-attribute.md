---
source: https://animejs.com/documentation/layout/layout-id-attribute
title: "Layout id attribute | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Layout id attribute](https://animejs.com/documentation/layout/layout-id-attribute "Layout id attribute")

Layout ids are automatically assigned or can be manually defined using a `data-layout-id` attribute.
If two elements share the same id, and one of them is hidden (`display: none`, `visibility: hidden`) and the other one is visible, the layout will automatically animate between the two.
This is generally used when you want to create an animation between two elements in different parts of the DOM without having to clone or move them.

## Layout id attribute code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $itemA1, $itemA2 ] = utils.$('.item');

// Manually set the same layout id to both items
$itemA1.dataset.layoutId = "item-A";
$itemA2.dataset.layoutId = "item-A";

// Hide item 2
$itemA2.classList.add('is-hidden');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    // Toggle the visibility and alternate between the two items
    $itemA1.classList.toggle('is-hidden');
    $itemA2.classList.toggle('is-hidden');
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
    <div class="item col">Item A</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Toggle visibility</button>
  </fieldset>
</div>
```

```css
#layout-layout-id-attribute .item.is-hidden {
  display: none;
}
```

###### Previous

###### Next

* [revert()](https://animejs.com/documentation/layout/layout-methods/revert "revert()")
* [Layout callbacks](https://animejs.com/documentation/layout/layout-callbacks "Layout callbacks")
