---
source: https://gsap.com/docs/v3/GSAP/gsap.registerEase()
title: "gsap.registerEase()"
fetched: 2026-10-28
---

# gsap.registerEase()

Use `gsap.registerEase()` to register your own easing function with GSAP, giving it a name that can be referenced in any animations. These eases generally return values between 0 and 1 but can go outside of that range (like GSAP's elastic ease).

For example:

```
gsap.registerEase("myEaseName", function (progress) {
  return progress; //linear
});

//now we can apply the ease in any tween like:
gsap.to(".class", { x: 100, ease: "myEaseName" });
```
