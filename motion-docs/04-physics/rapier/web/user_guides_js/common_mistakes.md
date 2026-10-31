---
source: https://rapier.rs:443/docs/user_guides/javascript/common_mistakes
title: "Common mistakes | Rapier"
fetched: 2026-10-28
---

# Common mistakes

## Rigid-body isn't affected by gravity[â](https://rapier.rs:443/docs/user_guides/javascript/common_mistakes/#rigid-body-isnt-affected-by-gravity "Direct link to Rigid-body isn't affected by gravity")

If you expect your rigid-body to fall because of gravity but it doesn't, please make sure to double-check
the following:

* Your gravity vector is non-zero.
* Your rigid-body is a dynamic rigid-body.
* You didn't lock the translations of the rigid-body.
* The rigid-body has a non-zero mass.

Note that a collider not attached to a dynamic rigid-body will never fall because it won't be affected by forces.

note

If the rigid-body has no collider attached to it, its mass will be zero unless you gave it a mass (or mass properties)
explicitly. If the rigid-body has colliders attached to it and you didn't give the rigid-body a mass explicitly, make
sure that at least one of the colliders has a non-zero density (or non-zero mass if you set it explicitly on the
collider).

warning

The shapes that don't enclose any volume, i.e., the polylines, the half-spaces, the segments, and the triangles in 3D,
have a zero mass whatever their density. So if a rigid-body only has colliders with such shapes attached to it, you
need to set its mass/angular inertia manually. Note that a triangle-mesh isn't one of them: its mass properties are
computed from the volume enclosed by its faces, which assumes that the mesh is closed and that its triangles are
consistently oriented.

## Applying a force to a rigid-body doesn't work[â](https://rapier.rs:443/docs/user_guides/javascript/common_mistakes/#applying-a-force-to-a-rigid-body-doesnt-work "Direct link to Applying a force to a rigid-body doesn't work")

If applying a force or an impulse to a rigid-body doesn't work, please make sure to double-check the following:

* The rigid-body is a dynamic rigid-body.
* The rigid-body has a non-zero mass (or non-zero angular inertia for torques).
* The force or impulse must be strong enough to actually push the rigid-body. You may for example try with a very
  high force/impulse value (say, with a magnitude of `100000.0`) and see if this stronger force works.

note

If the rigid-body has no collider attached to it, its mass will be zero unless you gave it a mass (or mass properties)
explicitly. If the rigid-body has colliders attached to it and you didn't give the rigid-body a mass explicitly, make
sure that at least one of the colliders has a non-zero density (or non-zero mass if you set it explicitly on the
collider).

## Why is everything moving in slow-motion?[â](https://rapier.rs:443/docs/user_guides/javascript/common_mistakes/#why-is-everything-moving-in-slow-motion "Direct link to Why is everything moving in slow-motion?")

A common mistake, especially in 2D, is to use pixels as the length unit in the physics world. Let's say that in 2D
you have a 100x100 pixels sprite for your player. It may be tempting to use a 100x100 cuboid collider for this
sprite: `ColliderDesc.cuboid(50.0, 50.0)` (we set `50.0`
because this is the half-width of the cuboid). Doing this will make it look like the simulation runs in **slow-motion**
because the cuboid will be huge compared to the magnitude of the default gravity (-9.81).

The recommended way of using Rapier is to use [SI units](https://en.wikipedia.org/wiki/International_System_of_Units)
(meters, seconds, kilograms, etc.) If the player sprite is a 100x100 cuboid, then it is as if your player is 100 meters
tall and 100 meters wide, which is huge. Therefore it is recommended to have a scaling factor between the graphics
and the physics. For example we can say that 1 physics meter is equal to 50 pixels. This means that we can
initialize our player collider as a 2x2 cuboid while still using a 100x100 pixels sprite.

All we need to do to keep measures in sync is to multiply by our scaling factor 50 all the positions given by the
physics engine before rendering.
