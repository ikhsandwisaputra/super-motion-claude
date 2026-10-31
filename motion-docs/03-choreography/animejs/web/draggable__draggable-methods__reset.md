---
source: https://animejs.com/documentation/draggable/draggable-methods/reset
title: "reset() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reset()](https://animejs.com/documentation/draggable/draggable-methods/reset "reset()")

Restores the draggable element to its initial position.

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/reset#returns)

The draggable itself

## reset() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $resetButton ] = utils.$('.reset');

const draggable = createDraggable('.square');

const resetDraggable = () => draggable.reset();

$resetButton.addEventListener('click', resetDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button reset">Reset</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [stop()](https://animejs.com/documentation/draggable/draggable-methods/stop "stop()")
* [revert()](https://animejs.com/documentation/draggable/draggable-methods/revert "revert()")
