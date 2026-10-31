---
source: https://animejs.com/documentation/layout/layout-callbacks
title: "Layout callbacks | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Layout callbacks](https://animejs.com/documentation/layout/layout-callbacks "Layout callbacks")

Layout animations inherit all [Timeline callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks"), allowing you to execute functions at specific points during playback like you would with a regular Timeline.

```js
import { createLayout } from 'animejs';

createLayout(root, {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
┌───────────────────────────┐
│ onBegin: () => {},        │
│ onUpdate: () => {},       ├─ Callbacks
│ onComplete: () => {},     │
}).then(() => {});          │
└───────────────────────────┘
```

The [`.then()`](https://animejs.com/documentation/animation/animation-callbacks/then) method is also available on the `Timeline` returned by [`.update()`](https://animejs.com/documentation/layout/layout-methods/update) or [`.animate()`](https://animejs.com/documentation/layout/layout-methods/animate).

###### Previous

###### Next

* [Layout id attribute](https://animejs.com/documentation/layout/layout-id-attribute "Layout id attribute")
* [Layout properties](https://animejs.com/documentation/layout/layout-properties "Layout properties")
