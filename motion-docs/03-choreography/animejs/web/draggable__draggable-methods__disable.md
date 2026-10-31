---
source: https://animejs.com/documentation/draggable/draggable-methods/disable
title: "disable() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [disable()](https://animejs.com/documentation/draggable/draggable-methods/disable "disable()")

Deactivates the draggable, rendering it inert.

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/disable#returns)

The draggable itself

## disable() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $disableButton ] = utils.$('.disable');

const draggable = createDraggable('.square');

const disableDraggable = () => draggable.disable();

$disableButton.addEventListener('click', disableDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button disable">Disable</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Draggable methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")
* [enable()](https://animejs.com/documentation/draggable/draggable-methods/enable "enable()")
