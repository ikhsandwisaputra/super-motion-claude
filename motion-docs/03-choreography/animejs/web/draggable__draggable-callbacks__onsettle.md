---
source: https://animejs.com/documentation/draggable/draggable-callbacks/onsettle
title: "onSettle | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onSettle](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle "onSettle")

Executes a function when the dragged target has completely stopped moving when released after a grab.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle#default)

`noop`

## onSettle code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let stops = 0;

createDraggable('.square', {
  container: '.grid',
  onSettle: () => $value.textContent = ++stops
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">stops</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [onSnap](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap "onSnap")
* [onResize](https://animejs.com/documentation/draggable/draggable-callbacks/onresize "onResize")
