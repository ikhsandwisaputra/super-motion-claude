---
source: https://animejs.com/documentation/engine/engine-properties
title: "Engine properties | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Engine properties](https://animejs.com/documentation/engine/engine-properties "Engine properties")

```js
import { engine } from 'animejs';
       ┌───────────────────────┐
engine.│deltaTime              │
engine.│useDefaultMainLoop     ├─ Properties
engine.│pauseOnDocumentHidden  │
       └───────────────────────┘
```

| Name | Description |
| --- | --- |
| timeUnit | Gets and sets the unit of time to use for time-related values like `duration` and `delay` (`'ms' | 's'`) |
| currentTime | Gets the current time of the engine (`Number`) |
| deltaTime | Gets the time elapsed since the last frame (`Number`) |
| precision | Gets and sets how many decimal places to round string values to during an animation (`Number`) |
| speed | Gets or sets the global playback rate for all animations (`Number`) |
| fps | Gets or sets the global frame rate for all animations (`Number`) |
| useDefaultMainLoop | Gets or sets whether the engine uses its default main loop (`Boolean`) |
| pauseOnDocumentHidden | Gets or sets whether the engine pauses when the tab is hidden (`Boolean`) |

###### Previous

###### Next

* [resume()](https://animejs.com/documentation/engine/engine-methods/resume "resume()")
* [Engine defaults](https://animejs.com/documentation/engine/engine-defaults "Engine defaults")
