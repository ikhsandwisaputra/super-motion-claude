---
source: https://www.curtainsjs.com/ping-pong-plane-class.html
title: "curtains.js | Documentation | PingPongPlane class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# PingPongPlane class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/extras/PingPongPlane.js "PingPongPlane class source code")

## Basic usage

The PingPongPlane class is used to create a plane and two associated render targets that will be swapped at each draw call. This method is called FBO swapping or FBO ping pong and is often used to create fluids or flowmaps effects.
The PingPongPlane class **extends** the [Plane](https://www.curtainsjs.com/plane-class.html) class, inheriting from all its methods and properties.

### Creation

To create a new PingPongPlane, just use its constructor.
Since they inherit from the Plane class, parameters are almost the same. There's **an additional parameter that allows you to set the PingPongPlane's texture sampler name** that you will read in your fragment shader to apply your effect. If ommited, it will use "uPingPongTexture" as sampler name.
Note that the ping pong planes are rendered onto render targets so you will have to create another plane to display the result of your effect.

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

const pingPongPlaneElement = document.getElementById("my-ping-pong-plane");

const params = {

vertexShaderID: "ping-pong-vs", // ID of your vertex shader script tag

fragmentShaderID: "ping-pong-fs", // ID of your fragment shader script tag

sampler: "uTexture", // sampler to use in your fragment shader. Default to "uPingPongTexture"

uniforms: { // uniforms are what will allow you to interact with your plane

time: {

name: "uTime", // uniform name that will be passed to our shaders

type: "1f", // this means our uniform is a float

value: 0, // initial value of the uniform

},

},

};

// create our ping pong plane with the above parameters

const pingPongPlane = new PingPongPlane(curtains, pingPongPlaneElement, params);

// create a plane to use our ping pong plane effect

const planeElement = document.getElementById("my-plane");

const plane = new Plane(curtains, planeElement);

// create a texture that will contain the result of our ping pong effect

const pingPongTexture = plane.createTexture({

sampler: "uTexture",

fromTexture: pingPongPlane.getTexture()

});

Have a look at the [Ping pong shading flowmap](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap") example to see it live.

## Parameters

PingPongPlanes use the same [parameters](https://www.curtainsjs.com/plane-class.html#parameters) as the usual Planes. Note however that it will set the **depthTest** and **autoloadSources** to **false**.
You can also pass a sampler name as an additional parameter:

* sampler

  string, optional

  the texture sampler name you'll use in your fragment shader to create your effect. Default to "uPingPongTexture".

## Properties

PingPongPlanes also have the same [properties](https://www.curtainsjs.com/plane-class.html#properties) as the usual Planes. Their two render targets are also availables as additional properties:

* **readPass** ([RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object): v7.0

  Render target read pass that will be swapped with the write pass at each draw call. Its **depth** and **clear** properties are set to **false**.
* **writePass** ([RenderTarget](https://www.curtainsjs.com/render-target-class.html) class object): v7.0

  Render target write pass that will be swapped with the read pass at each draw call. Its **depth** and **clear** properties are set to **false**.

## Methods

* **getTexture**(): v7.0

  Returns the ping pong plane texture to be used later.

  **returns:** the ping pong plane [texture](https://www.curtainsjs.com/texture-class.html).
