---
source: https://rapier.rs:443/docs/user_guides/javascript/colliders
title: "Colliders | Rapier"
fetched: 2026-10-28
---

# Colliders

Colliders represent the geometric shapes that generate contacts and collision events when they touch.
Attaching one or multiple colliders to a rigid body allow the rigid-body to be affected by contact forces.

## Creation and insertion[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#creation-and-insertion "Direct link to Creation and insertion")

A collider is created by a `World.createCollider` method. The initial state of
the collider to create is described by an instance of the `ColliderDesc` class.

Each collider create by the physics world is given an integer identifier. This identifier
is guaranteed to the different from any identifier of colliders still existing in the physics
world. However, the identifier may be equal to the identifier of an older collider that has
already been removed from the physics world with `World.removeCollider`.

info

The following example shows several setters that can be called to customize the
collider being built. The input values are just random so using this example as-is will not
lead to a useful result.

* Example 2D
* Example 3D

```js
// The physics world.
let world = new RAPIER.World({ x: 0.0, y: -9.81 });

// Builder for a ball-shaped collider.
let example1 = RAPIER.ColliderDesc.ball(0.5);
// Builder for a cuboid-shaped collider.
let example2 = RAPIER.ColliderDesc.cuboid(0.5, 0.2);
// Builder for a capsule-shaped collider. The capsule principal axis is the `y` coordinate axis.
let example3 = RAPIER.ColliderDesc.capsule(0.5, 0.2);
// Builder for a triangle-mesh-shaped collider.
let example4 = RAPIER.ColliderDesc.trimesh(vertices, indices);
// Builder for a heightfield-shaped collider.
let example5 = RAPIER.ColliderDesc.heightfield(heights, scale);
// Builder for a collider with the given shape.
let colliderDesc = new RAPIER.ColliderDesc(new RAPIER.Ball(0.5))
    // The collider translation wrt. the body it is attached to.
    // Default: the zero vector.
    .setTranslation(1.0, 2.0)
    // The collider rotation wrt. the body it is attached to.
    // Default: the identity rotation.
    .setRotation(3.14)
    // The collider density. If non-zero the collider's mass and angular inertia will be added
    // to the inertial properties of the body it is attached to.
    // Default: 1.0
    .setDensity(1.3)
    // The friction coefficient of this collider.
    // Default: 0.5
    .setFriction(0.8)
    // Whether this collider is a sensor.
    // Default: false
    .setSensor(true);

// Create the collider, without attaching it to a rigid-body.
let handle = world.createCollider(colliderDesc);
// Or create the collider and attach it to a rigid-body.
let rigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic());
let collider = world.createCollider(colliderDesc, rigidBody);
```

```js
// The physics world.
let world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

// Builder for a ball-shaped collider.
let example1 = RAPIER.ColliderDesc.ball(0.5);
// Builder for a cuboid-shaped collider.
let example2 = RAPIER.ColliderDesc.cuboid(0.5, 0.2, 0.1);
// Builder for a capsule-shaped collider. The capsule principal axis is the `y` coordinate axis.
let example3 = RAPIER.ColliderDesc.capsule(0.5, 0.2);
// Builder for a triangle-mesh-shaped collider.
let example4 = RAPIER.ColliderDesc.trimesh(vertices, indices);
// Builder for a heightfield-shaped collider.
let example5 = RAPIER.ColliderDesc.heightfield(2, 2, heights, scale);
// Builder for a collider with the given shape.
let colliderDesc = new RAPIER.ColliderDesc(new RAPIER.Ball(0.5))
    // The collider translation wrt. the body it is attached to.
    // Default: the zero vector.
    .setTranslation(1.0, 2.0, 3.0)
    // The collider rotation wrt. the body it is attached to, as a unit quaternion.
    // Default: the identity rotation.
    .setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 })
    // The collider density. If non-zero the collider's mass and angular inertia will be added
    // to the inertial properties of the body it is attached to.
    // Default: 1.0
    .setDensity(1.3)
    // The friction coefficient of this collider.
    // Default: 0.5
    .setFriction(0.8)
    // Whether this collider is a sensor.
    // Default: false
    .setSensor(true);

// Create the collider, without attaching it to a rigid-body.
let handle = world.createCollider(colliderDesc);
// Or create the collider and attach it to a rigid-body.
let rigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic());
let collider = world.createCollider(colliderDesc, rigidBody);
```

## Collider type[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#collider-type "Direct link to Collider type")

There are two types of colliders:

* A **solid collider** represents a geometric shape
  that can have contact points with other colliders to generate contact forces to prevent objects from
  penetrating-each-others.
* **Sensor colliders** on the other end don't
  generate contacts: they only generate intersection events when one sensor collider and another collider start/stop
  touching. Sensor colliders are generally used to detect when something enters an area. Note that, for symmetry with non-sensor colliders, sensors *do* contribute to the mass of a rigid-body they are attached to.

By default a collider is a solid collider. This can be changed to a sensor when constructing the collider, or after its
construction:

```js
/* Set the collider type when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setSensor(true);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the collider type after the collider creation. */
collider.setSensor(true);
```

## Shapes[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#shapes "Direct link to Shapes")

### Overview[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#overview "Direct link to Overview")

The main characteristic of a collider is its geometric shape. The supported shapes are illustrated below:

![supported shapes](https://rapier.rs:443/assets/images/supported_shapes-58c01351b4a8f02e143789e479ca4023.svg)

Shapes only hold information about their geometry. Their world-space position is given by the collider's position.
Balls, cuboids, capsules, cylinders, and cones are all described by their half-height and/or radius. Compound shapes,
convex meshes, triangle meshes, heightfields, and polylines are more complicated shapes described in the next paragraphs.

### Convex meshes[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#convex-meshes "Direct link to Convex meshes")

A convex mesh is a shape such that, if two points are part of the shape, then the segment between these two points is
also part of the shape:

![convex versus non-convex](https://rapier.rs:443/assets/images/convex_concave_crossing-3d1530723253842871b5c72835ae5a2a.svg)

There are two ways of creating a collider with a convex shape:

1. Using `ColliderDesc.convexHull(points)`. This is the simplest approach: it will automatically compute the convex
   hull of the given set of points. A **convex hull** is the smallest convex shape that contains all the given points.
2. Using `ColliderDesc.convexMesh(points, indices)` in
   3D or `ColliderDesc.convexPolyline(points)` in 2D.
   This takes a mesh described by its vertex buffer and index
   buffer and assumes it is already convex (you need to ensure that it is convex yourself). This will be more efficient than
   the `ColliderDesc.convexHull` constructor because it
   won't perform any calculations to ensure convexity. However, if the input mesh isn't actually convex, the collision-detection
   for that shape will give an incorrect result.

### Triangle meshes and polylines[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#triangle-meshes-and-polylines "Direct link to Triangle meshes and polylines")

Triangle meshes (in 3D) and polylines (in 2D) can be used to describe the boundary of any kind of shape. This is
generally useful to describe the fixed environment in games (terrains, buildings, etc.) Triangle meshes and
polylines are defined by their vertex buffer and their index buffer. The winding of the triangles of a triangle mesh
does not matter. Its topology doesn't matter either (it can have holes, cavities, doesn't need to be closed or
manifold). It is however strongly recommended to avoid triangles that are long and thin because they can result in a
lower numerical stability of collision-detection.

note

A triangle mesh/polyline is composed of triangles/segments with no thickness. This means that geometric queries like
point-containment tests won't work intuitively because the triangle mesh is assumed to have no interior.

#### Triangle mesh[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#triangle-mesh "Direct link to Triangle mesh")

A **triangle-mesh** collider can be built
with `ColliderDesc.trimesh(vertices, indices)` where
`vertices` is the buffer containing all the vertices of the mesh, and `indices` is a set of indices indicating what vertex is used by
what triangle. The vertex buffer and index buffer may have different lengths, and any vertex can be shared
by multiple triangles.

To have more control over the resulting `Trimesh`,

you can call `ColliderDesc.trimesh` with a third optional parameter `trimeshFlags`.

For example, `TrimeshFlags::FIX_INTERNAL_EDGES` is a popular choice to help with correcting ghost collision.

See [`TriMeshFlags` documentation](https://docs.rs/rapier2d/latest/rapier2d/geometry/struct.TriMeshFlags.html) for more information.

#### Polyline[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#polyline "Direct link to Polyline")

A **polyline** collider can be built
with `ColliderDesc.polyline(vertices, indices)` where
`vertices` is the buffer containing all the vertices of the polyline, and `indices` is an optional set of indices
indicating what vertex is used by what segment. The vertex buffer and index buffer may have different lengths, and any
vertex can be shared by multiple segments. If the given vertex buffer is `None` then the input vertices are assumed to
form a line strip, i.e., the polyline is formed from the segments `[vertices[0], vertices[1]], [vertices[1], vertices[2]], etc.`

warning

It is discouraged to use a triangle meshes or a polylines for colliders attached to
dynamic rigid-bodies. Because they have no interior, it is easy for another object to get stuck into them.
In order to simulate properly non-convex objects, it is recommended to use a **convex decomposition** with a
compound shape instead.

### Heightfields[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#heightfields "Direct link to Heightfields")

![heightfield](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA5NDAgMjI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDsiPjxnIGlkPSJ0ZXh0MTI4OS02Ij48L2c+PHJlY3QgaWQ9InJlY3QxMjgxIiB4PSI2Ljc3MSIgeT0iLTk5MS40NjEiIHdpZHRoPSIxMzkxLjQ4IiBoZWlnaHQ9IjEzMjguMTIiIHN0eWxlPSJmaWxsOiNmZmY7Ii8+PGcgaWQ9InRleHQxMDQ1Ij48L2c+PGcgaWQ9InRleHQxMDQ1LTMiPjwvZz48ZyBpZD0idGV4dDEwNDUtNiI+PC9nPjxnIGlkPSJ0ZXh0MTA0NS0zLTkiPjwvZz48ZyBpZD0idGV4dDEwNDUtMy0wIj48L2c+PGcgaWQ9InRleHQxMDQ1LTMtMC0wIj48L2c+PGcgaWQ9InRleHQxMDQ1LTMtMC0wLTYiPjwvZz48cGF0aCBpZD0icGF0aDg2NyIgZD0iTTMwLjIwOCw1NS40MTRsNjIuNSwxNDAuNjI1bDYyLjUsLTMxLjI1bDc4LjEyNSwzMS4yNWw2My4wODksLTMxLjk2OGw2MS45MTEsMzEuOTY4bDYyLjUsLTE0MC42MjUiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiMwZjZkZmY7c3Ryb2tlLXdpZHRoOjE1LjU2cHg7Ii8+PGcgaWQ9ImcxMTUzIj48cGF0aCBpZD0icGF0aDEwNDEiIGQ9Ik01MzguMDIxLDI0LjE2NGwtNDYuODc1LDQ2Ljg3NWw2Mi41LDE0MC42MjVsNjIuNSwtMzEuMjVsNzguMTI1LDMxLjI1bDYyLjUsLTMxLjI1bDYyLjUsMzEuMjVsNDYuODc1LC00Ni44NzVsNjIuNSwtMTMyLjgxM2wtNDYuODc1LDM5LjA2M2wtMzkuMDYzLDg1LjkzN2wtMzkuMDYyLC0yMy40MzdsLTYyLjUsMzEuMjVsLTc4LjEyNSwtMzEuMjVsLTYyLjUsMzEuMjVsLTYyLjUsLTE0MC42MjVaIiBzdHlsZT0iZmlsbDojMThhZGZmO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDoxLjU2cHg7Ii8+PHBhdGggaWQ9InBhdGg4NjctOSIgZD0iTTQ5MS4xNDYsNzEuMDM5bDYyLjUsMTQwLjYyNWw2Mi41LC0zMS4yNWw3OC4xMjUsMzEuMjVsNjMuMDg4LC0zMS45NjhsNjEuOTEyLDMxLjk2OGw2Mi41LC0xNDAuNjI1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGg4NjctMSIgZD0iTTUzOC4wMjEsMjQuMTY0bDYyLjUsMTQwLjYyNWw2Mi41LC0zMS4yNWw3OC4xMjUsMzEuMjVsNjMuMDg4LC0zMS45NjhsMzguNDc0LDI0LjE1NW0yMy40MzgsOS4zNzVsNjIuNSwtMTQyLjE4NyIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzBmNmRmZjtzdHJva2Utd2lkdGg6NS45MXB4O3N0cm9rZS1saW5lY2FwOnJvdW5kOyIvPjxwYXRoIGlkPSJwYXRoMTAyMSIgZD0iTTQ5MS4xNDYsNzEuMDM5bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDIzIiBkPSJNNTUzLjY0NiwyMTEuNjY0bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDI1IiBkPSJNNjE2LjE0NiwxODAuNDE0bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDI3IiBkPSJNNjk0LjI3MSwyMTEuNjY0bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDI5IiBkPSJNNzU2Ljc3MSwxODAuNDE0bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDMxIiBkPSJNODE5LjI3MSwyMTEuNjY0bDQ2Ljg3NSwtNDYuODc1IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMGY2ZGZmO3N0cm9rZS13aWR0aDo1LjkxcHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggaWQ9InBhdGgxMDMzIiBkPSJNODgxLjc3MSw3MS4wMzlsNDYuODc1LC00Ni44NzUiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiMwZjZkZmY7c3Ryb2tlLXdpZHRoOjUuOTFweDtzdHJva2UtbGluZWNhcDpyb3VuZDsiLz48cGF0aCBpZD0icGF0aDEwMzUiIGQ9Ik00OTEuMTQ2LDcxLjAzOWwxMDkuMzc1LDkzLjc1bDE1LjYyNSwxNS42MjVsMTI1LC0xNS42MjVsMTUuNjI1LDE1LjYyNWw3OC4xMjUsLTcuODEzIiBzdHlsZT0iZmlsbC1vcGFjaXR5OjA7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiMwZjZkZmY7c3Ryb2tlLXdpZHRoOjIuNzVweDtzdHJva2UtbGluZWNhcDpyb3VuZDsiLz48cGF0aCBpZD0icGF0aDEwMzciIGQ9Ik04MTkuMjcxLDIxMS42NjRsMTA5LjM3NSwtMTg3LjUiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiMwZjZkZmY7c3Ryb2tlLXdpZHRoOjMuMzRweDtzdHJva2UtbGluZWNhcDpyb3VuZDsiLz48L2c+PGcgaWQ9InRleHQxMDQ1LTMtMC0zLTIiPjwvZz48ZyBpZD0idGV4dDEwNDUtMy0wLTMtMi0wIj48L2c+PGcgaWQ9InRleHQxMDQ1LTMtMC0zLTItMyI+PC9nPjxnIGlkPSJ0ZXh0MTI1NyI+PC9nPjxnIGlkPSJ0ZXh0MTI4MSI+PC9nPjxnIGlkPSJ0ZXh0MTI4OSI+PC9nPjxnIGlkPSJ0ZXh0MTI4OS04Ij48L2c+PGcgaWQ9InRleHQxMzQ5Ij48L2c+PGcgaWQ9InRleHQxMzU3Ij48L2c+PGcgaWQ9InRleHQxMzc2Ij48L2c+PGcgaWQ9InRleHQxMzU3LTkiPjwvZz48L3N2Zz4=)

Heightfields are a more restrictive version of triangle-meshes and polylines. However, they can be easier to define
and use much less memory. Therefore heightfields are useful to define large parts of terrains with simple topologies.

A **3D heightfield** is basically large rectangle in the `X-Z` plane, subdivided in a grid pattern at regular intervals. Each
vertex of this subdivision is given a height, i.e., the coordinate of that point along the `Y` axis. A 3D heightfield
collider can be created
with `ColliderDesc.heightfield(heights, scale)` where
`heights` is a matrix indicating the altitude of each subdivision point of that heightfield. The number of rows of that
matrix is the number of subdivision along the `Z` axis, and the number of columns is the number of subdivision along the
`X` axis. The `scale` argument indicates the size of the rectangle of the `X-Z` plane.

info

A heightfield collider can be given any orientation by changing the orientation of the collider itself.

A **2D heightfield** is a large segment along the `X` axis, subdivided at regular intervals. Each vertex of this
subdivision is given a height, i.e., the coordinate of that point along the `Y` axis. A 2D heightfield collider
can be created
with `ColliderDesc.heightfield(heights, scale)` where
`heights` is a vector indicating the altitude of each subdivision point of that heightfield. The number of elements on
that vector is the number of subdivision of the heightfield. The `scale` argument indicates the length of the subdivided
segment along the `X` axis.

### Round shapes[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#round-shapes "Direct link to Round shapes")

Some shapes have **round** variants: `RoundCuboid`, `RoundCylinder`, `RoundCone`, `RoundConvexPolygon` and
`RoundConvexPolyhedron`. These are shapes to which is added a small thickness with round border:

![round cuboid](https://rapier.rs:443/img/round_cuboid.svg)

note

For algorithmic reasons, collision-detection involving **round cylinders**, **round cones**, **round convex polygon** or
**round convex polyhedron** will be faster than collision-detection with their non-round counterparts. However,
collision-detection with **round-cuboids** will be slower than collision-detection with regular cuboids.

Colliders with round shapes are built in a way very similar to their non-round
counterparts, e.g., `ColliderDesc.roundCuboid`.
These constructors take one additional parameter: the size of the added thickness called `borderRadius`.

## Mass properties[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#mass-properties "Direct link to Mass properties")

The [mass properties of a rigid-body](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#mass-properties) is computed as the sum of the mass-properties
manually set by the user for the rigid-body, plus the **mass-properties of the colliders** attached to it. There are two
ways to define the mass-properties of a collider:

1. The **easiest, automatic, way**: by giving the collider a non-zero density (the default density is 1.0) or a non-zero
   mass. This will make sure the other mass-properties like the angular inertia tensor are computed automatically from
   the collider's shape.
2. The **manual way**: by giving an explicit mass and angular inertia to the collider.

It is recommended to use the density-based or mass-based approaches as it will ensure the automatically-computed
mass-properties are coherent with the geometric shape. Wrong mass-properties (especially the angular inertia part and
center-of-mass location) may lead to odd behaviors. The manual approach is usually useful when modeling real-world
objects for which you already know the real-world mass, center-of-mass, and angular inertia tensor.

The mass-properties of a collider can be set when the collider is created, with `ColliderDesc.setDensity`,
`ColliderDesc.setMass`, or `ColliderDesc.setMassProperties`:

* Example 2D
* Example 3D

```js
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
let rigidBody = world.createRigidBody(rigidBodyDesc);
// First option: by setting the density of the collider (or we could just leave
//               its default value 1.0).
let colliderDesc = RAPIER.ColliderDesc.cuboid(1.0, 2.0)
    .setDensity(2.0);
// Second option: by setting the mass of the collider.
let colliderDesc2 = RAPIER.ColliderDesc.cuboid(1.0, 2.0)
    .setMass(0.8);
// Third option: by setting the mass-properties explicitly.
let colliderDesc3 = RAPIER.ColliderDesc.cuboid(1.0, 2.0)
    .setMassProperties(0.5, { x: 0.0, y: 1.0 }, 0.3);
// When the collider is attached, the rigid-body's mass and angular
// inertia is automatically updated to take the collider into account.
let collider = world.createCollider(colliderDesc, rigidBody);
```

```js
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
let rigidBody = world.createRigidBody(rigidBodyDesc);
// First option: by setting the density of the collider (or we could just leave
//               its default value 1.0).
let colliderDesc = RAPIER.ColliderDesc.cuboid(1.0, 2.0, 1.0)
    .setDensity(2.0);
// Second option: by setting the mass of the collider.
let colliderDesc2 = RAPIER.ColliderDesc.cuboid(1.0, 2.0, 1.0)
    .setMass(0.8);
// Third option: by setting the mass-properties explicitly.
let colliderDesc3 = RAPIER.ColliderDesc.cuboid(1.0, 2.0, 1.0)
    .setMassProperties(0.5, { x: 0.0, y: 1.0, z: 0.0 }, { x: 0.3, y: 0.2, z: 0.1 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 });
// When the collider is attached, the rigid-body's mass and angular
// inertia is automatically updated to take the collider into account.
let collider = world.createCollider(colliderDesc, rigidBody);
```

They can also be modified after the creation of the collider with `Collider.setDensity`, `Collider.setMass`, or
`Collider.setMassProperties`. Each of these methods (as well as the `ColliderDesc` methods above) replaces the
mass-properties previously set by any of the others: for example, calling `Collider.setMass` on a collider created
with `ColliderDesc.setDensity` makes its density be ignored. The mass-properties of the rigid-body the collider is
attached to are then updated automatically at the next simulation step (or immediately with
`RigidBody.recomputeMassPropertiesFromColliders`).

## Position[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#position "Direct link to Position")

The position of a collider represents its location (translation) in 2D or 3D world-space as well as its orientation (rotation).
Its translational part is represented as a vector and its rotational part as an unit
quaternion (in 3D) or an angle (in 2D).

warning

Please read carefully the paragraph after the next example. It explains how the collider position (and the action of setting
this position) behaves differently when it is attached to a rigid-body.

It is possible to set this position when the collider is created or after its creation:

* Example 2D
* Example 3D

```js
/* Set the collider position when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setTranslation(1.0, 2.0)
    .setRotation(0.4);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the collider position after the collider creation. */
collider.setTranslation({ x: 1.0, y: 2.0 });
collider.setRotation(0.4);
```

```js
/* Set the collider position when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setTranslation(1.0, 2.0, 3.0)
    .setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 });
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the collider position after the collider creation. */
collider.setTranslation({ x: 1.0, y: 2.0, z: 3.0 });
collider.setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 });
```

If a collider is **attached to a rigid-body**, its position is automatically updated by the physics pipeline when a
rigid-body is moved by the physics pipeline. If a change to the rigid-body position is made by the user then the collider
position will be updated during the next timestep.

Therefore, directly setting the position of a collider attached to a rigid-body will have **no
lasting effect**. Instead, it is possible to set the position of the collider **relative** to the rigid-body it is
attached to:

* Example 2D
* Example 3D

```js
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
let rigidBody = world.createRigidBody(rigidBodyDesc);
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setTranslation(1.0, 2.0);
// Attach the collider to the rigid-body. The collider's position wrt. the rigid-body
// is automatically set to the collider current position when this method is called.
let collider = world.createCollider(colliderDesc, rigidBody);
```

```js
/* Set the collider position wrt. its parent after the collider creation. */
collider.setTranslationWrtParent({ x: 1.0, y: 2.0 });
```

```js
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
let rigidBody = world.createRigidBody(rigidBodyDesc);
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setTranslation(1.0, 2.0, 3.0);
// Attach the collider to the rigid-body. The collider's position wrt. the rigid-body
// is automatically set to the collider current position when this method is called.
let collider = world.createCollider(colliderDesc, rigidBody);
```

```js
/* Set the collider position wrt. its parent after the collider creation. */
collider.setTranslationWrtParent({ x: 1.0, y: 2.0, z: 3.0 });
```

## Friction[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#friction "Direct link to Friction")

Friction is a force that opposes the relative tangential motion between two rigid-bodies with colliders in contact.
This force has a direction orthogonal to the contact normal and opposite to the relative rigid-body motion at
the contact point. Following the Coulomb friction model, the maximum magnitude of this force is the magnitude of the
force along the contact normal multiplied by a **friction coefficient**. A friction coefficient
of 0 implies no friction at all (completely sliding contact) and a coefficient greater or equal to 1 implies a
very strong friction. Values greater than 1 are allowed.

note

Rapier does not make any distinction between the fixed and dynamic friction coefficients currently.

Each collider has its own friction coefficient. This means that when two colliders are in contact, we need to apply a
rule that combines the friction coefficients of these two colliders into a single coefficient that will be used for
the contact. This rule is described by the `CoefficientCombineRule` enum:

* `CoefficientCombineRule.Average`: the average of the two coefficients is used for the contact.
* `CoefficientCombineRule.Min`: the minimum among the two coefficients is used for the contact.
* `CoefficientCombineRule.Multiply`: the product of the two coefficients is used for the contact.
* `CoefficientCombineRule.Max`: the maximum among the two coefficients is used for the contact.

By default, the `Average` rule is used. Each collider can be given its own friction combine rule. When two colliders are in
contact, we need to select one of their combine rule. The following precedence is used:
`GeometricMeanÂ >Â ClampedSumÂ >Â MaxÂ >Â MultiplyÂ >Â MinÂ >Â Average`.

For example if one collider with the `Multiply` friction combine rule is in contact with a collider with the `Average` friction
combine rule, then the `Multiply` rule will be applied for the friction coefficient of this contact (i.e. the coefficients
of both colliders will be multiplied to obtain the coefficient used by the contact).

info

The `CoefficientCombineRule` system exists to cover a wide variety of use-cases efficiently. If this is not flexible
enough, it is possible to get full control over the selection of friction coefficients for each contact point using
[contact modification](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#contact-modification). For example, contact modification allows the
simulation of colliders with non-uniform friction coefficients.

The friction coefficient and friction combine rule can both be set when the collider is created or after its creation:

```js
/* Set the friction coefficient and friction combine rule
  when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setFriction(0.7)
    .setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the friction coefficient and friction combine rule
   after the collider creation. */
collider.setFriction(0.7);
collider.setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min);
```

## Restitution[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#restitution "Direct link to Restitution")

Restitution controls how **elastic** (aka. **bouncy**) a contact is. The elasticity of a contact is controlled
by the **restitution coefficient**. A restitution coefficient set to 1 (fully elastic contact) implies that the
exit velocity at a contact has the same magnitude as the entry velocity along the contact normal: it is as if you drop a
bouncing ball and it gets back to the same height after the bounce. A restitution coefficient set to 0 implies that the
exit velocity at a contact will be zero along the contact normal: it's as if you drop a ball but it doesn't bounce at all.

note

The friction and restitution coefficients are both managed in very similar ways: with the `CoefficientCombineRule`
or with [contact modification](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#contact-modification). The paragraph below is almost identical to the paragraph about [friction](https://rapier.rs:443/docs/user_guides/javascript/colliders#friction).

Each collider has its own restitution coefficient. This means that when two colliders are in contact, we need to apply a
rule that combines the restitution coefficients of these two colliders into a single coefficient that will be used for
the contact. This rule is described by the `CoefficientCombineRule` enum:

* `CoefficientCombineRule.Average`: the average of the two coefficients is used for the contact.
* `CoefficientCombineRule.Min`: the minimum among the two coefficients is used for the contact.
* `CoefficientCombineRule.Multiply`: the product of the two coefficients is used for the contact.
* `CoefficientCombineRule.Max`: the maximum among the two coefficients is used for the contact.

By default, the `Average` rule is used. Each collider can be given its own restitution combine rule. When two colliders are in
contact, we need to select one of their combine rule. The following precedence is used:
`GeometricMeanÂ >Â ClampedSumÂ >Â MaxÂ >Â MultiplyÂ >Â MinÂ >Â Average`.

For example if one collider with the `Multiply` restitution combine rule is in contact with a collider with the `Average` restitution
combine rule, then the `Multiply` rule will be applied for the restitution coefficient of this contact (i.e. the coefficients
of both colliders will be multiplied to obtain the coefficient used by the contact).

info

The `CoefficientCombineRule` system exists to cover a wide variety of use-cases efficiently. If this is not flexible
enough, it is possible to get full control over the selection of restitution coefficients for each contact point using
[contact modification](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#contact-modification). For example, contact modification allows the
simulation of colliders with non-uniform restitution coefficients.

The restitution coefficient and restitution combine rule can both be set when the collider is created or after its creation:

```js
/* Set the restitution coefficient and restitution combine rule
  when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setRestitution(0.7)
    .setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Min);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the restitution coefficient and restitution combine rule
   after the collider creation. */
collider.setRestitution(0.7);
collider.setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Min);
```

## Contact skin[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#contact-skin "Direct link to Contact skin")

The contact skin of a collider acts as if the collider was enlarged by a skin of the given thickness: the objects
touching it are kept that much further apart. The default is zero, i.e., no skin at all.

A non-zero contact skin can improve the performances and, in some cases, the stability of the simulation, because the
contacts will have more room to prevent penetrations. However, as a result it leaves a small gap between the
colliding objects, equal to the sum of their skins. Therefore the skin should be small enough for that gap to remain
invisible, or to be hidden by the rendering assets. The contact skin is especially relevant when using non-convex
shapes made of thin features like triangle meshes and polylines.

```js
/* Set the contact skin when the collider is created. */
let skinColliderDesc = RAPIER.ColliderDesc.ball(0.5).setContactSkin(0.01);
let skinCollider = world.createCollider(skinColliderDesc);
/* Set the contact skin after the collider creation. */
skinCollider.setContactSkin(0.01);
```

## Collision groups and solver groups[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#collision-groups-and-solver-groups "Direct link to Collision groups and solver groups")

The most efficient way of preventing some pairs of colliders from interacting with each other is to use collision
groups or solver groups. Each collider is given:

* A `collision_groups` for filtering what pair of colliders should have their contacts (or intersection test if
  at least one of the colliders is a sensor) computed by the narrow-phase.
  This filtering happens right after the broad-phase, at the beginning of the narrow phase.
* A `solver_groups` for filtering what pair of colliders should have their contact forces computed. This filtering
  happens at the end of the narrow-phase, before the constraints solver.

In other words, the `solver_groups` is here to prevent contact forces from being computed between some colliders, whereas the
`collision_groups` will also prevent the contact themselves (and contact events) from being computed. The
`collision_groups` should be preferred most of the time because it skips more computations. The `solver_groups` is only
useful if you really want the contact information to be computed but not the forces, for example so that you can apply your
own forces based on these contacts.

A collision group or solver group is described as a pair of bit masks:

* The groups **membership** indicates what groups the collider is part of (one bit per group).
* The groups **filter** indicates what groups the collider can interact with (one bit per group).

The `membership` and `filter` are both 16-bit bit masks packed into a single 32-bits value. The 16 left-most bits
contain the memberships whereas the 16 right-most bits contain the filter.

For example, let's say we want our collider `A` to be part of the groups `[0, 2, 3]` and to be able to interact
with the groups `[2]`, then its groups membership is `0b0000_0000_0000_1101 = 0x000D` and its groups filter is `0b0000_0000_0000_0100 = 0x0004`. The
corresponding packed bit mask is `0x000D0004`. The collision groups and solver groups of a collider can be set
during or after its creation:

```js
/* Set the collision groups and solver groups when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setCollisionGroups(0x000D0004)
    .setSolverGroups(0x00500010);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the collision groups and solver groups after the collider creation. */
collider.setCollisionGroups(0x000D0004);
collider.setSolverGroups(0x000D0004);
```

After the broad-phase detects that two colliders `A` and `B` may start being in contact, the narrow-phase will check the collision
groups of both colliders to see if it needs to compute contacts. The check operates as follows:

* If the collider `A` is not member of any collision group in the filter of `B`, then no contact is computed.
* If the collider `B` is not member of any collision group in the filter of `A`, then no contact is computed.
* The exact bit-wise check is the following:

```rust
   ((A.collisionGroups() >> 16) & (B.collisionGroups() & 0xffff)) != 0
&& ((B.collisionGroups() >> 16) & (A.collisionGroups() & 0xffff)) != 0
```

If this test succeeds, then the narrow-phase will compute the contacts. Then it will check the solver groups of both
colliders, using the same kind of tests as described before but using the `solver_groups` instead of `collision_groups`.
If the test succeeds then the constraints solver will compute forces for these contacts. Otherwise, it won't.

## Active collision types[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#active-collision-types "Direct link to Active collision types")

By default, collision-detection is completely disabled between two colliders when both are attached to non-dynamic bodies.
Sometimes, it can be useful to enable collision-detection between, e.g., a collider attached to a kinematic rigid-body
and a collider attached to a fixed rigid-body. This can be done by modifying the collider's `ActiveCollisionTypes`:

```js
/* Set the active collision types when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setActiveCollisionTypes(RAPIER.ActiveCollisionTypes.DEFAULT |
        RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the active collision types after the collider creation. */
collider.setActiveCollisionTypes(RAPIER.ActiveCollisionTypes.DEFAULT |
    RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED);
```

info

To enable collision-detection between kinematic bodies and fixed bodies (as well as dynamic bodies),
set its active collision types to:

```js
RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED
```

## Active events[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#active-events "Direct link to Active events")

[Event handlers](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#collision-and-contact-force-events) are user-defined callbacks used to be
notified when two colliders start/stop touching. By default no collision event is generated by
the narrow-phase. In order to enable a collision event for a pair of colliders, at
least one of the involved colliders must have the corresponding event set as active. An event is activated for a collider
by setting its corresponding active events bit to `1`:

* Setting the `ActiveEvents.COLLISION_EVENTS` bit to 1
  enables the [collision events](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#collision-and-contact-force-events) involving the collider.

The active events of a collider can be set when the collider is created or after its creation:

```js
/* Set the active events when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the active events after the collider creation. */
collider.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
```

## Active hooks[â](https://rapier.rs:443/docs/user_guides/javascript/colliders/#active-hooks "Direct link to Active hooks")

[Physics hooks](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#physics-hooks) are user-defined callbacks used to filter-out some contact
pairs, or modify contacts, based on arbitrary user code. In order to enable a physics hook for a pair of colliders, at
least one of the involved colliders must have the corresponding hook set as active. A hook is activated for a collider
by setting its corresponding active hooks bit to `1`:

* Setting the `ActiveHooks.FILTER_CONTACT_PAIR` bit to 1
  enables the manual [filtering of all the contact pairs](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#contact-and-intersection-filtering)
  involving the collider.
* Setting the `ActiveHooks.FILTER_INTERSECTION_PAIR`bit
  to 1 enables the manual [filtering of all the intersection pairs](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#contact-and-intersection-filtering)
  involving the collider.

The active hooks of a collider can be set when the collider is created or after its creation:

```js
/* Set the active hooks when the collider is created. */
let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setActiveHooks(RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS);
let collider = world.createCollider(colliderDesc);
```

```js
/* Set the active hooks after the collider creation. */
collider.setActiveHooks(RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS);
```
