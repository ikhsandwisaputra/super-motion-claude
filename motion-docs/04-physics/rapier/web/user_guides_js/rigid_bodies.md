---
source: https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies
title: "Rigid-bodies | Rapier"
fetched: 2026-10-28
---

# Rigid-bodies

The real-time simulation of rigid-bodies subjected to forces and contacts is the main feature of a physics engine for
video-games, robotics, or animation. Rigid-bodies are typically used to simulate the dynamics of non-deformable solids as well
as to integrate the trajectory of solids which velocities are controlled by the user (e.g. moving platforms). On
the other hand, rigid-bodies are not enough to simulate, e.g., cars, ragdolls, or robotic systems, as those use-cases
require adding restrictions on the relative motion between their parts using [joints](https://rapier.rs:443/docs/user_guides/javascript/joints).

Note that rigid-bodies are only responsible for the dynamics and kinematics of the solid. [Colliders](https://rapier.rs:443/docs/user_guides/javascript/colliders) can be
attached to a rigid-body to specify its shape and enable collision-detection. A rigid-body without collider attached to it will
not be affected by contacts (because there is no shape to compute contact against).

## Creation and insertion[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#creation-and-insertion "Direct link to Creation and insertion")

A rigid-body is created by a `World.createRigidBody` method. The initial state of
the rigid-body to create is described by an instance of the `RigidBodyDesc` class.

Each rigid-body create by the physics world is given an integer identifier `rigidBody.handle`. This identifier
is guaranteed to the different from any identifier of rigid-bodies still existing (or that existed) in the physics
world.

info

The following example shows several setters that can be called to customize the
rigid-body being built. The input values are just random so using this example
as-is will not lead to a useful result.

* Example 2D
* Example 3D

```js
// The world that will contain our rigid-bodies.
let world = new RAPIER.World({ x: 0.0, y: -9.81 });

// Builder for a fixed rigid-body.
let example1 = RAPIER.RigidBodyDesc.fixed();
// Builder for a dynamic rigid-body.
let example2 = RAPIER.RigidBodyDesc.dynamic();
// Builder for a kinematic rigid-body controlled at the velocity level.
let example3 = RAPIER.RigidBodyDesc.kinematicVelocityBased();
// Builder for a kinematic rigid-body controlled at the position level.
let example4 = RAPIER.RigidBodyDesc.kinematicPositionBased();
// Builder for a body with a status specified by an enum.
let rigidBodyDesc = new RAPIER.RigidBodyDesc(RAPIER.RigidBodyType.Dynamic)
    // The rigid body translation.
    // Default: zero vector.
    .setTranslation(0.0, 5.0)
    // The rigid body rotation.
    // Default: no rotation.
    .setRotation(5.0)
    // The linear velocity of this body.
    // Default: zero velocity.
    .setLinvel(1.0, 2.0)
    // The angular velocity of this body.
    // Default: zero velocity.
    .setAngvel(2.0)
    // The scaling factor applied to the gravity affecting the rigid-body.
    // Default: 1.0
    .setGravityScale(0.5)
    // Whether or not this body can sleep.
    // Default: true
    .setCanSleep(true)
    // Whether or not CCD is enabled for this rigid-body.
    // Default: false
    .setCcdEnabled(false);

// All done, actually build the rigid-body.
let rigidBody = world.createRigidBody(rigidBodyDesc);
// The integer handle of the rigid-body can be read from the `handle` field.
let rigidBodyHandle = rigidBody.handle;
```

```js
// The world that will contain our rigid-bodies.
let world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

// Builder for a fixed rigid-body.
let example1 = RAPIER.RigidBodyDesc.fixed();
// Builder for a dynamic rigid-body.
let example2 = RAPIER.RigidBodyDesc.dynamic();
// Builder for a kinematic rigid-body controlled at the velocity level.
let example3 = RAPIER.RigidBodyDesc.kinematicVelocityBased();
// Builder for a kinematic rigid-body controlled at the position level.
let example4 = RAPIER.RigidBodyDesc.kinematicPositionBased();
// Builder for a body with a status specified by an enum.
let rigidBodyDesc = new RAPIER.RigidBodyDesc(RAPIER.RigidBodyType.Dynamic)
    // The rigid body translation.
    // Default: zero vector.
    .setTranslation(0.0, 5.0, 1.0)
    // The rigid body rotation, given as a quaternion.
    // Default: no rotation.
    .setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 })
    // The linear velocity of this body.
    // Default: zero velocity.
    .setLinvel(1.0, 3.0, 4.0)
    // The angular velocity of this body.
    // Default: zero velocity.
    .setAngvel({ x: 3.0, y: 0.0, z: 1.0 })
    // The scaling factor applied to the gravity affecting the rigid-body.
    // Default: 1.0
    .setGravityScale(0.5)
    // Whether or not this body can sleep.
    // Default: true
    .setCanSleep(true)
    // Whether or not CCD is enabled for this rigid-body.
    // Default: false
    .setCcdEnabled(false);

// All done, actually build the rigid-body.
let rigidBody = world.createRigidBody(rigidBodyDesc);
// The integer handle of the rigid-body can be read from the `handle` field.
let rigidBodyHandle = rigidBody.handle;
```

info

Typically, the inertia and center of mass are automatically set to the inertia and center of mass resulting from the
shapes of the [colliders](https://rapier.rs:443/docs/user_guides/javascript/colliders) attached to the rigid-body. But they can also be set manually.

## Rigid-body type[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#rigid-body-type "Direct link to Rigid-body type")

There are four types of rigid-bodies, identified by the `RigidBodyType` enumeration:

* **`RigidBodyType.Dynamic`:** Indicates that the body is affected by
  external forces and contacts.
* **`RigidBodyType.Fixed`:** Indicates the body cannot move. It acts as
  if it has an infinite mass and will not be affected by any force. It will continue to collide with dynamic bodies but
  not with fixed nor with kinematic bodies. This is typically used for the ground or for temporarily freezing a body.
* **`RigidBodyType.KinematicPositionBased`:** Indicates
  that the body position must not be altered by the physics engine. The user is free to set its next position and the
  body velocity will be deduced at each update accordingly to ensure a realistic behavior of dynamic bodies in contact
  with it. This is typically used for moving **platforms**, **elevators**, etc.
* **`RigidBodyType.KinematicVelocityBased`:** Indicates
  that the body velocity must not be altered by the physics engine. The user is free to set its velocity and the next
  body position will be deduced at each update accordingly to ensure a realistic behavior of dynamic bodies in contact
  with it. This is typically used for moving **platforms**, **elevators**, etc.

Both position-based and velocity-based kinematic bodies are mostly the same. Choosing between both is mostly a matter of
preference between position-based control and velocity-based control.

Note that a fifth type exists, the **soft frame**, which is reserved to the rigid-bodies Rapier creates to give a frame
to the [soft-bodies](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#soft-frames-joints-and-rigid-colliders): their pose is computed from the particles
of the soft-body, and they aren't meant to be created by hand.

info

The whole point of kinematic bodies is to let the user have **total control over their trajectory**. This means that
kinematic bodies will simply ignore any contact force and go through walls and the ground.
In other words: if you tell the kinematic to go somewhere, it will go there, no questions asked.

Taking obstacles into
account needs to be done manually either by using [scene queries](https://rapier.rs:443/docs/user_guides/javascript/scene_queries) to detect nearby obstacles, or by using the built-in
[character controller](https://rapier.rs:443/docs/user_guides/javascript/character_controller).

## Position[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#position "Direct link to Position")

The position of a rigid-body represents its location (translation) in 2D or 3D world-space, as well as its orientation (rotation).
.

The position of a rigid-body can be set when creating it. It can also be set after
its creation as illustrated below.

warning

Directly changing the position of a rigid-body is equivalent to teleporting it: this is a not a
physically realistic action! Teleporting a dynamic or kinematic bodies may result in odd behaviors
especially if it teleports into a space occupied by other objects. For dynamic bodies, [forces,
impulses](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#forces-and-impulses), or [velocity modification](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#velocity) should be preferred.
For kinematic bodies, see the discussion after the examples below.

* Example 2D
* Example 3D

```js
/* Set the position when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // The rigid body translation.
    // Default: zero vector.
    .setTranslation(0.0, 5.0)
    // The rigid body rotation.
    // Default: no rotation.
    .setRotation(5.0);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the position after the rigid-body creation. */
// The `true` argument makes sure the rigid-body is awake.
rigidBody.setTranslation({ x: 0.0, y: 5.0 }, true);
rigidBody.setRotation(0.2, true);
```

```js
/* Set the position when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // The rigid body translation.
    // Default: zero vector.
    .setTranslation(0.0, 5.0, 1.0)
    // The rigid body rotation, given as a quaternion.
    // Default: no rotation.
    .setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 });
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the position after the rigid-body creation. */
// The `true` argument makes sure the rigid-body is awake.
rigidBody.setTranslation({ x: 0.0, y: 5.0, z: 1.0 }, true);
rigidBody.setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 }, true);
```

In order to move a dynamic rigid-body it is strongly discouraged to set its position directly as it
may results in weird behaviors: it's as if the rigid-body teleports itself, which is a non-physical behavior. For dynamic
bodies, it is recommended to either set its [velocity](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#velocity) or to apply [forces or impulses](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#forces-and-impulses).

For **velocity-based** kinematic bodies, it is recommended to set its velocity instead of setting its position directly.
For **position-based** kinematic bodies, it is recommended to use the special methods:

* `RigidBody.setNextKinematicRotation`
* `RigidBody.setNextKinematicTranslation`

These methods will let the physics pipeline compute the fictitious velocity of the position-based kinematic body for more realistic
interactions with other rigid-bodies. These methods won't immediately modify the position of the kinematic body itself.
The position of the kinematic body will be automatically set to these values during the next physics pipeline update.

## Velocity[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#velocity "Direct link to Velocity")

The velocity of a dynamic rigid-body controls how fast it is moving in time. The velocity is applied at the **center-of-mass**
of the rigid-body, and is composed of two independent parts:

1. The **linear velocity** is specified as a vector representing the direction and magnitude of the movement.
2. In 3D, the **angular velocity** is given as a vector representing the rotation
   axis multiplied by the rotation angular speed in `rad/s` (axis-angle representation). In 2D, the **angular velocity** is
   given as a real representing the angular speed in `rad/s`.

info

The velocity is only relevant to **dynamic** rigid-bodies. It has no effect on fixed rigid-bodies, and the
velocity of kinematic rigid-bodies are automatically computed at each timestep based on their next kinematic
positions.

The velocity of a rigid-body is automatically updated by the physics pipeline after taking forces, contacts,
and joints into account. It can be set when the rigid-body is created or after its creation:

* Example 2D
* Example 3D

```js
/* Set the velocities when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // The linear velocity of this body.
    // Default: zero velocity.
    .setLinvel(1.0, 3.0)
    // The angular velocity of this body.
    // Default: zero velocity.
    .setAngvel(3.0);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the velocities after the rigid-body creation. */
// The `true` argument makes sure the rigid-body is awake.
rigidBody.setLinvel({ x: 1.0, y: 3.0 }, true);
rigidBody.setAngvel(3.0, true);
```

```js
/* Set the velocities when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // The linear velocity of this body.
    // Default: zero velocity.
    .setLinvel(1.0, 3.0, 4.0)
    // The angular velocity of this body.
    // Default: zero velocity.
    .setAngvel({ x: 3.0, y: 0.0, z: 0.0 });
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the velocities after the rigid-body creation. */
// The `true` argument makes sure the rigid-body is awake.
rigidBody.setLinvel({ x: 1.0, y: 3.0, z: 4.0 }, true);
rigidBody.setAngvel({ x: 3.0, y: 0.0, z: 0.0 }, true);
```

Alternatively, the velocity of a dynamic rigid-body can be altered indirectly by
[applying a force or an impulse](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#forces-and-impulses).

## Gravity[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#gravity "Direct link to Gravity")

Gravity is such a common force that it is implemented as a special case (even if it could easily be implemented
by the user using [force application](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#forces-and-impulses)). The gravity is given to the constructor of the physics `World`. It can be modified by modifying the
field `World.gravity`.
Note however that a change of gravity won't automatically wake-up the
[sleeping bodies](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#sleeping) so keep in mind that you may want to wake them up manually before a gravity change.

note

Because fixed and kinematic bodies are immune to forces, they are not affected by gravity.

info

A rigid-body with no mass will not be affected by gravity either. So if your rigid-body
doesn't fall when you expected it to, make sure it has a mass set explicitly, or has at least one collider with
non-zero density attached to it.

It is possible to change the way gravity affects a specific rigid-body by setting the rigid-body's **gravity scale**
to a value other than `1.0`. The magnitude of the gravity applied to this body will be multiplied by this scaling
factor. Therefore, a gravity scale set to `0.0` will disable gravity for the rigid-body whereas a gravity scale set to
`2.0` will make it twice as strong. A negative value will flip the direction of the gravity for this rigid-body.

This gravity scale factor can be set when the rigid-body is created or after its creation:

```js
/* Set the gravity scale when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setGravityScale(2.0);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the gravity scale after the rigid-body creation. */
rigidBody.setGravityScale(2.0, true);
```

## Forces and impulses[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#forces-and-impulses "Direct link to Forces and impulses")

In addition to [gravity](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#gravity), it is possible to add custom forces (or torques) or apply impulses (or torque impulses)
to dynamic rigid-bodies in order to make them move in specific ways. Forces affect the rigid-body's acceleration
whereas impulses affect the rigid-body's velocity. They are both based on the familiar equations:

* **Forces:** the acceleration change is equal to the force divided by the mass: Îa=mâ1f\Delta{}a = m^{-1}fÎa=mâ1f
* **Impulses:** the velocity change is equal to the impulse divided by the mass: Îv=mâ1i\Delta{}v = m^{-1}iÎv=mâ1i

Forces can be added, and impulses can be applied, to a rigid-body after it has been created. Added forces are persistent across simulation steps, and can be
cleared manually.

* Example 2D
* Example 3D

```js
// The `true` argument makes sure the rigid-body is awake.
rigidBody.resetForces(true);  // Reset the forces to zero.
rigidBody.resetTorques(true); // Reset the torques to zero.
rigidBody.addForce({ x: 0.0, y: 1000.0 }, true);
rigidBody.addTorque(100.0, true);
rigidBody.addForceAtPoint({ x: 0.0, y: 1000.0 }, { x: 1.0, y: 2.0 }, true);

rigidBody.applyImpulse({ x: 0.0, y: 1000.0 }, true);
rigidBody.applyTorqueImpulse(100.0, true);
rigidBody.applyImpulseAtPoint({ x: 0.0, y: 1000.0 }, { x: 1.0, y: 2.0 }, true);
```

```js
// The `true` argument makes sure the rigid-body is awake.
rigidBody.resetForces(true);  // Reset the forces to zero.
rigidBody.resetTorques(true); // Reset the torques to zero.
rigidBody.addForce({ x: 0.0, y: 1000.0, z: 0.0 }, true);
rigidBody.addTorque({ x: 100.0, y: 0.0, z: 0.0 }, true);
rigidBody.addForceAtPoint({ x: 0.0, y: 1000.0, z: 0.0 }, { x: 1.0, y: 2.0, z: 3.0 }, true);

rigidBody.applyImpulse({ x: 0.0, y: 1000.0, z: 0.0 }, true);
rigidBody.applyTorqueImpulse({ x: 100.0, y: 0.0, z: 0.0 }, true);
rigidBody.applyImpulseAtPoint({ x: 0.0, y: 1000.0, z: 0.0 }, { x: 1.0, y: 2.0, z: 3.0 }, true);
```

info

Keep in mind that a dynamic rigid-body with a zero mass won't be affected by a linear force/impulse, and a rigid-body with a zero
angular inertia won't be affected by torques/torque impulses. So if your force doesn't appear to do anything, make sure that:

1. The rigid-body is dynamic.
2. It is strong enough to make the rigid-body move (try a very large value and see if it does something).
3. The rigid-body has a non-zero mass or angular inertia either because they were set explicitly, or because they
   were computed automatically from colliders with non-zero densities.

## Mass properties[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#mass-properties "Direct link to Mass properties")

The mass properties of a rigid-body is composed of three parts:

* The **mass** which determines the resistance of the rigid-body wrt. linear movements. A high mass implies that
  larger forces are needed to make the rigid-body translate.
* The **angular inertia** determines the resistance of the rigid-body wrt. the angular movements. A high angular
  inertia implies that larger torques are needed to make the rigid-body rotate.
* The **center-of-mass** determines relative to what points torques are applied to the rigid-body.

note

Zero is a special value for masses and angular inertia. A mass equal to zero is interpreted as an infinite mass.
An angular inertia equal to zero is interpreted as an infinite angular inertia. Therefore, a rigid-body with a
mass equal to zero will not be affected by any force, and a rigid-body with an angular inertia equal to zero will
not be affected by any torque.

Computing the mass and angular-inertia can often be difficult because they depend on the geometric shape of the
object being simulated. This is why they are automatically computed by Rapier when a [collider](https://rapier.rs:443/docs/user_guides/javascript/colliders#mass-properties) is
attached to the rigid-body: the collider add its own mass and angular-inertia contribution (computed based on the
collider's shape and density) to the rigid-body it is attached to:

```js
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
let rigidBody = world.createRigidBody(rigidBodyDesc);
// The default density is 1.0, we are setting 2.0 for this example.
let colliderDesc = RAPIER.ColliderDesc.ball(1.0).setDensity(2.0);
// When the collider is attached, the rigid-body's mass and angular
// inertia is automatically updated to take the collider into account.
world.createCollider(colliderDesc, rigidBody);
```

Alternatively, it is possible to set the mass properties of a rigid-body when it is created. Keep in mind that
this won't prevent the colliders' contributions to be added to these values. So make sure to set the attached
colliders' densities to zero if you want your explicit values to be the final mass-properties values.

* Example 2D
* Example 3D

```js
/* Set the mass-properties when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setAdditionalMass(0.5)
    // Sets both the mass and angular inertia at once.
    .setAdditionalMassProperties(
        0.5,                // Mass.
        { x: 0.0, y: 1.0 }, // Center of mass.
        0.3                 // Principal angular inertia.
    );
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the mass-properties when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setAdditionalMass(0.5)
    // Sets both the mass and angular inertia at once.
    .setAdditionalMassProperties(
        0.5,                                // Mass.
        { x: 0.0, y: 1.0, z: 0.0 },         // Center of mass.
        { x: 0.3, y: 0.2, z: 0.1 },         // Principal angular inertia.
        { w: 1.0, x: 0.0, y: 0.0, z: 0.0 }  // Principal angular inertia frame (unit quaternion).
    );
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

## Locking translations/rotations[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#locking-translationsrotations "Direct link to Locking translations/rotations")

It is sometimes useful to prevent a rigid-body from rotating or translating. One typical use-case for locking rotations
is to prevent a player modeled as a dynamic rigid-body from tilting. These kind of degree-of-freedom restrictions could
be achieved by [joints](https://rapier.rs:443/docs/user_guides/javascript/joints), but locking translations/rotations of a single rigid-body wrt. the cartesian coordinate
axes can be done in a much more efficient and numerically stable way. That's why rigid-bodies have
dedicated methods for this.

* Example 2D
* Example 3D

```js
/* Lock translations/rotations when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .lockTranslations() // prevent translations along along all axes.
    .lockRotations();   // prevent rotations.
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Lock translations/rotations after the rigid-body creation. */
// The last `true` argument makes sure the rigid-body is awake.
rigidBody.lockTranslations(true, true);
rigidBody.lockRotations(true, true);
```

```js
/* Lock translations/rotations when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .lockTranslations() // prevent translations along along all axes.
    .lockRotations()   // prevent rotations along all axes.
    .enabledRotations(true, false, false); // only enable rotations along the X axis.
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Lock translations/rotations after the rigid-body creation. */
// The last `true` argument makes sure the rigid-body is awake.
rigidBody.lockTranslations(true, true);
rigidBody.lockRotations(true, true);
rigidBody.setEnabledRotations(true, false, false, true);
```

## Damping[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#damping "Direct link to Damping")

Damping lets you slow down a rigid-body automatically. This can be used to achieve a wide variety of effects like
fake air friction. Each rigid-body is given a **linear damping coefficient** (affecting its linear velocity) and an
**angular damping coefficient** (affecting its angular velocity). Larger values of the damping coefficients lead to
a stronger slow-downs. Their default values are `0.0` (no damping at all).

This damping coefficients can be set when the rigid-body is created or after its creation:

```js
/* Set the damping coefficients when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setLinearDamping(0.5)
    .setAngularDamping(1.0);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the damping coefficients after the rigid-body creation. */
rigidBody.setLinearDamping(0.5);
rigidBody.setAngularDamping(1.0);
```

## Dominance[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#dominance "Direct link to Dominance")

Dominance is a non-realistic, but sometimes useful, feature. It can be used to make one rigid-body immune to forces
originating from contacts with some other bodies. For example this can be used to model a player represented as a
dynamic rigid-body that cannot be "pushed back" by any, or some, other dynamic rigid-bodies part of the environment.

Each rigid-body is part of a dominance group in `[-127; 127]` (the default group is `0`). If the colliders from two rigid-bodies
are in contact, the one with the highest dominance will act as if it has an infinite mass, making it immune to the
contact forces the other body would apply on it. If both bodies are part of the same dominance group, then their
contacts will work in the usual way (both are affected by opposite forces with the same magnitude).

For example, if a dynamic body `A` is in the dominance group `10`, and a dynamic body `B` in the dominance group `-20`, then
a contact between a collider attached to `A` and a collider attached `B` will result in `A` remaining immobile and `B` being
pushed by `A` (independently from their mass).

info

A non-dynamic rigid-body is always considered as being part of a dominance group greater than any dynamic rigid-body.
This means that dynamic/fixed and dynamic/kinematic contacts will continue to work normally, independently from the
dominance group they were given by the user.

The dominance group can be set when the rigid-body is created or after its creation:

```js
/* Set the damping coefficients when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setDominanceGroup(10);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Set the damping coefficients after the rigid-body creation. */
rigidBody.setDominanceGroup(10);
```

## Continuous collision detection[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#continuous-collision-detection "Direct link to Continuous collision detection")

Continuous Collision Detection (CCD) is used to make sure that fast-moving objects don't miss any contacts (a problem
usually called **tunneling**). This is done by looking for collisions along the shapes motion: a rigid-body that moved
fast during the timestep casts its colliders from their previous position to their new one,
and its position is clamped to the first impact found this way. Its velocities are left untouched and the solver is
responsible for preventing penetrations. Since the trajectory is clamped to some intermediate location along its path
this technique is commonly called *motion clamping*.

Rapier applies CCD in two ways:

* Every fast-moving dynamic rigid-body is swept against the **fixed** colliders and the soft-bodies of the scene. This
  is automatic and doesn't need to be enabled: this prevents a falling crate from going through the
  floor, or a projectile from going through a wall, etc. Note however that this is not enabled fol dynamic rigid-bodies
  with mesh-like shapes (triangle meshes, polylines, heightfields) as that would be too computationally expensive.
* A dynamic rigid-body with CCD enabled (aka. a **bullet**) is swept against the **kinematic and dynamic** bodies as well. This
  is more expensive, therefore it is disabled by default and should be reserved to the objects that must not tunnel
  through moving obstacles. Note that two CCD-enabled objects might still tunel since the CCD resolution does currently
  not take both continuous motions into account simultaneously.

info

CCD takes action only if the rigid-body is moving fast relative to another collider. Therefore it is useless to enable
it on fixed rigid-bodies and on rigid-bodies that are expected to move slowly.

The CCD feature, including the automatic sweeping of the fast dynamic bodies, can be fully disabled by setting the
maximum number of CCD substeps to zero in the
[IntegrationParameters](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures#integration-parameters)
(the `IntegrationParameters.maxCcdSubsteps`
field, whose default is 1). Larger values let a body resolve several successive impacts within a single timestep, at
the cost of additional sweeps.

Per-object CCD can be enabled when creating a rigid-body or after its creation:

```js
/* Enable CCD when the rigid-body is created. */
let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setCcdEnabled(true);
let rigidBody = world.createRigidBody(rigidBodyDesc);
```

```js
/* Enable CCD after the rigid-body creation. */
rigidBody.enableCcd(true);
```

## Sleeping[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#sleeping "Direct link to Sleeping")

When a dynamic rigid-body doesn't move (or moves very slowly) during a few seconds, it will be marked as **sleeping**
by the physics pipeline. Rigid-bodies marked as sleeping are no longer simulated by
the physics engine until they are woken up. That way the physics engine doesn't waste any computational resources
simulating objects that don't actually move. They are woken up automatically whenever another non-sleeping rigid-body
starts interacting with them (either with a joint, or with one of its attached colliders generating contacts).

However, a sleeping rigid-body won't respond to any user action. This is why it is possible to wake-up the rigid-body
manually with `RigidBody.wakeUp()`. Some rigid-body methods take an additional `wakeUp` boolean argument that, if
true, ensures that the rigid-body wakes up before the action takes place. For example:

* `RigidBody.addForce(force, true)` will wake-up the rigid-body before adding the force.
* `World.removeImpulseJoint(joint, true)` (resp. `World.removeMultibodyJoint`) will wake-up the two rigid-bodies
  attached by the removed joint.
* `World.removeCollider(collider, true)` will wake-up the rigid-body the removed collider is attached to.

Unless you want to achieve special effects, it is recommended to always set the `wakeUp` argument to `true`.
One example of case where setting the argument of `wakeUp` to `false` makes sense is to simulate a custom
constant gravity with `RigidBody.addForce(force, false)`. This will result in the force being applied
to the rigid-body, but will allow the rigid-body to fall asleep if it reaches a dynamic equilibrium.

## Solver settings[â](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies/#solver-settings "Direct link to Solver settings")

The accuracy of the constraints solver is configured for the whole world by the
[integration parameters](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters). However, in some cases, part of the simulation might need more
fine-grained control. For example, an articulated robot, or a stack involving large mass ratios, might require more
solver iterations. This is why a rigid-body can ask for additional solver iterations (either substeps, or internal steps)
resulting in the island it belongs to (the bodies it is connected to by contacts and joints) to run with a higher
accuracy without hurting the performances of other islands.

Two other settings affect how a rigid-body is integrated. The soft-CCD prediction distance makes the body generate
predictive contacts ahead of its own path, which is a cheaper alternative to
[CCD](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection) for the objects that are thin or moderately fast (large
values impact the performances badly by increasing significantly the number of collision pairs). Finally, the
fast-rotation flag lets the body exceed the angular speed cap, which is enabled by default to keep CCD reliable.

* Example 2D
* Example 3D

```js
/* Give a rigid-body more solver accuracy than the rest of the scene. */
let solverBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // Extra substeps run for the whole island component this body belongs to.
    .setAdditionalSolverIterations(4)
    // Predictive contacts generated up to that distance ahead of the body's path: a cheaper
    // alternative to CCD for slow-but-thin or moderately fast objects.
    .setSoftCcdPrediction(0.5);
let solverBody = world.createRigidBody(solverBodyDesc);
```

```js
/* Give a rigid-body more solver accuracy than the rest of the scene. */
let solverBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    // Extra substeps run for the whole island component this body belongs to.
    .setAdditionalSolverIterations(4)
    // Predictive contacts generated up to that distance ahead of the body's path: a cheaper
    // alternative to CCD for slow-but-thin or moderately fast objects.
    .setSoftCcdPrediction(0.5);
let solverBody = world.createRigidBody(solverBodyDesc);
```
