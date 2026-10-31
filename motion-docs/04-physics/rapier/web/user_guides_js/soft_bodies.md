---
source: https://rapier.rs:443/docs/user_guides/javascript/soft_bodies
title: "Soft-bodies | Rapier"
fetched: 2026-10-28
---

# Soft-bodies

*For a high-level overview of the methods behind our soft-body implementation, see our [blog-post](https://dimforge.com/blog/2026/09/25/advanced-soft-bodies-for-games-in-the-rapier-physics-engine).*

Rigid-bodies can't deform in any way, which is precisely what makes them cheap and easy to control. Soft-bodies, aka.
*deformable bodies*, are made for everything that must bend, stretch, or squash: ropes, cloth, jelly, balloons, the
chassis of a car denting on impact, etc. They live in the same world as the [rigid-bodies](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies) and the
[colliders](https://rapier.rs:443/docs/user_guides/javascript/colliders), and interact with all the other features of the engine with little to no restriction:

* Any kind of [impulse joint](https://rapier.rs:443/docs/user_guides/javascript/joints) can be attached to a soft-body through its
  [soft frames](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#soft-frames-joints-and-rigid-colliders), which allows the definition of links between
  two soft-bodies, between a soft-body and a rigid-body, or between a soft-body and a
  [multibody](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints#multibodies).
* [Deformable colliders](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#deformable-colliders), as well as [rigid ones](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#clusters),
  can be attached to a soft-body, sensors included.
* A detailed mesh can follow the deformations of a coarser simulated lattice
  ([**skinning**](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#skinned-soft-bodies)).
* Parts of a soft-body can be [controlled kinematically](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#particles-and-kinematic-control).
* A soft-body can deform permanently ([**plasticity**](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#plasticity)), and tear apart
  ([**tearing**](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#tearing)).

## Definition of a soft-body[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#definition-of-a-soft-body "Direct link to Definition of a soft-body")

A rigid-body is a single moving frame: the position and the velocity of any of its points follow from one translation
and one rotation. This is precisely what a deformable body can't be, because its parts must be able to move (somewhat)
independently of each other. Instead, a soft-body is made of **particles**, aka. mass points, i.e., points without any
orientation, each having 2 degrees of freedom in 2D and 3 in 3D. The more particles a body is made of, the more detailed
its deformations can be, and the more expensive it is to simulate.

The particles are kept together by a lattice made of up to three kinds of elements:

* The **particles** are the only mandatory element, i.e., the positions the
  `SoftBodyDesc` is built from. They carry the mass and the velocity of the body.
* The **edges** (`setEdges`) connect two particles. The structural edges resist the
  stretching (and the compression) of the body, whereas the bending edges
  (`setBendEdges`) and the dihedral constraints
  (`setDihedrals`, 3D) resist its bending.
* The **cells** (`setCells`) connect three particles in 2D (triangles) and four in 3D
  (tetrahedra). They resist the deformation of the area (2D) or of the volume (3D) they cover.

![Soft-body lattice: particles, edges, and cells](https://rapier.rs:443/assets/images/lattice-fb11ad3121188ce8d380afdbb4b4e077.svg)

Two more concepts describe how the body interacts with the rest of the world. The **surface**
(`setSurface`) is the boundary of the body (segments in 2D, triangles in 3D): this is
what the body collides with, and what the preservation of its volume integrates over. A body without any surface, e.g.,
a cloud of particles, collides with nothing at all, unless it is given **wire** segments
(`setWire`), in which case it collides as a polyline, which is what a 3D rope does.
Finally, a **skin** (`setSkin`) is a mesh which vertices follow the cells without being
particles themselves, as detailed in the [skinning](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#deformable-colliders-and-skinning) section.

Every element can be given manually to the soft-body builder, but the constructors of the next section build the lattices of the
most common shapes directly. Note that the elements a body is made of decide which of the
[cohesion models](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#keeping-the-body-together) can hold it together.

## Creation and insertion[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#creation-and-insertion "Direct link to Creation and insertion")

A soft-body is described by a `SoftBodyDesc`, which constructors build the lattice of the most common shapes (their
JavaScript names are camel-cased, e.g., `clothTube`):

| Constructor | Dimension | Lattice |
| --- | --- | --- |
| `rope` | 2D, 3D | Structural and bending edges between the particles of a line. |
| `cloth`, `cloth_anisotropic`, `cloth_tube` | 3D | Structural, shear and bending edges, with a triangle surface. |
| `grid` | 2D | Triangle cells filling a rectangle. |
| `cuboid` | 3D | Tetrahedral cells filling a box. |
| `polygon`, `disk` | 2D | A closed boundary preserving its area. |
| `sphere` | 3D | A closed surface preserving its volume, with dihedral bending constraints. |
| `trimesh`, `polyline` | 2D, 3D (`trimesh`), 2D (`polyline`) | The vertices and edges of a mesh, held by shape matching. |
| `volumetric` | 2D, 3D | Cells filling a closed mesh. |

The `volumetric` constructor is the one to use for an arbitrary solid: it fills a closed mesh (segments in 2D, triangles
in 3D, oriented outward) with cells of about the requested size. The interior of the mesh is triangulated by Delaunay
refinement in 2D, whereas in 3D every cell of a lattice the mesh reaches is kept whole: the result contains the mesh
instead of following it exactly, and its boundary is as blocky as its cells.

* Example 2D
* Example 3D

```js
// Fill a closed, counter-clockwise polyline (here a rectangle) with triangle cells of about
// 0.2 in size.
let boxVertices = new Float32Array([-0.5, -0.25, 0.5, -0.25, 0.5, 0.25, -0.5, 0.25]);
let boxIndices = new Uint32Array([0, 1, 1, 2, 2, 3, 3, 0]);
let blockDesc = RAPIER.SoftBodyDesc.volumetric(boxVertices, boxIndices, 0.2);
let block = world.createSoftBody(blockDesc.setTranslation({ x: -3.0, y: 1.0 }));
```

```js
// Fill a closed, outward-oriented triangle mesh (here a box) with tetrahedral cells of
// about 0.2 in size.
let boxVertices = new Float32Array([
    -0.5, -0.25, -0.25, 0.5, -0.25, -0.25, 0.5, 0.25, -0.25, -0.5, 0.25, -0.25,
    -0.5, -0.25, 0.25, 0.5, -0.25, 0.25, 0.5, 0.25, 0.25, -0.5, 0.25, 0.25,
]);
let boxIndices = new Uint32Array([
    0, 2, 1, 0, 3, 2, 4, 5, 6, 4, 6, 7, 0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2, 0, 4, 7, 0, 7, 3, 1, 2, 6, 1, 6, 5,
]);
let blockDesc = RAPIER.SoftBodyDesc.volumetric(boxVertices, boxIndices, 0.2);
let block = world.createSoftBody(blockDesc.setTranslation({ x: -3.0, y: 1.0, z: 0.0 }));
```

The builder allows the definition of everything else that is specific to one soft-body: the particles held in place (the
**pinned** particles, `setPinnedParticles`), the softness of its constraints
(`setSoftness`), the mass of its particles (one mass for every particle with
`setParticleMass`, a total mass for the whole body with
`setMass`, or one mass per particle with
`setMasses`), their radius
(`setParticleRadius`), the collider its surface is made of, and whether that
surface is allowed to collide with itself (`setSelfContacts`). The particles
can also be given a linear damping (`setLinearDamping`), a gravity scale
(`setGravityScale`), a dominance group
(`setDominanceGroup`), and be allowed to sleep or
not (`setCanSleep`), exactly like a [rigid-body](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies). Inserting the
soft-body into the world (`World.createSoftBody`) will
automatically create the rigid-body standing for it (its [root body](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#the-root-body)), as well as the
colliders covering its surface:

* Example 2D
* Example 3D

```js
// The world that will contain our soft bodies.
let world = new RAPIER.World({ x: 0.0, y: -9.81 });
world.createCollider(RAPIER.ColliderDesc.cuboid(10.0, 0.1));

// Description of a rope of 20 particles between two points.
let example1 = RAPIER.SoftBodyDesc.rope({ x: 0.0, y: 3.0 }, { x: 2.0, y: 3.0 }, 20);
// Description of a grid of `nx` by `ny` particles filled with triangle cells.
let example2 = RAPIER.SoftBodyDesc.grid({ x: 3.0, y: 1.0 }, { x: 1.0, y: 1.0 }, 6, 6);
// Description of a disk: a ring of particles holding its area (a pressurized blob).
let example3 = RAPIER.SoftBodyDesc.disk({ x: 0.0, y: 3.0 }, 0.8, 24);
// Description of a closed polygon of particles holding its area.
let example4 = RAPIER.SoftBodyDesc.polygon([5.0, 4.0, 7.0, 4.0, 7.0, 6.0, 5.0, 6.0]);
// Description over raw particle positions; the elements are added by the setters.
let example5 = new RAPIER.SoftBodyDesc([0.0, 1.0, 1.0, 1.0]).setEdges([0, 1]);

let n = 20;
let sheetDesc = RAPIER.SoftBodyDesc.grid({ x: -3.0, y: 3.0 }, { x: 1.0, y: 1.0 }, n, n)
    // Particles held in place.
    .setPinnedParticles([0, n - 1])
    // A uniform softness (natural frequency in Hz, damping ratio) for every constraint.
    .setSoftness(30.0, 1.0)
    // The mass of each particle.
    // Default: 1.0
    .setParticleMass(0.05)
    // The thickness of the particles, for collisions.
    // Default: 0.01
    .setParticleRadius(0.05)
    // The template of the body's colliders: its shape is replaced by the deformable surface.
    .setSurfaceCollider(RAPIER.ColliderDesc.ball(0.05).setFriction(0.8))
    // Whether the body may fall asleep.
    // Default: true
    .setCanSleep(true);
// Create the soft body: this creates its hidden root rigid body and its colliders.
let sheet = world.createSoftBody(sheetDesc);
// The integer handle of the soft body can be read from the `handle` field.
let sheetHandle = sheet.handle;
```

```js
// The world that will contain our soft bodies.
let world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });
world.createCollider(RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0));

// Description of a rope of 20 particles between two points.
let example1 = RAPIER.SoftBodyDesc.rope({ x: 0.0, y: 3.0, z: 0.0 }, { x: 2.0, y: 3.0, z: 0.0 }, 20);
// Description of a cloth: `nu` by `nv` particles, particle `(i, j)` at `origin + i * du + j * dv`.
let example2 = RAPIER.SoftBodyDesc.cloth(
    { x: -1.0, y: 2.0, z: -1.0 }, { x: 0.1, y: 0.0, z: 0.0 }, { x: 0.0, y: 0.0, z: 0.1 }, 20, 20,
);
// Description of a box of `nx * ny * nz` particles filled with tetrahedral cells.
let example3 = RAPIER.SoftBodyDesc.cuboid({ x: 3.0, y: 1.0, z: 0.0 }, { x: 0.5, y: 0.5, z: 0.5 }, 4, 4, 4);
// Description of a hollow sphere holding its volume (a balloon).
let example4 = RAPIER.SoftBodyDesc.sphere({ x: 0.0, y: 3.0, z: 3.0 }, 0.8, 2);
// Description over raw particle positions; the elements are added by the setters.
let example5 = new RAPIER.SoftBodyDesc([0.0, 1.0, 0.0, 1.0, 1.0, 0.0]).setEdges([0, 1]);

let n = 20;
let clothDesc = RAPIER.SoftBodyDesc.cloth(
    { x: -1.0, y: 2.0, z: -1.0 }, { x: 0.1, y: 0.0, z: 0.0 }, { x: 0.0, y: 0.0, z: 0.1 }, n, n,
)
    // Particles held in place.
    .setPinnedParticles([0, n - 1, n * (n - 1), n * n - 1])
    // A uniform softness (natural frequency in Hz, damping ratio) for every constraint.
    .setSoftness(30.0, 1.0)
    // The mass of each particle.
    // Default: 1.0
    .setParticleMass(0.05)
    // The thickness of the particles, for collisions.
    // Default: 0.01
    .setParticleRadius(0.02)
    // The template of the body's colliders: its shape is replaced by the deformable surface.
    .setSurfaceCollider(RAPIER.ColliderDesc.ball(0.05).setFriction(0.8))
    // Whether the surface collides with itself.
    // Default: false
    .setSelfContacts(true)
    // Whether the body may fall asleep.
    // Default: true
    .setCanSleep(true);
// Create the soft body: this creates its hidden root rigid body and its colliders.
let cloth = world.createSoftBody(clothDesc);
// The integer handle of the soft body can be read from the `handle` field.
let clothHandle = cloth.handle;
```

info

The collider given to `SoftBodyDesc.setSurfaceCollider` is
only a template: its shape is replaced by the deformable surface of the soft-body, and its density is ignored, whereas
all its other properties are kept. Therefore this is where the [friction](https://rapier.rs:443/docs/user_guides/javascript/colliders#friction), the [collision
groups](https://rapier.rs:443/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups), or the [active events](https://rapier.rs:443/docs/user_guides/javascript/colliders#active-events) of
the soft-body must be set. A body that should only collide through colliders of your own can be built without any
default one (`setNoSurfaceCollider`).

tip

Two builders can be merged into a single soft-body with `append`, and their pieces
sewn together with additional edges (`addEdges`), which rest length is the distance
their particles have when they are added. This is, e.g., how the sleeves of a shirt are attached to its body.

## Keeping the body together[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#keeping-the-body-together "Direct link to Keeping the body together")

Rapier supports three ways of holding the particles of a soft-body together: shape matching, constraints, and the
Finite Elements Method (FEM). They can be combined, e.g., shape matching on top of edge constraints. Note that shape
matching works on the particles alone, whereas the constraints need edges or cells, and the FEM solver needs cells.

### Shape matching[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#shape-matching "Direct link to Shape matching")

Shape matching doesn't need any element. At each timestep, the rest shape of the body is placed where it best fits its
current shape, i.e., both shapes are given the same center of mass, and the rest shape is given the rotation bringing
its particles the closest to the current ones. Each particle is then pulled toward its twin in that matched rest shape
by a spring:

![Shape-matching steps](https://rapier.rs:443/assets/images/shape_matching-601467f070f7133fb6b94e6b7d86b6d8.svg)

This is cheap, and a body always recovers its original shape whatever the deformation it went through. On the other
hand, the particles don't interact with their neighbors: pushing on one particle doesn't pull the ones around it, which
makes the deformations feel very local. Shape matching is enabled by
`SoftBodyDesc.setShapeMatching`, and the strength of its
springs is the **shape matching softness** (`shapeMatchingSoftness`)
of the [material](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#constraints):

* Example 2D
* Example 3D

```js
// A cloud of particles without any element: shape matching alone pulls them back toward
// their rest shape, placed where it best fits the current one.
let points = [];
for (let i = 0; i < 9; ++i) {
    points.push((i % 3) * 0.3, Math.floor(i / 3) * 0.3 + 4.0);
}
let shapeMaterial = new RAPIER.SoftBodyMaterial();
// How fast the particles are pulled back toward their rest shape.
shapeMaterial.shapeMatchingSoftness = { naturalFrequency: 5.0, dampingRatio: 1.0 };
let pointCloudDesc = new RAPIER.SoftBodyDesc(points)
    .setShapeMatching(true)
    .setMaterial(shapeMaterial)
    .setParticleRadius(0.1);
let pointCloud = world.createSoftBody(pointCloudDesc);
```

```js
// A cloud of particles without any element: shape matching alone pulls them back toward
// their rest shape, placed where it best fits the current one.
let points = [];
for (let i = 0; i < 27; ++i) {
    points.push((i % 3) * 0.3, (Math.floor(i / 3) % 3) * 0.3 + 4.0, Math.floor(i / 9) * 0.3);
}
let shapeMaterial = new RAPIER.SoftBodyMaterial();
// How fast the particles are pulled back toward their rest shape.
shapeMaterial.shapeMatchingSoftness = { naturalFrequency: 5.0, dampingRatio: 1.0 };
let pointCloudDesc = new RAPIER.SoftBodyDesc(points)
    .setShapeMatching(true)
    .setMaterial(shapeMaterial)
    .setParticleRadius(0.1);
let pointCloud = world.createSoftBody(pointCloudDesc);
```

tip

Use shape matching for low-detail deformations, or whenever computing a topology (edges, cells) isn't desired. It is
enabled by default by the `trimesh` and `polyline` constructors. Note however that it performs very poorly for ropes,
cloth, or any open shape. Also note that combining it with edges makes the deformations spread to the neighbors to look
more realistic.

### Constraints[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#constraints "Direct link to Constraints")

The constraints-based soft-body solver is the default solver, and the most versatile one:
every edge and cell element of the deformation lattice becomes a constraint, solved together with the contacts and the joints of the scene.

![Edge and cell constraints](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MjAgMzUwLjkiIHdpZHRoPSI2MjAiIGhlaWdodD0iMzUwLjkiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiIHJvbGU9ImltZyI+CiAgPHRpdGxlPlNwcmluZyBjb25zdHJhaW50czwvdGl0bGU+CiAgPGRlc2M+TGVmdDogYW4gZWRnZSBpcyBhIHNwcmluZy1kYW1wZXIgYmV0d2VlbiB0d28gbWFzcyBwb2ludHMuIFJpZ2h0OiBhIGNlbGwgcHVsbHMgaXRzIGRlZm9ybWVkIGNvcm5lcnMgYmFjayB0b3dhcmQgaXRzIGJlc3QtZml0dGluZyByb3RhdGVkIHJlc3Qgc2hhcGUuPC9kZXNjPgogIDxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iNjE5IiBoZWlnaHQ9IjM0OS45IiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2UxZTRlOCIvPgogIDx0ZXh0IHg9IjE2MC4wIiB5PSIzOC4wIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWMxZTIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+RWRnZTogc3ByaW5nLWRhbXBlcjwvdGV4dD4KICA8dGV4dCB4PSI0NjAuMCIgeT0iMzguMCIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzFjMWUyMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9IjYwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBhaW50LW9yZGVyPSJzdHJva2UiPkNlbGw6IGVsYXN0aWMgZWxlbWVudDwvdGV4dD4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNjUuMCIgeTE9IjExOC4wIiB4Mj0iNjUuMCIgeTI9IjE2Mi4wIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjI1NS4wIiB5MT0iMTE4LjAiIHgyPSIyNTUuMCIgeTI9IjE2Mi4wIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHBvbHlsaW5lIHBvaW50cz0iNjUuMCwxMTguMCA5My41LDExOC4wIDEwNC42LDEyNS4wIDExNS43LDExMS4wIDEyNi44LDEyNS4wIDEzNy44LDExMS4wIDE0OC45LDEyNS4wIDE2MC4wLDExMS4wIDE3MS4xLDEyNS4wIDE4Mi4yLDExMS4wIDE5My4yLDEyNS4wIDIwNC4zLDExMS4wIDIxNS40LDEyNS4wIDIyNi41LDExOC4wIDI1NS4wLDExOC4wIiBmaWxsPSJub25lIiBzdHJva2U9IiNlYThhMGMiIHN0cm9rZS13aWR0aD0iMi4yIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2NS4wIiB5MT0iMTYyLjAiIHgyPSIxMjUuOCIgeTI9IjE2Mi4wIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMi4wIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHBvbHlsaW5lIHBvaW50cz0iMTk0LjIsMTcxLjAgMTI1LjgsMTcxLjAgMTI1LjgsMTUzLjAgMTk0LjIsMTUzLjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRiNTU2MyIgc3Ryb2tlLXdpZHRoPSIyLjAiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjE2OS41IiB5MT0iMTY4LjAiIHgyPSIxNjkuNSIgeTI9IjE1Ni4wIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMi42IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjE2OS41IiB5MT0iMTYyLjAiIHgyPSIyNTUuMCIgeTI9IjE2Mi4wIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMi4wIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjUuMCIgY3k9IjE0MC4wIiByPSI3IiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxjaXJjbGUgY3g9IjI1NS4wIiBjeT0iMTQwLjAiIHI9IjciIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0LjAiIHkxPSIyMjguMCIgeDI9IjIzNi4wIiB5Mj0iMjI4LjAiIHN0cm9rZT0iIzhiOTVhMSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iNCAzIi8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI4NC4wIiB5MT0iMjI0LjAiIHgyPSI4NC4wIiB5Mj0iMjMyLjAiIHN0cm9rZT0iIzhiOTVhMSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iMjM2LjAiIHkxPSIyMjQuMCIgeDI9IjIzNi4wIiB5Mj0iMjMyLjAiIHN0cm9rZT0iIzhiOTVhMSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNjUuMCIgeTE9IjI1OC4wIiB4Mj0iMjU1LjAiIHkyPSIyNTguMCIgc3Ryb2tlPSIjMWMxZTIxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2NS4wIiB5MT0iMjU0LjAiIHgyPSI2NS4wIiB5Mj0iMjYyLjAiIHN0cm9rZT0iIzFjMWUyMSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iMjU1LjAiIHkxPSIyNTQuMCIgeDI9IjI1NS4wIiB5Mj0iMjYyLjAiIHN0cm9rZT0iIzFjMWUyMSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48dGV4dCB4PSIxNjAuMCIgeT0iMjIxLjAiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2MDY3NzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBwYWludC1vcmRlcj0ic3Ryb2tlIj5yZXN0IGxlbmd0aDwvdGV4dD48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHRleHQgeD0iMTYwLjAiIHk9IjI1MS4wIiBmb250LXNpemU9IjExIiBmaWxsPSIjNjA2NzcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0ibm9ybWFsIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+Y3VycmVudCBsZW5ndGg8L3RleHQ+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjx0ZXh0IHg9IjE2MC4wIiB5PSIxMDIuMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2VhOGEwYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9IjYwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBhaW50LW9yZGVyPSJzdHJva2UiPnNwcmluZzwvdGV4dD48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHRleHQgeD0iMTYwLjAiIHk9IjE5MC4wIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNGI1NTYzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+ZGFtcGVyPC90ZXh0PjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48cG9seWdvbiBwb2ludHM9IjM5OC44LDIwMC45IDUzMy4yLDE1Mi4wIDQ1MC42LDEzNC4yIiBmaWxsPSIjZDNmM2VhIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48cG9seWdvbiBwb2ludHM9IjQxOS40LDIwOS40IDUyMi44LDE3MS43IDQ0MC4zLDEwNi4wIiBmaWxsPSJub25lIiBzdHJva2U9IiM4Yjk1YTEiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSI1IDQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjM5OC44IiB5MT0iMjAwLjkiIHgyPSI0MTIuMCIgeTI9IjIwNi4zIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNS40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHBvbHlnb24gcG9pbnRzPSI0MTkuNCwyMDkuNCA0MDkuNiwyMDkuNyA0MTIuNiwyMDIuMiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMuMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iMzk4LjgiIHkxPSIyMDAuOSIgeDI9IjQxMi4wIiB5Mj0iMjA2LjMiIHN0cm9rZT0iI2VhOGEwYyIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxwb2x5Z29uIHBvaW50cz0iNDE5LjQsMjA5LjQgNDA5LjYsMjA5LjcgNDEyLjYsMjAyLjIiIGZpbGw9IiNlYThhMGMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjUzMy4yIiB5MT0iMTUyLjAiIHgyPSI1MjYuNSIgeTI9IjE2NC42IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNS40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHBvbHlnb24gcG9pbnRzPSI1MjIuOCwxNzEuNyA1MjMuNCwxNjEuOSA1MzAuNiwxNjUuNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMuMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNTMzLjIiIHkxPSIxNTIuMCIgeDI9IjUyNi41IiB5Mj0iMTY0LjYiIHN0cm9rZT0iI2VhOGEwYyIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxwb2x5Z29uIHBvaW50cz0iNTIyLjgsMTcxLjcgNTIzLjQsMTYxLjkgNTMwLjYsMTY1LjYiIGZpbGw9IiNlYThhMGMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjQ1MC42IiB5MT0iMTM0LjIiIHgyPSI0NDMuMSIgeTI9IjExMy41IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNS40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHBvbHlnb24gcG9pbnRzPSI0NDAuMywxMDYuMCA0NDcuMiwxMTMuMCA0MzkuNiwxMTUuOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMuMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNDUwLjYiIHkxPSIxMzQuMiIgeDI9IjQ0My4xIiB5Mj0iMTEzLjUiIHN0cm9rZT0iI2VhOGEwYyIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxwb2x5Z29uIHBvaW50cz0iNDQwLjMsMTA2LjAgNDQ3LjIsMTEzLjAgNDM5LjYsMTE1LjgiIGZpbGw9IiNlYThhMGMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNDE5LjQiIGN5PSIyMDkuNCIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjOGI5NWExIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI1MjIuOCIgY3k9IjE3MS43IiByPSI0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM4Yjk1YTEiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxjaXJjbGUgY3g9IjQ0MC4zIiBjeT0iMTA2LjAiIHI9IjQiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzhiOTVhMSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iMzk4LjgiIGN5PSIyMDAuOSIgcj0iNS41IiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS40Ii8+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxjaXJjbGUgY3g9IjUzMy4yIiBjeT0iMTUyLjAiIHI9IjUuNSIgZmlsbD0iIzFhODg3MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNCIvPjwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI0NTAuNiIgY3k9IjEzNC4yIiByPSI1LjUiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHRleHQgeD0iNDYwLjAiIHk9IjI5OC4wIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjA2NzcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXN0eWxlPSJpdGFsaWMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBwYWludC1vcmRlcj0ic3Ryb2tlIj5jb3JvdGF0ZWQgb3IgTmVvLUhvb2tlYW4gbW9kZWw8L3RleHQ+PC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDMuMCwwKSI+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iMjI2LjAiIHkxPSIzMzAuMCIgeDI9IjI0Ni4wIiB5Mj0iMzMwLjAiIHN0cm9rZT0iI2VhOGEwYyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxwb2x5Z29uIHBvaW50cz0iMjUyLjAsMzMwLjAgMjQ1LjAsMzMzLjEgMjQ1LjAsMzI2LjkiIGZpbGw9IiNlYThhMGMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48dGV4dCB4PSIyNjAuMCIgeT0iMzM0LjUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2MDY3NzAiIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBhaW50LW9yZGVyPSJzdHJva2UiPmNvbnN0cmFpbnQgcHVsbCB0b3dhcmQgdGhlIHJlc3Qgc2hhcGU8L3RleHQ+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjUzNy42IiB5MT0iMzMwLjAiIHgyPSI1NjMuNiIgeTI9IjMzMC4wIiBzdHJva2U9IiM4Yjk1YTEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjQgMyIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjx0ZXh0IHg9IjU3MS42IiB5PSIzMzQuNSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzYwNjc3MCIgdGV4dC1hbmNob3I9InN0YXJ0IiBmb250LXdlaWdodD0ibm9ybWFsIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+cmVzdCBjb25maWd1cmF0aW9uPC90ZXh0PjwvZz4KICA8L2c+Cjwvc3ZnPgo=)

An edge is a spring-damper pulling its two particles back toward its rest length. A cell is either a volume constraint
keeping its area or its volume, the shape itself being held by the edges, or an elastic element resisting any
deformation. This is selected by the **cell model** of the body
(`setCellModel`):

* `Volume`: one constraint per cell keeping its area (2D) or its volume (3D) at its rest value. This is the cheapest
  model, and combined with the edges it is often enough to obtain a convincing jelly.
* `Corotational`: linear elasticity expressed in the rotation-free frame of the cell. It is stable at any stiffness and
  recovers from inverted cells.
* `NeoHookean`: stable Neo-Hookean hyperelasticity. It feels stiffer than linear elasticity on compression, but softer on
  tension.

The stiffness of every element is configured by the `SoftBodyMaterial` of the body, which can be given to the builder or
set at any time with `SoftBody.setMaterial`. The edges and the volume constraints are given a softness, i.e., a
natural frequency (in Hz) and a damping ratio instead of a stiffness, so it doesn't depend on the masses of the
particles:

* The **edge softness** (`edgeSoftness`) for the structural edges;
* The **bend softness** (`bendSoftness`) for the bending edges and the
  dihedral constraints;
* The **volume softness** (`volumeSoftness`) for the volume constraints.

The elastic cells are given a Young modulus (`youngModulus`, in force per unit
area in 3D, per unit length in 2D), a Poisson ratio (`poissonRatio`), and a
damping ratio (`elasticDampingRatio`) instead. Their natural frequency
is derived from these, therefore a body meshed more finely doesn't become stiffer, whereas it becomes more expensive to
simulate.

Finally, a body with a closed surface can preserve the area (2D) or the volume (3D) it encloses
(`setVolumePreservation`), which target can be scaled by a
`setVolumeFactor`
greater than 1 in order to inflate the body, e.g., to simulate a pressurized blob:

* Example 2D
* Example 3D

```js
// Elastic cells: a jelly square with corotational linear elasticity.
let material = new RAPIER.SoftBodyMaterial();
// Stiffness of the elastic cells.
material.youngModulus = 3.0e3;
material.poissonRatio = 0.35;
material.elasticDampingRatio = 0.5;
// Plasticity: the rest shape flows past 5% strain, at 20 per second.
material.plasticYield = 0.05;
material.plasticCreep = 20.0;
// Tearing: an element past 40% strain tears.
material.tearStrain = 0.4;
let jellyDesc = RAPIER.SoftBodyDesc.grid({ x: 3.0, y: 1.2 }, { x: 1.0, y: 1.0 }, 6, 6)
    // The constitutive model of the cells: `Volume` (per-cell area constraints,
    // the shape is held by the edges), `Corotational` or `NeoHookean`.
    .setCellModel(RAPIER.SoftBodyCellModel.Corotational)
    .setMaterial(material)
    .setParticleMass(0.2);
let jelly = world.createSoftBody(jellyDesc);

// A pressurized blob: a ring of particles inflated by area preservation.
let blobDesc = RAPIER.SoftBodyDesc.disk({ x: 0.0, y: 3.0 }, 0.8, 24)
    .setSoftness(20.0, 1.0)
    // Target area multiplier (`> 1` inflates the body); enables area preservation.
    .setVolumeFactor(1.1)
    .setSelfContacts(true);
let blob = world.createSoftBody(blobDesc);
```

```js
// Elastic cells: a jelly cube with corotational linear elasticity.
let material = new RAPIER.SoftBodyMaterial();
// Stiffness of the elastic cells.
material.youngModulus = 2.0e3;
material.poissonRatio = 0.35;
material.elasticDampingRatio = 0.5;
// Plasticity: the rest shape flows past 5% strain, at 20 per second.
material.plasticYield = 0.05;
material.plasticCreep = 20.0;
// Tearing: an element past 40% strain tears.
material.tearStrain = 0.4;
let jellyDesc = RAPIER.SoftBodyDesc.cuboid({ x: 3.0, y: 1.0, z: 0.0 }, { x: 0.5, y: 0.5, z: 0.5 }, 4, 4, 4)
    // The constitutive model of the cells: `Volume` (per-cell volume constraints,
    // the shape is held by the edges), `Corotational` or `NeoHookean`.
    .setCellModel(RAPIER.SoftBodyCellModel.Corotational)
    .setMaterial(material)
    .setParticleMass(0.2);
let jelly = world.createSoftBody(jellyDesc);

// A material shared by the edges, bending constraints and volume constraints.
let clothMaterial = RAPIER.SoftBodyMaterial.uniform(30.0, 1.0);
// Softness of the bending constraints, on top of the uniform 30 Hz softness.
clothMaterial.bendSoftness = { naturalFrequency: 3.0, dampingRatio: 1.0 };
cloth.setMaterial(clothMaterial);
```

info

The stiffness effectively simulated by the constraints solver depends on its convergence: with too few iterations, a stiff
body looks softer than its material says. This is why soft-bodies are configured with 3 additional internal PGS solver iterations by default, which can
be modified with
`setAdditionalPgsIterations`. The whole island a body belongs to
can also be given additional substeps with
`setAdditionalSolverIterations`, just like
[rigid-bodies](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#solver-settings).

![The same chain solved with 1, 4, and 32 iterations](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgMzE2IiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMxNiIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgcm9sZT0iaW1nIj4KICA8dGl0bGU+U3RpZmZuZXNzIHZzLiBpdGVyYXRpb24gY291bnQ8L3RpdGxlPgogIDxkZXNjPlRoZSBzYW1lIGhlYXZ5IGNoYWluIHNvbHZlZCB3aXRoIDEsIDQgYW5kIDMyIGl0ZXJhdGlvbnM7IHdpdGggZmV3IGl0ZXJhdGlvbnMsIHRoZSBjb25zdHJhaW50cyBkbyBub3QgY29udmVyZ2UgYW5kIHRoZSBjaGFpbiBsb29rcyBzb2Z0ZXIuPC9kZXNjPgogIDxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMzE5IiBoZWlnaHQ9IjMxNSIgcng9IjEyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlMWU0ZTgiLz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjAwLDApIj4KICAgIDx0ZXh0IHg9Ijc2MC4wIiB5PSIzOC4wIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWMxZTIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+U3RpZmZuZXNzIHZzLiBpdGVyYXRpb24gY291bnQ8L3RleHQ+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNjUwLjAiIHkxPSI4OC4wIiB4Mj0iODcwLjAiIHkyPSI4OC4wIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjY1MC4wIiB5MT0iODguMCIgeDI9IjY0My4wIiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjY3Ny41IiB5MT0iODguMCIgeDI9IjY3MC41IiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjcwNS4wIiB5MT0iODguMCIgeDI9IjY5OC4wIiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjczMi41IiB5MT0iODguMCIgeDI9IjcyNS41IiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iODguMCIgeDI9Ijc1My4wIiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc4Ny41IiB5MT0iODguMCIgeDI9Ijc4MC41IiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjgxNS4wIiB5MT0iODguMCIgeDI9IjgwOC4wIiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0Mi41IiB5MT0iODguMCIgeDI9IjgzNS41IiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg3MC4wIiB5MT0iODguMCIgeDI9Ijg2My4wIiB5Mj0iODAuMCIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9IjY1MC4wIiB5MT0iMjIwLjAiIHgyPSI4NzAuMCIgeTI9IjIyMC4wIiBzdHJva2U9IiM4Yjk1YTEiIHN0cm9rZS13aWR0aD0iMS4zIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjQgMyIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjx0ZXh0IHg9Ijg3Mi4wIiB5PSIyMjQuMCIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzYwNjc3MCIgdGV4dC1hbmNob3I9InN0YXJ0IiBmb250LXdlaWdodD0ibm9ybWFsIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+cmVzdDwvdGV4dD48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48bGluZSB4MT0iNjgwLjAiIHkxPSI4OC4wIiB4Mj0iNjgwLjAiIHkyPSIxMTguNSIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2ODAuMCIgeTE9IjExOC41IiB4Mj0iNjgwLjAiIHkyPSIxNDguOCIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2ODAuMCIgeTE9IjE0OC44IiB4Mj0iNjgwLjAiIHkyPSIxNzguOCIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2ODAuMCIgeTE9IjE3OC44IiB4Mj0iNjgwLjAiIHkyPSIyMDguNSIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2ODAuMCIgeTE9IjIwOC41IiB4Mj0iNjgwLjAiIHkyPSIyMzguMCIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI2ODAuMCIgeTE9IjIzOC4wIiB4Mj0iNjgwLjAiIHkyPSIyNjAuMCIgc3Ryb2tlPSIjMWE4ODcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxjaXJjbGUgY3g9IjY4MC4wIiBjeT0iODguMCIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjgwLjAiIGN5PSIxMTguNSIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjgwLjAiIGN5PSIxNDguOCIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjgwLjAiIGN5PSIxNzguOCIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjgwLjAiIGN5PSIyMDguNSIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNjgwLjAiIGN5PSIyMzguMCIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHJlY3QgeD0iNjY3LjAiIHk9IjI2MC4wIiB3aWR0aD0iMjYuMCIgaGVpZ2h0PSIyMC4wIiByeD0iMiIgZmlsbD0iI2U0ZTdlYiIgc3Ryb2tlPSIjNGI1NTYzIiBzdHJva2Utd2lkdGg9IjEuOCIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxjaXJjbGUgY3g9IjY4MC4wIiBjeT0iMjYwLjAiIHI9IjQuMiIgZmlsbD0iIzFhODg3MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuMSIvPjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjx0ZXh0IHg9IjY4MC4wIiB5PSIyOTguMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzFjMWUyMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9IjYwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBhaW50LW9yZGVyPSJzdHJva2UiPjEgaXRlcmF0aW9uPC90ZXh0PjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI3NjAuMCIgeTE9Ijg4LjAiIHgyPSI3NjAuMCIgeTI9IjExMi4xIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iMTEyLjEiIHgyPSI3NjAuMCIgeTI9IjEzNi4xIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iMTM2LjEiIHgyPSI3NjAuMCIgeTI9IjE2MC4xIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iMTYwLjEiIHgyPSI3NjAuMCIgeTI9IjE4NC4wIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iMTg0LjAiIHgyPSI3NjAuMCIgeTI9IjIwNy45IiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijc2MC4wIiB5MT0iMjA3LjkiIHgyPSI3NjAuMCIgeTI9IjIyOS45IiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNzYwLjAiIGN5PSI4OC4wIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI3NjAuMCIgY3k9IjExMi4xIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI3NjAuMCIgY3k9IjEzNi4xIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI3NjAuMCIgY3k9IjE2MC4xIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI3NjAuMCIgY3k9IjE4NC4wIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI3NjAuMCIgY3k9IjIwNy45IiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48cmVjdCB4PSI3NDcuMCIgeT0iMjI5LjkiIHdpZHRoPSIyNi4wIiBoZWlnaHQ9IjIwLjAiIHJ4PSIyIiBmaWxsPSIjZTRlN2ViIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMS44Ii8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iNzYwLjAiIGN5PSIyMjkuOSIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHRleHQgeD0iNzYwLjAiIHk9IjI5OC4wIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMWMxZTIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+NCBpdGVyYXRpb25zPC90ZXh0PjwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTYuMSkiPjxsaW5lIHgxPSI4NDAuMCIgeTE9Ijg4LjAiIHgyPSI4NDAuMCIgeTI9IjExMC4yIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0MC4wIiB5MT0iMTEwLjIiIHgyPSI4NDAuMCIgeTI9IjEzMi41IiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0MC4wIiB5MT0iMTMyLjUiIHgyPSI4NDAuMCIgeTI9IjE1NC43IiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0MC4wIiB5MT0iMTU0LjciIHgyPSI4NDAuMCIgeTI9IjE3Ni45IiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0MC4wIiB5MT0iMTc2LjkiIHgyPSI4NDAuMCIgeTI9IjE5OS4xIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGxpbmUgeDE9Ijg0MC4wIiB5MT0iMTk5LjEiIHgyPSI4NDAuMCIgeTI9IjIyMS4xIiBzdHJva2U9IiMxYTg4NzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iODQwLjAiIGN5PSI4OC4wIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI4NDAuMCIgY3k9IjExMC4yIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI4NDAuMCIgY3k9IjEzMi41IiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI4NDAuMCIgY3k9IjE1NC43IiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI4NDAuMCIgY3k9IjE3Ni45IiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48Y2lyY2xlIGN4PSI4NDAuMCIgY3k9IjE5OS4xIiByPSI0LjIiIGZpbGw9IiMxYTg4NzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjEiLz48L2c+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC02LjEpIj48cmVjdCB4PSI4MjcuMCIgeT0iMjIxLjEiIHdpZHRoPSIyNi4wIiBoZWlnaHQ9IjIwLjAiIHJ4PSIyIiBmaWxsPSIjZTRlN2ViIiBzdHJva2U9IiM0YjU1NjMiIHN0cm9rZS13aWR0aD0iMS44Ii8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PGNpcmNsZSBjeD0iODQwLjAiIGN5PSIyMjEuMSIgcj0iNC4yIiBmaWxsPSIjMWE4ODcwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4xIi8+PC9nPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNi4xKSI+PHRleHQgeD0iODQwLjAiIHk9IjI5OC4wIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMWMxZTIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcGFpbnQtb3JkZXI9InN0cm9rZSI+MzIgaXRlcmF0aW9uczwvdGV4dD48L2c+CiAgPC9nPgo8L3N2Zz4K)

The following table gathers the settings to look at for the most common problems:

| Problem | What to change |
| --- | --- |
| The body is too soft, or stretches too much. | Raise the natural frequency of the material's `edgeSoftness`, or its `youngModulus` for the elastic cells. Give it more `setAdditionalPgsIterations`, or switch it to the FEM solver with `setSolver`. |
| A cloth stretches, but should still fold easily. | Keep a stiff `edgeSoftness`, and give it a soft `bendSoftness`. |
| A rope compresses like a spring. | Make its edges resist stretching only with `setTensionOnly`. |
| The body keeps wobbling after an impact. | Raise the `dampingRatio` of the material's softnesses and its `elasticDampingRatio`, or its `deformationDamping` (which damps the deformations but not the motion of the body as a whole). |
| A closed body collapses, or must be inflated. | Enable `setVolumePreservation`, and give it a `setVolumeFactor` greater than 1. |
| The deformations are too local. | Combine `setShapeMatching` with edges, or rely on edges and cells alone. |

### FEM solver[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#fem-solver "Direct link to FEM solver")

The FEM solver (`SoftBodySolver.Fem`) resolves the elasticity of the whole body at once and semi-implicitly:
the forces and the stiffness of every cell are assembled into a single linear system, solved at each substep. Therefore
the stiffness of the body no longer depends on the number of solver iterations, which makes it capable of simulating
very stiff materials, as well as more realistic plastic deformations and failures:

![Assembly of the FEM system](https://rapier.rs:443/assets/images/fem_system-eec154c8bbe7d8bed72a48e04d49ddb3.svg)

This comes at a price: the system is factorized at each timestep, and every constraint touching the body (contacts,
joints) needs a solve against it. Note that the FEM solver requires cells, so it only applies to the bodies built with
cells, e.g., with the `grid`, `cuboid`, or `volumetric` constructors. The configuration of its linear solves is shared
by every body using it, and lives in the [integration parameters](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters#soft_bodies):

* Example 2D
* Example 3D

```js
// A stiff beam simulated by the FEM solver: its stiffness doesn't depend on the number of
// solver iterations.
let beamMaterial = new RAPIER.SoftBodyMaterial();
beamMaterial.youngModulus = 1.0e5;
beamMaterial.poissonRatio = 0.3;
let beamDesc = RAPIER.SoftBodyDesc.grid({ x: 0.0, y: 2.0 }, { x: 1.0, y: 0.1 }, 21, 3)
    .setSolver(RAPIER.SoftBodySolver.Fem)
    .setCellModel(RAPIER.SoftBodyCellModel.NeoHookean)
    .setMaterial(beamMaterial)
    // The particles of the side at `x = -1` are the first 3 ones.
    .setPinnedParticles(new Uint32Array([0, 1, 2]));
let beam = world.createSoftBody(beamDesc);

// The tuning of the linear solves of the FEM solver, shared by every body using it.
world.integrationParameters.softBodiesFemLinearTolerance = 1.0e-5;
world.integrationParameters.softBodiesFemMaxLinearIterations = 20;
```

```js
// A stiff beam simulated by the FEM solver: its stiffness doesn't depend on the number of
// solver iterations.
let beamMaterial = new RAPIER.SoftBodyMaterial();
beamMaterial.youngModulus = 1.0e5;
beamMaterial.poissonRatio = 0.3;
let beamDesc = RAPIER.SoftBodyDesc.cuboid(
    { x: 0.0, y: 2.0, z: -3.0 }, { x: 1.0, y: 0.1, z: 0.1 }, 11, 3, 3,
)
    .setSolver(RAPIER.SoftBodySolver.Fem)
    .setCellModel(RAPIER.SoftBodyCellModel.NeoHookean)
    .setMaterial(beamMaterial)
    // The particles of the face at `x = -1` are the first 3 Ã 3 ones.
    .setPinnedParticles(new Uint32Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));
let beam = world.createSoftBody(beamDesc);

// The tuning of the linear solves of the FEM solver, shared by every body using it.
world.integrationParameters.softBodiesFemLinearTolerance = 1.0e-5;
world.integrationParameters.softBodiesFemMaxLinearIterations = 20;
```

The linear solves stop at the relative residual
`softBodiesFemLinearTolerance`, or after
`softBodiesFemMaxLinearIterations` conjugate-gradient iterations,
whatever the residual. The bodies with at most
`softBodiesFemMaxDenseDofs` degrees of freedom (`600` by default) are
factorized directly, whereas the larger ones rely on the iterative conjugate gradient.

tip

Use the FEM solver for stiff materials which simulated stiffness must not depend on the iteration count, e.g., the
chassis of a car or a metal beam. This also results in more realistic plasticity and tearing.

## Contacts and self-intersections[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#contacts-and-self-intersections "Direct link to Contacts and self-intersections")

A soft-body collides through the collider covering its surface, which is a deformable triangle-mesh (a polyline in 2D)
built from the template given to the [builder](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#creation-and-insertion).

### Thickness[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#thickness "Direct link to Thickness")

The radius of the particles
(`setParticleRadius`) is
the thickness of the soft-body wrt. collision-detection: it is the contact skin of its surface collider, i.e., the
distance kept between the surface and the objects touching it, as well as the distance the solver bounds the motion of
one particle by at each substep. A radius that is too small relative to the distance between two neighboring particles
may let thin objects pass through the surface, whereas a radius larger than that distance will make the body collide
with itself even when it is at rest. Therefore it is recommended to keep it well below the distance between two
neighboring particles. Note that every constructor picks a sensible default, i.e., about half the length of its edges
or of its cells.

### Oriented surfaces and shells[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#oriented-surfaces-and-shells "Direct link to Oriented surfaces and shells")

A closed surface (a balloon, a jelly cube, a filled polygon) is **oriented**: its contacts are generated on its outward
side only, like for an [oriented triangle-mesh](https://rapier.rs:443/docs/user_guides/javascript/colliders#triangle-meshes-and-polylines), so nothing is held
inside it. An open surface (a rope, a cloth) is two-sided, because a body arriving from either side must be stopped.
This is what the builder does by default, and it is what a solid body wants. A **shell**, i.e., a closed surface which
inner side must hold the bodies contained in it, is obtained by asking for a surface that is not oriented
(`setOriented`):

* Example 2D
* Example 3D

```js
// A shell: a closed surface that is not oriented, so its inner side holds the bodies put
// inside it (a bowl, a box, a container). A closed surface is oriented by default.
let bowlDesc = RAPIER.SoftBodyDesc.disk({ x: -3.0, y: 2.0 }, 0.8, 24)
    .setOriented(false)
    .setSoftness(60.0, 1.0);
let bowl = world.createSoftBody(bowlDesc);
```

```js
// A shell: a closed surface that is not oriented, so its inner side holds the bodies put
// inside it (a bowl, a box, a container). A closed surface is oriented by default.
let bowlDesc = RAPIER.SoftBodyDesc.sphere({ x: -3.0, y: 2.0, z: 0.0 }, 0.8, 2)
    .setOriented(false)
    .setSoftness(60.0, 1.0);
let bowl = world.createSoftBody(bowlDesc);
```

note

After the insertion, the shape of the `Collider` is
the authority: the flag is changed there, like for any other collider.

### Self-contacts[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#self-contacts "Direct link to Self-contacts")

A soft-body doesn't collide with itself by default. Self-contacts are enabled by
`SoftBodyDesc.setSelfContacts`,
which makes the vertices and the edges of the surface collide with the surface of their own body: this is what keeps
a cloth folding onto itself, or a jelly squashed against itself, from passing through itself. Note that they are more
expensive, since the whole surface must be tested against itself.

### Penetrations and tangles[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#penetrations-and-tangles "Direct link to Penetrations and tangles")

The contacts between two meshes are computed triangle by triangle (segment by segment in 2D), without any notion of
their interiors. As long as the two surfaces don't penetrate, this works well. But as soon as they do, some of these
local contacts start pointing the wrong way, and actively keep the two surfaces in their penetrating state instead of
separating them. Deformations make it worse, since a single surface can also cross itself and end up tangled:

![Local contacts between penetrating meshes](https://rapier.rs:443/assets/images/mesh_penetration-84fca47890cf1c7f43a0623070df8562.svg)

Rapier handles these configurations by measuring the volume of the overlap between the two surfaces. The gradient of
that volume gives a good approximation of the direction separating the two bodies, aka. the **volume normal**, which is
used both to push the overlapping regions apart, and to correct the direction of the local contacts inside them:

![Contact directions corrected with the volume normal](https://rapier.rs:443/assets/images/volume_normal_contacts-d64c1b30bfe50ce7e37bac89edb205e0.svg)

This is enabled by default for the closed surfaces, against other soft-bodies as well as against rigid colliders.

It is configured, along with the detection and the recovery of the tangled configurations, by the recovery settings of
the [global settings](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#global-settings)
(`IntegrationParameters.softBodiesRecovery`).
Every mechanism can be switched off individually, and the table below lists the ones to look at for the most common
problems:

| Problem | What to change |
| --- | --- |
| Thin or fast objects pass through a surface. | Raise the particle radius (`setParticleRadius`). Let the body request more substeps while it is hit fast (`softBodiesMaxExtraSubsteps`). |
| Two bodies crossing corner-first don't collide. | Enable `edgeSpeculation` (note that it can leave pressed 3D piles crossed). |
| A body stays tangled with itself. | Keep `selfStandDown` enabled (the default), which lets the elasticity untangle it, or push the crossed features apart with `crossingRepulsion`. |
| The recovery from a penetration is too slow, or too violent. | Change the `recoveryPace`, i.e., the corrective speed allowed to the recovery (in length units per second). |
| Soft contacts feel too spongy. | Raise the `softBodiesContactStiffening` of the soft-body contacts relative to the rigid ones. |
| The overlap of two bodies isn't resolved at all. | Make sure both surfaces are closed: the intersection-volume constraints (`overlapConstraints`) only apply to them. |

## Soft frames: joints and rigid colliders[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#soft-frames-joints-and-rigid-colliders "Direct link to Soft frames: joints and rigid colliders")

Joints and rigid colliders both need a frame to be attached to, i.e., a translation and a rotation, which a soft-body
doesn't have. This is what **soft frames** are for: a soft frame is a rigid-body of type
`RigidBodyType.SoftFrame` which pose is computed at each timestep
from a set of particles, by shape-matching. Since it is an ordinary rigid-body, every API working with rigid-bodies
works with it too: [impulse joints](https://rapier.rs:443/docs/user_guides/javascript/joints) of any kind (fixed, revolute, prismatic, generic, etc.) can be
attached to it, as well as rigid colliders (sensors included), and its position can be read at any time. Therefore a
soft-body is linked to another soft-body, to a rigid-body, or to a [multibody](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints#multibodies)
exactly the same way two rigid-bodies are.

### The root body[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#the-root-body "Direct link to The root body")

Every soft-body is created with one soft frame covering all of its particles: its **root body**. It is the rigid-body
given by `SoftBody.rootBody`. A
joint attached to it acts on the soft-body as a whole, and so does a force or an impulse applied to it. It also stands
for the soft-body in the islands, and it is the parent of the colliders the engine built for the body's surface (a
deformable collider bound to another [cluster](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#clusters) has the proxy of that cluster as its parent
instead). The soft-body a collider belongs to is given by `Collider.softBody`, which is how a collider reported by a
[scene query](https://rapier.rs:443/docs/user_guides/javascript/scene_queries) or by a [collision
event](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#collision-and-contact-force-events) is traced back to the body it
covers.

* Example 2D
* Example 3D

```js
// The rigid body the engine created for the whole soft body, read back after its insertion.
let rootBody = jelly.rootBody();
console.log("root body is a soft frame:", rootBody.isSoftFrame());

// A rigid collider attached to it follows the frame of the whole body: here a sensor
// detecting what comes close to the jelly.
world.createCollider(RAPIER.ColliderDesc.ball(1.6).setSensor(true), rootBody);

// A joint attached to it acts on the soft body as a whole: this one hangs the jelly under a
// fixed anchor by a spring.
let jellyAnchor = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(3.0, 5.0));
let jellySpring = RAPIER.JointData.spring(2.0, 60.0, 2.0, { x: 0.0, y: 0.0 }, { x: 0.0, y: 0.0 });
world.createImpulseJoint(jellySpring, jellyAnchor, rootBody, true);
```

```js
// The rigid body the engine created for the whole soft body, read back after its insertion.
let rootBody = jelly.rootBody();
console.log("root body is a soft frame:", rootBody.isSoftFrame());

// A rigid collider attached to it follows the frame of the whole body: here a sensor
// detecting what comes close to the jelly.
world.createCollider(RAPIER.ColliderDesc.ball(1.0).setSensor(true), rootBody);

// A joint attached to it acts on the soft body as a whole: this one hangs the jelly under a
// fixed anchor by a spring.
let jellyAnchor = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(3.0, 4.0, 0.0));
let jellySpring = RAPIER.JointData.spring(
    2.5, 60.0, 2.0,
    { x: 0.0, y: 0.0, z: 0.0 }, { x: 0.0, y: 0.0, z: 0.0 },
);
world.createImpulseJoint(jellySpring, jellyAnchor, rootBody, true);
```

warning

The pose of the root body is recomputed from the particles at each timestep, therefore moving it has no effect.
Removing it is not a no-op though: like any cluster proxy, it takes its cluster with it, i.e., the whole soft-body,
unless another cluster covers some of its particles (see [removal](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#removal)).

### Clusters[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#clusters "Direct link to Clusters")

A single frame for the whole body is often not expressive enough: several joints attached to the root body all act on
the body as a whole, and their effect isn't concentrated where they are attached. This is why a soft-body can also be
given **clusters** (`World.addSoftBodyCluster`), i.e.,
soft frames over any subset of its particles, each with its own pose computed by shape-matching over that subset only.
Joints attached to different clusters then act on different parts of the body, each with its own orientation:

![One soft frame per cluster](https://rapier.rs:443/assets/images/multi_clusters-fa629042885822a398d43864447f3cca.svg)

Similarly, rigid colliders attached to the proxies of different clusters move and rotate independently, which is what
allows the definition of rigid parts on a deformable body: the handle of a deformable hammer, the bones of a soft
character, or the plate a jelly is carried on.

![Rigid colliders attached to different soft frames](https://rapier.rs:443/assets/images/multi_colliders-f4c175e899ca646f98a569c274cb3d4e.svg)

* Example 2D
* Example 3D

```js
// A cluster over the top particles of the jelly: a rigid proxy that joints and
// colliders can attach to.
let top = [];
for (let i = 0; i < jelly.numParticles(); ++i) {
    if (jelly.particlePosition(i).y > 2.0) {
        top.push(i);
    }
}
let cluster = world.addSoftBodyCluster(jelly, top);
let proxy = jelly.clusterProxy(cluster);
// A rigid plate welded onto the cluster.
let plate = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(3.0, 2.4));
world.createCollider(RAPIER.ColliderDesc.cuboid(1.2, 0.05).setDensity(0.4), plate);
let weld = RAPIER.JointData.fixed({ x: 0.0, y: -0.1 }, 0.0, { x: 0.0, y: 0.0 }, 0.0);
world.createImpulseJoint(weld, plate, proxy, true);
// A cluster can be pinned, driven or tuned as a whole.
jelly.setClusterStiffnessScale(cluster, 2.0);
jelly.enableClusterShapeMatching(cluster, true);
```

```js
// A cluster over the top particles of the jelly: a rigid proxy that joints and
// colliders can attach to.
let top = [];
for (let i = 0; i < jelly.numParticles(); ++i) {
    if (jelly.particlePosition(i).y > 1.3) {
        top.push(i);
    }
}
let cluster = world.addSoftBodyCluster(jelly, top);
let proxy = jelly.clusterProxy(cluster);
// A rigid plate welded onto the cluster.
let plate = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(3.0, 1.9, 0.0));
world.createCollider(RAPIER.ColliderDesc.cuboid(0.7, 0.05, 0.7).setDensity(0.4), plate);
let weld = RAPIER.JointData.fixed(
    { x: 0.0, y: -0.1, z: 0.0 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
    { x: 0.0, y: 0.0, z: 0.0 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
);
world.createImpulseJoint(weld, plate, proxy, true);
// A cluster can be pinned, driven or tuned as a whole.
jelly.setClusterStiffnessScale(cluster, 2.0);
jelly.enableClusterShapeMatching(cluster, true);
```

A cluster also defines a few settings for the elements it covers, which gives regional materials without needing
separate bodies:

* The **stiffness scale**
  (`setClusterStiffnessScale`)
  multiplies the Young modulus of every cell entirely contained in the cluster (the cells straddling its boundary are
  left unchanged).
* The **edge softness**
  (`setClusterEdgeSoftness`)
  overrides the softness of every edge entirely contained in the cluster, e.g., a stiffer collar on a shirt.
* The **tear resistance**
  (`setClusterTearResistance`)
  multiplies the tear thresholds of every element entirely contained in the cluster, e.g., a tough region, or a
  perforation line.
* **Shape-matching** (`enableClusterShapeMatching`) pulls the particles of the cluster toward the frame of its
  proxy, so that part of the body tends to keep the shape it was
  created with.

warning

The rotation of a cluster is deduced from its particles, which isn't possible for a cluster made of a single particle
(or, in 3D, of collinear particles). Such a cluster has no angular response, therefore the angular parts of the joints
attached to its proxy are disabled.

### Attaching a rigid-body to a particle[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#attaching-a-rigid-body-to-a-particle "Direct link to Attaching a rigid-body to a particle")

A particle can also be attached directly to a rigid-body (`SoftBody.attachParticle`), which is
the simplest way of combining the two kinds of bodies: a rope tied to a swinging ball, a flag attached to its pole,
etc. Unlike pinning, an attachment is a two-way point-to-point constraint: the rigid-body holds the particle, and the
particle pulls the rigid-body back. The anchor is the position the particle has when the attachment is created,
expressed in the local frame of the rigid-body. Note that a particle attached twice keeps both of its attachments, and
that an attachment is undone with
`SoftBody.detachParticle`:

* Example 2D
* Example 3D

```js
// Attach the last particle of a rope to a rigid box, at the particle's position.
let ropeDesc = RAPIER.SoftBodyDesc.rope({ x: 8.0, y: 9.0 }, { x: 12.0, y: 9.0 }, 25)
    .setPinnedParticles([0])
    .setSoftness(40.0, 1.0);
let rope = world.createSoftBody(ropeDesc);
let last = rope.particlePosition(24);
let weight = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(last.x, last.y - 0.4));
world.createCollider(RAPIER.ColliderDesc.cuboid(0.3, 0.3).setDensity(2.0), weight);
rope.attachParticle(24, weight);
```

```js
// Attach the last particle of a rope to a rigid ball, at the particle's position.
let ropeDesc = RAPIER.SoftBodyDesc.rope({ x: -0.5, y: 5.0, z: 3.0 }, { x: 2.5, y: 5.0, z: 3.0 }, 30)
    .setPinnedParticles([0])
    .setSoftness(40.0, 1.0);
let rope = world.createSoftBody(ropeDesc);
let last = rope.particlePosition(29);
let ball = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(last.x, last.y - 0.3, last.z));
world.createCollider(RAPIER.ColliderDesc.ball(0.25).setDensity(2.0), ball);
rope.attachParticle(29, ball);
```

## Particles and kinematic control[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#particles-and-kinematic-control "Direct link to Particles and kinematic control")

The state of a soft-body is the state of its particles, which are identified by their index in the body. Their positions
and their velocities can be read (`particlePosition`, `particlePositions`, `particleVelocity`,
`particleVelocities`) and modified (`setParticlePosition`, `setParticleVelocity`) at any time, one by one or all at
once. The elements built from them (`edges`, `cells`, and
`boundary`) can be read as well, e.g., in order to render the body with your own mesh.

A particle can also be **pinned** (`setParticlePinned`). A pinned particle is kinematic: it is no longer affected by the forces
nor by the contacts, and it will simply hold its position, or follow the kinematic target
(`setParticleKinematicTarget`) or the velocity it is given. This is, e.g., how a piece of cloth
is hung on a wall, or how a rope is dragged by the player. Releasing the particle gives it back its nominal mass and
lets it keep its current velocity:

* Example 2D
* Example 3D

```js
// Read the particles.
let position = sheet.particlePosition(0);
let velocity = sheet.particleVelocity(0);
let positions: Float32Array = sheet.particlePositions(); // Two floats per particle.
console.log("The sheet has", sheet.numParticles(), "particles;", positions.length / 2);
// Move a particle.
sheet.setParticlePosition(1, { x: position.x, y: position.y + 0.1 });
sheet.setParticleVelocity(1, velocity);
// Pin (or release) a particle; a pinned particle can be driven like a kinematic body.
sheet.setParticlePinned(2, true);
sheet.setParticleKinematicTarget(2, { x: -3.5, y: 3.5 });
// The elements: edges (two indices each), cells (three) and the boundary segments (two).
let edges: Uint32Array = sheet.edges();
let cells: Uint32Array = sheet.cells();
let boundary: Uint32Array = sheet.boundary();
console.log(edges.length / 2, "edges,", cells.length / 3, "cells,", boundary.length / 2, "segments");
```

```js
// Read the particles.
let position = cloth.particlePosition(0);
let velocity = cloth.particleVelocity(0);
let positions: Float32Array = cloth.particlePositions(); // Three floats per particle.
console.log("The cloth has", cloth.numParticles(), "particles;", positions.length / 3);
// Move a particle.
cloth.setParticlePosition(1, { x: position.x, y: position.y + 0.1, z: position.z });
cloth.setParticleVelocity(1, velocity);
// Pin (or release) a particle; a pinned particle can be driven like a kinematic body.
cloth.setParticlePinned(2, true);
cloth.setParticleKinematicTarget(2, { x: -1.0, y: 2.5, z: -0.8 });
// The elements: edges (two indices each), cells (four) and the boundary triangles (three).
let edges: Uint32Array = cloth.edges();
let cells: Uint32Array = cloth.cells();
let boundary: Uint32Array = cloth.boundary();
console.log(edges.length / 2, "edges,", cells.length / 4, "cells,", boundary.length / 3, "triangles");
```

warning

Setting the position of a particle explicitly teleports it: no contact is taken into account along the way, so a
particle can be moved inside of another object this way. Whenever the motion must be seen by the contacts and by the
friction (to drag a piece of cloth, for example), it is recommended to pin the particle and to give it a kinematic
target instead.

### Controlling a region kinematically[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#controlling-a-region-kinematically "Direct link to Controlling a region kinematically")

A whole region of the body is controlled at once through a [cluster](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#clusters) covering it. Pinning
the cluster (`setClusterPinned`) pins all of its particles, and its kinematic target
(`setClusterKinematicTarget`) moves them
rigidly: each pinned particle is sent where the rest shape of the cluster places it at the target pose, with the
matching velocity. The rest of the body is then simulated as usual, and drags behind the controlled region, e.g., the
hand of a soft character carrying something:

* Example 2D
* Example 3D

```js
// Pin every particle of the cluster, then move it along a path: the cluster behaves like a
// kinematic rigid part dragging the rest of the body.
jelly.setClusterPinned(cluster, true);
jelly.setClusterKinematicTarget(cluster, { x: 3.0, y: 2.5 }, 0.0);
// Release it: the cluster is simulated again.
jelly.setClusterPinned(cluster, false);
```

```js
// Pin every particle of the cluster, then move it along a path: the cluster behaves like a
// kinematic rigid part dragging the rest of the body.
jelly.setClusterPinned(cluster, true);
jelly.setClusterKinematicTarget(cluster, { x: 3.0, y: 2.0, z: 0.0 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 });
// Release it: the cluster is simulated again.
jelly.setClusterPinned(cluster, false);
```

## Deformable colliders and skinning[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#deformable-colliders-and-skinning "Direct link to Deformable colliders and skinning")

Games don't need the simulated shape of a body to be as detailed as its visual shape: a coarse and well-shaped lattice
is faster and more stable to simulate than one cell per visual triangle. This is why Rapier supports **cage simulation**
and **skinning**. The detailed mesh is embedded in a coarse volumetric lattice, aka. its **cage**, which is the only
part being simulated. The vertices of the mesh are then interpolated from the deformed cells holding them, aka.
**skinning**:

![A detailed mesh, its coarse cage, and the mesh following the deformed cage](https://rapier.rs:443/assets/images/cage_skinning-1b52251a462fd85dcbfe4fe3782040eb.svg)

### Skinned soft-bodies[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#skinned-soft-bodies "Direct link to Skinned soft-bodies")

The
`SoftBodyDesc.volumetric`
constructor computes the cage of a closed mesh automatically when its last argument is `true`, and keeps the
mesh as the **skin** of the body. That automatic cage is built for performance rather than geometric fidelity: in 3D, it
encloses the whole mesh with the tetrahedra of a lattice, without snapping them to the mesh:

![A screwdriver mesh and its automatically generated cage (blue)](https://rapier.rs:443/img/soft_bodies/soft_trimesh_cages.png)

By default, the body still collides through the boundary of its cage, which is as coarse as its cells. Its skin can
become its actual collision mesh instead with
`setSkinCollision`.

* Example 2D
* Example 3D

```js
// A detailed outline held by a coarse cage of cells (the last `true` argument): only the
// cells are simulated, and the outline (the skin) follows their deformation.
let numSegments = 48;
let circleVertices = new Float32Array(numSegments * 2);
let circleIndices = new Uint32Array(numSegments * 2);
for (let i = 0; i < numSegments; ++i) {
    let angle = (i / numSegments) * 2.0 * Math.PI;
    circleVertices.set([Math.cos(angle) * 0.5, Math.sin(angle) * 0.5], i * 2);
    circleIndices.set([i, (i + 1) % numSegments], i * 2);
}
let skinnedDesc = RAPIER.SoftBodyDesc.volumetric(circleVertices, circleIndices, 0.25, true)
    // Collide through the skin instead of the boundary of the cage.
    .setSkinCollision(true)
    .setTranslation({ x: 0.0, y: 4.0 });
let skinned = world.createSoftBody(skinnedDesc);
// The skin is the body's collision mesh: read its vertices back to render it.
let skinPositions: Float32Array = skinned.meshVertices(0);
console.log("The skin has", skinPositions.length / 2, "vertices");
```

```js
// A mesh held by a cage of cells (the last `true` argument): only the cells are simulated,
// and the mesh (the skin) follows their deformation.
let skinnedDesc = RAPIER.SoftBodyDesc.volumetric(boxVertices, boxIndices, 0.25, true)
    // Collide through the skin instead of the boundary of the cage.
    .setSkinCollision(true)
    .setTranslation({ x: 0.0, y: 4.0, z: 3.0 });
let skinned = world.createSoftBody(skinnedDesc);
// The skin is the body's collision mesh: read its vertices back to render it.
let skinPositions: Float32Array = skinned.meshVertices(0);
console.log("The skin has", skinPositions.length / 3, "vertices");
```

info

A skin doesn't need a computed cage: any mesh can be given as the skin of a body built with cells, with
`SoftBodyDesc.setSkin`. Each of its
vertices is bound to the cell closest to it, in the pose the cells are built in.

### Deformable colliders[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#deformable-colliders "Direct link to Deformable colliders")

The colliders built from the surface or the skin of a soft-body are generated by the engine itself, but it is also
possible to give a body a collider of your own which vertices follow its particles: a **deformable collider**
(`World.createDeformableCollider`). This is a polyline in
2D, or a triangle mesh in 3D, flagged as deformable, and attached to the proxy of one of the
[clusters](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#clusters) of the body (the root body, a cluster itself, can be used too). Its vertices are
given in the frame of
that proxy, and they can be read back at any time in order to render the mesh where the simulation moved
it. A deformable collider can be a sensor as well, e.g., to detect what enters a deformable volume.

How the vertices follow the particles is given by the binding
(`SoftMeshBinding`):

* `skinned`: each vertex is embedded in the cell of the cluster holding
  it, i.e., the collider is a skin of the cage.
* `direct`: the vertex `i` follows the particle given for it, which must
  belong to the cluster. Its alternative that binds every vertex to the closest particle within a given distance
  (`directByPosition`) is
  useful when the mesh is the one the particles were built from.

* Example 2D
* Example 3D

```js
// A deformable polyline bound to the blob: each vertex follows one particle (`direct`),
// or is embedded in the cell holding it (`skinned`). The polyline is given in the frame
// of the proxy it is attached to.
let root = blob.rootBody();
let origin = root.translation();
let num = blob.numParticles();
let vertices = blob.particlePositions();
for (let i = 0; i < num; ++i) {
    vertices[i * 2] -= origin.x;
    vertices[i * 2 + 1] -= origin.y;
}
let indices = new Uint32Array(num * 2);
let particles = [];
for (let i = 0; i < num; ++i) {
    indices[i * 2] = i;
    indices[i * 2 + 1] = (i + 1) % num;
    particles.push(i);
}
let outlineDesc = RAPIER.ColliderDesc.polyline(vertices, indices, RAPIER.PolylineFlags.DEFORMABLE).setSensor(true);
let outline = world.createDeformableCollider(outlineDesc, RAPIER.SoftMeshBinding.direct(particles), root);
// The polyline follows the particles: read its current vertices back.
let meshIndex = blob.meshOfCollider(outline);
let outlineVertices: Float32Array = blob.meshVertices(meshIndex);
console.log("The outline has", outlineVertices.length / 2, "vertices");
```

```js
// A deformable triangle mesh bound to the jelly: each vertex is embedded in the cell
// holding it (`skinned`), or follows one particle (`direct`). The mesh is given in the
// frame of the proxy it is attached to.
let root = jelly.rootBody();
let origin = root.translation();
let c = jelly.centerOfMass();
let r = 1.0;
let vertices = new Float32Array([
    c.x + r, c.y, c.z, c.x - r, c.y, c.z, c.x, c.y + r, c.z,
    c.x, c.y - r, c.z, c.x, c.y, c.z + r, c.x, c.y, c.z - r,
]);
for (let i = 0; i < 6; ++i) {
    vertices[i * 3] -= origin.x;
    vertices[i * 3 + 1] -= origin.y;
    vertices[i * 3 + 2] -= origin.z;
}
let indices = new Uint32Array([0, 2, 4, 2, 1, 4, 1, 3, 4, 3, 0, 4, 2, 0, 5, 1, 2, 5, 3, 1, 5, 0, 3, 5]);
let skinDesc = RAPIER.ColliderDesc.trimesh(vertices, indices, RAPIER.TriMeshFlags.DEFORMABLE).setSensor(true);
let skin = world.createDeformableCollider(skinDesc, RAPIER.SoftMeshBinding.skinned(), root);
// The mesh follows the particles: read its current vertices back.
let meshIndex = jelly.meshOfCollider(skin);
let skinVertices: Float32Array = jelly.meshVertices(meshIndex);
console.log("The skin has", skinVertices.length / 3, "vertices");
```

info

A deformable collider has no mass: its density is ignored, and it is the particles which hold the mass of the soft-body.
Note that a collider given no contact skin explicitly gets the particle radius of the soft-body as its skin, so its
thickness matches the thickness of the surface of the body.

## Plasticity and tearing[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#plasticity-and-tearing "Direct link to Plasticity and tearing")

A soft-body can deform permanently in two ways:

* **Plasticity** changes the rest shape of the body, without any change of its topology: a metal sheet folding on
  impact, a piece of clay being modeled, the chassis of a car denting.
* **Tearing** changes its topology: pieces of the body physically disconnect from each other, e.g., a piece of fabric
  torn in two, or a jelly sliced by a blade.

![Plasticity and tearing](https://rapier.rs:443/assets/images/plasticity_tearing-824043fab8af69c179ccf5b0e3abd326.svg)

Both are supported by the [constraints](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#constraints)
solver.
Note that with the constraints solver, the quality of the plastic deformations follows the convergence of the solver:
more iterations result in more convincing permanent deformations.

### Plasticity[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#plasticity "Direct link to Plasticity")

Plasticity is configured by the [material](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#constraints) of the body, separately for its cells and for
its edges:

* A cell strained past its **plastic yield**
  (`plasticYield`) absorbs the strain in excess into its
  rest shape, at the rate of its **plastic creep**
  (`plasticCreep`, per second), up to a total permanent
  deformation of its **plastic max** (`plasticMax`). This flow
  preserves the volume of the cell, and an inverted cell never flows. Note that this only applies to the elastic cells
  (the `Corotational` and `NeoHookean`
  models): the `Volume` cells never flow.
* An edge strained past its **edge plastic yield**
  (`edgePlasticYield` compared to
  `|length / rest_length - 1|`) sees its rest length flow toward its current length at the rate of its **edge plastic
  creep** (`edgePlasticCreep`), up to a total
  permanent set of its **edge plastic max**
  (`edgePlasticMax`, as a fraction of its initial
  length). Its **edge plastic flow**
  (`edgePlasticFlow`, a `SoftEdgePlasticFlow`) selects whether that happens
  when it is squeezed, when it is stretched, or both.

A plastic deformation can be undone at any time
(`SoftBody.resetPlasticity`),
the particles springing back elastically from there. Note that the tear thresholds of the edges are always measured on
their initial length, not on their plastic one:

* Example 2D
* Example 3D

```js
// The jelly has elastic (corotational) cells: the plasticity of `Volume` cells has no effect.
let plasticMaterial = jelly.material();
// Cells: the rest shape flows toward the current one past 5% strain, at a rate of 20 per
// second, up to a total permanent deformation of 50%.
plasticMaterial.plasticYield = 0.05;
plasticMaterial.plasticCreep = 20.0;
plasticMaterial.plasticMax = 0.5;
// Edges: the rest length flows past 10% strain, up to half the initial length, but only
// when squeezed (a dent stays, a stretch springs back).
plasticMaterial.edgePlasticYield = 0.1;
plasticMaterial.edgePlasticCreep = 10.0;
plasticMaterial.edgePlasticMax = 0.5;
plasticMaterial.edgePlasticFlow = RAPIER.SoftEdgePlasticFlow.Compression;
jelly.setMaterial(plasticMaterial);
// Every permanent deformation can be undone at once.
jelly.resetPlasticity();
```

```js
// The jelly has elastic (corotational) cells: the plasticity of `Volume` cells has no effect.
let plasticMaterial = jelly.material();
// Cells: the rest shape flows toward the current one past 5% strain, at a rate of 20 per
// second, up to a total permanent deformation of 50%.
plasticMaterial.plasticYield = 0.05;
plasticMaterial.plasticCreep = 20.0;
plasticMaterial.plasticMax = 0.5;
// Edges: the rest length flows past 10% strain, up to half the initial length, but only
// when squeezed (a dent stays, a stretch springs back).
plasticMaterial.edgePlasticYield = 0.1;
plasticMaterial.edgePlasticCreep = 10.0;
plasticMaterial.edgePlasticMax = 0.5;
plasticMaterial.edgePlasticFlow = RAPIER.SoftEdgePlasticFlow.Compression;
jelly.setMaterial(plasticMaterial);
// Every permanent deformation can be undone at once.
jelly.resetPlasticity();
```

### Tearing[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#tearing "Direct link to Tearing")

Tearing is configured by the material of the body as well. An element tears at the end of the timestep during which its
load goes beyond one of the two thresholds of the material:

* The **tear strain** (`tearStrain`) applies to the edges (a
  fraction of their initial rest length) and to the elastic cells (their largest tensile strain). Note that volume cells
  never tear.
* The **tear force** (`tearForce`) applies to the edges only: an
  edge tears if its force along its direction exceeds it.

The other settings of the material shape how a tear propagates:

* The **tear smoothing** (`tearSmoothing`) is the time
  constant (in seconds) over which the load of an element is smoothed before being tested, so that a single impact spike
  doesn't tear.
* The **interior strength** (`interiorStrength`)
  makes the undamaged interior elements (without any particle on the surface or on an earlier tear) that many times
  tougher, so that tears start from the surface or from an existing damage, and run inward.
* The **max tears per step** (`maxTearsPerStep`)
  bounds how many edges may tear during one step, the most loaded going first, which paces the cracks of a taut sheet
  (an edge loaded past twice its threshold always tears).
* The **min piece** (`minPiece`) is the smallest piece (in elements)
  a tear may split off, any tear leaving a smaller piece waiting until it doesn't.

Individual edges can be made tougher (or weaker, e.g., a perforation line) with their tear resistance, given to the
builder
(`setEdgeTearResistance`)
or by [cluster](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#clusters):

* Example 2D
* Example 3D

```js
let tearMaterial = sheet.material();
// An edge tears past 40% of stretch, or past a force of 50 along its direction.
tearMaterial.tearStrain = 0.4;
tearMaterial.tearForce = 50.0;
// The load is smoothed over 0.1 second, so a single impact spike doesn't tear.
tearMaterial.tearSmoothing = 0.1;
// Undamaged interior elements are twice as tough: tears start from the surface.
tearMaterial.interiorStrength = 2.0;
// A tear never splits off a piece smaller than 10 elements.
tearMaterial.minPiece = 10;
sheet.setMaterial(tearMaterial);
```

```js
let tearMaterial = cloth.material();
// An edge tears past 40% of stretch, or past a force of 50 along its direction.
tearMaterial.tearStrain = 0.4;
tearMaterial.tearForce = 50.0;
// The load is smoothed over 0.1 second, so a single impact spike doesn't tear.
tearMaterial.tearSmoothing = 0.1;
// Undamaged interior elements are twice as tough: tears start from the surface.
tearMaterial.interiorStrength = 2.0;
// A tear never splits off a piece smaller than 10 elements.
tearMaterial.minPiece = 10;
cloth.setMaterial(tearMaterial);
```

A tear can also be requested explicitly, either edge by edge
(`SoftBody.tearEdge`, `tearCell`),
or all at once along a set of edges and through a set of cells
(`World.tearSoftBody`).
Finally, a body can be **cut**
(`World.cutSoftBody`)
along a blade, i.e., a segment in 2D or a triangle in 3D, which is the most convenient way of slicing a body with the
weapon of a player. Note that the cuts ignore the min piece threshold.

Tearing and cutting lose no material: the particles are duplicated along the tear instead of being removed, so the area
(2D) or the volume (3D) of the body is preserved. The pieces a tear disconnects become soft-bodies of their own, which
keep the material and the settings of the body they come from, the deformable meshes and the joints following the pieces
they were attached to. Therefore the particles of the torn body are renumbered, and the returned event tells where each
of them went:

* Example 2D
* Example 3D

```js
// Elements tear on their own past the material's thresholds; a tear can also be requested.
sheet.tearEdge(10); // Applied at the end of the next step.
// Tear at once along edges and through cells; pieces the tear disconnects become soft
// bodies of their own.
let tear = world.tearSoftBody(sheet, [11, 12], []);
if (tear) {
    console.log(tear.tornEdges().length / 2, "edges torn");
    tear.free();
}
// Cut along a blade (a segment in 2D), without removing material.
let cut = world.cutSoftBody(sheet, [{ x: -3.0, y: -10.0 }, { x: -3.0, y: 10.0 }]);
if (cut) {
    for (let i = 0; i < cut.numPieces(); ++i) {
        let piece = world.getSoftBody(cut.pieceSoftBody(i));
        console.log("piece", i, "has", piece.numParticles(), "particles");
    }
    // Where a particle of the torn body went.
    let destination = cut.particleDestination(n * n - 1);
    if (destination) {
        console.log("particle", n * n - 1, "is now particle", destination.particle, "of", destination.softBody);
    }
    cut.free();
}
```

```js
// Elements tear on their own past the material's thresholds; a tear can also be requested.
cloth.tearEdge(10); // Applied at the end of the next step.
// Tear at once along edges and through cells; pieces the tear disconnects become soft
// bodies of their own.
let tear = world.tearSoftBody(cloth, [11, 12], []);
if (tear) {
    console.log(tear.tornEdges().length / 2, "edges torn");
    tear.free();
}
// Cut along a blade (a triangle in 3D), without removing material.
let cut = world.cutSoftBody(cloth, [
    { x: -0.1, y: -10.0, z: -10.0 }, { x: -0.1, y: 10.0, z: 0.0 }, { x: -0.1, y: -10.0, z: 10.0 },
]);
if (cut) {
    for (let i = 0; i < cut.numPieces(); ++i) {
        let piece = world.getSoftBody(cut.pieceSoftBody(i));
        console.log("piece", i, "has", piece.numParticles(), "particles");
    }
    // Where a particle of the torn body went.
    let destination = cut.particleDestination(n * n - 1);
    if (destination) {
        console.log("particle", n * n - 1, "is now particle", destination.particle, "of", destination.softBody);
    }
    cut.free();
}
```

note

Tearing one edge with
`SoftBody.tearEdge`
only marks it: the tear is applied at the end of the next step, together with the tears the simulation generates itself.
The methods of the
`World`
tear and cut immediately, which is why they are the ones giving back an event.

warning

Volume cells never tear. Therefore a body which cells use the `Volume` model
will only tear along its edges, and a material with a tear strain should be combined with the
`Corotational` or the `NeoHookean`
[cell model](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#constraints) if you expect it to be torn apart.

### Tear events[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#tear-events "Direct link to Tear events")

The tears applied during a step, whether they were generated by the simulation itself or requested with
`SoftBody.tearEdge`,
are reported the same way as the
[collision events](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#collision-and-contact-force-events): by giving an event queue
(`EventQueue.drainSoftBodyTearEvents`) to the step.
Each event (a
`SoftBodyTearEvent`) identifies the soft-body that tore and gives the
pieces it was split into, so the rendering of the scene can be updated accordingly:

* Example 2D
* Example 3D

```js
// Tears applied during a step are reported through the event queue.
let eventQueue = new RAPIER.EventQueue(true);
world.step(eventQueue);
eventQueue.drainSoftBodyTearEvents((event) => {
    console.log("Soft body", event.softBody(), "tore:", event.numPieces(), "pieces split off");
});
```

```js
// Tears applied during a step are reported through the event queue.
let eventQueue = new RAPIER.EventQueue(true);
world.step(eventQueue);
eventQueue.drainSoftBodyTearEvents((event) => {
    console.log("Soft body", event.softBody(), "tore:", event.numPieces(), "pieces split off");
});
```

## Forces and impulses[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#forces-and-impulses "Direct link to Forces and impulses")

Forces and impulses can be applied to a soft-body as a whole
(`addForce`, `applyImpulse`),
or to one particular particle
(`addParticleForce`, `applyParticleImpulse`).
A force added to the whole body is added to each of its free particles and is persistent, i.e., it keeps being applied
at each step until the forces are reset (`resetForces`), exactly like the forces of
a [rigid-body](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#forces-and-impulses). An impulse applied to the whole body is a velocity change
applied to each of its free particles, so the body is kicked as a whole without being deformed. Note that the pinned
particles ignore both.

Two additional methods are provided for the effects which magnitude depends on the distance to a point: an impulse
applied within a radius
(`applyImpulseAtPoint`), and a
radial blast pushing the particles away from its center
(`applyRadialImpulse`). In both
cases the impulse is scaled linearly down to zero at the given radius. Like for the rigid-bodies,
the last boolean argument of all these methods ensures the soft-body is
[awake](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#sleeping) before the force or the impulse is applied:

* Example 2D
* Example 3D

```js
// The `true` argument makes sure the soft body is awake.
sheet.resetForces(true); // Reset the forces to zero.
sheet.addForce({ x: 0.0, y: 1.0 }, true); // Spread over the particles by mass.
sheet.addParticleForce(3, { x: 0.0, y: 1.0 }, true);
sheet.applyImpulse({ x: 0.0, y: 0.1 }, true);
sheet.applyParticleImpulse(3, { x: 0.0, y: 0.1 }, true);
// An impulse on the particles within 0.5 of a point, scaled down with the distance.
sheet.applyImpulseAtPoint({ x: 0.0, y: 0.1 }, { x: -3.0, y: 3.0 }, 0.5, true);
// A blast pushing the particles away from a center.
sheet.applyRadialImpulse({ x: -3.0, y: 3.0 }, 0.1, 1.0, true);
```

```js
// The `true` argument makes sure the soft body is awake.
cloth.resetForces(true); // Reset the forces to zero.
cloth.addForce({ x: 0.0, y: 1.0, z: 0.0 }, true); // Spread over the particles by mass.
cloth.addParticleForce(3, { x: 0.0, y: 1.0, z: 0.0 }, true);
cloth.applyImpulse({ x: 0.0, y: 0.1, z: 0.0 }, true);
cloth.applyParticleImpulse(3, { x: 0.0, y: 0.1, z: 0.0 }, true);
// An impulse on the particles within 0.5 of a point, scaled down with the distance.
cloth.applyImpulseAtPoint({ x: 0.0, y: 0.1, z: 0.0 }, { x: 0.0, y: 2.0, z: 0.0 }, 0.5, true);
// A blast pushing the particles away from a center.
cloth.applyRadialImpulse({ x: 0.0, y: 2.0, z: 0.0 }, 0.1, 1.0, true);
```

## Global settings[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#global-settings "Direct link to Global settings")

A few settings are shared by every soft-body of the world. They are part of the [integration
parameters](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters#soft_bodies), so they can
be changed between two steps:

* The **re-sweep strain**
  (`softBodiesResweepStrain`) is the strain
  beyond which a constraint is solved once more after the contacts of every substep. This is what keeps a light body
  buried under heavier ones from being torn apart by them.
* The **maximum number of extra substeps**
  (`softBodiesMaxExtraSubsteps`) is
  the number of substeps a soft-body is allowed to ask for while it is hit fast. Those substeps bound the motion of its
  particles, and the motion of the rigid-bodies approaching them, by about one particle radius per substep. Giving zero
  disables them.
* The **contact stiffening**
  (`softBodiesContactStiffening`)
  multiplies the natural frequencies of the contacts involving a soft-body. Those contacts run stiffer than the rigid
  ones because the mass behind one contact is the mass of a few particles, and not the mass of the whole body.

In addition, the detection of the penetrations and of the tangles, as well as the way the bodies recover from them, are
configured by the **recovery** settings (`softBodiesRecovery`,
a `SoftRecoverySettings`), where every mechanism can be switched
off individually (see the [contacts](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#penetrations-and-tangles) section for the ones to look at
first). The tuning of the linear solves of the [FEM solver](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#fem-solver) lives there as well (the `softBodiesFem*` parameters):

Those settings are plain fields of the integration parameters of the world. Note that `softBodiesRecovery` gives back a
copy of the recovery settings, which is assigned back to the integration parameters to apply it:

* Example 2D
* Example 3D

```js
// Settings shared by every soft body of the world.
// Strain beyond which a constraint is re-solved after the contacts of every substep.
// Default: 0.75
world.integrationParameters.softBodiesResweepStrain = 0.75;
// Extra substeps a soft body requests while it is hit fast; 0 disables them.
// Default: 4
world.integrationParameters.softBodiesMaxExtraSubsteps = 4;
// Stiffening of the soft-body contacts relative to the rigid ones.
// Default: 4.0
world.integrationParameters.softBodiesContactStiffening = 4.0;
// The tangle detection and recovery stack can be switched off mechanism by mechanism; the
// getter gives back a copy, so the settings are assigned back after being changed.
let recovery = world.integrationParameters.softBodiesRecovery;
recovery.crossingRepulsion = true;
world.integrationParameters.softBodiesRecovery = recovery;
```

```js
// Settings shared by every soft body of the world.
// Strain beyond which a constraint is re-solved after the contacts of every substep.
// Default: 0.75
world.integrationParameters.softBodiesResweepStrain = 0.75;
// Extra substeps a soft body requests while it is hit fast; 0 disables them.
// Default: 4
world.integrationParameters.softBodiesMaxExtraSubsteps = 4;
// Stiffening of the soft-body contacts relative to the rigid ones.
// Default: 4.0
world.integrationParameters.softBodiesContactStiffening = 4.0;
// The tangle detection and recovery stack can be switched off mechanism by mechanism; the
// getter gives back a copy, so the settings are assigned back after being changed.
let recovery = world.integrationParameters.softBodiesRecovery;
recovery.crossingRepulsion = true;
world.integrationParameters.softBodiesRecovery = recovery;
```

## Removal[â](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies/#removal "Direct link to Removal")

Removing a soft-body (`World.removeSoftBody`) removes everything the engine created for it: its root
body, the proxies of its clusters, the colliders of its surface and of its deformable meshes, as well as the joints
attached to any of them. One cluster can also be removed on its own
(`World.removeSoftBodyCluster`):

* Example 2D
* Example 3D

```js
// Removing a soft body removes its root body, its proxies, its colliders and the joints
// attached to them.
world.removeSoftBody(rope);
// A cluster can be removed on its own.
world.removeSoftBodyCluster(jelly, cluster);
```

```js
// Removing a soft body removes its root body, its proxies, its colliders and the joints
// attached to them.
world.removeSoftBody(rope);
// A cluster can be removed on its own.
world.removeSoftBodyCluster(jelly, cluster);
```

warning

Removing a cluster also removes the particles that only this cluster covered, with their elements and their
attachments. Therefore removing the last cluster of a soft-body removes the soft-body itself. Note that removing the
proxy of a cluster from the rigid-body set is equivalent to removing the cluster.
