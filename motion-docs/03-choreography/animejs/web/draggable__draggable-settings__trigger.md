---
source: https://animejs.com/documentation/draggable/draggable-settings/trigger
title: "trigger | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [trigger](https://animejs.com/documentation/draggable/draggable-settings/trigger "trigger")

Specifies a different element than the defined target to trigger the drag animation.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/trigger#accepts)

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements "DOM Element")

## trigger code example

```js
import { createDraggable } from 'animejs';

createDraggable('.row', {
  trigger: '.circle',
});
```

```html
<div class="large centered row">
  <div class="square"></div>
  <div class="circle draggable"></div>
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Draggable settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")
* [container](https://animejs.com/documentation/draggable/draggable-settings/container "container")
