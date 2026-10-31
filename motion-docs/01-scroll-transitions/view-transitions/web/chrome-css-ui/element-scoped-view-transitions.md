---
source: https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions
title: "Run concurrent and nested view transitions with element-scoped view transitions  |  CSS and UI  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Home](https://developer.chrome.com/)
* [Docs](https://developer.chrome.com/docs)
* [CSS and UI](https://developer.chrome.com/docs/css-ui)

# Run concurrent and nested view transitions with element-scoped view transitions Stay organized with collections Save and categorize content based on your preferences.

![Bramus](https://web.dev/images/authors/bramus.jpg)

Bramus

Published: Mar 27, 2026

Element-scoped view transitions let multiple view transitions run simultaneously, allow ongoing view transitions to be nested within another, and resolve `z-index` issues you might encounter with document-scoped view transitions—all while keeping the rest of the page interactive. Read this guide to learn how to use them.

Promotional video: Re-imagine the web with Scoped View Transitions. [Try a live demo](https://view-transitions.chrome.dev/my-patagonia-trip/) (Chrome 147 or later)

## The need for more narrowly scoped view transitions

When you start a [same-document view transition](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) with `document.startViewTransition()` (or through its [cross-document counterpart](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)), the browser scopes the resulting view transition to the document.

After the update callback executes and the browser snapshots all necessary elements, the resulting [`::view-transition` overlay and its tree of pseudo-elements](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#how_these_transitions_work) attaches to the `:root` element, `html` in the following example.

```
html
  ├─ ::view-transition
  │  └─ ::view-transition-group(root)
  │     └─ ::view-transition-image-pair(root)
  │        ├─ ::view-transition-old(root)
  │        └─ ::view-transition-new(root)
  ├─ head
  └─ body
     └─ …
```

Because the `::view-transition` layer renders on top of the transition root, this can lead to unexpected situations. For example, elements that participate in a view transition might suddenly overlap other non-participants, or elements might no longer be clipped by their ancestor wrapper during the view transition.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/document-scoped-view-transition-clipping-issue.mp4)

[Re-enabling `pointer-events` on `::view-transition`](https://www.bram.us/2025/01/29/view-transitions-page-interactivity/) or [using nested view transition groups](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups) can resolve some side effects that document-scoped view transitions introduce. However, these methods cannot solve all issues.

For example, elements with `position: fixed` or popovers are still obscured by a document-scoped view transition while the transition is active — also known as [the `z-index` issue](https://www.nicchan.me/blog/view-transitions-and-stacking-context/).

Toggle the popover in the following demo, and then select the **Shuffle** button to start a document-scoped view transition. Nested view transition groups resolve the clipping issue, but the layering issue remains.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/document-scoped-view-transition-vs-popover.mp4)

One workaround is to capture the `popover` as part of the view transition by giving it a `view-transition-name`. While this might work for a single instance, it is cumbersome to maintain and unnecessarily strains the snapshotting process.

## Element-scoped view transitions

Element-scoped view transitions let you start a view transition on a subtree of the DOM. Instead of calling `document.startViewTransition()`, you call `element.startViewTransition()` on an arbitrary element, which scopes the view transition to that element.

In the following snippet, the browser starts an element-scoped view transition on the `<ul>` element.

```
document.querySelector('ul').startViewTransition({
  callback: () => {
    // … code that manipulates the contents of <ul>
  },
})
```

The element where you invoke `element.startViewTransition()`—for example the `<ul>`—is called the transition root or the scope.

When the browser scopes a view transition to an element, it is isolated from the rest of the DOM:

* The browser looks for elements to snapshot only within the scope's subtree.
* During the snapshotting process—while the `update` callback executes—only the rendering of the scope halts.
* The resulting `::view-transition` pseudo-tree injects onto the transition root.

For example, with the `<ul>`, the DOM tree looks like this while the view transition is active:

```
html
  ├─ head
  └─ body
     ├─ ul
     │  ├─ ::view-transition
     │  │  └─ ::view-transition-group(root)
     │  │     ├─ ::view-transition-group-children(root)
     │  │     │  └─ …
     │  │     └─ ::view-transition-image-pair(root)
     │  │        ├─ ::view-transition-old(root)
     │  │        └─ ::view-transition-new(root)
     │  ├─ li
     │  ├─ li
     │  └─ li
     ├─ button#showpopover
     ├─ button#reorder
     └─ div#popover
        └─ p
```

The `::view-transition` pseudo has the same size and shape as the transition root and renders only on top of the transition root. Because of this, the layering order of elements outside of the transition root is respected.

For example, if you have a popover that is visible above the `<ul>` element and then start an element-scoped view transition on the `<ul>` element, the popover is not obscured by the view transition's pseudo-tree.

In the following demo, try it out. It has two buttons. The first button toggles the popover, and the second button reorders the list items using an element-scoped view transition.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/element-scoped-view-transition-vs-popover.mp4)

Because element-scoped view transitions are used, the popover remains visible on top of the `<ul>` element while the transition is active.

Furthermore, the elements outside the `<ul>` element—for example the buttons—remain interactive, because those elements are not part of the scope.

## Self-participating scopes and nested view transition groups

When you start an element-scoped view transition on an element that clips its overflow (that is, when its `overflow` is set to `hidden`, `scroll`, or `clip`), you notice that the contents of the view transition remain visually clipped.

This is because element-scoped view transitions handle the following automatically:

* The scope automatically gets `view-transition-name: root` applied, which makes it self-participating.
* The scope automatically gets `view-transition-group: contain` applied to enable [nested view transition groups](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups).
* The resulting `::view-transition-group-children(root)` pseudo automatically clips its contents using `overflow: clip` if the scope root clips its overflow, which prevents the pseudos from visually bleeding out of the transition root.

As a result, you can keep the CSS you use with element-scoped view transitions focused only on the elements you want to capture. For example, in the list demo, the CSS only adds names to the list items:

```
ul li {
  view-transition-name: match-element;
  view-transition-class: album;
}
```

In the following demo, try it out. It lets you override self-participation. When the scope is self-participating (the default behavior), everything works as expected. When the scope is not self-participating, its border immediately changes, and its contents bleed out of the wrapper during the transition.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/element-scoped-view-transition-self-participation.mp4)

For reference, the pseudo-tree for this demo with self-participation looks like this:

```
html
  ├─ head
  └─ body
     ├─ ul
     │  ├─ ::view-transition
     │  │  └─ ::view-transition-group(root)
     │  │     ├─ ::view-transition-group-children(root)
     │  │     │  ├─ ::view-transition-group(item1)
     │  │     │  │  └─ ::view-transition-image-pair(item1)
     │  │     │  │     ├─ ::view-transition-old(item1)
     │  │     │  │     └─ ::view-transition-new(item1)
     │  │     │  ├─ ::view-transition-group(item2)
     │  │     │  │  └─ …
     │  │     │  …
     │  │     └─ ::view-transition-image-pair(root)
     │  │        ├─ ::view-transition-old(root)
     │  │        └─ ::view-transition-new(root)
     │  ├─ li
     │  ├─ li
     │  └─ li
     └─ button#reorder
```

Because the transition root, the `<ul>` element, vertically clips its contents, the `::view-transition-group-children(root)` also automatically applies a clip.

## Concurrent element-scoped view transitions

Because element-scoped view transitions run in isolation, multiple element-scoped view transitions can run simultaneously if they have a different scope.

The following demo has two reorder buttons, one for each list. Each button starts an element-scoped view transition only on its respective list. Because the DOM trees of both lists don't overlap, the two element-scoped view transitions can run simultaneously in isolation.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/element-scoped-view-transition-concurrent.mp4)

This isolated nature also lets you reuse `view-transition-name` values across different scopes. As long as a name remains unique within its scope, there is no conflict.

## Nested element-scoped view transitions and view-transition-name containment

When the DOM trees of multiple element-scoped view transitions overlap, there is a risk of `view-transition-name` value collision. For this reason, the browser automatically assigns `view-transition-scope: all` to active element-scoped view transitions to mitigate this risk.

Similar to how `anchor-scope` scopes `anchor-name` values, the `view-transition-scope` property ensures that `view-transition-name` values scope to the element's subtree. The property accepts `none`, a list of names you want to scope, or `all` to scope all values.

In addition to preventing names from bleeding out, `view-transition-scope` also prevents an element and its contents from capture by an outer, concurrent view transition. When the snapshotting process traverses the subtree to find an element to snapshot, it ignores elements (and their entire subtree) that have `view-transition-scope: all` applied. This assumes those elements are already participating in a different element-scoped view transition.

The following demo is a variation of the previous one. In addition to the two buttons that shuffle the list contents, it also has a **Swap** button to swap the lists. Toggling a `.reversed` class on the `#lists-wrapper` handles the swapping.

### Live Demo

### Demo Recording

[

](/static/docs/css-ui/view-transitions/element-scoped-view-transitions/video/inner-and-outer-view-transition.mp4)

Because `view-transition-scope: all` automatically applies during the shuffle transition, you can start a concurrent, outer swap transition while the shuffle transition is still ongoing.

Because `view-transition-scope: all` also prevents an element from being snapshotted in an outer transition, the demo also adds `view-transition-name` values to the elements wrapping the `<ul>` elements.

```
#list1-wrapper, #list2-wrapper {
  view-transition-name: attr(id type(<custom-ident>));
}
```

The pseudo-tree for this demo, after starting a shuffle on the second list and then swapping both lists, looks like this:

```
html
  ├─ head
  └─ body
     └─ #lists-wrapper.reversed (SCOPE)
        ├─ ::view-transition
        │  └─ ::view-transition-group(lists-wrapper)
        │     ├─ ::view-transition-group-children(lists-wrapper)
        │     │  ├─ ::view-transition-group(list1-wrapper)
        │     │  │  └─ ::view-transition-image-pair(list1-wrapper)
        │     │  │     ├─ ::view-transition-old(list1-wrapper)
        │     │  │     └─ ::view-transition-new(list1-wrapper)
        │     │  └─ ::view-transition-group(list2-wrapper)
        │     │     └─ ::view-transition-image-pair(list2-wrapper)
        │     │        ├─ ::view-transition-old(list2-wrapper)
        │     │        └─ ::view-transition-new(list2-wrapper)
        │     └─ ::view-transition-image-pair(lists-wrapper)
        │        ├─ ::view-transition-old(lists-wrapper)
        │        └─ ::view-transition-new(lists-wrapper)
        ├─ div#list1-wrapper
        │  ├─ ul
        │  │  ├─ li#item1
        │  │  ├─ li#item2
        │  │  └─ li#item3
        │  └─ button.reorder
        └─ div#list2-wrapper
           ├─ ul (SCOPE)
           │  ├─ ::view-transition
           │  │  └─ ::view-transition-group(list)
           │  │     ├─ ::view-transition-group-children(list    )
           │  │     │  ├─ ::view-transition-group(item4)
           │  │     │  │  └─ ::view-transition-image-pair(item4)
           │  │     │  │     ├─ ::view-transition-old(item4)
           │  │     │  │     └─ ::view-transition-new(item4)
           │  │     │  ├─ ::view-transition-group(item5)
           │  │     │  │  └─ …
           │  │     │  …
           │  │     └─ ::view-transition-image-pair(list)
           │  │        ├─ ::view-transition-old(list)
           │  │        └─ ::view-transition-new(list)
           │  ├─ li#item4
           │  ├─ li#item5
           │  └─ li#item6
           └─ button.reorder
```

## Learn more

To learn more about element-scoped view transitions, see [the explainer](https://github.com/WICG/view-transitions/blob/main/scoped-transitions.md), [the css-view-transitions-2 specification](https://drafts.csswg.org/css-view-transitions-2/), and the [list of open spec edits](https://github.com/w3c/csswg-drafts/issues?q=is%3Aissue%20state%3Aopen%20label%3Acss-view-transitions-2%20label%3A%22Needs%20Edits%22).
