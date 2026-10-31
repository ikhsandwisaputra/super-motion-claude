---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/previous()
title: ".previous"
fetched: 2026-10-28
---

# .previous

### .previous( ) : ScrollTrigger instance

Returns the previous ScrollTrigger in the refresh order.

### Returns : ScrollTrigger instance[​](#returns--scrolltrigger-instance "Direct link to Returns : ScrollTrigger instance")

The previous ScrollTrigger in the refresh order

### Details[​](#details "Direct link to Details")

Returns the previous ScrollTrigger in the refresh order. This can be useful in advanced scenarios where you want to base one ScrollTrigger's start/end value on the previous one's:

```
ScrollTrigger.create({
  start: self => self.previous().end, // start at the end of the previous ScrollTrigger
  ...
});
```
