---
source: https://rive.app/docs/editor/constraints/distance-constraint
title: "Distance Constraint"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Distance Constraint

Keep an object within, beyond, or at a specific distance from another object.

## Adding a Distance Constraint

[YouTube video player](https://www.youtube.com/embed/Nvwf27EIvdw)

**1. Add a Distance Constraint**

Select an object, then add a **Distance Constraint** from the **Constraints** section of the Inspector.

**2. Choose a target**

Open the constraint's fly-out menu and select the object to use as the target.

**3. Move the target**

Move the target to see the constraint affect the constrained object. By default, the **Closer** mode keeps it within the specified distance.

<video />

> **[Learn by remixing](https://rive.app/community/files/28736-distance-constraint?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

## Properties

### Strength

**Strength** controls how much the constraint affects the object. At 0%, the constraint has no effect.

### Distance

**Distance** sets the distance used by the constraint. A red circle on the Stage represents this distance from the target.

### Mode

**Mode** determines how the constrained object can be positioned relative to the **Distance** value.

#### Closer

Keeps the constrained object within the specified distance from the target. When the target moves too far away, the object follows to stay within that distance.

<video />

#### Further

Keeps the constrained object beyond the specified distance from the target. When the target moves too close, it pushes the object away to maintain the minimum distance.

<video />

#### Exact

Keeps the constrained object exactly at the specified distance from the target. When the target moves, the object follows to maintain that distance.

<video />
