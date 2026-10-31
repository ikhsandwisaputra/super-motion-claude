---
source: https://animejs.com/documentation/layout/layout-settings/duration
title: "duration | Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [duration](https://animejs.com/documentation/layout/layout-settings/duration "duration")

Defines the duration in milliseconds of all animated layout elements.
Compatible with the [`stagger()`](https://animejs.com/documentation/utilities/stagger) utility function.

## [Accepts](https://animejs.com/documentation/layout/layout-settings/duration#accepts)

* `Number` equal to or greater than `0`
* [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/layout/layout-settings/duration#default)

`350`

## duration code example

```js
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB, { duration: 1000 });

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
    <div class="item col">default</div>
    <div class="item col">duration</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">1000ms</div>
    <div class="item col">duration</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate default</button>
    <button class="button">Animate 1000ms</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [delay](https://animejs.com/documentation/layout/layout-settings/delay "delay")
* [ease](https://animejs.com/documentation/layout/layout-settings/ease "ease")
