---
source: https://gsap.com/docs/v3/Plugins/ScrollSmoother/offset()
title: ".offset"
fetched: 2026-10-28
---

# .offset

### .offset( target:String | Element, position:String ) : Number

Calculates the numeric offset (scroll position in pixels) that corresponds to when a particular element reaches the specified position like:

#### Parameters

* #### **target**: String | Element

  The target element

* #### **position**: String

  The position in a space-delimited form, like `"center center"` or `"top 100px"` where the first value relates to the target element, and the second value relates to the viewport. So `"top 100px"` means *where the top of the target element hits 100px down from the top of the viewport."*

### Returns : Number[​](#returns--number "Direct link to Returns : Number")

The numeric offset (in pixels)

### Details[​](#details "Direct link to Details")

Calculates the numeric offset (scroll position in pixels) that corresponds to when a particular element reaches the specified position like:

```
// when the top of #box1 hits 100px down from the top of the viewport
let offset = smoother.offset("#box1", "top 100px");
```

And then you can scroll there like:

```
smoother.scrollTop(offset);
```

Or plug it into a tween:

```
gsap.to(smoother, {
  scrollTop: offset,
  duration: 1,
});
```
