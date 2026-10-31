---
source: https://animejs.com/documentation/scope/add-constructor-function
title: "Add constructor function | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Add constructor function](https://animejs.com/documentation/scope/add-constructor-function "Add constructor function")

A constructor function is called inside the Scope's context immediately after being passed as a callback of the Scope's [`add()`](https://animejs.com/documentation/scope/scope-methods/add "add()") or [`addOnce()`](https://animejs.com/documentation/scope/scope-methods/addonce "addOnce") method.
The Scope registers and keeps track of all animations, timers, timelines, animatables, draggables, onScrolls, and even other scopes declared inside the constructor function.

```js
// Execute a constructor every time a media query changes
scope.add(constructor);

// Execute a constructor once
scope.addOnce(constructorFunction);
```

## [Constructor function argument](https://animejs.com/documentation/scope/add-constructor-function#constructor-function-argument)

| Name | Type |
| --- | --- |
| self | The current Scope instance |

## [Returns (optional)](https://animejs.com/documentation/scope/add-constructor-function#returns-optional)

A cleanup `Function` called when the Scope is reverted or when a media query changes.

## Add constructor function code example

```js
import { utils, animate, createScope, createDraggable } from 'animejs';

createScope({
  mediaQueries: { isSmall: '(max-width: 200px)' },
  defaults: { ease: 'linear' },
})
.add(self => {

  /* Media queries state are accessible on the matches property */
  const { isSmall } = self.matches;
  /* The $() utility method is also scoped */
  const [ $square ] = utils.$('.square');

  if (self.matches.isSmall) {
    /* Only animate the square when the iframe is small */
    animate($square, {
      rotate: 360,
      loop: true,
    });
  } else {
    /* Only create the draggable when the iframe is large enough */
    $square.classList.add('draggable');
    createDraggable($square, {
      container: document.body,
    });
  }

  return () => {
    /* Removes the class 'draggable' when the scope reverts itself */
    $square.classList.remove('draggable');
  }

});
```

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [Scope](https://animejs.com/documentation/scope "Scope")
* [Register method function](https://animejs.com/documentation/scope/register-method-function "Register method function")
