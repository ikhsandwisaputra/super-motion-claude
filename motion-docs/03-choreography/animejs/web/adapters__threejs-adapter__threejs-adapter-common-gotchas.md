---
source: https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas
title: "Three.js common gotchas | Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

# [Three.js common gotchas](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas "Three.js common gotchas")

## [Edge cases to keep in mind when animating Three.js objects.](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#edge-cases-to-keep-in-mind-when-animating-three-js-objects)

## [Rotation order](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#rotation-order)

`rotateX` / `rotateY` / `rotateZ` write to `target.rotation.x` / `.y` / `.z` directly. Three.js applies them in its default Euler order `'XYZ'`. If `target.rotation.order` has been changed, the result will not match the names. Use a `Quaternion` outside the adapter when you need a different order.

## [Transparent flag for opacity fades](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#transparent-flag-for-opacity-fades)

Animating `opacity` on a material whose `transparent` flag is `false` has no visible effect. Three.js still renders it fully opaque. Set `material.transparent = true` on any material intended to fade.

## [Visibility flip and direct mutation](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#visibility-flip-and-direct-mutation)

Setting `opacity = 0`, `scale = 0`, or any scale axis to `0` flips `target.visible` to `false`. The flip only fires through `animate()` or `utils.set()`. A direct write like `mesh.scale.x = 0` leaves `mesh.visible` alone.

## [Shared materials and the mesh shorthand](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#shared-materials-and-the-mesh-shorthand)

Material properties live on the material, not on the mesh. Animating them updates every other mesh sharing that material instance. Clone the material per mesh to scope the animation. The mesh shorthand also only routes to the material when the mesh has no own field with the same name, so a mesh-level property always wins.

## [Group fades](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#group-fades)

A `Group` doesn't own a material, so animating `opacity` or `color` on a group has no effect on its children. Pass an array of descendant meshes as targets to fade an entire subtree.

## [Single Three.js instance](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#single-three-js-instance)

Three.js is an optional peer dependency. Your bundler must resolve `'three'` to a single instance. Duplicated copies in nested `node_modules` make `instanceof` checks fail, and the adapter silently misses any targets coming from the other copy.

## [Out-of-scope uniform types](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#out-of-scope-uniform-types)

Uniforms whose value is a `Texture`, `Matrix3`, or `Matrix4`, plus `UniformArrayNode` and `BufferNode`, are not handled. Animate `Texture` transforms on the texture itself, or animate the underlying numeric fields directly.

## [Instance proxy caveats](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas#instance-proxy-caveats)

On a [per-instance proxy](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes"), `opacity` writes the shared material so every slot is affected, and `visible` is a no-op on `InstancedMesh`. After `getInstances()` runs, reading back `mesh.onBeforeRender` will not return the exact function you assigned, though assigning to it still works.

###### Previous

######

* [Three.js instanced meshes](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes")
