---
source: https://animejs.com/documentation/draggable/draggable-callbacks/onupdate
title: "onUpdate | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onUpdate](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate "onUpdate")

Executes a function every time the position of the dragged element changes.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate#default)

`noop`

## onUpdate code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

createDraggable('.square', {
  container: '.grid',
  onUpdate: () => $value.textContent = ++updates
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [onDrag](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag "onDrag")
* [onRelease](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease "onRelease")
