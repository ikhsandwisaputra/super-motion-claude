---
source: https://animejs.com/documentation/timer/timer-callbacks/then
title: "then() | Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [then()](https://animejs.com/documentation/timer/timer-callbacks/then "then()")

Returns a `Promise` that resolves and execute a callback when the timer completes.

The `then()` method can be directly inlined like this:

```js
createTimer({duration: 500}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForTimerToComplete() {
  return createTimer({ duration: 250 })
}

const asyncTimer = await waitForTimerToComplete();
```

## [Parameters](https://animejs.com/documentation/timer/timer-callbacks/then#parameters)

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the timer itself |

## [Returns](https://animejs.com/documentation/timer/timer-callbacks/then#returns)

`Promise`

## then() code example

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime,
})
.then(() => $status.innerHTML = 'fulfilled');
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">promise status</span>
      <span class="status value">pending</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

###### Previous

###### Next

* [onPause](https://animejs.com/documentation/timer/timer-callbacks/onpause "onPause")
* [Timer methods](https://animejs.com/documentation/timer/timer-methods "Timer methods")
