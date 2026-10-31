---
source: https://www.curtainsjs.com/texture-class.html
title: "curtains.js | Documentation | Texture class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Texture class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/core/Texture.js "Texture class source code")

## Basic usage

### Creation

There are **several ways** to create textures.
The easiest one is by simply calling its constructor:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new texture using our curtains object

// use "uTexture" as sampler name

const texture = new Texture(curtains, {

sampler: "uTexture"

});

// ...you could add it to a plane or a shader pass later with the addParent() method

You can also create textures by creating a [TextureLoader](https://www.curtainsjs.com/texture-loader-class.html) first and then load HTML medias elements with it:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new texture loader

const loader = new TextureLoader(curtains);

// load an image with the loader

const image = new Image();

image.crossOrigin = "anonymous";

image.src = "path/to/my-image.jpg";

let newTexture;

loader.loadImage(image, {

// texture options (we're only setting its sampler name here)

sampler: "uTexture"

}, (texture) => {

// texture has been successfully created

newTexture = texture;

// ...you could add it to a plane or a shader pass with the addParent() method

}, (image, error) => {

// there has been an error while loading the image

});

Another way to create a texture is by using the [createTexture](https://www.curtainsjs.com/plane-class.html#create-texture) method of your [Plane](https://www.curtainsjs.com/plane-class.html) or [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html#textures) class object:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const planeElement = document.getElementById("my-plane");

const plane = new Plane(curtains, planeElement);

// create a new texture using our plane createTexture method

// use "uTexture" as sampler name

const myTexture = plane.createTexture({

sampler: "uTexture"

});

Textures are also automatically created each time one of the plane [loading methods](https://www.curtainsjs.com/plane-class.html#load-canvas) is called.
Eventually, if your plane [autoloadSources](https://www.curtainsjs.com/plane-class.html#autoload-sources) initial parameter is set to true (which is by default), they will be created on initialization for each image, canvas or video children of your plane.

#### Texture options

Upon creation, you can pass a few options like magnification and minification filters, anisotropy, wrapping or premultiplyAlpha, etc.
See the complete [parameters list](https://www.curtainsjs.com/texture-class.html#parameters) to have a look at all the options available.

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new texture using our curtains object

// use "uTexture" as sampler name and set a few options as well

const texture = new Texture(curtains, {

// set premultiplyAlpha to true, minFilter, anisotropy and use half-floating point texture

sampler: "uTexture",

premultiplyAlpha: true,

minFilter: curtains.gl.LINEAR\_MIPMAP\_NEAREST,

anisotropy: 16,

floatingPoint: "half-float"

});

// ...you could add it to a plane or a shader pass later with the addParent() method

#### Built-in uniform names

By default the textures sampler and matrix uniform names sent to your shaders will be set upon their media element order inside your plane element, following this rule:

**`uSampler{index}`** for texture samplers
**`uTextureMatrix{index}`** for texture matrices

##### HTML

<!-- div used to create our plane -->

<div id="my-plane">

<!-- images that will be used as textures by our plane -->

<img src="path/to/my-image-1.jpg" crossorigin="" />

<img src="path/to/my-image-2.jpg" crossorigin="" />

</div>

##### Javascript

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const planeElement = document.getElementById("my-plane");

const plane = new Plane(curtains, planeElement);

##### Shaders

// use this in your vertex shader

uniform mat4 uTextureMatrix0; // texture matrix of my-image-1.jpg

uniform mat4 uTextureMatrix1; // texture matrix of my-image-2.jpg

...

// use this in your fragment shader

uniform sampler2D uSampler0; // bound to my-image-1.jpg

uniform sampler2D uSampler1; // bound to my-image-2.jpg

#### Using custom uniform names

You can define custom uniform names by specifying a **data-sampler attribute** of your media HTML element. The uniform names will then follow these rules:

**`{data-sampler}`** for texture samplers
**`{data-sampler}Matrix`** for texture matrices

##### HTML

<!-- div used to create our plane -->

<div id="my-plane">

<!-- images that will be used as textures by our plane -->

<img src="path/to/my-image-1.jpg" crossorigin="" data-sampler="firstTexture" />

<img src="path/to/my-image-2.jpg" crossorigin="" data-sampler="secondTex" />

</div>

##### Shaders

// use this in your vertex shader

uniform mat4 firstTextureMatrix; // texture matrix of my-image-1.jpg

uniform mat4 secondTexMatrix; // texture matrix of my-image-2.jpg

...

// use this in your fragment shader

uniform sampler2D firstTexture; // bound to my-image-1.jpg

uniform sampler2D secondTex; // bound to my-image-2.jpg

A newly created texture will just display black pixels until you've [set it a source](https://www.curtainsjs.com/texture-class.html#set-source) from one of the images, canvases or videos already loaded in your plane.

### Using texture matrices

Shaders use texture coordinates (or UVs) to map a texture to the plane.
By default the library sets an arbitrary aTextureCoord attributes that you could use in your shaders:

<!-- vertex shader -->

<script id="plane-vs" type="x-shader/x-vertex">

precision mediump float;

// those are the mandatory attributes that the lib sets

attribute vec3 aVertexPosition;

attribute vec2 aTextureCoord;

// those are mandatory uniforms that the lib sets and that contain our model view and projection matrix

uniform mat4 uMVMatrix;

uniform mat4 uPMatrix;

// pass your vertex and texture coords to the fragment shader

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

void main() {

gl\_Position = uPMatrix \* uMVMatrix \* vec4(aVertexPosition, 1.0);

// set the varyings

// use our aTextureCoord attributes as texture coords in our fragment shader

vTextureCoord = aTextureCoord;

vVertexPosition = aVertexPosition;

}

</script>

<!-- fragment shader -->

<script id="plane-fs" type="x-shader/x-fragment">

precision mediump float;

// get our varyings

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

// our texture sampler (default sampler name)

uniform sampler2D uSampler0;

void main() {

// map our texture with the original texture coords

gl\_FragColor = texture2D(uSampler0, vTextureCoord);

}

</script>

You may use it to map your texture to your plane, but if the plane and the media aspect ratio are different, **you'll end up with a distorted texture**.

Fortunately, there's a built-in solution to display your textures without them being distorted: texture matrices. Each time you set a source to a texture (or each time a plane is resized), its texture matrix is automatically computed and sent to your shader as a uniform. With the same example as above, here's how to use it:

<!-- vertex shader -->

<script id="plane-vs" type="x-shader/x-vertex">

precision mediump float;

// those are the mandatory attributes that the lib sets

attribute vec3 aVertexPosition;

attribute vec2 aTextureCoord;

// those are mandatory uniforms that the lib sets and that contain our model view and projection matrix

uniform mat4 uMVMatrix;

uniform mat4 uPMatrix;

// our texture matrix that will handle image cover

uniform mat4 uTextureMatrix0;

// pass your vertex and texture coords to the fragment shader

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

void main() {

gl\_Position = uPMatrix \* uMVMatrix \* vec4(aVertexPosition, 1.0);

// set the varyings

// here we use our texture matrix to calculate the accurate texture coords

vTextureCoord = (uTextureMatrix0 \* vec4(aTextureCoord, 0.0, 1.0)).xy;

vVertexPosition = aVertexPosition;

}

</script>

<!-- fragment shader -->

<script id="plane-fs" type="x-shader/x-fragment">

precision mediump float;

// get our varyings

varying vec3 vVertexPosition;

varying vec2 vTextureCoord;

// our texture sampler (default sampler name)

uniform sampler2D uSampler0;

void main() {

// map our texture with the texture matrix coords

gl\_FragColor = texture2D(uSampler0, vTextureCoord);

}

</script>

The texture matrix uniform name will follow the same rule as the sampler uniform name:
If you did not specify any name, it will be named "uTextureMatrix" + your texture index.
If you did specify a sampler name, it will be named samplerName + "Matrix".

## Parameters

Here is the complete list of mandatory and optional parameters for the texture:

* curtains

  Curtains class object

  Your Curtains class object.
* params

  object, optional

  an object containing the texture parameters:
  + sampler

    string, optional

    Sampler name to use in your sampler and texture matrix uniforms.
  + fromTexture

    Texture class object, optional

    Copy the texture passed into this texture
  + premultiplyAlpha

    bool, optional

    whether this texture should use premultiplied alpha or not. Default to false.
  + floatingPoint

    string, optional

    whether this texture should use floating points or not (if available, depending on the WebGL context and extensions). Accepted values are "none", "half-float" and "float". Default to "none".
  + anisotropy

    integer, optional

    texture anisotropy value (see [anisotropic filtering](https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic) explanation). Usually ranging from 1 to 16, depending on the WebGL context and extensions available. Default to 1.
  + generateMipmap

    bool, optional

    Whether to generate mipmaps for that texture (see [mip maps](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipmap) explanation). Default to true for images textures. Note that videos and canvases textures will never generate mip maps as they are frequently uploaded.
  + minFilter

    GLenum, optional

    the texture minification filter. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 filters need a power of 2 sized source). Default to **gl.LINEAR**.
  + magFilter

    GLenum, optional

    the texture magnification filter. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 filters need a power of 2 sized source). Default to **gl.LINEAR**.
  + wrapS

    GLenum, optional

    the texture wrapping along the X axis. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 wrapping need a power of 2 sized source). Default to **gl.CLAMP\_TO\_EDGE**.
  + wrapT

    GLenum, optional

    the texture wrapping along the Y axis. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 wrapping need a power of 2 sized source). Default to **gl.CLAMP\_TO\_EDGE**.

## Properties

* **gl** (WebGL context) v7.0read only

  Our WebGL context.
* **index** (integer): v2.0 read only

  The index of your texture in the [Plane](https://www.curtainsjs.com/plane-class.html#textures) or [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html#textures) textures array.
  Since ShaderPass silently creates a texture on init, if you add a texture to it later, this texture will have an index of 1.
* **offset** ([Vec2](https://www.curtainsjs.com/vec-2-class.html) class object): v7.3

  An object containing the offset applied to your texture on x and y axis. Only applied if you are using the texture matrix to map your texture in your shaders.
* **parameters** (object): v7.0read only

  Actual texture parameters values used: anisotropy, generateMipmap, minFilter, magFilter, wrapS and wrapT.
* **renderer** (Renderer class object): v7.0read only

  The renderer created by our curtains object.
* **scale** ([Vec2](https://www.curtainsjs.com/vec-2-class.html) class object): v2.0

  An object containing the scale applied to your texture on x and y axis. Only applied if you are using the texture matrix to map your texture in your shaders.
* **shouldUpdate** (boolean): v2.0

  Depends on your texture [sourceType](https://www.curtainsjs.com/texture-class.html#source-type).
  By default, a canvas texture will be updated at each requestAnimationFrame call, a video texture will be updated when the next frame is available, and an image texture will never be updated.
  If you want to stop updating your canvas or video texture, set this flag to false for performance boost.

  **Examples:** used in [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas") example.
* **source** (HTML element): v2.0

  The source used by your texture. Could be either an image, canvas or video HTML element. Use it to safely access any property or method of that element, like play() or pause() for videos.
* **sourceType** (string): v7.0read only

  The type or your texture. Could be either "empty", "image", "canvas", "video" or "fboTexture".
  A "fboTexture" is a [RenderTarget](https://www.curtainsjs.com/render-target-class.html) texture onto which your plane or scene is drawn.
* **type** (string): v7.0read only

  Class object type: "Texture".
* **userData** (object): v5.0

  An empty object to store any additional data or custom properties into your texture.
* **uuid** (string): v6.0read only

  The texture's unique identifier.

## Methods

* **addParent**(parent): v7.0

  Adds your texture to a [Plane](https://www.curtainsjs.com/plane-class.html) or a [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) so it can display it.

  + parent

    Plane class object or ShaderPass class object

    The WebGL object that should use that texture.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") example.
* **copy**(texture): v7.0

  Copy an already existing Texture into this texture.

  + texture

    Texture class object

    The texture to copy.

  **Examples:** used in [Ping pong shading flowmap](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap") example.
* **hasParent**(): v7.0

  Whether this texture currently has a parent or not.

  **returns:** true if this texture has a parent, false otherwise.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") example.
* **needUpdate**(): v4.1

  Force your texture to be updated during the next draw call, even if its [shouldUpdate](https://www.curtainsjs.com/texture-class.html#should-update) property is set to false. Use it if you want to force a canvas texture update just once for example.

  **Examples:** used in [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas") example.
* **resize**(): v4.2

  Force the update of your texture matrix. Useful when you manually resize your source (usually a canvas).

  **Examples:** used in [Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas") example.
* **setAnisotropy**(anisotropy): v7.0

  Set the texture's anisotropy value (see [anisotropic filtering](https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic) explanation).

  + anistropy

    integer

    anisotropy value to apply (usually between 1 - low and 16 - high).

  **Examples:** used in [Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet") example.
* **setMagFilter**(magFilter): v7.0

  Set the texture's magnification filter.

  + magFilter

    GLenum

    magnification filter to apply. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 filters need a power of 2 sized source).
* **setMinFilter**(minFilter): v7.0

  Set the texture's minification filter.

  + minFilter

    GLenum

    minification filter to apply. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 filters need a power of 2 sized source).

  **Examples:** used in [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") example.
* **setOffset**(offset): v7.3

  Set the texture offset. Only applied if you are using the texture matrix to map your texture in your shaders.

  + scale

    [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object

    offset to apply along the X and Y axes (0.5 along the X axis meaning half the width).

  **Examples:** used in [GSAP click to fullscreen gallery](https://www.curtainsjs.com/examples/gsap-click-to-fullscreen-gallery/index.html "GSAP click to fullscreen gallery example") example.
* **setScale**(scale): v2.0updated in v7.0

  Set the texture new scale. Only applied if you are using the texture matrix to map your texture in your shaders.

  + scale

    [Vec2](https://www.curtainsjs.com/vec-2-class.html) class object

    the scale to set along the X and Y axes.

  **Examples:** used in [Multiple planes scroll effect : rotation, scale and parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax"), [Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes") and [GSAP click to fullscreen gallery](https://www.curtainsjs.com/examples/gsap-click-to-fullscreen-gallery/index.html "GSAP click to fullscreen gallery example") examples.
* **setSource**(sourceElement): v2.0

  Use this method to set a source to your texture. The source **must be already loaded in your plane**, otherwise use one of the load method of your [Plane](https://www.curtainsjs.com/plane-class.html#load-canvas) or [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html#load-canvas) classes.

  + sourceElement

    either an image, canvas or video HTML element

    a source to apply to your texture. It must be an element already loaded by your plane.

  **Examples:** used in [Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader") example.
* **setWrapS**(wrapS): v7.0

  Set the texture's wrapS value.

  + wrapS

    GLenum

    texture wrapping to apply along the X axis. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 wrapping need a power of 2 sized source).
* **setWrapT**(wrapT): v7.0

  Set the texture's wrapT value.

  + wrapT

    GLenum

    texture wrapping to apply along the Y axis. Use one of the [GLenum possible values](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter), depending on the WebGL context and size of the source (some WebGL1 wrapping need a power of 2 sized source).

## Events

* **onSourceLoaded**(callback): v7.0

  This function will be called the first time your texture source has been loaded.

  + callback

    function

    function to execute.

  **returns:** your Texture object, allowing it to be chainable.
* **onSourceUploaded**(callback): v7.0

  This function will be called the first time your texture source has been uploaded to the GPU.

  + callback

    function

    function to execute.

  **returns:** your Texture object, allowing it to be chainable.

  **Examples:** used in [AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal") and [GSAP click to fullscreen gallery](https://www.curtainsjs.com/examples/gsap-click-to-fullscreen-gallery/index.html "GSAP click to fullscreen gallery example") examples.
