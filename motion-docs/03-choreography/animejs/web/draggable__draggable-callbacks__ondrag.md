---
source: https://animejs.com/documentation/draggable/draggable-callbacks/ondrag
title: "onDrag | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onDrag](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag "onDrag")

Executes a function when the element is being dragged.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag#default)

`noop`

## onDrag code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let drags = 0;

createDraggable('.square', {
  container: '.grid',
  onDrag: () => $value.textContent = ++drags
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">drags</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [onGrab](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab "onGrab")
* [onUpdate](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate "onUpdate")
