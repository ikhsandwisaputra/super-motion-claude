---
source: https://animejs.com/documentation/scope/scope-parameters
title: "Scope parameters | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Scope parameters](https://animejs.com/documentation/scope/scope-parameters "Scope parameters")

```js
import { createScope, animate } from 'animejs';

createScope({
┌─────────────────────────────────────────────────┐
│ root: '.section',                               │
│ defaults: {                                     │
│   duration: 250,                                │
│   ease: 'out(4)',                               │
│ },                                              ├─ Parameters
│ mediaQueries: {                                 │
│   mobile: '(max-width: 640px)',                 │
│   reducedMotion: '(prefers-reduced-motion)',    │
│ }                                               │
└─────────────────────────────────────────────────┘
})
.add( ctx => {
  const isMobile = ctx.matches.mobile;
  const reduceMotion = ctx.matches.reducedMotion;
  animate(targets, {
    x: isMobile ? 0 : '100vw',
    y: isMobile ? '100vh' : 0,
    duration: reduceMotion ? 0 : 750
  });
});
```

###### In this section

* [root](https://animejs.com/documentation/scope/scope-parameters/root "root")
* [defaults](https://animejs.com/documentation/scope/scope-parameters/defaults "defaults")
* [mediaQueries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries "mediaQueries")

###### Previous

###### Next

* [Register method function](https://animejs.com/documentation/scope/register-method-function "Register method function")
* [root](https://animejs.com/documentation/scope/scope-parameters/root "root")
