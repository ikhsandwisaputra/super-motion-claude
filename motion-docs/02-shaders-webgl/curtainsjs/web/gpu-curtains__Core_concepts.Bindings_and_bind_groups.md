---
source: https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html
title: "Bindings and bind groups | gpu-curtains"
fetched: 2026-10-28
---

[gpu-curtains](https://martinlaxenaire.github.io/gpu-curtains/)

[Repository](https://github.com/martinlaxenaire/gpu-curtains)[Docs](https://martinlaxenaire.github.io/gpu-curtains/docs/)[Examples](https://martinlaxenaire.github.io/gpu-curtains/examples/)

Preparing search index...

* [Core concepts](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.html)
* [Bindings and bind groups](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html)

# Bindings and bind groups, or how to send data from the CPU to the GPU

## Introduction

In WebGPU, every external data (i.e. samplers, textures and buffers) are linked in the shaders via bindings, organized into bind groups.

## Uniform and storage buffers

The usual way to provide and update data to the WebGPU shaders is by using uniform or storage buffers. Each buffer is linked to the shaders by a binding, which is itself linked to a bind group. A buffer can contain multiple values, made of integers, floats, vectors, matrices, arrays, etc. Those are ordered within the WGSL shaders binding using struct types and have to respect a given layout in the GPU memory in order to be correctly used by the shaders.

Handling the buffers data alignment and writing the WGSL bindings and bind groups definitions is a laborious process. Luckily, gpu-curtains does all this under the hood for you, and you don’t have to take care of neither of those tasks.

### Uniforms vs storages

First, let’s define when to use which buffers.

Uniforms are limited in size and are usually made to handle smaller data sets that can be updated regularly. They are usually used to handle meshes’ transformation matrices or material’s properties, such as color, opacity, time, lighting properties and so on.

Storages are generally used to handle larger data sets and also have the extra optional ability to be written onto directly by the GPU. A basic usage example would be to populate data in the GPU using a compute shader and then use those data in a vertex or fragment shader later on.

### Usage in gpu-curtains

The easiest way to pass data with gpu-curtains is to use the `textures`, `samplers`, `uniforms` and `storages` parameters of the various meshes and compute passes classes.

The [ComputeMaterial](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_materials_ComputeMaterial.ComputeMaterial.html) and [RenderMaterial](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_materials_RenderMaterial.RenderMaterial.html) take these inputs and create bindings under the hood to create the corresponding bind groups and their bindings (using the [TextureBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_TextureBinding.TextureBinding.html), [SamplerBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_SamplerBinding.SamplerBinding.html) and [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) classes) and automatically add their WGSL declarations to your shaders.

There's a helper tool to help you understand and debug your [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) WGSL declaration: [BufferBinding WGSL generation helper](https://martinlaxenaire.github.io/gpu-curtains/examples/buffer-binding-wgsl-helper/)

#### Uniforms and storages with gpu-curtains

There are two ways to create uniform or storage buffers in gpu-curtains.

The easiest and most straightforward way is to add a `uniforms` and/or `storages` objects to your mesh or compute pass parameters:

```
// assuming 'renderer' is a valid GPUCameraRenderer
const mesh = new Mesh(renderer, {
  label: 'My mesh',
  geometry: new BoxGeometry(),
  uniforms: {
    deformation: {
      visibility: ['vertex'], // to use in the vertex shader only
      struct: {
        strength: {
          type: 'f32',
          value: 0.5,
        },
        time: {
          type: 'f32',
          value: 0,
        },
      },
    },
    params: {
      visibility: ['fragment'], // to use in the fragment shader only
      struct: {
        opacity: {
          type: 'f32',
          value: 1,
        },
        mousePosition: {
          type: 'vec2f',
          value: new Vec2(),
        },
      },
    },
  },
})
```

Each of those uniforms or storages object keys will create a buffer and its WGSL binding so you can use them in your shaders later on. The WGSL struct layout will be defined by the javascript `struct` object.
All the library [Material](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_materials_Material.Material.html) classes use the [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) class internally to handle that.

Of course, the fewer buffers the better performance you’ll get, especially if you plan to update those frequently. It is up to you to find the balance between readability and performance.

You can however get more control over the buffer management by directly using the [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) class and pass this to you mesh or compute pass parameters in a `bindings` array.

This allows you to reuse the same GPU buffer with different objects such as compute passes or meshes.

```
// we can create a separate BufferBinding to handle the deformation
const deformationBufferBinding = new BufferBinding({
  label: 'Deformation',
  name: 'deformation', // matches the previous uniforms 'deformation' object key
  visibility: ['vertex'], // to use in the vertex shader only
  bindingType: 'uniform', // it's a uniform buffer
  struct: {
    strength: {
      type: 'f32',
      value: 0.5,
    },
    time: {
      type: 'f32',
      value: 0,
    },
  },
})

// assuming 'renderer' is a valid GPUCameraRenderer
const mesh = new Mesh(renderer, {
  label: 'My mesh',
  geometry: new BoxGeometry(),
  bindings: [deformationBufferBinding], // pass it to our mesh
  uniforms: {
    params: {
      visibility: ['fragment'], // to use in the fragment shader only
      struct: {
        opacity: {
          type: 'f32',
          value: 1,
        },
        mousePosition: {
          type: 'vec2f',
          value: new Vec2(),
        },
      },
    },
  },
})
```

Sometimes, you’ll also want to use the same GPU buffer with multiple [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) usages or structure:

```
// we can create a separate BufferBinding to handle the deformation
const deformationBufferBinding = new BufferBinding({
  label: 'Deformation',
  name: 'deformation', // matches the previous uniforms 'deformation' object key
  visibility: ['vertex'], // to use in the vertex shader only
  bindingType: 'uniform', // it's a uniform buffer
  struct: {
    strength: {
      type: 'f32',
      value: 0.5,
    },
    time: {
      type: 'f32',
      value: 0,
    },
  },
})

// create anothter buffer binding with the same GPU buffer but a different visibility
const deformationBufferBindingClone = deformationBufferBinding.clone({
  visibility: ['vertex', 'fragment'], // to use in the vertex or fragment shaders
  buffer: deformationBufferBinding.buffer,
})

// assuming 'renderer' is a valid GPUCameraRenderer
const mesh = new Mesh(renderer, {
  label: 'My mesh',
  geometry: new BoxGeometry(),
  bindings: [deformationBufferBindingClone], // pass it to our mesh
  uniforms: {
    params: {
      visibility: ['fragment'], // to use in the fragment shader only
      struct: {
        opacity: {
          type: 'f32',
          value: 1,
        },
        mousePosition: {
          type: 'vec2f',
          value: new Vec2(),
        },
      },
    },
  },
})
```

### Creating complex bindings structures

The [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) `struct` parameters can already create all kinds of WGSL struct templates containing floats, vectors or even arrays of elements.
If you need a binding `struct` to contain another `struct` itself, you can do it by adding an already created [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) using the `childrenBindings` array parameter.

```
// create a custom light element buffer binding
const customLightElement = new BufferBinding({
  label: 'Custom Light Element',
  name: 'customLightElement',
  visibility: ['fragment'],
  bindingType: 'storage', // use a storage this time
  struct: {
    intensity: {
      type: 'f32',
      value: 0.5,
    },
    position: {
      type: 'vec3f',
      value: new Vec3(),
    },
  },
})

// now create a customLights binding to handle 5 customLightElement
const customLights = new BufferBinding({
  label: 'Custom Lights',
  name: 'customLights',
  visibility: ['compute', 'fragment'], // can be used in a compute or fragment shader
  bindingType: 'storage', // use a storage this time
  access: 'read_write', // create a read/write storage buffer
  struct: {
    count: {
      type: 'i32',
      value: 5,
    },
  },
  childrenBindings: [
    {
      binding: customLightElement,
      count: 5,
    },
  ],
})
```

And this will create the following WGSL code:

```
struct CustomLightElement {
	intensity: f32,
	position: vec3f
};

struct CustomLights {
	count: i32,
	customLightElement: array<CustomLightElement>
};

var<storage, read_write> customLights: CustomLights;
```

## Creating bind groups

Sometimes, you may need to have even more control on your buffers, like the ability to reuse a whole bind group (which itself can hold multiple buffers bindings) with different objects.

This is also possible, using the [BindGroup](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindGroups_BindGroup.BindGroup.html) class directly. This class has a `bindings` array parameter where you’ll set all the [BufferBinding](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindings_BufferBinding.BufferBinding.html) it needs to handle.

You can then use this [BindGroup](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindGroups_BindGroup.BindGroup.html) in any mesh or compute pass using the `bindGroups` array parameter:

```
// we can create a separate BufferBinding to handle the deformation
const deformationBufferBinding = new BufferBinding({
  label: 'Deformation',
  name: 'deformation', // matches the previous uniforms 'deformation' object key
  visibility: ['vertex'], // to use in the vertex shader only
  bindingType: 'uniform', // it's a uniform buffer
  struct: {
    strength: {
      type: 'f32',
      value: 0.5,
    },
    time: {
      type: 'f32',
      value: 0,
    },
  },
})

// create anothter buffer binding with the same GPU buffer but a different visibility
const deformationBufferBindingClone = deformationBufferBinding.clone({
  visibility: ['vertex', 'fragment'], // to use in the vertex or fragment shaders
  buffer: deformationBufferBinding.buffer,
})

// now create a bind group handling this binding
// assuming 'renderer' is a valid GPUCameraRenderer
const deformationBindGroup = new BindGroup(renderer, {
  label: 'Deformation bind group',
  bindings: [deformationBufferBindingClone],
})

const mesh = new Mesh(renderer, {
  label: 'My mesh',
  geometry: new BoxGeometry(),
  bindGroups: [deformationBindGroup], // pass it to our mesh
  uniforms: {
    params: {
      visibility: ['fragment'], // to use in the fragment shader only
      struct: {
        opacity: {
          type: 'f32',
          value: 1,
        },
        mousePosition: {
          type: 'vec2f',
          value: new Vec2(),
        },
      },
    },
  },
})
```

### Textures and samplers special case

In WebGPU, the textures and samplers used in your shaders also need to be linked to your shaders using bindings (gpu-curtains uses respectively the TextureBinding and SamplerBinding classes internally).

Since those bindings do not use buffers, and need a bit of extra work in the bind groups, you’ll have to use the special [TextureBindGroup](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindGroups_TextureBindGroup.TextureBindGroup.html) class to handle them. It works exactly like the [BindGroup](https://martinlaxenaire.github.io/gpu-curtains/docs/classes/core_bindGroups_BindGroup.BindGroup.html) class but extends it to add support for `textures` and `samplers`.

```
// assuming 'renderer' is a valid GPURenderer
const comparisonSampler = new Sampler(renderer, {
  label: 'Comparison sampler',
  name: 'comparisonSampler',
  addressModeU: 'clamp-to-edge',
  addressModeV: 'clamp-to-edge',
  compare: 'less',
  minFilter: 'linear',
  magFilter: 'linear',
  type: 'comparison',
})

const depthTexture = new Texture(renderer, {
  label: 'Depth texture',
  name: 'depthTexture',
  type: 'depth',
  format: 'depth24plus',
  sampleCount: 1,
  fixedSize: {
    width: 512,
    height: 512,
  },
})

const depthTextureBindGroup = new TextureBindGroup(renderer, {
  label: 'Depth texture bind group',
  textures: [depthTexture],
  samplers: [comparisonSampler],
})
```

### Settings

Member Visibility

* Protected
* Inherited
* External

ThemeOSLightDark

### On This Page

[Bindings and bind groups, or how to send data from the CPU to the GPU](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#bindings-and-bind-groups-or-how-to-send-data-from-the-cpu-to-the-gpu)

* [Introduction](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#introduction)
* [Uniform and storage buffers](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#uniform-and-storage-buffers)
* + [Uniforms vs storages](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#uniforms-vs-storages)
  + [Usage in gpu-curtains](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#usage-in-gpu-curtains)
  + - [Uniforms and storages with gpu-curtains](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#uniforms-and-storages-with-gpu-curtains)
  + [Creating complex bindings structures](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#creating-complex-bindings-structures)
* [Creating bind groups](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#creating-bind-groups)
* + [Textures and samplers special case](https://martinlaxenaire.github.io/gpu-curtains/docs/documents/Core_concepts.Bindings_and_bind_groups.html#textures-and-samplers-special-case)
