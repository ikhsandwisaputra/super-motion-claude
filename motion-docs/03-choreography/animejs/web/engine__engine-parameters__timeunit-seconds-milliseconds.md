---
source: https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds
title: "timeUnit (seconds / milliseconds) | Engine parameters | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Parameters](https://animejs.com/documentation/engine/engine-parameters "Engine parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [timeUnit (seconds / milliseconds)](https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds "timeUnit (seconds / milliseconds)")

Configures the unit of time to use for time-related values like `duration` and `delay`.
The currently defined default duration is automatically adjusted to the newly specified time unit.

```js
engine.timeUnit = 's'; // Change the time unit globally to seconds
console.log(engine.engine.defaults.duration); // -> Returns 1
```

## [Accepts](https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds#accepts)

* `'s'` to use seconds
* `'ms'` to use milliseconds

## [Default](https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds#default)

`'ms'`

## timeUnit (seconds / milliseconds) code example

```js
import { engine, animate, utils } from 'animejs';

const [ $timeS ] = utils.$('.time-s');
const [ $timeMs ] = utils.$('.time-ms');
const [ $ms, $s ] = utils.$('.toggle');

const secondsTimer = createTimer({
  duration: 1,
  loop: true,
  onUpdate: self => $timeS.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const millisecondsTimer = createTimer({
  duration: 1000,
  loop: true,
  onUpdate: self => $timeMs.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const toggleSetting = () => {
  const isUsingSeconds = engine.timeUnit === 's';
  engine.timeUnit = isUsingSeconds ? 'ms' : 's';
  $ms.disabled = isUsingSeconds;
  $s.disabled = !isUsingSeconds;
}

$ms.addEventListener('click', toggleSetting);
$s.addEventListener('click', toggleSetting);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1</span>
      <span class="time-s value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1000</span>
      <span class="time-ms value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle" disabled>milliseconds</button>
    <button class="button toggle">seconds</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Engine parameters](https://animejs.com/documentation/engine/engine-parameters "Engine parameters")
* [speed](https://animejs.com/documentation/engine/engine-parameters/speed "speed")
