---
source: https://rapier.rs:443/docs/user_guides/javascript/joints
title: "Joints | Rapier"
fetched: 2026-10-28
---

# Joints

One of the most appealing features of a physics engine is to simulate articulations. Articulations, aka. *joints*, allow
the restriction of the motion of one body relative to another body. For example, one well-known joint is the ball-in-socket
joint also known as the spherical joint: it allows one object to rotate freely with regard to the other but not to translate.
This is typically used to simulate shoulders of a ragdoll.

## Basic concepts[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#basic-concepts "Direct link to Basic concepts")

Joints can be modeled in various ways but let's talk about the concept of **Degrees Of Freedom (DOF)** first. In 3D, a
rigid-body is capable of translating along the 3 coordinates axes x\mathbf{x}x, y\mathbf{y}y and z\mathbf{z}z, and to
rotate along those three axes as well. Therefore, a rigid-body is said to have **3 translational DOF** and **3 rotational DOF**.
We can also say a 3D rigid-body has a total of **6 DOF**. The 2D case is similar but with less possibilities of movements:
a 2D rigid-body has 2 translational DOF and only 1 rotational DOF (which forms a total of 3 DOF). The number of **relative DOF**
of a body wrt. another body is the number of possible relative translations and rotations.

The goal of a joint is to reduce the number of DOF a body has. For example, the aforementioned spherical joint removes all relative
translations between two bodies. Therefore, it allows only the 3 rotational DOF in 3D simulations or the 1 rotational DOF
in 2D simulations. Other joints exist allowing other combinations of relative DOF. Note that because there are less possible
motions in 2D, some joints are only defined in 3D. This is illustrated by empty cells in the following table for joints
that are not defined in 2D:

| Joint | Allowed DOF in 2D | Allowed DOF in 3D | Rapier support |
| --- | --- | --- | --- |
| *Fixed joint* | None | None | Yes |
| *Free joint* | All | All | Through GenericJoint |
| *Prismatic joint* | 1 Translation | 1 Translation | Yes |
| *Revolute joint* | 1 Rotation | 1 Rotation | Yes |
| *Spherical joint* | 1 Rotation | 3 Rotations | Yes |
| *Cartesian joint* | 2 Translations | 3 Translations | Through GenericJoint |
| *Planar joint* |  | 2 Translations + 1 Rotation | Through GenericJoint |
| *Cylindrical joint* |  | 1 Translation + 1 Rotation (along the same axis) | Through GenericJoint |
| *Pin-slot joint* |  | 1 Translation + 1 Rotation (along different axes) | Through GenericJoint |
| *Rectangular joint* |  | 2 Translations | Through GenericJoint |
| *Universal joint* |  | 2 Rotations | Through GenericJoint |

Joints must be inserted into the physics world either as an impulse joint with `World.createImpulseJoint`, or as a
multibody joint with `World.createMultibodyJoint` (which store them into the `World.impulseJoints` and
`World.multibodyJoints` sets respectively).
The difference between those is explained in [next section](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints).

## Fixed joint[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#fixed-joint "Direct link to Fixed joint")

A fixed joint ensures that two rigid-bodies don't move relative to each other. Fixed joints are characterized by
one **local frame** (represented by a `Pose`) on each rigid-body. The fixed-joint makes these frames
coincide in world-space.

info

Attaching multiple colliders to a single rigid-body will have the same effect as using one rigid-body
per collider and attaching them with a fixed joint. However the multi-collider approach will be much
more efficient and numerically efficient than the joint approach. So a fixed-joint should only be used when the multi-collider
doesn't fit your use-case (for example if you want to read the force applied by the joint in order to
break it dynamically).

* Example 2D
* Example 3D

```js
let params = RAPIER.JointData.fixed({ x: 0.0, y: 0.0 }, 0.0, { x: 0.0, y: -2.0 }, 0.0);
let joint = world.createImpulseJoint(params, body1, body2, true);
```

```js
let params = RAPIER.JointData.fixed(
    { x: 0.0, y: 0.0, z: 0.0 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
    { x: 0.0, y: -2.0, z: 0.0 }, { w: 1.0, x: 0.0, y: 0.0, z: 0.0 }
);
let joint = world.createImpulseJoint(params, body1, body2, true);
```

## Spherical joint[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#spherical-joint "Direct link to Spherical joint")

The spherical joint ensures that two points on the local-spaces of two rigid-bodies always coincide (it prevents any
relative translational motion at this points). This is typically used to simulate ragdolls arms, pendulums, etc.
They are characterized by one **local anchor** on each rigid-body. Each anchor represents the location
of the points that need to coincide on the local-space of each rigid-body.

```js
let params = RAPIER.JointData.spherical({ x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: -3.0 });
let joint = world.createImpulseJoint(params, body1, body2, true);
```

note

In 2D, revolute joints and spherical joints are the same thing. Therefore, there is no `SphericalJoint` type in
2D (use the `RevoluteJoint` type instead).

## Revolute joint[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#revolute-joint "Direct link to Revolute joint")

The revolute joint prevents any relative movement between two rigid-bodies, except for relative rotations
along one axis. This is typically used to simulate wheels, fans, etc. They are characterized by one **local
anchor** as well as one **local axis** on each rigid-body.

* Example 2D
* Example 3D

```js
let params = RAPIER.JointData.revolute({ x: 0.0, y: 1.0 }, { x: 0.0, y: -3.0 });
let joint = world.createImpulseJoint(params, body1, body2, true);
```

```js
let x = { x: 1.0, y: 0.0, z: 0.0 };
let params = RAPIER.JointData.revolute({ x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: -3.0 }, x);
let joint = world.createImpulseJoint(params, body1, body2, true);
```

## Prismatic joint[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#prismatic-joint "Direct link to Prismatic joint")

The prismatic joint prevents any relative movement between two rigid-bodies, except for relative translations
along one axis. It is characterized by one **local anchor** as well as one **local axis** on each rigid-body.
In 3D, an optional **local tangent axis** can be specified for each rigid-body. If a local tangent axis
equal to zero is specified, it will be computed automatically. Setting this tangent axis lets you control the
fixed relative orientation of the rigid-bodies.

The prismatic joint supports the application of **joint limits**. This will restrict the relative distance between
the rigid-body anchors (along the free joint axis) to remain in the specified range `PrismaticJoint::limits`.
The signed distance is computed as `(anchor2 - anchor1).dot(axis1)`.

* Example 2D
* Example 3D

```js
let x = { x: 1.0, y: 0.0 };
let params = RAPIER.JointData.prismatic({ x: 0.0, y: 0.0 }, x, { x: 0.0, y: -3.0 });
params.limitsEnabled = true;
params.limits = [-2.0, 5.0];
let joint = world.createImpulseJoint(params, body1, body2, true);
```

```js
let x = { x: 1.0, y: 0.0, z: 0.0 };
let z = { x: 0.0, y: 0.0, z: 1.0 };
let params = RAPIER.JointData.prismatic({ x: 0.0, y: 0.0, z: 1.0 }, x, z);
params.limitsEnabled = true;
params.limits = [-2.0, 5.0];
let joint = world.createImpulseJoint(params, body1, body2, true);
```

## Joint motors[â](https://rapier.rs:443/docs/user_guides/javascript/joints/#joint-motors "Direct link to Joint motors")

Spherical, revolute, and prismatic joints support **joint motors**.

Motors allow you to make the linked rigid-bodies move relative to one another, along the free degrees of freedom left
by the joint, as if a motor was pushing them. The joint motor is simulated with a PD controller (Proportional Derivative controller) where you
can set a target relative velocity along the free degrees of freedom as well as a target position. The `stiffness` of
the PD controller controls the strength of the force that will be applied to make the bodies reach the target relative
positions along the free DOFs. The `damping` of the PD controller controls the strength of the force that will be applied
to make the bodies reach the target relative velocities along the free DOFs. All joints supporting motors have the
following methods:

* `configureMotorPosition(targetPos, stiffness, damping)` :
  this tells the joint motor that we want the relative position
  of the rigid-bodies along the free DOFs to be equal to `target_pos` , and that
  the relative velocity when it reaches that position should be zero.
* `configureMotorVelocity(targetVel, damping)`:
  this tells the joint motor that we want the relative relative velocity of the rigid-bodies along the free DOFs to be
  equal to `targeVel`. There is no restriction on the relative position
  along the free DOF.
* `configureMotor(targetPos, targetVel, stiffness, damping)`:
  this lets you control all the parameters of the motor's spring-like equation. This should be used only if the other configuration methods are not flexible enough.
* `configureMotorModel(model)`: this selects the mathematical model for the motor's controller. All the available
  models use a **spring-like** equation. See the [API documentation of MotorModel](https://docs.rs/rapier3d/latest/rapier3d/dynamics/enum.MotorModel.html)
  for details.

It is also possible to configure the maximum impulse applied by the motor: this limits the maximum force/torque the
motor is able to deliver. The following examples show the configuration of the joint motor for a prismatic joint:

* Example 2D
* Example 3D

```js
let x = { x: 1.0, y: 0.0 };
let params = RAPIER.JointData.prismatic({ x: 0.0, y: 0.0 }, { x: 0.0, y: -3.0 }, x);
let joint = world.createImpulseJoint(params, body1, body2, true);
(joint as RAPIER.PrismaticImpulseJoint).configureMotorVelocity(1.0, 0.5);
```

```js
let x = { x: 1.0, y: 0.0, z: 0.0 };
let z = { x: 0.0, y: 0.0, z: 1.0 };
let params = RAPIER.JointData.prismatic({ x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: -3.0 }, x);
let joint = world.createImpulseJoint(params, body1, body2, true);
(joint as RAPIER.PrismaticImpulseJoint).configureMotorVelocity(1.0, 0.5);
```
