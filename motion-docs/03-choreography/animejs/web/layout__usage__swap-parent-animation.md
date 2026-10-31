---
source: https://animejs.com/documentation/layout/usage/swap-parent-animation
title: "Swap parent animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Swap parent animation](https://animejs.com/documentation/layout/usage/swap-parent-animation "Swap parent animation")

Automatically animates children elements being moved from one parent to another.

## Swap parent animation code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    const $child = root.querySelector('.item');
    const $parent = $child.parentElement;
    const $nextParent = $parent.nextElementSibling || $parent.previousElementSibling;
    $parent.style.zIndex = '0';
    $nextParent.style.zIndex = '1';
    $nextParent.appendChild($child);
  })
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Swap parent</button>
  </fieldset>
</div>
```

```css
#layout-usage-swap-parent-animation .container-b {
  flex: 2;
}
```

###### Previous

###### Next

* [Exit layout animation](https://animejs.com/documentation/layout/usage/exit-layout-animation "Exit layout animation")
* [Modal dialog animation](https://animejs.com/documentation/layout/usage/animate-modal-dialog "Modal dialog animation")
