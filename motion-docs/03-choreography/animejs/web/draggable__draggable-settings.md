---
source: https://animejs.com/documentation/draggable/draggable-settings
title: "Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Draggable settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

Draggable settings are defined directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
┌───────────────────────┐
│ containerPadding: 10, │
│ releaseStiffness: 40, ├─ Settings
│ releaseEase: 'out(3)',│
└───────────────────────┘
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

###### In this section

* [trigger](https://animejs.com/documentation/draggable/draggable-settings/trigger "trigger")
* [container](https://animejs.com/documentation/draggable/draggable-settings/container "container")
* [containerPadding](https://animejs.com/documentation/draggable/draggable-settings/containerpadding "containerPadding")
* [containerFriction](https://animejs.com/documentation/draggable/draggable-settings/containerfriction "containerFriction")
* [releaseContainerFriction](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction "releaseContainerFriction")
* [releaseMass](https://animejs.com/documentation/draggable/draggable-settings/releasemass "releaseMass")
* [releaseStiffness](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness "releaseStiffness")
* [releaseDamping](https://animejs.com/documentation/draggable/draggable-settings/releasedamping "releaseDamping")
* [velocityMultiplier](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier "velocityMultiplier")
* [minVelocity](https://animejs.com/documentation/draggable/draggable-settings/minvelocity "minVelocity")
* [maxVelocity](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity "maxVelocity")
* [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease "releaseEase")
* [dragSpeed](https://animejs.com/documentation/draggable/draggable-settings/dragspeed "dragSpeed")
* [dragThreshold](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold "dragThreshold")
* [scrollThreshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold "scrollThreshold")
* [scrollSpeed](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed "scrollSpeed")
* [cursor](https://animejs.com/documentation/draggable/draggable-settings/cursor "cursor")

###### Previous

###### Next

* [mapTo](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto "mapTo")
* [trigger](https://animejs.com/documentation/draggable/draggable-settings/trigger "trigger")
