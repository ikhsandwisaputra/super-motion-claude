---
source: https://animejs.com/documentation/draggable/draggable-axes-parameters
title: "Draggable axes parameters | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Draggable axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters")

Axes parameters are specified globally to all axes on the parameters object, or specifically to an axis by passing it an object.

```js
createDraggable('.square', {
┌───────────────────────────────┐
│ x: { snap: 100 },             │
│ y: { snap: 50 },              ├─ Axes Parameters
│ modifier: utils.wrap(-200, 0),│
└───────────────────────────────┘
  containerPadding: 10,
  releaseStiffness: 40,
  releaseEase: 'out(3)',
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

###### In this section

* [x](https://animejs.com/documentation/draggable/draggable-axes-parameters/x "x")
* [y](https://animejs.com/documentation/draggable/draggable-axes-parameters/y "y")
* [snap](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap "snap")
* [modifier](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier "modifier")
* [mapTo](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto "mapTo")

###### Previous

###### Next

* [Draggable](https://animejs.com/documentation/draggable "Draggable")
* [x](https://animejs.com/documentation/draggable/draggable-axes-parameters/x "x")
