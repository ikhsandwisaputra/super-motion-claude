---
source: https://animejs.com/documentation/draggable/draggable-methods/enable
title: "enable() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [enable()](https://animejs.com/documentation/draggable/draggable-methods/enable "enable()")

Reactivates a previously disabled draggable, making it interactive again.

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/enable#returns)

The draggable itself

## enable() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $enableButton ] = utils.$('.enable');

const draggable = createDraggable('.square');

draggable.disable();

const enableDraggable = () => draggable.enable();

$enableButton.addEventListener('click', enableDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button enable">Enable</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [disable()](https://animejs.com/documentation/draggable/draggable-methods/disable "disable()")
* [setX()](https://animejs.com/documentation/draggable/draggable-methods/setx "setX()")
