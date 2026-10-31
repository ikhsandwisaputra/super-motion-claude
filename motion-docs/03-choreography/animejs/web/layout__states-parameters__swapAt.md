---
source: https://animejs.com/documentation/layout/states-parameters/swapAt
title: "swapAt | States parameters | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[States](https://animejs.com/documentation/layout/states-parameters "States parameters")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [swapAt](https://animejs.com/documentation/layout/states-parameters/swapAt "swapAt")

Defines the mid-transition properties applied to non-animated children of animated elements.
The animation interpolates to these values at 50% progress, then back to the element's computed state.

## [Accepted properties](https://animejs.com/documentation/layout/states-parameters/swapAt#accepted-properties)

Any valid CSS property can be set.

State animations don't support [CSS transform shorthands](https://animejs.com/documentation/animation/animatable-properties/css-transforms) yet.

```js
swapAt: { scale: 1.2 } // Invalid
swapAt: { transform: 'scale(1.2)' } // Valid
```

## [Accepts](https://animejs.com/documentation/layout/states-parameters/swapAt#accepts)

An `Object` parameters with the following properties:

* CSS property names: `Number|String|Function`
* `delay`: `Number|Function`
* `duration`: `Number|Function`
* `ease`: `String|Function`

## [Default](https://animejs.com/documentation/layout/states-parameters/swapAt#default)

`{ opacity: 0, ease: 'inOut(1.75)' }`

## swapAt code example

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

const animateWithFade = () => animateLayout({ opacity: 0, filter: 'blur(3px)' });
const animateWithoutFade = () => animateLayout({ opacity: 1 });

$buttonA.addEventListener('click', animateWithFade);
$buttonB.addEventListener('click', animateWithoutFade);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not animated</p></div>
    <div class="item col"><p>They only swap at 50% progress</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate with fade</button>
    <button class="button">Animate without fade</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [leaveTo](https://animejs.com/documentation/layout/states-parameters/leaveTo "leaveTo")
* [Layout methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")
