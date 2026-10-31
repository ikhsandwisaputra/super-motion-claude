---
source: https://animejs.com/documentation/scope/scope-parameters/mediaqueries
title: "mediaQueries | Scope parameters | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Parameters](https://animejs.com/documentation/scope/scope-parameters "Scope parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [mediaQueries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries "mediaQueries")

Defines the media queries to match for conditionally refreshing the `Scope` when one of their matches state changes.
Media queries matching states are accessible via the scope `matches` property.

## [Accepts](https://animejs.com/documentation/scope/scope-parameters/mediaqueries#accepts)

An `Object` where

* `key` is an arbitrary name `String` for the media query.
* `Value` is the media query definition `String`.

## mediaQueries code example

```js
import { createScope, animate } from 'animejs';

createScope({
  mediaQueries: {
    isSmall: '(max-width: 100px)',
    isMedium: '(min-width: 101px) and (max-width: 200px)',
    isLarge: '(min-width: 201px)',
    reduceMotion: '(prefers-reduced-motion)',
  }
})
.add(self => {

  const { isSmall, isMedium, isLarge, reduceMotion } = self.matches;

  utils.set('.square', { scale: isMedium ? .75 : isLarge ? 1 : .5 });

  animate('.square', {
    x: isSmall ? 0 : ['-35vw', '35vw'],
    y: isSmall ? ['-40vh', '40vh'] : 0,
    rotate: 360,
    loop: true,
    alternate: true,
    duration: reduceMotion ? 0 : isSmall ? 750 : 1250
  });

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

* [defaults](https://animejs.com/documentation/scope/scope-parameters/defaults "defaults")
* [Scope methods](https://animejs.com/documentation/scope/scope-methods "Scope methods")
