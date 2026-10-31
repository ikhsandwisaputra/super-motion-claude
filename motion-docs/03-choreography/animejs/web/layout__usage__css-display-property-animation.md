---
source: https://animejs.com/documentation/layout/usage/css-display-property-animation
title: "CSS display property animation | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [CSS display property animation](https://animejs.com/documentation/layout/usage/css-display-property-animation "CSS display property animation")

An `AutoLayout` can automatically animate between CSS display properties, like `flex`, `grid` or `none`.
It's also possible to define custom [entering](https://animejs.com/documentation/layout/states-parameters/enterFrom) and [leaving](https://animejs.com/documentation/layout/states-parameters/leaveTo) states for children elements that get hidden with `display: none` or `visibility: hidden`.

## CSS display property animation code example

```js
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const items = utils.$('.item');

const displayClasses = [
  'flex-row',
  'grid-1',
  'flex-col',
  'none',
  'grid-2',
  'flex-row-reverse',
];

const layout = createLayout('.layout-container', {
  // Custom animation state for elements leaving the layout with display: none
  leaveTo: {
    transform: 'scale(0)',
    delay: stagger(75),
  },
});

let index = 0;

function animateLayout() {
  layout.update(({ root }) => {
    root.classList.remove(displayClasses[index]);
    index++;
    if (index > displayClasses.length - 1) index = 0;
    root.classList.add(displayClasses[index]);
    $button.innerText = displayClasses[index];
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container flex-row">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">flex-row</button>
  </fieldset>
</div>
```

```css
#layout-usage-css-display-property-animation .grid-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > :last-child:nth-child(odd) {
    grid-column: span 2;
  }
}

#layout-usage-css-display-property-animation .grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > :first-child {
    grid-column: span 2;
  }
}

#layout-usage-css-display-property-animation .none .item {
  display: none;
}

#layout-usage-css-display-property-animation .flex-row {
  display: flex;
  flex-direction: row;
}

#layout-usage-css-display-property-animation .flex-col {
  display: flex;
  flex-direction: column;
}

#layout-usage-css-display-property-animation .flex-row-reverse {
  display: flex;
  flex-direction: row-reverse;
}
```

###### Previous

###### Next

* [Specifying a root](https://animejs.com/documentation/layout/usage/specifying-a-root "Specifying a root")
* [Staggered layout animation](https://animejs.com/documentation/layout/usage/staggered-layout-animation "Staggered layout animation")
