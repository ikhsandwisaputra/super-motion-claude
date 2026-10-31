---
source: https://animejs.com/documentation/layout/layout-settings/properties
title: "properties | Settings | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Settings](https://animejs.com/documentation/layout/layout-settings "Settings")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [properties](https://animejs.com/documentation/layout/layout-settings/properties "properties")

Extends the list of CSS properties automatically measured and animated during layout transitions.
Position and dimensions are always handled internally. Use this to add custom properties like CSS variables or properties not included in the defaults.

## [Accepts](https://animejs.com/documentation/layout/layout-settings/properties#accepts)

* `Array` of CSS property name `String`s (including CSS custom properties like `'--my-var'`)

## [Default](https://animejs.com/documentation/layout/layout-settings/properties#default)

```js
[
  'opacity',
  'fontSize',
  'color',
  'backgroundColor',
  'borderRadius',
  'border',
  'filter',
  'clipPath'
]
```

## properties code example

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 800,
  properties: ['boxShadow']
});

function animateLayout() {
  layout.update(({ root }) => root.classList.toggle('row'));
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container grid-layout row">
    <div class="item col">animate</div>
    <div class="item col">box-shadow</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate</button>
  </fieldset>
</div>
```

```css
#layout-layout-settings-properties .grid-layout .item {
  color: var(--hex-current-1);
  background-color: var(--hex-current-4);
  box-shadow: inset 0px 0px 6px var(--hex-current-1);
}

#layout-layout-settings-properties .grid-layout.row .item {
  box-shadow: inset 0px 0px 20px var(--hex-current-1);
}
```

###### Previous

###### Next

* [ease](https://animejs.com/documentation/layout/layout-settings/ease "ease")
* [States parameters](https://animejs.com/documentation/layout/states-parameters "States parameters")
