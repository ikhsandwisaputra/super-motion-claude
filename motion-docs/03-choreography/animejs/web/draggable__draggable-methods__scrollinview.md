---
source: https://animejs.com/documentation/draggable/draggable-methods/scrollinview
title: "scrollInView() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [scrollInView()](https://animejs.com/documentation/draggable/draggable-methods/scrollinview "scrollInView()")

Animate the scroll position of the container if the draggable position is outside of the [scroll threshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold).

## [Parameters](https://animejs.com/documentation/draggable/draggable-methods/scrollinview#parameters)

| Name | Type | Description |
| --- | --- | --- |
| duration(opt) | `Number` | The duration of the animation (default `350`) |
| gap(opt) | `Boolean` | How much extra distance from the edges of the container the draggable should be animated to |
| ease(opt) | [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease) | The easing function applied to the animation (default `InOutQuad` |

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/scrollinview#returns)

The draggable itself

## scrollInView() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $scrollInView ] = utils.$('.button');

const draggable = createDraggable('.square', {
  container: '.scroll-container',
});

const scrollInView = () => {
  draggable.scrollInView(400, 100);
}

// Set the draggable position outside the scroll viewport
draggable.x = 120;
draggable.y = 200;

$scrollInView.addEventListener('click', scrollInView);
```

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
<fieldset class="absolute controls">
  <button class="button">Scroll in view</button>
</fieldset>
```

###### Previous

###### Next

* [animateInView()](https://animejs.com/documentation/draggable/draggable-methods/animateinview "animateInView()")
* [stop()](https://animejs.com/documentation/draggable/draggable-methods/stop "stop()")
