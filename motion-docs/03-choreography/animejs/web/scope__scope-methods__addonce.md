---
source: https://animejs.com/documentation/scope/scope-methods/addonce
title: "addOnce() | Scope methods | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Methods](https://animejs.com/documentation/scope/scope-methods "Scope methods")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [addOnce()](https://animejs.com/documentation/scope/scope-methods/addonce "addOnce()")

Adds a [constructor](https://animejs.com/documentation/scope/add-constructor-function) to a Scope that is only called once, allowing you to execute code once and add scoped animations that won't be reverted between media query changes.

```js
scope.addOnce(constructor);
```

| Name | Accepts |
| --- | --- |
| constructor | A [constructor](https://animejs.com/documentation/scope/add-constructor-function "constructor") `Function` |

## [Returns](https://animejs.com/documentation/scope/scope-methods/addonce#returns)

The `Scope` itself

`scope.addOnce()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.

```js
// Don't do this
if (scope.matches.small) {
  scope.addOnce(() => { animate(target, params) });
}
// Do this
scope.addOnce() => { animate(target, params) });
```

## addOnce() code example

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

  self.add(() => {
    createTimeline().add('.circle', {
      x: self.matches.isSmall ? [-30, 30] : [-70, 70],
      scale: [.5, 1.1],
      loop: true,
      alternate: true,
    }, stagger(100)).init();
  });

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

* [add()](https://animejs.com/documentation/scope/scope-methods/add "add()")
* [keepTime()](https://animejs.com/documentation/scope/scope-methods/keeptime "keepTime()")
