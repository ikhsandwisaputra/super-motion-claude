---
source: https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold
title: "scrollThreshold | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [scrollThreshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold "scrollThreshold")

Specifies the number of pixels the draggable element must cross beyond the area bounds before the container starts scrolling automatically.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold#accepts)

* A `Number`
* A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold#default)

`20`

## scrollThreshold code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollThreshold: 12,
});
```

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
```

```css
#draggable-draggable-settings-scrollthreshold .draggable {
  background-color: rgba(var(--rgb-current), .25);
  border: solid 1px currentColor;
}

#draggable-draggable-settings-scrollthreshold .draggable::after {
  content: "";
  display: block;
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background-color: currentColor;
  border-radius: 2px;
}
```

###### Previous

###### Next

* [dragThreshold](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold "dragThreshold")
* [scrollSpeed](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed "scrollSpeed")
