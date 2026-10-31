---
source: https://animejs.com/documentation/scope/scope-methods/keeptime
title: "keepTime() | Scope methods | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Methods](https://animejs.com/documentation/scope/scope-methods "Scope methods")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [keepTime()](https://animejs.com/documentation/scope/scope-methods/keeptime "keepTime()")

Adds a constructor `Function` that recreates a [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline") between media query changes while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
scope.keepTime(() => animate(target, parameters));
```

## [Parameters](https://animejs.com/documentation/scope/scope-methods/keeptime#parameters)

| Name | Accepts |
| --- | --- |
| constructor | A `Function` that returns a [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline") |

## [Returns](https://animejs.com/documentation/scope/scope-methods/keeptime#returns)

The [`Timer`](https://animejs.com/documentation/timer "Timer"), [`Animation`](https://animejs.com/documentation/animation "Animation"), or [`Timeline`](https://animejs.com/documentation/timeline "Timeline") returned by the constructor

`scope.keepTime()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.

```js
// Don't do this
if (scope.matches.small) {
  scope.keepTime(() => animate(target, params));
}
// Do this
scope.keepTime(() => animate(target, params));
```

## keepTime() code example

```js
import { createScope, createTimeline, utils, stagger } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {

  self.addOnce(() => {
    /* Animations declared here won't be reverted between mediaqueries changes */
    createTimeline().add('.circle', {
      backgroundColor: [
        $el => utils.get($el, `--hex-red-1`),
        $el => utils.get($el, `--hex-citrus-1`),
      ],
      loop: true,
      alternate: true,
      duration: 2000,
    }, stagger(100));
  });

  self.keepTime(() => createTimeline().add('.circle', {
    x: self.matches.isSmall ? [-30, 30] : [-70, 70],
    scale: [.5, 1.1],
    loop: true,
    alternate: true,
  }, stagger(100)).init());

});
```

```html
<div class="iframe-content resizable">
  <div class="scopped small centered">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</div>
```

###### Previous

###### Next

* [addOnce()](https://animejs.com/documentation/scope/scope-methods/addonce "addOnce()")
* [revert()](https://animejs.com/documentation/scope/scope-methods/revert "revert()")
