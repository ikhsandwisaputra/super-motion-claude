---
source: https://www.curtainsjs.com/plane-class.html
title: "curtains.js | Documentation | Plane class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Plane class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Plane.js "Plane class source code")

## Basic usage

Plane class inherits from the BasePlane class, which is a class that just sets up the WebGL (buffers and attributes) and sources loading parts of a plane.
Plane **extends** the BasePlane class by adding various properties and methods to keep your WebGL plane in sync with its associated HTML element. All sizes and positions are handled by two matrices that you will have to use inside your vertex shader: the model view matrix and the projection matrix.

To create a plane, you will need to **pass your curtains object and a mandatory HTML element**. It will be used to calculate the size and position of your plane.

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const planeElement = document.getElementById("my-plane");

const plane = new Plane(curtains, planeElement);

## Parameters

The code above will create a basic plane but you won't be able to do much with it. The Plane class has a third parameter in which you can pass all the options you need:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const planeElement = document.getElementById("my-plane");

const params = {

vertexShaderID: "my-plane-vs", // ID of your vertex shader script tag

fragmentShaderID: "my-plane-fs", // ID of your fragment shader script tag

uniforms: { // uniforms are what will allow you to interact with your plane

time: {

name: "uTime", // uniform name that will be passed to our shaders

type: "1f", // this means our uniform is a float

value: 0, // initial value of the uniform

},

},

};

// create our plane with the above parameters

const plane = new Plane(curtains, planeElement, params);

### Passing shaders via data attributes

You can also pass the IDs of the vertex and fragment shaders using respectively data-vs-id and data-fs-id attributes of your plane HTML element:

<!-- div used to create our plane -->

<div id="my-plane" data-vs-id="my-plane-vs" data-fs-id="my-plane-fs">

<!-- image that will be used as texture by our plane -->

<img src="path/to/my-image.jpg" crossorigin="" />

</div>

### Complete parameters list

Here is the complete list of the mandatory parameters and available options:

* curtains

  Curtains class object

  Your Curtains class object.
* planeElement

  HTML element

  a HTML element.
* params

  object, optional

  an object containing the plane parameters:
  + vertexShader

    string, optional

    your vertex shader as a string. Be careful with the line-breaks as it may throw javascript errors. Will look for vertexShaderID param if not specified.
  + vertexShaderID

    string, optional

    the vertex shader ID. If ommited, will look for a data attribute data-vs-id on the plane HTML element. Will use a default vertex shader and throw a warning if nothing specified.
  + fragmentShader

    string, optional

    your fragment shader as a string. Be careful with the line-breaks as it may throw javascript errors. Will look for fragmentShaderID param if not specified.
  + fragmentShaderID

    string, optional

    the fragment shader ID. If ommited, will look for a data attribute data-fs-id on the plane HTML element. Will use a default fragment shader that draws only black pixels and throw a warning if nothing specified.
  + widthSegments

    integer, optional

    the plane's definition along the X axis (1 by default).
  + heightSegments

    integer, optional

    the plane's definition along the Y axis (1 by default).
  + renderOrder

    int, optional

    defines in which order the planes are drawn. See [renderOrder](https://www.curtainsjs.com/plane-class.html#render-order) property. Default to 0.
  + depthTest

    bool, optional

    if your plane should enable or disable the depth test. Default to true.
  + transparent

    bool, optional

    if your plane should handle transparency and therefore be drawn after the planes that do not use transparency (false by default).
  + cullFace

    string, optional

    which face of the plane should be culled. Could either be "back", "front" or "none". Default to "back".
  + alwaysDraw

    bool, optional

    Whether to use frustum culling: defines if the plane should always be drawn or if it should not be drawn if it lies completely outside of the scene (false by default).
  + visible

    bool, optional

    Whether to draw your plane (default to true).
  + drawCheckMargins

    object, optional

    Additional margins to add in the draw check calculations, in pixels.
    Positive value means the plane will be drawn even if outside the canvas by less than the value, negative value means the plane will be hidden if inside the canvas by more than the value.
    Useful if you're messing with the vertices positions in your vertex shader.
    - top

      float

      margin to apply when comparing the top side of the plane and the bottom side of the canvas (0 by default).
    - right

      float

      margin to apply when comparing the right side of the plane and the left side of the canvas (0 by default).
    - bottom

      float

      margin to apply when comparing the bottom side of the plane and the top side of the canvas (0 by default).
    - left

      float

      margin to apply when comparing the left side of the plane and the right side of the canvas (0 by default).
  + watchScroll

    bool, optional

    Whether the plane should auto update its position when the user scrolls (false by default).
  + autoloadSources

    bool, optional

    defines if the sources should be load on init automatically (true by default).
  + texturesOptions

    object, optional

    Default options to apply to the textures of the plane. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + crossOrigin

    string, optional

    defines the crossOrigin process to load images if any (default to "anonymous").
  + fov

    integer, optional

    defines the perspective field of view (default to 50).
  + uniforms

    object, optional

    the uniforms that will be passed to the shaders (if no uniforms specified there won't be any interaction with the plane).
    - name

      string

      The name of the uniform to use in your shaders
    - type

      string

      The type of your uniform (see [here](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html "all uniforms types")).
    - value

      float, integer, Vec2, Vec3, Mat4 or array of floats or integers depending on your uniform type

      The value of the uniform.

## Properties

* **alwaysDraw** (boolean): v2.0

  Whether the WebGL renderer should always draw the plane or if it should draw it only when the plane is contained in the canvas viewport. Used for performance optimizations.

  Check the [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example to see how it could be used.
* **autoloadSources** (boolean): v2.0read only

  Whether the sources (images, videos and canvases HTML children elements of your plane) should be loaded and according textures created on plane initialization.
* **camera** (Camera class object): v7.0read only

  The perspective camera used to compute the projection matrix of the plane.
* **canvases** (array): v1.4

  An array containing all the canvases loaded via the load methods into the plane.
* **crossOrigin** (string): v1.4

  The cross origin process used to load the medias.
* **cullFace** (string): v6.0

  Which face of the plane should be culled (ie not drawn). Could either be **"back"** (only the front side of the plane is drawn), **"front"** (only the back side of the plane is drawn) or **"none"** (all the side of the plane are drawn). Default to "back".
  You might want to change the default culling behavior if you apply a rotation along the X or Y axis for example (therefore showing the back side of the plane).

  Check the [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example to see how it could be used.
* **drawCheckMargins** (object): v4.0

  Additional margins to add in the draw check calculations, in pixels.
  Positive value means the plane will be drawn even if outside the canvas by less than the value, negative value means the plane will be hidden if inside the canvas by more than the value.
  Useful if you're messing with the vertices positions in your vertex shader.

  + top

    float

    margin to apply when comparing the top side of the plane and the bottom side of the canvas (0 by default).
  + right

    float

    margin to apply when comparing the right side of the plane and the left side of the canvas (0 by default).
  + bottom

    float

    margin to apply when comparing the bottom side of the plane and the top side of the canvas (0 by default).
  + left

    float

    margin to apply when comparing the left side of the plane and the right side of the canvas (0 by default).

  Check the [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example to see how it could be used.
* **gl** (WebGL context) v7.0read only

  Our WebGL context.
* **htmlElement** (HTML element): v1.0read only

  The HTML element used to create your plane. Useful if you want to add event listeners to it.
  You can change the HTML element used by the plane at runtime by using the [resetPlane()](https://www.curtainsjs.com/plane-class.html#reset-plane) method.
* **images** (array): v1.0

  An array containing all the images loaded via the load methods into the plane.
* **index** (integer): v1.0read only

  The index of your plane in the [Curtains planes array](https://www.curtainsjs.com/curtains-class.html#planes).
* **loader** (PlaneTextureLoader class object): v7.0read only

  The plane internal texture loader.
* **quaternion** ([Quat](https://www.curtainsjs.com/quat-class.html) class object): v6.0updated in v7.0

  A [Quat](https://www.curtainsjs.com/quat-class.html) class object representing your actual plane rotation in 3D space as a quaternion.
* **relativeTranslation** ([Vec3](https://www.curtainsjs.com/vec-3-class.html) class object): v1.0updated in v6.1

  A [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object containing the additional translation applied to your plane along X, Y and Z axis.

  Since **v8.0**, this property is reactive, which means that when you update one of the relativeTranslation vector component, the translation of the plane will automatically be updated:

  // translate our plane by 100px along X axis

  plane.relativeTranslation.x = 100;
* **renderer** (Renderer class object): v7.0read only

  The Renderer class object created by our curtains object.
* **renderOrder** (int): v7.3read only

  The plane renderOrder value, which determines in which order the planes are drawn.
  A plane will be rendered on top of planes with a lower renderOrder number.
  Use [setRenderOrder()](https://www.curtainsjs.com/plane-class.html#set-render-order) to change this value. Default to 0.
  See [Scene rendering order](https://www.curtainsjs.com/scene-rendering-order.html) to know more about how the things are drawn.
* **rotation** ([Vec3](https://www.curtainsjs.com/vec-3-class.html) class object): v1.0

  A [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object containing the rotation applied to your plane on X, Y and Z axis.

  Since **v8.0**, this property is reactive, which means that when you update one of the rotation vector component, the rotation of the plane will automatically be updated:

  // rotate our plane by PI / 2 along X axis

  plane.rotation.x = Math.PI / 2;
* **scale** ([Vec3](https://www.curtainsjs.com/vec-3-class.html) class object): v1.0

  A [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object containing the scale applied to your plane on X and Y axis (value along Z axis is always equal to 1).

  Since **v8.0**, this property is reactive, which means that when you update one of the scale vector component, the scale of the plane will automatically be updated:

  // scale our plane by 2 along X axis

  plane.scale.x = 2;
* **target** (renderTarget): v5.0

  The render target used to render the plane. Null when no render target is applied and the plane is directly rendered onto the canvas.
* **textures** (array): v2.0

  An array containing all the plane's [Textures](https://www.curtainsjs.com/texture-class.html) already created.
* **transformOrigin** ([Vec3](https://www.curtainsjs.com/vec-3-class.html) class object): v5.0updated in v6.0

  A [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object containing your plane transform origin position along X, Y and Z axis.
  { x:0, y:0, z:0 } is the plane top left corner whereas { x:1, y:1, z:0 } is the plane bottom right corner.
  Use the value along the Z axis to set the transformation origin behind (negative value) or in front (positive value) the plane.
  Values could be negative, or greater than 1. Default to { x:0.5, y:0.5, z:0 } (center of the plane).

  Check the [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example to see how it could be used.
* **type** (string): v7.0read only

  Class object type: "Plane".
* **uniforms** (object): v1.0updated in v7.0

  An object containing all the uniforms you passed as parameters.
  You can update your uniform by modifying its value property.
  Since version 7.0, **you can directly use [Vec2](https://www.curtainsjs.com/vec-2-class.html), [Vec3](https://www.curtainsjs.com/vec-3-class.html), [Mat4](https://www.curtainsjs.com/mat-4-class.html) and [Quat](https://www.curtainsjs.com/quat-class.html) objects as uniform values** instead of arrays.
* **userData** (object): v4.2

  An empty object to store any additional data or custom properties into your plane.
* **uuid** (string): v6.0read only

  The plane's unique identifier.
* **videos** (array): v1.2

  An array containing all the videos loaded via the load methods into the plane.
* **visible** (boolean): v4.3

  Whether your plane should be drawn or not. Set this property to true or false to toggle the plane's visibility.

  Check the [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example to see how it could be used.
* **watchScroll** (bool): v4.0

  Whether your plane's position should be automatically updated when the user scrolls.

## Methods

* **addTexture**(texture): v7.0

  This function takes an already existing texture and adds it to the plane.

  + texture

    [Texture](https://www.curtainsjs.com/texture-class.html) class object

    The texture to add to this plane. Equivalent of the Texture class [addParent()](https://www.curtainsjs.com/texture-class.html#add-parent) method.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") example.
* **createTexture**(params): v2.0updated in v7.0

  This function will create a new [Texture](https://www.curtainsjs.com/texture-class.html) and add it to our Plane.
  The newly created texture will be returned.

  + params

    object, optional

    an object containing the texture [parameters](https://www.curtainsjs.com/texture-class.html#parameters). Will use the default plane texturesOptions if not specified, but you should at least provide a sampler name.

  **returns:** the newly created [Texture](https://www.curtainsjs.com/texture-class.html) if successful.

  **Examples:** used in [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") and [Ping pong shading flowmap](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap") examples.
* **enableDepthTest**(shouldEnableDepthTest): v1.3

  Switches on/off the depth test for that plane. You might want to disable the depth test if you got transparency issues.

  + shouldEnableDepthTest

    bool

    enable or disable the depth test for that plane.
* **getBoundingRect**(): v3.0

  Useful to get our plane HTML element bounding rectangle without causing a reflow/layout repaint. Be careful as the values are relative to your [Curtains pixelRatio](https://www.curtainsjs.com/curtains-class.html#pixel-ratio) value.

  **returns:** an object containing the plane HTML element width, height, top, right, bottom and left positions in pixels.

  **Examples:** used in [Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane"), [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas"), [Multiple planes scroll effect](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **getWebGLBoundingRect**(): v4.0

  Useful to get our plane WebGL element bounding rectangle relative to the viewport, with all transformations applied. Used internally in the draw check function (frustum culling).

  **returns:** an object containing the plane WebGL element width, height, top, right, bottom and left positions in pixels.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example.
* **isDrawn**(): v5.3

  Use this function to check if a plane is currently being drawn or not. A plane is not drawn either if it has not been fully initiated yet, its [visible property](https://www.curtainsjs.com/plane-class.html#visible) is set to false or it is being culled.

  **returns:** a boolean indicating whether the plane is currently drawn or not.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example.
* **loadCanvas**(canvasElement, textureOptions, successCallback): v2.0updated in v7.0

  This function takes a canvas HTML element, creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your plane.

  + canvasElement

    HTML canvas element

    a HTML canvas element to load into your plane.
  + textureOptions

    object, optional

    Default options to apply to that texture. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.

  **Examples:** used in [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas") example.
* **loadCanvases**(canvasElements, texturesOptions, successCallback): v2.0updated in v7.0

  This function takes an array of canvas HTML elements and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + canvasElements

    array or collection of HTML canvas elements

    an array or collection of HTML canvas elements to load into your plane.
  + texturesOptions

    object, optional

    Default options to apply to those textures. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
* **loadImage**(imageElement, textureOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes an image HTML element (or image source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your plane.

  + imageElement

    HTML image element or string

    a HTML image element or image source URL to load into your plane.
  + textureOptions

    object, optional

    Default options to apply to that texture. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(image, error), optional

    Callback executed on source load error.
    - image

      HTML image element

      The image you were trying to load
    - error

      object

      Error thrown
* **loadImages**(imageElements, texturesOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes an array of image HTML elements (or images sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + imageElements

    array or collection of HTML image elements or strings

    an array or collection of HTML image elements or images sources URL to load into your plane.
  + texturesOptions

    object, optional

    Default options to apply to those textures. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(image, error), optional

    Callback executed on each source load error.
    - image

      HTML image element

      The image you were trying to load
    - error

      object

      Error thrown

  **Examples:** used in [Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading") example.
* **loadSource**(sourceElement, textureOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes a source element (or source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your plane.

  + sourceElement

    either image, canvas, video HTML element or string

    an image, canvas, video HTML element or source URL to load into your plane.
  + textureOptions

    object, optional

    Default options to apply to that texture. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(source, error), optional

    Callback executed on source load error.
    - source

      either an image, canvas or video HTML element

      The source you were trying to load
    - error

      object

      Error thrown
* **loadSources**(sourceElements, texturesOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes an array of source elements (or sources URL), creates [Textures](https://www.curtainsjs.com/texture-class.html) using them and loads them into your plane.

  + sourceElements

    array or collection of either images, canvases or videos HTML elements or strings

    an array of image, canvas or video HTML elements or sources URL to load into your plane.
  + textureOptions

    object, optional

    Default options to apply to that texture. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(source, error), optional

    Callback executed on each source load error.
    - source

      either an image, canvas or video HTML element

      The source you were trying to load
    - error

      object

      Error thrown
* **loadVideo**(videoElement, textureOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes a video HTML element (or video source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your plane.

  + videoElement

    HTML video element or string

    a HTML video element or video source URL to load into your plane.
  + textureOptions

    object, optional

    Default options to apply to that texture. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(video, error), optional

    Callback executed on source load error.
    - video

      HTML video element

      The video you were trying to load
    - error

      object

      Error thrown
* **loadVideos**(videoElements, texturesOptions, successCallback, errorCallback): v2.0updated in v7.1

  This function takes an array of video HTML elements (or videos sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + videoElements

    array or collection of HTML video elements or strings

    an array or collection of HTML video elements or videos sources URL to load into your plane.
  + texturesOptions

    object, optional

    Default options to apply to those textures. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
  + errorCallback

    function(video, error), optional

    Callback executed on each source load error.
    - video

      HTML video element

      The video you were trying to load
    - error

      object

      Error thrown
* **mouseToPlaneCoords**(mousePosition): v1.0

  Get the mouse coordinates relative to the plane clip space values. Use it to send to a uniform and interact with your plane. A plane coordinates ranges from (-1, 1) in the top left corner to (1, -1) in the bottom right corner, which means the values along the Y axis are inverted.

  + mousePosition

    [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object

    mouse position along X and Y axis (you should use the event clientX and clientY values).

  **returns:** a [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object containing the mouse coordinates relative to the plane clip space values.

  **Examples:** used in [Vertex coordinates helper](https://www.curtainsjs.com/examples/vertex-coords-helper/index.html "Vertex coordinates helper"), [Simple plane](https://www.curtainsjs.com/examples/simple-plane/index.html "Simple plane"), [Simple video plane](https://www.curtainsjs.com/examples/simple-video-plane/index.html "Simple video plane"), [Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane") examples.
* **playVideos**(): v1.2

  This function will automatically start all of your plane videos playback. If you are not calling it after a user action it might not work on mobile.

  **Examples:** used in [Simple video plane](https://www.curtainsjs.com/examples/simple-video-plane/index.html "Simple video plane"), [Multiple video textures with a displacement shader](https://www.curtainsjs.com/examples/multiple-video-textures/index.html "Multiple video textures") examples.
* **remove**(): v7.0

  This function will remove the plane from our Curtains object and renderer and delete all of its textures. It will also update all other planes indexes.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") example.
* **removeRenderTarget**(): v7.3

  Removes the plane current render target if any.
* **resetPlane**(htmlElement): v5.1 may trigger reflow

  + htmlElement

    HTML element, optional

    a new HTML to use for your plane sizes and position syncing. Default to null (keep the current HTML element).

  Reset your plane transformations values, including the transform origin.
  If a HTML element is specified, will update the plane's sizes and position according to that new element (**triggers reflow**). Useful if you want to keep a plane after an AJAX page transition and re-sync it with a newly appended element.
* **resize**(): v7.0 triggers reflow

  This method is called internally by the Curtains [resize()](https://www.curtainsjs.com/curtains-class.html#resize) method each time the window is resized, but you should call it manually each time you're updating a plane size, either via CSS animations or directly in javascript. It will updates its position as well.
* **setPerspective**(fieldOfView, nearPlane, farPlane): v1.0updated in v7.0

  Set the perspective. Increasing the field of view will increase the perspective.
  Since v7.0, all the internal maths are done assuming the camera Z position is available via the plane's camera [Vec3](https://www.curtainsjs.com/vec-3-class.html) position **plane.camera.position.z** property.

  + fieldOfView

    integer

    the perspective field of view. Should be greater than 0 and lower than 180. Default to 50.
  + nearPlane

    float, optional

    closest point where a mesh vertex is displayed. Default to 0.1.
  + farPlane

    float, optional

    farthest point where a mesh vertex is displayed. Default to 150.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet"), [Simple plane](https://www.curtainsjs.com/examples/simple-plane/index.html "Simple plane"), [Simple video plane](https://www.curtainsjs.com/examples/simple-video-plane/index.html "Simple video plane"), [Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane") examples.
* **setRenderOrder**(renderOrder): v7.3

  Sets the plane new [render order](https://www.curtainsjs.com/plane-class.html#render-order).
  A plane will be rendered on top of planes with a lower renderOrder number. Negative numbers are accepted. You can ommit the renderOrder parameter to reset a plane renderOrder value.

  + renderOrder

    int

    the new render order to use. Default to 0.

  **Examples:** used in [GSAP click to fullscreen gallery](https://www.curtainsjs.com/examples/gsap-click-to-fullscreen-gallery/index.html "GSAP click to fullscreen gallery example") example.
* **setRenderTarget**(renderTarget): v5.0

  The render target onto which you want to render your plane.

  + renderTarget

    [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object

    the RenderTarget to use.

  **Examples:** used in [Ping pong shading flowmap example](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap example") and [Selective shader passes using render targets](https://www.curtainsjs.com/examples/render-passes-using-render-targets/index.html "Selective shader passes using render targets") examples.
* **setRelativeTranslation**(translation): v7.0

  Set the plane translation based on pixel units. Please note that this will not be applied to your plane HTML element, so it's more like an additional translation.
  The translation along the Z axis is being treated like the **CSS translateZ** function, using the current field of view to compute the corresponding **CSS perspective** property (a small field of view means a big perspective value and vice versa).

  + translation

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    the translation value to apply on the X, Y and Z axes in pixel.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **setRotation**(angle): v1.0updated in v7.0

  Set the plane rotation using Euler angles and 'XYZ' as axes order.

  + angle

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    the angle in radians to rotate around the X, Y and Z axes.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") example.
* **setScale**(scale): v1.0updated in v7.0

  Set the plane new scale.

  + scale

    [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object

    the scale to set along the X and Y axes.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet"), [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **setTransformOrigin**(origin): v5.0updated in v7.0

  Set the plane transform origin to use with your transformations (scale and rotation). See the [transformOrigin](https://www.curtainsjs.com/plane-class.html#transform-origin) property.

  + origin

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    the plane transform origin along the X, Y and Z axes.

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") and [Post processing scrolling wheel with custom transform origin](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Post processing scrolling wheel with custom transform origin") example.
* **updatePosition**(): v1.6 triggers reflow

  Internally, the planes positions are updated only when the window is resized. But if you are updating your plane HTML element position without resizing the window (typically while scrolling, animating its CSS position or transform values), call this method in your animation loop at the same time.
  This method calls getBoundingClientRect() therefore causing a reflow/layout repaint of the page. See [setRelativeTranslation](https://www.curtainsjs.com/plane-class.html#set-relative-translation) to update your plane position without any reflow.
* **updateScrollPosition**(): v4.0

  Use it if you want to handle the scroll event by yourself, like with a virtual scroll library. You will have to pass the scroll values to the Curtains class with [updateScrollValues()](https://www.curtainsjs.com/curtains-class.html#update-scroll-values) before calling this method.

  **Examples:** used in [Multiple planes scroll effect with Locomotive scroll](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect-custom-scroll/index.html "Multiple planes scroll effect with Locomotive scroll") example.

## Events

* **onAfterRender**(callback): v5.0

  This function will be called just after your plane has been drawn.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [Ping pong shading flowmap](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap") example.
* **onAfterResize**(callback): v3.0

  This function will be called each time your plane has been resized, after everything has been updated.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane"), [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
* **onError**(callback): v7.0

  This function is called if there's an error while instancing your plane, usually because the shaders compilation failed.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") example.
* **onLeaveView**(callback): v2.0

  This function will be triggered each time a plane leaves the Curtains container viewport area, unless [alwaysDraw property](https://www.curtainsjs.com/plane-class.html#always-draw) is set to true.
  If alwaysDraw property is set to false, an out-of-view plane is not drawn anymore and its textures are no longer updated, but its uniforms are still updated and its onRender callback is still called.
  You might want to pause its videos as well if it contains any.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") example.
* **onLoading**(callback(texture)): v1.0

  This function will be fired each time a source element (either an image, a canvas or a video) of the plane has been loaded and is ready to display. You'll have access here to the newly created texture. Useful to handle a loader or manipulate the texture.

  + callback

    function

    function to execute, with the newly created texture passed as parameter.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading") example.
* **onReady**(callback): v1.0

  This function will be called once our plane is all set up and ready to be drawn.
  If [autoloadSources](https://www.curtainsjs.com/plane-class.html#autoload-sources) is set to true, il will be called after the images, canvas and videos are loaded. Otherwise it will be called almost right away.
  This is where you may want to add event listener to interact with your plane or update its uniforms.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in most [examples](https://www.curtainsjs.com/index.html#examples "Useful examples").
* **onReEnterView**(callback): v2.0

  This function will be triggered each time a plane reenters the Curtains container viewport area, unless [alwaysDraw property](https://www.curtainsjs.com/plane-class.html#always-draw) is set to true.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax") example.
* **onRender**(callback): v1.0

  This function will be triggered for each plane at each requestAnimationFrame call. Useful to update a time uniform, change plane rotation, scale, etc.

  + callback

    function

    function to execute.

  **returns:** your Plane object, allowing it to be chainable.

  **Examples:** used in most [examples](https://www.curtainsjs.com/index.html#examples "Useful examples").
