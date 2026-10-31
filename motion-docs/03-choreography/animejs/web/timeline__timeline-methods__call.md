---
source: https://animejs.com/documentation/timeline/timeline-methods/call
title: "call() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [call()](https://animejs.com/documentation/timeline/timeline-methods/call "call()")

Calls the passed function callback at the specified time position.

```js
timeline.call(callback, position);
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/call#parameters)

| Name | Accepts |
| --- | --- |
| callback | `Function` |
| position (opt) | [Time position](https://animejs.com/documentation/timeline/time-position "Time position") |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/call#returns)

The timeline itself

Can be chained with other timeline methods.

## call() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [remove()](https://animejs.com/documentation/timeline/timeline-methods/remove "remove()")
* [init()](https://animejs.com/documentation/timeline/timeline-methods/init "init()")
