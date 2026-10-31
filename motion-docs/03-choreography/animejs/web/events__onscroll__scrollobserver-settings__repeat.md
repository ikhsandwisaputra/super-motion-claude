---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat
title: "repeat | ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [repeat](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat "repeat")

Specifies if the scroll synchronisation should repeat after the linked object completes.
If the repeat property is set to `false`, the scrollContainer instance will be reverted.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat#accepts)

`Boolean`

## [Defaults](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat#defaults)

`true`

## repeat code example

```js
import { createTimer, onScroll, utils } from 'animejs';

const [ $repeat ] = utils.$('.repeat .value');
const [ $noRepeat ] = utils.$('.no-repeat .value');

let repeatUpdates = 0;
let noRepeatUpdates = 0;

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $repeat.innerHTML = repeatUpdates++,
    repeat: true,
    debug: true,
  })
});

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.no-repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $noRepeat.innerHTML = noRepeatUpdates++,
    repeat: false,
    debug: true,
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="repeat large log row">
          <span class="label">repeat upddates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="no-repeat large log row">
          <span class="label">no repeat updates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [axis](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis "axis")
* [ScrollObserver thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")
