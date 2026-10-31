---
source: https://animejs.com/documentation/draggable/draggable-methods/revert
title: "revert() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/draggable/draggable-methods/revert "revert()")

Restores the draggable element to its initial state and deactivates it.

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/revert#returns)

The draggable itself

## revert() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');

const draggable = createDraggable('.square');

function revertDraggable() {
  draggable.revert();
  $revertButton.disabled = true;
}

$revertButton.addEventListener('click', revertDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reset()](https://animejs.com/documentation/draggable/draggable-methods/reset "reset()")
* [refresh()](https://animejs.com/documentation/draggable/draggable-methods/refresh "refresh()")
