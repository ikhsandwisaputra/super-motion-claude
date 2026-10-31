---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/labelToScroll()
title: ".labelToScroll"
fetched: 2026-10-28
---

# .labelToScroll

### .labelToScroll( label:String ) : Number

Converts a timeline label into the associated scroll position (only applicable to ScrollTriggers whose "animation" is a timeline)

#### Parameters

* #### **label**: String

  The label from the ScrollTrigger's timeline.

### Returns : Number[​](#returns--number "Direct link to Returns : Number")

The scroll position (in px)

### Details[​](#details "Direct link to Details")

Converts a timeline label into the associated scroll position (only applicable to ScrollTriggers whose "animation" is a timeline). This can be quite convenient if, for example, you want to allow users to scroll directly to a position on the page associated with that timeline label.

```
btn.addEventListener("click", () => {
  gsap.to(window, { scrollTo: tl.scrollTrigger.labelToScroll("myLabel") });
});
```
