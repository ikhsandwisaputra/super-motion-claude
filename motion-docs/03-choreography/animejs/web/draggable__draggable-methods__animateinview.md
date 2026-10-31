---
source: https://animejs.com/documentation/draggable/draggable-methods/animateinview
title: "animateInView() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [animateInView()](https://animejs.com/documentation/draggable/draggable-methods/animateinview "animateInView()")

Animate the draggable inside the viewport if positioned outside of the container.

## [Parameters](https://animejs.com/documentation/draggable/draggable-methods/animateinview#parameters)

| Name | Type | Description |
| --- | --- | --- |
| duration(opt) | `Number` | The duration of the animation (default `350`) |
| gap(opt) | `Boolean` | How much extra distance from the edges of the container the draggable should be animated to |
| ease(opt) | [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease) | The easing function applied to the animation (default `InOutQuad` |

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/animateinview#returns)

The draggable itself

## animateInView() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $animateInView ] = utils.$('.animate-button');

const draggable = createDraggable('.square', {
  container: '.grid',
});

const animateInView = () => {
  draggable.animateInView(400, 16);
}

// Set the draggable position outside the container
draggable.x = -24;
draggable.y = 72;

$animateInView.addEventListener('click', animateInView);
```

```html
<div class="medium padded show-bounds grid square-grid animate-in-view">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button animate-button">Animate in view</button>
  </fieldset>
</div>
```

```css
.show-bounds.grid.square-grid.animate-in-view::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(1rem - 1px);
  bottom: calc(1rem - 1px);
  left: calc(1rem);
  border: 1px dashed currentColor;
  box-shadow: none;
}
```

###### Previous

###### Next

* [setY()](https://animejs.com/documentation/draggable/draggable-methods/sety "setY()")
* [scrollInView()](https://animejs.com/documentation/draggable/draggable-methods/scrollinview "scrollInView()")
