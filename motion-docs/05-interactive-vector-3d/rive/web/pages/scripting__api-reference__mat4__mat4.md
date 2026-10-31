---
source: https://rive.app/docs/scripting/api-reference/mat4/mat4
title: "Mat4"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Mat4

Represents a 4x4 column-major transformation matrix, suitable for 3D
transforms and direct upload to a GPU uniform buffer.

```lua theme={null}
-- Construct an MVP matrix
local proj = Mat4.perspective(math.rad(60), 16 / 9, 0.1, 100)
local view = Mat4.fromTranslation(0, 0, -3) -- camera 3 units back
local model = Mat4.fromRotationY(angle)
local mvp = proj * view * model

-- Upload to a uniform buffer (64 bytes, column-major)
mvp:writeToBuffer(uboBytes, 0)
```

## Fields

### `m11`

Element at row R, column C (1-indexed). For example `m.m12` is the
entry in row 1, column 2.

```lua theme={null}
local m = Mat4.identity()
m.m11 = 2 -- scale x
m.m22 = 3 -- scale y
m.m14 = 50 -- translate x
```

### `m12`

### `m13`

### `m14`

### `m21`

### `m22`

### `m23`

### `m24`

### `m31`

### `m32`

### `m33`

### `m34`

### `m41`

### `m42`

### `m43`

### `m44`

## Constructors

### `identity`

```lua theme={null}
identity() -> Mat4
```

Returns the 4x4 identity matrix.

### `values`

```lua theme={null}
values(c0x: number, c0y: number, c0z: number, c0w: number, c1x: number, c1y: number, c1z: number, c1w: number, c2x: number, c2y: number, c2z: number, c2w: number, c3x: number, c3y: number, c3z: number, c3w: number) -> Mat4
```

Creates a matrix from 16 components, supplied column-major (column 0
first: c0x, c0y, c0z, c0w, c1x, ...).

### `fromTranslation`

```lua theme={null}
fromTranslation(x: number, y: number, z: number) -> Mat4
```

Creates a translation matrix.

```lua theme={null}
local t = Mat4.fromTranslation(10, 20, 30)
```

### `fromScale`

```lua theme={null}
fromScale(x: number, y: number?, z: number?) -> Mat4
```

Creates a scale matrix. If `y` and `z` are omitted, uniform scaling
by `x` is applied to all axes.

```lua theme={null}
local s1 = Mat4.fromScale(2)        -- uniform 2x
local s2 = Mat4.fromScale(1, 2, 1)  -- 2x in Y only
```

### `fromRotationX`

```lua theme={null}
fromRotationX(radians: number) -> Mat4
```

Creates a rotation matrix around the X axis (radians).

### `fromRotationY`

```lua theme={null}
fromRotationY(radians: number) -> Mat4
```

Creates a rotation matrix around the Y axis (radians).

### `fromRotationZ`

```lua theme={null}
fromRotationZ(radians: number) -> Mat4
```

Creates a rotation matrix around the Z axis (radians).

### `perspective`

```lua theme={null}
perspective(fovY: number, aspect: number, near: number, far: number) -> Mat4
```

Creates a right-handed perspective projection matrix that maps z to
the \[0, 1] NDC depth range. `fovY` is in radians; `near` and `far`
are positive distances.

```lua theme={null}
local proj = Mat4.perspective(math.rad(60), 16 / 9, 0.1, 100)
```

### `perspectiveReverseZ`

```lua theme={null}
perspectiveReverseZ(fovY: number, aspect: number, near: number) -> Mat4
```

Right-handed perspective with reverse-Z (near -> 1, far -> 0) and an
infinite far plane. Combined with a float depth buffer this gives a
near-uniform 1/z depth distribution across the entire frustum — the
best precision an arbitrary scene can achieve. The depth buffer must
be cleared to 0 (not 1) and the depth test flipped to GREATER.

```lua theme={null}
local proj = Mat4.perspectiveReverseZ(math.rad(60), 16 / 9, 0.1)
```

### `lookAt`

```lua theme={null}
lookAt(eye: Vector, center: Vector, up: Vector) -> Mat4
```

Creates a right-handed view matrix looking from `eye` toward
`center` (GLM convention). `up` need not be normalized.

```lua theme={null}
local view = Mat4.lookAt(Vector.xyz(0, 2, 5), Vector.origin(), Vector.xyz(0, 1, 0))
```

### `ortho`

```lua theme={null}
ortho(left: number, right: number, bottom: number, top: number, near: number, far: number) -> Mat4
```

Creates a right-handed orthographic projection matrix that maps z to
the \[0, 1] NDC depth range (matching `Mat4.perspective`), e.g. for
shadow-map cascades or 2D overlays.

```lua theme={null}
local proj = Mat4.ortho(-10, 10, -10, 10, 0.1, 100)
```

### `multiply`

```lua theme={null}
multiply(output: Mat4, a: Mat4, b: Mat4) -> Mat4
```

Writes `a * b` into `output`, reusing its storage. Returns `output`.
Use this in tight loops to avoid allocating a new [Mat4](/docs/scripting/api-reference/mat4/mat4) per
multiplication. `output` may alias `a` or `b`.

```lua theme={null}
local out = Mat4.identity()
for i = 1, 1000 do Mat4.multiply(out, view, model) end
```

### `multiplyAffine`

```lua theme={null}
multiplyAffine(output: Mat4, a: Mat4, b: Mat4) -> Mat4
```

Like `Mat4.multiply`, but assumes both inputs are affine (bottom row
\[0, 0, 0, 1] — any composition of translation/scale/rotation matrices
qualifies). Skips the bottom-row work for \~25% fewer FLOPs per
multiplication. The result is always affine. Caller must ensure both
inputs are affine; passing a non-affine input gives an incorrect
result.

```lua highlight={3} theme={null}
local world = Mat4.identity()
for _, bone in ipairs(bones) do
    Mat4.multiplyAffine(world, parent, bone.local)
end
```

## Static Functions

### `invert`

```lua theme={null}
invert(output: Mat4, input: Mat4) -> boolean
```

Writes the inverse of `input` into `output`, returning true on
success or false if `input` is singular.

```lua theme={null}
local inv = Mat4.identity()
local ok = Mat4.invert(inv, m)
```

### `invertAffine`

```lua theme={null}
invertAffine(output: Mat4, input: Mat4) -> boolean
```

Writes the affine inverse of `input` into `output`. See
`Mat4:invertAffine` for the contract; faster than `Mat4.invert`.

## Methods

### `invert`

```lua theme={null}
invert() -> Mat4?
```

Linear column-major access. Indices 1..4 are column 0, 5..8 are
column 1, 9..12 are column 2, 13..16 are column 3 (translation).

```lua theme={null}
local m = Mat4.identity()
m[13] = 50 -- translate x
m[14] = 100 -- translate y
m[15] = 25 -- translate z
```

Returns the inverse of the matrix, or `nil` if the matrix is singular.

```lua highlight={2} theme={null}
local m = Mat4.fromTranslation(50, 100, 25)
local inv = m:invert()
```

### `transpose`

```lua theme={null}
transpose() -> Mat4
```

Returns the transpose of the matrix.

```lua highlight={2} theme={null}
local m = Mat4.fromRotationY(math.rad(45))
local t = m:transpose()
```

### `transformPoint`

```lua theme={null}
transformPoint(x: number, y: number, z: number) -> Vector
```

Transforms the given 3D point by the matrix (treating w = 1) and
returns the result as a [Vector](/docs/scripting/api-reference/vector/vector). If the homogeneous w of the result
is non-unit (e.g. after a perspective matrix), the returned point is
divided through.

```lua highlight={3} theme={null}
local m = Mat4.fromTranslation(10, 20, 30)
local p = m:transformPoint(1, 2, 3)
print(p.x, p.y, p.z) -- 11, 22, 33
```

### `transformVec4`

```lua theme={null}
transformVec4(x: number, y: number, z: number, w: number) -> (number, number, number, number)
```

Transforms the given homogeneous 4D vector by the matrix and returns
the four components as multiple values, without perspective divide.
Use this when the caller needs to inspect or carry the homogeneous
`w` (e.g. clip-space coordinates).

```lua highlight={2} theme={null}
local mvp = proj * view * model
local x, y, z, w = mvp:transformVec4(px, py, pz, 1)
```

### `writeToBuffer`

```lua theme={null}
writeToBuffer(buf: buffer, byteOffset: number) -> ()
```

Writes the matrix as 64 bytes (column-major, 16 float32 entries) into
the given buffer at `byteOffset`. The buffer must have at least 64
bytes available from the offset.

```lua highlight={3} theme={null}
local mvp = Mat4.identity()
local ubo = buffer.create(64)
mvp:writeToBuffer(ubo, 0)
```

### `__eq`

```lua theme={null}
__eq(rhs: Mat4) -> boolean
```

Returns true if all 16 components of the two matrices are equal.

### `__mul`

```lua theme={null}
__mul(rhs: Mat4) -> Mat4
```

Returns the matrix product of two matrices. Useful for composing
transforms, e.g. `proj * view * model`. Allocates a new [Mat4](/docs/scripting/api-reference/mat4/mat4); in
tight loops prefer `Mat4.multiply(out, a, b)` to reuse storage.

### `invertAffine`

```lua theme={null}
invertAffine() -> Mat4?
```

Closed-form inverse for affine matrices (bottom row \[0, 0, 0, 1] —
any composition of `fromTranslation`/`fromScale`/`fromRotationX/Y/Z`
qualifies). Returns nil if the linear part is singular. Faster than
`:invert()` and avoids the full 4x4 cofactor work.

```lua highlight={2} theme={null}
local m = Mat4.fromTranslation(3, -4, 5) * Mat4.fromRotationY(0.4)
local inv = m:invertAffine()
```
