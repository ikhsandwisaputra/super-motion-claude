---
source: https://rapier.rs:443/docs/user_guides/javascript/simulation_structures
title: "Simulation structures | Rapier"
fetched: 2026-10-28
---

# Simulation structures

This page describes .

## Gravity[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#gravity "Direct link to Gravity")

Gravity is represented as a vector. It affects every dynamic rigid-body taking part of the simulation. The gravity
can be altered at each timestep .
Learn more about per-rigid-body gravity modification in [the dedicated section](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#gravity).

## Integration parameters[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#integration-parameters "Direct link to Integration parameters")

The `IntegrationParameters` controls various aspects of the physics simulation,
including the timestep length, number of solver iterations, number of CCD substeps, etc. The default integration parameters are set to
achieve a good balance between performance and accuracy for games. They can be changed to make the simulation more
accurate at the expense of a bit of performance. Learn more about each integration parameter in
[the API docs](https://docs.rs/rapier3d/latest/rapier3d/dynamics/struct.IntegrationParameters.html).

## Island manager[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#island-manager "Direct link to Island manager")

The `IslandManager` is responsible for tracking the set of dynamic rigid-bodies that are still moving
and these that are no longer moving (and can ignored by subsequent timesteps to avoid useless computations).
The island manager is automatically updated by `PhysicsPipeline::step` and can be queried to retrieve
the list of all the rigid-bodies modified by the physics engine during the last timestep. This can be useful
to update the rendering of only the rigid-bodies that moved:

Learn more about sleeping rigid-bodies in [the dedicated section](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#sleeping).

## Physics pipeline[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#physics-pipeline "Direct link to Physics pipeline")

The `PhysicsPipeline` is responsible for tying everything together in order to run the physics simulation.
It will take care of updating every data-structures mentioned in this page (except the other pipelines), running the collision-detection,
running the force computation and integration, and running CCD resolution.

## Collision pipeline[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#collision-pipeline "Direct link to Collision pipeline")

The `CollisionPipeline` is similar to the `PhysicsPipeline` except that it will only run collision-detection.
It won't perform any dynamics (force computation, integration, CCD, etc.) It is generally used instead of
the `PhysicsPipeline` when one only needs collision-detection.

info

Running both the `CollisionPipeline` and the `PhysicsPipeline` is useless because the `PhysicsPipeline` already
does collision-detection.

## Query pipeline[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#query-pipeline "Direct link to Query pipeline")

The `QueryPipeline` is responsible for efficiently running [scene queries](https://rapier.rs:443/docs/user_guides/javascript/scene_queries), e.g., ray-casting,
shape-casting (sweep tests), intersection tests, on all the colliders of the scene.

Learn more about scene queries with the `QueryPipeline` in the [dedicated page](https://rapier.rs:443/docs/user_guides/javascript/scene_queries).

## CCD solver[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#ccd-solver "Direct link to CCD solver")

The CCD solver is responsible for the resolution of Continuous-Collision-Detection. By itself, this structure
doesn't expose any useful feature.
Learn more about CCD in [the dedicated section](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection).

## Physics hooks[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#physics-hooks "Direct link to Physics hooks")

The physics hooks are trait-objects implementing the `PhysicsHooks` trait. They can be used to apply arbitrary
rules to ignore collision detection between some pairs of colliders. They can also be used to modify the contacts
processed by the constraints solver for computing forces.

Learn more about physics hooks in [the dedicated section](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#physics-hooks).

## Event handler[â](https://rapier.rs:443/docs/user_guides/javascript/simulation_structures/#event-handler "Direct link to Event handler")

The event handlers are trait-objects implementing the `EventHandler` trait. They can be used to get notified
when two non-sensor colliders start/stop having contacts, and when one sensor collider and one other collider
start/stop intersecting. Learn more about collision events in
[the dedicated section](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#collision-and-contact-force-events).
