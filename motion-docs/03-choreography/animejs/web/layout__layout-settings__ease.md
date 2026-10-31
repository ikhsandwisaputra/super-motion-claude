---
source: https://animejs.com/documentation/layout/layout-settings/ease
title: "ease | Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [ease](https://animejs.com/documentation/layout/layout-settings/ease "ease")

Sets the default [easing curve](https://animejs.com/documentation/easings) or [spring](https://animejs.com/documentation/easings/spring) applied to every animation during a layout transition.

## [Accepts](https://animejs.com/documentation/layout/layout-settings/ease#accepts)

* An [easing](https://animejs.com/documentation/easings "easing") `Function`
* A [built-in ease](https://animejs.com/documentation/easings/built-in-eases) `String`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns an [easing](https://animejs.com/documentation/easings "easing") `Function` or a [built-in ease](https://animejs.com/documentation/easings/built-in-eases) `String`

## [Default](https://animejs.com/documentation/layout/layout-settings/ease#default)

`'inOut(3.5)'`

## ease code example

```js
import { createLayout, utils, spring } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  ease: 'outExpo'
});

function animateLayout(ease) {
  // You can override the layout default ease in the update() method parameters
  layout.update(({ root }) => root.classList.toggle('row'), { ease });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(spring());

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">'outExpo'</button>
    <button class="button">spring()</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [duration](https://animejs.com/documentation/layout/layout-settings/duration "duration")
* [properties](https://animejs.com/documentation/layout/layout-settings/properties "properties")
