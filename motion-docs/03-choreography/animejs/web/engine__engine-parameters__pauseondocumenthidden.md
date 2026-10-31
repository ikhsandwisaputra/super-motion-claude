---
source: https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden
title: "pauseOnDocumentHidden | Engine parameters | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Parameters](https://animejs.com/documentation/engine/engine-parameters "Engine parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [pauseOnDocumentHidden](https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden "pauseOnDocumentHidden")

Controls whether the engine pauses animations when the browser tab is hidden.
When `true`, animations pause automatically when the tab loses focus. When `false`, animations will adjust their `currentTime` to catch up how long they have been idle in the background, making it looks like they never paused.

```js
engine.pauseOnDocumentHidden = true;
```

## [Accepts](https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden#default)

`true`

## pauseOnDocumentHidden code example

```js
import { engine, utils, createTimer } from 'animejs';

const [ $globalTime ] = utils.$('.global-time');
const [ $engineTime ] = utils.$('.engine-time');
const [ $toggle ] = utils.$('.toggle');

const startTime = Date.now();

const globalTimer = setInterval(() => {
  $globalTime.innerHTML = Date.now() - startTime;
}, 16);

const engineTimer = createTimer({
  onUpdate: self => $engineTime.innerHTML = self.currentTime
});

const toggleSetting = () => {
  const isPauseWhenHidden = engine.pauseOnDocumentHidden;
  if (isPauseWhenHidden) {
    engine.pauseOnDocumentHidden = false;
    $toggle.innerHTML = '○ Disabled (Switch tab to see the effect)';
  } else {
    engine.pauseOnDocumentHidden = true;
    $toggle.innerHTML = '● Enabled (Switch tab to see the effect)';
  }
}

// Switch tab to see the effect

$toggle.addEventListener('click', toggleSetting);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">global time</span>
      <span class="global-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">engine time</span>
      <span class="engine-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle">● Enabled (Switch tab to see the effect)</button>
  </fieldset>
</div>
```

```css
#engine-engine-parameters-pauseondocumenthidden .button { max-width: 100% }
```

###### Previous

###### Next

* [precision](https://animejs.com/documentation/engine/engine-parameters/precision "precision")
* [Engine methods](https://animejs.com/documentation/engine/engine-methods "Engine methods")
