---
source: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api
title: "Improvements to the Web Animation API | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Improvements to the Web Animation API](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")

The `waapi.animate()` method adds lots of quality of life improvements and greatly improves the overall experience of using WAAPI.

On top of all the improvements to the API listed in this chapter, it is also possible to link WAAPI animations to Anime.js built-in [ScrollObserver](https://animejs.com/documentation/events/onscroll "ScrollObserver")

```js
waapi.animate('.square', {
  translate: '100px',
  autoplay: onScroll()
});
```

And use a [Scope](https://animejs.com/documentation/scope "Scope") for easy media queries handling and component cleanup:

```js
createScope({
  mediaQueries: { reduceMotion: '(prefers-reduced-motion)' }
})
.add(({ matches }) => {
  const { reduceMotion } = matches;
  waapi.animate('.square', {
    transform: reduceMotion ? ['100px', '100px'] : '100px',
    opacity: [0, 1],
  });
});
```

###### In this section

* [Sensible defaults](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults "Sensible defaults")
* [Multi-targets animation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation "Multi-targets animation")
* [Default units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units "Default units")
* [Function based values](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values "Function based values")
* [Individual transforms](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms "Individual CSS transforms")
* [Individual property params](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters "Individual property parameters")
* [Spring and custom easings](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings "Spring and custom easings")

###### Previous

###### Next

* [Hardware-accelerated animations](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations "Hardware-accelerated animations")
* [Sensible defaults](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults "Sensible defaults")
