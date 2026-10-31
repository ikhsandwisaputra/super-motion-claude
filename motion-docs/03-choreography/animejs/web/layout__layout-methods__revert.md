---
source: https://animejs.com/documentation/layout/layout-methods/revert
title: "revert() | Layout methods | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [revert()](https://animejs.com/documentation/layout/layout-methods/revert "revert()")

Completes all currently running layout animations, reverting the DOM to its actual current state.

## [Returns](https://animejs.com/documentation/layout/layout-methods/revert#returns)

`AutoLayout`

## revert() code example

```js
import { createLayout, utils } from 'animejs';

const [ $animate, $revert ] = utils.$('.controls button');

const layout = createLayout('.layout-container', { duration: 5000, ease: 'out(3)' });

function animateLayout() {
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
    $revert.disabled = false;
  }).then(() => $revert.disabled = true);
}

function revertLayout() {
  layout.revert();
}

$animate.addEventListener('click', animateLayout);
$revert.addEventListener('click', revertLayout);
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
    <button class="button">animate()</button>
    <button class="button" disabled>revert()</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [update()](https://animejs.com/documentation/layout/layout-methods/update "update()")
* [Layout id attribute](https://animejs.com/documentation/layout/layout-id-attribute "Layout id attribute")
