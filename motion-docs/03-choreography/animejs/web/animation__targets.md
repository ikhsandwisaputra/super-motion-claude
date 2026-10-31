---
source: https://animejs.com/documentation/animation/targets
title: "Targets | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Targets](https://animejs.com/documentation/animation/targets "Targets")

Specify the elements to which property value changes are applied.
Animation targets are defined in the first argument of the `animate()` function.

```js
animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

###### In this section

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [DOM Elements](https://animejs.com/documentation/animation/targets/dom-elements "DOM Elements")
* [JavaScript Objects](https://animejs.com/documentation/animation/targets/javascript-objects "JavaScript Objects")
* [Array of targets](https://animejs.com/documentation/animation/targets/array-of-targets "Array of targets")

###### Previous

###### Next

* [Animation](https://animejs.com/documentation/animation "Animation")
* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
