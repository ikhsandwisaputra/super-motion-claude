---
source: https://motion.dev/magazine/reacts-experimental-view-transition-api
title: "Revealed: React's experimental animations API | Motion Magazine"
fetched: 2026-10-28
---

>[Magazine](https://motion.dev/magazine)/News

# Revealed: React's experimental animations API

React is experimenting with a new animation API based on the View Transition API. How does it work? What can it do? We reveal all in this blog post.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)13 Jan 2025

Since its inception over 12(!) years ago, there's been a glaring animation-sized hole in React's API.

Over the years its closest competitors, like Vue and Svelte, have introduced APIs that make animations a little easier. Whereas React developers have had to rely on third-party libraries like [Motion for React](https://motion.dev/docs/react) or others.

Until now.

Yes, React is getting its first animations API. The angels sing, the heavens part, and through the break in the long gloom descends author [Seb MarkbÃ¥ge](https://bsky.app/profile/sebmarkbage.calyptus.eu), gifting `<ViewTransition />` unto the world. (Incidentally I have to thank Seb for fielding my many questions about this new API)

As its name implies, `<ViewTransition />` is based on the browser's powerful new [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) feature.

Excitingly, it's already available in React's pre-release channels. So in this post we'll start playing with `<ViewTransition />` in React and Next.js, and explore its capabilities using live, copy/pastable examples.

But I'm getting ahead of myself. First, what is a view transition? And why is it **this** feature that has prompted the first animation API from the React team?

## View transitions 101

The View Transition API is a new browser feature that allows developers animate between any two views.

It's immensely powerful, allowing the animation of previously unanimatable values like switching `justify-content` between `flex-start` and `flex-end`:

(**Note:** The next couple examples are made with Motion's `animateView` [function](https://motion.dev/docs/animate-view), which is in Early Access. Therefore the source code is currently exclusive to [Motion+ members](https://motion.dev/plus))

Or animating between two entirely separate elements as if they were one:

Though advanced in many ways, view transitions aren't without their downsides:

* They're uninterruptible (or visually break if interrupted)
* Pseudo-element CSS API is unpleasant
* Elements animate changes to scroll
* Every element requires a unique `view-transition-name`, the management of which is error-prone busywork that makes composition needlessly difficult (though the upcoming `auto` setting will mitigate this a little).

We made `animateView` to begin addressing as many of these pain points as possible.

So you might think, great, if you manage to solve this stuff for vanilla JS users then it should be an easy next step to throw `animateView` into a React wrapper.

Unfortunately, because view transitions are inherently asynchronous, integrating either `animateView` or the browser's `document.startViewTransition` with React has two fundamental problems:

1. The need to start a view transition before setting state.
2. The need to wrap that state update in React's `flushSync`:

This is a one-two punch of poor performance.

You see, a view transition essentially animates pseudo-elements that contain **screenshots** of elements, rather than the elements themselves. This process has benefits and drawbacks, which are a broader conversation, but the bottom line is that this, in turn, visually freezes all or part of a page, leaving it static and non-interactive until **after** the animation has finished.

Therefore, the best time to start a view transition is **just before** you change the DOM. Traditionally this would be the `getSnapshotBeforeUpdate` lifecycle but, this is synchronous, and view transitions are asynchronous. There's no way of telling React to just wait until the view transition has snapshotted the page.

So now we're being forced to start the view transition before we've even started the state update that will lead to the render that will lead to the visual commit. Meaning the page will be visually frozen for longer than needed.

Worse still, `flushSync` is the least performant way to perform state updates, because it blocks the main thread until the new state has rendered. Freezing all main thread animations and interactions, and preventing bail-outs or cancellations.

This is why `<ViewTransition />` is so important. It has its hooks (no relation) deep into the React render cycle. Because of that, it can trigger view transitions as late as possible, leaving the page visually unfrozen in the meantime.

Additionally, it **only** works with asynchronous updates, like `startTransition` and `<Suspense />`, which means that state updates can be interrupted or aborted before the animation begins. UIs will be more responsive.

Wow, sounds perfect, right? Well, beyond the intrinsic limitations of the View Transition API itself, pretty much. So now we know why it's so good, let's dive in.

## Get started

First: Be warned! `<ViewTransition />` is an **experimental API**. It can (and probably will) change at any time, without warning. The point of these early releases is to find bugs and holes in the API. So although fun to play with, I wouldn't write production code on this today, and don't have immediate plans to make a Motion for React API based on this.

That being said, the quickest way to get started is to [fork this CodeSandbox](https://codesandbox.io/p/sandbox/react-viewtransition-component-cxh98w?file=%2Fsrc%2FApp.js%3A10%2C1-13%2C1), which is already set up with React on the `experimental` channel.

You can also install `react` and `react-dom` in your own project like this:

Next.js users must install a `canary` version of at least `15.2.0-canary.6`. Then, in your `next.config` file, add:

Finally, as an unstable API, `ViewTransition` is exported as `unstable_ViewTransition`. So you can import it like this:

## Basic usage

When `<ViewTransition />` wraps a component, its first DOM child will be automatically assigned a `view-transition-name`.

For instance, this toggle is made by wrapping the `.handle` element with `ViewTransition`:

Importantly, the `isOn` state update must be wrapped with React's `startTransition`, otherwise the animation won't work.

The great thing about this, is that this `view-transition-name` isn't just automatically generated, but it's also **automatically applied**.

What does this mean? With the View Transition API, you can't just set `view-transition-name` on an element and forget about it. All the elements with a `view-transition-name` will be scooped up and included in every single view transition.

Which means with a naive approach, clicking any one of these switches would result in six animations, even when only one element is actually moving:

But, by looking in the inspector, we can see that we only have one animation generated for these switches.

This is because the `view-transition-name` style is getting applied and removed on demand. This is great both for performance and for isolating microinteractions. Between the `name` generation and application we've already solved two of the big pain points of View Transition API.

`<ViewTransition />` is quite robust at detecting visual changes. Here, we're simply changing the URL of an `<img />`, and the component is ensuring that the images correctly crossfade from one to the next.

## Switching children

A powerful facet of this `view-transition-name` application is that it doesn't just work when the element stays the same. We can crossfade between two completely different elements simply by switching them out.

This even works with the `Suspense` component, so we can animate from its fallback to its content (when ready).

Unfortunately I couldn't get a mock version of this setup working, but will update this post if and when I succeed.

## Shared element animations

In the previous example, did you also notice the underline animation? This is performed by conditionally rendering `<ViewTransition />` in either button, depending on state. We link the two by manually providing a matching `name` prop:

When `<ViewTransition />` is removed in one location and created elsewhere, the two elements become shared.

This capability also has a super-clever feature that I am absolutely copying for Motion's `animateView()` function. When two elements are linked like this, if one of them lies outside the viewport, then a simple fade animation will be used. This prevents elements flying all over the screen when there's no benefit to the user.

To demonstrate, try pressing "Toggle box position" and noticing the layout animation, then press "Toggle container size" to move the bottom box off screen before toggling box position again:

## Customising animations

So far, we've made a bunch of animations, but we haven't actually customised any of them with easing, duration or delays.

It is possible to use CSS, by setting `name` manually and using the View Transition API's normal cumbersome pseudo-selectors:

But perhaps more useful is the ability to use the component's handy event handlers. There are five:

* `onEnter`/`onLeave`: This component is entering or leaving the DOM and there are no others that share its `name`.
* `onLayout`: This component's boundaries have changed due to external components.
* `onUpdate`: This component's contents or boundaries have changed due to itself or child components.
* `onShare`: This component is performing a shared element transition.

Each event callback is provided with a `ViewTransitionInstance`, which contains a reference to each pseudo-element used in the animation. This reference contains a pre-bound Web Animations API function, which we can use to create entirely custom animations.

So to take our image swap example, we can now use `direction` to dynamically animate the images to the left or right:

We're not limited to the typical `opacity`/`transform` animations either. Here, we're using a `clipPath` animation to animate a mask:

## Where does this leave Motion for React?

So, that's `<ViewTransition />` in a nutshell. It's definitely going to unlock a number of new capabilities for React animations, and make the View Transition API much easier to use than in its raw form.

However, it only addresses **some** of the drawbacks View Transition API, and view transitions themselves aren't a shotgun solution to all of web animations. They're "just" an amazing new tool that we can put on our shelf, alongside our other amazing tools like CSS transitions, scroll animations, and the rest.

However, Motion for React does contain one API that lives in a very venn-diagram-overlappingly close space to view transitions, and that's [layout animations](https://motion.dev/docs/react-layout-animations).

Layout animations do a similar job of animating the impossible, but using transforms and scale-distortion correcting calculations. For micro-interactions IMO they remain far preferable, partly because they account for changes in scroll offset, partly because they handle relatively/nested animations, but mostly because they're **interruptible**.

Click away on this toggle button and compare the feel to the one at the start of this article:

The obvious downside is that layout animations come at the full cost of the ~33kb `motion` component. So `<ViewTransition />` is an alternative that performs many of the same features for an undoubtedly smaller bundlesize, which is Good News.

What's more exciting to me is thinking about a `<ViewTransition />` component in Motion that can go further with making view transitions accessible to all developers. Perhaps a declarative API that allows for JS easing functions and springs, and contains sensible defaults, similar to the rest of Motion:

With a couple more events, notably a `onRead` that could run just before the view transition starts, we could also bring some of the planned enhancements for `animateView()` to `<ViewTransition />`, notably the ability to cancel out changes in scroll position.

Until then, [let us know](https://twitter.com/mattgperry) what you think of React's new animation API, and let us know what you make with it!
