---
source: https://animejs.com/documentation/draggable/draggable-settings/cursor
title: "cursor | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [cursor](https://animejs.com/documentation/draggable/draggable-settings/cursor "cursor")

Specifies custom CSS cursor style properties for the hovered and grabbed states on devices that match the media query `'(pointer:fine)'`.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/cursor#accepts)

* `Boolean` (`false` disable custom styling)
* `{ onHover: 'grab', onGrab: 'grabbing' }`
* A `Function` that returns an of the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/cursor#default)

`{ onHover: 'grab', onGrab: 'grabbing' }`

## cursor code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  cursor: false
});

createDraggable('.circle', {
  cursor: {
    onHover: 'move',
    onGrab: 'wait'
  }
});
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

###### Previous

###### Next

* [scrollSpeed](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed "scrollSpeed")
* [Draggable callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")
