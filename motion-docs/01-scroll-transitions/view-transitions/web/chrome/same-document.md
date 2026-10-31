---
source: https://developer.chrome.com/docs/web-platform/view-transitions/same-document
title: "Same-document view transitions for single-page applications  |  View Transitions  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Home](https://developer.chrome.com/)
* [Docs](https://developer.chrome.com/docs)
* [Web Platform](https://developer.chrome.com/docs/web-platform)
* [View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions)

# Same-document view transitions for single-page applications Stay organized with collections Save and categorize content based on your preferences.

![Jake Archibald](https://web.dev/images/authors/jakearchibald.jpg)

Jake Archibald

![Bramus](https://web.dev/images/authors/bramus.jpg)

Bramus

Published: Aug 17, 2021, Last updated: Sep 25, 2024

When a view transition runs on a single document it is called a *same-document view transition*. This is typically the case in single-page applications (SPAs) where JavaScript is used to update the DOM. Same-document view transitions are supported in Chrome as of Chrome 111.

To trigger a same-document view transition, call `document.startViewTransition`:

```
function handleClick(e) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow();
    return;
  }

  // With a View Transition:
  document.startViewTransition(() => updateTheDOMSomehow());
}
```

When invoked, the browser automatically captures snapshots of all elements that have a `view-transition-name` CSS property declared on them.

It then executes the passed in callback that updates the DOM, after which it takes snapshots of the new state.

These snapshots are then arranged in a tree of pseudo-elements and animated using the power of CSS animations. Pairs of snapshots from the old and new state smoothly transition from their old position and size to their new location, while their content crossfades. If you want, you can use CSS to customize the animations.

---

## The default transition: Cross-fade

The default view transition is a cross-fade, so it serves as a nice introduction to the API:

```
function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // With a transition:
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
```

Where `updateTheDOMSomehow` changes the DOM to the new state. That can be done however you want. For example, you can add or remove elements, change class names, or change styles.

And just like that, pages cross-fade:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/9rdbsCmBXKOYxOQNjBMI.mp4)

The default cross-fade. [Minimal demo](https://simple-vt-demos.jakearchibald.com/1-cross-fade/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/1-cross-fade).

Okay, a cross-fade isn't that impressive. Thankfully, transitions can be customized, but first, you need to understand how this basic cross-fade worked.

---

## How these transitions work

Let's update the previous code sample.

```
document.startViewTransition(() => updateTheDOMSomehow(data));
```

When `.startViewTransition()` is called, the API captures the current state of the page. This includes taking a snapshot.

Once complete, the callback passed to `.startViewTransition()` is called. That's where the DOM is changed. Then, the API captures the new state of the page.

Once the new state is captured, the API constructs a pseudo-element tree like this:

```
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

The `::view-transition` sits in an overlay, over everything else on the page. This is useful if you want to set a background color for the transition.

`::view-transition-old(root)` is a screenshot of the old view, and `::view-transition-new(root)` is a **live** representation of the new view. Both render as CSS 'replaced content' (like an `<img>`).

The old view animates from `opacity: 1` to `opacity: 0`, while the new view animates from `opacity: 0` to `opacity: 1`, creating a cross-fade.

All of the animation is performed using CSS animations, so they can be customized with CSS.

## Customize the transition

All of the view transition pseudo-elements can be targeted with CSS, and since the animations are defined using CSS, you can modify them using existing CSS animation properties. For example:

```
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 5s;
}
```

With that one change, the fade is now really slow:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/90h6Ppxza6oPqNiMpTPE.mp4)

Long cross-fade. [Minimal demo](https://simple-vt-demos.jakearchibald.com/2-slow-cross-fade/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/2-slow-cross-fade).

Okay, that's still not impressive. Instead, the following code implements [Material Design's shared axis transition](https://material.io/design/motion/the-motion-system.html#shared-axis):

```
@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(30px); }
}

@keyframes slide-to-left {
  to { transform: translateX(-30px); }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
```

And here's the result:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/BRT5dMgEzpixRmrVYKwN.mp4)

Shared axis transition. [Minimal demo](https://simple-vt-demos.jakearchibald.com/3-shared-axis/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/3-shared-axis).

---

## Transition multiple elements

In the previous demo, the whole page is involved in the shared axis transition. That works for most of the page, but it doesn't seem quite right for the heading, as it slides out just to slide back in again.

To avoid this, you can extract the header from the rest of the page so it can be animated separately. This is done by assigning a `view-transition-name` to the element.

```
.main-header {
  view-transition-name: main-header;
}
```

The value of `view-transition-name` can be whatever you want (except for `none`, which means there's no transition name). It's used to *uniquely* identify the element across the transition.

And the result of that:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/zlpY4YFct0LHC6eowSFA.mp4)

Shared axis transition with fixed header. [Minimal demo](https://simple-vt-demos.jakearchibald.com/4-fixed-header/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/4-fixed-header).

Now the header stays in place and cross-fades.

That CSS declaration caused the pseudo-element tree to change:

```
::view-transition
├─ ::view-transition-group(root)
│  └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-group(main-header)
   └─ ::view-transition-image-pair(main-header)
      ├─ ::view-transition-old(main-header)
      └─ ::view-transition-new(main-header)
```

There are now two transition groups. One for the header, and another for the rest. These can be targeted independently with CSS, and given different transitions. Although, in this case `main-header` was left with the default transition, which is a cross-fade.

Well, okay, the default transition isn't just a cross fade, the `::view-transition-group` also transitions:

* Position and transform (using a `transform`)
* Width
* Height

That hasn't mattered until now, as the header is the same size and position both sides of the DOM change. But you can also extract the text in the header:

```
.main-header-text {
  view-transition-name: main-header-text;
  width: fit-content;
}
```

`fit-content` is used so the element is the size of the text, rather than stretching to the remaining width. Without this, the back arrow reduces the size of the header text element, rather than the same size in both pages.

So now we have three parts to play with:

```
::view-transition
├─ ::view-transition-group(root)
│  └─ …
├─ ::view-transition-group(main-header)
│  └─ …
└─ ::view-transition-group(main-header-text)
   └─ …
```

But again, just going with the defaults:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/eXu6vohojllPLNEQScjO.mp4)

Sliding header text. [Minimal demo](https://simple-vt-demos.jakearchibald.com/5-heading-text/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/5-heading-text).

Now the heading text does a little satisfying slide across to make space for the back button.

---

## Animate multiple pseudo-elements in the same way with `view-transition-class`

Browser Support

* ![Chrome: 125.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='-10 -10 276 276'%3E%3ClinearGradient id='a' x1='145' x2='34' y1='253' y2='61' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231e8e3e'/%3E%3Cstop offset='1' stop-color='%2334a853'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='111' x2='222' y1='254' y2='62' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fcc934'/%3E%3Cstop offset='1' stop-color='%23fbbc04'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='17' x2='239' y1='80' y2='80' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d93025'/%3E%3Cstop offset='1' stop-color='%23ea4335'/%3E%3C/linearGradient%3E%3Ccircle cx='128' cy='128' r='64' fill='%23fff'/%3E%3Cpath fill='url(%23a)' d='M96 183a64 64 0 0 1-23-23L17 64a128 128 0 0 0 111 192l55-96a64 64 0 0 1-87 23Z'/%3E%3Cpath fill='url(%23b)' d='M192 128a64 64 0 0 1-9 32l-55 96A128 128 0 0 0 239 64H128a64 64 0 0 1 64 64Z'/%3E%3Ccircle cx='128' cy='128' r='52' fill='%231a73e8'/%3E%3Cpath fill='url(%23c)' d='M96 73a64 64 0 0 1 32-9h111a128 128 0 0 0-222 0l56 96a64 64 0 0 1 23-87Z'/%3E%3C/svg%3E)

  125
* ![Edge: 125.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 27600 27600'%3E%3ClinearGradient id='A' gradientUnits='userSpaceOnUse'/%3E%3ClinearGradient id='B' x1='6870' x2='24704' y1='18705' y2='18705' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%230c59a4'/%3E%3Cstop offset='1' stop-color='%23114a8b'/%3E%3C/linearGradient%3E%3ClinearGradient id='C' x1='16272' x2='5133' y1='10968' y2='23102' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%231b9de2'/%3E%3Cstop offset='.16' stop-color='%231595df'/%3E%3Cstop offset='.67' stop-color='%230680d7'/%3E%3Cstop offset='1' stop-color='%230078d4'/%3E%3C/linearGradient%3E%3CradialGradient id='D' cx='16720' cy='18747' r='9538' xlink:href='%23A'%3E%3Cstop offset='.72' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.53'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='E' cx='7130' cy='19866' r='14324' gradientTransform='matrix(.14843 -.98892 .79688 .1196 -8759 25542)' xlink:href='%23A'%3E%3Cstop offset='.76' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.5'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='F' cx='2523' cy='4680' r='20243' gradientTransform='matrix(-.03715 .99931 -2.12836 -.07913 13579 3530)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2335c1f1'/%3E%3Cstop offset='.11' stop-color='%2334c1ed'/%3E%3Cstop offset='.23' stop-color='%232fc2df'/%3E%3Cstop offset='.31' stop-color='%232bc3d2'/%3E%3Cstop offset='.67' stop-color='%2336c752'/%3E%3C/radialGradient%3E%3CradialGradient id='G' cx='24247' cy='7758' r='9734' gradientTransform='matrix(.28109 .95968 -.78353 .22949 24510 -16292)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2366eb6e'/%3E%3Cstop offset='1' stop-color='%2366eb6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath id='H' d='M24105 20053a9345 9345 0 01-1053 472 10202 10202 0 01-3590 646c-4732 0-8855-3255-8855-7432 0-1175 680-2193 1643-2729-4280 180-5380 4640-5380 7253 0 7387 6810 8137 8276 8137 791 0 1984-230 2704-456l130-44a12834 12834 0 006660-5282c220-350-168-757-535-565z'/%3E%3Cpath id='I' d='M11571 25141a7913 7913 0 01-2273-2137 8145 8145 0 01-1514-4740 8093 8093 0 013093-6395 8082 8082 0 011373-859c312-148 846-414 1554-404a3236 3236 0 012569 1297 3184 3184 0 01636 1866c0-21 2446-7960-8005-7960-4390 0-8004 4166-8004 7820 0 2319 538 4170 1212 5604a12833 12833 0 007684 6757 12795 12795 0 003908 610c1414 0 2774-233 4045-656a7575 7575 0 01-6278-803z'/%3E%3Cpath id='J' d='M16231 15886c-80 105-330 250-330 566 0 260 170 512 472 723 1438 1003 4149 868 4156 868a5954 5954 0 003027-839 6147 6147 0 001133-850 6180 6180 0 001910-4437c26-2242-796-3732-1133-4392-2120-4141-6694-6525-11668-6525-7011 0-12703 5635-12798 12620 47-3654 3679-6605 7996-6605 350 0 2346 34 4200 1007 1634 858 2490 1894 3086 2921 618 1067 728 2415 728 2952s-271 1333-780 1990z'/%3E%3Cuse fill='url(%23B)' xlink:href='%23H'/%3E%3Cuse fill='url(%23D)' opacity='.35' xlink:href='%23H'/%3E%3Cuse fill='url(%23C)' xlink:href='%23I'/%3E%3Cuse fill='url(%23E)' opacity='.4' xlink:href='%23I'/%3E%3Cuse fill='url(%23F)' xlink:href='%23J'/%3E%3Cuse fill='url(%23G)' xlink:href='%23J'/%3E%3C/svg%3E)

  125
* ![Firefox: 144.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CradialGradient id='ff-b' cx='428.5' cy='55.1' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23ffbd4f'/%3E%3Cstop offset='.2' stop-color='%23ffac31'/%3E%3Cstop offset='.3' stop-color='%23ff9d17'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff563b'/%3E%3Cstop offset='.5' stop-color='%23ff3750'/%3E%3Cstop offset='.7' stop-color='%23f5156c'/%3E%3Cstop offset='.8' stop-color='%23eb0878'/%3E%3Cstop offset='.9' stop-color='%23e50080'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-c' cx='245.4' cy='259.9' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%23960e18'/%3E%3Cstop offset='.3' stop-color='%23b11927' stop-opacity='.7'/%3E%3Cstop offset='.4' stop-color='%23db293d' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%23f5334b' stop-opacity='.1'/%3E%3Cstop offset='.5' stop-color='%23ff3750' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-d' cx='305.8' cy='-58.6' r='363' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.3' stop-color='%23ffdc3e'/%3E%3Cstop offset='.5' stop-color='%23ff9d12'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-e' cx='190' cy='390.8' r='238.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%233a8ee6'/%3E%3Cstop offset='.5' stop-color='%235c79f0'/%3E%3Cstop offset='.7' stop-color='%239059ff'/%3E%3Cstop offset='1' stop-color='%23c139e6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-f' cx='252.2' cy='201.3' r='126.5' gradientTransform='matrix(1 0 0 1 -48 31)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%239059ff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%238c4ff3' stop-opacity='.1'/%3E%3Cstop offset='.8' stop-color='%237716a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%236e008b' stop-opacity='.6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-g' cx='239.1' cy='34.6' r='171.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffe226'/%3E%3Cstop offset='.1' stop-color='%23ffdb27'/%3E%3Cstop offset='.3' stop-color='%23ffc82a'/%3E%3Cstop offset='.5' stop-color='%23ffa930'/%3E%3Cstop offset='.7' stop-color='%23ff7e37'/%3E%3Cstop offset='.8' stop-color='%23ff7139'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-h' cx='374' cy='-74.3' r='732.2' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-i' cx='304.6' cy='7.1' r='536.4' gradientTransform='rotate(84 303 4)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.6' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-j' cx='235' cy='98.1' r='457.1' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-k' cx='355.7' cy='124.9' r='500.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.2' stop-color='%23ffe141'/%3E%3Cstop offset='.5' stop-color='%23ffaf1e'/%3E%3Cstop offset='.6' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3ClinearGradient id='ff-a' x1='446.9' y1='76.8' x2='47.9' y2='461.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.4' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.5' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/linearGradient%3E%3ClinearGradient id='ff-l' x1='442.1' y1='74.8' x2='102.6' y2='414.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23fff44f' stop-opacity='.8'/%3E%3Cstop offset='.3' stop-color='%23fff44f' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23fff44f' stop-opacity='.2'/%3E%3Cstop offset='.6' stop-color='%23fff44f' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134a120 120 0 0 0-66 25 71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a229 229 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zM202 355l3 1-3-1zm55-145zm198-31z' fill='url(%23ff-a)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-b)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-c)'/%3E%3Cpath d='m362 195 1 1a130 130 0 0 0-22-29C266 92 322 5 331 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62z' fill='url(%23ff-d)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-e)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-f)'/%3E%3Cpath d='m171 151 5 3a111 111 0 0 1-1-58c-25 11-44 29-58 44 1 0 36 0 54 11z' fill='url(%23ff-g)'/%3E%3Cpath d='M18 261a242 242 0 0 0 231 197 207 207 0 0 0 206-279c8 56-20 110-64 146-86 71-169 43-186 31l-3-1c-50-24-71-70-67-110-42 0-57-35-57-35s38-28 89-4c46 22 90 4 90 4 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5l-5-3c-18-11-52-11-54-11-9-12-9-51-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73c0 1-9 38-5 57z' fill='url(%23ff-h)'/%3E%3Cpath d='M341 167a130 130 0 0 1 22 29 46 46 0 0 1 4 3c55 50 26 121 24 126 44-36 72-90 64-146-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-9 5-65 92 10 167z' fill='url(%23ff-i)'/%3E%3Cpath d='M367 199a46 46 0 0 0-4-3l-1-1c-13-9-36-18-58-15 86 44 63 193-57 187a107 107 0 0 1-31-6 131 131 0 0 1-11-5c17 12 99 39 186-31 2-5 31-76-24-126z' fill='url(%23ff-j)'/%3E%3Cpath d='M148 277s12-41 80-41c7 0 28-20 29-26s-44 18-90-4c-51-24-89 4-89 4s15 35 57 35c-4 40 16 85 67 110l3 1c-29-15-54-44-57-79z' fill='url(%23ff-k)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62-13-9-36-18-58-14 86 43 63 192-57 186a107 107 0 0 1-31-6 131 131 0 0 1-11-5l-3-1 3 1c-29-15-54-44-57-79 0 0 12-41 80-41 7 0 28-20 29-26 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a279 279 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zm-24 13z' fill='url(%23ff-l)'/%3E%3C/svg%3E)

  144
* ![Safari: 18.2.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='195 190 135 135'%3E%3Cdefs%3E%3ClinearGradient id='s-a' x1='132.6' x2='134.4' y1='111.7' y2='-105.3' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23d2d2d2' /%3E%3Cstop offset='.5' stop-color='%23f2f2f2' /%3E%3Cstop offset='1' stop-color='%23fff' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-b' gradientUnits='userSpaceOnUse' /%3E%3ClinearGradient id='s-c' x1='65.4' x2='67.4' y1='115.7' y2='17.1' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23005ad5' /%3E%3Cstop offset='.2' stop-color='%230875f0' /%3E%3Cstop offset='.3' stop-color='%23218cee' /%3E%3Cstop offset='.6' stop-color='%2327a5f3' /%3E%3Cstop offset='.8' stop-color='%2325aaf2' /%3E%3Cstop offset='1' stop-color='%2321aaef' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-d' x1='158.7' x2='176.3' y1='96.7' y2='79.5' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23c72e24' /%3E%3Cstop offset='1' stop-color='%23fd3b2f' /%3E%3C/linearGradient%3E%3CradialGradient id='s-i' cx='-69.9' cy='69.3' r='54' gradientTransform='matrix(.9 -.01 .04 2.72 -9 -120)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%2324a5f3' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%231e8ceb' /%3E%3C/radialGradient%3E%3CradialGradient id='s-j' cx='109.3' cy='13.8' r='93.1' gradientTransform='matrix(-.02 1.1 -1.04 -.02 137 -115)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235488d6' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235d96eb' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='220' height='220' x='22' y='-107' fill='url(%23s-a)' ry='49' transform='matrix(.57 0 0 .57 187 256)' /%3E%3Cg transform='translate(194 190)'%3E%3Ccircle cx='67.8' cy='67.7' fill='url(%23s-c)' paint-order='stroke fill markers' r='54' /%3E%3Ccircle cx='-69.9' cy='69.3' fill='url(%23s-i)' transform='translate(138 -2)' r='54' /%3E%3C/g%3E%3Cellipse cx='120' cy='14.2' fill='url(%23s-j)' rx='93.1' ry='93.7' transform='matrix(.58 0 0 .58 192 250)' /%3E%3Cg transform='matrix(.58 0 0 .57 197 182)'%3E%3Cpath fill='%23cac7c8' d='M46 192h1l72-48-7-9-66 57Z' /%3E%3Cpath fill='%23fbfffc' d='M46 191v1l66-57-7-9-59 65Z' /%3E%3Cpath fill='url(%23s-d)' d='m119 144-7-9 66-57-59 66Z' /%3E%3Cpath fill='%23fb645c' d='m105 126 7 9 66-57-1-1-72 49Z' /%3E%3C/g%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='1' stroke-width='1.3' d='m287 278 3-2m-12-17 8-2m-8-3h4m-4-13 8 2m-8 3h4m-1-13 7 3m-4-11 7 4m-2-11 6 6m0-12 6 7m1-11 4 6m4-10 3 7m5-9 2 7m15-7-1 7m10-5-3 7m11-4-4 7m11-2-5 6m16 7-7 4m10 4-7 3m10 6-8 1m8 16-8-2m5 10-7-3m4 11-7-4m2 11-6-5m0 11-5-6m-2 11-4-7m-4 11-3-8m-6 10-1-8m-16 8 2-8m-10 5 3-7m-11 4 4-7m-11 2 5-6m-8 3 3-3m4 8 2-3m5 8 2-4m6 7 1-4m8 5v-4m8 4v-4m9 3-1-4m9 1-2-4m9 0-2-4m9-2-3-3m8-4-3-2m8-5-4-2m7-6-4-1m5-8h-4m4-8h-4m3-9-4 1m1-9-4 2m-1-9-3 2m-2-9-3 3m-4-8-2 3m-5-8-2 4m-6-6-1 3m-8-5v4m-8-4v4m-9-2 1 3m-9 0 2 3m-9 1 2 3m-9 2 3 3m-8 4 3 2m-8 5 4 2m-7 6 4 1m-4 25 4-1m-2 5 7-3m-6 7 4-2m-2 6 7-4m-13-21h8m41-41v-8m0 99v-8m49-42h-8' transform='translate(-65 8)' /%3E%3C/svg%3E)

  18.2

[Source](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class)

Say you have a view transition with a bunch of cards but also a title on the page. To animate all cards except the title, you have to write a selector that targets each and every individual card.

```
h1 {
    view-transition-name: title;
}
::view-transition-group(title) {
    animation-timing-function: ease-in-out;
}

#card1 { view-transition-name: card1; }
#card2 { view-transition-name: card2; }
#card3 { view-transition-name: card3; }
#card4 { view-transition-name: card4; }
…
#card20 { view-transition-name: card20; }

::view-transition-group(card1),
::view-transition-group(card2),
::view-transition-group(card3),
::view-transition-group(card4),
…
::view-transition-group(card20) {
    animation-timing-function: var(--bounce);
}
```

Got 20 elements? That's 20 selectors you need to write. Adding a new element? Then you also need to grow the selector that applies the animation styles. Not exactly scalable.

The `view-transition-class` can be used in the view transition pseudo-elements to apply the same style rule.

```
#card1 { view-transition-name: card1; }
#card2 { view-transition-name: card2; }
#card3 { view-transition-name: card3; }
#card4 { view-transition-name: card4; }
#card5 { view-transition-name: card5; }
…
#card20 { view-transition-name: card20; }

#cards-wrapper > div {
  view-transition-class: card;
}
html::view-transition-group(.card) {
  animation-timing-function: var(--bounce);
}
```

The [following cards example](https://view-transitions.chrome.dev/cards/spa/) leverages the previous CSS snippet. All cards–including newly added ones–get the same timing applied with one selector: `html::view-transition-group(.card)`.

[](/static/docs/web-platform/view-transitions/video/cards.mp4)

Recording of the [Cards demo](https://view-transitions.chrome.dev/cards/spa/). Using `view-transition-class` it applies the same `animation-timing-function` to all cards except the added or removed ones.

---

## Debug transitions

Since view transitions are built on top of CSS animations, the **Animations** panel in Chrome DevTools is great for debugging transitions.

Using the **Animations** panel, you can pause the next animation, then scrub back and forth through the animation. During this, the transition pseudo-elements can be found in the **Elements** panel.

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/DMH7qPqMszyVbTYOA2zd.mp4)

Debugging view transitions with Chrome DevTools.

## Transitioning elements don't need to be the same DOM element

So far we've used `view-transition-name` to create separate transition elements for the header, and the text in the header. These are conceptually the same element before and after the DOM change, but you can create transitions where that isn't the case.

For example, the main video embed can be given a `view-transition-name`:

```
.full-embed {
  view-transition-name: full-embed;
}
```

Then, when the thumbnail is clicked, it can be given the same `view-transition-name`, just for the duration of the transition:

```
thumbnail.onclick = async () => {
  thumbnail.style.viewTransitionName = 'full-embed';

  document.startViewTransition(() => {
    thumbnail.style.viewTransitionName = '';
    updateTheDOMSomehow();
  });
};
```

And the result:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/283vqtaDXSaGRTn5nEEn.mp4)

One element transitioning to another. [Minimal demo](https://simple-vt-demos.jakearchibald.com/6-expanding-image/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/6-expanding-image).

The thumbnail now transitions into the main image. Even though they're conceptually (and literally) different elements, the transition API treats them as the same thing because they shared the same `view-transition-name`.

The real code for this transition is a little more complicated than the preceding example, as it also handles the transition back to the thumbnail page. [See the source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/6-expanding-image) for the full implementation.

---

## Custom entry and exit transitions

Look at this example:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/uXSSraCaMIvu7nbWv0XS.mp4)

Entering and exiting sidebar. [Minimal demo](https://simple-vt-demos.jakearchibald.com/enter-exit-sidebar/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/enter-exit-sidebar).

The sidebar is part of the transition:

```
.sidebar {
  view-transition-name: sidebar;
}
```

But, unlike the header in the previous example, the sidebar doesn't appear on all pages. If both states have the sidebar, the transition pseudo-elements look like this:

```
::view-transition
├─ …other transition groups…
└─ ::view-transition-group(sidebar)
   └─ ::view-transition-image-pair(sidebar)
      ├─ ::view-transition-old(sidebar)
      └─ ::view-transition-new(sidebar)
```

However, if the sidebar is only on the new page, the `::view-transition-old(sidebar)` pseudo-element won't be there. Since there's no 'old' image for the sidebar, the image-pair will only have a `::view-transition-new(sidebar)`. Similarly, if the sidebar is only on the old page, the image-pair will only have a `::view-transition-old(sidebar)`.

In the previous demo, the sidebar transitions differently depending on whether it's entering, exiting, or present in both states. It enters by sliding from the right and fading in, it exits by sliding to the right and fading out, and it stays in place when it's present in both states.

To create specific entry and exit transitions, you can use the [`:only-child` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:only-child) to target the old or new pseudo-elements when it's the only child in the image-pair:

```
/* Entry transition */
::view-transition-new(sidebar):only-child {
  animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

/* Exit transition */
::view-transition-old(sidebar):only-child {
  animation: 150ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
}
```

In this case, there's no specific transition for when the sidebar is present in both states, since the default is perfect.

## Async DOM updates, and waiting for content

The callback passed to `.startViewTransition()` can return a promise, which allows for async DOM updates, and waiting for important content to be ready.

```
document.startViewTransition(async () => {
  await something;
  await updateTheDOMSomehow();
  await somethingElse;
});
```

The transition won't be started until the promise fulfills. During this time, the page is frozen, so delays here should be kept to a minimum. Specifically, network fetches should be done before calling `.startViewTransition()`, while the page is still fully interactive, rather than doing them as part of the `.startViewTransition()` callback.

If you decide to wait for images or fonts to be ready, be sure to use an aggressive timeout:

```
const wait = ms => new Promise(r => setTimeout(r, ms));

document.startViewTransition(async () => {
  updateTheDOMSomehow();

  // Pause for up to 100ms for fonts to be ready:
  await Promise.race([document.fonts.ready, wait(100)]);
});
```

However, in some cases it's better to avoid the delay altogether, and use the content you already have.

---

### Make the most of content you already have

In the case where the thumbnail transitions to a larger image:

[ ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/283vqtaDXSaGRTn5nEEn.mp4)

The thumbnail transitioning to a larger image. [Try the demo site](https://http203-playlist.netlify.app/).

The default transition is to cross-fade, which means the thumbnail could be cross-fading with a not-yet-loaded full image.

One way to handle this is to wait for the full image to load before starting the transition. Ideally this would be done before calling `.startViewTransition()`, so the page remains interactive, and a spinner can be shown to indicate to the user that things are loading. But in this case there's a better way:

```
::view-transition-old(full-embed),
::view-transition-new(full-embed) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
}
```

Now the thumbnail doesn't fade away, it just sits underneath the full image. This means if the new view hasn't loaded, the thumbnail is visible throughout the transition. This means the transition can start straight away, and the full image can load in its own time.

This wouldn't work if the new view featured transparency, but in this case we know it doesn't, so we can make this optimization.

## Handle changes in aspect ratio

Conveniently, all the transitions so far have been to elements with the same aspect ratio, but that won't always be the case. What if the thumbnail is 1:1, and the main image is 16:9?

[ ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/gXiaS9IpE70fnv4kkrK5.mp4)

One element transitioning to another, with an aspect ratio change. [Minimal demo](https://simple-vt-demos.jakearchibald.com/7-expanding-image-ratio/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/7-expanding-image-ratio).

In the default transition, the group animates from the before size to the after size. The old and new views are 100% width of the group, and auto height, meaning they keep their aspect ratio regardless of the group's size.

This is a good default, but it isn't what is wanted in this case. So:

```
::view-transition-old(full-embed),
::view-transition-new(full-embed) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
  /* Make the height the same as the group,
  meaning the view size might not match its aspect-ratio. */
  height: 100%;
  /* Clip any overflow of the view */
  overflow: clip;
}

/* The old view is the thumbnail */
::view-transition-old(full-embed) {
  /* Maintain the aspect ratio of the view,
  by shrinking it to fit within the bounds of the element */
  object-fit: contain;
}

/* The new view is the full image */
::view-transition-new(full-embed) {
  /* Maintain the aspect ratio of the view,
  by growing it to cover the bounds of the element */
  object-fit: cover;
}
```

This means the thumbnail stays in the center of the element as the width expands, but the full image 'un-crops' as it transitions from 1:1 to 16:9.

For more detailed information, check out [View transitions: Handling aspect ratio changes](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/)

---

## Use media queries to change transitions for different device states

You may want to use different transitions on mobile versus desktop, such as this example which performs a full slide from the side on mobile, but a more subtle slide on desktop:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/NSCx5JTmzyJPOu6rrpeT.mp4)

One element transitioning to another. [Minimal demo](https://simple-vt-demos.jakearchibald.com/media-queries/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/media-queries).

This can be achieved using regular media queries:

```
/* Transitions for mobile */
::view-transition-old(root) {
  animation: 300ms ease-out both full-slide-to-left;
}

::view-transition-new(root) {
  animation: 300ms ease-out both full-slide-from-right;
}

@media (min-width: 500px) {
  /* Overrides for larger displays.
  This is the shared axis transition from earlier in the article. */
  ::view-transition-old(root) {
    animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  ::view-transition-new(root) {
    animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
}
```

You may also want to change which elements you assign a `view-transition-name` depending on matching media queries.

---

### React to the 'reduced motion' preference

Users can indicate they prefer reduced motion through their operating system, and that preference is [exposed in CSS](https://web.dev/articles/prefers-reduced-motion).

You could chose to prevent any transitions for these users:

```
@media (prefers-reduced-motion) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

However, a preference for 'reduced motion' doesn't mean the user wants *no motion*. Instead of the preceding snippet, you could choose a more subtle animation, but one that still expresses the relationship between elements, and the flow of data.

---

## Handle multiple view transition styles with view transition types

Browser Support

* ![Chrome: 125.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='-10 -10 276 276'%3E%3ClinearGradient id='a' x1='145' x2='34' y1='253' y2='61' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231e8e3e'/%3E%3Cstop offset='1' stop-color='%2334a853'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='111' x2='222' y1='254' y2='62' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fcc934'/%3E%3Cstop offset='1' stop-color='%23fbbc04'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='17' x2='239' y1='80' y2='80' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d93025'/%3E%3Cstop offset='1' stop-color='%23ea4335'/%3E%3C/linearGradient%3E%3Ccircle cx='128' cy='128' r='64' fill='%23fff'/%3E%3Cpath fill='url(%23a)' d='M96 183a64 64 0 0 1-23-23L17 64a128 128 0 0 0 111 192l55-96a64 64 0 0 1-87 23Z'/%3E%3Cpath fill='url(%23b)' d='M192 128a64 64 0 0 1-9 32l-55 96A128 128 0 0 0 239 64H128a64 64 0 0 1 64 64Z'/%3E%3Ccircle cx='128' cy='128' r='52' fill='%231a73e8'/%3E%3Cpath fill='url(%23c)' d='M96 73a64 64 0 0 1 32-9h111a128 128 0 0 0-222 0l56 96a64 64 0 0 1 23-87Z'/%3E%3C/svg%3E)

  125
* ![Edge: 125.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 27600 27600'%3E%3ClinearGradient id='A' gradientUnits='userSpaceOnUse'/%3E%3ClinearGradient id='B' x1='6870' x2='24704' y1='18705' y2='18705' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%230c59a4'/%3E%3Cstop offset='1' stop-color='%23114a8b'/%3E%3C/linearGradient%3E%3ClinearGradient id='C' x1='16272' x2='5133' y1='10968' y2='23102' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%231b9de2'/%3E%3Cstop offset='.16' stop-color='%231595df'/%3E%3Cstop offset='.67' stop-color='%230680d7'/%3E%3Cstop offset='1' stop-color='%230078d4'/%3E%3C/linearGradient%3E%3CradialGradient id='D' cx='16720' cy='18747' r='9538' xlink:href='%23A'%3E%3Cstop offset='.72' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.53'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='E' cx='7130' cy='19866' r='14324' gradientTransform='matrix(.14843 -.98892 .79688 .1196 -8759 25542)' xlink:href='%23A'%3E%3Cstop offset='.76' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.5'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='F' cx='2523' cy='4680' r='20243' gradientTransform='matrix(-.03715 .99931 -2.12836 -.07913 13579 3530)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2335c1f1'/%3E%3Cstop offset='.11' stop-color='%2334c1ed'/%3E%3Cstop offset='.23' stop-color='%232fc2df'/%3E%3Cstop offset='.31' stop-color='%232bc3d2'/%3E%3Cstop offset='.67' stop-color='%2336c752'/%3E%3C/radialGradient%3E%3CradialGradient id='G' cx='24247' cy='7758' r='9734' gradientTransform='matrix(.28109 .95968 -.78353 .22949 24510 -16292)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2366eb6e'/%3E%3Cstop offset='1' stop-color='%2366eb6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath id='H' d='M24105 20053a9345 9345 0 01-1053 472 10202 10202 0 01-3590 646c-4732 0-8855-3255-8855-7432 0-1175 680-2193 1643-2729-4280 180-5380 4640-5380 7253 0 7387 6810 8137 8276 8137 791 0 1984-230 2704-456l130-44a12834 12834 0 006660-5282c220-350-168-757-535-565z'/%3E%3Cpath id='I' d='M11571 25141a7913 7913 0 01-2273-2137 8145 8145 0 01-1514-4740 8093 8093 0 013093-6395 8082 8082 0 011373-859c312-148 846-414 1554-404a3236 3236 0 012569 1297 3184 3184 0 01636 1866c0-21 2446-7960-8005-7960-4390 0-8004 4166-8004 7820 0 2319 538 4170 1212 5604a12833 12833 0 007684 6757 12795 12795 0 003908 610c1414 0 2774-233 4045-656a7575 7575 0 01-6278-803z'/%3E%3Cpath id='J' d='M16231 15886c-80 105-330 250-330 566 0 260 170 512 472 723 1438 1003 4149 868 4156 868a5954 5954 0 003027-839 6147 6147 0 001133-850 6180 6180 0 001910-4437c26-2242-796-3732-1133-4392-2120-4141-6694-6525-11668-6525-7011 0-12703 5635-12798 12620 47-3654 3679-6605 7996-6605 350 0 2346 34 4200 1007 1634 858 2490 1894 3086 2921 618 1067 728 2415 728 2952s-271 1333-780 1990z'/%3E%3Cuse fill='url(%23B)' xlink:href='%23H'/%3E%3Cuse fill='url(%23D)' opacity='.35' xlink:href='%23H'/%3E%3Cuse fill='url(%23C)' xlink:href='%23I'/%3E%3Cuse fill='url(%23E)' opacity='.4' xlink:href='%23I'/%3E%3Cuse fill='url(%23F)' xlink:href='%23J'/%3E%3Cuse fill='url(%23G)' xlink:href='%23J'/%3E%3C/svg%3E)

  125
* ![Firefox: 144.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CradialGradient id='ff-b' cx='428.5' cy='55.1' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23ffbd4f'/%3E%3Cstop offset='.2' stop-color='%23ffac31'/%3E%3Cstop offset='.3' stop-color='%23ff9d17'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff563b'/%3E%3Cstop offset='.5' stop-color='%23ff3750'/%3E%3Cstop offset='.7' stop-color='%23f5156c'/%3E%3Cstop offset='.8' stop-color='%23eb0878'/%3E%3Cstop offset='.9' stop-color='%23e50080'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-c' cx='245.4' cy='259.9' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%23960e18'/%3E%3Cstop offset='.3' stop-color='%23b11927' stop-opacity='.7'/%3E%3Cstop offset='.4' stop-color='%23db293d' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%23f5334b' stop-opacity='.1'/%3E%3Cstop offset='.5' stop-color='%23ff3750' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-d' cx='305.8' cy='-58.6' r='363' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.3' stop-color='%23ffdc3e'/%3E%3Cstop offset='.5' stop-color='%23ff9d12'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-e' cx='190' cy='390.8' r='238.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%233a8ee6'/%3E%3Cstop offset='.5' stop-color='%235c79f0'/%3E%3Cstop offset='.7' stop-color='%239059ff'/%3E%3Cstop offset='1' stop-color='%23c139e6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-f' cx='252.2' cy='201.3' r='126.5' gradientTransform='matrix(1 0 0 1 -48 31)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%239059ff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%238c4ff3' stop-opacity='.1'/%3E%3Cstop offset='.8' stop-color='%237716a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%236e008b' stop-opacity='.6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-g' cx='239.1' cy='34.6' r='171.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffe226'/%3E%3Cstop offset='.1' stop-color='%23ffdb27'/%3E%3Cstop offset='.3' stop-color='%23ffc82a'/%3E%3Cstop offset='.5' stop-color='%23ffa930'/%3E%3Cstop offset='.7' stop-color='%23ff7e37'/%3E%3Cstop offset='.8' stop-color='%23ff7139'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-h' cx='374' cy='-74.3' r='732.2' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-i' cx='304.6' cy='7.1' r='536.4' gradientTransform='rotate(84 303 4)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.6' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-j' cx='235' cy='98.1' r='457.1' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-k' cx='355.7' cy='124.9' r='500.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.2' stop-color='%23ffe141'/%3E%3Cstop offset='.5' stop-color='%23ffaf1e'/%3E%3Cstop offset='.6' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3ClinearGradient id='ff-a' x1='446.9' y1='76.8' x2='47.9' y2='461.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.4' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.5' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/linearGradient%3E%3ClinearGradient id='ff-l' x1='442.1' y1='74.8' x2='102.6' y2='414.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23fff44f' stop-opacity='.8'/%3E%3Cstop offset='.3' stop-color='%23fff44f' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23fff44f' stop-opacity='.2'/%3E%3Cstop offset='.6' stop-color='%23fff44f' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134a120 120 0 0 0-66 25 71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a229 229 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zM202 355l3 1-3-1zm55-145zm198-31z' fill='url(%23ff-a)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-b)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-c)'/%3E%3Cpath d='m362 195 1 1a130 130 0 0 0-22-29C266 92 322 5 331 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62z' fill='url(%23ff-d)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-e)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-f)'/%3E%3Cpath d='m171 151 5 3a111 111 0 0 1-1-58c-25 11-44 29-58 44 1 0 36 0 54 11z' fill='url(%23ff-g)'/%3E%3Cpath d='M18 261a242 242 0 0 0 231 197 207 207 0 0 0 206-279c8 56-20 110-64 146-86 71-169 43-186 31l-3-1c-50-24-71-70-67-110-42 0-57-35-57-35s38-28 89-4c46 22 90 4 90 4 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5l-5-3c-18-11-52-11-54-11-9-12-9-51-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73c0 1-9 38-5 57z' fill='url(%23ff-h)'/%3E%3Cpath d='M341 167a130 130 0 0 1 22 29 46 46 0 0 1 4 3c55 50 26 121 24 126 44-36 72-90 64-146-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-9 5-65 92 10 167z' fill='url(%23ff-i)'/%3E%3Cpath d='M367 199a46 46 0 0 0-4-3l-1-1c-13-9-36-18-58-15 86 44 63 193-57 187a107 107 0 0 1-31-6 131 131 0 0 1-11-5c17 12 99 39 186-31 2-5 31-76-24-126z' fill='url(%23ff-j)'/%3E%3Cpath d='M148 277s12-41 80-41c7 0 28-20 29-26s-44 18-90-4c-51-24-89 4-89 4s15 35 57 35c-4 40 16 85 67 110l3 1c-29-15-54-44-57-79z' fill='url(%23ff-k)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62-13-9-36-18-58-14 86 43 63 192-57 186a107 107 0 0 1-31-6 131 131 0 0 1-11-5l-3-1 3 1c-29-15-54-44-57-79 0 0 12-41 80-41 7 0 28-20 29-26 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a279 279 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zm-24 13z' fill='url(%23ff-l)'/%3E%3C/svg%3E)

  144
* ![Safari: 18.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='195 190 135 135'%3E%3Cdefs%3E%3ClinearGradient id='s-a' x1='132.6' x2='134.4' y1='111.7' y2='-105.3' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23d2d2d2' /%3E%3Cstop offset='.5' stop-color='%23f2f2f2' /%3E%3Cstop offset='1' stop-color='%23fff' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-b' gradientUnits='userSpaceOnUse' /%3E%3ClinearGradient id='s-c' x1='65.4' x2='67.4' y1='115.7' y2='17.1' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23005ad5' /%3E%3Cstop offset='.2' stop-color='%230875f0' /%3E%3Cstop offset='.3' stop-color='%23218cee' /%3E%3Cstop offset='.6' stop-color='%2327a5f3' /%3E%3Cstop offset='.8' stop-color='%2325aaf2' /%3E%3Cstop offset='1' stop-color='%2321aaef' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-d' x1='158.7' x2='176.3' y1='96.7' y2='79.5' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23c72e24' /%3E%3Cstop offset='1' stop-color='%23fd3b2f' /%3E%3C/linearGradient%3E%3CradialGradient id='s-i' cx='-69.9' cy='69.3' r='54' gradientTransform='matrix(.9 -.01 .04 2.72 -9 -120)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%2324a5f3' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%231e8ceb' /%3E%3C/radialGradient%3E%3CradialGradient id='s-j' cx='109.3' cy='13.8' r='93.1' gradientTransform='matrix(-.02 1.1 -1.04 -.02 137 -115)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235488d6' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235d96eb' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='220' height='220' x='22' y='-107' fill='url(%23s-a)' ry='49' transform='matrix(.57 0 0 .57 187 256)' /%3E%3Cg transform='translate(194 190)'%3E%3Ccircle cx='67.8' cy='67.7' fill='url(%23s-c)' paint-order='stroke fill markers' r='54' /%3E%3Ccircle cx='-69.9' cy='69.3' fill='url(%23s-i)' transform='translate(138 -2)' r='54' /%3E%3C/g%3E%3Cellipse cx='120' cy='14.2' fill='url(%23s-j)' rx='93.1' ry='93.7' transform='matrix(.58 0 0 .58 192 250)' /%3E%3Cg transform='matrix(.58 0 0 .57 197 182)'%3E%3Cpath fill='%23cac7c8' d='M46 192h1l72-48-7-9-66 57Z' /%3E%3Cpath fill='%23fbfffc' d='M46 191v1l66-57-7-9-59 65Z' /%3E%3Cpath fill='url(%23s-d)' d='m119 144-7-9 66-57-59 66Z' /%3E%3Cpath fill='%23fb645c' d='m105 126 7 9 66-57-1-1-72 49Z' /%3E%3C/g%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='1' stroke-width='1.3' d='m287 278 3-2m-12-17 8-2m-8-3h4m-4-13 8 2m-8 3h4m-1-13 7 3m-4-11 7 4m-2-11 6 6m0-12 6 7m1-11 4 6m4-10 3 7m5-9 2 7m15-7-1 7m10-5-3 7m11-4-4 7m11-2-5 6m16 7-7 4m10 4-7 3m10 6-8 1m8 16-8-2m5 10-7-3m4 11-7-4m2 11-6-5m0 11-5-6m-2 11-4-7m-4 11-3-8m-6 10-1-8m-16 8 2-8m-10 5 3-7m-11 4 4-7m-11 2 5-6m-8 3 3-3m4 8 2-3m5 8 2-4m6 7 1-4m8 5v-4m8 4v-4m9 3-1-4m9 1-2-4m9 0-2-4m9-2-3-3m8-4-3-2m8-5-4-2m7-6-4-1m5-8h-4m4-8h-4m3-9-4 1m1-9-4 2m-1-9-3 2m-2-9-3 3m-4-8-2 3m-5-8-2 4m-6-6-1 3m-8-5v4m-8-4v4m-9-2 1 3m-9 0 2 3m-9 1 2 3m-9 2 3 3m-8 4 3 2m-8 5 4 2m-7 6 4 1m-4 25 4-1m-2 5 7-3m-6 7 4-2m-2 6 7-4m-13-21h8m41-41v-8m0 99v-8m49-42h-8' transform='translate(-65 8)' /%3E%3C/svg%3E)

  18

[Source](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:active-view-transition)

Sometimes a transition from one particular view to another should have a specifically tailored transition. For example, when going to the next or to the previous page in a pagination sequence, you might want to slide the contents in a different direction depending on whether you are going to a higher page or a lower page from the sequence.

[](/static/docs/web-platform/view-transitions/video/pagination.mp4)

Recording of the [Pagination demo](https://view-transitions.chrome.dev/pagination/spa-types/). It uses different transitions depending on which page you are going to.

For this you can use view transition types, which allow you to assign one or more types to an active view transition. For example, when transitioning to a higher page in a pagination sequence use the `forwards` type and when going to a lower page use the `backwards` type. These types are only active when capturing or performing a transition, and each type can be customized through CSS to use different animations.

To use types in a same-document view transition, you pass `types` into the `startViewTransition` method. To allow this, `document.startViewTransition` also accepts an object: `update` is the callback function that updates the DOM, and `types` is an array with the types.

```
const direction = determineBackwardsOrForwards();

const t = document.startViewTransition({
  update: updateTheDOMSomehow,
  types: ['slide', direction],
});
```

To respond to these types, use the `:active-view-transition-type()` selector. Pass the `type` you want to target into the selector. This lets you keep the styles of multiple view transitions separated from each other, without the declarations of the one interfering with the declarations of the other.

Because types only apply when capturing or performing the transition, you can use the selector to set–or unset–a `view-transition-name` on an element only for the view transition with that type.

```
/* Determine what gets captured when the type is forwards or backwards */
html:active-view-transition-type(forwards, backwards) {
  :root {
    view-transition-name: none;
  }
  article {
    view-transition-name: content;
  }
  .pagination {
    view-transition-name: pagination;
  }
}

/* Animation styles for forwards type only */
html:active-view-transition-type(forwards) {
  &::view-transition-old(content) {
    animation-name: slide-out-to-left;
  }
  &::view-transition-new(content) {
    animation-name: slide-in-from-right;
  }
}

/* Animation styles for backwards type only */
html:active-view-transition-type(backwards) {
  &::view-transition-old(content) {
    animation-name: slide-out-to-right;
  }
  &::view-transition-new(content) {
    animation-name: slide-in-from-left;
  }
}

/* Animation styles for reload type only (using the default root snapshot) */
html:active-view-transition-type(reload) {
  &::view-transition-old(root) {
    animation-name: fade-out, scale-down;
  }
  &::view-transition-new(root) {
    animation-delay: 0.25s;
    animation-name: fade-in, scale-up;
  }
}
```

In the following [pagination demo](https://view-transitions.chrome.dev/pagination/spa-types/), the page contents slide forwards or backwards based on the page number that you are navigating to. The types are determined on click upon which they get passed into `document.startViewTransition`.

To target any active view transition, regardless of the type, you can use the `:active-view-transition` pseudo-class selector instead.

```
html:active-view-transition {
    …
}
```

---

## Handle multiple view transition styles with a class name on the view transition root

Sometimes a transition from one particular type of view to another should have a specifically tailored transition. Or, a 'back' navigation should be different to a 'forward' navigation.

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/Btn9XiUhpQC7Lz198IKI.mp4)

Different transitions when going 'back'. [Minimal demo](https://simple-vt-demos.jakearchibald.com/directional-transition/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/directional-transition).

Before [transition types](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#view-transition-types) the way to handle these cases was to temporarily set a class name on the transition root. When calling `document.startViewTransition`, this transition root is the `<html>` element, accessible using `document.documentElement` in JavaScript:

```
if (isBackNavigation) {
  document.documentElement.classList.add('back-transition');
}

const transition = document.startViewTransition(() =>
  updateTheDOMSomehow(data)
);

try {
  await transition.finished;
} finally {
  document.documentElement.classList.remove('back-transition');
}
```

To remove the classes after the transition finishes, this example uses `transition.finished`, a promise that resolves once the transition has reached its end state. Other properties of this object are covered in the [API reference](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#api-reference).

Now you can use that class name in your CSS to change the transition:

```
/* 'Forward' transitions */
::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms
      cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

/* Overrides for 'back' transitions */
.back-transition::view-transition-old(root) {
  animation-name: fade-out, slide-to-right;
}

.back-transition::view-transition-new(root) {
  animation-name: fade-in, slide-from-left;
}
```

As with media queries, the presence of these classes could also be used to change which elements get a `view-transition-name`.

---

## Run transitions without freezing other animations

Take a look at this demo of a video transitioning position:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/PdbIbficqb89NkKrBOBt.mp4)

Video transition. [Minimal demo](https://simple-vt-demos.jakearchibald.com/video/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/video).

Did you see anything wrong with it? Don't worry if you didn't. Here it is slowed right down:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/gfErCErLjrbc5RdXUR43.mp4)

Video transition, slower. [Minimal demo](https://simple-vt-demos.jakearchibald.com/video/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/video).

During the transition, the video appears to freeze, then the playing version of the video fades in. This is because the `::view-transition-old(video)` is a screenshot of the old view, whereas the `::view-transition-new(video)` is a *live* image of the new view.

You can fix this, but first, ask yourself if it's worth fixing. If you didn't see the 'problem' when the transition was playing at its normal speed, I wouldn't bother changing it.

If you really want to fix it, then don't show the `::view-transition-old(video)`; switch straight to the `::view-transition-new(video)`. You can do this by overriding the default styles and animations:

```
::view-transition-old(video) {
  /* Don't show the frozen old view */
  display: none;
}

::view-transition-new(video) {
  /* Don't fade the new view in */
  animation: none;
}
```

And that's it!

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/n5BdihfhzitBSIak1KhM.mp4)

Video transition, slower. [Minimal demo](https://simple-vt-demos.jakearchibald.com/video/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/video).

Now the video plays throughout the transition.

---

## Integration with the Navigation API (and other frameworks)

View transitions are specified in such a way that they can be integrated with other frameworks or libraries. For example, if your single-page application (SPA) is using a router, you can adjust the router's update mechanism to update the content using a view transition.

In the following code snippet taken from [this pagination demo](https://view-transitions.chrome.dev/pagination/navigation-api/) the [Navigation API's interception handler](https://developer.chrome.com/docs/web-platform/navigation-api#intercepting) is adjusted to call `document.startViewTransition` when view transitions are supported.

```
navigation.addEventListener("navigate", (e) => {
    // Don't intercept if not needed
    if (shouldNotIntercept(e)) return;

    // Intercept the navigation
    e.intercept({
        handler: async () => {
            // Fetch the new content
            const newContent = await fetchNewContent(e.destination.url, {
                signal: e.signal,
            });

            // The UA does not support View Transitions, or the UA
            // already provided a Visual Transition by itself (e.g. swipe back).
            // In either case, update the DOM directly
            if (!document.startViewTransition || e.hasUAVisualTransition) {
                setContent(newContent);
                return;
            }

            // Update the content using a View Transition
            const t = document.startViewTransition(() => {
                setContent(newContent);
            });
        }
    });
});
```

Some, but not all, browsers provide their own transition when the user performs a swipe gesture to navigate. In that case you shouldn't trigger your own view transition as it would lead to a poor or confusing user experience. The user would see two transitions—one provided by the browser and the other one by you—running in succession.

Therefore, it is recommended to prevent a view transition from starting when the browser has provided its own visual transition. To achieve this, check the value of [the `hasUAVisualTransition` property](https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-navigateevent-hasuavisualtransition) of the `NavigateEvent` instance. The property is set to `true` when the browser has provided a visual transition. This `hasUIVisualTransition` property also exists on `PopStateEvent` instances.

In the previous snippet the check that determines whether to run the view transition takes this property into account. When there is no support for same-document view transitions or when the browser already provided its own transition, the view transition is skipped.

```
if (!document.startViewTransition || e.hasUAVisualTransition) {
  setContent(newContent);
  return;
}
```

In the following recording, the user swipes to navigate back to the previous page. The capture on the left doesn't include a check for the `hasUAVisualTransition` flag. The recording on the right does include the check, thereby skipping the manual view transition because the browser provided a visual transition.

[
 ](/static/docs/web-platform/view-transitions/video/hasuavisualtransition-comparison-side-by-side.mp4)

Comparison of the same site without (left) and width (right) a check for `hasUAVisualTransition`

---

## Animating with JavaScript

So far, all the transitions have been defined using CSS, but sometimes CSS isn't enough:

[  ](/static/docs/web-platform/view-transitions/video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/MrrqwatxWSPdobfDR1Qo.mp4)

Circle transition. [Minimal demo](https://simple-vt-demos.jakearchibald.com/circle-transition/). [Source](https://github.com/jakearchibald/simple-vt-demos/tree/main/public/circle-transition).

A couple of parts of this transition can't be achieved with CSS alone:

* The animation starts from the click location.
* The animation ends with the circle having a radius to the farthest corner. Although, hopefully this will be possible with CSS [in future](https://github.com/w3c/csswg-drafts/issues/824#issuecomment-1157549393).

Thankfully, you can create transitions using the [Web Animation API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API)!

```
let lastClick;
addEventListener('click', event => (lastClick = event));

function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // Get the click position, or fallback to the middle of the screen
  const x = lastClick?.clientX ?? innerWidth / 2;
  const y = lastClick?.clientY ?? innerHeight / 2;
  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // With a transition:
  const transition = document.startViewTransition(() => {
    updateTheDOMSomehow(data);
  });

  // Wait for the pseudo-elements to be created:
  transition.ready.then(() => {
    // Animate the root's new view
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in',
        // Specify which pseudo-element to animate
        pseudoElement: '::view-transition-new(root)',
      }
    );
  });
}
```

This example uses `transition.ready`, a promise that resolves once the transition pseudo-elements have been successfully created. Other properties of this object are covered in the [API reference](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#api-reference).

---

## Transitions as an enhancement

The View Transition API is designed to 'wrap' a DOM change and create a transition for it. However, the transition should be treated as an enhancement, as in, your app shouldn't enter an 'error' state if the DOM change succeeds, but the transition fails. Ideally the transition shouldn't fail, but if it does, it shouldn't break the rest of the user experience.

In order to treat transitions as an enhancement, take care not to use transition promises in a way that would cause your app to throw if the transition fails.

Don't

```
async function switchView(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    await updateTheDOM(data);
    return;
  }

  const transition = document.startViewTransition(async () => {
    await updateTheDOM(data);
  });

  await transition.ready;

  document.documentElement.animate(
    {
      clipPath: [`inset(50%)`, `inset(0)`],
    },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}
```

The problem with this example is that `switchView()` will reject if the transition cannot reach a `ready` state, but that doesn't mean that the view failed to switch. The DOM may have successfully updated, but there were duplicate `view-transition-name`s, so the transition was skipped.

Instead:

Do

```
async function switchView(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    await updateTheDOM(data);
    return;
  }

  const transition = document.startViewTransition(async () => {
    await updateTheDOM(data);
  });

  animateFromMiddle(transition);

  await transition.updateCallbackDone;
}

async function animateFromMiddle(transition) {
  try {
    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [`inset(50%)`, `inset(0)`],
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  } catch (err) {
    // You might want to log this error, but it shouldn't break the app
  }
}
```

This example uses `transition.updateCallbackDone` to wait for the DOM update, and to reject if it fails. `switchView` no longer rejects if the transition fails, it resolves when the DOM update completes, and rejects if it fails.

If you want `switchView` to resolve when the new view has 'settled', as in, any animated transition has completed or skipped to the end, replace `transition.updateCallbackDone` with `transition.finished`.

---

## Not a polyfill, but…

This is not an easy feature to polyfill. However, this helper function makes things much easier in browsers that don't support view transitions:

```
function transitionHelper({
  skipTransition = false,
  types = [],
  update,
}) {

  const unsupported = (error) => {
    const updateCallbackDone = Promise.resolve(update()).then(() => {});

    return {
      ready: Promise.reject(Error(error)),
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => {},
      types,
    };
  }

  if (skipTransition) {
    return unsupported('skipTransition was set to true');
  }

  if (!document.startViewTransition) {
    return unsupported('Same-Document View Transitions are not supported in this browser');
  }

  if (!ViewTransition || !("types" in ViewTransition.prototype)) {
    return unsupported('View Transitions with types are not supported in this browser');
  }

  const transition = document.startViewTransition({
    update,
    types,
  });

  return transition;
}
```

And it can be used like this:

```
function spaNavigate(data) {
  const types = isBackNavigation ? ['back-transition'] : [];

  const transition = transitionHelper({
    update() {
      updateTheDOMSomehow(data);
    },
    types,
  });

  // …
}
```

In browsers that don't support view transitions, `updateDOM` will still be called, but there won't be an animated transition.

You can also provide some `classNames` to add to `<html>` during the transition, making it easier to [change the transition depending on the type of navigation](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#changing-on-navigation-type).

You can also pass `true` to `skipTransition` if you don't want an animation, even in browsers that support view transitions. This is useful if your site has a user preference to disable transitions.

---

## Working with frameworks

If you're working with a library or framework that abstracts away DOM changes, the tricky part is knowing when the DOM change is complete. Here's a set of examples, using the [helper above](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#not-a-polyfill), in various frameworks.

* [React](https://goo.gle/vt-react-demo)—the key here is [`flushSync`](https://beta.reactjs.org/reference/react-dom/flushSync), which applies a set of state changes synchronously. Yes, there's a big warning about using that API, but [Dan Abramov](https://twitter.com/dan_abramov) assures me it's appropriate in this case. As usual with React and async code, when using the various promises returned by `startViewTransition`, take care that your code is running with the correct state.
* [Vue.js](https://goo.gle/vt-vue-demo)—the key here is [`nextTick`](https://vuejs.org/api/general.html#nexttick), which fulfills once the DOM has been updated.
* [Svelte](https://goo.gle/vt-svelte-demo)—very similar to Vue, but the method to await the next change is [`tick`](https://svelte.dev/docs#run-time-svelte-tick).
* [Lit](https://goo.gle/vt-lit-demo)—the key here is the [`this.updateComplete`](https://lit.dev/docs/v1/components/lifecycle/#updatecomplete) promise within components, which fulfills once the DOM has been updated.
* [Angular](https://goo.gle/vt-angular-demo)—the key here is [`applicationRef.tick`](https://angular.io/api/core/ApplicationRef#tick), which flushes pending DOM changes. As of Angular version 17 you can [use `withViewTransitions` that comes with `@angular/router`](https://blog.angular.io/check-out-angulars-support-for-the-view-transitions-api-3937376cfc19).

---

## API reference

`const viewTransition = document.startViewTransition(update)`
:   Start a new `ViewTransition`.

    `update` is a function that is called once the current state of the document is captured.

    Then, when the promise returned by `updateCallback` fulfills, the transition begins in the next frame. If the promise returned by `updateCallback` rejects, the transition is abandoned.

`const viewTransition = document.startViewTransition({ update, types })`
:   Start a new `ViewTransition` with the specified types

    `update` is called once the current state of the document is captured.

    `types` sets the active types for the transition when capturing or performing the transition. It is initially empty. See `viewTransition.types` further down for more information.

Instance members of `ViewTransition`:

`viewTransition.updateCallbackDone`
:   A promise that fulfills when the promise returned by `updateCallback` fulfills, or rejects when it rejects.

    The View Transition API wraps a DOM change and creates a transition. However, sometimes you don't care about the success or failure of the transition animation, you just want to know if and when the DOM change happens. `updateCallbackDone` is for that use-case.

`viewTransition.ready`
:   A promise that fulfills once the pseudo-elements for the transition are created, and the animation is about to start.

    It rejects if the transition cannot begin. This can be due to misconfiguration, such as duplicate `view-transition-name`s, or if `updateCallback` returns a rejected promise.

    This is useful for [animating the transition pseudo-elements with JavaScript](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#animating-with-javascript).

`viewTransition.finished`
:   A promise that fulfills once the end state is fully visible and interactive to the user.

    It only rejects if `updateCallback` returns a rejected promise, as this indicates the end state wasn't created.

    Otherwise, if a transition fails to begin, or is skipped during the transition, the end state is still reached, so `finished` fulfills.

`viewTransition.types`
:   A [`Set`-like](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set#set-like_browser_apis) object that holds the active view transition's types. To manipulate the entries, use [its instance methods](https://developer.mozilla.orgdocs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods) `clear()`, `add()`, and `delete()`.

    To respond to a specific type in CSS, use the `:active-view-transition-type(type)` pseudo-class selector on the transition root.

    Types automatically get cleaned up when the view transition finishes.

`viewTransition.skipTransition()`
:   Skip the animation part of the transition.

    This won't skip calling `updateCallback`, as the DOM change is separate to the transition.

---

## Default style and transition reference

`::view-transition`
:   The root pseudo-element which fills the viewport and contains each `::view-transition-group`.

`::view-transition-group`
:   Absolutely positioned.

    Transitions `width` and `height` between the 'before' and 'after' states.

    Transitions `transform` between the 'before' and 'after' viewport-space quad.

`::view-transition-image-pair`
:   Absolutely positioned to fill the group.

    Has `isolation: isolate` to limit the effect of the `mix-blend-mode` on the old and new views.

`::view-transition-new` and `::view-transition-old`
:   Absolutely positioned to the top-left of the wrapper.

    Fills 100% of the group width, but has an auto height, so it will maintain its aspect ratio rather than filling the group.

    Has `mix-blend-mode: plus-lighter` to allow for a true cross-fade.

    The old view transitions from `opacity: 1` to `opacity: 0`. The new view transitions from `opacity: 0` to `opacity: 1`.

---

## Feedback

Developer feedback is always appreciated. To do so, [file an issue with the CSS Working Group on GitHub](https://github.com/w3c/csswg-drafts) with suggestions and questions. Prefix your issue with `[css-view-transitions]`.

Should you run into a bug, then [file a Chromium bug](https://crbug.com/new) instead.
