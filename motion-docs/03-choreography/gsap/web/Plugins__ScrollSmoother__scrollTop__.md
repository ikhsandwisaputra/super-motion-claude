---
source: https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTop()
title: ".scrollTop"
fetched: 2026-10-28
---

# .scrollTop

### .scrollTop( position:Number ) : Number | void

Immediately gets/sets the scroll position (in pixels).

#### Parameters

* #### **position**: Number

  The scroll position (in pixels)

### Returns : Number | void[​](#returns--number--void "Direct link to Returns : Number | void")

The scrollTop position in pixels (if getter) or void (if setter)

### Details[​](#details "Direct link to Details")

Immediately gets/sets the scroll position (in pixels). If you'd like to scroll to a particular element or position smoothly, see [scrollTo()](/docs/v3/Plugins/ScrollSmoother/scrollTo\(\).md)

### Getter[​](#getter "Direct link to Getter")

```
let scroll = smoother.scrollTop();
```

### Setter[​](#setter "Direct link to Setter")

```
// go to a scroll position of 500
smoother.scrollTop(500);
```

You can use the [offset()](/docs/v3/Plugins/ScrollSmoother/offset\(\).md) method to ascertain the position associated with a particular target element.

When you set the scroll position in this way, it will work even if [paused()](/docs/v3/Plugins/ScrollSmoother/paused\(\).md) is `true`.
