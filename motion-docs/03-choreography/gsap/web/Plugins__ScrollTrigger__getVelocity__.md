---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()
title: ".getVelocity"
fetched: 2026-10-28
---

# .getVelocity

### .getVelocity( ) : Number

Gets the scroll velocity in pixels-per-second

### Returns : Number[​](#returns--number "Direct link to Returns : Number")

Velocity in pixels-per-second

### Details[​](#details "Direct link to Details")

Gets the scroll velocity in pixels-per-second

## Example[​](#example "Direct link to Example")

```
ScrollTrigger.create({
  trigger: ".trigger",
  start: "top center",
  end: "+=500",
  onUpdate: (self) => console.log("velocity:", self.getVelocity()),
});
```
