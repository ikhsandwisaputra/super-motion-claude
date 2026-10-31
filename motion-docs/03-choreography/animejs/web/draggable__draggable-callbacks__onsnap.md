---
source: https://animejs.com/documentation/draggable/draggable-callbacks/onsnap
title: "onSnap | Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onSnap](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap "onSnap")

Executes a function every time a snap occurs when the element is being dragged.

## [Accepts](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap#accepts)

A `Function` whose first argument is the draggable itself

## [Default](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap#default)

`noop`

## onSnap code example

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let snaps = 0;

createDraggable('.square', {
  container: '.grid',
  snap: 16,
  modifier: utils.snap(16), // also snap the element while draggin
  onSnap: () => $value.textContent = ++snaps
});
```

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">snaps</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [onRelease](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease "onRelease")
* [onSettle](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle "onSettle")
