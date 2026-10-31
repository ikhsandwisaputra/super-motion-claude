---
source: https://motion.dev/magazine/do-you-still-need-framer-motion
title: "Do you still need Framer Motion? | Motion Magazine"
fetched: 2026-10-28
---

>[Magazine](https://motion.dev/magazine)/Opinion

# Do you still need Framer Motion?

CSS has closed the gap on five of Framer Motion's headline features. Here's what you can now drop the library for, and where a JS animation library still wins.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)29 May 2024

**Update 12/11/24:** Framer Motion is now **Motion for React**. Some of the references on this page will be outdated. [Read the announcement](https://motion.dev/magazine/framer-motion-is-now-independent-introducing-motion).

Time flies: I released the first version of [Framer Motion](https://framer.com/motion) over five years ago. My goal was (and still is) to make an API that is simpler than animating with CSS, but with all advanced capabilities of a JS library.

Animation in CSS has always been limited, often in surprising ways. For example, with CSS it's always been impossible to animate elements when they enter the DOM. With Framer Motion, it's as simple as:

```
<motion.li
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

Likewise, it's always been impossible to animate transforms independently, use spring physics, add scroll-linked animations, or make complex layout animations.

But five years is a long time, and CSS continues to improve. Many things that used to be hard or impossible are now surprisingly easy. So for five years of Framer Motion, here are five new CSS features that mean you might not need it anymore.

## 1. Enter animations

We've just seen how easy it is to make an enter animation in Framer Motion. So easy, mundane even, that over the years I've forgotten that this is technically a feature.

When Framer Motion was first created, animating elements from an initial visual state using just CSS was impossible. You needed a sprinkle of JavaScript and even a little hackery.

First, the element is styled with CSS.

```
#my-element {
  opacity: 0;
  transition: opacity 0.5s;
}
```

Then, after adding the element to the DOM, change the value we want to animate (in this case `opacity`) using a little JavaScript:

```
const element = document.getElementById("my-element")

element.style.opacity = 1
```

You'd think, given the `transition` defined in the CSS, this would be enough to trigger an animation. It doesn't.

Because `1` is set before the element's styles are calculated, `1` is now considered the "initial" value, not `0`.

To fix this, you can first force a style recalculation.

```
element.getBoundingClientRect()
element.style.opacity = 1
```

This kind of read/write distributed across an app, if not tightly managed, can lead to style and layout thrashing, which is very bad for performance.

Alternatively, you can wait a couple animation frames to ensure the element has painted.

```
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    element.style.opacity = 1
  })
})
```

Either approach is what I'd charitably call "pretty mucky stuff". The understatement of Framer Motion's `animate` prop feels like a much bigger feature when looking at the alternative.

However, CSS has a new trick up its sleeve, `@starting-style`.

With `@starting-style`, we can define styles that an element will animate in from once rendered.

```
#my-element {
  opacity: 1;
  transition: opacity 0.5s;

  @starting-style {
    opacity: 0;
  }
}
```

`@starting-style` is available in all modern browsers. Older browsers will simply not show the animation, so it's something we can safely use today.

Though, one interesting wrinkle with this API is that starting styles need to be defined **after** the normal styles, as they inexplicably share the same specificity. So although writing it like this might be your inclination:

```
#my-element {
  @starting-style {
    opacity: 0;
  }

  opacity: 1;
  transition: opacity 0.5s;
}
```

It won't animate, as expected.

## 2. Independent transforms

In Framer Motion (and all JS animation libraries), transforms like `x`, `scaleX` and `rotate` can all be animated independently of each other.

```
<motion.div
  initial={{ y: 10 }}
  whileInView={{ y: 0 }}
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9, rotateX: 5 }}
/>
```

This used to be impossible in CSS, because `transform` is a single value and therefore has to be animated in its entirety. All values, together, with the same transition settings.

Whereas JS libraries can construct and render a new `transform` string every frame and thus its constituent values can start and stop animating independently, all with different transition settings.

After many years of failed starts and dead-end proposals, CSS recently gained new shorthand properties `translate`, `scale` and `rotate`. Unlike `transform`, these **can** be set and animated independently of each other:

```
button {
  translate: 0px 0px;
  transition:
    translate 0.2s ease-out,
    scale 0.5s ease-in-out;
}

@starting-style {
  button {
    translate: 0px 10px;
  }
}

button:hover {
  scale: 1.2;
}
```

The benefit to using these values over building `transform` strings in JS libraries is that these animations can be hardware accelerated.

The downside is that they're still a halfway house towards true independent transforms. None of the individual axes can be controlled independently. So if we want a velocity-based `x`/`y` animation, or animate `scaleX` separately from `scaleY`, we need to rely on another new CSS feature, `@property`.

`@property` allows us to give browsers some type information on CSS variables. This unlocks the ability to animate them with CSS/WAAPI.

For instance, if we want to animate `rotateX` and `rotateY` with different easing curves, we could first define variables with `@property`:

```
@property --rotate-x {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --rotate-y {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
```

Then use these variables in a `transform`/`rotate` string.

```
button {
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  // rotate: var(--rotate-x) var(--rotate-y);
  transition:
    --rotate-x 0.2s ease-out,
    --rotate-y 0.3s linear;
}

button:hover {
  --rotate-x: 10deg;
  --rotate-y: 20deg;
}
```

However, the big caveat with animating CSS variables is that they're **slow,** because they always [trigger paint](https://web.dev/articles/animations-guide#triggers). Even though we're only using these two values in a `transform`, because of this paint it's still way slower to animate with CSS variables than building `transform` strings once a frame via a JS library.

## 3. Springs

In all the Framer Motion examples given so far, you may have noticed a lack of `transition` settings. This is because Motion attempts to provide some sensible, dynamic defaults, and for transforms, these are springs.

```
<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 10 }}
/>
```

Springs are a bedrock of the library. Velocity from a gesture or interrupted animation is fed into the next animation, so UIs feel more tactile, responsive, even playful.

Springs have long been impossible with CSS, but recently it gained the `linear()` [easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#linear_easing_function).

`linear()` is such a slam dunk idea that it was probably the shortest period time I've seen an API proposed and then shipped in notorious laggard Safari.

Not to be confused with `linear` (no function brackets), the `linear()` easing function accepts a series of points and interpolates between them linearly (hence the name). Provide enough points and they can "draw" the easing curve of a spring, or a bounce, or any other custom easing curve.

A spring defined via `linear()` might look like this:

```
transition: transform 2s linear(
  0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017,
  1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
  1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,
  0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1
);
```

Obviously, it isn't intended that you write out a `linear()` definition yourself. I actually lifted this one straight from [an online](https://linear-easing-generator.netlify.app/) `linear()` [generator](https://linear-easing-generator.netlify.app/).

The developer experience here is pretty poor, having to copy/paste these definitions from an outside tool rather than just passing options to a `spring()` function. The feeling of springs can be difficult to nail, so going back and forth between one of these tools is tedious.

The other downside is that they're predefined easing curves, not a real physics simulation running on each style's actual value and velocity. So they're not going to provide that same feeling when picking up the velocity from a user gesture or interrupted animation.

However, they can look pretty convincing for certain animations, so it can be a good-enough, lightweight option in many cases.

## 4. Scroll-linked animations

There are two types of scroll animations: Scroll-**triggered** and scroll-**linked**.

Scroll-triggered animations are normal time-based animations that get triggered when an element appears in view. These are trivial in Framer Motion thanks to the `whileInView` prop.

```
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
```

Although possible to [hack together](https://www.bram.us/2023/06/15/scroll-triggered-animations/), there's still not a good solution for scroll-triggered animations in CSS today.

Conversely, rather than being driven by time, scroll-linked animations link values directly to scroll progress. In Framer Motion these are created by composing `MotionValue`[s](https://www.framer.com/motion/motionvalue/):

```
const { scrollYProgress } = useScroll()

// Map scroll progress to x
const x = useTransform(scrollYProgress, [0, 1], [0, 500])

return <motion.div style={{ x }} />
```

CSS does have a new feature for scroll-linked animations. Two, actually: The new `scroll()` and `view()` animation timelines.

Either can be assigned to the `animation-timeline` style to drive animations via scroll progress instead of time:

```
div {
  animation-name: fadeAnimation;
  animation-timeline: scroll();
}

@keyframes fadeAnimation {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(500px);
  }
}
```

The difference between the two is that `scroll()` is used to track the scroll progress of the viewport or scrollable element, while `view()` is used to detect the progress of an element as it moves through a viewport/element.

The great thing about these new timelines is when a style animation can be hardware accelerated, like `transform` or `opacity`, these scroll animations will also run completely off the main thread, ensuring scroll animations stay smooth even as your site is performing heavy lifting.

Framer Motion does have some preliminary support for accelerated scroll animations via the new `ScrollTimeline` JS API, while maintaining compatibility with older browsers. But more work needs to be done to support `ViewTimeline`.

One downside to the CSS timeline is that when we want to do anything fancier, like base an animation on scroll velocity, or dampen motion, we have to resort to [CSS variable trickery](https://www.youtube.com/watch?v=90SKdnVipYQ).

Not only are these effects arguably more straightforward to compose using Framer Motion's `useVelocity` and `useSpring`, because they rely on CSS variables they run on the main thread and trigger paint, so they're actually less performant than using JavaScript.

## 5. Layout animations

Framer Motion has a powerful layout animation API that can take any two layouts and animate between them using `transform`.

It's great for animating values that are usually unanimatable, like `justify-content`:

It seems overkill for this simple example, but the nice thing to notice is it illustrates that you get to create your layouts using your preferred CSS, like grid, flexbox etc, across different breakpoints, and Motion will figure out the required `transform` animations in real time.

The API is super simple too. Just tag animating elements with the `layout` prop.

```
<motion.div layout />
```

Framer Motion's layout animations go way beyond the [classic FLIP technique](https://aerotwist.com/blog/flip-your-animations/), as they perform scale correction on infinitely deep trees, including distortion on `border-radius` and `box-shadow`, ensuring any layout can animate rather than just the top-level element.

It can also perform shared layout animations across completely different trees by providing two elements the same `layoutId` prop.

```
<motion.div layoutId="modal" />
```

Without Framer Motion, an animation like this one would have been prohibitively complex to write and maintain.

But now, there's the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), a browser-native API that can animate between two different views and has been positioned by some as a replacement for Motion's layout animations.

The differences are extensive and could be a post of their own, so I'll attempt to be brief.

It works by wrapping DOM updates with `document.startViewTransition()`:

```
document.startViewTransition(updateDOM)
```

By default this will crossfade the whole viewport to its new visual state.

**Note:** The following demos will only animate in browsers supporting the View Transitions API.

The way this practically works is a new pseudo DOM is created on top of the page. This is made up of a screenshot of the previous view, and a live screenshot of the new view. These are then crossfaded.

For this switch example, this default effect is pretty poor, but for full page transitions it's quite good. This very site uses a similar effect when navigating between pages.

For this switch, we can improve it by adding a unique `view-transition-name` style to the toggle element.

```
<div style={{ viewTransitionName: "toggle" }} />
```

Now, the page will still crossfade, but the `toggle` element will be screenshotted and crossfaded in its own layer in the pseudo DOM. It's size and position will also be animated.

For this simple example the code looks slightly more complex than Framer Motion's API, and IMO it is a pain to have to provide each element a unique ID. It's needless complexity, and becomes a pain to manage across a tree of components. `view-transition: persist` or similar would be better for these same-element animations.

On the other hand it doesn't get any more complex to create shared element transitions. The element with the `view-transition-name` can be different before and after the transition.

In terms of the API, it's not great that we have to remove the `view-transition-name` style on the list items when a modal is opened.

```
viewTransitionName: isOpen ? undefined : "container"
```

Framer Motion maintains `layoutId` stacks so you can add multiple elements with the same ID and it'll know which elements to animate to and back from.

You can also see the images don't animate between their positions as well as in the Framer Motion example. This is because that effect was made of two layers, the outer `container` clipping the inner `image-container`. Because each named element gets screenshotted and animated in a new pseudo element, that sits in parallel to other layers (rather than maintaining their DOM hierarchy) you can encounter visual artefacts where elements were previously clipped:

![](https://images.motion.dev/cdn-cgi/image/width=1624,quality=85,format=auto/magazine/CuZ2FYQC9DkxltPfZnxnQikyIIA.png)

In Framer Motion the elements themselves are animated so you don't run into these kinds of situations.

That said, the pseudo DOM is a completely unique and new setup, one that opens possibilities that don't exist with the way layout animations work on the DOM itself.

For instance, we can lift a layer off the page while we crosswipe beneath it with an animated gradient mask:

Other fundamental differences exist with drawbacks and opportunities.

### Scroll delta

View transitions are literally that: Transitions between two **views**. This means that if the scroll position changes during the DOM update, then every element with a `view-transition-name` is going to animate across the viewport by that scroll distance.

Whereas layout animations are, unsurprisingly, literally that: Transitions between two **layouts**. Scroll is accounted for, so elements that have only changed position in the viewport because they scrolled aren't going to animate. Or, if they **do** animate because they've also changed layout, they will animate out of their new scroll position, not where they used to be drawn on screen.

### Transform animations

Transforms aren't layout, so in Framer Motion they can animate separately. Notice when toggling the layout here the rotation animation continues uninterrupted:

### Mixed transitions

When animating multiple layers with different transition settings, there's no concept in view transitions of relative layout. A parent layer could animate away from a child with a delay or slower transition (and vice versa):

Whereas Framer Motion is aware of the relationship between these two elements and will ensure parents and children can't animate away from each other:

### Interruptible animations

Try clicking rapidly on the Framer Motion switch example, and then the view transitions switch example. Motion's layout animations are interruptible, whereas view transitions aren't. By default the pseudo DOM blocks pointer events, but if you do interrupt a view transition manually, the next animation will start from where the real DOM element actually is in the viewport, not where it looks like it is in the view transition.

Interruptibility is a table stakes animation feature, so more than anything else, this makes them completely unsuitable for these kinds of micro-interactions.

### All said

Some of these differences are being addressed and while some are inherent to the concept of view transitions.

All said, a choice between view transitions and layout animations is a false dichotomy. In [Framer](https://framer.com) we use them both, each for their respective strengths.

View transitions are great at animating the entire view from one state to the other, so we use those for animations between different pages. You can create unique effects that simply aren't possible with layout animations.

Whereas layout animations are interruptible, aren't affected by scroll, can mix transition settings, and work much better with isolated parts of the page. So we use these for animating component variants.

So depending on what you want to animate, view transitions may or may not be a valid alternative.

## Bonus: Auto-height

Okay so I promised five reasons, but this one is really exciting. I'll keep it short.

Framer Motion has long been able to animate between fixed heights and `auto`.

```
<motion.div animate={{ height: isOpen ? "auto" : 0 }} />
```

CSS doesn't support animating to/from `auto`, but with CSS5's brand new `calc-size` proposal, the same effect will finally be doable.

```
li {
  height: 0px;
  transition: height 0.3s ease-out;

  .open {
    height: calc-size(auto);
  }
}
```

No catch, just a great new feature.

## So, do you still need Framer Motion?

This is an amazing set of new features that have landed, or will soon land, in CSS. If you're only using Framer Motion for very specific reasons, like enter animations or `height: auto`, then there's a compelling argument for starting with CSS and bringing in Framer Motion only when you hit its limitations.

For me, bias acknowledged, I simply prefer the Framer Motion API. With the peculiarities of CSS APIs, like `@starting-style` specificity, or the Assembly-level aesthetics of `linear()`, most of these new features are still simpler to achieve in Motion. Simplicity is fun to write, and more maintainable.

Further, there's a fidelity with Framer Motion (and JS animation libraries in general) that I don't feel CSS achieves yet. Be it true velocity-based springs, or interruptible layout animations, or even humble hover gestures that aren't weirdly polyfilled to touch devices because of the state of the web back in 2007, animations and gestures built in Framer Motion should **feel** better.

There's also an ocean of features that CSS still doesn't have, like [complex timeline sequencing](https://www.framer.com/motion/animate-function/##animate-sequences), [exit animations](https://www.framer.com/motion/animate-presence/), [stagger](https://www.framer.com/motion/animation/##orchestration), [scroll-triggered animations](https://www.framer.com/motion/scroll-animations/#scroll-triggered-animations), velocity-based springs, and many more besides.

So, do you still need Framer Motion? Thanks to these five new CSS features, the calculus has changed, but my answer is the same as it was five years ago: Go hang out with your loved ones or something.
