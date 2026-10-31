---
source: https://rive.app/docs/editor/constraints/rotation-constraint
title: "Rotation Constraint"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Rotation Constraint

The Rotation Constraint allows you to set limits on an object's rotation and/or copy the rotation properties from a target object. These properties can be independently activated.

[YouTube video player](https://www.youtube.com/embed/YrQeUrzYoi8)

## How to create a Rotation Constraint

**1. Add a Rotation Constraint to an object**

Use the Constraints section of the Inspector to add a Rotation Constraint to an object.

![Image](https://ucarecdn.com/22a86fbf-4171-4d1e-b18a-f099b6d89aad/)

**2. Choose a target**

Use the new constraint's fly-out menu to select a target for this constraint.

![Image](https://ucarecdn.com/c18c068a-c500-4f87-8f32-726a04776daf/)

**3. Test that the Rotation Constraint is working**

Manipulating the target object now causes the constrained object to copy Rotation properties.

![Image](https://ucarecdn.com/9961824a-a435-48d6-9366-b9f24f8bb730/)

## Strength

The Strength property determines how much the constrained object is affected.

A Strength of 0% means the constraint won't have any effect.

A Strength of 50% means half the value from the target will be applied.

## Transform Space

### Source Space

Choose whether this constraint should use World or Local coordinates for the Source Space.

### Destination Space

Choose whether this constraint should use World or Local coordinates for the Destination Space.

### Min/max space

Choose whether this constraint should use World or Local coordinates for the Min/Max Space.

## Offset

Allows the constraint owner to be manually offset from the constraint source.

![Image](https://ucarecdn.com/d58cee7e-20cd-4586-b1c3-f1a807e94e84/)

## Copy

Define the rate at which the rotation property is copied.

## Min/max

Use the numerical values to define the minimum and maximum limits of the constraint.
