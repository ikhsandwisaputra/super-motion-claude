---
source: https://animejs.com/documentation/adapters
title: "Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

# [Adapters NEW](https://animejs.com/documentation/adapters "Adapters")

## [Animate objects from APIs that don't expose plain properties, like a Three.js mesh or a canvas context, with the standard `animate()`, `createTimeline()`, and `utils.set()` API.](https://animejs.com/documentation/adapters#animate-objects-from-apis-that-don-t-expose-plain-properties-like-a-three-js-mesh-or-a-canvas-context-with-the-standard-animate-)

Adapters let you animate objects that do not expose plain properties, such as a Three.js mesh, a canvas context, or a third-party widget. Once an adapter is registered for a target type, you animate those objects exactly like you would a DOM element.

Anime.js ships with a built-in Three.js adapter, and custom adapters can be written for any other target type.

## [Built-in adapters](https://animejs.com/documentation/adapters#built-in-adapters)

The [Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js") adapter is the only one shipped with Anime.js for now. Load it as a side-effect import from the `'animejs/adapters/three'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath") module:

```js
import 'animejs/adapters/three';
```

## [Custom adapters](https://animejs.com/documentation/adapters#custom-adapters)

Call `registerAdapter()` from the `'animejs/adapters'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath") module to create a custom adapter. The returned `Adapter` is a namespace for one library or class group, and exposes two methods:

* `registerTargetAdapter(detect)` declares a target type with a fixed, known set of property names.
* `registerPropertyResolver(resolver)` declares a function that matches property names as they are animated. Use it for dynamic names like `offsetX`, `offsetY`, `offsetZ`, or any naming scheme you can't list upfront.

```js
import { registerAdapter } from 'animejs/adapters';

const myAdapter = registerAdapter();
```

### Target adapters

A target adapter handles one class of objects and lists each animatable property name with its getter and setter.

```js
const widget = myAdapter.registerTargetAdapter(target => target instanceof MyClass);

widget.registerProperty('foo',
  target => target.getFoo(),
  (target, value, tween) => target.setFoo(value),
  target => target.fooEnabled,
);
```

`registerTargetAdapter()` takes a function that returns `true` for the objects the adapter handles. Each `registerProperty()` call adds one animatable name to that target type.

#### registerProperty parameters

| Name | Accepts |
| --- | --- |
| name | A `String` matching the property name written in animation parameters |
| getter | A `Function` receiving the target and returning the current value |
| setter | A `Function` receiving the target, the interpolated value, and the live tween |
| gate (opt) | A `Function` returning `true` when the property applies to the given target |

The setter receives a `Number` for scalar tweens. For color and complex tweens the value argument is `undefined`, and the per-frame channels are available on the live tween's `_numbers` array.

### Property resolvers

Use a property resolver when the set of animatable names is not known upfront, or when the same logic should handle many target types. It runs for any name not claimed by a target adapter, receives the target and the property name, and returns a property entry, or `null` to defer to the next resolver.

```js
myAdapter.registerPropertyResolver((target, name) => {
  if (target instanceof MyClass && name.startsWith('foo_')) {
    const key = name.slice(4);
    return {
      get: t => t.getFoo(key),
      set: (t, value, tween) => t.setFoo(key, value),
    };
  }
  return null;
});
```

#### Resolution order

For each animated name, Anime.js checks every registered `Adapter` in order. It tries the target adapters first (first match wins), then the property resolvers (first non-`null` wins). Any name no adapter claims is set directly with `target[name] = value`.

###### In this section

* [Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

###### Previous

###### Next

* [Engine defaults](https://animejs.com/documentation/engine/engine-defaults "Engine defaults")
* [Three.js adapter](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")
