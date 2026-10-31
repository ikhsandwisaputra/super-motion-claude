---
source: https://rapier.rs:443/docs/user_guides/javascript/serialization
title: "Serialization | Rapier"
fetched: 2026-10-28
---

# Serialization

It is possible to take a snapshot of the whole physics world with `world.takeSnapshot`. This results in a byte array
of type `Uint8Array` that may be saved on the disk, sent through the network, etc. The snapshot can then be restored
with `let world = World.restoreSnapshot(snapshot);`.
