---
source: https://www.curtainsjs.com/documentation.html
title: "curtains.js | Documentation"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Documentation

## Basic concept

Since the **version 7.0** the whole library has been rewritten and broken into multiple class modules to improve the readability and maintainability of the code. Since **curtains.js is a high-level API library**, most of those classes are used internally only. Even tho they are listed here you won't ever need to use them.

If you're coming from a previous version of the library, have a look at the [migration guide](https://www.curtainsjs.com/migration-guide-to-v7.html).

### Core

Main classes needed to create basic scenes.

* #### Curtains v1.0

  The [Curtains](https://www.curtainsjs.com/curtains-class.html) class is responsible for the canvas and WebGL context and therefore creates a WebGL scene. It also creates a requestAnimationFrame loop and will draw every Plane elements that you've created.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Curtains.js "Curtains class source code").

  + ##### Renderer

    The Renderer class is handling everything related to the WebGL context (creation and restoration, extensions, WebGL commands, etc).

    [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Renderer.js "Renderer class source code").

    - ###### Scene

      The Scene class is created by the Renderer. It manages the render order of every WebGL objects (planes, render targets and shader passes) added.
      Read more about [how the library draws the different objects](https://www.curtainsjs.com/scene-rendering-order.html).

      [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Scene.js "Scene class source code").
    - ###### CacheManager

      The CacheManager caches already compiled shaders, vertices and UVs arrays and images textures in order to reuse them whenever possible and avoid extra heavy computations.

      [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/utils/CacheManager.js "CacheManager class source code").
    - ###### CallbackQueueManager

      The CallbackQueueManager is used to execute callbacks on the next animation frame call.

      [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/utils/CallbackQueueManager.js "CallbackQueueManager class source code").
  + ##### ScrollManager

    The ScrollManager class adds a scroll event listener if needed and handles the update of the scroll values.

    [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/utils/ScrollManager.js "ScrollManager class source code").
* #### Plane v1.0

  The [Plane](https://www.curtainsjs.com/plane-class.html) class creates a WebGL plane that is bound to a HTML element and that will be rendered at the sizes and positions of this HTML element.

  It **extends** the DOMMesh class.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Plane.js "Plane class source code").

  + ##### DOMMesh

    The DOMMesh class **extends** the Mesh class by adding a few helper methods that relies on the associated HTML element used to create the Mesh.

    [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/DOMMesh.js "DOMMesh class source code").

    - ###### Mesh

      The Mesh class creates a WebGL mesh, i.e. creates a Geometry, a Program, the Mesh's uniforms and handles Textures creation.

      [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Mesh.js "Mesh class source code").

      * ###### Geometry

        The Geometry class creates and binds the vertices and texture coordinates attributes buffers and draw the mesh.

        [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Geometry.js "Geometry class source code").
      * ###### Program

        The Program class compiles the shaders and creates a WebGL program used by the Mesh.

        [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Program.js "Program class source code").
      * ###### Uniforms

        The Uniforms class creates and updates the Mesh's uniforms.

        [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Uniforms.js "Uniforms class source code").
  + ##### Camera

    The Camera class creates a perspective camera used to compute the plane's projection matrix.

    [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/camera/Camera.js "Camera class source code").
* #### Texture v2.0

  The [Texture](https://www.curtainsjs.com/texture-class.html) class is used to create WebGL textures.

### Frame Buffer Objects

Those classes are generally used to add post-processing effects to your planes.

* #### RenderTarget v5.0

  The [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class is a Frame Buffer Object used internally to create shader passes. It allows you to render one or multiple planes as a texture that you can then use in another plane or shader pass.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/framebuffers/RenderTarget.js "RenderTarget class source code").
* #### ShaderPass v3.0

  The [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) class **extends** the DOMMesh class.
  ShaderPass elements are used to add post-processing effects. Think of it as an additional plane that will be bound to your WebGL canvas container. This way you will be able to apply shaders to a bunch of planes or to your whole WebGL scene.
  You can add multiple shader passes and they will be applied one after the other in their creation order.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/framebuffers/ShaderPass.js "ShaderPass class source code").

### Loaders

Useful to create WebGL textures based on HTML media elements

* #### TextureLoader v7.0

  The [TextureLoader](https://www.curtainsjs.com/texture-loader-class.html) class loads images, videos and canvases and creates Textures using those HTML elements as sources.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/loaders/TextureLoader.js "TextureLoader class source code").

  + ##### PlaneTextureLoader

    The PlaneTextureLoader class **extends** the TextureLoader class. Used internally by planes and shader passes to load medias, use the resulting textures and fire the onLoading and onReady callbacks.

    [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/loaders/PlaneTextureLoader.js "PlaneTextureLoader class source code").

### Math

Math classes used for 3D vectors and matrices calculations. Highly based on [three.js](https://github.com/mrdoob/three.js) and [glMatrix](http://glmatrix.net/docs/) maths classes.
Note that at the moment those classes are still not complete and implement only the methods needed internally by the library.

* #### Vec2 v7.0

  The [Vec2](https://www.curtainsjs.com/vec-2-class.html) class handles 2 dimensions vectors calculations.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Vec2.js "Vec2 class source code").
* #### Vec3 v7.0

  The [Vec3](https://www.curtainsjs.com/vec-3-class.html) class handles 3 dimensions vectors calculations.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Vec3.js "Vec3 class source code").
* #### Mat4 v7.0

  The [Mat4](https://www.curtainsjs.com/mat-4-class.html) class handles 4 dimensions matrices calculations.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Mat4.js "Mat4 class source code").
* #### Quat v7.0

  The [Quat](https://www.curtainsjs.com/quat-class.html) class handles quaternions calculations.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Quat.js "Quat class source code").

### Extras

Extra classes are often used additional classes built using the other classes above that can help you save some time.

* #### PingPongPlane v7.0

  The [PingPongPlane](https://www.curtainsjs.com/ping-pong-plane-class.html) class **extends** the Plane class by adding 2 read and write render targets that will be swapped during render and a method to get the resulting texture. Allows fluid effects, flowmaps, etc.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/extras/PingPongPlane.js "PingPongPlane class source code").
* #### FXAAPass v7.0updated in v8.0

  The [FXAAPass](https://www.curtainsjs.com/fxaa-pass-class.html) class **extends** the ShaderPass class by creating a Fast Approximate Anti-Aliasing pass. If you're using render targets or shader passes in your code, just use this pass as the last pass to add an anti-aliasing effect.

  [Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/extras/FXAAPass.js "FXAAPass class source code").

## Additional ressources

1. [Github](https://github.com/martinlaxenaire/curtainsjs "curtains.js on Github")
2. [CSS Tricks tutorial](https://css-tricks.com/animate-images-and-videos-with-curtains-js/ "CSS Tricks tutorial")
3. [Codrops WebGL Video Transitions with Curtains.js](https://tympanus.net/codrops/2020/10/07/webgl-video-transitions-with-curtains-js/ "WebGL Video Transitions with Curtains.js")
4. [Creating WebGL Effects with CurtainsJS on CSS Tricks](https://css-tricks.com/creating-webgl-effects-with-curtainsjs/ "Creating WebGL Effects with CurtainsJS on CSS Tricks")
5. WebGL drag slider complete step-by-step tutorial on CodePen: [part 1: creating the slider](https://codepen.io/martinlaxenaire/post/webgl-enhanced-drag-slider-tutorial-with-curtains-js-part-1 "WebGL drag slider complete step-by-step tutorial on CodePen, part 1: creating the slider"), [part 2: adding the WebGL](https://codepen.io/martinlaxenaire/post/webgl-enhanced-drag-slider-tutorial-with-curtains-js-part-2 "WebGL drag slider complete step-by-step tutorial on CodePen, part 2: adding the WebGL"), [part 3: improving performance](https://codepen.io/martinlaxenaire/post/webgl-enhanced-drag-slider-tutorial-with-curtains-js-part-3 "WebGL drag slider complete step-by-step tutorial on CodePen, part 3: improving performance")
6. [CodePen curtains.js collection](https://codepen.io/collection/XEvPge/ "CodePen curtains.js collection")
