---
source: https://motion.dev/docs/tween
title: "Tween animations"
fetched: 2026-10-28
---

# Tween animations

A tween animates between a start and end value over a set duration, shaped by an easing curve.

Every animation, whether in UI or more traditional media like cartoons, is an illusion of continuous motion created by rapidly flicking through a series of still images.

Manually creating or defining each of these static images would be a nightmare (just ask the traditional media cartoonists of yesteryear). So instead, we take two keyframes, a start and a finish, and "tween" them.

Practically speaking, a tween looks like this:

```
animate(
  element,
  { opacity: 1 },
  { duration: 0.5 }
)
```

Or like this:

```css
div {
  transition: transform 100ms linear;
}
```

## Where the name comes from

Original cartoonists were split into senior artists, who drew the predominant keyframes. These were key poses (also why the predecessor to Motion was called Pose) that the animation must hit: a crouch, a jump, a slap.

Assistants then drew the frames joining these two poses together. This process was called "in-betweening", which was later slangified into "tweening".

Web and UI animation inherited this vocabulary, mostly popularised by GSAP back in the Flash days. Now, you define at least one keyframe and the animation library (or CSS) will figure out the appropriate tweened frames based on the animation duration and easing settings.

## The anatomy of a tween

Every tween, in every library and on every platform, is made of the same three parts.

**Keyframes** are the values you're animating between. There are at least two: where the value is now, and where you want it to end up. But the user may define as few as one, with the second keyframe being whatever the current value is.

**Duration** is (perhaps obviously) how long the animation takes.

**Easing** decides how progress is distributed across that duration. Linear easing covers equal distance every frame, which is why it looks mechanical/unnatural. Real movement accelerates and decelerates, and easing is how you describe that. Motion has [a full set of easing functions built in](https://motion.dev/docs/easing-functions).

An easing function receives a progress value between `0` and `1` and passes back a new one. A linear easing curve would literally return the value:

```
function linear(p) {
  return p
}
```

The simplest easing curve is a `pow2` which literally multiplies the easing value by itself.

```
function pow2(p) {
  return p * p;
}
```

`0 * 0` is `0`, `1 * 1` is `1`, so it starts and ends at the right value. But `0.5 * 0.5` is `0.25` - so you can see how this creates a curve that is starting slower and finishing fast: An "ease in".

We can flip that to a curve that starts faster and finishes slow, an "ease out", by subtracting that value from `1`:

```
function reverse(ease) {
  return (p) => 1 - ease(p)
}

const pow2out = reverse(pow2)
```

Easing functions can scale up in complexity, commonly to cubic bezier resolves which can be typically 0.5-1kb in size but offer a large degree of flexibility.

The value returned from an easing function is then used to mix the two keyframes.

```
const value = from + (to - from) * p
```

## Aren't tweens a GSAP thing?

As we've seen, the term "tweening" goes way back. GSAP took an industry term and put it front and center of their API.

`gsap.to()` returns a `Tween`, indeed an older version of the API had `TweenMax` and `TweenLite`.

Motion does have `type: "tween"` but this is typically not used and is kept around mostly for backwards compatibility. It's not a term we love in the sense that this article needs to exist - people don't know what it means.

It's the same reason we call layout animations "layout animations" and not "FLIP" - FLIP is an opaque acronym that describes a methodology rather than an outcome. Layout animations do use the broad FLIP approach (and a whole lot else besides) but FLIP doesn't mean anything to most people. In fact, a "flip animation" could reasonably also mean an element physically flipping over, so its actively harmful.

Great methodology name, awful API name. We feel the same way about "tween".

## Tweens and springs

At the top of the guide we said that a tween involves duration. But, this is not always true.

A [spring](https://motion.dev/docs/spring) is usually physics-based. You declare stiffness, damping and mass, and the duration falls out of this simulation. A spring also carries the current velocity of the value into the new animation, so it knows how fast the thing was already moving.

This type of animation is still technically being tweened. It has a start and an end keyframe, and all the values inbetween are being generated. But with a physics-based spring, the duration is essentially a side effect.

## Tweens in Motion

The [animate function](https://motion.dev/docs/animate) creates a tween whenever you give it a duration or an easing curve.

```
import { animate } from "motion"

animate(
  element,
  { x: 200 },
  { duration: 0.6, ease: "easeInOut"
})
```

`duration` is in seconds. `ease` takes the name of a built-in easing function, an array of four numbers for a custom cubic bezier, or your own function mapping `0`-`1` to `0`-`1`.

Live example: https://examples.motion.dev/js/tween

A tween isn't limited to two values. Pass an array of keyframes and the animation runs through all of them:

```
animate(
  element,
  { x: [0, 200, 100] },
  { duration: 1, times: [0, 0.7, 1] }
)
```

Keyframes are spread evenly across the duration by default. `times` overrides that, positioning each one as a fraction of the total, so here `x` spends 70% of the second travelling out to `200` and the remaining 30% settling back to `100`. `ease` accepts an array too, one curve per pair of keyframes.

Live example: https://examples.motion.dev/js/tween-keyframes

In Motion for React the same settings go in the [`transition` prop](https://motion.dev/docs/react-transitions):

```
<motion.div
  animate={{ x: 200 }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
/>
```

## Performance

Tween calculations are extremely cheap. Working out a progress value, running it through a curve and mixing two numbers is nothing next to what the browser then does with the result.

The performance of any animation is really dependant on the browser's [render pipeline](https://motion.dev/magazine/web-animation-performance-tier-list). The pipeline runs in order: **layout** works out where everything is, **paint** draws the pixels, and **composite** merges the painted layers on screen. Trigger a step and every step after it runs too.

This is exactly the process [MotionScore](https://score.motion.dev) grades against. Run a URL through it and every animation it finds is scored by where its properties land in the pipeline: compositor tweens grade S, paint costs more, layout costs the most, and the totals roll up into a page score. It's the quickest way to find out which of your tweens are quietly re-laying-out the page sixty times a second.

So when a tween feels janky, the duration and the easing curve are almost never the culprit. Audit the page, and look at what you asked it to animate.
