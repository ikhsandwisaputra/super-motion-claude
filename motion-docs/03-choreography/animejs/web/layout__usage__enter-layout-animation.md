---
source: https://animejs.com/documentation/layout/usage/enter-layout-animation
title: "Enter layout animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Enter layout animation](https://animejs.com/documentation/layout/usage/enter-layout-animation "Enter layout animation")

Automatically animates elements entering the layout, and optionally specifies initial properties and timings using the [`enterFrom`](https://animejs.com/documentation/layout/states-parameters/enterFrom) state parameters (default opacity: 0).

## Enter layout animation code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [DOM order change animation](https://animejs.com/documentation/layout/usage/dom-order-change-animation "DOM order change animation")
* [Exit layout animation](https://animejs.com/documentation/layout/usage/exit-layout-animation "Exit layout animation")
