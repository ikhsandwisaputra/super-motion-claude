---
source: https://animejs.com/documentation/scope/scope-parameters/root
title: "root | Scope parameters | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Parameters](https://animejs.com/documentation/scope/scope-parameters "Scope parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [root](https://animejs.com/documentation/scope/scope-parameters/root "root")

Defines a root element limiting all DOM queries within that Scope to descendants of the specified `HTMLElement`. This is particularly useful for creating self-contained animation environments in component-based architectures like React applications.

## [Accepts](https://animejs.com/documentation/scope/scope-parameters/root#accepts)

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements "DOM Element")

## root code example

```js
import { createScope, animate } from 'animejs';

createScope({ root: '.row:nth-child(2)' })
.add(() => {
  animate('.square', {
    x: '17rem',
    loop: true,
    alternate: true
  });
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">inside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
```

###### Previous

###### Next

* [Scope parameters](https://animejs.com/documentation/scope/scope-parameters "Scope parameters")
* [defaults](https://animejs.com/documentation/scope/scope-parameters/defaults "defaults")
