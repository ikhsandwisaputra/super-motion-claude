---
source: https://gsap.com/docs/v3/Plugins/ScrollSmoother/getVelocity()
title: ".getVelocity"
fetched: 2026-10-28
---

# .getVelocity

### .getVelocity( ) : Number

Returns the current velocity of the smoothed scroll in pixels-per-second

### Details[​](#details "Direct link to Details")

Returns the current velocity of the smoothed scroll in pixels-per-second. For example:

```
ScrollSmoother.create({
  onUpdate: (self) => console.log("velocity:", self.getVelocity()),
});
```

Another way to write it would be:

```
let smoother = ScrollSmoother.create({...});

button.addEventListener("click", () => {
  console.log("velocity:", smoother.getVelocity());
});
```
