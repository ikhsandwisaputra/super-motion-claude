---
source: https://animejs.com/documentation/engine/engine-defaults
title: "Engine defaults | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Engine defaults](https://animejs.com/documentation/engine/engine-defaults "Engine defaults")

Defines the global defaults properties used by all [Timer](https://animejs.com/documentation/timer "Timer"), [Animation](https://animejs.com/documentation/animation "Animation") and [Timeline](https://animejs.com/documentation/timeline "Timeline") instances.

All default properties are available on the `defaults` `Object` of `engine`.

```
import { engine } from 'animejs';

engine.engine.defaults.duration = 500;
```

| Name | Accepts |
| --- | --- |
| playbackEase | Easing name `String` | Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` | `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` | `Function` |
| delay | `Number` | `Function` |
| composition | Composition types `String` | `Function` |
| ease | Easing name `String` | Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |
| onPause | Callback `Function` |

###### Previous

###### Next

* [Engine properties](https://animejs.com/documentation/engine/engine-properties "Engine properties")
* [Adapters](https://animejs.com/documentation/adapters "Adapters")
