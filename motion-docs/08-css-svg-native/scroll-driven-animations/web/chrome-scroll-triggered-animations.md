---
source: https://developer.chrome.com/blog/scroll-triggered-animations
title: "CSS scroll-triggered animations are coming!  |  Blog  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Chrome for Developers](https://developer.chrome.com/)
* [Blog](https://developer.chrome.com/blog)

# CSS scroll-triggered animations are coming! Stay organized with collections Save and categorize content based on your preferences.

![Bramus](https://web.dev/images/authors/bramus.jpg)

Bramus

Published: Dec 12, 2025

In 2023 we shipped [scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) that let you advance (or rewind) an animation through scrolling. With scroll-driven animations, animation progress advances from 0% to 100% as you scroll. If you stop scrolling, the animation pauses; if you scroll back up, the animation reverses.

The next chapter for scroll-based animations arrives in 2026, with scroll-triggered animations landing in Chrome 145. These are time-based animations that trigger when crossing a specific scroll offset.

Say goodbye to `IntersectionObserver` for this type of effect, as you can now do it declaratively in CSS.

## Timeline triggers, animation triggers, and actions

### Trigger an animation

To set up a scroll-triggered animation in CSS, start with a regular CSS animation attached to an element:

```
animation: unclip 0.35s ease-in-out both;
```

This animation uses a `DocumentTimeline` as its driver and runs for 0.35 seconds. The animation is automatically triggered after page load. To change the trigger, use the new `animation-trigger` CSS property:

```
animation-trigger: --t play-forwards play-backwards;
```

Here, the animation is set to be triggered by the trigger `--t`. When that trigger gets activated, the `play-forwards` action is invoked on the animation and when the trigger gets deactivated, the `play-backwards` action is invoked.

The specification contains the [full list of actions](https://drafts.csswg.org/animation-triggers-1//#typedef-animation-action).

### Create a trigger

But what is that `--t` trigger? It's a trigger with the name `--t`. For scroll-triggered animations specifically, it's a "timeline trigger" which uses a [Scroll Progress Timeline](https://developer.chrome.com/docs/css-ui/scroll-driven-animations#scroll_progress_timeline) or [View Progress Timeline](https://developer.chrome.com/docs/css-ui/scroll-driven-animations#view_progress_timeline) as its source.

To define a timeline trigger, use the `timeline-trigger` property (or its associated longhands). For example, to create a trigger named `--t` that uses a view timeline as its source, use the following:

```
timeline-trigger-name: --t;
timeline-trigger-source: view();
```

This created trigger `--t` activates and deactivates based on the view timeline associated with the matched element. Because the default range for a view timeline is [the `cover` range](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=cover&range-start-percentage=0&range-end-name=cover&range-end-percentage=100&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=no&show-fromto=yes&show-labels=no), the trigger also activates and deactivates when within or outside of that range.

### Tweak the trigger's ranges

To tweak the positions when the trigger should be active or inactive, specify the activation and active ranges on the trigger. In the following example, the activation range is set to `entry 100% exit 0%`, meaning that the trigger will activate once the subject is within that range.

```
timeline-trigger:
  --t
  view()
  entry 100% exit 0%
;
```

Because there is no active range specified in the preceding snippet, the activation range is also used as the active range. When outside of that active range, the trigger gets deactivated.

When combined with the already defined `animation-trigger` this visually results in the animation playing forwards when the subject has fully entered the scrollport and the animation playing backwards when it is about to leave the scrollport.

[

](/static/blog/scroll-triggered-animations/video/demo1.mp4)

Recording of [a demo](https://codepen.io/web-dot-dev/pen/jEqJvjB) with the trigger ranges set to `entry 100% exit 0%`.
The demo also shows debug lines to indicate where the ranges start and end.

It's possible to have different activation and active ranges. For example:

```
timeline-trigger:
  --t
  view()
  entry 100% exit 0% / entry 0% exit 100%
;
```

Here, the trigger activates when the subject is in the `entry 100% exit 0%` range. The trigger remains active until it has left the `entry 0% exit 100%` range.

Visually this results in the animation playing forwards when the subject enters the scrollport and, unlike before, it will remain active until the subject has fully left the scrollport.

[

](/static/blog/scroll-triggered-animations/video/demo2.mp4)

Recording of [a demo](https://codepen.io/web-dot-dev/pen/vEGPVeO) with the trigger ranges set to `entry 100% exit 0% / entry 0% exit 100%`.
The demo also shows debug lines to indicate where the ranges start and end. The active range encloses the scrollport, so its debug lines are not visible.

### Limit the scope of a trigger

Triggers are globally visible, meaning that the last match that declares a trigger with a certain name "wins". To limit the visibility of a trigger, use the `trigger-scope` property. This is similar to how `anchor-scope` can be used.

```
trigger-scope: --t; /* List of dashed idents, or `all` */
```

When you have a CSS rule that declares a trigger and that matches multiple elements, you'll need to use `trigger-scope`.

## Demo

In the following demo, a form is split out across various fullheight sections. As each part of the form comes into view, it animates in using a scroll-triggered animation. When leaving the scrollport, it animates out.

The scroll-triggered animation logic for this is:

```
@keyframes card {
  from { translate: 0 -50% 0; }
}

@keyframes card-contents {
  from { opacity: 0; height: 0px; }
  to { opacity: 1; height: auto; }
}

.card {
  overflow-y: clip; /* Hide any overflow in the y-axis */

  timeline-trigger:
    --t
    view()
    contain 15% contain 85% / entry 100% exit 0%
  ;
  trigger-scope: --t;

  animation: unclip var(--duration) ease-in-out both;
  animation-trigger: --t play-forwards play-backwards;
}

.card > * {
  interpolate-size: allow-keywords; /* To animate to `height: auto` */

  animation: card-contents var(--duration) ease-in-out both;
  animation-trigger: --t play-forwards play-backwards;
}
```

Dissected, the code reads:

* The `timeline-trigger` is named `--t` with its source set to a view timeline that tracks the matched element.
* The activation range for the trigger is [`contain 15% contain 85%`](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=contain&range-start-percentage=15&range-end-name=contain&range-end-percentage=85&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes). When the subject is within that range, the trigger becomes active.
* When activated, the trigger remains active for as long as the subject is in the active range of [`entry 100% exit 0%`](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=entry&range-start-percentage=100&range-end-name=exit&range-end-percentage=0&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes).
* The `unclip` animation is attached to the element.
* The animation is set to use `--t` as its trigger source. When the trigger becomes active, the animation starts to play in a forwards direction.
* When the trigger deactivates–which happens when the subject leaves the active range–the animation plays backwards.
* The contents of the card also animate in and out using the same trigger `--t`.

The example includes a fallback using `IntersectionObserver` for browsers with no support for `timeline-trigger`.

## More demos

If you can't get enough of scroll-triggered animations, check out the following demos:

* [Fly-in Text](https://codepen.io/bramus/pen/gbrEzGJ)
* [Meet the monsters (scrollytelling)](https://codepen.io/bramus/pen/ZYWPRbr)
* [Morphing shape](https://codepen.io/una/pen/ZYWPbxG)

[

](/static/blog/scroll-triggered-animations/video/meet-the-monsters.mp4)

Recording of the [Meet the monsters" demo](https://codepen.io/bramus/pen/ZYWPRbr).

## Feedback

We're interested in feedback to continue to improve this feature. Reach out to us on social media, or [file an issue at the CSS Working Group](https://github.com/w3c/csswg-drafts/issues/) to leave feedback.

If you run into a bug, [file a Chromium bug](https://crbug.com/new) to let us know. List of known bugs: see the [Chromium Bug Tracker](https://issues.chromium.org/issues?q=status:open%20componentid:1456613%20scroll-triggered).
