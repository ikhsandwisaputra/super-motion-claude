---
source: https://animejs.com/documentation/draggable/draggable-callbacks
title: "Draggable callbacks | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Draggable callbacks](https://animejs.com/documentation/draggable/draggable-callbacks "Draggable callbacks")

Execute functions at specific points while dragging an element.
Draggable callback functions are specified directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
  containerPadding: 10,
  containerStiffness: 40,
  containerEase: 'out(3)',
┌────────────────────────┐
│ onGrab: () => {},      │
│ onDrag: () => {},      ├─ Callbaks
│ onRelease: () => {},   │
└────────────────────────┘
});
```

###### In this section

* [onGrab](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab "onGrab")
* [onDrag](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag "onDrag")
* [onUpdate](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate "onUpdate")
* [onRelease](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease "onRelease")
* [onSnap](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap "onSnap")
* [onSettle](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle "onSettle")
* [onResize](https://animejs.com/documentation/draggable/draggable-callbacks/onresize "onResize")
* [onAfterResize](https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize "onAfterResize")

###### Previous

###### Next

* [cursor](https://animejs.com/documentation/draggable/draggable-settings/cursor "cursor")
* [onGrab](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab "onGrab")
