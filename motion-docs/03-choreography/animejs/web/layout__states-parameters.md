---
source: https://animejs.com/documentation/layout/states-parameters
title: "States parameters | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [States parameters](https://animejs.com/documentation/layout/states-parameters "States parameters")

Defines properties applied to elements during specific transition phases: entering the layout, leaving the layout, or swapping position.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
┌─────────────────────────────┐
│ enterFrom: { opacity: 0 },  │
│ leaveTo: { opacity: 0 },    ├─ State Parameters
│ swapAt: { opacity: 0 },     │
└─────────────────────────────┘
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

Each parameter accepts an `Object` of CSS properties with optional `delay`, `duration`, and `ease` overrides.

After calling `layout.update()` or `layout.animate()`, corresponding element arrays are available on the layout instance:

| Array | Contains |
| --- | --- |
| `layout.entering` | Elements that appeared in the layout |
| `layout.leaving` | Elements that disappeared from the layout |
| `layout.swapping` | Non-animated children during transitions |

These arrays are cleared and repopulated on each `.animate()` call.

###### In this section

* [enterFrom](https://animejs.com/documentation/layout/states-parameters/enterFrom "enterFrom")
* [leaveTo](https://animejs.com/documentation/layout/states-parameters/leaveTo "leaveTo")
* [swapAt](https://animejs.com/documentation/layout/states-parameters/swapAt "swapAt")

###### Previous

###### Next

* [properties](https://animejs.com/documentation/layout/layout-settings/properties "properties")
* [enterFrom](https://animejs.com/documentation/layout/states-parameters/enterFrom "enterFrom")
