---
source: https://animejs.com/documentation/draggable/draggable-callbacks/onrelease
title: "onRelease | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onRelease](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease "onRelease")

Executes a function when the element is released after a grab.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease#default)

`noop`

## onRelease code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let releases = 0;

createDraggable('.square', {
  container: '.grid',
  onRelease: () => $value.textContent = ++releases
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">releases</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [onUpdate](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate "onUpdate")
* [onSnap](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap "onSnap")
