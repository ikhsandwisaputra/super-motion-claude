---
source: https://gsap.com/docs/v3/GSAP/gsap.set()
title: "gsap.set()"
fetched: 2026-10-28
---

# gsap.set()

### Returns : [Tween](/docs/v3/GSAP/Tween.md)[​](#returns--tween "Direct link to returns--tween")

Immediately sets properties of the target(s) accordingly - essentially a zero-duration [to()](/docs/v3/GSAP/gsap.to\(\).md) tween with a more intuitive name. So the following lines produce identical results:

```
gsap.set(".class", { x: 100, y: 50, opacity: 0 });
gsap.to(".class", { duration: 0, x: 100, y: 50, opacity: 0 });
```

And of course you can use an array or selector text to set the properties of multiple targets at the same time, like:

```
gsap.set([obj1, obj2, obj3], { x: 100, y: 50, opacity: 0 });
```

If you find yourself setting the same property of the same object over and over again many times (like in a pointermove event), consider using [gsap.quickSetter()](/docs/v3/GSAP/gsap.quickSetter\(\).md) because it can deliver even better performance.
