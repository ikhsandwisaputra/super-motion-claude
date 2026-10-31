---
source: https://motion.dev/magazine/introducing-the-motion-carousel
title: "Introducing the Motion+ Carousel | Motion Magazine"
fetched: 2026-10-28
---

![](https://images.motion.dev/cdn-cgi/image/width=1800,quality=85,format=auto/magazine/oTlEwUgnWSnhaARDalKz5Mv5q8.png)

>[Magazine](https://motion.dev/magazine)/Announcement

# Introducing the Motion+ Carousel

Meet the Motion+ Carousel for React. A performant and accessible component with infinite loops and pixel-perfect swiping.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)25 Nov 2025

Carousels are a cornerstone of web design, but over the years they've proven difficult to get right. Between CSS limitations and clunky JS gestures, building a carousel that feels fluid, scrolls infinitely, looks great, and offers a flexible developer experience is one of the most deceptively complicated challenges in web UX.

Today, we're launching the [Motion+ Carousel for React](https://motion.dev/docs/react-carousel). It's a new component that makes it easy to build performant, accessible, and fully-featured carousels.

## A long time coming

The perfect carousel is a personal white whale of mine.

12 years ago, I was working on Prime Video, tasked with implementing a simple carousel of titles. The design team had built a beautiful new implementation, but the stock Amazon carousel was riddled with UX flaws. It was clunky, slow to paginate, and unable to recreate the specced design. So I set about making my own.

I still remember the angry conference call to me and my manager when the core UI team discovered Iâd spent a month reinventing their square wheel. From my perspective, it was worth it. If I don't think something is up to scratch, I can't ship it in good conscience.

It seemed like at every subsequent job, I kept running into the same requirement - build a beautiful carousel - and the same dissatisfaction with available solutions. My iterations on this problem culminated in a 2017 tutorial literally titled [*Create the Perfect Carousel*](https://webdesign.tutsplus.com/create-the-perfect-carousel-part-1--cms-29481t). Although "perfect" was probably an overstatement, many of the techniques I wrote about then have landed here: refined, expanded, and modernised. It's getting closer.

### The trouble with carousels

If you've ever tried building a carousel from scratch, or even using an off-the-shelf solution, you've likely run into a wall of some kind.

CSS has come a long way, but even now, with `overflow: scroll` and `scroll-snap`, you can still find yourself fighting the browser.

* How do you have items visually break out of the carousel container?
* How do you wire up custom controls like pagination buttons?
* Do you want to settle for poor native wheel handling within scroll snap containers?

Some of these limitations do have "clever" solutions - sort of. But these often invoke the runic,compiler-target aesthetics of deep CSS. And the biggest blocker of all? **Infinite scrolling.** It simply isnât possible with CSS alone.

JavaScript libraries promise to solve these issues, but often introduce their own frustrations.

They can suffer from poor gesture implementations, rigid control APIs, massive bundle sizes and more.

One of my biggest pet peeves is when they paginate by item, forcing users to click through lots of items they've already seen.

![](https://images.motion.dev/cdn-cgi/image/width=1546,quality=85,format=auto/magazine/sMfSzEdaW8cK9hFJEDfpcyDDFts.png)

Sometimes this is even exasperated by pagination buttons that are blocked until the active pagination animation has finished, making it even slower to navigate through.

## Enter Motion+ Carousel

This is why built the Motion+ Carousel. For existing Motion users, it's lightweight, at only +6kb.

It's built on the same [unique rendering engine](https://motion.dev/magazine/building-the-ultimate-ticker) as the popular Motion+ Ticker, which minimises or even eliminates item cloning for buttery-smooth infinite scrolling.

But the real magic is in the details. The stuff that we obsess over, that some people notice consciously, and that *everyone* notices subconsciously.

### Pagination

Pagination is a deceptively deep topic, but itâs the bedrock of a flexible carousel. I have two fundamental rules for how pagination should behave.

**1. A "page" is the distance until the first obscured item.**

![](https://images.motion.dev/cdn-cgi/image/width=1546,quality=85,format=auto/magazine/eQ0ZkMQdw9wpwyVLFaVWXwsaM.png)

Most carousels get this wrong. When a user clicks "next," we can safely assume theyâre finished looking at the currently visible items. Animating just one item at a time is inefficient. Animating the full container width often leaves one item that has never been properly shown in its entirety.

Instead, the Motion+ Carousel moves *all* the fully visible items out of view. This dramatically reduces the time it takes to paginate through a whole shelf and scales gracefully across item sizes and breakpoints.

**2. If a new pagination event happens during an animation, the next page is calculated from the animation target, not the current position.**

This is the difference between creeping and leaping. Clicking "next" rapidly should get you through the carousel faster, not slower. Three quick clicks will move you forward three full pages - not one.

### Page redistribution

Youâve seen it before: you paginate through a carousel and the very last page is a tiny sliver of a single item.

![](https://images.motion.dev/cdn-cgi/image/width=640,quality=85,format=auto/magazine/ehMqOscdVH1x3XRztUQvKWLLmo.gif)

Motion+ Carousel detects these "straggler" pages. If the final page is significantly shorter than the average page length, it attempts to redistribute the pages to create a more balanced pagination.

This is a slightly experimental feature in that this redistribution isn't always possible, but we're [interested to hear](https://twitter.com/motiondotdev) what you think!

### Headless controls

Aside from automatically-applied styles that make a carousel, well, a carousel, Motion+ Carousel is headless. This gives you complete freedom to build custom controls and pagination indicators that match your design system, using your own component libraries.

You can pass your own components as children and use the Motion+ `useCarousel` hook to access everything you need: `nextPage()`, `prevPage()`, `gotoPage(index)`, `currentPage`, and `totalPages`.

```
function Pagination() {
  const { currentPage, totalPages, gotoPage } = useCarousel()

  return (
    <ul className="dots">
      {Array.from({ length: totalPages }, (_, index) => (
        <li className="dot">
          <motion.button
              initial={false}
              animate={{ opacity: currentPage === index ? 1 : 0.5 }}
              onClick={() => gotoPage(index)}
          />
        </li>
      )}
    </ul>
  )
}
```

### Perfecting wheel and touchpad swipe

Getting wheel and touchpad navigation to feel as natural as native scroll-snap turned out to be one of the hardest (and most interesting) parts of this project.

The reason touchpad navigation feels so good with native CSS scrolling is that the browser knows when a user's fingers have left the trackpad, allowing it to "catch" scrolling momentum and snap to a position, but this isn't exposed via any public JavaScript API, so I had to find a different approach.

#### Attempt 1: The Accumulator

My first attempt was simple: accumulate the wheel delta values, and when they reached a certain threshold, trigger a page swipe.

This model fell apart with modern mice and trackpads that have momentum and acceleration. The accumulator would keep filling up long after the user intended to stop, leading to tons of unwanted pagination events.

#### Attempt 2: The Scroll Spy

Next, I tried a "scroll spy" technique. I created a hidden, "ghost" carousel filled with empty items that perfectly matched those of the carousel.

The idea was to detect wheel events, then redirect wheel events to this ghost element, measuring its offset and applying this to the underlying element. Thereby capturing native momentum, interruption, and scroll snapping events.

For a prototype, it worked surprisingly well, but I hit a couple blockers.

One, I couldn't get it to work with infinite scrolling. Manually setting the scroll position during a snap would lead to flickering.

The other, harder show stopper, was (of course) Safari. In Chrome, it was possible to activate the scroll spy element with `pointer-events: auto` after the initial `wheel` event, but for Safari this moment was already too late to enable scroll.

#### Attempt 3: The `wheelSwipe` Gesture

My final attempt, and the ultimate solution, is a new gesture recogniser: `wheelSwipe`. It carefully monitors wheel deltas to detect when the user's scroll is entering a consistent deceleration phase.

In practise, this kind of deceleration has proven to be a good indicator that the user has stopped scrolling and what we are receiving are **simulated** wheel events.

From here, if it detects either a change in wheel direction, or a new acceleration, it instantly interrupts the pagination animation to return direct control to the user.

We're still tweaking this gesture, but already the result is a pretty robust, responsive swipe that feels intuitive and native across all devices.

### Animate items with scroll

Because the Carousel is built on top of the Ticker component, you get full access to the `useTickerItem` hook. This hook returns a [motion value](https://motion.dev/docs/react-motion-value) representing each item's visual offset from the start of the container. You can use this value to drive creative, per-item animations that react to the carousel's scroll position.

```
function Item() {
  const { offset } = useItemOffset()
  const rotate = useTransform(offset, [0, 300], [0, 360], { clamp: false })

  return (
    <motion.div style={{ rotate }}>
      ð
    </motion.div>
  )
}
```

The possibilities are endless, from parallax effects to 3D rotations.

### How do I get Motion+ Carousel?

This was a whirlwind tour of the new Motion+ Carousel, but not an exhaustive one. We didn't cover the `fade` prop, which fades overflowing content out using an animated `mask-image`. Or the `overflow` prop, which allows carousel content to break out of their scrollable container bounds. But I've given you an idea of the kind of details that we sweat.

Carousel is a premium component available today for React, with a Vue version in development. It's included in [Motion+](https://motion.dev/plus). Motion+ is a one-time fee, lifetime membership to:

* **Premium APIs** like `Carousel`, `Ticker`, `AnimateNumber`, and `splitText`
* **Unlock a vault** of [510+ examples](https://motion.dev/examples) and [110+ tutorials](https://motion.dev/examples).
* **Early access** to new content and APIs like `AnimateActivity` .
* A **private Discord** with over 600 Motion superusers
* Visual and AI editing tools for your code editor.

I hope to see you in the Discord! I can't wait to see what you build with Carousel.
