---
source: https://www.curtainsjs.com/scene-rendering-order.html
title: "curtains.js | Documentation | Scene rendering order"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Scene rendering order

Since v7.3, the whole scene rendering order has been refactored. It ensures that all the planes will be rendered out of the box, no matter in what order they are added, but also allows for a better control over the planes render order.

## How WebGL handles drawing and depth

First, you have to know that WebGL depth test means that the GPU will not execute a fragment shader for any pixels that would be behind other things. This means that given the same depth, objects that are added first are rendered on top of others (from front to back).
See [WebGL2 fundamentals: drawing multiple things](https://webgl2fundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html#drawing-transparent-things-and-multiple-lists "WebGL2 fundamentals: drawing multiple things") for more informations.

## curtains.js drawing order

The order in which all the objects are drawn by curtains.js is managed by the Scene class (view [source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Scene.js "Scene class source code")).
It creates a bunch of stacks that contains the objects that will be drawn in a specific order.
Those are the different draw calls and operations executed at each render:

1. ### PingPongPlane's stack

   First, the library draws all the [PingPongPlanes](https://www.curtainsjs.com/ping-pong-plane-class.html) that have been added, if any.
   This ensures that whatever the other planes and shader passes your scene contains, the PingPongPlanes will be correctly rendered.
2. ### RenderTarget's stack

   The library will then draw all the planes that are attached to a [RenderTarget](https://www.curtainsjs.com/render-target):

   * It will start by drawing the planes from the first render target created, if any, ordered by their renderOrder property, then indexes (first added first drawn).
   * Then it will draw the planes from the second render target created, if any, following the same order.
   * Repeat for all the render targets that have been created...
3. ### Draw the render targets' shader passes

   The library will then draw those render targets' shader passes content, which means all the [ShaderPasses](https://www.curtainsjs.com/shader-pass-class.html) that have been created by passing a renderTarget as parameter. They will be drawn ordered by their renderOrder property (from lower to higher), then indexes (first added first drawn).
   To be sure everything remains visible, the WebGL context depth buffer is cleared after each pass has been drawn.
4. ### Opaque's stack

   Then it will draw all the planes that have their transparent property set to false.
   They are ordered by their renderOrder property, geometry IDs and then indexes (first added first drawn).
5. ### Transparent's stack

   Then it will enable blending and draw all the planes that have their transparent property set to true.
   They are ordered by their renderOrder property, their translation along Z axis, geometry IDs and then indexes (first added first drawn).
6. ### Draw the scene shader passes

   Finally it will draw the scene's shader passes content (post processing), which means all the [ShaderPasses](https://www.curtainsjs.com/shader-pass-class.html) that have been created without passing any renderTarget as parameter. They will be drawn ordered by their renderOrder property (from lower to higher), then indexes (first added first drawn).
