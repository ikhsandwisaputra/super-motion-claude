---
source: https://scroll-driven-animations.style/
title: "Scroll-driven Animations"
fetched: 2026-10-28
---

## [#](https://scroll-driven-animations.style/#intro) Introduction

Scroll-driven animations are a common UX pattern on the web. These are **animations that are linked to the scroll position of a scroll container**. This means that as you scroll up or down, the linked animation scrubs forward or backward in direct response. Think of interesting effects such as parallax background images or reading indicators which move as you scroll. A similar type of scroll-driven animation is **an animation that is linked to an element's position within its scroll container**. With it, for example, elements can fade-in as they come into view.

The classic way to achieve these kinds of effects is to respond to scroll events on [the main thread](https://developer.mozilla.org/docs/Glossary/Main_thread). This makes creating performant scroll-driven animations that are in-sync with scrolling impossible or very difficult. Thanks to [the Scroll-driven Animations specification](https://drafts.csswg.org/scroll-animations-1/), you now have access to new APIs and concepts that enable declarative scroll-driven animations that work in conjunction with the existing [Web Animations API *(WAAPI)*](https://drafts.csswg.org/web-animations-1/) and [CSS Animations API](https://drafts.csswg.org/css-animations/).

By having scroll-driven animations integrate with these two existing APIs, scroll-driven animations can benefit from all advantages these APIs bring. That includes the ability to have these animations run off the main thread. Yes, read that correctly: **you can now have silky smooth animations, driven by scroll, running off the main thread … and all that with just a few lines of extra code – What's not to like?!**

[👾 Demos](https://scroll-driven-animations.style/#demos)
[🔧 Tools](https://scroll-driven-animations.style/#tools)
[🍿 Free video course](https://scroll-driven-animations.style/#learn)
[🐞 DevTools Extension](https://scroll-driven-animations.style/#debugger)

## [#](https://scroll-driven-animations.style/#demos) Demos

⚠️ Your browser does not support Scroll-Linked Animations. To cater for this, a [polyfill](https://github.com/flackr/scroll-timeline) has been loaded.

Use the ℹ️ icon on each demo page to know more about how that specific demo was created. Several demos come in multiple versions. To switch versions, hit the 🔀 icon.

### Reading Progress Indicator

[![](/demos/progress-bar/cover.png)](/demos/progress-bar/cover.mp4)

Show a progress bar at the top of the page that indicates how far down you have scrolled.

[CSS version](https://scroll-driven-animations.style/demos/progress-bar/css/)
[JS version](https://scroll-driven-animations.style/demos/progress-bar/waapi/)

### Carousel Step Indicator

[![](/demos/horizontal-carousel/cover.png)](/demos/horizontal-carousel/cover.mp4)

Carousel with a stepped progress bar to indicate which item you are viewing.

[CSS version](https://scroll-driven-animations.style/demos/horizontal-carousel/css/)
[JS version](https://scroll-driven-animations.style/demos/horizontal-carousel/waapi/)

### Carousel with markers

[![](/demos/carousel-with-markers/cover.png)](/demos/carousel-with-markers/cover.mp4)

Carousel with markers to indicate which item you are viewing.

[CSS version](https://scroll-driven-animations.style/demos/carousel-with-markers/css/)
JS version

### Reverse-Scrolling Columns

[![](/demos/reverse-scroll/cover.png)](/demos/reverse-scroll/cover.mp4)

A center column that scrolls, surrounded by two columns that scroll in the opposite direction.

[CSS version](https://scroll-driven-animations.style/demos/reverse-scroll/css/)
[JS version](https://scroll-driven-animations.style/demos/reverse-scroll/waapi/)

### Cover Card to Fixed Header

[![](/demos/cover-to-fixed-header/cover.png)](/demos/cover-to-fixed-header/cover.mp4)

Transform a full page cover card to a fixed header as you scroll down

[CSS version](https://scroll-driven-animations.style/demos/cover-to-fixed-header/css/)
[JS version](https://scroll-driven-animations.style/demos/cover-to-fixed-header/waapi/)

### Image Reveal Effects

[![](/demos/image-reveal/cover.png)](/demos/image-reveal/cover.mp4)

Reveal Images as they enter the scrollport

[CSS version](https://scroll-driven-animations.style/demos/image-reveal/css/)
[JS version](https://scroll-driven-animations.style/demos/image-reveal/waapi/)

### Fly-in Fly-out Contact List

[![](/demos/contact-list/cover.png)](/demos/contact-list/cover.mp4)

Translate and fade entries as they enter/exit a scroller.

[CSS version](https://scroll-driven-animations.style/demos/contact-list/css/)
[JS version](https://scroll-driven-animations.style/demos/contact-list/waapi/)

### Cover Flow

[![](/demos/cover-flow/cover.png)](/demos/cover-flow/cover.mp4)

Recreation of a famous effect where you can flick through a list of album covers

[CSS version](https://scroll-driven-animations.style/demos/cover-flow/css/)
[JS version](https://scroll-driven-animations.style/demos/cover-flow/waapi/)

### Window Carousel

[![](/demos/parallax-carousel/cover.png)](/demos/parallax-carousel/cover.mp4)

The images in this carousel slide across the screen as they enter/exit the scrollport

[CSS version](https://scroll-driven-animations.style/demos/parallax-carousel/css/)
JS version

### Stacking Cards

[![](/demos/stacking-cards/cover.png)](/demos/stacking-cards/cover.mp4)

A set of cards that stack as they overlap.

[CSS version](https://scroll-driven-animations.style/demos/stacking-cards/css/)
[JS version](https://scroll-driven-animations.style/demos/stacking-cards/waapi/)

### Horizontal Scroll Section

[![](/demos/horizontal-section/cover.png)](/demos/horizontal-section/cover.mp4)

A horizontal strips scrolls by as you scroll vertically.

[CSS version](https://scroll-driven-animations.style/demos/horizontal-section/css/)
[JS version](https://scroll-driven-animations.style/demos/horizontal-section/waapi/)

### 3D Shoe Explorer

[![](/demos/3d-shoe-explorer/cover.png)](/demos/3d-shoe-explorer/cover.mp4)

Actual 3D-models of shoes, rotating as you scroll …

[CSS version](https://scroll-driven-animations.style/demos/3d-shoe-explorer/css/)
JS version

### Shrinking Header + Shadow

[![](/demos/shrinking-header-shadow/cover.png)](/demos/shrinking-header-shadow/cover.mp4)

Add a shadow to the page’s header after scrolling down a bit.

[CSS version](https://scroll-driven-animations.style/demos/shrinking-header-shadow/css/)
JS version

### Scroll Shadows

[![](/demos/scroll-shadows/cover.png)](/demos/scroll-shadows/cover.mp4)

Shadows to indicate a scroller is scrollable. The shadows go away as you scroll to the edge.

[CSS version](https://scroll-driven-animations.style/demos/scroll-shadows/css/)
JS version

### The Road to Baseline Newly Available

[![](/demos/baseline-newly-available/cover.png)](/demos/baseline-newly-available/cover.mp4)

Scroll through the timeline of Scroll-Driven Animations from 2016 WICG incubation to Baseline Newly Available in Oct 2026.

[CSS version](https://scroll-driven-animations.style/demos/baseline-newly-available/css/)
[JS version](https://scroll-driven-animations.style/demos/baseline-newly-available/waapi/)

## [#](https://scroll-driven-animations.style/#tools) Tools

### Scroll Timeline Progress Visualizer

[![](tools/scroll-timeline/progress/cover.png)](/tools/scroll-timeline/progress/cover.mp4)
[Go to tool](https://scroll-driven-animations.style/tools/scroll-timeline/progress/)

### View Timeline Progress Visualizer

[![](tools/view-timeline/progress/cover.png)](/tools/view-timeline/progress/cover.mp4)
[Go to tool](https://scroll-driven-animations.style/tools/view-timeline/progress/)

### View Timeline Ranges Visualizer

[![](tools/view-timeline/ranges/cover.png)](/tools/view-timeline/ranges/cover.mp4)
[Go to tool](https://scroll-driven-animations.style/tools/view-timeline/ranges/)

### `scroll()` parameters

![](https://scroll-driven-animations.style/)
[Go to tool](https://scroll-driven-animations.style/tools/scroll-timeline/params/)

## [#](https://scroll-driven-animations.style/#learn) Watch a free video course

To learn all there is to know about Scroll-Driven Animations, [check out this 10-part video course](https://goo.gle/learn-scroll-driven-animations) that covers everything from start to finish. Embedded below is the first episode:

This hands-on course is split up in two parts: one part covering the core concepts, followed by a second part that dissects some of the demos featured on this site.

Here’s the full list of episodes:

1. [Introduction | Unleash the power of Scroll-Driven Animations (1/10)](https://www.youtube.com/watch?v=5noL_qFobm0&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=1&t=1s&pp=iAQB "Introduction | Unleash the power of Scroll-Driven Animations (1/10)")
2. [Core Concepts: scroll() and ScrollTimeline | Unleash the power of Scroll-Driven Animations (2/10)](https://www.youtube.com/watch?v=fQSe12G5eEU&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=2&t=10s&pp=iAQB "Core Concepts: scroll() and ScrollTimeline | Unleash the power of Scroll-Driven Animations (2/10)")
3. [Core Concepts: view() and ViewTimeline | Unleash the power of Scroll-Driven Animations (3/10)](https://www.youtube.com/watch?v=0gVlSMGvqTs&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=3&t=2s&pp=iAQB "Core Concepts: view() and ViewTimeline | Unleash the power of Scroll-Driven Animations (3/10)")
4. [Core Concepts: Timeline Ranges Demystified | Unleash the power of Scroll-Driven Animations (4/10)](https://www.youtube.com/watch?v=L1pGRZN_YLo&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=4&t=6s&pp=iAQB "Core Concepts: Timeline Ranges Demystified | Unleash the power of Scroll-Driven Animations (4/10)")
5. [Core Concepts: Timeline Lookup and Named TLs | Unleash the power of Scroll-Driven Animations (5/10)](https://www.youtube.com/watch?v=Dk1YA8dCgE0&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=5&t=4s&pp=iAQB "Core Concepts: Timeline Lookup and Named TLs | Unleash the power of Scroll-Driven Animations (5/10)")
6. [Add Scroll Shadows to a Scroll Container | Unleash the power of Scroll-Driven Animations (6/10)](https://www.youtube.com/watch?v=4AvL5Jbd8QU&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=6&t=2s&pp=iAQB "Add Scroll Shadows to a Scroll Container | Unleash the power of Scroll-Driven Animations (6/10)")
7. [Animate Elements in Different Directions | Unleash the power of Scroll-Driven Animations (7/10)](https://www.youtube.com/watch?v=gYwmiZ0Mza8&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=7&t=1s&pp=iAQB "Animate Elements in Different Directions | Unleash the power of Scroll-Driven Animations (7/10)")
8. [Animate 3D Models and More on Scroll | Unleash the power of Scroll-Driven Animations (8/10)](https://www.youtube.com/watch?v=yrBbAWK6Gf8&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=8&t=1s&pp=iAQB "Animate 3D Models and More on Scroll | Unleash the power of Scroll-Driven Animations (8/10)")
9. [Scroll Velocity Detection | Unleash the power of Scroll-Driven Animations (9/10)](https://www.youtube.com/watch?v=90SKdnVipYQ&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=9&t=4s&pp=iAQB "Scroll Velocity Detection | Unleash the power of Scroll-Driven Animations (9/10)")
10. [Outro | Unleash the power of Scroll-Driven Animations (10/10)](https://www.youtube.com/watch?v=JtxYsEPHMEE&list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=10&pp=iAQB "Outro | Unleash the power of Scroll-Driven Animations (10/10)")

If you are more into reading, [go check out the written documentation](https://developer.chrome.com/articles/scroll-driven-animations).

## [#](https://scroll-driven-animations.style/#debugger) Scroll-Driven Animations Debugger DevTools Extension

To visualize and debug Scroll-Driven Animations there is [the Scroll-Driven Animations Debugger extension for Chrome DevTools](https://chromewebstore.google.com/detail/scroll-driven-animations-debugger/ojihehfngalmpghicjgbfdmloiifhoce). The video below demonstrates the extension in action on this very site.

Get the extension from [the Chrome Web Store](https://chromewebstore.google.com/detail/scroll-driven-animations-debugger/ojihehfngalmpghicjgbfdmloiifhoce). File a bug in [the repository](https://github.com/bramus/scroll-driven-animations-debugger-extension/).

## [#](https://scroll-driven-animations.style/#links) Links and Resources

* [Article “Animate elements on scroll with Scroll-driven animations”](https://developer.chrome.com/articles/scroll-driven-animations)
* [Video “What's new in web animations” (Google I/O ’23)](https://youtu.be/oDcb3fvtETs?t=336)
* [Free 10-part video course](https://goo.gle/learn-scroll-driven-animations)
* [Polyfill](https://github.com/flackr/scroll-timeline)
* [Specification *(`scroll-animations-1`)*](https://drafts.csswg.org/scroll-animations-1/)
* [Explainer](https://github.com/w3c/csswg-drafts/blob/main/scroll-animations-1/EXPLAINER.md)
* [“Scroll-Driven Animations Debugger (DevTools Extension)” Introductory Post](https://www.bram.us/2023/09/12/scroll-driven-animations-debugger/)
