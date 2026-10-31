---
source: https://animejs.com/documentation/utilities/remove
title: "remove() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [remove()](https://animejs.com/documentation/utilities/remove "remove()")

Removes one or multiple targets from all active animations, a specific instance or a specific property, cancelling any [Animation](https://animejs.com/documentation/animation) or [Timeline](https://animejs.com/documentation/timeline) referencing these targets if needed.

```js
const removed = utils.remove(targets, instance, propertyName);
```

## [Parameters](https://animejs.com/documentation/utilities/remove#parameters)

| Name | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| instance (opt) | [Animation](https://animejs.com/documentation/animation "Animation") | [Timeline](https://animejs.com/documentation/timeline "Timeline") |
| propertyName (opt) | [Animatable Properties](https://animejs.com/documentation/animation/animatable-properties) name `String` |

## [Returns](https://animejs.com/documentation/utilities/remove#returns)

An `Array` of the removed targeted elements

## remove() code example

```js
import { animate, utils } from 'animejs';

let updates = 0;

const [ $removeFirstButton ] = utils.$('.remove-1');
const [ $removeSecondButton ] = utils.$('.remove-2');
const [ $updates ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  rotate: 360,
  alternate: true,
  loop: true,
  onUpdate: () => {
    $updates.textContent = updates++;
  }
});

$removeFirstButton.onclick = () => {
  utils.remove('.row:nth-child(1) .square');
}

$removeSecondButton.onclick = () => {
  utils.remove('.row:nth-child(2) .square', animation, 'x');
}
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<pre class="large log row">
  <span class="label">updates</span>
  <span class="value">--</span>
</pre>
<div class="medium row">
  <fieldset class="controls">
    <button class="button remove-1">Remove all first</button>
    <button class="button remove-2">Remove x second</button>
  </fieldset>
</div>
```

```css
#utilities-remove .large.log.row {
  margin-top: .75rem;
}
```

###### Previous

###### Next

* [cleanInlineStyles()](https://animejs.com/documentation/utilities/clean-inline-styles "cleanInlineStyles()")
* [sync()](https://animejs.com/documentation/utilities/sync "sync()")
