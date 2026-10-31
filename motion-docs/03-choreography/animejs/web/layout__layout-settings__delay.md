---
source: https://animejs.com/documentation/layout/layout-settings/delay
title: "delay | Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [delay](https://animejs.com/documentation/layout/layout-settings/delay "delay")

Defines the default delay in milliseconds of all animated layout animations.
Compatible with the [`stagger()`](https://animejs.com/documentation/utilities/stagger) utility function.

## [Accepts](https://animejs.com/documentation/layout/layout-settings/delay#accepts)

* `Number`
* [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/layout/layout-settings/delay#default)

`0`

## delay code example

```js
import { createLayout, utils, stagger } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  delay: 500 // Delays the transition by 500ms
});

function animateLayout(delay) {
  // You can override the layout delay in the update() method too
  layout.update(({ root }) => root.classList.toggle('row'), { delay });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(stagger(150));

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
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
    <button class="button">500 ms delay</button>
    <button class="button">Staggered delay</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [children](https://animejs.com/documentation/layout/layout-settings/children "children")
* [duration](https://animejs.com/documentation/layout/layout-settings/duration "duration")
