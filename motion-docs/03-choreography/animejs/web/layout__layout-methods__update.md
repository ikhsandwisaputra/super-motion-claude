---
source: https://animejs.com/documentation/layout/layout-methods/update
title: "update() | Layout methods | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [update()](https://animejs.com/documentation/layout/layout-methods/update "update()")

One-call helper that runs `record()`, executes your DOM mutations, and calls `animate()` with optional overrides.

This might not work in some frameworks (I haven't tested all of them).
Use the manual `record()` / `.animate()` combo if the animation doesn't work with `.update()`.

## [Parameters](https://animejs.com/documentation/layout/layout-methods/update#parameters)

* A callback `Function` to update the layout
* An optional `Object` of animation parameters to override default layout timing and easing for this specific transition.

## [Returns](https://animejs.com/documentation/layout/layout-methods/update#returns)

`Timeline`

## update() code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Triggers both layout.record() and layout.animate()
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
  }, {
    duration: 750,
    ease: 'out(4)',
  });
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
    <button class="button">update()</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [animate()](https://animejs.com/documentation/layout/layout-methods/animate "animate()")
* [revert()](https://animejs.com/documentation/layout/layout-methods/revert "revert()")
