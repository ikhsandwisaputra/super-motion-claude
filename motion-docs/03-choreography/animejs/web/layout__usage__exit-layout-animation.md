---
source: https://animejs.com/documentation/layout/usage/exit-layout-animation
title: "Exit layout animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Exit layout animation](https://animejs.com/documentation/layout/usage/exit-layout-animation "Exit layout animation")

Automatically animates elements leaving the layout, and optionally specifies their final properties and timings using the [`leaveTo`](https://animejs.com/documentation/layout/states-parameters/leaveTo) state parameters (defaults to opacity: 0).

## Exit layout animation code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements leaving the layout
    ease: 'out(3)' // Applied to the elements leaving the layout
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden'); // temporarily hide the element using `display: none`
  }).then(() => {
    // Remove the elements from the DOM when the animation finishes
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

```css
#layout-usage-exit-layout-animation .is-hidden {
  display: none;
}
```

###### Previous

###### Next

* [Enter layout animation](https://animejs.com/documentation/layout/usage/enter-layout-animation "Enter layout animation")
* [Swap parent animation](https://animejs.com/documentation/layout/usage/swap-parent-animation "Swap parent animation")
