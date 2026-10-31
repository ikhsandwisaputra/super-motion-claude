---
source: https://animejs.com/documentation/layout/usage/specifying-a-root
title: "Specifying a root | Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Usage](https://animejs.com/documentation/layout/usage "Usage")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Specifying a root](https://animejs.com/documentation/layout/usage/specifying-a-root "Specifying a root")

The root is the only mandatory parameter needed to create a layout.
It defines the root element measured by the layout, and limits all [`children`](https://animejs.com/documentation/layout/layout-settings/children) queries to descendants of that element.
By default, all children of a layout are animated.
You can also target elements outside the root by manually defining [layout id](https://animejs.com/documentation/layout/layout-id-attribute) data attributes (see the [modal example](https://animejs.com/documentation/layout/usage/animate-modal-dialog)).

## [Accepts](https://animejs.com/documentation/layout/usage/specifying-a-root#accepts)

* [CSS selector](https://animejs.com/documentation/animation/targets/css-selector "CSS selector")
* [DOM element](https://animejs.com/documentation/animation/targets/dom-elements "DOM element")

## [Default](https://animejs.com/documentation/layout/usage/specifying-a-root#default)

Required

## Specifying a root code example

```js
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB);

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">A 1</div>
    <div class="item col">A 2</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">B 1</div>
    <div class="item col">B 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate A</button>
    <button class="button">Animate B</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Usage](https://animejs.com/documentation/layout/usage "Usage")
* [CSS display property animation](https://animejs.com/documentation/layout/usage/css-display-property-animation "CSS display property animation")
