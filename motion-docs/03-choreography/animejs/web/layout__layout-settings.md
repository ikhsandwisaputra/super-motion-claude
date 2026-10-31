---
source: https://animejs.com/documentation/layout/layout-settings
title: "Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

Layout settings are defined directly in the `createLayout()` parameters `Object`.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
┌─────────────────────────────┐
│ children: '.item',          │
│ duration: 350,              │
│ delay: 0,                   ├─ Settings
│ ease: 'inOut(3.5)',         │
│ properties: ['boxShadow'],  │
└─────────────────────────────┘
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

###### In this section

* [children](https://animejs.com/documentation/layout/layout-settings/children "children")
* [delay](https://animejs.com/documentation/layout/layout-settings/delay "delay")
* [duration](https://animejs.com/documentation/layout/layout-settings/duration "duration")
* [ease](https://animejs.com/documentation/layout/layout-settings/ease "ease")
* [properties](https://animejs.com/documentation/layout/layout-settings/properties "properties")

###### Previous

###### Next

* [Modal dialog animation](https://animejs.com/documentation/layout/usage/animate-modal-dialog "Modal dialog animation")
* [children](https://animejs.com/documentation/layout/layout-settings/children "children")
