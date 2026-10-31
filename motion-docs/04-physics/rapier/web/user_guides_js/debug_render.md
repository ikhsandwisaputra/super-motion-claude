---
source: https://rapier.rs:443/docs/user_guides/javascript/debug_render
title: "Debug-renderer | Rapier"
fetched: 2026-10-28
---

# Debug-renderer

Rapier is a physics engine, it doesn't render anything. What is displayed by your application comes from your own
renderer, and game assets generally donât match the shapes seen by the physics engine exactly. Therefore a collider
given the wrong size, a joint attached at the wrong place, or a rigid-body that is not where its sprite is, can be
difficult to debug (and easy to misinterpret as physics-engine-bugs).

To help with debugging physics, Rapierâs **debug-renderer** exists to convert the content of the physics scene into a
set of colored lines that your application to obtain a wireframe view of what Rapier actually sees.

The debug shape data is computed by the `World.debugRender` method, which gives back one vertex buffer and one color
buffer describing the lines to be drawn. These buffers are meant to be given to the line renderer of your application
as they are:

* Example 2D
* Example 3D

```js
for (let k = 0; k < 10; ++k) {
    world.step();

    // The buffers are the lines to be drawn: two floats per vertex, four per color, and two
    // vertices per line. They are meant to be given to the line renderer of your application.
    let buffers = world.debugRender();
    console.log(buffers.vertices.length / 4, "lines to draw");
}
```

```js
for (let k = 0; k < 10; ++k) {
    world.step();

    // The buffers are the lines to be drawn: three floats per vertex, four per color, and two
    // vertices per line. They are meant to be given to the line renderer of your application.
    let buffers = world.debugRender();
    console.log(buffers.vertices.length / 6, "lines to draw");
}
```

Note that the colliders can be filtered out of the debug-rendering, either by their
[query filter flags](https://rapier.rs:443/docs/user_guides/javascript/scene_queries#query-filters) or by an arbitrary closure, which is useful when only a part
of a large scene is of interest (not keep in mind that a closure will introduce an overhead).

warning

The debug-rendering is not free: it walks every collider of the scene and converts its shape into lines at each frame.
Therefore it is meant to be enabled only when debugging rather than a player-facing representation of the game objects.
