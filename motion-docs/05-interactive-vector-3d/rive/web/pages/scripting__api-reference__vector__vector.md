---
source: https://rive.app/docs/scripting/api-reference/vector/vector
title: "Vector"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Vector

Represents a vector with three components. Vectors created with
`Vector.xy` have z = 0. All magnitude and interpolation operations
(`length`, `dot`, `distance`, `normalized`, `lerp`, ...) use all three
components; with z = 0 they behave exactly as 2D math.

## Fields

### `x`

The x component of the vector (read-only).

```lua theme={null}
local v = Vector.xy(10, -5)
local xValue = v.x  -- 10
```

### `y`

The y component of the vector (read-only).

```lua theme={null}
local v = Vector.xy(10, -5)
local yValue = v.y  -- -5
```

### `z`

The z component of the vector (read-only). Zero for vectors created
with `Vector.xy`; populated by 3D APIs that return a [Vector](/docs/scripting/api-reference/vector/vector).

```lua theme={null}
local v = m:transformPoint(1, 2, 3)
local zValue = v.z
```

## Constructors

### `xy`

```lua theme={null}
xy(x: number, y: number) -> Vector
```

Creates a vector with the specified x and y components.

```lua theme={null}
local v = Vector.xy(5, -2)  -- 5 -2
```

### `xyz`

```lua theme={null}
xyz(x: number, y: number, z: number) -> Vector
```

Creates a vector with the specified x, y and z components.

```lua theme={null}
local v = Vector.xyz(1, 2, 3)
```

### `origin`

```lua theme={null}
origin() -> Vector
```

Returns the zero vector (0, 0).

```lua theme={null}
local origin = Vector.origin()  -- 0 0
```

### `cross3`

```lua theme={null}
cross3(a: Vector, b: Vector) -> Vector
```

Returns the 3D cross product of two vectors.

```lua theme={null}
local z = Vector.cross3(Vector.xyz(1,0,0), Vector.xyz(0,1,0))  -- 0 0 1
```

### `scaleAndAdd`

```lua theme={null}
scaleAndAdd(a: Vector, b: Vector, scale: number) -> Vector
```

Returns a + b \* scale.

```lua theme={null}
local r = Vector.scaleAndAdd(Vector.xy(1,2), Vector.xy(3,4), 2)  -- 7 10
```

### `scaleAndSub`

```lua theme={null}
scaleAndSub(a: Vector, b: Vector, scale: number) -> Vector
```

Returns a - b \* scale.

```lua theme={null}
local r = Vector.scaleAndSub(Vector.xy(7,10), Vector.xy(3,4), 2)  -- 1 2
```

### `lerp`

```lua theme={null}
lerp(from: Vector, to: Vector, t: number) -> Vector
```

Returns the linear interpolation from one vector to another, using t
where 0 returns `from` and 1 returns `to`.

```lua theme={null}
local p = Vector.lerp(Vector.xy(0,0), Vector.xy(8,0), 0.25)  -- 2 0
```

### `normalized`

```lua theme={null}
normalized(v: Vector) -> Vector
```

Returns a normalized copy of the given vector.

```lua theme={null}
local n = Vector.normalized(Vector.xy(10, 0))  -- Vector.xy(1, 0)
```

## Static Functions

### `distance`

```lua theme={null}
distance(a: Vector, b: Vector) -> number
```

Returns the distance between the two vectors.

```lua theme={null}
local d = Vector.distance(Vector.xy(3, 4), Vector.xy(0, 0))  -- 5
```

### `distanceSquared`

```lua theme={null}
distanceSquared(a: Vector, b: Vector) -> number
```

Returns the squared distance between the two vectors.

```lua theme={null}
local d2 = Vector.distanceSquared(Vector.xy(3,4), Vector.xy(0,0))  -- 25
```

### `dot`

```lua theme={null}
dot(a: Vector, b: Vector) -> number
```

Returns the dot product of the two vectors.

```lua theme={null}
local dp = Vector.dot(Vector.xy(1,2), Vector.xy(3,4))  -- 11 (1*3 + 2*4)
```

### `cross`

```lua theme={null}
cross(a: Vector, b: Vector) -> number
```

Returns the cross product of two vectors (z-component of the 3D cross product).

```lua theme={null}
local c = Vector.cross(Vector.xy(1, 0), Vector.xy(0, 1))  -- 1
```

### `length`

```lua theme={null}
length(v: Vector) -> number
```

Returns the length of the given vector.

```lua theme={null}
local len = Vector.length(Vector.xy(3, 4))  -- 5
```

### `lengthSquared`

```lua theme={null}
lengthSquared(v: Vector) -> number
```

Returns the squared length of the given vector.

```lua theme={null}
local len2 = Vector.lengthSquared(Vector.xy(3, 4))  -- 25
```

## Methods

### `length`

```lua theme={null}
length() -> number
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.length` instead.

Returns the length of the vector.

### `lengthSquared`

```lua theme={null}
lengthSquared() -> number
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.lengthSquared` instead.

Returns the squared length of the vector.

```lua theme={null}
local v = Vector.xy(3, 4)
local len2 = v:lengthSquared()  -- 25
```

### `normalized`

```lua theme={null}
normalized() -> Vector
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.normalized` instead.

Returns a normalized copy of the vector. If the length is zero,
the result is the zero vector.

```lua theme={null}
local v = Vector.xy(10, 0)
local n = v:normalized()  -- 1 0
```

### `__eq`

```lua theme={null}
__eq(rhs: Vector) -> boolean
```

Returns true if the two vectors have equal components.

```lua theme={null}
local a = Vector.xy(1, 2)
local b = Vector.xy(1, 2)
local c = Vector.xy(2, 1)
print(a == b)  -- true
print(a == c)  -- false
```

### `__unm`

```lua theme={null}
__unm() -> Vector
```

Returns the negated vector.

```lua theme={null}
local v = Vector.xy(2, -3)
local neg = -v   -- -2 3
```

### `__add`

```lua theme={null}
__add(rhs: Vector) -> Vector
```

Returns the sum of two vectors.

```lua theme={null}
local a = Vector.xy(2, 3)
local b = Vector.xy(-1, 5)
local c = a + b  -- 1 8
```

### `__sub`

```lua theme={null}
__sub(rhs: Vector) -> Vector
```

Returns the difference between two vectors.

```lua theme={null}
local a = Vector.xy(2, 3)
local b = Vector.xy(-1, 5)
local c = a - b  -- 3 -2
```

### `__mul`

```lua theme={null}
__mul(rhs: number) -> Vector
```

Returns the vector scaled by the given number.

```lua theme={null}
local v = Vector.xy(3, -2)
local doubled = v * 2    -- 6 -4
```

### `__div`

```lua theme={null}
__div(rhs: number) -> Vector
```

Returns the vector divided by the given number.

```lua theme={null}
local v = Vector.xy(6, -4)
local half = v / 2    -- 3 -2
```

### `distance`

```lua theme={null}
distance(other: Vector) -> number
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.distance` instead.

Returns the distance to the other vector.

```lua theme={null}
local a = Vector.xy(0, 0)
local b = Vector.xy(3, 4)
print(a:distance(b))  -- 5
```

### `distanceSquared`

```lua theme={null}
distanceSquared(other: Vector) -> number
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.distanceSquared` instead.

Returns the squared distance to the other vector.

```lua theme={null}
local a = Vector.xy(0, 0)
local b = Vector.xy(3, 4)
print(a:distanceSquared(b))  -- 25
```

### `dot`

```lua theme={null}
dot(other: Vector) -> number
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.dot` instead.

Returns the dot product of the vector and the other vector.

```lua theme={null}
local a = Vector.xy(1, 2)
local b = Vector.xy(3, 4)
print(a:dot(b))  -- 11  (1*3 + 2*4)
```

### `lerp`

```lua theme={null}
lerp(other: Vector, t: number) -> Vector
```

> [!WARNING]
>
> **Deprecated** - Use `Vector.lerp` instead.

Returns the linear interpolation between the vector and the other
vector, using t where 0 returns the vector and 1 returns the other.

```lua theme={null}
local a = Vector.xy(0, 0)
local b = Vector.xy(10, 0)
local p = a:lerp(b, 0.5)  -- 5 0
```

### `writeToBuffer`

```lua theme={null}
writeToBuffer(buf: buffer, byteOffset: number) -> ()
```

Writes x, y, z as 12 bytes (three float32) into the buffer at
`byteOffset`.

```lua theme={null}
local buf = buffer.create(12)
Vector.xyz(1, 2, 3):writeToBuffer(buf, 0)
```

### `writeVec4`

```lua theme={null}
writeVec4(buf: buffer, byteOffset: number, w: number) -> ()
```

Writes x, y, z, w as 16 bytes (four float32) into the buffer at
`byteOffset`, matching a vec4 uniform-buffer slot.

```lua theme={null}
local ubo = buffer.create(16)
lightDir:writeVec4(ubo, 0, 0)  -- w = 0 for a direction
```
