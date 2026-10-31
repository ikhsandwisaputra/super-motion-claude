---
source: https://www.curtainsjs.com/texture-loader-class.html
title: "curtains.js | Documentation | TextureLoader class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# TextureLoader class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/loaders/TextureLoader.js "TextureLoader class source code")

## Basic usage

The TextureLoader is specifically useful if you want to create textures before creating any Planes or ShaderPasses objects.
You can for example use a TextureLoader to **preload** all your website's **textures to the GPU** while displaying a loader, and then run your app without having to create any texture afterwards.

### Creation

To create a new texture loader, just use its constructor. You'll the be able to load medias and create textures by using its various load methods:

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

loader.loadImage(image, {

// texture options (we're only setting its sampler name here)

sampler: "uTexture"

}, (texture) => {

// texture has been successfully created, you can safely use it

}, (image, error) => {

// there has been an error while loading the image

});

## Parameters

* curtains

  Curtains class object

  Your Curtains class object.
* crossOrigin

  string, optional

  defines the crossOrigin process to load images if any (default to "anonymous").

## Properties

* **crossOrigin** (string): v7.0

  The cross origin process used to load the medias.
* **elements** (array of objects): v7.0read only

  An array containing all the loading and loaded elements. An element is an object containing a texture, its source and the event listeners used to load that source.
* **gl** (WebGL context) v7.0read only

  Our WebGL context.
* **renderer** (Renderer class object): v7.0read only

  The renderer created by our curtains object.
* **type** (string): v7.0read only

  Class object type: "TextureLoader".

## Methods

* **loadCanvas**(canvasElement, textureOptions, successCallback): v7.0

  This function takes a canvas HTML element and creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it.

  + canvasElement

    HTML canvas element

    a HTML canvas element to load.
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
* **loadCanvases**(canvasElements, texturesOptions, successCallback): v7.1

  This function takes an array of canvas HTML elements and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + canvasElements

    array or collection of HTML canvas elements

    an array or collection of HTML canvas elements to load.
  + texturesOptions

    object, optional

    Default options to apply to those textures. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).
  + successCallback

    function(texture), optional

    Callback executed on each successful source load.
    - texture

      [Texture](https://www.curtainsjs.com/texture-class.html) class object

      newly created texture. You'll have access to the textures [onSourceLoaded](https://www.curtainsjs.com/texture-class.html#on-source-loaded) and [onSourceUploaded](https://www.curtainsjs.com/texture-class.html#on-source-uploaded) callbacks here.
* **loadImage**(imageElement, textureOptions, successCallback, errorCallback): v7.0

  This function takes an image HTML element (or image source URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it.

  + imageElement

    HTML image element or string

    a HTML image element or image source URL to load.
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
* **loadImages**(imageElements, texturesOptions, successCallback, errorCallback): v7.1

  This function takes an array of image HTML elements (or images sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + imageElements

    array or collection of HTML image elements or strings

    an array or collection of HTML image elements or images sources URL to load.
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
* **loadSource**(sourceElement, textureOptions, successCallback, errorCallback): v7.0

  This function takes a source element (or source URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it.

  + sourceElement

    either image, canvas or video HTML element or string

    an image, canvas, video HTML element or source URL to load.
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
* **loadSources**(sourceElements, texturesOptions, successCallback, errorCallback): v7.1

  This function takes an array of source elements (or sources URL) and creates [Textures](https://www.curtainsjs.com/texture-class.html) using them.

  + sourceElements

    array or collection of either images, canvases or videos HTML elements or strings

    an array of image, canvas or video HTML elements or sources URL to load.
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
* **loadVideo**(videoElement, textureOptions, successCallback, errorCallback): v7.0

  This function takes a video HTML element (or video source URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) using it.

  + videoElement

    HTML video element or string

    a HTML video element or video source URL to load.
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
* **loadVideos**(videoElements, texturesOptions, successCallback, errorCallback): v7.1

  This function takes an array of video HTML elements (or videos sources URL) and creates a [Texture](https://www.curtainsjs.com/texture-class.html) for each of them.

  + videoElements

    array or collection of HTML video elements or strings

    an array or collection of HTML video elements or videos sources URL to load.
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
