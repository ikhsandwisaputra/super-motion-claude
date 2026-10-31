---
source: https://animejs.com/documentation/layout/layout-settings/children
title: "children | Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [children](https://animejs.com/documentation/layout/layout-settings/children "children")

Targets which elements of the root must have their position / dimensions and specified properties animated.
Descendants of specified children are considered "frozen", and only "swap" state at 50% of their parent transition.
This is mostly used when you don't want to animate elements containing text that reflows during a transition and can cause visual noise.
It's also used to target children elements that are not initially part of the layout root but added during the animation phase, in combination with the [layout id](https://animejs.com/documentation/layout/layout-id-attribute) data-attribute.

## [Accepts](https://animejs.com/documentation/layout/layout-settings/children#accepts)

* [CSS selector](https://animejs.com/documentation/animation/targets/css-selector "CSS selector")
* [DOM element](https://animejs.com/documentation/animation/targets/dom-elements "DOM element")
* NodeList or `Array<DOMTargetSelector>`

## [Default](https://animejs.com/documentation/layout/layout-settings/children#default)

`'*'`

## children code example

```js
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithoutFade = () => animateLayout({ opacity: 1 });
const animateWithFade = () => animateLayout({ opacity: 0 });

$buttonA.addEventListener('click', animateWithoutFade);
$buttonB.addEventListener('click', animateWithFade);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not targeted</p></div>
    <div class="item col"><p>So they simply swap between states</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate without fade</button>
    <button class="button">Animate with fade</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Settings](https://animejs.com/documentation/layout/layout-settings "Settings")
* [delay](https://animejs.com/documentation/layout/layout-settings/delay "delay")
