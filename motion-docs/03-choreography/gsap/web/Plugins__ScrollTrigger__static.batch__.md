---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch()
title: "ScrollTrigger.batch"
fetched: 2026-10-28
---

# ScrollTrigger.batch

### ScrollTrigger.batch( triggers:Selector text | Array, vars:Object ) : Array

Creates a coordinated group of ScrollTriggers (one for each target element) that batch their callbacks (onEnter, onLeave, etc.) within a certain interval, delivering a neat Array so that you can easily do something like create a staggered animation of all the elements that enter the viewport around the same time.

#### Parameters

* #### **triggers**: Selector text | Array

  The trigger elements (can be selector text like `".class"` or and Array of element references like `[element1, element2]`)

* #### **vars**: Object

  Object containing configuration data like onEnter, onLeave, start, end, etc. Most of this gets passed to the ScrollTrigger instances that get created internally.

### Returns : Array[â€‹](#returns--array "Direct link to Returns : Array")

An Array of ScrollTrigger instances

### Details[â€‹](#details "Direct link to Details")

Creates a coordinated group of ScrollTriggers (one for each target element) that batch their callbacks (onEnter, onLeave, etc.) within a certain interval, delivering a neat Array so that you can easily do something like create a staggered animation of all the elements that enter the viewport around the same time. It's a great alternative to [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) because it's more widely compatible and easier to work with. Each type of callback is individually batched, so `onEnter` callbacks are only batched with other `onEnter` callbacks.

Batch

## The problem it solves[â€‹](#the-problem-it-solves "Direct link to The problem it solves")

Normally, each ScrollTrigger will fire its callbacks (onEnter, onLeave, etc.) immediately when they occur but **what if you want to coordinate an animation (like with staggers) of ALL the elements that fired a similar callback around the same time?** That could get awkward to do manually.

## How it works[â€‹](#how-it-works "Direct link to How it works")

You feed in the elements (selector text like `".class"` or an Array of elements like `[element1, element2...]`) and configuration details with any callbacks you'd like, and `ScrollTrigger.batch()` will create a ScrollTrigger for *each* of those elements and then **batch** their callbacks that occur within a certain interval (by default it's roughly one requestAnimationFrame, so almost immediately). For example, let's say you've got an `onEnter` defined for your batch - as soon as an `onEnter` for one of the elements fires, it'll wait for any other `onEnter` calls from the other batch targets that occur within the interval and collect them into an Array and feed that to the `onEnter` you defined for the batch. That callback will receive **two** parameters:

### Callback parameters[â€‹](#callback-parameters "Direct link to Callback parameters")

1. **targets** *\[Array]* - An Array of the target elements (the triggers for the ScrollTrigger instances) which fired the associated callback within the interval. If there is a `batchMax` defined, this Array will not be any larger than that.
2. **scrollTriggers** *\[Array]* - An Array of the ScrollTrigger instances which fired the associated callback within the interval. This may be useful if, for example, you need to check their progress or direction or kill() them. If there is a `batchMax` defined, this Array will not be any larger than that.

**Note** that the method signature for these callbacks is different than in regular ScrollTriggers which receives the ScrollTrigger instance itself as the sole parameter. So batched callbacks get **two** Arrays as parameters. Also note that `onRefreshInit` is the only callback that uses the standard ScrollTrigger callback signature (it's not batched) because the nature of a "refreshInit" event hinges on it being instantaneous, plus it lets you return a [gsap.set()](/docs/v3/GSAP/gsap.set\(\).md) call to reset things to a certain state solely during the refresh so that positioning calculations are based on that state, and it'll automatically revert the gsap.set() when the refresh is done, so it wouldn't make any sense to batch `onRefreshInit` calls.

## Configuration[â€‹](#configuration "Direct link to Configuration")

The `vars` object can contain any of the standard ScrollTrigger configuration properties like start, end, once, etc. except anything that's directly animation-related (`animation`, `invalidateOnRefresh`, `onSnapComplete`, `onScrubComplete`, `scrub`, `snap`, `toggleActions`) or `trigger` (because the targets are the triggers). Plus it recognizes two extra optional properties:

* **batchMax** *\[Integer | Function]* - The maximum number of elements that should be allowed in each batch. When a batch is full, it will immediately fire its callback and begin collecting the next batch and if that fills immediately as well it will fire immediately. So if, for example, you set `batchMax: 3` and then 9 elements all enter the viewport at roughly the same time, 3 batches would be created, thus the onEnter callback would get fired 3 times in quick succession (not waiting for the interval to elapse). If you have a responsive layout that may require changing of the batchMax when the page resizes, you can use a **function** instead that returns an Integer. That will get called whenever ScrollTrigger fires a "refresh" (which occurs when the viewport resizes, when an inactive tab becomes active, etc.). Like `batchMax: () => { ...your logic here... return integer }`
* **interval** *\[Number]* - The maximum amount of time (in seconds) to spend collecting each batch. Once a callback of a certain type is called, the timer begins, and then the batch will complete when it elapses or when the `batchMax` is reached (whichever is first).

## Simple example[â€‹](#simple-example "Direct link to Simple example")

```
ScrollTrigger.batch(".box", {
  onEnter: (elements, triggers) => {
    gsap.to(elements, { opacity: 1, stagger: 0.15 });
    console.log(elements.length, "elements entered");
  },
  onLeave: (elements, triggers) => {
    gsap.to(elements, { opacity: 0, stagger: 0.15 });
    console.log(elements.length, "elements left");
  },
});
```

## Advanced example[â€‹](#advanced-example "Direct link to Advanced example")

```
gsap.set(".box", {y: 100});

ScrollTrigger.batch(".box", {
  interval: 0.1, // time window (in seconds) for batching to occur.
  batchMax: 3,   // maximum batch size (targets). Can be function-based for dynamic values
  onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
  onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
  onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),
  // you can also define most normal ScrollTrigger values like start, end, etc.
  start: "20px bottom",
  end: "top top"
});

// when ScrollTrigger does a refresh(), it maps all the positioning data which
// factors in transforms, but in this example we're initially setting all the ".box"
// elements to a "y" of 100 solely for the animation in which would throw off the normal
// positioning, so we use a "refreshInit" listener to reset the y temporarily. When we
// return a gsap.set() in the listener, it'll automatically revert it after the refresh()!
ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".box", {y: 0}));
```

## Simple Demo[â€‹](#simple-demo "Direct link to Simple Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/NWGPxGZ)

```
<div class="header">
  <h1>ScrollTrigger.batch()</h1>
  <p>
    Easily create a staggered animation of all the elements that enter the viewport around the same time with batch().
  </p>
</div>

<div class="container">
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
</div>
```

```
body{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction: column;}

.header {
  text-align: center;
  max-width: 560px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.header h1 {
  font-weight: 400;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  color: var(--light);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.header p {
  font-size: 0.86rem;
  color: var(--surface50);
  line-height: 1.55;
}

.container {
  max-width: 800px;
  margin: auto;
  width: 100%;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

img {
  width: 30%;
  max-width: 100%;
  display: inline-block;
  aspect-ratio: 16/9;
  object-fit: cover;
  margin: 5px;
  opacity: 0;
  will-change: transform;
  border-radius: 5px;
}

header {
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 6px 10px 6px 10px;
  border-bottom-right-radius: 26px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
```

```
// https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.batch()

ScrollTrigger.batch(".image", {
  // interval: 0.1, // time window (in seconds) for batching to occur. 
  // batchMax: 3,   // maximum batch size (targets)
  onEnter: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.2, duration: 1, ease: "sine.out"}),
  // also onLeave, onEnterBack, and onLeaveBack
  // also most normal ScrollTrigger values like start, end, etc.
});
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

## Advanced Demo[â€‹](#advanced-demo "Direct link to Advanced Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/zYrxpmb)

```
<div class="header">
  <h1>ScrollTrigger.batch()</h1>
  <p>
    Easily create a staggered animation of all the elements that enter the viewport around the same time with batch().
  </p>
</div>

<div class="container">
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
  <img class="image" src="/demo-assets/planetono.webp" alt="" />
  <img class="image" src="/demo-assets/sanrita.jpg" alt="" />
  <img class="image" src="/demo-assets/anima.jpg" alt="" />
  <img class="image" src="/demo-assets/giulio.jpg" alt="" />
  <img class="image" src="/demo-assets/lando.webp" alt="" />
  <img class="image" src="/demo-assets/glenn.png" alt="" />
  <img class="image" src="/demo-assets/fantik.jpg" alt="" />
  <img class="image" src="/demo-assets/romei.jpg" alt="" />
  <img class="image" src="/demo-assets/ironhill.jpeg" alt="" />
  <img class="image" src="/demo-assets/inkwell.jpg" alt="" />
  <img class="image" src="/demo-assets/monolith.jpg" alt="" />
  <img class="image" src="/demo-assets/phantom.jpg" alt="" />
  <img class="image" src="/demo-assets/ribbit.jpg" alt="" />
  <img class="image" src="/demo-assets/aurel.jpg" alt="" />
  <img class="image" src="/demo-assets/aether.jpg" alt="" />
  <img class="image" src="/demo-assets/cashapp.jpg" alt="" />
  <img class="image" src="/demo-assets/osmo.webp" alt="" />
  <img class="image" src="/demo-assets/pantheon.jpg" alt="" />
  <img class="image" src="/demo-assets/ponpon.jpg" alt="" />
  <img class="image" src="/demo-assets/quentin.webp" alt="" />
</div>
```

```
body{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction: column;}

.header {
  text-align: center;
  max-width: 560px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.header h1 {
  font-weight: 400;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  color: var(--light);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.header p {
  font-size: 0.86rem;
  color: var(--surface50);
  line-height: 1.55;
}

.container {
  max-width: 800px;
  margin: auto;
  width: 100%;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

img {
  width: 30%;
  max-width: 100%;
  display: inline-block;
  aspect-ratio: 16/9;
  object-fit: cover;
  margin: 5px;
  opacity: 0;
  will-change: transform;
  border-radius: 5px;
}

header {
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 6px 10px 6px 10px;
  border-bottom-right-radius: 26px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
```

```
gsap.defaults({ease: "power3"});
gsap.set(".image", {y: 100});

ScrollTrigger.batch(".image", {
  //interval: 0.1, // time window (in seconds) for batching to occur. 
  //batchMax: 3,   // maximum batch size (targets)
  onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
  onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
  onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
  // you can also define things like start, end, etc.
});


// when ScrollTrigger does a refresh(), it maps all the positioning data which 
// factors in transforms, but in this example we're initially setting all the ".box"
// elements to a "y" of 100 solely for the animation in which would throw off the normal 
// positioning, so we use a "refreshInit" listener to reset the y temporarily. When we 
// return a gsap.set() in the listener, it'll automatically revert it after the refresh()!
ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".image", {y: 0}));
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)
