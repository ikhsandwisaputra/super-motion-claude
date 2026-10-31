---
source: https://gsap.com/docs/v3/GSAP/gsap.delayedCall()
title: "gsap.delayedCall()"
fetched: 2026-10-28
---

# gsap.delayedCall()

### Returns : [Tween](/docs/v3/GSAP/Tween.md)[​](#returns--tween "Direct link to returns--tween")

### Details[​](#details "Direct link to Details")

Provides a simple way to call a function after a set amount of time, completely in-sync with the whole rendering loop (unlike a `setTimeout()` which may fire outside of the browser's screen refresh cycle). You can optionally pass any number of parameters to the function too.

```
//calls myFunction() after 1 second and passes 2 parameters:
gsap.delayedCall(1, myFunction, ["param1", "param2"]);

function myFunction(param1, param2) {
  //do stuff
}
```

To cancel/kill a delayed call, save a reference to it and then call .kill() on it when needed:

```
var delayedCall = gsap.delayedCall(1, myFunction);

// sometime later
delayedCall.kill();
```

Or if you don't want to keep a reference to it, you can use the [gsap.killTweensOf()](/docs/v3/GSAP/gsap.killTweensOf\(\).md) method because a delayedCall() is merely a [Tween](/docs/v3/GSAP/Tween.md) with an onComplete and the function itself is the "target" of the Tween:

```
gsap.delayedCall(1, myFunction);

// sometime later
gsap.killTweensOf(myFunction);
```
