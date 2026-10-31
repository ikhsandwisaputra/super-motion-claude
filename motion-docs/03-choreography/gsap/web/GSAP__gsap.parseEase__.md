---
source: https://gsap.com/docs/v3/GSAP/gsap.parseEase()
title: "gsap.parseEase()"
fetched: 2026-10-28
---

# gsap.parseEase()

### Returns : easing function[​](#returns--easing-function "Direct link to Returns : easing function")

Feed in an easing string to `gsap.parseEase()` and it will return the corresponding parsed easing function. For example:

```
//simple
let ease = gsap.parseEase("power1");

//or a configurable one:
let step = gsap.parseEase("steps(5)");
let elastic = gsap.parseEase("elastic(1.2, 0.5)");
```

If CustomEase is loaded/registered, you can even pass in Cubic Bezier values and it will return the corresponding custom ease function, like:

```
// if CustomEase is loaded, GSAP can parse cubic bezier values too:
let ease = gsap.parseEase(".17,.67,.83,.67");
```

For a more complex use case, see the [blended eases](/docs/HelperFunctions/helpers/blendEases) helper function.
