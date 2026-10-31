---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isScrolling()
title: "ScrollTrigger.isScrolling"
fetched: 2026-10-28
---

# ScrollTrigger.isScrolling

### ScrollTrigger.isScrolling( ) : Boolean

Indicates whether or not any ScrollTrigger-related scroller is in the process of scrolling.

### Returns : Boolean[​](#returns--boolean "Direct link to Returns : Boolean")

If true, there is a ScrollTrigger-related scroller that's in the process of scrolling

### Details[​](#details "Direct link to Details")

Indicates whether or not any ScrollTrigger-related scroller is in the process of scrolling. Due to the fact that it's impossible to know EXACTLY when scrolling ends ("scroll" events get dispatched frequently), ScrollTrigger looks for when there hasn't been any "scroll" events fired for about 200ms AND the pointer/mouse isn't pressed on the document/scrollbar.

## Example[​](#example "Direct link to Example")

```
if (ScrollTrigger.isScrolling()) {
  // do something if scrolling
}
```
