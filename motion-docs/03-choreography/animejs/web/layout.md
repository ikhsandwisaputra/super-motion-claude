---
source: https://animejs.com/documentation/layout
title: "Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

# [Layout](https://animejs.com/documentation/layout "Layout")

## [Automatically animates between two HTML layout states, allowing you to easily animate properties that are normally impossible or hard to animate like CSS display, flex direction, grid settings, and DOM order.](https://animejs.com/documentation/layout#automatically-animates-between-two-html-layout-states-allowing-you-to-easily-animate-properties-that-are-normally-impossible-or-)

## [Examples](https://animejs.com/documentation/layout#examples)

Explore the Auto Layout examples [CodePen collection](https://codepen.io/collection/yykPaw).

## [Creating a layout](https://animejs.com/documentation/layout#creating-a-layout)

Layout instances are created with the `createLayout()` method exported by the main `'animejs'` entry point:

```js
import { createLayout } from 'animejs';

const layout = createLayout(root, parameters);
```

Or imported as a standalone module from the `'animejs/layout'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { createLayout } from 'animejs/layout';
```

## [Parameters](https://animejs.com/documentation/layout#parameters)

| Name | Accepts |
| --- | --- |
| root | [CSS selector](https://animejs.com/documentation/animation/targets/css-selector "CSS selector") | [DOM element](https://animejs.com/documentation/animation/targets/dom-elements "DOM element") |
| parameters (opt) | `Object` of [Layout settings](https://animejs.com/documentation/layout/layout-settings "Layout settings") & [Layout states parameters](https://animejs.com/documentation/layout/states-parameters "Layout states parameters") |

## [Returns](https://animejs.com/documentation/layout#returns)

`AutoLayout`

## [Animating a layout](https://animejs.com/documentation/layout#animating-a-layout)

Layout animations are triggered either by calling `layout.record()` and `layout.animate()` before and after updating the layout, or by simply calling `layout.update(cb)` with the layout changes inside the callback:

```js
// Toggle between list and grid view
layout.update(({ root }) => root.classList.toggle('grid'));
```

## Layout code example

```js
import { createLayout, utils, stagger } from 'animejs';

const layout = createLayout('.layout-container');

let i = 0;

function animateLayout() {
  return layout.update(({ root }) => {
    root.dataset.grid = (++i % 4) + 1;
  }, {
    duration: 1000,
    delay: stagger(150),
    onComplete: () => animateLayout()
  });
}

const layoutAnimation = animateLayout();
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout" data-grid="1">
    <div class="item">Item A</div>
    <div class="item">Item B</div>
    <div class="item">Item C</div>
    <div class="item">Item D</div>
  </div>
</div>
```

```css
#layout .grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

/* grid-1 */
#layout [data-grid="1"] .item:nth-child(1) { grid-column: 1; grid-row: 1 / 3; }
#layout [data-grid="1"] .item:nth-child(2) { grid-column: 2; grid-row: 1; }
#layout [data-grid="1"] .item:nth-child(3) { grid-column: 1; grid-row: 3; }
#layout [data-grid="1"] .item:nth-child(4) { grid-column: 2; grid-row: 2 / 4; }

#layout [data-grid="2"] { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
#layout [data-grid="2"] .item:nth-child(1),
#layout [data-grid="2"] .item:nth-child(4) { grid-row: 1 / 3; }

#layout [data-grid="3"] .item:nth-child(4) { grid-column: 1; grid-row: 1; }
#layout [data-grid="3"] .item:nth-child(3) { grid-column: 2; grid-row: 1 / 3; }
#layout [data-grid="3"] .item:nth-child(2) { grid-column: 1; grid-row: 2 / 4; }
#layout [data-grid="3"] .item:nth-child(1) { grid-column: 2; grid-row: 3; }

#layout [data-grid="4"] { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
#layout [data-grid="4"] .item:nth-child(1) { grid-column: 1; grid-row: 1; }
#layout [data-grid="4"] .item:nth-child(2) { grid-column: 1; grid-row: 2; }
#layout [data-grid="4"] .item:nth-child(3),
#layout [data-grid="4"] .item:nth-child(4) { grid-row: 1 / 3; }
```

###### In this section

* [Usage](https://animejs.com/documentation/layout/usage "Usage")
* [Settings](https://animejs.com/documentation/layout/layout-settings "Settings")
* [States](https://animejs.com/documentation/layout/states-parameters "States parameters")
* [Methods](https://animejs.com/documentation/layout/layout-methods "Layout methods")
* [Layout id](https://animejs.com/documentation/layout/layout-id-attribute "Layout id attribute")
* [Callbacks](https://animejs.com/documentation/layout/layout-callbacks "Layout callbacks")
* [Properties](https://animejs.com/documentation/layout/layout-properties "Layout properties")
* [Common gotchas](https://animejs.com/documentation/layout/common-auto-layout-gotchas "Common auto layout gotchas")

###### Previous

###### Next

* [Draggable properties](https://animejs.com/documentation/draggable/draggable-properties "Draggable properties")
* [Usage](https://animejs.com/documentation/layout/usage "Usage")
