---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.defaults()
title: "ScrollTrigger.defaults"
fetched: 2026-10-28
---

# ScrollTrigger.defaults

### ScrollTrigger.defaults( config:Object ) : null

Allows you to set the default values that apply to every ScrollTrigger upon creation, like `toggleActions`, `markers`, etc.

#### Parameters

* #### **config**: Object

  An object with any default values you'd like to set, like `{toggleActions: "restart pause resume none", markers: true}`

### Details[​](#details "Direct link to Details")

Allows you to set the default values that apply to every ScrollTrigger upon creation, like `toggleActions`, `markers`, etc. These will only be applied when no corresponding value is defined in a ScrollTrigger vars configuration object.

## Example[​](#example "Direct link to Example")

```
ScrollTrigger.defaults({
  toggleActions: "restart pause resume none",
  markers: {
    startColor: "white",
    endColor: "white",
    fontSize: "18px",
    indent: 10,
  },
});
```
