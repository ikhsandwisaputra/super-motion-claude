---
source: https://rive.app/docs/scripting/api-reference/renderer/renderer
title: "Renderer"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Renderer

Provides functions for drawing paths and images, managing clipping, and
applying transforms during rendering.

## Methods

### `drawPath`

```lua theme={null}
drawPath(path: Path, paint: Paint) -> ()
```

Draws the given [Path](/docs/scripting/api-reference/path/path) using the specified [Paint](/docs/scripting/api-reference/paint/paint).

For a more detailed explanation and working examples, see [Drawing with Node Scripts](/docs/scripting/protocols/node-scripts#drawing).

```lua theme={null}
function draw(self: Rectangle, renderer: Renderer)
  renderer:drawPath(self.path, self.paint)
end
```

### `drawImage`

```lua theme={null}
drawImage(image: Image, sampler: ImageSampler, blendMode: BlendMode, opacity: number) -> ()
```

Draws an [Image](/docs/scripting/api-reference/image/image) using the [ImageSampler](/docs/scripting/api-reference/image/image-sampler), [BlendMode](/docs/scripting/api-reference/paint/blend-mode), and opacity.

Check out [Scripting demos](/docs/scripting/demos) to see a working example.

```lua highlight={15} theme={null}
type DrawImage = {
  myImage: Image?,
  sampler: ImageSampler?,
}

function init(self: DrawImage, context: Context): boolean
  self.myImage = context:image('myImage')
  self.sampler = ImageSampler('clamp', 'clamp', 'bilinear')

  return true
end

function draw(self: DrawImage, renderer: Renderer)
  if self.myImage and self.sampler then
    renderer:drawImage(self.myImage, self.sampler, 'srcOver', 1)
  end
end

return function(): Node<DrawImage>
  return {
    myImage = nil,
    sampler = nil,
    init = init,
    draw = draw,
  }
end
```

### `drawImageMesh`

```lua theme={null}
drawImageMesh(image: Image, sampler: ImageSampler, vertices: VertexBuffer, uvs: VertexBuffer, triangles: TriangleBuffer, blendMode: BlendMode, opacity: number) -> ()
```

Draws an image using mesh data defined by vertices, texture
coordinates, and triangle indices.

Check out [Scripting demos](/docs/scripting/demos) to see a working example.

```lua theme={null}
function draw(self: DrawImageMesh, renderer: Renderer)
  if self.myImage and self.sampler and self.vertices and self.uvs and self.triangles then
    renderer:drawImageMesh(
      self.myImage,
      self.sampler,
      self.vertices,
      self.uvs,
      self.triangles,
      'srcOver',
      1
    )
  end
end
```

### `drawImageMeshInstanced`

```lua theme={null}
drawImageMeshInstanced(image: Image, sampler: ImageSampler, vertices: VertexBuffer, uvs: VertexBuffer, triangles: TriangleBuffer, instances: MeshInstances) -> ()
```

Draws one mesh once per entry of a [MeshInstances](/docs/scripting/api-reference/mesh/mesh-instances), in a single call.
The blend mode is always `srcOver`. Opacity and the UV transform come
from each instance.

```lua theme={null}
function draw(self: DrawImageMeshInstanced, renderer: Renderer)
  if self.myImage and self.sampler and self.vertices and self.uvs and self.triangles and self.instances then
    renderer:drawImageMeshInstanced(
      self.myImage,
      self.sampler,
      self.vertices,
      self.uvs,
      self.triangles,
      self.instances
    )
  end
end
```

### `clipPath`

```lua theme={null}
clipPath(path: Path) -> ()
```

Restricts subsequent drawing to the area defined by the given [Path](/docs/scripting/api-reference/path/path).
Clipping remains in effect until the next restore call.

Check out [Scripting demos](/docs/scripting/demos) to see a working example.

```lua highlight={10} theme={null}
function draw(self: DrawImageClipped, renderer: Renderer)
  if self.myImage and self.sampler then
    local w: number = self.myImage.width
    local h: number = self.myImage.height
    local rx: number = (w / 2) * self.clipRadiusX
    local ry: number = (h / 2) * self.clipRadiusY
    buildOvalPath(self.clipPath, w / 2, h / 2, rx, ry)

    renderer:save()
    renderer:clipPath(self.clipPath)
    renderer:drawImage(self.myImage, self.sampler, 'srcOver', 1)
    renderer:restore()
  end
end
```

### `save`

```lua theme={null}
save() -> ()
```

Saves the current rendering state, including transforms and clipping.

```lua highlight={4} theme={null}
function draw(self: MyGame, renderer: Renderer)
  -- draw each enemy
  for _, enemy in self.enemies do
    renderer:save()
    enemy.artboard:draw(renderer)
    renderer:restore()
  end
end
```

### `restore`

```lua theme={null}
restore() -> ()
```

Restores the most recently saved rendering state.

```lua highlight={6} theme={null}
function draw(self: MyGame, renderer: Renderer)
  -- draw each enemy
  for _, enemy in self.enemies do
    renderer:save()
    enemy.artboard:draw(renderer)
    renderer:restore()
  end
end
```

### `transform`

```lua theme={null}
transform(transform: Mat2D) -> ()
```

Applies a transform to the current rendering state. Transforms are
applied cumulatively until restored.

```lua highlight={7} theme={null}
function draw(self: TransformedImage, renderer: Renderer)
  if self.myImage and self.sampler then
    local m = Mat2D.withScale(2, 3)
    -- Adjust matrix terms directly for additional skew/stretch control.
    m.xx = 5

    renderer:save()
    renderer:transform(m)
    renderer:drawImage(self.myImage, self.sampler, 'srcOver', 1)
    renderer:restore()
  end
end
```

### `modulateOpacity`

```lua theme={null}
modulateOpacity(opacity: number) -> ()
```

Multiplies the opacity of subsequent draw calls by `opacity` (0..1).
Stacks multiplicatively and is captured by save()/restore(), so the
common pattern is: renderer:save(); renderer:modulateOpacity(a);
... draw ...; renderer:restore().

### `modulateColor`

```lua theme={null}
modulateColor(color: Color) -> ()
```

Multiplies `color` into subsequent draw calls, channel by channel.
Stacks and is captured by save()/restore() like modulateOpacity.

### `setColorModulation`

```lua theme={null}
setColorModulation(color: Color) -> ()
```

Sets the modulation color outright rather than multiplying, which
lets an inner scope undo an outer one: draw an artboard under black,
then set the color for the drawables that should keep their paint.
Captured by save()/restore(); inside a draw visitor it ends with the
visit, so the visitor needs no save()/restore() of its own.
