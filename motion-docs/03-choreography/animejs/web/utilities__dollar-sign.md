---
source: https://animejs.com/documentation/utilities/dollar-sign
title: "$() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [$()](https://animejs.com/documentation/utilities/dollar-sign "$()")

Converts the provided targets parameter into an `Array` of elements, serving as an alternative to `document.querySelectorAll()`.

When used within a [Scope](https://animejs.com/documentation/scope), it uses the Scope's `root` element instead of `document`, effectively calling `root.querySelectorAll()`.

```js
const targetsArray = utils.$(targets);
```

## [Parameters](https://animejs.com/documentation/utilities/dollar-sign#parameters)

| Name | Accepts |
| --- | --- |
| targets | [CSS selector](https://animejs.com/documentation/animation/targets/css-selector "CSS selector") | [DOM Elements](https://animejs.com/documentation/animation/targets/dom-elements "DOM Elements") |

## [Returns](https://animejs.com/documentation/utilities/dollar-sign#returns)

An `Array` of `HTMLElement` or `SVGElement` or `SVGGeometryElement`

## $() code example

```js
import { utils, createScope } from 'animejs';

// Targets all the '.square' elements
utils.$('.square').forEach($square => {
  utils.set($square, { scale: .5 });
});

createScope({ root: '.row:nth-child(2)' }).add(() => {
  // Limits the selection to '.row:nth-child(2) .square'
  utils.$('.square').forEach($square => {
    utils.set($square, { rotate: 45 });
  });
});
```

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Stagger jitter](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter "Stagger jitter")
* [get()](https://animejs.com/documentation/utilities/get "get()")
