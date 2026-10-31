---
source: https://www.curtainsjs.com/curtains-class.html
title: "curtains.js | Documentation | Curtains class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Curtains class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Curtains.js "Curtains class source code")

## Basic usage

You will have to create a Curtains object first that will handle the scene containing all your planes. It will also create the WebGL context, append the canvas and handle the requestAnimationFrame loop. You just have to pass the HTML element (or its ID) that will wrap the canvas :

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: document.getElementById("canvas") // we could have just pass "canvas" instead

});

There are other options that you can pass as parameters. For example, you can specify whether you want to use the library in production mode:

const curtains = new Curtains({

container: "canvas",

production: true // use the library in "production" mode

});

## Parameters

Here is a complete list of all the parameters:

* container

  HTML Element or string, optional

  the HTML Element or ID of the HTML Element that will wrap the canvas. If not specified, the WebGL context will not be set until you call [setContainer()](https://www.curtainsjs.com/curtains-class.html#set-container) with a valid HTML element or ID.
* alpha

  bool, optional

  Whether the WebGL context should handle transparency. Default to true.
* antialias

  bool, optional

  Whether the WebGL context should use the default antialiasing. When using render targets, WebGL disables antialiasing, so you can safely set this to false to improve the performance. Default to true.
* premultipliedAlpha

  bool, optional

  Whether the WebGL context should handle premultiplied alpha. Default to false.
* depth

  bool, optional

  Whether the WebGL context should handle depth. Default to true.
* preserveDrawingBuffer

  bool, optional

  Whether the WebGL context should preserve the drawing buffer. Default to false.
* failIfMajorPerformanceCaveat

  bool, optional

  Whether the WebGL context creation should fail in case of major performance caveat. Default to true.
* stencil

  bool, optional

  Whether the WebGL context should handle stencil. Default to false.
* autoRender

  bool, optional

  Whether the library should create a request animation frame loop to render the scene. Set it to false if you want to handle this by yourself using the [render()](https://www.curtainsjs.com/curtains-class.html#render) method. Default to true.
* autoResize

  bool, optional

  Whether the library should listen to the window resize event and actually resize the scene. Set it to false if you want to handle this by yourself using the [resize()](https://www.curtainsjs.com/curtains-class.html#resize) method. Default to true.
* pixelRatio

  float, optional

  Defines the pixel ratio value. Use it to limit it on init to increase performance. Default to window.devicePixelRatio.
* renderingScale

  float, optional (minimum: 0.25, maximum: 1)

  Use it to downscale your rendering canvas. May improve performance but will decrease quality. Default to 1.
* watchScroll

  bool, optional

  Whether the library should listen to the window scroll event. Set it to false if you want to handle this by yourself. Default to true.
* production

  bool, optional

  Whether the library should throw useful console warnings or not. Default to false.

## Properties

* **alpha** (bool) v5.0read only

  Whether the WebGL context handles transparency or not.
* **antialias** (bool) v6.1read only

  Whether the WebGL context should use antialiasing.
* **canvas** (HTML canvas element) v7.0

  The WebGL canvas being created and that contains our scene.
* **container** (HTML element) v1.0

  The container that will hold our WebGL canvas. The canvas will be sized according to this container. For performance reason, the smaller your container the better. Most of the time you'll set it to cover the window.
* **depth** (bool) v7.0read only

  Whether the WebGL context handles depth or not.
* **failIfMajorPerformanceCaveat** (bool) v7.0read only

  Whether the WebGL context creation should fail in case of major performance caveat.
* **gl** (WebGL context) v5.0read only

  Our WebGL context.
* **pixelRatio** (float) v1.0 read only

  The current device pixel ratio.
  Use the [setPixelRatio()](https://www.curtainsjs.com/curtains-class.html#set-pixel-ratio) method to change this value at runtime.
* **planes** (array) v1.0

  An array containing all your current [Plane](https://www.curtainsjs.com/plane-class.html) elements.
* **premultipliedAlpha** (bool) v5.0 read only

  Whether the WebGL context handles premultiplied alpha or not.
* **preserveDrawingBuffer** (bool) v7.0read only

  Whether the WebGL context should preserve the drawing buffer.
* **production** (bool) v7.0

  If set to true, will remove all helpful warnings displayed by the library.
* **renderTargets** (array) v5.0

  An array containing all your current [RenderTarget](https://www.curtainsjs.com/render-target-class.html) elements (including the one used by your shader passes).
* **shaderPasses** (array) v3.0

  An array containing all your current [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) elements.
* **stencil** (bool) v7.0read only

  Whether the WebGL context should handle stencil.

## Methods

* **clear**(): v7.3

  Clears both WebGL context colors and depth buffers.
* **clearColor**(): v7.3

  Clears WebGL context color buffer.
* **clearDepth**(): v7.3

  Clears WebGL context depth buffer.
* **disableDrawing**(): v1.8

  This function will prevent the scene from being drawn again (putting it in a paused state). You won't be able to update uniforms while the drawing is disabled. Useful to improve performance if you got a static scene.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet"), [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") and [Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading") examples.
* **dispose**(): v1.0

  This function will cancel the requestAnimationFrame loop, remove all planes and delete the WebGL context.
* **enableDrawing**(): v1.8

  This function will reenable the scene drawing in case you paused it via disableDrawing(). Could be useful if you want to start drawing the scene again when a user gesture happens for example.

  **Examples:** used in [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") and [Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading") examples.
* **getBoundingRect**(): v3.0

  Useful to get our [container](https://www.curtainsjs.com/curtains-class.html#container) HTML element bounding rectangle without causing a reflow/layout repaint. Be careful as the values are relative to your [pixelRatio](https://www.curtainsjs.com/curtains-class.html#pixel-ratio) value.

  **returns:** an object containing the container HTML element width, height, top and left positions.

  **Examples:** used in [Multiple planes scroll effect](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **getScrollDeltas**(): v4.0

  Get the last scroll delta values along X and Y axis. Call it after having called [updateScrollValues()](https://www.curtainsjs.com/curtains-class.html#update-scroll-values) or inside the [onScroll()](https://www.curtainsjs.com/curtains-class.html#on-scroll) event if scroll watching is active.

  **returns:** an object containing the last scroll delta values along X and Y axis.

  **Examples:** used in [Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **getScrollValues**(): v4.0

  Get the current scroll values along X and Y axis. Call it after having called [updateScrollValues()](https://www.curtainsjs.com/curtains-class.html#update-scroll-values) or inside the [onScroll()](https://www.curtainsjs.com/curtains-class.html#on-scroll) event if scroll watching is active.

  **returns:** an object containing the current scroll values along X and Y axis.

  **Examples:** used in [Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **isWebGL2**(): v7.3

  Check whether the created WebGL context is using WebGL2 or not.

  **returns:** an boolean indicating if the context is using WebGL2 or not.
* **lerp**(start, end, amount): v7.0

  Calculates a linear interpolation of the amount specified between the start and end values

  + start

    float

    value to lerp
  + end

    float

    end value to use for lerp
  + amount

    float

    amount of lerp

  **returns:** the linear interpolation result as a float.

  **Examples:** used in [Simple plane](https://www.curtainsjs.com/examples/simple-plane/index.html "Simple plane"), [Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Simple video plane](https://www.curtainsjs.com/examples/simple-video-plane/index.html "Simple video plane"), [Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane"), [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect"), [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes"), [Post processing scrolling wheel with custom transform origin](https://www.curtainsjs.com/examples/post-processing-transform-origin/index.html "Post processing scrolling wheel with custom transform origin"), [Ping pong shading / FBOs swapping flowmap](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading / FBOs swapping flowmap"), [Selective shader passes using render targets](https://www.curtainsjs.com/examples/render-passes-using-render-targets/index.html "Selective shader passes using render targets") and [Multiple planes scroll effect with Locomotive Scroll](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect-custom-scroll/index.html "Multiple planes scroll effect with Locomotive Scroll") examples.
* **needRender**(): v1.8

  This function will reenable the scene drawing for just one frame. Useful if you want to update uniforms if the drawing is disabled.

  **Examples:** used in [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") and [Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading") examples.
* **nextRender**(callback, keep): v7.0updated in v8.0

  A function to execute on the next render call.

  + callback

    function

    callback to execute
  + keep

    bool

    whether to keep executing the callback (act as a setTimeout vs setInterval). Default to false.

  **returns:** the callback queue item. Useful if you need to switch its keep property from true to false once a condition is met (act as a clearInterval).

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") and [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") examples.
* **render**(): v4.0

  This function renders your scene if drawing is enabled. Useful if you're using your own request animation frame loop.
* **resize**(): v2.0 triggers reflow

  This function will resize your scene and all your planes. Called internally at each window resize event. You should call it if you're changing your container size dynamically without changing the window size.
* **restoreContext**(): v2.0

  This function will try to restore the WebGL context. Use it after having previously lost the context.

  **Examples:** used in all [examples](https://www.curtainsjs.com/index.html#examples "Useful examples").
* **setContainer**(container): v6.2

  Set the Curtains [container](https://www.curtainsjs.com/curtains-class.html#container) to which we will append the canvas and then start instancing the Curtains class and the WebGL context.
  Called internally if a container is specified in the [initial parameters](https://www.curtainsjs.com/curtains-class.html#curtains-init-params) object but could be called later on if no container is provided in the initial parameters.

  + container

    HTML Element or string

    HTML element or ID to which append the canvas
* **setPixelRatio**(pixelRatio, triggerCallback): v2.0 triggers reflow

  This function will set a new pixel ratio and resize everything accordingly.
  The default pixel ratio value being initialized is the actual device pixel ratio. Use this method if you want to limit the pixel ratio to improve performance.

  + pixelRatio

    float

    new pixel ratio to set.
  + triggerCallback

    bool, optional

    whether [onAfterResize](https://www.curtainsjs.com/curtains-class.html#on-after-resize) callback should be triggered, false by default.
* **updateScrollValues**(xOffset, yOffset): v4.0

  Updates the scroll values. Use it before updating your planes positions with [updateScrollPosition()](https://www.curtainsjs.com/plane-class.html#update-scroll-position) while scrolling.
  Called internally if scroll watching is active.

  + xOffset

    float

    scroll value along X axis.
  + yOffset

    float

    scroll value along Y axis.

  **Examples:** used in [Multiple planes scroll effect with Locomotive scroll](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect-custom-scroll/index.html "Multiple planes scroll effect with Locomotive scroll") example.

## Events

* **onAfterResize**(callback): v3.0

  This function will be called each time the window has been resized, after everything has been updated.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.
* **onContextLost**(callback): v2.0

  This function will be called each time the WebGL context has been lost.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.

  **Examples:** used in all [examples](https://www.curtainsjs.com/index.html#examples "Useful examples").
* **onContextRestored**(callback): v2.0

  This function will be called each time the WebGL context has been successfully restored.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.
* **onError**(callback): v1.7

  This function will be called if there's an error during the initialisation, or if the WebGL context could not be created.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.

  **Examples:** used in all [examples](https://www.curtainsjs.com/index.html#examples "Useful examples").
* **onRender**(callback): v2.0

  This function is called once at each request animation frame call. Useful if you need to update stats or tweening engine.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.

  **Examples:** used in [Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") examples.
* **onScroll**(callback): v4.0

  This function is called each time a window scroll event is fired and scroll watching is active.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.

  **Examples:** used in [Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **onSuccess**(callback): v8.1

  This function will be called when the WebGL has been successfully created.

  + callback

    function

    function to execute.

  **returns:** your Curtains object, allowing it to be chainable.
