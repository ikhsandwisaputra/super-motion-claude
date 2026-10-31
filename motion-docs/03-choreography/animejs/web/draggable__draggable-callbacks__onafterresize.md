---
source: https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize
title: "onAfterResize | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onAfterResize](https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize "onAfterResize")

Executes a function after either the container or the dragged target sizes change and the draggable values have been updated.
This can be used to update the position of the dragged element if the container size has changed.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize#default)

`noop`

## onAfterResize code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

const draggable = createDraggable('.square', {
  container: '.grid',
  onAfterResize: self => {
    $value.textContent = ++resizes;
    self.animateInView(1000, 30);
  }
});
```

```html
<div class="iframe-content resizable">
  <div class="large padded grid square-grid">
    <pre class="large log row">
      <span class="label">resizes</span>
      <span class="value">0</span>
    </pre>
    <div class="square draggable"></div>
  </div>
</div>
```

###### Previous

###### Next

* [onResize](https://animejs.com/documentation/draggable/draggable-callbacks/onresize "onResize")
* [Draggable methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")
