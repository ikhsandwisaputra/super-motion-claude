---
source: https://developer.chrome.com/blog/element-scoped-view-transitions
title: "Chrome 147 enables concurrent and nested view transitions with element-scoped view transitions  |  Blog  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Chrome for Developers](https://developer.chrome.com/)
* [Blog](https://developer.chrome.com/blog)

# Chrome 147 enables concurrent and nested view transitions with element-scoped view transitions Stay organized with collections Save and categorize content based on your preferences.

![Bramus](https://web.dev/images/authors/bramus.jpg)

Bramus

Published: Mar 27, 2026

Chrome 147 introduces element-scoped view transitions, a feature that lets you start a view transition on a subtree of the DOM by calling `Element.startViewTransition()`.

This feature enables multiple view transitions to run simultaneously, lets you nest ongoing view transitions, and resolves layering issues with `position: fixed` content—all while keeping the rest of the page interactive.

## What has changed?

Since we announced [the feature being ready for developer testing in Chrome 140](https://developer.chrome.com/blog/scoped-view-transitions-feedback), we collaborated with the community and the CSS Working Group to finalize the details, particularly regarding default behaviors:

* Scope roots are self-participating by default.
* Scoped view transitions automatically contain their nested pseudos by using [nested view transition groups](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups).
* The `::view-transition-group-children()` pseudo in a scoped view transition automatically clips its contents if the scope root clips its overflow.
* Element-scoped view transitions automatically apply `contain: layout` and `view-transition-scope: all` onto the scope root during the transition.

After these updates, element-scoped view transitions are available in [Chrome Stable](https://developer.chrome.com/docs/web-platform/chrome-release-channels) from version 147.

## Demos

### Shuffling lists

This demo lets you shuffle the items in each list. You can also swap the positions of the lists by selecting the button in the center.

### Live Demo

### Demo Recording

[

](/static/blog/element-scoped-view-transitions/video/inner-and-outer-view-transition.mp4)

Because element-scoped view transitions are used, both lists can run their shuffle view transitions simultaneously. You can also start the outer view transition, which swaps the positions of the lists, while the list items are still being reorganized.

### My Patagonia trip

The ["My Patagonia Trip" demo](https://view-transitions.chrome.dev/my-patagonia-trip/) demonstrates element-scoped view transitions. This demo was built based on [the "Web UX, re-imagined" campaign video](https://www.youtube.com/watch?v=LaRA-zBubsE).

Use the **dropdowns** to filter the grid items. Use the **Add** button on each grid item to add them to the list of selected items, which appears in the **sidebar**.

### Live Demo

To view the full demo, open ["My Patagonia Trip"](https://view-transitions.chrome.dev/my-patagonia-trip/) in a separate tab.

### Demo Recording

[

](/static/blog/element-scoped-view-transitions/video/my-patagonia-trip.mp4)

The demo uses element-scoped view transitions in three places:

* The grid of items when filtering them.
* The items of the grid when adding them to the list of selected items.
* The sidebar that shows the list of selected items.

## Read the guide

To learn all about element-scoped view transitions, [read the guide](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions). It shows you how to implement element-scoped view transitions, explains additional details, and includes more demos.

[Read the element-scoped view transitions guide](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions)
