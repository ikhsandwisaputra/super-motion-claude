---
source: https://animejs.com/documentation/layout/usage
title: "Usage | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Usage](https://animejs.com/documentation/layout/usage "Usage")

## [With the `layout.record()` & `layout.animate()` combo](https://animejs.com/documentation/layout/usage#with-the-layout-record-amp-layout-animate-combo)

Create and [`record()`](https://animejs.com/documentation/layout/layout-methods/record) the initial state of a layout:

```js
const layout = createLayout(rootEl);

layout.record();
```

Change the layout state (update CSS, remove or add elements, etc.):

```js
rootEl.classList.toggle('row');
```

[`animate()`](https://animejs.com/documentation/layout/layout-methods/animate) from the old state to the new one automatically:

```js
layout.animate();
```

## [With `layout.update()`](https://animejs.com/documentation/layout/usage#with-layout-update)

Or even simpler, by updating the DOM state inside the [`update()`](https://animejs.com/documentation/layout/layout-methods/update) callback in one single call:

```js
const layout = createLayout(rootEl);

layout.update(() => rootEl.classList.toggle('row'));
```

###### In this section

* [Specifying a root](https://animejs.com/documentation/layout/usage/specifying-a-root "Specifying a root")
* [CSS display animation](https://animejs.com/documentation/layout/usage/css-display-property-animation "CSS display property animation")
* [Staggered layout](https://animejs.com/documentation/layout/usage/staggered-layout-animation "Staggered layout animation")
* [DOM order animation](https://animejs.com/documentation/layout/usage/dom-order-change-animation "DOM order change animation")
* [Enter layout animation](https://animejs.com/documentation/layout/usage/enter-layout-animation "Enter layout animation")
* [Exit layout animation](https://animejs.com/documentation/layout/usage/exit-layout-animation "Exit layout animation")
* [Swap parent animation](https://animejs.com/documentation/layout/usage/swap-parent-animation "Swap parent animation")
* [Modal dialog animation](https://animejs.com/documentation/layout/usage/animate-modal-dialog "Modal dialog animation")

###### Previous

###### Next

* [Layout](https://animejs.com/documentation/layout "Layout")
* [Specifying a root](https://animejs.com/documentation/layout/usage/specifying-a-root "Specifying a root")
