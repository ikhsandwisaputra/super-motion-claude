---
source: https://www.curtainsjs.com/shader-pass-class.html
title: "curtains.js | Documentation | ShaderPass class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# ShaderPass class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/framebuffers/ShaderPass.js "ShaderPass class source code")

## Basic usage

Shader passes offers the possibility to add **post-processing** to either a bunch of planes or your whole scene. Think of it as an additional plane that would have the size of your WebGL canvas and that would render a set of planes into a texture and draw it. You'd then be able to manipulate that texture in your fragment shader.

Like the [Plane](https://www.curtainsjs.com/plane-class.html) class it inherits from the Mesh and DOMMesh classes.
ShaderPass **extends** the DOMMesh class by handling the creation of a frame buffer object and the creation of a render texture.

Please note that render targets (and therefore shader passes) disable the WebGL context default antialiasing. If you use them, you should set the [antialias Curtains property](https://www.curtainsjs.com/curtains-class.html#curtains-init-parameters) to false when initiating your context.
You might then want to add an extra antialiasing pass, by using the built-in [FXAAPass](https://www.curtainsjs.com/fxaa-pass-class.html) class or your own FXAA or MSAA implementation.
See the [Post processing scrolling wheel with custom transform origin](https://www.curtainsjs.com/examples/post-processing-transform-origin/index.html "Post processing scrolling wheel with custom transform origin") for an example of how to add a FXAAPass.

### Creation

To create a shader pass that will be applied to the whole scene, use its constructor:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new shader pass using our curtains object

const shaderPass = new ShaderPass(curtains);

## Parameters

The code above will create a basic shader pass but you won't be able to do much with it. The [addShaderPass](https://www.curtainsjs.com/curtains-class.html#add-shader-pass) method has a parameter in which you can pass all the options you need:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const shaderPassParams = {

vertexShaderID: "my-shader-pass-vs", // ID of your vertex shader script tag

fragmentShaderID: "my-shader-pass-fs", // ID of your fragment shader script tag

uniforms: { // uniforms are what will allow you to interact with your shader pass

time: {

name: "uTime", // uniform name that will be passed to our shaders

type: "1f", // this means our uniform is a float

value: 0, // initial value of the uniform

},

},

};

// create a new shader pass using our curtains object and the above parameters

var shaderPass = new ShaderPass(curtains, shaderPassParams);

### Using with a render target

If you want to apply your shader pass to just a set of planes instead of your whole scene, you'll have to pass a RenderTarget element as a parameter. See [Assigning a RenderTarget to a ShaderPass](https://www.curtainsjs.com/render-target-class.html#assigning-render-target-to-shader-pass).

See below for a full list of all [possible parameters](https://www.curtainsjs.com/shader-pass-class.html#shader-pass-parameters) to know more.

### Shaders

Shader passes uses slightly different vertex and fragment shaders than the [Plane](https://www.curtainsjs.com/plane-class.html) objects.

### Vertex shader

Since shader passes does not have projection and model view matrices, the default vertex shader is extremely simple (and optional).
If you add a new texture to your shader pass, do not forget to handle its matrix in this vertex shader.

precision mediump float;

// those are the mandatory attributes that the lib sets

attribute vec3 aVertexPosition;

attribute vec2 aTextureCoord;

// pass your vertex and texture coords to the fragment shader

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

void main() {

gl\_Position = vec4(aVertexPosition, 1.0);

// set the varyings

// use our aTextureCoord attributes as texture coords in our fragment shader

vTextureCoord = aTextureCoord;

vVertexPosition = aVertexPosition;

}

### Fragment shader

The ShaderPass object automatically creates a texture holding your shader pass FBO content upon creation. You will have to display that texture to display your shader pass content. If you want to apply any post processing effect, this will be by manipulating this texture.
This texture sampler name is **uRenderTexture**.

precision mediump float;

// get our varyings

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

// our render texture

uniform sampler2D uRenderTexture;

void main() {

// display our render texture, which contains our shader pass frame buffer object content

gl\_FragColor = texture2D(uRenderTexture, vTextureCoord);

}

### Complete parameters list

* curtains

  Curtains class object

  Your Curtains class object.
* params

  object, optional

  an object containing the plane parameters:
  + vertexShader

    string, optional

    your vertex shader as a string. Be careful with the line-breaks as it may throw javascript errors. Will look for vertexShaderID param if not specified.
  + vertexShaderID

    string, optional

    the vertex shader ID. Will use a default vertex shader if nothing specified.
  + fragmentShader

    string, optional

    your fragment shader as a string. Be careful with the line-breaks as it may throw javascript errors. Will look for fragmentShaderID param if not specified.
  + fragmentShaderID

    string, optional

    the fragment shader ID. Will use a default fragment shader that draws the scene without modifications if nothing specified.
  + renderOrder

    int, optional

    defines in which order the shader passes are drawn. See [renderOrder](https://www.curtainsjs.com/shader-pass-class.html#render-order) property. Default to 0.
  + depthTest

    bool, optional

    if your shader pass should enable or disable the depth test. Default to true.
  + depth

    bool, optional

    whether the shader pass render target should use a depth buffer (see [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object). Default to false.
  + clear

    bool, optional

    whether the shader pass render target content should be cleared before being drawn (see [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object). Default to true.
  + renderTarget

    [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object, optional

    an already existing render target to use. Default to null.
  + texturesOptions

    object, optional

    Default options to apply to the textures of the shader pass. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + crossOrigin

    string, optional

    defines the crossOrigin process to load images if any (default to "anonymous").
  + uniforms

    object, optional

    the uniforms that will be passed to the shaders (if no uniforms specified there won't be any interaction with the shader pass).
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

* **canvases** (array): v3.0

  An array containing all the canvases loaded via the load methods into the shader pass.
* **crossOrigin** (string): v3.0

  The cross origin process used to load the medias.
* **cullFace** (string): v7.0read only

  Which face of the shader pass should be culled (ie not drawn). By default, only the back face of the shader pass is culled.
* **gl** (WebGL context) v7.0read only

  Our WebGL context.
* **htmlElement** (HTML element): v3.0

  The HTML element used to create your shader passwhich is your [Curtains wrapper container](https://www.curtainsjs.com/curtains-class.html#container).
* **images** (array): v3.0

  An array containing all the images loaded via the load methods into the shader pass.
* **index** (integer): v3.0 read only

  The index of your shader pass in the [Curtains shaderPasses array](https://www.curtainsjs.com/curtains-class.html#shader-passes).
* **loader** (PlaneTextureLoader class object): v7.0read only

  The shader pass internal texture loader.
* **renderer** (Renderer class object): v7.0read only

  The Renderer class object created by our curtains object.
* **renderOrder** (int): v7.3read only

  The shader pass renderOrder value, which determines in which order the shader passes are drawn.
  A shader pass will be drawn after shader passes with a lower renderOrder number.
  Use [setRenderOrder()](https://www.curtainsjs.com/plane-class.html#set-render-order) to change this value. Default to 0.
  See [Scene rendering order](https://www.curtainsjs.com/scene-rendering-order.html) to know more about how the things are drawn.
* **target** (RenderTarget class object): v5.0

  The render target used to render the shader pass.
* **textures** (array): v3.0

  An array containing all the shader pass' [Textures](https://www.curtainsjs.com/texture-class.html) already created.
* **type** (string): v7.0read only

  Class object type: "ShaderPass".
* **uniforms** (object): v3.0updated in v7.0

  An object containing all the uniforms you passed as parameters.
  You can update your uniform by modifying its value property.
  Since version 7.0, **you can directly use [Vec2](https://www.curtainsjs.com/vec-2-class.html), [Vec3](https://www.curtainsjs.com/vec-3-class.html), [Mat4](https://www.curtainsjs.com/mat-4-class.html) and [Quat](https://www.curtainsjs.com/quat-class.html) objects as uniform values** instead of arrays.
* **userData** (object): v4.2

  An empty object to store any additional data or custom properties into your shader pass.
* **uuid** (string): v6.0read only

  The shader pass's unique identifier.
* **videos** (array): v3.0

  An array containing all the videos loaded via the load methods into the shader pass.

## Methods

* **addTexture**(texture): v7.0

  This function takes an already existing texture and adds it to the shader pass.

  + texture

    [Texture](https://www.curtainsjs.com/texture-class.html) class object

    The texture to add to this shader pass. Equivalent of the Texture class [addParent()](https://www.curtainsjs.com/texture-class.html#add-parent) method.
* **createTexture**(params): v2.0updated in v5.1

  This function will create a new [Texture](https://www.curtainsjs.com/texture-class.html) and add it to our ShaderPass.
  The newly created texture will be returned.

  + params

    object, optionnal

    an object containing the texture parameters:
    - sampler

      string, optionnal

      a string to set the name of your sampler uniform in your shader. Will also impact the texture matrix uniform name. If not specified, will name your sampler "uSampler" + index of this texture in your shader pass.
    - fromTexture

      [Texture](https://www.curtainsjs.com/texture-class.html) object, optionnal

      an already existing texture to copy into your new texture. Similar to the Texture class' [setFromTexture()](https://www.curtainsjs.com/texture-class.html#set-from-texture) method.

  **returns:** the newly created [Texture](https://www.curtainsjs.com/texture-class.html) if successful.
* **getBoundingRect**(): v3.0

  Useful to get our [container](https://www.curtainsjs.com/curtains-class.html#container) HTML element bounding rectangle without causing a reflow/layout repaint. Be careful as the values are relative to your [Curtains pixelRatio](https://www.curtainsjs.com/curtains-class.html#pixel-ratio) value.

  **returns:** an object containing the container HTML element width, height, top and left positions.
* **loadCanvas**(canvasElement, textureOptions, successCallback): v3.0updated in v7.0

  This function takes a canvas HTML element, creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your shader pass.

  + canvasElement

    HTML canvas element

    a HTML canvas element to load into your shader pass.
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
* **loadCanvases**(canvasElements, texturesOptions, successCallback): v3.0updated in v7.0

  This function takes an array of canvas HTML elements and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + canvasElements

    array or collection of HTML canvas elements

    an array or collection of HTML canvas elements to load into your shader pass.
  + texturesOptions

    object, optional

    Default options to apply to those textures. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
* **loadImage**(imageElement, textureOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes an image HTML element (or image source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your shader pass.

  + imageElement

    HTML image element or string

    a HTML image element or image source URL to load into your shader pass.
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
* **loadImages**(imageElements, texturesOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes an array of image HTML elements (or images sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + imageElements

    array or collection of HTML image elements or strings

    an array or collection of HTML image elements or images sources URL to load into your shader pass.
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
* **loadSource**(sourceElement, textureOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes a source element (or source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your shader pass.

  + sourceElement

    either image, canvas, video HTML element or string

    an image, canvas or video HTML element to load into your shader pass.
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
* **loadSources**(sourceElements, texturesOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes an array of source elements (or sources URL), creates [Textures](https://www.curtainsjs.com/texture-class.html) using them and loads them into your shader pass.

  + sourceElements

    array or collection of either images, canvases or videos HTML elements or strings

    an array of image, canvas or video HTML elements or sources URL to load into your shader pass.
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
* **loadVideo**(videoElement, textureOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes a video HTML element (or video source URL), creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it and loads it into your shader pass.

  + videoElement

    HTML video element or string

    a HTML video element or video source URL to load into your shader pass.
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
* **loadVideos**(videoElements, texturesOptions, successCallback, errorCallback): v3.0updated in v7.1

  This function takes an array of video HTML elements (or videos sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + videoElements

    array or collection of HTML video elements or strings

    an array or collection of HTML video elements or videos sources URL to load into your shader pass.
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
* **mouseToPlaneCoords**(xMousePosition, yMousePosition): v3.0

  Get the mouse coordinates relative to the shader pass clip space values. Use it to send to a uniform and interact with your shader pass. A shader pass coordinates ranges from (-1, 1) in the top left corner to (1, -1) in the bottom right corner, which means the values along the Y axis are inverted.

  + xMousePosition

    float

    mouse event clientX value.
  + yMousePosition

    float

    mouse event clientX value.
* **playVideos**(): v3.0

  This function will automatically start all of your shader pass videos playback. If you are not calling it after a user action it might not work on mobile.
* **remove**(): v7.0

  This function will remove the shader pass and its render target from our Curtains object and renderer and delete all of its textures. It will also update all other shader passes indexes.
* **setRenderOrder**(renderOrder): v7.3

  Sets the shader pass new [render order](https://www.curtainsjs.com/plane-class.html#render-order).
  A shader pass will be drawn after the shader passes with a lower renderOrder number. Negative numbers are accepted. You can ommit the renderOrder parameter to reset a shader pass renderOrder value.

  + renderOrder

    int

    the new render order to use. Default to 0.

## Events

* **onAfterRender**(callback): v5.0

  This function will be called just after your shader pass has been drawn.

  + callback

    function

    function to execute.

  **returns:** your ShaderPass object, allowing it to be chainable.
* **onAfterResize**(callback): v3.0

  This function will be called each time your container has been resized, after everything has been updated.

  + callback

    function

    function to execute.

  **returns:** your ShaderPass object, allowing it to be chainable.
* **onError**(callback): v7.0

  This function is called if there's an error while instancing your shader pass, usually because the shaders compilation failed.

  + callback

    function

    function to execute.

  **returns:** your ShaderPass object, allowing it to be chainable.
* **onLoading**(callback(texture)): v3.0

  This function will be fired each time a source element (either an image, a canvas or a video) of the shader pass has been loaded and is ready to display. You'll have access here to the newly created texture. Useful to handle a loader or manipulate the texture.

  + callback

    function

    function to execute, with the newly created texture passed as parameter.

  **returns:** your ShaderPass object, allowing it to be chainable.

  **Examples:** used in [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") example.
* **onReady**(callback): v3.0

  This function will be called once our shader pass is all set up and ready to be drawn.

  + callback

    function

    function to execute.

  **returns:** your ShaderPass object, allowing it to be chainable.

  **Examples:** used in [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") example.
* **onRender**(callback): v3.0

  This function will be triggered for each shader pass at each requestAnimationFrame call. Useful to update a time uniform.

  + callback

    function

    function to execute.

  **returns:** your ShaderPass object, allowing it to be chainable.

  **Examples:** used in [Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect") and [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") examples.
