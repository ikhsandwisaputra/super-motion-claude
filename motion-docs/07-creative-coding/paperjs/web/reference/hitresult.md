---
source: https://paperjs.org/reference/hitresult/
title: "Paper.js — HitResult"
fetched: 2026-10-28
---

# HitResult

A HitResult object contains information about the results of a hit test. It is returned by [item.hitTest(point)](https://paperjs.org/reference/item#hittest-point) and [project.hitTest(point)](https://paperjs.org/reference/project#hittest-point).

## Properties

[**type**](https://paperjs.org/reference/hitresult/#type)

Describes the type of the hit result. For example, if you hit a segment point, the type would be `'segment'`.

#### Values:

* 'segment', 'handle-in', 'handle-out', 'curve', 'stroke', 'fill', 'bounds', 'center', 'pixel'

#### Type:

* String

[**name**](https://paperjs.org/reference/hitresult/#name)

If the HitResult has a [hitResult.type](https://paperjs.org/reference/hitresult#type) of `'bounds'`, this property describes which corner of the bounding rectangle was hit.

The names refer to the item’s own bounding rectangle, transformed by its [item.matrix](https://paperjs.org/reference/item#matrix), which is the rectangle that the item’s selection draws. On mirrored or rotated items, a handle can therefore appear elsewhere on screen than its name says, while its opposite handle and the rectangle’s axes stay the ones to transform the item by. To choose a cursor, use the direction from the rectangle’s center to [hitResult.point](https://paperjs.org/reference/hitresult#point), both in project coordinates.

#### Values:

* 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-center', 'top-center', 'right-center', 'bottom-center'

#### Type:

* String

[**item**](https://paperjs.org/reference/hitresult/#item)

The item that was hit.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**location**](https://paperjs.org/reference/hitresult/#location)

If the HitResult has a type of ‘curve’ or ‘stroke’, this property gives more information about the exact position that was hit on the path.

#### Type:

* [CurveLocation](https://paperjs.org/reference/curvelocation)

[**color**](https://paperjs.org/reference/hitresult/#color)

If the HitResult has a type of ‘pixel’, this property refers to the color of the pixel on the [Raster](https://paperjs.org/reference/raster) that was hit.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

[**segment**](https://paperjs.org/reference/hitresult/#segment)

If the HitResult has a type of ‘stroke’, ‘segment’, ‘handle-in’ or ‘handle-out’, this property refers to the segment that was hit or that is closest to the hitResult.location on the curve.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

[**point**](https://paperjs.org/reference/hitresult/#point)

Describes the actual coordinates of the segment, handle or bounding box corner that was hit.

#### Type:

* [Point](https://paperjs.org/reference/point)
