---
source: https://www.curtainsjs.com/migration-guide-to-v7.html
title: "curtains.js | Documentation | Migration guide from previous version to v7.0"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Migration guide from previous version to v7.0 or ulterior

Luckily, migrating from a previous version to the v7.0 should be pretty straightforward as there are not many breaking changes.

## Deprecations

Here's a list of all deprecated methods:

* ### Curtains class:

  + **addPlane():** you should now use the [Plane class](https://www.curtainsjs.com/plane-class.html) constructor instead.v7.0
  + **addRenderTarget():** you should now use the [RenderTarget class](https://www.curtainsjs.com/render-target-class.html) constructor instead.v7.0
  + **addShaderPass():** you should now use the [ShaderPass class](https://www.curtainsjs.com/shader-pass-class.html) constructor instead.v7.0
  + **removePlane():** you should now use the [Plane class remove() method](https://www.curtainsjs.com/plane-class.html#remove) instead.v7.0
  + **removeRenderTarget():** you should now use the [RenderTarget class remove() method](https://www.curtainsjs.com/render-target-class.html#remove) instead.v7.0
  + **removeShaderPass():** you should now use the [ShaderPass class remove() method](https://www.curtainsjs.com/shader-pass-class.html#remove) instead.v7.0
* ### Plane class:

  + **setRelativePosition():** you should use the [setRelativeTranslation()](https://www.curtainsjs.com/plane-class.html#set-relative-translation) method instead.v8.0
  + **moveToFront():** you should use the [setRenderOrder()](https://www.curtainsjs.com/plane-class.html#set-render-order) method instead.v8.0
  + **planeResize():** you should use the [resize()](https://www.curtainsjs.com/plane-class.html#resize) method instead.v7.3
* ### Texture class:

  + **setFromTexture():** you should use the [copy()](https://www.curtainsjs.com/texture-class.html#copy) method instead.v7.3

## Parameters change

Here's a list of all the instanciation and method parameters that changed:

* ### Plane class:

  + #### Creation:

    - **shareProgram:** this option is deprecated and has been removed.v8.0
    - **uniforms:** value property now accepts [Vec2](https://www.curtainsjs.com/vec-2-class.html), [Vec3](https://www.curtainsjs.com/vec-3-class.html), [Mat4](https://www.curtainsjs.com/mat-4-class.html) and [Quat](https://www.curtainsjs.com/quat-class.html) class objects.v7.0
  + #### Methods:

    - **mouseToPlaneCoords():** now uses a [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object instead of 2 floats.v7.0
    - **setRelativeTranslation():** now uses a [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object instead of 3 floats.v7.0
    - **setRotation():** now uses a [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object instead of 3 floats.v7.0
    - **setScale():** now uses a [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object instead of 2 floats.v7.0
    - **setTransformOrigin():** now uses a [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object instead of 3 floats.v7.0
* ### Texture class:

  + #### Methods:

    - **setScale():** now uses a [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object instead of 2 floats.v7.0
* ### ShaderPass class:

  + #### Creation:

    - **uniforms:** value property now accepts [Vec2](https://www.curtainsjs.com/vec-2-class.html), [Vec3](https://www.curtainsjs.com/vec-3-class.html), [Mat4](https://www.curtainsjs.com/mat-4-class.html) and [Quat](https://www.curtainsjs.com/quat-class.html) class objects.v7.0
  + #### Methods:

    - **mouseToPlaneCoords():** now uses a [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object instead of 2 floats.v7.0

## Properties changed

Here's a list of all the object properties name that changed:

* ### Curtains class:

  + **glCanvas:** has been renamed to [canvas](https://www.curtainsjs.com/curtains-class.html#canvas).v7.0
  + **productionMode:** has been renamed to [production](https://www.curtainsjs.com/curtains-class.html#production).v7.0
* ### Texture class:

  + **type:** has been renamed to [sourceType](https://www.curtainsjs.com/texture-class.html#source-type).v7.0
