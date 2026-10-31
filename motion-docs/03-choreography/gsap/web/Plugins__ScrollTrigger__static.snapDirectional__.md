---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.snapDirectional()
title: "ScrollTrigger.snapDirectional"
fetched: 2026-10-28
---

# ScrollTrigger.snapDirectional

### ScrollTrigger.snapDirectional( incrementOrArray:Number | Array ) : Function

Returns a snapping function to which you can feed any value to snap, along with a direction where `1` is forward (greater than) and `-1` is backward (less than).

#### Parameters

* #### **incrementOrArray**: Number | Array

  A numeric increment to snap to, or an Array of values

### Returns : Function[​](#returns--function "Direct link to Returns : Function")

A function that accepts two parameters - 1) a value to snap, 2) the direction where 1 is forward (greater than) and -1 is backward (less than)

### Details[​](#details "Direct link to Details")

Returns a snapping function to which you can feed any value to snap, along with a direction where `1` is forward (greater than) and `-1` is backward (less than). For example:

```
// returns a function that snaps to the closest increment of 5
let snap = ScrollTrigger.snapDirectional(5);
snap(11); // 10 (closest, not directional)
snap(11, 1); // 15 (closest greater than)
snap(11, -1); // 10 (closest less than)
```

You can even use an **Array** of values!

```
let values = [0, 5, 20, 100];
// returns a function that'll snap to the closest value in the Array
let snap = ScrollTrigger.snapDirectional(values);
snap(8); // 5  (closest, non-directional)
snap(8, 1); // 20 (closest greater than)
snap(99, -1); // 20 (closest less than)
```
