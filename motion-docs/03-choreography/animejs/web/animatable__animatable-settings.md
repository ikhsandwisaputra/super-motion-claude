---
source: https://animejs.com/documentation/animatable/animatable-settings
title: "Animatable settings | Animatable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animatable](https://animejs.com/documentation/animatable "Animatable")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Animatable settings](https://animejs.com/documentation/animatable/animatable-settings "Animatable settings")

Animatables properties settings are specified globally to all properties on the parameters object, or specifically to a property by passing an object.

```js
createAnimatable(targets, {
  x: {
┌──────────────────┐
│   unit: 'rem',   │
│   duration: 400, ├─ Specific Property Settings
│   ease: 'out(4)' │
└──────────────────┘
  },
  y: 200,
  rotate: 1000,
┌──────────────────┐
│ ease: 'out(2)',  ├─ Global Properties Settings
└──────────────────┘
});
```

###### In this section

* [unit](https://animejs.com/documentation/animatable/animatable-settings/unit "unit")
* [duration](https://animejs.com/documentation/animatable/animatable-settings/duration "duration")
* [ease](https://animejs.com/documentation/animatable/animatable-settings/ease "ease")
* [modifier](https://animejs.com/documentation/animatable/animatable-settings/modifier "modifier")

###### Previous

###### Next

* [Animatable](https://animejs.com/documentation/animatable "Animatable")
* [unit](https://animejs.com/documentation/animatable/animatable-settings/unit "unit")
