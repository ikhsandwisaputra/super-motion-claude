---
source: https://paperjs.org/reference/curve/
title: "Paper.js — Curve"
fetched: 2026-10-28
---

# Curve

The Curve object represents the parts of a path that are connected by two following [Segment](https://paperjs.org/reference/segment) objects. The curves of a path can be accessed through its [path.curves](https://paperjs.org/reference/path#curves) array.

While a segment describe the anchor point and its incoming and outgoing handles, a Curve object describes the curve passing between two such segments. Curves and segments represent two different ways of looking at the same thing, but focusing on different aspects. Curves for example offer many convenient ways to work with parts of the path, finding lengths, positions or tangents at given offsets.

## Constructors

[**Curve**(segment1, segment2)](https://paperjs.org/reference/curve/#curve-segment1-segment2)

Creates a new curve object.

#### Parameters:

* segment1:
  [Segment](https://paperjs.org/reference/segment)
* segment2:
  [Segment](https://paperjs.org/reference/segment)

#### Returns:

* [Curve](https://paperjs.org/reference/curve)

[**Curve**(point1, handle1, handle2, point2)](https://paperjs.org/reference/curve/#curve-point1-handle1-handle2-point2)

Creates a new curve object.

#### Parameters:

* point1:
  [Point](https://paperjs.org/reference/point)
* handle1:
  [Point](https://paperjs.org/reference/point)
* handle2:
  [Point](https://paperjs.org/reference/point)
* point2:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Curve](https://paperjs.org/reference/curve)

## Properties

[**point1**](https://paperjs.org/reference/curve/#point1)

The first anchor point of the curve.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**point2**](https://paperjs.org/reference/curve/#point2)

The second anchor point of the curve.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**handle1**](https://paperjs.org/reference/curve/#handle1)

The handle point that describes the tangent in the first anchor point.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**handle2**](https://paperjs.org/reference/curve/#handle2)

The handle point that describes the tangent in the second anchor point.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**segment1**](https://paperjs.org/reference/curve/#segment1)

The first segment of the curve.

Read only.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

[**segment2**](https://paperjs.org/reference/curve/#segment2)

The second segment of the curve.

Read only.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

[**path**](https://paperjs.org/reference/curve/#path)

The path that the curve belongs to.

Read only.

#### Type:

* [Path](https://paperjs.org/reference/path)

[**index**](https://paperjs.org/reference/curve/#index)

The index of the curve in the [path.curves](https://paperjs.org/reference/path#curves) array.

Read only.

#### Type:

* Number

[**next**](https://paperjs.org/reference/curve/#next)

The next curve in the [path.curves](https://paperjs.org/reference/path#curves) array that the curve belongs to.

Read only.

#### Type:

* [Curve](https://paperjs.org/reference/curve)

[**previous**](https://paperjs.org/reference/curve/#previous)

The previous curve in the [path.curves](https://paperjs.org/reference/path#curves) array that the curve belongs to.

Read only.

#### Type:

* [Curve](https://paperjs.org/reference/curve)

[**selected**](https://paperjs.org/reference/curve/#selected)

Specifies whether the points and handles of the curve are selected.

#### Type:

* Boolean

[**values**](https://paperjs.org/reference/curve/#values-matrix)

An array of 8 float values, describing this curve’s geometry in four absolute x/y pairs (point1, handle1, handle2, point2). This format is used internally for efficient processing of curve geometries, e.g. when calculating intersections or bounds.

Note that the handles are converted to absolute coordinates.

Read only.

#### Type:

* Array of Numbers

[**points**](https://paperjs.org/reference/curve/#points)

An array of 4 point objects, describing this curve’s geometry in absolute coordinates (point1, handle1, handle2, point2).

Note that the handles are converted to absolute coordinates.

Read only.

#### Type:

* Array of [Point](https://paperjs.org/reference/point) objects

[**length**](https://paperjs.org/reference/curve/#length)

The approximated length of the curve.

Read only.

#### Type:

* Number

[**area**](https://paperjs.org/reference/curve/#area)

The area that the curve’s geometry is covering.

Read only.

#### Type:

* Number

### Bounding Boxes

[**bounds**](https://paperjs.org/reference/curve/#bounds)

The bounding rectangle of the curve excluding stroke width.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**strokeBounds**](https://paperjs.org/reference/curve/#strokebounds)

The bounding rectangle of the curve including stroke width.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**handleBounds**](https://paperjs.org/reference/curve/#handlebounds)

The bounding rectangle of the curve including handles.

Read only.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

## Methods

[**clone**()](https://paperjs.org/reference/curve/#clone)

Returns a copy of the curve.

#### Returns:

* [Curve](https://paperjs.org/reference/curve)

[**toString**()](https://paperjs.org/reference/curve/#tostring)

#### Returns:

* String — a string representation of the curve

[**classify**()](https://paperjs.org/reference/curve/#classify)

Determines the type of cubic Bézier curve via discriminant classification, as well as the curve-time parameters of the associated points of inflection, loops, cusps, etc.

#### Returns:

* Object — the curve classification information as an object, see options

* info.type: String — the type of Bézier curve, possible values are: ‘line’, ‘quadratic’, ‘serpentine’, ‘cusp’, ‘loop’, ‘arch’
* info.roots: Array of Numbers — the curve-time parameters of the associated points of inflection for serpentine curves, loops, cusps, etc

[**remove**()](https://paperjs.org/reference/curve/#remove)

Removes the curve from the path that it belongs to, by removing its second segment and merging its handle with the first segment.

#### Returns:

* Boolean — true if the curve was removed, false otherwise

[**isFirst**()](https://paperjs.org/reference/curve/#isfirst)

Checks if the this is the first curve in the [path.curves](https://paperjs.org/reference/path#curves) array.

#### Returns:

* Boolean — true if this is the first curve, false otherwise

[**isLast**()](https://paperjs.org/reference/curve/#islast)

Checks if the this is the last curve in the [path.curves](https://paperjs.org/reference/path#curves) array.

#### Returns:

* Boolean — true if this is the last curve, false otherwise

[**getPart**(from, to)](https://paperjs.org/reference/curve/#getpart-from-to)

Creates a new curve as a sub-curve from this curve, its range defined by the given curve-time parameters. If `from` is larger than `to`, then the resulting curve will have its direction reversed.

#### Parameters:

* from:
  Number
  — the curve-time parameter at which the sub-curve starts
* to:
  Number
  — the curve-time parameter at which the sub-curve ends

#### Returns:

* [Curve](https://paperjs.org/reference/curve) — the newly create sub-curve

[**divideAt**(location)](https://paperjs.org/reference/curve/#divideat-location)

Divides the curve into two curves at the given offset or location. The curve itself is modified and becomes the first part, the second part is returned as a new curve. If the curve belongs to a path item, a new segment is inserted into the path at the given location, and the second part becomes a part of the path as well.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve at which to divide

#### Returns:

* [Curve](https://paperjs.org/reference/curve) — the second part of the divided curve if the location is valid, {code null} otherwise

#### See also:

* [divideAtTime(time)](https://paperjs.org/reference/curve#divideattime-time)

[**divideAtTime**(time)](https://paperjs.org/reference/curve/#divideattime-time)

Divides the curve into two curves at the given curve-time parameter. The curve itself is modified and becomes the first part, the second part is returned as a new curve. If the modified curve belongs to a path item, the second part is also added to the path.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve at which to divide

#### Returns:

* [Curve](https://paperjs.org/reference/curve) — the second part of the divided curve, if the offset is within the valid range, {code null} otherwise.

#### See also:

* [divideAt(offset)](https://paperjs.org/reference/curve#divideat-offset)

[**splitAt**(location)](https://paperjs.org/reference/curve/#splitat-location)

Splits the path this curve belongs to at the given offset. After splitting, the path will be open. If the path was open already, splitting will result in two paths.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve at which to split

#### Returns:

* [Path](https://paperjs.org/reference/path) — the newly created path after splitting, if any

#### See also:

* [path.splitAt(offset)](https://paperjs.org/reference/path#splitat-offset)

[**splitAtTime**(time)](https://paperjs.org/reference/curve/#splitattime-time)

Splits the path this curve belongs to at the given offset. After splitting, the path will be open. If the path was open already, splitting will result in two paths.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve at which to split

#### Returns:

* [Path](https://paperjs.org/reference/path) — the newly created path after splitting, if any

#### See also:

* [path.splitAt(offset)](https://paperjs.org/reference/path#splitat-offset)

[**reversed**()](https://paperjs.org/reference/curve/#reversed)

Returns a reversed version of the curve, without modifying the curve itself.

#### Returns:

* [Curve](https://paperjs.org/reference/curve) — a reversed version of the curve

[**clearHandles**()](https://paperjs.org/reference/curve/#clearhandles)

Clears the curve’s handles by setting their coordinates to zero, turning the curve into a straight line.

### Curve Tests

[**hasHandles**()](https://paperjs.org/reference/curve/#hashandles)

Checks if this curve has any curve handles set. Handles of which both coordinates are 0 within a tolerance of 1e-12 count as not set, see [point.isZero](https://paperjs.org/reference/point#iszero)().

#### Returns:

* Boolean — true if the curve has handles set, false otherwise

#### See also:

* [curve.handle1](https://paperjs.org/reference/curve#handle1)
* [curve.handle2](https://paperjs.org/reference/curve#handle2)
* [segment.hasHandles](https://paperjs.org/reference/segment#hashandles)()
* [path.hasHandles](https://paperjs.org/reference/path#hashandles)()

[**hasLength**([epsilon])](https://paperjs.org/reference/curve/#haslength)

Checks if this curve has any length.

#### Parameters:

* epsilon:
  Number
  — the epsilon against which to compare the curve’s length
  — optional, default: 0

#### Returns:

* Boolean — true if the curve is longer than the given epsilon, false otherwise

[**isStraight**()](https://paperjs.org/reference/curve/#isstraight)

Checks if this curve appears as a straight line. This can mean that it has no handles defined, or that the handles run collinear with the line that connects the curve’s start and end point, not falling outside of the line.

#### Returns:

* Boolean — true if the curve is straight, false otherwise

[**isLinear**()](https://paperjs.org/reference/curve/#islinear)

Checks if this curve is parametrically linear, meaning that it is straight and its handles are positioned at 1/3 and 2/3 of the total length of the curve.

#### Returns:

* Boolean — true if the curve is parametrically linear, false otherwise

[**isCollinear**(curve)](https://paperjs.org/reference/curve/#iscollinear-curve)

Checks if the the two curves describe straight lines that are collinear, meaning they run in parallel.

#### Parameters:

* curve:
  [Curve](https://paperjs.org/reference/curve)
  — the other curve to check against

#### Returns:

* Boolean — true if the two lines are collinear, false otherwise

[**isHorizontal**()](https://paperjs.org/reference/curve/#ishorizontal)

Checks if the curve is a straight horizontal line.

#### Returns:

* Boolean — true if the line is horizontal, false otherwise

[**isVertical**()](https://paperjs.org/reference/curve/#isvertical)

Checks if the curve is a straight vertical line.

#### Returns:

* Boolean — true if the line is vertical, false otherwise

### Positions on Curves

[**getLocationAt**(offset)](https://paperjs.org/reference/curve/#getlocationat-offset)

Calculates the curve location at the specified offset on the curve, or `null` if the offset exceeds the length of the curve.

#### Parameters:

* offset:
  Number
  — the offset on the curve

#### Returns:

* [CurveLocation](https://paperjs.org/reference/curvelocation) — the curve location at the specified the offset

[**getLocationAtTime**(time)](https://paperjs.org/reference/curve/#getlocationattime-time)

Calculates the curve location at the specified curve-time parameter on the curve, or `null` if the parameter lies outside of `0..1`.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [CurveLocation](https://paperjs.org/reference/curvelocation) — the curve location at the specified the location

[**getTimeAt**(offset[, start])](https://paperjs.org/reference/curve/#gettimeat-offset)

Calculates the curve-time parameter of the specified offset on the path, relative to the provided start parameter. If offset is a negative value, the parameter is searched to the left of the start parameter. If no start parameter is provided, a default of `0` for positive values of `offset` and `1` for negative values of `offset`.

#### Parameters:

* offset:
  Number
  — the offset at which to find the curve-time, in curve length units
* start:
  Number
  — the curve-time in relation to which the offset is determined
  — optional

#### Returns:

* Number — the curve-time parameter at the specified location, or `null` if the offset exceeds the length of the curve

[**getTimesWithTangent**(tangent)](https://paperjs.org/reference/curve/#gettimeswithtangent-tangent)

Calculates the curve-time parameters where the curve is tangential to provided tangent. Note that tangents at the start or end are included.

#### Parameters:

* tangent:
  [Point](https://paperjs.org/reference/point)
  — the tangent to which the curve must be tangential

#### Returns:

* Array of Numbers — at most two curve-time parameters, where the curve is tangential to the given tangent

[**getOffsetAtTime**(time)](https://paperjs.org/reference/curve/#getoffsetattime-time)

Calculates the curve offset at the specified curve-time parameter on the curve.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* Number — the curve offset at the specified the location

[**getLocationOf**(point)](https://paperjs.org/reference/curve/#getlocationof-point)

Returns the curve location of the specified point if it lies on the curve, `null` otherwise.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point on the curve

#### Returns:

* [CurveLocation](https://paperjs.org/reference/curvelocation)⟋null — the curve location of the specified point

[**getOffsetOf**(point)](https://paperjs.org/reference/curve/#getoffsetof-point)

Returns the length of the path from its beginning up to up to the specified point if it lies on the path, `null` otherwise.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point on the path

#### Returns:

* Number⟋null — the length of the path up to the specified point

[**getTimeOf**(point)](https://paperjs.org/reference/curve/#gettimeof-point)

Returns the curve-time parameter of the specified point if it lies on the curve, `null` otherwise. Note that if there is more than one possible solution in a self-intersecting curve, the first found result is returned.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point on the curve

#### Returns:

* Number⟋null — the curve-time parameter of the specified point

[**getNearestLocation**(point)](https://paperjs.org/reference/curve/#getnearestlocation-point)

Returns the nearest location on the curve to the specified point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point for which we search the nearest location

#### Returns:

* [CurveLocation](https://paperjs.org/reference/curvelocation) — the location on the curve that’s the closest to the specified point

[**getNearestPoint**(point)](https://paperjs.org/reference/curve/#getnearestpoint-point)

Returns the nearest point on the curve to the specified point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point for which we search the nearest point

#### Returns:

* [Point](https://paperjs.org/reference/point) — the point on the curve that’s the closest to the specified point

[**getPointAt**(location)](https://paperjs.org/reference/curve/#getpointat-location)

Calculates the point on the curve at the given location.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the point on the curve at the given location

[**getTangentAt**(location)](https://paperjs.org/reference/curve/#gettangentat-location)

Calculates the normalized tangent vector of the curve at the given location.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the normalized tangent of the curve at the given location

[**getNormalAt**(location)](https://paperjs.org/reference/curve/#getnormalat-location)

Calculates the normal vector of the curve at the given location.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the normal of the curve at the given location

[**getWeightedTangentAt**(location)](https://paperjs.org/reference/curve/#getweightedtangentat-location)

Calculates the weighted tangent vector of the curve at the given location, its length reflecting the curve velocity at that location.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the weighted tangent of the curve at the given location

[**getWeightedNormalAt**(location)](https://paperjs.org/reference/curve/#getweightednormalat-location)

Calculates the weighted normal vector of the curve at the given location, its length reflecting the curve velocity at that location.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the weighted normal of the curve at the given location

[**getCurvatureAt**(location)](https://paperjs.org/reference/curve/#getcurvatureat-location)

Calculates the curvature of the curve at the given location. Curvatures indicate how sharply a curve changes direction. A straight line has zero curvature, where as a circle has a constant curvature. The curve’s radius at the given location is the reciprocal value of its curvature.

#### Parameters:

* location:
  Number⟋[CurveLocation](https://paperjs.org/reference/curvelocation)
  — the offset or location on the curve

#### Returns:

* Number — the curvature of the curve at the given location

[**getPointAtTime**(time)](https://paperjs.org/reference/curve/#getpointattime-time)

Calculates the point on the curve at the given location.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the point on the curve at the given location

[**getTangentAtTime**(time)](https://paperjs.org/reference/curve/#gettangentattime-time)

Calculates the normalized tangent vector of the curve at the given location.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the normalized tangent of the curve at the given location

[**getNormalAtTime**(time)](https://paperjs.org/reference/curve/#getnormalattime-time)

Calculates the normal vector of the curve at the given location.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the normal of the curve at the given location

[**getWeightedTangentAtTime**(time)](https://paperjs.org/reference/curve/#getweightedtangentattime-time)

Calculates the weighted tangent vector of the curve at the given location, its length reflecting the curve velocity at that location.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the weighted tangent of the curve at the given location

[**getWeightedNormalAtTime**(time)](https://paperjs.org/reference/curve/#getweightednormalattime-time)

Calculates the weighted normal vector of the curve at the given location, its length reflecting the curve velocity at that location.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* [Point](https://paperjs.org/reference/point) — the weighted normal of the curve at the given location

[**getCurvatureAtTime**(time)](https://paperjs.org/reference/curve/#getcurvatureattime-time)

Calculates the curvature of the curve at the given location. Curvatures indicate how sharply a curve changes direction. A straight line has zero curvature, where as a circle has a constant curvature. The curve’s radius at the given location is the reciprocal value of its curvature.

#### Parameters:

* time:
  Number
  — the curve-time parameter on the curve

#### Returns:

* Number — the curvature of the curve at the given location

[**getIntersections**(curve)](https://paperjs.org/reference/curve/#getintersections-curve)

Returns all intersections between two [Curve](https://paperjs.org/reference/curve) objects as an array of [CurveLocation](https://paperjs.org/reference/curvelocation) objects.

#### Parameters:

* curve:
  [Curve](https://paperjs.org/reference/curve)
  — the other curve to find the intersections with (if the curve itself or `null` is passed, the self intersection of the curve is returned, if it exists)

#### Returns:

* Array of [CurveLocation](https://paperjs.org/reference/curvelocation) objects — the locations of all intersections between the curves
