---
source: https://animejs.com/documentation/draggable/draggable-callbacks/ongrab
title: "onGrab | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onGrab](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab "onGrab")

Executes a function when the element is grabbed.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab#default)

`noop`

## onGrab code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let grabs = 0;

createDraggable('.square', {
  container: '.grid',
  onGrab: () => $value.textContent = ++grabs
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">grabs</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [Draggable callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")
* [onDrag](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag "onDrag")
