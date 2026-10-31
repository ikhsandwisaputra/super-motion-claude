---
source: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi
title: "API differences with native WAAPI | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [API differences with native WAAPI](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")

This chapter covers all major differences between the native Web Animation API `element.animate()` syntax and Anime.js `waapi.animate(element)` syntax.

## [Anime.js](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi#anime-js)

```js
waapi.animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
┌──────────────────┐
│ x: 100,          │
│ y: 50,           ├─ Keyframes Values
│ opacity: .5,     │
└──────────────────┘
┌──────────────────┐
│ loop: 3,         │
│ alternate: true, ├─ Playback Settings
│ ease: 'out',     │
└──────────────────┘
});
```

## [WAAPI](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi#waapi)

```js
const $square = document.querySelector('.square');

┌────────────┐
│ $square    ├─ Targets
└────────────┘
.animate({
┌──────────────────────────┐
│ translate: '100px 50px', ├─ Keyframes Values
│ opacity: .5,             │
└──────────────────────────┘
}, {
┌──────────────────────────┐
│ iterations: 4,           │
│ direction: 'alternate',  ├─ Playback Settings
│ easing: 'ease-out',      │
└──────────────────────────┘
});
```

###### In this section

* [iterations](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations "iterations")
* [direction](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction "direction")
* [easing](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing "easing")
* [finished](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished "finished")

###### Previous

###### Next

* [Spring and custom easings](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings "Spring and custom easings")
* [iterations](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations "iterations")
