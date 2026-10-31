---
source: https://animejs.com/documentation/easings/built-in-eases
title: "Built-in eases | Easings | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Easings](https://animejs.com/documentation/easings "Easings")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Built-in eases](https://animejs.com/documentation/easings/built-in-eases "Built-in eases")

Both the js and waapi [`animate()`](https://animejs.com/documentation/animation "`animate()`") functions include a collection of built-in easing functions that can be specified by name directly in the [`ease`](https://animejs.com/documentation/animation/tween-parameters/ease "ease") parameter:

```js
animate(target, { x: 100, ease: 'outQuad' });
animate(target, { x: 100, ease: 'outExpo' });
animate(target, { x: 100, ease: 'outElastic(.8, 1.2)' });
```

All built-in easing functions are also accessible through the imported `eases` object:

```js
import { eases } from 'animejs';

eases.outQuad;
eases.outExpo;
eases.outElastic(.8, 1.2);
```

## [List of built-in easing functions](https://animejs.com/documentation/easings/built-in-eases#list-of-built-in-easing-functions)

| Type | Parameters | Variants (click the links to open in the editor) |
| --- | --- | --- |
| Linear | -- | `'linear'` |
| Power | power = `1.675` | [`'in'`](https://animejs.com/easing-editor/power/in "`'in'`"), [`'out'`](https://animejs.com/easing-editor/power/out "`'out'`"), [`'inOut'`](https://animejs.com/easing-editor/power/inout "`'inOut'`"), [`'outIn'`](https://animejs.com/easing-editor/power/outin "`'outIn'`") |
| Quad | -- | [`'inQuad'`](https://animejs.com/easing-editor/power/in#quad "`'inQuad'`"), [`'outQuad'`](https://animejs.com/easing-editor/power/out#quad "`'outQuad'`"), [`'inOutQuad'`](https://animejs.com/easing-editor/power/inout#quad "`'inOutQuad'`"), [`'outInQuad'`](https://animejs.com/easing-editor/power/outin#quad "`'outInQuad'`") |
| Cubic | -- | [`'inCubic'`](https://animejs.com/easing-editor/power/in#cubic "`'inCubic'`"), [`'outCubic'`](https://animejs.com/easing-editor/power/out#cubic "`'outCubic'`"), [`'inOutCubic'`](https://animejs.com/easing-editor/power/inout#cubic "`'inOutCubic'`"), [`'outInCubic'`](https://animejs.com/easing-editor/power/outin#cubic "`'outInCubic'`") |
| Quart | -- | [`'inQuart'`](https://animejs.com/easing-editor/power/in#quart "`'inQuart'`"), [`'outQuart'`](https://animejs.com/easing-editor/power/out#quart "`'outQuart'`"), [`'inOutQuart'`](https://animejs.com/easing-editor/power/inout#quart "`'inOutQuart'`"), [`'outInQuart'`](https://animejs.com/easing-editor/power/outin#quart "`'outInQuart'`") |
| Quint | -- | [`'inQuint'`](https://animejs.com/easing-editor/power/in#quint "`'inQuint'`"), [`'outQuint'`](https://animejs.com/easing-editor/power/out#quint "`'outQuint'`"), [`'inOutQuint'`](https://animejs.com/easing-editor/power/inout#quint "`'inOutQuint'`"), [`'outInQuint'`](https://animejs.com/easing-editor/power/outin#quint "`'outInQuint'`") |
| Sine | -- | [`'inSine'`](https://animejs.com/easing-editor/sine/insine "`'inSine'`"), [`'outSine'`](https://animejs.com/easing-editor/sine/outsine "`'outSine'`"), [`'inOutSine'`](https://animejs.com/easing-editor/sine/inoutsine "`'inOutSine'`"), [`'outInSine'`](https://animejs.com/easing-editor/sine/outinsine "`'outInSine'`") |
| Exponential | -- | [`'inExpo'`](https://animejs.com/easing-editor/exponential/inexpo "`'inExpo'`"), [`'outExpo'`](https://animejs.com/easing-editor/exponential/outexpo "`'outExpo'`"), [`'inOutExpo'`](https://animejs.com/easing-editor/exponential/inoutexpo "`'inOutExpo'`"), [`'outInExpo'`](https://animejs.com/easing-editor/exponential/outinexpo "`'outInExpo'`") |
| Circular | -- | [`'inCirc'`](https://animejs.com/easing-editor/circular/incirc "`'inCirc'`"), [`'outCirc'`](https://animejs.com/easing-editor/circular/outcirc "`'outCirc'`"), [`'inOutCirc'`](https://animejs.com/easing-editor/circular/inoutcirc "`'inOutCirc'`"), [`'outInCirc'`](https://animejs.com/easing-editor/circular/outincirc "`'outInCirc'`") |
| Bounce | -- | [`'inBounce'`](https://animejs.com/easing-editor/bounce/inbounce "`'inBounce'`"), [`'outBounce'`](https://animejs.com/easing-editor/bounce/outbounce "`'outBounce'`"), [`'inOutBounce'`](https://animejs.com/easing-editor/bounce/inoutbounce "`'inOutBounce'`"), [`'outInBounce'`](https://animejs.com/easing-editor/bounce/outinbounce "`'outInBounce'`") |
| Back | overshoot = `1.70158` | [`'inBack'`](https://animejs.com/easing-editor/back/inback "`'inBack'`"), [`'outBack'`](https://animejs.com/easing-editor/back/outback "`'outBack'`"), [`'inOutBack'`](https://animejs.com/easing-editor/back/inoutback "`'inOutBack'`"), [`'outInBack'`](https://animejs.com/easing-editor/back/outinback "`'outInBack'`") |
| Elastic | amplitude = `1`,  period = `.3` | [`'inElastic'`](https://animejs.com/easing-editor/elastic/inelastic "`'inElastic'`"), [`'outElastic'`](https://animejs.com/easing-editor/elastic/outelastic "`'outElastic'`"), [`'inOutElastic'`](https://animejs.com/easing-editor/elastic/inoutelastic "`'inOutElastic'`"), [`'outInElastic'`](https://animejs.com/easing-editor/elastic/outinelastic "`'outInElastic'`") |

## Built-in eases code example

```js
import { animate, waapi } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut(3)',
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOutExpo',
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut(3)'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOutExpo'</div>
</div>
```

###### Previous

###### Next

* [Easings](https://animejs.com/documentation/easings "Easings")
* [Cubic Bézier easing](https://animejs.com/documentation/easings/cubic-bezier-easing "Cubic Bézier easing")
