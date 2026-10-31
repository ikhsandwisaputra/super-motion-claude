---
source: https://animejs.com/documentation/layout/layout-methods/record
title: "record() | Layout methods | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [record()](https://animejs.com/documentation/layout/layout-methods/record "record()")

Record a layout snapshot that will be used as the initial state of the next animation created with `animate()`.

## [Returns](https://animejs.com/documentation/layout/layout-methods/record#returns)

`AutoLayout`

## record() code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate();
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Layout methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")
* [animate()](https://animejs.com/documentation/layout/layout-methods/animate "animate()")
