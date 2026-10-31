---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds
title: "ScrollObserver thresholds | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [ScrollObserver thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")

Determines the points at which actions are triggered based on the scrolling position of a target element within a container.
Thresholds are defined with the `enter` and `leave` properties of the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({

    container: '.container',
    target: '.section',
    axis: 'y',
  ┌──────────────────────────┐
  │ enter: 'bottom top',     ├─ Thresholds
  │ leave: 'top bottom',     │
  └──────────────────────────┘
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

The conditions that determine when an element enters or leaves the viewport are specified by comparing two pairs of values: the target and container `start` and `end` values.

```js
┌────────────────────────────────┐- Container Start
│                                │
│   Container                    │
│                                │
│          ┌──────────┐----------│- Target Start
│          │          │          │
│          │  Target  │          │
└────────────────────────────────┘- Container End
           │          │
           └──────────┘------------ Target End
```

## [Different syntaxes](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds#different-syntaxes)

Conditions can be written with the following syntaxes:

### Object

```js
onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: { target: 'top', container: 'bottom' },
  // Leaves when the bottom of the target meets the top of the container
  leave: { target: 'bottom', container: 'top' }
});
```

### Container value String

The container value can be passed directly and the target value defaults to `'start'` for enter and `'end'` for leave.

```js
onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: 'bottom',
  // Leaves when the bottom of the target meets the top of the container
  leave: 'top'
 });
```

### Container and target value shorthand String

```js
onScroll({
  // Enters when the bottom of the container meets the top of the target
  enter: 'bottom top',
  // Leaves when the top of the container meets the bottom of the target
  leave: 'top bottom',
});
```

## [Default enter](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds#default-enter)

`'end start'`

## [Default leave](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds#default-leave)

`'start end'`

###### In this section

* [Numeric values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values "Numeric values")
* [Positions shorthands](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands "Positions shorthands")
* [Relative position values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values "Relative position values")
* [Min max](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max "Min max")

###### Previous

###### Next

* [repeat](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat "repeat")
* [Numeric values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values "Numeric values")
