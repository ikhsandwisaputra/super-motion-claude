---
source: https://animejs.com/documentation/utilities/clean-inline-styles
title: "cleanInlineStyles() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [cleanInlineStyles()](https://animejs.com/documentation/utilities/clean-inline-styles "cleanInlineStyles()")

Removes all CSS inline styles added by the specified instance.
Can be used as a Animation or Timeline `onComplete()` callback.

```js
const cleanedInstance = utils.cleanInlineStyles(instance);
```

## [Parameters](https://animejs.com/documentation/utilities/clean-inline-styles#parameters)

| Name | Accepts |
| --- | --- |
| instance | [Animation](https://animejs.com/documentation/animation "Animation") | [Timeline](https://animejs.com/documentation/timeline "Timeline") |

## [Returns](https://animejs.com/documentation/utilities/clean-inline-styles#returns)

The passed [Animation](https://animejs.com/documentation/animation "Animation") or [Timeline](https://animejs.com/documentation/timeline "Timeline") instance.

## cleanInlineStyles() code example

```js
import { animate, utils } from 'animejs';

utils.set('.square', { scale: .75 });

animate('.keep-styles', {
  x: '17rem',
  borderRadius: '50%',
});

animate('.clean-styles', {
  x: '17rem',
  borderRadius: '50%',
  // This removes the translateX and borderRadius inline styles
  // But keeps the scale previously added outside of this animation
  onComplete: utils.cleanInlineStyles
});
```

```html
<div class="medium row">
  <div class="square keep-styles"></div>
  <div class="padded label">Keep styles (default)</div>
</div>
<div class="medium row">
  <div class="square clean-styles"></div>
  <div class="padded label">Clean translateX and borderRadius</div>
</div>
```

###### Previous

###### Next

* [set()](https://animejs.com/documentation/utilities/set "set()")
* [remove()](https://animejs.com/documentation/utilities/remove "remove()")
