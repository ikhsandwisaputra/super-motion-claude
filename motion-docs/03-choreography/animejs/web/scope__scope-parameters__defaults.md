---
source: https://animejs.com/documentation/scope/scope-parameters/defaults
title: "defaults | Scope parameters | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Parameters](https://animejs.com/documentation/scope/scope-parameters "Scope parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [defaults](https://animejs.com/documentation/scope/scope-parameters/defaults "defaults")

Defines the Scope defaults properties which are then used for all [Timer](https://animejs.com/documentation/timer "Timer"), [Animation](https://animejs.com/documentation/animation "Animation") and [Timeline](https://animejs.com/documentation/timeline "Timeline") created within that scope.

## [Accepts](https://animejs.com/documentation/scope/scope-parameters/defaults#accepts)

An `Object` with the following optional properties:

| Name | Accepts |
| --- | --- |
| playbackEase | Easing name `String` | Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` | `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` | `Function` |
| delay | `Number` | `Function` |
| composition | Composition types `String` | `Function` |
| ease | Easing name `String` | Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |

## defaults code example

```js
import { createScope, animate } from 'animejs';

const rows = utils.$('.row');

rows.forEach(($row, i) => {
  createScope({
    root: $row,
    defaults: { ease: `out(${1 + i})` }
  })
  .add(() => {
    animate('.square', {
      x: '17rem',
      loop: true,
      alternate: true
    });
  });
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 1</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 2</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 3</div>
</div>
```

###### Previous

###### Next

* [root](https://animejs.com/documentation/scope/scope-parameters/root "root")
* [mediaQueries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries "mediaQueries")
