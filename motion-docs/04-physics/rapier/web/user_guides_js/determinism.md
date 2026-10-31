---
source: https://rapier.rs:443/docs/user_guides/javascript/determinism
title: "Determinism | Rapier"
fetched: 2026-10-28
---

# Determinism

The WASM/Typescript/JavaScript version of Rapier is fully cross-platform deterministic. This means that running the same simulation
(with the **same initial conditions**) using the same version of Rapier, on two different machines (even with different
browsers, operating systems, and processors, will give the exact same results. In particular, creating a snapshot of the
`World` with `world.takeSnapshot()` and taking a MD5 hash of the resulting byte array will return the exact same hash
on different machines (assuming the snapshot itself is taken after the same number of timesteps).

note

Two simulations run with the **same initial conditions** if all the simulation parameters are initialized with the same
values, rigid-bodies/colliders/joints are constructed the same way, and they are added/removed in the exact same order.

Keep in mind that all the values used to initialize the physics simulation must result from cross-platform
deterministic operations to in order to preserve the determinism of the physics engine itself. Otherwise, you won't
get the exact same initial conditions on all the platforms. In particular, transcendental functions like
`Math.sin, Math.cos` are not cross-platform determinism and may give different results on different platforms.
