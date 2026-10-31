---
source: https://animejs.com/documentation/scope/scope-properties
title: "Scope properties | Scope | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Scope](https://animejs.com/documentation/scope "Scope")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Scope properties](https://animejs.com/documentation/scope/scope-properties "Scope properties")

Properties available on the `Scope` instance returned by a `createScope()` function.

```js
const scope = createScope();
      ┌────────┐
scope.│methods │
scope.│root    ├─ Properties
scope.│matches │
      └────────┘
```

| Name | Description |
| --- | --- |
| data | An object used to store variables associated with the scope. Every properties added to it are cleared when the scope is reverted (`Object`) |
| defaults | Gets the default parameters for this scope (`Object`) |
| root | Gets the root element for DOM operations in this scope (`Document` | `HTMLElement`) |
| constructors | Gets the array of constructor functions added to this scope (`Array<Function>`) |
| revertConstructors | Gets the array of revert constructor functions (`Array<Function>`) |
| revertibles | Gets the array of revertible objects created within this scope (`Array<Tickable|Animatable|Draggable|ScrollObserver|Scope>`) |
| methods | Gets the object containing methods added to this scope (`Object`) |
| matches | Gets the object containing current media query match results (`Object`) |
| mediaQueryLists | Gets the object containing MediaQueryList objects for this scope (`Object`) |

###### Previous

###### Next

* [refresh()](https://animejs.com/documentation/scope/scope-methods/refresh "refresh()")
* [Events](https://animejs.com/documentation/events "Events")
