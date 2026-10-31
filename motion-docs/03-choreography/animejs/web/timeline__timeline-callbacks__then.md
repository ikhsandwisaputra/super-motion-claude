---
source: https://animejs.com/documentation/timeline/timeline-callbacks/then
title: "then() | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [then()](https://animejs.com/documentation/timeline/timeline-callbacks/then "then()")

Returns a `Promise` that resolves and execute a callback when the timeline completes.

The `then()` method can be directly inlined like this:

```js
createTimeline(parameters).add(targets, parameters).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForTimelineToComplete() {
  return createTimeline()
  .add('.square', { x: 100 })
  .add('.square', { y: 100 });
}

const asyncTimeline = await waitForTimelineToComplete();
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-callbacks/then#parameters)

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the timeline itself |

## [Returns](https://animejs.com/documentation/timeline/timeline-callbacks/then#returns)

`Promise`

## then() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });

tl.then(() => $value.textContent = 'fulfilled');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onPause](https://animejs.com/documentation/timeline/timeline-callbacks/onpause "onPause")
* [Timeline methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")
