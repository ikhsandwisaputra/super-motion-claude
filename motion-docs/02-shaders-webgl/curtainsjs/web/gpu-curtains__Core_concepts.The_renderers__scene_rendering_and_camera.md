---
source: https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html
title: "The renderers, scene rendering and camera | gpu-curtains"
fetched: 2026-10-28
---

[gpu-curtains](https://martinlaxenaire.github.io/gpu-curtains/)

[Repository](https://github.com/martinlaxenaire/gpu-curtains)[Docs](https://martinlaxenaire.github.io/gpu-curtains/docs/)[Examples](https://martinlaxenaire.github.io/gpu-curtains/examples/)

Preparing search index...

* [Core concepts](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.html)
* [The renderers, scene rendering and camera](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html)

# The renderers, scene rendering and camera

The scene rendering and eventually camera are taken care of by gpu-curtains renderers under the hood. But you can always render meshes and compute passes on demand if you prefer.

Let's see in detail how gpu-curtains handle internally the [Scene](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_scenes_Scene.Scene.html) class, the scene graph, the camera projection, and the lighting setup, and how you can decide to opt out of some of those features.

## The renderers

gpu-curtains’ library core exposes 2 renderers, the [GPURenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPURenderer.GPURenderer.html) and the [GPUCameraRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPUCameraRenderer.GPUCameraRenderer.html) that extends the [GPURenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPURenderer.GPURenderer.html).

They both need at least a [GPUDeviceManager](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPUDeviceManager.GPUDeviceManager.html), that handles the WebGPU device and adapter, and a canvas HTML element in order to be created.

### GPURenderer

This is the base renderer. When created it automatically uses a [Scene](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_scenes_Scene.Scene.html) class instance object, where all meshes, shader passes or compute passes will be added and automatically rendered in the right order.

It is mostly useful to render fullscreen quad meshes, shader passes (post processing effects) and/or compute passes.
It is therefore best suited for background effects or shadertoy like usage.

This renderer can handle:

* [FullscreenPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_meshes_FullscreenPlane.FullscreenPlane.html)
  + [ShaderPass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderPasses_ShaderPass.ShaderPass.html)
  + [PingPongPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/extras_meshes_PingPongPlane.PingPongPlane.html)
* [ComputePass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_computePasses_ComputePass.ComputePass.html)

```
// first, we need a WebGPU device, that's what GPUDeviceManager is for
const gpuDeviceManager = new GPUDeviceManager({
  label: 'Custom device manager',
})

// we need to wait for the device to be created
await gpuDeviceManager.init()

// then we can create a basic renderer
// no need for camera or DOM syncing here
const gpuRenderer = new GPURenderer({
  label: 'Basic GPU Renderer',
  deviceManager: gpuDeviceManager, // the renderer is going to use our WebGPU device to create its context
  container: document.querySelector('#canvas'),
})
```

### GPUCameraRenderer

This is the renderer you’ll use if you want to render a typical 3D scene.
It internally creates a [PerspectiveCamera](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_cameras_PerspectiveCamera.PerspectiveCamera.html) and a [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) for its matrices, as well as optional [buffer bindings](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) for the lights and shadows, a put all of them in a
[BindGroup](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindGroups_BindGroup.BindGroup.html).
This bind group will be automatically added to all the meshes that should be projected onto the screen using the camera projection and view matrices.

This renderer can handle:

* [FullscreenPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_meshes_FullscreenPlane.FullscreenPlane.html)
  + [ShaderPass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderPasses_ShaderPass.ShaderPass.html)
  + [PingPongPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/extras_meshes_PingPongPlane.PingPongPlane.html)
* [Mesh](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_meshes_Mesh.Mesh.html)
* [ComputePass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_computePasses_ComputePass.ComputePass.html)

```
// first, we need a WebGPU device, that's what GPUDeviceManager is for
const gpuDeviceManager = new GPUDeviceManager({
  label: 'Custom device manager',
})

// we need to wait for the device to be created
await gpuDeviceManager.init()

// then we can create a camera renderer
const gpuCameraRenderer = new GPUCameraRenderer({
  label: 'GPU Camera Renderer',
  deviceManager: gpuDeviceManager, // the renderer is going to use our WebGPU device to create its context
  container: document.querySelector('#canvas'),
})
```

### GPUCurtainsRenderer

Finally, there’s a third renderer available, even tho it’s not part of the core but of the “curtains” part. The
[GPUCurtainsRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_renderers_GPUCurtainsRenderer.GPUCurtainsRenderer.html) extends the [GPUCameraRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPUCameraRenderer.GPUCameraRenderer.html) and is used to keep track of the special DOM synced [DOMMesh](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_meshes_DOMMesh.DOMMesh.html) and [Plane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_meshes_Plane.Plane.html) meshes.

This renderer can handle:

* [FullscreenPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_meshes_FullscreenPlane.FullscreenPlane.html)
  + [ShaderPass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderPasses_ShaderPass.ShaderPass.html)
  + [PingPongPlane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/extras_meshes_PingPongPlane.PingPongPlane.html)
* [Mesh](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_meshes_Mesh.Mesh.html)
* [DOMMesh](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_meshes_DOMMesh.DOMMesh.html)
  + [Plane](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_meshes_Plane.Plane.html)
* [ComputePass](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_computePasses_ComputePass.ComputePass.html)

Most of the time, you'll be using the default one created by a  [curtains/GPUCurtains.GPUCurtains](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_GPUCurtains.GPUCurtains.html) instance:

```
// set our main GPUCurtains instance it will handle everything we need
// a WebGPU device and a renderer with its scene, requestAnimationFrame, resize and scroll events...
const gpuCurtains = new GPUCurtains({
  container: '#canvas',
})

// set the GPU device (note this is asynchronous)
await gpuCurtains.setDevice()

// get the automatically created GPUCurtainsRenderer
const { renderer } = gpuCurtains
```

## The renderers’ scene

Each renderer is therefore responsible for its own scene, where the meshes will be automatically added and stacked using criterias such as:

* Unprotected vs projected (i.e. does it need to use the eventual renderer camera and light bind group)
* Opaque and transparent
* Render order property

Compute passes are executed before drawing the meshes, and shader passes after.

### Opt out of the scene stack

When creating any kind of meshes or compute pass, you can decide to not add it to the scene by setting the `autoRender` parameter to false.

That way, you’ll opt out of the scene rendering stack, but then you’d have to manually render the object somewhere in your code. It could be once on init, or once after an event happened, or each frame. It’s up to you.

```
// first, we need a WebGPU device, that's what GPUDeviceManager is for
const gpuDeviceManager = new GPUDeviceManager({
  label: 'Custom device manager',
})

// we need to wait for the device to be created
await gpuDeviceManager.init()

// then we can create a camera renderer
const gpuCameraRenderer = new GPUCameraRenderer({
  label: 'GPU Camera Renderer',
  deviceManager: gpuDeviceManager, // the renderer is going to use our WebGPU device to create its context
  container: document.querySelector('#canvas'),
  lights: false // do not use lights
})

// create a mesh that will be rendered just once
const mesh = new Mesh(gpuCameraRenderer, {
  label: 'Mesh rendered once',
  geometry: new BoxGeometry(),
  autoRender: false, // do not add it to the renderer scene
})

// compile its material
await mesh.material.compileMaterial()

// render once
gpuCameraRenderer.renderOnce([mesh])
```

### Increase or disable the lights buffers

The [GPUCameraRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_renderers_GPUCameraRenderer.GPUCameraRenderer.html) and [GPUCurtainsRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/curtains_renderers_GPUCurtainsRenderer.GPUCurtainsRenderer.html) both create fixed size buffers for your lighting setup. You can increase each light type buffers capacities or even disable them if you don’t need lighting by using the `lights` parameter when creating them.

#### Custom lights buffers

```
// first, we need a WebGPU device, that's what GPUDeviceManager is for
const gpuDeviceManager = new GPUDeviceManager({
  label: 'Custom device manager',
})

// we need to wait for the device to be created
await gpuDeviceManager.init()

// then we can create a basic renderer
// no need for camera or DOM syncing here
const gpuCameraRenderer = new GPUCameraRenderer({
  label: 'GPU Camera Renderer with custom lights setup',
  deviceManager: gpuDeviceManager, // the renderer is going to use our WebGPU device to create its context
  container: document.querySelector('#canvas'),
  lights: {
    maxAmbientLights: 5,
    maxDirectionalLights: 50,
    maxPointLights: 1,
  }
})
```

#### Disable lights buffers

```
// first, we need a WebGPU device, that's what GPUDeviceManager is for
const gpuDeviceManager = new GPUDeviceManager({
  label: 'Custom device manager',
})

// we need to wait for the device to be created
await gpuDeviceManager.init()

// then we can create a basic renderer
// no need for camera or DOM syncing here
const gpuCameraRenderer = new GPUCameraRenderer({
  label: 'GPU Camera Renderer without lights',
  deviceManager: gpuDeviceManager, // the renderer is going to use our WebGPU device to create its context
  container: document.querySelector('#canvas'),
  lights: false // do not use lights
})
```

### Settings

Member Visibility

* Protected
* Inherited
* External

ThemeOSLightDark

### On This Page

[The renderers, scene rendering and camera](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#the-renderers-scene-rendering-and-camera)

* [The renderers](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#the-renderers)
* + [GPURenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#gpurenderer)
  + [GPUCameraRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#gpucamerarenderer)
  + [GPUCurtainsRenderer](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#gpucurtainsrenderer)
* [The renderers’ scene](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#the-renderers-scene)
* + [Opt out of the scene stack](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#opt-out-of-the-scene-stack)
  + [Increase or disable the lights buffers](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#increase-or-disable-the-lights-buffers)
  + - [Custom lights buffers](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#custom-lights-buffers)
    - [Disable lights buffers](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.The_renderers,_scene_rendering_and_camera.html#disable-lights-buffers)
