---
source: https://animejs.com/documentation/layout/layout-properties
title: "Layout properties | Layout | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Layout](https://animejs.com/documentation/layout "Layout")

[Since 4.3.0](https://github.com/juliangarnier/anime/releases/tag/v4.3.0)

# [Layout properties](https://animejs.com/documentation/layout/layout-properties "Layout properties")

Properties available on the `AutoLayout` instance returned by `createLayout()`.

```js
const layout = createLayout(root, parameters);
       ┌──────────────────────┐
layout.│root                  │
layout.│timeline              ├─ Properties
layout.│entering              │
       └──────────────────────┘
```

| Name | Description |
| --- | --- |
| `params` | Configuration object passed to `createLayout()` (`AutoLayoutParams`) |
| `root` | Resolved root element where measurements start (`HTMLElement`) |
| `children` | Selector(s) used to find tracked elements each time `.record()` runs (`String|Array<String>`) |
| `enterFromParams` | Animation parameters for nodes entering the layout (`Object`) |
| `leaveToParams` | Animation parameters for nodes leaving the layout (`Object`) |
| `swapAtParams` | Animation parameters for nodes swapping during a layout transition (`Object`) |
| `properties` | Set of CSS property names interpolated whenever their values change (`Set<String>`) |
| `oldState` | `LayoutSnapshot` objects containing previous measurements |
| `newState` | `LayoutSnapshot` objects containing latest measurements |
| `timeline` | Timeline instance returned by the last `.animate()` / `.update()` call (`Timeline`|`null`) |
| `animating` | Arrays of DOM nodes animated during latest `.animate()` call (`Array<DOMTarget>`) |
| `swapping` | Arrays of DOM nodes swapped during the latest `.animate()` call (`Array<DOMTarget>`) |
| `entering` | Arrays of DOM nodes entering during the latest `.animate()` call (`Array<DOMTarget>`) |
| `leaving` | Arrays of DOM nodes leaving during the latest `.animate()` call (`Array<DOMTarget>`) |
| `id` | Gets and sets the ID of the layout (`String` | `Number`) |

### LayoutSnapshot helpers

`layout.oldState` and `layout.newState` expose methods like `.getNode(element)` and `.getComputedValue(element, property)` to inspect recorded measurements.

### Inspecting runtime arrays

`layout.entering`, `layout.leaving`, and `layout.swapping` are cleared and repopulated every time `.animate()` runs. Use them immediately after calling `layout.update()` to coordinate custom states before the timeline completes.

###### Previous

###### Next

* [Layout callbacks](https://animejs.com/documentation/layout/layout-callbacks "Layout callbacks")
* [Common auto layout gotchas](https://animejs.com/documentation/layout/common-auto-layout-gotchas "Common auto layout gotchas")
