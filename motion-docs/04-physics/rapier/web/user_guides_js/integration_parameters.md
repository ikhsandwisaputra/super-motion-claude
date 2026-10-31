---
source: https://rapier.rs:443/docs/user_guides/javascript/integration_parameters
title: "Integration parameters | Rapier"
fetched: 2026-10-28
---

# Integration parameters

Various aspects of the physics simulation can be tuned by modifying the fields of the `IntegrationParameters`.
Most of these parameters are somewhat advanced and should not be modified unless you know their meaning and effect.
Several of them are about balancing efficiency and accuracy. They are given default values that work well in the
context of video-games or animations. For more realistic simulations you may want to change those parameters to favor
accuracy over performance.

info

Several parameters are expressed in a **normalized** form, i.e., their value is implicitly multiplied by
[`length_unit`](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters#length_unit) before being used. Therefore they don't need to be adjusted
when the world is not measured in meters.

## Time-stepping[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#time-stepping "Direct link to Time-stepping")

### `dt`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#dt "Direct link to dt")

The timestep length used for each update of the physics engine. This is the time by which the physics simulation will
be advanced. The default is 1/601 / 601/60 seconds. This typically corresponds to a refresh rate of 60Hz. Smaller timesteps
yield better accuracy. Large timesteps increase the negative effect of some approximations (linearization of various
parts of the equations of motion) and may result in missed collisions (because of collisions that may occur in-between
timesteps for fast-moving objects).

### `length_unit`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#length_unit "Direct link to length_unit")

The number of your own length units that make one meter. The default is 1.01.01.0, i.e., the simulation is measured in
meters. Rapier is tuned for human-scale objects measured in meters, therefore a simulation measured in centimeters
should set this to 100.0100.0100.0, and a 2D game where a typical object is 100 pixels tall should set it to 100.0100.0100.0 as well.
This scales the normalized parameters as well as various internal tolerances, and is the recommended alternative to
re-tuning every threshold by hand. Learn more about this in the
[common mistakes](https://rapier.rs:443/docs/user_guides/javascript/common_mistakes#why-is-everything-moving-in-slow-motion) page.

### `max_ccd_substeps`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#max_ccd_substeps "Direct link to max_ccd_substeps")

The maximum number of [CCD](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection) substeps performed during one timestep.
The default is 111. This is also the global switch of CCD: setting it to 000 disables every form of CCD for this world,
including the sweeping of the fast dynamic bodies against the fixed colliders.

### `min_ccd_dt`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#min_ccd_dt "Direct link to min_ccd_dt")

When CCD with multiple substeps is enabled, the timestep is subdivided into smaller pieces. This timestep subdivision
won't generate timestep lengths smaller than `min_ccd_dt`. The default is 1/60/1001 / 60 / 1001/60/100 seconds.

Setting this to a large value will reduce the opportunity to performing CCD substepping. Setting this to a very small
value may lead to numerical instabilities.

## Constraints solver[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#constraints-solver "Direct link to Constraints solver")

### `num_solver_iterations`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#num_solver_iterations "Direct link to num_solver_iterations")

The number of iterations, aka. substeps, run by the constraints solver. The default is 444. Higher values give more
accurate and more stable simulations, at the cost of performance: 888 to 121212 is a reasonable range for demanding
scenes (tall stacks, machinery with stiff joints), whereas 111 or 222 may be enough if performance matters more than
accuracy. Note that a single rigid-body can be given additional iterations of its own, as described in the
[rigid-body solver settings](https://rapier.rs:443/docs/user_guides/javascript/rigid_bodies#solver-settings) section.

### `num_internal_pgs_iterations`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#num_internal_pgs_iterations "Direct link to num_internal_pgs_iterations")

The number of internal Projected Gauss-Seidel iterations run at each solver iteration. The default is 111.

### `num_internal_stabilization_iterations`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#num_internal_stabilization_iterations "Direct link to num_internal_stabilization_iterations")

The number of stabilization iterations run at each solver iteration. The default is 111. These are the iterations
solving the constraints without their depenetration forces. This is what prevents the energy introduced by the position
correction from remaining in the simulation.

### `warmstart_coefficient`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#warmstart_coefficient "Direct link to warmstart_coefficient")

Each cached impulse is multiplied by this coefficient in [0,1][0, 1][0,1] when it is re-used to initialize the constraints
solver. The default is 1.01.01.0: it allows the convergence of the solver even when the number of iterations is small.

### `warmstart_joints`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#warmstart_joints "Direct link to warmstart_joints")

If enabled, the impulse-joint constraints are warm-started like the contacts are, i.e., the impulses accumulated by the
previous timestep are re-applied at the beginning of each substep instead of restarting from zero. The default is
`false`. Enabling it noticeably improves the convergence of stiff joint assemblies. Note that the multibody joints are
not affected by this parameter.

### `friction_in_bias_pass`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#friction_in_bias_pass "Direct link to friction_in_bias_pass")

If enabled, friction is solved during the biased pass of each substep as well as during the unbiased one. The default
is `false`, which is both cheaper and often more stable.

### `friction_model` (3D only)[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#friction_model-3d-only "Direct link to friction_model-3d-only")

The kind of friction constraints solved by the engine. The `Simplified` model (the default) solves one
Coulomb constraint per group of four contacts, plus one purely rotational "twist" constraint eliminating the angular
motion in the tangent plane of the manifold. The `Coulomb` model solves one Coulomb constraint per contact point
instead: it is more mechanically correct but more expensive.

## Contacts[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#contacts "Direct link to Contacts")

### `contact_softness` and `static_contact_softness`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#contact_softness-and-static_contact_softness "Direct link to contact_softness-and-static_contact_softness")

The softness of the contact constraints, given as a natural frequency (in Hz) and a damping ratio instead of a
stiffness, so it doesn't depend on the masses of the colliding bodies. Softer constraints make the contacts more
compliant (meaning that they allow more penetrations when pressed on), whereas harder constraints feel more rigid
and correct, but might introduce jitters if too rigid.

### `normalized_prediction_distance`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#normalized_prediction_distance "Direct link to normalized_prediction_distance")

The maximal distance separating two objects that will generate predictive (aka. speculative) contacts. The default is
0.020.020.02, i.e., four times the geometric slop. Generating contacts before the objects actually touch is what allows the
solver to stop them exactly at the surface instead of letting them interpenetrate first.

### `normalized_allowed_linear_error`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#normalized_allowed_linear_error "Direct link to normalized_allowed_linear_error")

The geometric slop distance. The default is 0.0050.0050.005.

### `normalized_max_corrective_velocity`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#normalized_max_corrective_velocity "Direct link to normalized_max_corrective_velocity")

The maximum speed at which the solver is allowed to push penetrating objects apart. The default is 3.03.03.0. Capping this
velocity is what keeps a deep penetration from being resolved explosively.

### `normalized_max_linear_velocity`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#normalized_max_linear_velocity "Direct link to normalized_max_linear_velocity")

The maximum linear velocity a rigid-body may have after each substep. The default is 400.0400.0400.0. This velocity cap helps
with stability and CCD effectiveness.

### `contact_clustering`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#contact_clustering "Direct link to contact_clustering")

If enabled, the contact manifolds of a collider pair that share (nearly) the same normal are merged into a single
cluster manifold before the constraints are generated (default: `true`, 3D only), so at most four contact points are
solved per contact plane. This is a large gain on the composite shapes (triangle-meshes, heightfields, compound shapes,
voxels) which generate one manifold per sub-shape.

warning

When contact clustering applies, the contacts and impulses seen by the solver must be read from
`ContactPair::solver_clusters` instead of `ContactPair::manifolds`. See the
[contact graph](https://rapier.rs:443/docs/user_guides/javascript/advanced_collision_detection#the-contact-graph) section.

### `contact_recycling` and `normalized_contact_recycle_distance`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#contact_recycling-and-normalized_contact_recycle_distance "Direct link to contact_recycling-and-normalized_contact_recycle_distance")

If enabled, a contact pair which relative position moved less than the recycle distance since its last full update
keeps its existing contact points instead of recomputing them (default: `true`, with a recycle distance of 0.050.050.05).

## Soft-bodies[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#soft-bodies "Direct link to Soft-bodies")

### `soft_bodies`[â](https://rapier.rs:443/docs/user_guides/javascript/integration_parameters/#soft_bodies "Direct link to soft_bodies")

The settings shared by every [soft-body](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies) of the world. They are detailed in the
[soft-body settings](https://rapier.rs:443/docs/user_guides/javascript/soft_bodies#global-settings) section.
