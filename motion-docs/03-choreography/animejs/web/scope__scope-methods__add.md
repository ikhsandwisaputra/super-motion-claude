---
source: https://animejs.com/documentation/scope/scope-methods/add
title: "add() | Scope methods | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Methods](https://animejs.com/documentation/scope/scope-methods "Scope methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [add()](https://animejs.com/documentation/scope/scope-methods/add "add()")

Adds [constructor](https://animejs.com/documentation/scope/add-constructor-function) or registers [method](https://animejs.com/documentation/scope/register-method-function) functions to a Scope.

## [Parameters for adding a constructor](https://animejs.com/documentation/scope/scope-methods/add#parameters-for-adding-a-constructor)

```js
scope.add(constructor);
```

| Name | Accepts |
| --- | --- |
| constructor | A [constructor](https://animejs.com/documentation/scope/add-constructor-function "constructor") `Function` |

## [Parameters for registering a method](https://animejs.com/documentation/scope/scope-methods/add#parameters-for-registering-a-method)

```js
scope.add(name, method);
```

| Name | Accepts |
| --- | --- |
| name | A `String` used to store and access the method |
| method | A [method](https://animejs.com/documentation/scope/register-method-function "method") `Function` |

## [Returns](https://animejs.com/documentation/scope/scope-methods/add#returns)

The Scope itself

## add() code example

```js
import { createScope, createAnimatable, createDraggable } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {

  const [ $circle ] = utils.$('.circle');

  if (self.matches.isSmall) {
    $circle.classList.add('draggable');
    self.circle = createDraggable($circle, {
      container: document.body,
    });
  } else {
    $circle.classList.remove('draggable');
    self.circle = createAnimatable($circle, {
      x: 500,
      y: 500,
      ease: 'out(3)'
    });
  }

  let win = { w: window.innerWidth, h: window.innerHeight };

  self.add('refreshBounds', () => {
    win.w = window.innerWidth;
    win.h = window.innerHeight;
  });

  self.add('onMouseMove', e => {
    if (self.matches.isSmall) return;
    const { w, h } = win;
    const hw = w / 2;
    const hh = h / 2;
    const x = utils.clamp(e.clientX - hw, -hw, hw);
    const y = utils.clamp(e.clientY - hh, -hh, hh);
    if (self.circle.x) {
      self.circle.x(x);
      self.circle.y(y);
    }
  });

  self.add('onPointerDown', e => {
    const { isSmall } = self.matches;
    animate($circle, {
      scale: [
        { to: isSmall ? 1.25 : .25, duration: isSmall ? 50 : 150 },
        { to: 1, duration: isSmall ? 250 : 500 },
      ]
    });
  });

});

window.addEventListener('resize', scope.methods.refreshBounds);
window.addEventListener('mousemove', scope.methods.onMouseMove);
document.addEventListener('pointerdown', scope.methods.onPointerDown);
```

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="circle"></div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [Scope methods](https://animejs.com/documentation/scope/scope-methods "Scope methods")
* [addOnce()](https://animejs.com/documentation/scope/scope-methods/addonce "addOnce()")
