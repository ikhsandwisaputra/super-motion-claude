---
source: https://www.curtainsjs.com/render-target-class.html
title: "curtains.js | Documentation | RenderTarget class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# RenderTarget class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/framebuffers/RenderTarget.js "RenderTarget class source code")

## Basic usage

The RenderTarget class is just a class that creates Frame Buffer Objects (FBO). You can render a plane to a render a target instead of your canvas and then use that render target either by assigning it to a ShaderPass or by grabbing its content (ie its [Texture](https://www.curtainsjs.com/texture-class.html)) and use it in another plane.

Please note that render targets (and therefore shader passes) disable the WebGL context default antialiasing. If you use them, you should set the [antialias Curtains property](https://www.curtainsjs.com/curtains-class.html#curtains-init-parameters) to false when initiating your context.
You might then want to add an extra antialiasing pass, by using the built-in [FXAAPass](https://www.curtainsjs.com/fxaa-pass-class.html) class or your own FXAA or MSAA implementation.
See the [Post processing scrolling wheel with custom transform origin](https://www.curtainsjs.com/examples/post-processing-transform-origin/index.html "Post processing scrolling wheel with custom transform origin") for an example of how to add a FXAAPass.

### Creation

To create a new render target, just use its constructor:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new render target using our curtains object

const renderTarget = new RenderTarget(curtains);

// ...do whatever you want to do with your render target

To use it you'll have to apply it to a plane by using the [setRenderTarget](https://www.curtainsjs.com/plane-class.html#set-render-target) of our [Plane](https://www.curtainsjs.com/plane-class.html) class.

### Using a RenderTarget texture in a plane

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new render target using our curtains object

const renderTarget = new RenderTarget(curtains);

const planeElement = document.getElementById("my-plane");

// create a plane

const plane = new Plane(curtains, planeElement, {

vertexShaderID: "plane-vs",

fragmentShaderID: "plane-fs",

});

// add our plane to our frame buffer object

plane.setRenderTarget(renderTarget);

// create a plane to display our render target result

const renderElement = document.getElementById("render-plane");

const renderPlane = new Plane(curtains,renderElement, {

vertexShaderID: "render-plane-vs",

fragmentShaderID: "render-plane-fs",

});

renderPlane.onReady(function() {

// create a new texture and copy the render target texture into it

// you'll be able to use it as a regular texture in your plane shader

const renderTexture = renderPlane.createTexture({

sampler: "uRenderTexture",

fromTexture: renderTarget.getTexture(),

});

});

### Assigning a RenderTarget to a ShaderPass

You can decide to add a [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) to a defined set of plane instead of your whole scene. By combining a shader pass with a render target, you'll be able to add an additional pass to all the planes that use that render target.

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create a new render target using our curtains object

const renderTarget = new RenderTarget(curtains);

const planeElements = document.getElementsByClassName("my-planes");

// create a bunch of planes

for(let i = 0; i < planeElements.length; i++) {

const plane = new Plane(curtains, planeElements[i], {

vertexShaderID: "plane-vs",

fragmentShaderID: "plane-fs",

});

// add our plane to our frame buffer object

plane.setRenderTarget(renderTarget);

}

// now assign our render target to a shader pass

const shaderPassParams = {

vertexShaderID: "my-shader-pass-vs",

fragmentShaderID: "my-shader-pass-fs",

renderTarget: renderTarget, // this is how we assign the render target to our shader pass

uniforms: {

time: {

name: "uTime",

type: "1f",

value: 0,

},

},

};

const shaderPass = new ShaderPass(curtains, shaderPassParams);

Check the [Selective shader passes using render targets](https://www.curtainsjs.com/examples/render-passes-using-render-targets/index.html "Selective shader passes using render targets") example to see how you can apply different shader passes to different bunch of planes.

## Parameters

Here is the complete list of mandatory and optional parameters for the render target:

* curtains

  Curtains class object

  Your Curtains class object.
* params

  object, optional

  an object containing the render target parameters:
  + depth

    bool, optional

    Whether to create a depth buffer (handle depth inside your render target). Default to false.
  + clear

    bool, optional

    Whether the content of the render target should be cleared before being drawn. Should be set to false to handle ping-pong shading. Default to true.
  + maxWidth

    float, optional

    Maximum width of the render target.
  + maxHeight

    float, optional

    Maximum height of the render target.
  + minWidth

    float, optional

    Minimum width of the render target. Default to 1024.
  + minHeight

    float, optional

    Minimum height of the render target. Default to 1024.
  + texturesOptions

    object, optional

    Default options to apply to the texture of the render target. See the Texture class [parameters](https://www.curtainsjs.com/texture-class.html#parameters).

## Properties

* **index**(integer): v5.0 read only

  The index of the render target in the [renderTargets](https://www.curtainsjs.com/curtains-class.html#render-targets) array.
* **gl** (WebGL context) v7.0read only

  Our WebGL context.
* **renderer** (Renderer class object): v7.0read only

  The renderer created by our curtains object.
* **textures**(array): v5.0

  An array of length 1 containing the only render target's [Texture](https://www.curtainsjs.com/texture-class.html).
* **type** (string): v7.0read only

  Class object type: "RenderTarget".
* **userData** (object): v5.0

  An empty object to store any additional data or custom properties into your render target.
* **uuid** (string): v6.0read only

  The render target's unique identifier.

## Methods

* **getTexture**(): v7.0

  Returns the render target texture to be used later.

  **returns:** the render target [texture](https://www.curtainsjs.com/texture-class.html).
* **remove**(): v7.0

  This function will remove the render target from our Curtains object and renderer and delete its texture. It will also update all other render targets indexes.
