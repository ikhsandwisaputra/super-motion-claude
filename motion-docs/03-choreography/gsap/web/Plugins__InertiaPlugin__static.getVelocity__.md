---
source: https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.getVelocity()
title: "InertiaPlugin.getVelocity"
fetched: 2026-10-28
---

# InertiaPlugin.getVelocity

### InertiaPlugin.getVelocity( target:Element | String, property:String ) ;

Returns the current velocity of the given property and target object (only works if you started tracking the property using the [`InertiaPlugin.track()`](/docs/v3/Plugins/InertiaPlugin/static.track\(\).md) method).

#### Parameters

* #### **target**: Element | String

  The target element (can be selector text)

* #### **property**: String

  The name of the property, like "x", "rotation", "left", etc.

### Details[​](#details "Direct link to Details")

Returns the current velocity of the given property and target object (only works if you started tracking the property using the [`InertiaPlugin.track()`](/docs/v3/Plugins/InertiaPlugin/static.track\(\).md) method).

### Example[​](#example "Direct link to Example")

```
// track the x and y properties:
InertiaPlugin.track("#box", "x,y");

// then later, get the velocity:
let velocityX = InertiaPlugin.getVelocity("#box", "x");
```

For maximum performance, you can just keep the VelocityTracker object that gets returned by the .track() call and get the velocity directly through that:

```
// track the x and y properties, but this time keep a reference to the VelocityTracker instance:
const tracker = InertiaPlugin.track("#box", "x,y")[0];

// then later, get the velocity:
let velocityX = tracker.get("x"),
  velocityY = tracker.get("y");
```
