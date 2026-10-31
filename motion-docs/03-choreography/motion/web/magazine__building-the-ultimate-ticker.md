---
source: https://motion.dev/magazine/building-the-ultimate-ticker
title: "Building the ultimate ticker | Motion Magazine"
fetched: 2026-10-28
---

![](https://images.motion.dev/cdn-cgi/image/width=1800,quality=85,format=auto/magazine/GMjwImBgc9duFV76RUOaN2Mc.jpg)

>[Magazine](https://motion.dev/magazine)/Announcement

# Building the ultimate ticker

Ticker compoments are becoming common decorative features, but building a good one isn't easy. Let's take a look at the problem with CSS components, and how Motion+ Ticker aims to solve them.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)5 Jun 2025

Love them or hate them, tickers (or for us oldies, "marquees") have been growing in popularity over the last few years as a dynamic design element.

Today, we're launching the [Motion+ Ticker for React](https://motion.dev/docs/react-ticker), a new creative component for quickly building accessible and performant tickers.

So what makes this ticker different? How does it improve on traditional CSS approaches? Let's dive in.

## The de-facto ticker

Let me gaze longingly into the distance for a moment. Back in my day, creating ticker effects was (sort of) as simple as throwing a `<marquee>` element into your webpage.

`<marquee>` was a little different in that it didn't really "fill out" the remaining space with repeated content, but it did provide that effect of content scrolling past infinitely.

These days, the common approach to building a ticker is this kind of setup:

```
<div class="ticker-viewport">
  <ul class="ticker">

    <!-- Original content -->
    <li class="ticker-item">Content 1</li>
    <li class="ticker-item">Content 2</li>
    <li class="ticker-item">Content 3</li>

    <!-- Repeated content -->
    <li class="ticker-item">Content 1</li>
    <li class="ticker-item">Content 2</li>
    <li class="ticker-item">Content 3</li>

  </ul>
</div>
```

Then throwing an animation on the `.ticker` that infinitely repeats the content. Roughly speaking:

```
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

There's a few problems with this approach, to do with **responsiveness**, **accessibility**, and **animation**.

### 1) Responsiveness

The cloning strategy above is to simply duplicate the number of items once and hope it fills the visible area. But does it?

In this sketch, you can see we need to duplicate more items to ensure the visible space is filled. And we need to duplicate these items until the space is filled at the ticker's maximum offset (before looping it back around).

To fill this space we've had to duplicate the set of items four times. But this is at just one viewport/container size. What happens on mobile?

We've duplicated way too many items! What happens on super-wide viewports?

We **still** haven't duplicated enough items. In a sense we're being forced to clone to the theoretical maximum of items at all times.

And what happens if the items change size, or we add or remove items? We have to change all clones too, ensure they're in sync.

Also, that `translateX(-50%)` animation? That needs to change now too, because the proportion of items to cloned items has changed. Now it's more like `translateX(-25%)`.

So it isn't just a question of the ticker looking visually broken, but also a question of maintenance for the developer.

### 2) Accessibility

The code above just throws `aria-hidden="true"` onto the cloned items and calls it a day. But what if these items are links? We can't click on them without throwing an error.

But, we can't take `aria-hidden` off, because we don't want users needing to tab through `n` clones. Likewise, if the ticker has 20 legit items, 20 items seems like a lot of focus-hogging for keyboard users.

### 3) Animation

We've already seen how changing the number of clones requires us to change the `translateX()` value we animate to. But the maintenance problems don't stop there.

`@keyframes` animation "speeds" are determined by duration. So above we've defined `animation-duration` as 2 seconds.

The problem here is that duration and distance are related in a way where, if we increase the distance (by increasing the number of items in the ticker) then the same duration is moving a larger distance, which means a higher **velocity**.

Or, to put it into pictures, mostly for my own benefit, these two tickers will animate at different speeds:

On the positive side, the CSS animation is hardware accelerated, which means its less susceptible to drops in framerate. But it's also always playing, whereas we would prefer the animation to stop when the ticker leaves the viewport.

As an accelerated animation it's also limited in what it can do, for instance be affected by scroll velocity, or be dragged etc. Perhaps there's a trade-off there for bringing the animation onto the main thread for more flexibility and also, as we'll see, the ability to minimize cloning.

## Enter Motion+ Ticker

It's with these problems in mind that Motion+ Ticker was built. Let's go through them in turn and see how the Ticker component addresses them.

### 1) Responsiveness

With `Ticker`, you only provide your source items to the component.

Instead of needing to copy/paste the theoretical maximum of clones, Ticker will automatically generate the absolute minimum of clones for the current viewable area. Sometimes this is zero clones!

The reason for this is most dynamic tickers will at least generate one new set of clones, to fill in enough visible space at the moment the ticker animation will loop back to the start.

Instead, when a Motion+ Ticker item leaves the visible area, it gets translated to the other end of the ticker.

As each item leaves the visible area, they too get translated to the other end of the ticker. Which means by the moment we need to loop the carousel, it can be the case that we're looking only at the original items, translated.

Reducing the number of cloned elements has two primary benefits.

#### Reduced CPU usage

Cloning an element properly means duplicating all its logic, animations and event handlers.

Often, ticker items are very simple, and this isn't such a problem. But sometimes they come with luggage - and this is a ticker API, not a bespoke implementation. So it needs to be ready to reduce this overhead in all situations.

#### Reduced GPU usage

Ticker contents have the potential to be very long. By reducing the number of elements within them, we reduce their physical size, and therefore reduce their burden on the GPU.

### 2) Accessibility

For a start, Motion+ Ticker **always** respects reduced motion, and this isn't configurable!

In terms of keyboard accessibility, it recognises that a ticker full of linked corporate logos, or product icons etc, can sit in the middle of a page like a greedy boi, just chomping away on tab presses.

To avoid this, it implements a type of focus trapping approach. When any item within the ticker receives focus via keyboard, the ticker passes that focus to the first focusable item within it.

From there, the arrow keys can be used to navigate within the ticker's original (not cloned) items. Tab or shift-tab will resume focus within the rest of the page.

This approach is a work in progress. I think it works better than other tickers that I've seen, but likewise I'm super keen to [hear about](https://twitter.com/mattgperry) alternative approaches that would be better for keyboard accessible users.

### 3) Animation

Finally, there's obviously the topic of animation. I identified the main issue with typical CSS ticker animations as this relationship between distance and duration. When ultimately, we only want to care about one thing, **velocity**.

Well, it's not overly complicated here. Ticker performs its measurements to improve cloning in pixels, so it loops at a known pixel value. As the user, we just need to define a `velocity` prop, defined in pixels per second, and the ticker will move at that velocity.

This animation is performed on the main thread, but it activates/deactivates as the ticker enters and leaves the viewport.

This also gives us some freedom. By passing in `offset` as a [motion value](https://motion.dev/docs/react-motion-value), we can take manual control of the ticker offset.

As a result, we can do things like hooking the ticker up to scroll offset quite simply.

Or to Motion's drag gesture:

Because we're on the main thread, we also know the exact offset of every item based on our cached measurements. So we can use the new `useItemOffset` function to hook each item into that value and use that to drive the animation of each individual item.

The possibilities here are quite endless. This `offset` value is defined as an arbitrary value, and the looping is performed downstream of this. Which makes it user-friendly and composable.

## How do I get Motion+ Ticker?

So that's a whirlwind tour of the new Motion+ Ticker. It's currently React-only, but a Vue version is currently in development. It's a premium API included in [Motion+](https://motion.dev/plus).

Motion+ is a one-time fee, lifetime membership. Besides supporting Motion, it gets you access to:

* Premium APIs like [Cursor](https://motion.dev/docs/cursor), `AnimateNumber` and `splitText`
* Source code to all [Motion Examples](https://motion.dev/examples)
* [Early access](https://motion.dev/plus) content and APIs
* A private Discord with over 200 Motion superusers

Hope to see you in the Discord! I can't wait to see what you make with Ticker.
